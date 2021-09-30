using NetCoreAPIPostgreSQL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreAPIPostgreSQL.Data.Repositories
{
    public interface IRoomRepository
    {
        Task<IEnumerable<Room>> GetAllRoom();
        Task<Room> GetEmployeeData(int id);
        Task<bool> InsertRoom(Room room);
        Task<bool> UpdateRoom(Room room);
        Task<bool> DeleteRoom(int id);

    }
}
