using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OwlMigo.DTOs.Goal;
using OwlMigo.Interfaces;
using OwlMigo.Models;

namespace OwlMigo.Controllers
{
    [Route("api/goal")]
    [ApiController]
    public class GoalController : ControllerBase
    {
        private readonly IGoalRepo goalRepo;

        public GoalController(IGoalRepo goalRepo)
        {
            this.goalRepo = goalRepo;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateGoal([FromBody] GoalDto goalDto)
        {
            Goal goal = await goalRepo.CreateGoal(goalDto);

            if (goal == null)
            {
                return BadRequest("Error creating new goal");
            }

            return Ok(goal);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGoal([FromRoute] int id)
        {
            Goal goal = await goalRepo.GetGoalById(id);

            if (goal == null)
            {
                return BadRequest("Failed to fetch goal from database");
            }

            return Ok(goal);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGoals()
        {
            List<Goal> goals = await goalRepo.GetAllGoals();

            if (goals.Count == 0)
            {
                return BadRequest("List of goals returned null");
            }    

            return Ok(goals);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteGoal([FromRoute] int id)
        {
            Goal goal = await goalRepo.DeleteGoal(id);

            if (goal == null)
            {
                return BadRequest("Goal couldn't be found in database");
            }

            return Ok(goal);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateGoal([FromRoute] int id, [FromBody] GoalDto goalDto)
        {
            Goal goal = await goalRepo.UpdateGoal(id, goalDto);

            if (goal == null)
            {
                return NotFound("Failed to update goal. Couldn't be found in database.");
            }

            return Ok(goal);
        }
    }
}
