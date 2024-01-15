using Microsoft.EntityFrameworkCore;

namespace Server.Models;

public class ServerContext : DbContext
{
    public ServerContext(DbContextOptions<ServerContext> options)
        : base(options)
    {
    }

    public DbSet<Book> Books { get; set; } = null!;
}