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
    class ClientRepository
    {

        private PostgreSQLConfiguration _connectionString;

        // Constructor
        public ClientRepository(PostgreSQLConfiguration connectionString)
        {
            _connectionString = connectionString;
        }

        // Utilizar driver de Nuget para conectarse a la DB.
        protected NpgsqlConnection dbConnection()
        {
            return new NpgsqlConnection(_connectionString.ConnectionString);
        }


        // CRUD
        public async Task<bool> DeleteClient(int id)
        {
            var db = dbConnection();

            var sql = @"  DELETE
                          FROM public.""Client"" 
                            WHERE id = @Id  ";

            var result = await db.ExecuteAsync(sql, new { id = id });

            // TRUE si se elimina almenos una fila.
            return result > 0;
        }

        public async Task<IEnumerable<Client>> GetAllClient()
        {
            var db = dbConnection();

            var sql = @"  SELECT * FROM public.""Client"" ";

            return await db.QueryAsync<Client>(sql, new { });

        }

        public async Task<Client> GetClientData(int id)
        {
            var db = dbConnection();

            var sql = @"  SELECT *
                          FROM public.""Client"" 
                            WHERE id = @Id  ";

            return await db.QueryFirstOrDefaultAsync<Client>(sql, new { Id = id });

        }

        public async Task<bool> InsertClient(Client client)
        {
            var db = dbConnection();

            var sql = @"  INSERT INTO public.""Employee"" (first_name, middle_name, first_surname, second_surname, birth_date, phone_number, username, password, age)
                          VALUES (@first_name, @middle_name, @first_surname, @second_surname, @birth_date, @phone_number, @username, @password, @age) ";

            var result = await db.ExecuteAsync(sql, new { client.Id, client.First_name, client.Middle_name, client.First_surname, 
                                                          client.Second_surname, client.Birth_date, client.Phone_number, client.Username, client.Password, client.Age }) ;

            // TRUE si se inserta almenos una fila.
            return result > 0;
        }

        public async Task<bool> UpdateClient(Client client)
        {
            var db = dbConnection();

            var sql = @"  UPDATE public.""Employee""
                          SET first_name =  @first_name,
                              middle_name =  @middle_name,
                              first_surname =  @first_surname,
                              second_surname =  @second_surname,
                              birth_date =  @birth_date,
                              phone_number = @phone_number,
                              username =  @username,
                              password =  @password,
                              age =  @age
                            WHERE id = @Id ";

            var result = await db.ExecuteAsync(sql, new
            {
                client.First_name,
                client.Middle_name,
                client.First_surname,
                client.Second_surname,
                client.Birth_date,
                client.Phone_number,
                client.Username,
                client.Password,
                client.Age,
                client.Id
            });
            // Devuelve verdadero si al menos mas de una fila ha sido cambiada.
            return result > 0;
        }

    }



}
