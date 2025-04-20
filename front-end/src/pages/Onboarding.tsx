import React from "react";

const Onboarding = () => {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Welcome to Greptile!</h1>
      <h2 className="text-xl text-gray-600 mb-8">Overall Progress</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">0 of 4 completed</h3>
        <div className="space-y-4">
          {/* Task Item */}
          <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <h4 className="font-medium">Set Up Code Reviews</h4>
              <p className="text-gray-500 text-sm mt-1">
                Enhance your development process with AI-powered code reviews.
              </p>
            </div>
          </div>

          {/* Repeat for other tasks */}
          <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <h4 className="font-medium">Chat with Your Codebase</h4>
              <p className="text-gray-500 text-sm mt-1">
                Interact with your codebase using natural language.
              </p>
            </div>
          </div>

          {/* API Call Task */}
          <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <h4 className="font-medium">Make Your First API Call</h4>
              <p className="text-gray-500 text-sm mt-1">
                Integrate Greptile's powerful features into your workflow.
              </p>
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                See the changelog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
