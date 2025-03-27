import React from 'react';

interface Props {
  icon: string;
  label: string;
  description: string;
  onClick: () => void;
  active: boolean;
}

const SettingOption: React.FC<Props> = ({
  icon,
  label,
  description,
  onClick,
  active,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-6 border rounded-xl transition hover:shadow-md ${
        active ? 'bg-gray-100 border-black' : 'bg-white'
      }`}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <div className="font-semibold">{label}</div>
      <div className="text-sm text-gray-500 mt-1">{description}</div>
    </button>
  );
};

export default SettingOption;
