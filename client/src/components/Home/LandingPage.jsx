// import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <section className="dark:bg-gray-500 dark:text-gray-800 h-full py-10">
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
          <h1 className="text-4xl font-bold leading-none sm:text-5xl">
            LeetCode Problem Solver
            <span className="dark:text-teal-600"> With The Power Of </span>
            AI
          </h1>
          <p className="px-8 mt-8 mb-12 text-lg">
            Solve Problems with Artificial Intelligence. Get the best solutions
          </p>
          <div className="flex flex-wrap justify-center">
            <Link
              to="/solution"
              className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-teal-600 dark:text-gray-50"
            >
              Get started
            </Link>
            <button className="px-8 py-3 m-2 text-lg border rounded dark:text-gray-900 dark:border-gray-300">
              Learn more
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
