using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreAPIPostgreSQL.Model
{
    public class Movie
    {

        public int Id { get; set; }
        public int Classification_id { get; set; }
        public string Image { get; set; }
        public string Original_name { get; set; }
        public string Name { get; set; }
        public string Length { get; set; }




    }
}
