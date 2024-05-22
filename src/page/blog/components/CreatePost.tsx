import { useForm, SubmitHandler } from "react-hook-form";
import { Post } from "../../../types/post";
import { useSelector } from "react-redux";
import { cancelEditingPost, createPost, updatePost } from "../blog.reducer";
import { RootState, useAppDispatch } from "../../../sotre";
import { useEffect } from "react";
export const CreatePost = () => {
  const initialStatePost = {
    id: 0,
    name: "",
    datePublished: "",
    description: "",
    imageURL: "",
    published: false,
  };

  const dispatch = useAppDispatch();
  const editingPost = useSelector((state: RootState) => state.blog.editingPost);

  const handelCancelEditPost = () => {
    dispatch(cancelEditingPost());
    reset(initialStatePost);
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>({
    mode: "onChange",
    defaultValues: initialStatePost,
  });

  const onSubmit: SubmitHandler<Post> = (data) => {
    if (editingPost) {
      dispatch(updatePost(data));
    } else {
      dispatch(createPost(data));
    }
    reset(initialStatePost);
  };

  useEffect(() => {
    if (editingPost) {
      reset(editingPost);
    }
  }, [editingPost, reset]);

  return (
    <div>
      <h3 className="text-xl font-bold">Create New Post</h3>

      <form
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="" htmlFor="imageURL">
          URL image
          <input
            className="border border-black w-full mt-2 rounded-sm "
            id="imageURL"
            {...register("imageURL", { required: "This is required." })}
          />
          <p className="text-red-600">{errors.imageURL?.message}</p>
        </label>
        <label className="" htmlFor="name">
          Name
          <input
            className="border border-black w-full mt-2 rounded-sm "
            id="name"
            {...register("name", {
              required: "This is required",
              minLength: { value: 6, message: "Min length is 6" },
            })}
          />
          <p className="text-red-600">{errors.name?.message}</p>
        </label>
        <label htmlFor="description">
          Description
          <input
            className="border border-black w-full mt-2 rounded-sm  "
            id="description"
            {...register("description", { required: "This is required." })}
          />
          <p className="text-red-600">{errors.description?.message}</p>
        </label>{" "}
        <label className="" htmlFor="datePublished">
          Date Published
          <input
            className="border border-black w-full mt-2 rounded-sm "
            id="datePublished"
            {...register("datePublished", { required: "This is required." })}
          />
          <p className="text-red-600">{errors.datePublished?.message}</p>
        </label>
        <label className="flex gap-2 items-center" htmlFor="published">
          Published
          <input
            type="checkbox"
            className="border border-black mt-1 "
            id="published"
            {...register("published")}
          />
          <p className="text-red-600">{errors.published?.message}</p>
        </label>
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <span>This field is required</span>} */}
        {editingPost ? (
          <div className="flex mx-auto justify-center gap-4 lg:col-span-2 w-full lg:w-1/2">
            <input
              type="submit"
              value={"Save"}
              className="rounded-sm cursor-pointer font-medium  w-full border border-black hover:bg-slate-400 mx-auto py-1 px-3"
            />
            <input
              onClick={handelCancelEditPost}
              type="button"
              value={"Cancel"}
              className="rounded-sm cursor-pointer font-medium  w-full border border-black hover:bg-slate-400 mx-auto py-1 px-3"
            />
          </div>
        ) : (
          <input
            type="submit"
            value={"Submit"}
            className="rounded-sm lg:col-span-2 cursor-pointer font-medium  w-1/2 border border-black hover:bg-slate-400 mx-auto"
          />
        )}
      </form>
    </div>
  );
};
