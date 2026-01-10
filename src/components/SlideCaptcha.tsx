import { useState, useRef } from 'react';
import { createStyles, cx } from 'antd-style';
import { Flex } from 'antd';
import Icon from './Icon';

// TODO 抓握和滑块滚动幅度不一样
const useStyles = createStyles(({ token }) => {
  return {
    wrapper: {
      width: '100%',
      height: '2.5rem',
      backgroundColor: '#e5e7eb',
      borderRadius: token.borderRadiusSM,
      position: 'relative',
      overflow: 'hidden',
      padding: '0 0.1rem',
    },
    mention: {
      whiteSpace: 'nowrap',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
    },
    text1: {
      color: '#737373',
      zIndex: '1',
    },
    text2: {
      color: '#fff',
      zIndex: '2',
    },
    inner: {
      maxWidth: 'calc(100% - 2.5rem)',
      height: '100%',
      backgroundColor: '#4ade80',
      position: 'relative',
      zIndex: '1',
      borderRadius: '0.2rem 0 0 0.2rem',
    },
    slideButton: {
      width: '2.5rem',
      height: '2.3rem',
      backgroundColor: '#fff',
      color: '#222',
      cursor: 'grab',
      position: 'absolute',
      right: '-2.5rem',
    },
  };
});

interface SlideCaptchaProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const SlideCaptcha = ({ value, onChange }: SlideCaptchaProps) => {
  const [isVerify, setIsVerify] = useState(value || false);
  const [isDrag, setIsDrag] = useState(false);
  const [progress, setProgress] = useState(0);
  const latestProgressRef = useRef(0);

  const { styles } = useStyles();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  if (value !== undefined && value !== isVerify) {
    setIsVerify(value);
    if (!value) {
      setProgress(0);
    }
  }

  const innerStyle = {
    width: `${progress}%`,
    cursor: isDrag ? 'grabbing' : 'grab',
    transition: isDrag ? 'none' : 'width 0.5s ease-in-out',
  };
  const buttonStyle = {
    borderRadius: isDrag || isVerify ? '0 0.2rem 0.2rem 0' : '0.2rem',
  };

  const startDrag = (event: React.MouseEvent) => {
    if (isVerify) return;
    event.preventDefault();
    event.stopPropagation();

    setIsDrag(true);

    const startX = event.clientX;
    const wrapperElement = wrapperRef.current;
    const buttonElement = buttonRef.current;
    if (!wrapperElement || !buttonElement) return;
    latestProgressRef.current = 0;

    const moveHandler = (event: MouseEvent) => {
      const moveX = event.clientX - startX;
      const maxX = wrapperElement.offsetWidth - buttonElement.offsetWidth;
      const movePercentage = moveX / maxX;
      const newProgress = Math.min(Math.max(movePercentage * 100, 0), 100);
      latestProgressRef.current = newProgress;
      setProgress(newProgress);
      if (latestProgressRef.current > 97.5) {
        endHandler();
      }
    };

    const endHandler = () => {
      if (latestProgressRef.current < 97.5) {
        setProgress(0);
        onChange?.(false);
      } else {
        setProgress(100);
        setIsVerify(true);
        onChange?.(true);
      }
      setIsDrag(false);

      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', endHandler);
      document.removeEventListener('mouseleave', endHandler); // Handle mouse leaving window
    };
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', endHandler);
    document.addEventListener('mouseleave', endHandler);
  };
  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {!isVerify && (
        <span className={cx(styles.mention, styles.text1)}>
          请按住滑块，拖动到最右边
        </span>
      )}
      {isVerify && (
        <span className={cx(styles.mention, styles.text2)}>验证通过</span>
      )}
      <Flex align="center" style={innerStyle} className={styles.inner}>
        <Flex
          ref={buttonRef}
          justify="center"
          align="center"
          className={styles.slideButton}
          style={buttonStyle}
          onMouseDown={startDrag}
        >
          {isVerify && (
            <Icon name="auth-check" size="1rem" color="#4ade80"></Icon>
          )}
          {!isVerify && <Icon name="auth-right" size="1rem"></Icon>}
        </Flex>
      </Flex>
    </div>
  );
};
export default SlideCaptcha;
