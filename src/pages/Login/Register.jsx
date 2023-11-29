import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const [signUpError, setSignUpError] = useState("");
  const { createUser, updateUser, loginGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleRegister = (data) => {
    setSignUpError("");
    createUser(data?.email, data?.password)
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
        const userInfo = {
          displayName: data?.name,
        };
        updateUser(userInfo)
          .then(() => {
            const createdUser = {
              email: data.email,
              name: data.name,
              role: "user",
            };
            axiosPublic.post("/users/create", createdUser).then((res) => {
              if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
          })
          .catch((err) => setSignUpError(err.message));
      })
      .catch((err) => setSignUpError(err.message));
  };

  const googleLogin = () => {
    setSignUpError("");
    loginGoogle()
      .then((result) => {
        const user = result.user;
        const createdUser = {
          email: user.email,
          name: user.displayName,
          role: "user",
        };
        axiosPublic.post("/users/create", createdUser).then((res) => {
          if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User Created By Google successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          }
        });
      })
      .catch((err) => setSignUpError(err.message));
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Register</h2>
        <div>
          {signUpError && (
            <p className="text-red-600 text-center">{signUpError}</p>
          )}
        </div>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters long",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message:
                    "Password must have uppercase, number and special characters",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <input
            className="btn btn-accent w-full mt-4 hover:rounded-full"
            value="Register"
            type="submit"
          />
        </form>
        <div className="flex justify-between">
          <p> Already have an account </p>
          <Link className="text-secondary flex" to="/signin">
            Login here
          </Link>
        </div>
        <div className="divider">OR</div>
        <button
          onClick={() => googleLogin()}
          className="btn btn-outline w-full hover:rounded-full"
        >
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Register;
