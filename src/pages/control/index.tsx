import { Outlet } from 'react-router-dom';
import { createStyles } from 'antd-style';
const useStyles = createStyles(() => ({
  container: {
    position: 'relative',
    padding: '1rem',
  },
}));
const Control = () => {
  const { styles } = useStyles();
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};
export default Control;
