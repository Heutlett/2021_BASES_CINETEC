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
    class BranchRepository
    {

        // Attributo de configuracion de conexion.
        private PostgreSQLConfiguration _connectionString;

        // Constructor
        public BranchRepository(PostgreSQLConfiguration connectionString)
        {
            _connectionString = connectionString;
        }

        // Utilizar driver de Nuget para conectarse a la DB.
        protected NpgsqlConnection dbConnection()
        {
            return new NpgsqlConnection(_connectionString.ConnectionString);
        }


        // CRUD
        public async Task<bool> DeleteBranch(int id)
        {
            var db = dbConnection();

            var sql = @"  DELETE
                          FROM public.""Branch"" 
                            WHERE id = @Id  ";

            var result = await db.ExecuteAsync(sql, new { Id = id });

            // TRUE si se elimina almenos una fila.
            return result > 0;
        }

        public async Task<IEnumerable<Branch>> GetAllBranch()
        {
            var db = dbConnection();

            var sql = @"  SELECT * FROM public.""Branch"" ";

            return await db.QueryAsync<Branch>(sql, new { });

        }

        public async Task<Branch> GetBranchData(int id)
        {
            var db = dbConnection();

            var sql = @"  SELECT *
                          FROM public.""Branch"" 
                            WHERE id = @Id  ";

            return await db.QueryFirstOrDefaultAsync<Branch>(sql, new { Id = id });

        }

        public async Task<bool> InsertBranch(Branch branch)
        {
            var db = dbConnection();

            var sql = @"  INSERT INTO public.""Branch"" (cinema_name, province, district, room_quantity)
                          VALUES (@cine_name, @province, @district, @room_quantity) ";

            var result = await db.ExecuteAsync(sql, new {branch.Cinema_name, branch.Province, branch.District, branch.Room_quantity });

            // TRUE si se inserta almenos una fila.
            return result > 0;
        }

        public async Task<bool> UpdateBranch(Branch branch)
        {
            var db = dbConnection();

            var sql = @"  UPDATE public.""Branch""
                          SET province   =  @province,
                              district   =  @district,
                              room_quantity =  @room_quantity 
                            WHERE cinema_name = @cinema_name ";

            var result = await db.ExecuteAsync(sql, new { branch.Province, branch.District, branch.Room_quantity, branch.Cinema_name });
            // Devuelve verdadero si al menos mas de una fila ha sido cambiada.
            return result > 0;
        }

    }



}
