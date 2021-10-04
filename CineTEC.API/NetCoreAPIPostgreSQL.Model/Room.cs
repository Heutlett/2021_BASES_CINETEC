
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreAPIPostgreSQL.Model
{
    public class Room
    {

        public string Branch_name { get; set; }
        public int Id { get; set; }
        public int Row_quantity { get; set; }
        public int Column_quantity { get; set; }
        public int Capacity { get; set; }

    }
}
