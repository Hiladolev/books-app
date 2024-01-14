import { useForm } from "react-hook-form";

export default function Form() {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
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
