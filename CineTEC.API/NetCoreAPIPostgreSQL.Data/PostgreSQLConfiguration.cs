using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreAPIPostgreSQL.Data
{
    public class PostgreSQLConfiguration
    {

        // Recibe un connectionString y lo asigna a una propiedadd.
        public PostgreSQLConfiguration(string connectionsString) => ConnectionString = connectionsString;
        public string ConnectionString { get; set; }


    }
}
