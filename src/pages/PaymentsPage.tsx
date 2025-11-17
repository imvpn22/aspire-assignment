import React from "react";

const Payments: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Payments</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Payment Method Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-6 bg-blue-500 rounded mr-3"></div>
                  <span>**** **** **** 1234</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  Edit
                </button>
              </div>
              <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400">
                + Add Payment Method
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex justify-between items-center p-3 border-b"
                >
                  <div>
                    <p className="font-medium">Payment #{item}</p>
                    <p className="text-sm text-gray-500">Dec 1, 2024</p>
                  </div>
                  <span className="text-green-600 font-semibold">$99.99</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Make a Payment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Amount"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Select Payment Method</option>
              <option>Credit Card</option>
              <option>Bank Transfer</option>
            </select>
          </div>
          <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Process Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
