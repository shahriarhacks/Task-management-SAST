import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTitle from "../../hooks/useTitle";
import { useQuery } from "react-query";
import Lottie from "lottie-react";
import anim from "../../assets/task.json";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";

const UpdateTask = () => {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [err, setErr] = useState("");
  const axiosSecure = useAxiosSecure();
  useTitle("Update Task");
  const {
    data: task = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/task/${id}`);
      return res.data;
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/task";
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleCreate = async (data) => {
    const updatedData = { ...task.data, ...data };
    const { data: dbData } = await axiosSecure.patch(
      `/task/${id}`,
      updatedData
    );
    if (dbData.success) {
      refetch();
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: dbData.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    }
  };

  if (isLoading) {
    return <div>Loading....</div>;
  }
  return (
    <div className="bg-black">
      <section className="container items-center px-4 pb-12 mx-auto mt-10 lg:flex md:px-40">
        <div className="flex-1 space-y-4 sm:text-center lg:text-left">
          <div className="w-96 p-7">
            <h2 className="text-xl text-center text-white">Update Your Task</h2>
            <div>
              {err && <p className="text-red-600 text-center">{err}</p>}
            </div>
            <form onSubmit={handleSubmit(handleCreate)}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-white">Task Name</span>
                </label>
                <input
                  defaultValue={task?.data?.title}
                  type="text"
                  {...register("title", {
                    required: " Task Name is required",
                  })}
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Enter Your Task Name"
                />
                {errors.title && (
                  <p className="text-red-600">{errors.title?.message}</p>
                )}
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-white">Description</span>
                </label>
                <textarea
                  defaultValue={task?.data?.description}
                  {...register("description", {
                    required: "Description is Required",
                  })}
                  className="textarea textarea-bordered h-44 my-4 w-full"
                  placeholder="Enter Your Task Description"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>
              <div className="py-4">
                <input
                  className="btn btn-accent w-full max-w-xs hover:rounded-full"
                  value="Update"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
        <div>
          <Lottie animationData={anim} />
        </div>
      </section>
    </div>
  );
};

export default UpdateTask;
