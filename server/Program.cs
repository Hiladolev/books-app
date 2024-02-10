using BookApi;
using BookApi.Models;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors",(corsBuilder) =>
    {
        corsBuilder.WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
    options.AddPolicy("ProdCors",(corsBuilder) =>
    {
        corsBuilder.WithOrigins("https://myProductionSite.com")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMySqlDataSource(builder.Configuration.GetConnectionString("Default")!);


var app = builder.Build();

// GET api/savedBooks
app.MapGet("/api/savedBooks", async ([FromServices] MySqlDataSource db) =>
{
    var repository = new BookRepository(db);
    return await repository.AllSavedBooks();
});
// POST api/book
app.MapPost("/api/book", async ([FromServices] MySqlDataSource db, [FromBody] Book body) =>
{
    var repository = new BookRepository(db);
    await repository.InsertBook(body);
    return body;
});



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseCors("DevCors");
    app.UseSwagger();
    app.UseSwaggerUI();
}

else{
    app.UseCors("ProdCors");
    app.UseHttpsRedirection();
}
app.Run();
