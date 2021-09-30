using NetCoreAPIPostgreSQL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreAPIPostgreSQL.Data.Repositories
{
    public interface ISeatRepository
    {
        Task<Room> GetSeats(int room_id);
        Task<bool> UpdateStateRoom(Room room);
  
    }
}