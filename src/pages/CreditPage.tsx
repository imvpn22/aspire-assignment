import React from "react";

const Credit: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Credit</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Credit Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                Available Credit
              </h3>
              <p className="text-2xl font-bold text-blue-600">$5,000</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-900 mb-2">
                Credit Used
              </h3>
              <p className="text-2xl font-bold text-green-600">$2,500</p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-yellow-900 mb-2">
                Credit Limit
              </h3>
              <p className="text-2xl font-bold text-yellow-600">$7,500</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credit;
