using System.Data.Common;
using System.Web.Http.Cors;
using MySqlConnector;

namespace BookApi;

[EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
public class BookRepository(MySqlDataSource database){

    public async Task InsertBook(Book book)
    {
        using var connection = await database.OpenConnectionAsync();
        using var command = connection.CreateCommand();
        command.CommandText = @"INSERT INTO `saved_books` (`key`, `title`, `author`, `cover_i`) VALUES (@key, @title, @author, @cover_i);";
        BindParams(command, book);
        await command.ExecuteNonQueryAsync();
    }

     public async Task<IReadOnlyList<Book>> AllSavedBooks()
    {
        using var connection = await database.OpenConnectionAsync();
        using var command = connection.CreateCommand();
        command.CommandText = @"SELECT * FROM books_app.saved_books;";
        return await ReadAllAsync(await command.ExecuteReaderAsync());
    }

    private async Task<IReadOnlyList<Book>> ReadAllAsync(DbDataReader reader)
    {
        var saved_books = new List<Book>();
        using (reader)
        {
            while (await reader.ReadAsync())
            {
                var saved_book = new Book
                {
                    Key = reader.GetString(0),
                    Title = reader.GetString(1),
                    Author = reader.GetString(2),
                    Cover_i = reader.GetInt32(3),
                };
                saved_books.Add(saved_book);
            }
        }
        return saved_books;
    }
    private static void BindParams(MySqlCommand cmd, Book book)
    {
        cmd.Parameters.AddWithValue("@key", book.Key);
        cmd.Parameters.AddWithValue("@title", book.Title);
        cmd.Parameters.AddWithValue("@author", book.Author);
        cmd.Parameters.AddWithValue("@cover_i", book.Cover_i);
    }
}