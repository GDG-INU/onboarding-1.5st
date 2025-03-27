// src/pages/About.tsx
// import React from 'react';

const About = () => {
  return (
    <div className="w-full flex flex-col items-center  px-4 pt-24 pb-12 min-h-screen ">
      <div className="w-7xl">
        {/* 타이틀 */}
        <h1 className="text-3xl font-bold mb-4">About</h1>

        {/* 본문 텍스트 */}
        <div className="text-gray-700 max-w-4xl leading-relaxed space-y-4 ">
          <p>
            <b>GDGoC Onboarding Blog</b>는 Google Developers Group on Campus에서
            진행한 웹 개발 프로젝트의 결과물입니다. <br /> 프론트엔드부터
            백엔드까지 협업을 통해 제작되었으며, 기술 학습과 팀 프로젝트 경험을
            목표로 합니다. 이 블로그는 GDGoC 1.5기 멤버들의 손으로 직접
            만들어졌습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
