
import React from 'react';

const PageLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full w-16 h-16 border-t-4 border-orange-500`}></div>
    </div>
  );
};

export default PageLoading;
