import React from 'react';

const UserProfile = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 bg-gray-300 rounded-full" />
      <div>
        <p className="font-semibold">John Doe</p>
        <p className="text-gray-600 text-sm">hellothisistestemail@gmail.com</p>
      </div>
    </div>
  );
};

export default UserProfile;
