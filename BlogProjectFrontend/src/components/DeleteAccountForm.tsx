import React from 'react';

const DeleteAccountForm = () => {
  return (
    <form className="space-y-6">
      <h3 className="text-xl font-semibold text-red-600">Delete Account</h3>
      <p className="text-sm text-gray-500">
        Are you sure you want to delete your account? This action cannot be
        undone.
      </p>
      <div className="flex gap-4 justify-end">
        <button type="button" className="px-4 py-2 border rounded-md">
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Yes, Delete My Account
        </button>
      </div>
    </form>
  );
};

export default DeleteAccountForm;
