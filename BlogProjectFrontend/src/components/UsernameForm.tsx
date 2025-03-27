import React from 'react';

const UsernameForm = () => {
  return (
    <form className="space-y-6">
      <h3 className="text-xl font-semibold">Change Username</h3>
      <p className="text-sm text-gray-500">
        Pick a new nickname for your account
      </p>
      <div>
        <label className="block text-sm font-medium">New Username</label>
        <input
          type="text"
          placeholder="Enter your new username"
          className="w-full mt-1 p-2 border rounded-md"
        />
        <p className="text-xs text-gray-400 mt-1">3-20 characters</p>
      </div>
      <div className="flex gap-4 justify-end">
        <button type="button" className="px-4 py-2 border rounded-md">
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-md"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default UsernameForm;
