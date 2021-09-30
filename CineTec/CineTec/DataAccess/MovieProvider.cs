using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CineTec.Models;

namespace CineTec.DataAccess
{
    public class MovieProvider : IMovieProvider
    {
        private readonly PostgreSqlContext _context;

        public MovieProvider(PostgreSqlContext context)
        {
            _context = context;
        }


        public List<Movie> GetAllMovies()
        {

            return _context.movie.ToList();
   
        }

        public Movie GetMovie(int id)
        {
            return _context.movie.FirstOrDefault(c => c.id == id);
        }

        public void DeleteMovie(int id)
        {
            var movie = _context.movie.FirstOrDefault(c => c.id == id);
            _context.movie.Remove(movie);
            _context.SaveChanges();
        }

        public void UpdateMovie(Movie movie)
        {
            _context.movie.Update(movie);
            _context.SaveChanges();
        }

        public void InsertMovie(Movie movie)
        {
            _context.movie.Add(movie);
            _context.SaveChanges();
        }

    }
        
}
