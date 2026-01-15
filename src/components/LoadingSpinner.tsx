import { Spin } from 'antd';

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <Spin size="large" />
      <div style={{ marginTop: '1rem' }}>加载中...</div>
    </div>
  );
};

export default LoadingSpinner;
