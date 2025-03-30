import React from 'react';

const PasswordForm = () => {
  return (
    <form className="space-y-6">
      <h3 className="text-xl font-semibold">Change Password</h3>
      <p className="text-sm text-gray-500">Enter a new secure password</p>
      <div>
        <label className="block text-sm font-medium">New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full mt-1 p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Confirm Password</label>
        <input
          type="password"
          placeholder="Re-enter new password"
          className="w-full mt-1 p-2 border rounded-md"
        />
      </div>
      <div className="flex gap-4 justify-end">
        <button type="button" className="px-4 py-2 border rounded-md">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-black text-white rounded-md">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default PasswordForm;