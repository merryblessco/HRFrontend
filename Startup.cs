public class Startup
{
    // ... existing code ...

    public void ConfigureServices(IServiceCollection services)
    {
        // ... existing code ...

        services.AddScoped<IApplicantService, ApplicantService>();
        services.AddControllers();
    }

    // ... existing code ...
}