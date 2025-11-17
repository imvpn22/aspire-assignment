import React from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Our App
          </h1>
          <p className="text-lg text-gray-600">
            This is a dummy home page component
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Feature 1</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Feature 2</h2>
            <p className="text-gray-600">
              Sed do eiusmod tempor incididunt ut labore et dolore magna.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Feature 3</h2>
            <p className="text-gray-600">
              Ut enim ad minim veniam, quis nostrud exercitation.
            </p>
          </div>
        </main>

        <div className="text-center mt-12">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
