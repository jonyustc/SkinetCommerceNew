using System.Linq.Expressions;
using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<IReadOnlyList<T>> ListAllAsync();
        Task<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
        Task<T> GetEntityWithSpec(ISpecification<T> spec);

    }
}