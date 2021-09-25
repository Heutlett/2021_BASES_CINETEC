using NetCoreAPIPostgreSQL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreAPIPostgreSQL.Data.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllEmployees();
        Task<Employee> GetEmployeeData(int id);
        Task<bool> InsertEmployee(Employee emp);
        Task<bool> UpdateEmployee(Employee emp);
        Task<bool> DeleteEmployee(int id);

    }
}
