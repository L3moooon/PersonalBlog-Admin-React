import { createStyles } from 'antd-style';

type CustomErrorHelpProps = {
  errors: string;
};
const useErrorStyles = createStyles(({ token }) => ({
  customErrorHelp: {
    position: 'absolute',
    top: '-1.7rem',
    right: '0',
    color: token.colorError,
    fontSize: '0.8rem',
  },
}));
const CustomErrorHelp = ({ errors }: CustomErrorHelpProps) => {
  const { styles } = useErrorStyles();
  return (
    <div className={styles.customErrorHelp}>
      <span>{errors}</span>
    </div>
  );
};

export default CustomErrorHelp;
