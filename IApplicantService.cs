using System.Collections.Generic;
using System.Threading.Tasks;

public interface IApplicantService
{
    Task<IEnumerable<Applicants>> GetAllApplicantsAsync();
    Task<Applicants> GetApplicantByIdAsync(int id);
    Task<Applicants> CreateApplicantAsync(Applicants applicant);
    Task UpdateApplicantAsync(Applicants applicant);
    Task DeleteApplicantAsync(int id);
}