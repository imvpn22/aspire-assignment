import React from "react";

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
      <div className="max-w-2xl bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-8">
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Account Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Email Notifications
                </label>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Dark Mode
                </label>
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Privacy Settings
            </h3>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Profile Visibility
              </label>
              <select className="mt-1 block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option>Public</option>
                <option>Private</option>
                <option>Friends Only</option>
              </select>
            </div>
          </div>

          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Application Settings
            </h3>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Language
              </label>
              <select className="mt-1 block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
