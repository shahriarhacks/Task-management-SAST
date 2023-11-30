import useTitle from "../../hooks/useTitle";
import task from "../../assets/task.json";
import Lottie from "lottie-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const CreateTask = ({ refetch }) => {
  useTitle("Create Task");
  const axiosPrivate = useAxiosSecure();
  const [taskError, setTaskError] = useState("");
  const { user } = useContext(AuthContext);

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
    const createdData = { ...data, status: false, email: user.email };
    const { data: cData } = await axiosPrivate.post(
      "/task/create",
      createdData
    );
    if (cData.success) {
      setTaskError(cData.message);
    }
    if (cData.success) {
      setTaskError("");
      refetch();
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: cData.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="bg-black">
      <section className="container items-center px-4 pb-12 mx-auto mt-10 lg:flex md:px-40">
        <div className="flex-1 space-y-4 sm:text-center lg:text-left">
          <div className="w-96 p-7">
            <h2 className="text-xl text-center text-white">Create Your Task</h2>
            <div>
              {taskError && (
                <p className="text-red-600 text-center">{taskError}</p>
              )}
            </div>
            <form onSubmit={handleSubmit(handleCreate)}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-white">Task Name</span>
                </label>
                <input
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
                  value="Create"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
        <div>
          <Lottie animationData={task} />
        </div>
      </section>
    </div>
  );
};

export default CreateTask;
