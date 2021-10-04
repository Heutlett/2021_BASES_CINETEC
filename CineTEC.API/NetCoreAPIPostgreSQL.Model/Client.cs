using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreAPIPostgreSQL.Model
{
    public class Client
    {
        public int Id { get; set; }
        public string First_name { get; set; }
        public string Middle_name { get; set; }
        public string First_surname { get; set; }
        public string Second_surname { get; set; }
        public string Birth_date { get; set; }
        public string Phone_number { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int Age { get; set; }
    }
}
 