import React, { useEffect, useState } from 'react';

interface TopLoaderProps {
  isLoading: boolean;
}

export const TopLoader: React.FC<TopLoaderProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let timer3: NodeJS.Timeout;

    if (isLoading) {
      setVisible(true);
      setProgress(25);
      timer1 = setTimeout(() => setProgress(65), 150);
      timer2 = setTimeout(() => setProgress(88), 350);
    } else {
      setProgress(100);
      timer3 = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 400);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isLoading]);

  if (!visible && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent">
      <div
        className="h-full bg-black shadow-[0_0_8px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transitionProperty: 'width, opacity'
        }}
      />
    </div>
  );
};
