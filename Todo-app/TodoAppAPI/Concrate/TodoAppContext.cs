using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TodoAppAPI.Model;

namespace TodoAppAPI.Concrate
{
    public class TodoAppContext: IdentityDbContext<AppUser, AppRole, int>
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=DESKTOP-CH9SD0T;initial catalog=TodoAppDB; integrated Security=true");
        }
        public DbSet<Todo> Todos { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<AppRole> AppRoles { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Todo>().HasKey(x => x.TodoID);
            base.OnModelCreating(builder);
        }
    }
}
