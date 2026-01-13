import { Card, Flex, Col, Row, Statistic, type StatisticProps } from 'antd';
import { useEffect, useState } from 'react';
import { getNumData } from '@/api/overview/analysis';
import { createStyles } from 'antd-style';
import CountUp from 'react-countup';

import pic1 from '@/assets/icons/global.png';
import pic2 from '@/assets/icons/filetext.png';
import pic3 from '@/assets/icons/comment.png';
import pic4 from '@/assets/icons/click.png';

const formatter: StatisticProps['formatter'] = value => (
  <CountUp end={value as number} separator="," />
);
const useStyles = createStyles(() => ({
  img: {
    width: '3rem',
    height: '4rem',
    objectFit: 'contain',
    borderRadius: '0.25rem',
    display: 'block',
    marginLeft: 'auto',
  },
  sub: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
type DataCardProps = {
  data: {
    title: string;
    total: number;
    subTitle: string;
    today: number;
    img: string;
  };
};
const DataCard = (props: DataCardProps) => {
  const { styles } = useStyles();
  console.log('data', props);
  const { title, total, subTitle, today, img } = props.data;

  return (
    <Col span={6}>
      <Card variant="borderless">
        <Flex justify="space-between" align="center">
          <Statistic
            formatter={formatter}
            title={title}
            value={total}
            styles={{
              title: { color: '#333', fontSize: '1.2rem', fontWeight: 'bold' },
            }}
          />
          <div>
            <img className={styles.img} src={img} alt="" />
            <Statistic
              formatter={formatter}
              className={styles.sub}
              title={subTitle}
              value={today}
              styles={{
                header: { padding: '0' },
                title: { fontSize: '0.8rem', lineHeight: '1rem' },
                content: {
                  fontSize: '1rem',
                  color: '#7f7f7f',
                  marginLeft: '0.5rem',
                },
              }}
            />
          </div>
        </Flex>
      </Card>
    </Col>
  );
};

const StatisticData = () => {
  const baseData = {
    visit: {
      title: '总访问量',
      total: 0,
      subTitle: '今日访问量',
      today: 0,
      img: pic1,
    },
    article: {
      title: '总文章量',
      total: 0,
      subTitle: '今日发布文章',
      today: 0,
      img: pic2,
    },
    comment: {
      title: '总评论量',
      total: 0,
      subTitle: '今日收获评论',
      today: 0,
      img: pic3,
    },
    like: {
      title: '总点赞量',
      total: 0,
      subTitle: '今日收获点赞',
      today: 0,
      img: pic4,
    },
  };

  const [data, setData] = useState(baseData);

  useEffect(() => {
    let cancelled = false;
    const fetchNumData = async () => {
      try {
        const { data, code } = await getNumData();
        if (code == 1 && !cancelled) {
          const newData = {
            visit: { ...baseData.visit, ...data.visit },
            article: { ...baseData.article, ...data.article },
            comment: { ...baseData.comment, ...data.comment },
            like: { ...baseData.like, ...data.like },
          };
          setData(newData);
        } else {
          // messageApi.error('获取数据失败');
        }
      } catch (error) {
        console.error('获取数据失败:', error);
      }
    };
    fetchNumData();
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <Row gutter={16}>
      {Object.values(data).map(item => (
        <DataCard data={item} key={item.title} />
      ))}
    </Row>
  );
};
export default StatisticData;
