using NetCoreAPIPostgreSQL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreAPIPostgreSQL.Data.Repositories
{
    public interface IBranchRepository
    {
        Task<IEnumerable<Client>> GetAllBranch();
        Task<Employee> GetBranchData(int id);
        Task<bool> InsertBranch(Branch branch);
        Task<bool> UpdateBranch(Branch branch);
        Task<bool> DeleteBranch(int id);

    }
}
