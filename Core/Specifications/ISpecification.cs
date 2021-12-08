using System.Linq.Expressions;

namespace Core.Specifications
{
    public interface ISpecification<T>
    {
        Expression<Func<T, bool>> Criteria { get; }
        List<Expression<Func<T,object>>> Includes {get;set;}
        Expression<Func<T,object>> OrderBy{get;set;}
        Expression<Func<T,object>> OrderByDescending{get;set;}
        int Skip{get;}
        int Take{get;}
        bool isPagingEnabled{get;}
    }
}