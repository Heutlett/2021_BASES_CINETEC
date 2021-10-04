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
    class RoomRepository
    {

        // Attributo de configuracion de conexion.
        private PostgreSQLConfiguration _connectionString;

        // Constructor
        public RoomRepository(PostgreSQLConfiguration connectionString)
        {
            _connectionString = connectionString;
        }

        // Utilizar driver de Nuget para conectarse a la DB.
        protected NpgsqlConnection dbConnection()
        {
            return new NpgsqlConnection(_connectionString.ConnectionString);
        }


        // CRUD
        public async Task<bool> DeleteRoom(int id)
        {
            var db = dbConnection();

            var sql = @"  DELETE
                          FROM public.""Room"" 
                            WHERE id = @id  ";

            var result = await db.ExecuteAsync(sql, new { Id = id });

            // TRUE si se elimina almenos una fila.
            return result > 0;
        }

        public async Task<IEnumerable<Room>> GetAllBranch()
        {
            var db = dbConnection();

            var sql = @"  SELECT * FROM public.""Room"" ";

            return await db.QueryAsync<Room>(sql, new { });

        }

        public async Task<Room> GetBranchData(int id)
        {
            var db = dbConnection();

            var sql = @"  SELECT *
                          FROM public.""Branch"" 
                            WHERE id = @id  ";

            return await db.QueryFirstOrDefaultAsync<Room>(sql, new { Id = id });

        }

        public async Task<bool> InsertBranch(Room room)
        {
            var db = dbConnection();

            var sql = @"  INSERT INTO public.""Room"" (branch_name, row_quantity,  column_quantity, capacity)
                          VALUES (@branch_name, @row_quantity, @column_quantity, @capacity) ";

            var result = await db.ExecuteAsync(sql, new {room.Branch_name, room.Row_quantity, room.Column_quantity, room.Capacity});

            // TRUE si se inserta almenos una fila.
            return result > 0;
        }

        public async Task<bool> UpdateBranch(Room room)
        {
            var db = dbConnection();

            var sql = @"  UPDATE public.""Room""
                          SET branch_name   =  @branch_name,
                              row_quantity   =  @row_quantity,
                              column_quantity =  @room_quantity 
                            WHERE id = @Id ";

            var result = await db.ExecuteAsync(sql, new { room.Branch_name, room.Row_quantity, room.Column_quantity, room.Id });
            // Devuelve verdadero si al menos mas de una fila ha sido cambiada.
            return result > 0;
        }

    }



}
