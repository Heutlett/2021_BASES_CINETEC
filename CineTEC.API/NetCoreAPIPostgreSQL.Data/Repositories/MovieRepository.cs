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
    class MovieRepository
    {

        private PostgreSQLConfiguration _connectionString;

        // Constructor
        public MovieRepository(PostgreSQLConfiguration connectionString)
        {
            _connectionString = connectionString;
        }

        // Utilizar driver de Nuget para conectarse a la DB.
        protected NpgsqlConnection dbConnection()
        {
            return new NpgsqlConnection(_connectionString.ConnectionString);
        }


        // CRUD
        public async Task<bool> DeleteMovie(int id)
        {
            var db = dbConnection();

            var sql = @"  DELETE
                          FROM public.""Movie"" 
                            WHERE id = @Id  ";

            var result = await db.ExecuteAsync(sql, new { Id = id });

            // TRUE si se elimina almenos una fila.
            return result > 0;
        }

        public async Task<IEnumerable<Client>> GetAllMoviet()
        {
            var db = dbConnection();

            var sql = @"  SELECT * FROM public.""Movie"" ";

            return await db.QueryAsync<Client>(sql, new { });

        }

        public async Task<Client> GetMovieData(int id)
        {
            var db = dbConnection();

            var sql = @"  SELECT *
                          FROM public.""Movie"" 
                            WHERE id = @Id  ";

            return await db.QueryFirstOrDefaultAsync<Client>(sql, new { Id = id });

        }

        public async Task<bool> InsertMovie(Movie movie)
        {
            var db = dbConnection();

            var sql = @"  INSERT INTO public.""Employee"" (classification_id, image, original_name, name, lenght)
                          VALUES (@classification_id, @image, @original_name, @name, @lenght) ";

            var result = await db.ExecuteAsync(sql, new
            {
                movie.Classification_id,
                movie.Image,
                movie.Original_name,
                movie.Name,
                movie.Length
            });

            // TRUE si se inserta almenos una fila.
            return result > 0;
        }

        public async Task<bool> UpdateMovie(Movie movie)
        {
            var db = dbConnection();

            var sql = @"  UPDATE public.""Movie""
                          SET classification_id =  @classification_id
                              image =  @image,
                              original_name =  @original_name,
                              name =  @name,
                              length =  @length   
                            WHERE id = @Id ";

            var result = await db.ExecuteAsync(sql, new
            {
                movie.Classification_id,
                movie.Image,
                movie.Original_name,
                movie.Name,
                movie.Length,
                movie.Id

            });
            // Devuelve verdadero si al menos mas de una fila ha sido cambiada.
            return result > 0;
        }

    }



}
