import axios from "axios";
import { useForm } from "react-hook-form";

export default function Form() {
  const endpoint = "https://openlibrary.org/search.json?q=";
  const { register, handleSubmit } = useForm();
  const replace_space = (author: string) => {
    return author.replaceAll(" ", "+");
  };
  const onSubmit = handleSubmit((data) => {
    axios
      .get(
        endpoint +
          `title:${data.title}+author:${replace_space(data.author_name)}
    `
      )
      .then((response) => console.log(response));
  });

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <input type="text" placeholder="Title" {...register("title")} />
      <input
        type="text"
        placeholder="Author name"
        {...register("author_name")}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}
