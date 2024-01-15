using System.Data.Common;
using MySqlConnector;

namespace BookApi

public class BookRepository(MySqlDataSource database){

    public async Task InsertAsync(Book book)
    {
        using var connection = await database.OpenConnectionAsync();
        using var command = connection.CreateCommand();
        command.CommandText = @"INSERT INTO `saved_books` (`key`, `title`, `author`, `cover_i`) VALUES (@key, @title, @author, @cover_i);";
        BindParams(command, book);
        await command.ExecuteNonQueryAsync();
    }

    private async Task<IReadOnlyList<Book>> ReadAllAsync(DbDataReader reader)
    {
        var saved_books = new List<Book>();
        using (reader)
        {
            while (await reader.ReadAsync())
            {
                var book = new Book
                {
                    Key = reader.GetString(0),
                    Title = reader.GetString(1),
                    Author = reader.GetString(2),
                    Cover_i = reader.GetInt16(2),
                };
                saved_books.Add(book);
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