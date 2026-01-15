import Icon from '@/components/Icon';
import { useState, useEffect } from 'react';

const FullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const handleFullScreen = () => {
    document.documentElement.requestFullscreen().catch(err => {
      console.log('进入全屏失败', err);
    });
    setIsFullScreen(true);
  };
  const handleExitFullScreen = () => {
    document.exitFullscreen().catch(err => {
      console.log('退出全屏失败', err);
    });
    setIsFullScreen(false);
  };
  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      setIsFullScreen(document.fullscreenElement !== null);
    });
    return () => {
      document.removeEventListener('fullscreenchange', () => {
        setIsFullScreen(document.fullscreenElement !== null);
      });
    };
  }, []);
  return (
    <>
      {isFullScreen ? (
        <Icon
          name="main-exit-fullscreen"
          size="1.2rem"
          onClick={handleExitFullScreen}
        />
      ) : (
        <Icon name="main-fullscreen" size="1.2rem" onClick={handleFullScreen} />
      )}
    </>
  );
};
export default FullScreen;
