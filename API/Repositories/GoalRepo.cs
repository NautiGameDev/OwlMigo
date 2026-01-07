using Microsoft.EntityFrameworkCore;
using OwlMigo.Data;
using OwlMigo.DTOs.Goal;
using OwlMigo.Interfaces;
using OwlMigo.Models;

namespace OwlMigo.Repositories
{
    public class GoalRepo : IGoalRepo
    {
        private readonly ApplicationDbContext dbContext;

        public GoalRepo(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Goal> CreateGoal(GoalDto goalDto)
        {
            Goal newGoal = new Goal
            {
                Name = goalDto.Name,
            };

            await dbContext.Goals.AddAsync(newGoal);
            await dbContext.SaveChangesAsync();

            return newGoal;
        }

        public async Task<Goal> DeleteGoal(int id)
        {
            Goal goal = await dbContext.Goals.FirstOrDefaultAsync(x => x.Id == id);

            if (goal == null)
            {
                return null;
            }

            dbContext.Goals.Remove(goal);
            await dbContext.SaveChangesAsync();

            return goal;
        }

        public async Task<List<Goal>> GetAllGoals()
        {
            return await dbContext.Goals.OrderBy(p => p.Name).ToListAsync();
        }

        public async Task<Goal> GetGoalById(int id)
        {
            return await dbContext.Goals.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Goal> UpdateGoal(int id, GoalDto goalDto)
        {
            Goal goal = await dbContext.Goals.FirstOrDefaultAsync(x => x.Id == id);

            goal.Name = goalDto.Name;

            await dbContext.SaveChangesAsync();

            return goal;
        }
    }
}
