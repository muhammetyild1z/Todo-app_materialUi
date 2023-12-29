using Microsoft.AspNetCore.Identity;
using System.Reflection;
using TodoAppAPI.Concrate;
using TodoAppAPI.Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<TodoAppContext>();
builder.Services.AddIdentity<AppUser, AppRole>(
    opt =>
    {
        opt.Password.RequireNonAlphanumeric = false;
        opt.Password.RequiredLength = 1;
        opt.Password.RequireUppercase = false;
        opt.Password.RequireLowercase = false;
        opt.Password.RequireDigit = false;

        // opt.SignIn.RequireConfirmedEmail = true;//mail doðrulamasý olsun mu

    }
    )
    //.AddErrorDescriber<CustomerIdentityValidation>()
    .AddEntityFrameworkStores<TodoAppContext>();


builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();




builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.SetIsOriginAllowed((host) => true)
            //WithOrigins("https://localhost:44385/") 
                   .AllowCredentials()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllowSpecificOrigin");
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
