import React from 'react';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
const WearableAgreement: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <div className="max-w-md w-full">
        <h2 className="text-xl font-bold mb-2 text-center">
          웨어러블 운동 보조 시스템 사용자 동의서
        </h2>
        <img
          src={img1}
          alt="사용자 동의서"
          className="w-full rounded shadow-md"
        />
      </div>

      <div className="max-w-md w-full">
        <h2 className="text-xl font-bold mb-2 text-center">
          웨어러블 운동 보조 시스템 사용자 가이드라인
        </h2>
        <img
          src={img2}
          alt="사용자 가이드라인"
          className="w-full rounded shadow-md"
        />
      </div>
    </div>
  );
};

export default WearableAgreement;