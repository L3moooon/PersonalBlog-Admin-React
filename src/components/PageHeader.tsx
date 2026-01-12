import { Flex } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
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
    <Flex>
      <div className={styles.title}>{title}</div>
      <div className={styles.desc}>{desc}</div>
    </Flex>
  );
};
export default PageHeader;
