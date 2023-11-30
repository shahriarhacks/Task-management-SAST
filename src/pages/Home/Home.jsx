import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import task from "../../assets/task.json";

function Home() {
  return (
    <div className="bg-black">
      <section className="container items-center px-4 pb-12 mx-auto mt-10 lg:flex md:px-40">
        <div className="flex-1 space-y-4 sm:text-center lg:text-left">
          <h1 className="text-4xl font-bold text-yellow-500">
            Hello! Happy from TSM
          </h1>
          <p className="max-w-xl leading-relaxed text-gray-300 sm:mx-auto lg:ml-0">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
          <div className="items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
            <Link
              to="/task/create"
              className="block px-6 py-2 text-center text-white bg-yellow-600 rounded-md"
            >
              Create Task
            </Link>
          </div>
        </div>
        <div>
          <Lottie animationData={task} />
        </div>
      </section>
    </div>
  );
}

export default Home;
