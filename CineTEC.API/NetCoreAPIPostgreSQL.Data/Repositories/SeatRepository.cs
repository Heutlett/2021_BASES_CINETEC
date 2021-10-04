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
    class SeatRepository
    {


        // Attributo de configuracion de conexion.
        private PostgreSQLConfiguration _connectionString;

        // Constructor
        public SeatRepository(PostgreSQLConfiguration connectionString)
        {
            _connectionString = connectionString;
        }

        // Utilizar driver de Nuget para conectarse a la DB.
        protected NpgsqlConnection dbConnection()
        {
            return new NpgsqlConnection(_connectionString.ConnectionString);
        }


        // CRUD

        public async Task<Seat> GetSeats(int room_id)
        {
            var db = dbConnection();

            var sql = @"  SELECT *
                          FROM public.""Seat"" 
                            WHERE room_id = @Id  ";

            return await db.QueryFirstOrDefaultAsync<Seat>(sql, new { Id = room_id});

        }

        
        public async Task<bool> UpdateStateSeat(Seat seat)
        {
            var db = dbConnection();

            var sql = @"  UPDATE public.""Employee""
                          SET status   =  @status,
                            WHERE room_id = @room_id AND n number = @number ";

            var result = await db.ExecuteAsync(sql, new { seat.Status, seat.Room_id, seat.Number });
            // Devuelve verdadero si al menos mas de una fila ha sido cambiada.
            return result > 0;
        }

    }






}
}
