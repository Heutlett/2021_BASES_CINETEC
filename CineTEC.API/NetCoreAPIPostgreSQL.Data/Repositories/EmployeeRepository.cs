using Dapper;
using NetCoreAPIPostgreSQL.Model;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreAPIPostgreSQL.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        // Attributo de configuracion de conexion.
        private PostgreSQLConfiguration _connectionString;

        // Constructor
        public EmployeeRepository(PostgreSQLConfiguration connectionString)
        {
            _connectionString = connectionString;
        }

        // Utilizar driver de Nuget para conectarse a la DB.
        protected NpgsqlConnection dbConnection()
        {
            return new NpgsqlConnection(_connectionString.ConnectionString);
        }


        // CRUD
        public async Task<bool> DeleteEmployee(int id)
        {
            var db = dbConnection();

            var sql = @"  DELETE
                          FROM public.""Employee"" 
                            WHERE Id = @Id  ";

            var result =  await db.ExecuteAsync(sql, new { Id = id});

            // TRUE si se elimina almenos una fila.
            return result > 0;
        }

        public async Task<IEnumerable<Employee>> GetAllEmployees()
        {
            var db = dbConnection();

            var sql = @"  SELECT id, username, password, birth_date
                          FROM public.""Employee"" ";

            return await db.QueryAsync<Employee>(sql, new { });

        }

        public async Task<Employee> GetEmployeeData(int id)
        {
            var db = dbConnection();

            var sql = @"  SELECT id, username, password, birth_date
                          FROM public.""Employee"" 
                            WHERE Id = @Id  ";

            return await db.QueryFirstOrDefaultAsync<Employee>(sql, new {Id = id});

        }

        public async Task<bool> InsertEmployee(Employee emp)
        {
            var db = dbConnection();

            var sql = @"  INSERT INTO public.""Employee"" (username, password, birth_date)
                          VALUES (@Username, @Password, @Birth_date) ";

            var result = await db.ExecuteAsync(sql, new { emp.Username, emp.Password, emp.Birth_date });

            // TRUE si se inserta almenos una fila.
            return result > 0;
        }

        public async Task<bool> UpdateEmployee(Employee emp)
        {
            var db = dbConnection();

            var sql = @"  UPDATE public.""Employee""
                          SET username   =  @Username,
                              password   =  @Password,
                              birth_date =  @Birth_date 
                            WHERE id = @Id ";

            var result = await db.ExecuteAsync(sql, new { emp.Username, emp.Password, emp.Birth_date, emp.Id });
            // Devuelve verdadero si al menos mas de una fila ha sido cambiada.
            return result > 0;
        }

    }  
}
