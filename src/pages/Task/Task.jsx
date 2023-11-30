import { useQuery } from "react-query";
import { FcOk, FcEmptyTrash } from "react-icons/fc";
import { TbTrashXFilled, TbEditCircle } from "react-icons/tb";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTitle from "../../hooks/useTitle";
import CreateTask from "./CreateTask";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Task = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  useTitle("Task");
  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/task?email=${user.email}`);
      refetch();
      return res.data;
    },
  });
  console.log(tasks);
  if (isLoading) {
    return <div>Loading.....</div>;
  }

  if (!tasks.data.length > 0) {
    return <CreateTask refetch={refetch} />;
  }

  if (tasks.data.length > 0) {
    return (
      <div className="grid gap-2 lg:grid-cols-4">
        {tasks.data.map((task, key) => (
          <div
            className="w-full rounded-lg shadow-md bg-gray-100 lg:max-w-sm"
            key={key}
          >
            <div className="p-4">
              <div className="flex justify-around items-center">
                <div>
                  {task.status ? (
                    <FcOk size="2em" />
                  ) : (
                    <button>
                      <TbEditCircle size="2em" />
                    </button>
                  )}
                </div>
                <div>
                  <h4 className="text-xl text-center font-semibold text-blue-600">
                    {task.title}
                  </h4>
                </div>
                <div>
                  <button>
                    {task.status ? (
                      <FcEmptyTrash size="2em" />
                    ) : (
                      <TbTrashXFilled size="2em" />
                    )}
                  </button>
                </div>
              </div>
              <p className="mb-2 leading-normal text-center">
                {task.description}
              </p>
              <div className="flex justify-center items-center">
                <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default Task;
