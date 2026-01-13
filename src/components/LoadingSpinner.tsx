import { Spin } from 'antd';
import { useEffect, useRef, useState } from 'react';

const LoadingSpinner = () => {
  const [percent, setPercent] = useState(-50);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setPercent(v => {
        const nextPercent = v + 5;
        return nextPercent > 150 ? -50 : nextPercent;
      });
    }, 100);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [percent]);

  const mergedPercent = 'auto';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Spin percent={mergedPercent} size="large" />
    </div>
  );
};

export default LoadingSpinner;
