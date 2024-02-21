using System.Data.Common;
using BookApi.Models;
using MySqlConnector;

namespace BookApi.Data;

public class BookRepository(MySqlDataSource database){

    public async Task InsertBook(Book book)
    {
        using var connection = await database.OpenConnectionAsync();
        using var command = connection.CreateCommand();
        command.CommandText = @"INSERT INTO `saved_books` (`author_name`, `cover_i`, `key`, `title`) VALUES (@author_name, @cover_i, @key, @title);";
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
                    Author_name = reader.GetString(2),
                    Cover_i = reader.GetInt32(3),
                };
                saved_books.Add(saved_book);
            }
        }
        return saved_books;
    }
    private static void BindParams(MySqlCommand cmd, Book book)
    {
cmd.Parameters.Add("@key", MySqlDbType.VarChar).Value = book.Key;
cmd.Parameters.Add("@title", MySqlDbType.VarChar).Value = book.Title;
cmd.Parameters.Add("@author_name", MySqlDbType.VarChar).Value = book.Author_name;
cmd.Parameters.Add("@cover_i", MySqlDbType.Int32).Value = book.Cover_i;

    }
}