import React, { useState } from 'react';
import UserProfile from '../components/UserProfile';
import SettingOption from '../components/SettingOption';
import UsernameForm from '../components/UsernameForm';
import PasswordForm from '../components/PasswordForm';
import DeleteAccountForm from '../components/DeleteAccountForm';

type Setting = 'username' | 'password' | 'delete';

const Settings = () => {
  const [active, setActive] = useState<Setting>('username');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 상단 사용자 정보 */}
      <div className=" py-10 px-6">
        <UserProfile />
      </div>

      {/* 설정 버튼 영역 */}
      <div className="max-w-4xl mx-auto py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-8">Account Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SettingOption
            icon="🔒"
            label="Change Password"
            description="Keep your account secure"
            onClick={() => setActive('password')}
            active={active === 'password'}
          />
          <SettingOption
            icon="❤️"
            label="Change Username"
            description="Pick a new nickname for your account"
            onClick={() => setActive('username')}
            active={active === 'username'}
          />
          <SettingOption
            icon="🙅‍♂️"
            label="Delete Account"
            description="Delete your account permanently"
            onClick={() => setActive('delete')}
            active={active === 'delete'}
          />
        </div>
      </div>

      {/* 하단 설정 폼 영역 */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        {active === 'username' && <UsernameForm />}
        {active === 'password' && <PasswordForm />}
        {active === 'delete' && <DeleteAccountForm />}
      </div>
    </div>
  );
};

export default Settings;
