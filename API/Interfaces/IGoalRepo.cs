using OwlMigo.DTOs.Goal;
using OwlMigo.Models;

namespace OwlMigo.Interfaces
{
    public interface IGoalRepo
    {
        Task<Goal> CreateGoal(GoalDto goalDto);
        Task<Goal> UpdateGoal(int id, GoalDto goalDto);
        Task<Goal> GetGoalById(int id);
        Task<Goal> DeleteGoal(int id);
        Task<List<Goal>> GetAllGoals();
    }
}
