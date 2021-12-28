using System.Linq;
using API.Errors;
using API.Extentions;
using API.Helpers;
using API.Middleware;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Data.Identity;
using Infrastructure.Data.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

string connStr = builder.Configuration.GetConnectionString("DefaultConnection");
string identityConnStr = builder.Configuration.GetConnectionString("IdentityConnection");
var multiplexer =  ConnectionMultiplexer.Connect(builder.Configuration["Redis"]);
// Add services to the container.

builder.Services.AddControllers()
.ConfigureApiBehaviorOptions(options => 
{
    // options.InvalidModelStateResponseFactory = context => 
    //     new BadRequestObjectResult(context.ModelState.Where(e => e.Value.Errors.Count > 0)
    //     .SelectMany(x => x.Value.Errors)
    //     .Select(e => new ValidationErrorResponse{
    //         Errors = e.ErrorMessage
    //     }).ToArray());

    options.InvalidModelStateResponseFactory = context => 
    {
        var errors = context.ModelState.Where(e => e.Value.Errors.Count > 0)
            .SelectMany(x => x.Value.Errors).Select(x=>x.ErrorMessage).ToArray();

        var errorResponse = new ValidationErrorResponse
        {
            Errors = errors
        };
        
        return new BadRequestObjectResult(errorResponse);



    };
    
});

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy => 
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StoreContext>(x=>x.UseSqlServer(connStr));

builder.Services.AddDbContext<AppIdentityDbContext>(x=>x.UseSqlServer(identityConnStr));

builder.Services.AddSingleton<IConnectionMultiplexer>(multiplexer);

 builder.Services.AddApplicationServices();
 builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

app.UseMiddleware<ExceptionMiddleware>();

app.UseSwagger();
app.UseSwaggerUI();

app.UseStatusCodePagesWithRedirects("/Errors/{0}"); // bad request that not handle normally ex: that request which is not found

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.UseStaticFiles();

app.MapControllers();

using(var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<StoreContext>();
    //var loggerFactory = services.GetRequiredService<LoggerFactory>();
    await context.Database.MigrateAsync();
    
    await StoreContextSeed.SeedAsync(context);

    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    var identityContext = services.GetRequiredService<AppIdentityDbContext>();
    await identityContext.Database.MigrateAsync();
    await IdentityDbContextSeedData.IdentitySeedAsync(userManager);
}

app.Run();
