using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ApplicantsController : ControllerBase
{
    private readonly IApplicantService _applicantService;
    private readonly string _uploadFolder = "Uploads/Resumes";

    public ApplicantsController(IApplicantService applicantService)
    {
        _applicantService = applicantService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var applicants = await _applicantService.GetAllApplicantsAsync();
        return Ok(applicants);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var applicant = await _applicantService.GetApplicantByIdAsync(id);
        if (applicant == null)
            return NotFound();
        return Ok(applicant);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] Applicants applicant, IFormFile resumeFile)
    {
        if (resumeFile != null && resumeFile.Length > 0)
        {
            var fileName = Path.GetFileName(resumeFile.FileName);
            var fileExtension = Path.GetExtension(fileName).ToLower();

            if (fileExtension != ".pdf" && fileExtension != ".doc" && fileExtension != ".docx")
            {
                return BadRequest("Only PDF and Word documents are allowed.");
            }

            var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
            var filePath = Path.Combine(_uploadFolder, uniqueFileName);

            Directory.CreateDirectory(_uploadFolder);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await resumeFile.CopyToAsync(stream);
            }

            applicant.ResumeFilePath = filePath;
        }

        applicant.ApplicationDate = DateTime.UtcNow;
        applicant.Fullname = $"{applicant.FirstName} {applicant.LastName}";

        var createdApplicant = await _applicantService.CreateApplicantAsync(applicant);
        return CreatedAtAction(nameof(GetById), new { id = createdApplicant.ApplicantID }, createdApplicant);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromForm] Applicants applicant, IFormFile resumeFile)
    {
        if (id != applicant.ApplicantID)
            return BadRequest();

        var existingApplicant = await _applicantService.GetApplicantByIdAsync(id);
        if (existingApplicant == null)
            return NotFound();

        if (resumeFile != null && resumeFile.Length > 0)
        {
            // Delete old resume file if exists
            if (!string.IsNullOrEmpty(existingApplicant.ResumeFilePath) && System.IO.File.Exists(existingApplicant.ResumeFilePath))
            {
                System.IO.File.Delete(existingApplicant.ResumeFilePath);
            }

            // Save new resume file
            var fileName = Path.GetFileName(resumeFile.FileName);
            var fileExtension = Path.GetExtension(fileName).ToLower();

            if (fileExtension != ".pdf" && fileExtension != ".doc" && fileExtension != ".docx")
            {
                return BadRequest("Only PDF and Word documents are allowed.");
            }

            var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
            var filePath = Path.Combine(_uploadFolder, uniqueFileName);

            Directory.CreateDirectory(_uploadFolder);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await resumeFile.CopyToAsync(stream);
            }

            applicant.ResumeFilePath = filePath;
        }
        else
        {
            applicant.ResumeFilePath = existingApplicant.ResumeFilePath;
        }

        applicant.Fullname = $"{applicant.FirstName} {applicant.LastName}";

        await _applicantService.UpdateApplicantAsync(applicant);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var applicant = await _applicantService.GetApplicantByIdAsync(id);
        if (applicant == null)
            return NotFound();

        // Delete resume file if exists
        if (!string.IsNullOrEmpty(applicant.ResumeFilePath) && System.IO.File.Exists(applicant.ResumeFilePath))
        {
            System.IO.File.Delete(applicant.ResumeFilePath);
        }

        await _applicantService.DeleteApplicantAsync(id);
        return NoContent();
    }
}