import { Flex } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  container: {
    display: 'flex',
    width: '100%',
    height: '4rem',
    backgroundColor: token.colorBgContainer,
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  desc: {
    fontSize: '1rem',
    color: token.colorTextSecondary,
    margin: '0.5rem 0 0 0.5rem',
  },
}));

interface Props {
  title: string;
  desc: string;
}
const PageHeader = (props: Props) => {
  const { title, desc } = props;
  const { styles } = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.desc}>{desc}</div>
    </div>
  );
};
export default PageHeader;
