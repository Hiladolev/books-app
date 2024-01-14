import { useForm } from "react-hook-form";

export default function Form() {
  const { register, handleSubmit } = useForm();
  const onSubmit = () => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Title" {...register("title")} />
    </form>
  );
}
