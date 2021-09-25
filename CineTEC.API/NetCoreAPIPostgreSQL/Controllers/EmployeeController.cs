using Microsoft.AspNetCore.Mvc;
using NetCoreAPIPostgreSQL.Data.Repositories;
using NetCoreAPIPostgreSQL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAPIPostgreSQL.Controllers
{
    [ApiController]
    [Route("/cinetec.cr/[controller]")]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            return Ok(await _employeeRepository.GetAllEmployees());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeDetails(int id)
        {
            return Ok(await _employeeRepository.GetEmployeeData(id));
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] Employee emp)
        {
            if (emp == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _employeeRepository.InsertEmployee(emp);
            return Created("created", created);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateEmployee([FromBody] Employee emp)
        {
            if (emp == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _employeeRepository.UpdateEmployee(emp);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {

            await _employeeRepository.DeleteEmployee(id);
            return NoContent();
        }

    }
}
