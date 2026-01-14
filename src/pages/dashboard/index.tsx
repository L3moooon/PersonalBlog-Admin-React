import { Segmented, Card, Space } from 'antd';
import { useState } from 'react';
import StatisticData from './StatisticData';
import VisitorMap from './VisitorMap';
import ViewTrend from './ViewTrend';
import MonthVsites from './MonthView';
const Dashboard = () => {
  const [column, setColumn] = useState(1);
  const handleChangeColumn = (value: string) => {
    if (value === '流量趋势') {
      setColumn(1);
    } else {
      setColumn(2);
    }
  };
  return (
    <Space orientation="vertical" size="large" style={{ width: '100%' }}>
      <StatisticData />
      <Card>
        <Segmented
          options={['流量趋势', '用户增量']}
          onChange={value => handleChangeColumn(value)}
        />
        {column === 1 ? <ViewTrend /> : <MonthVsites />}
      </Card>
      <VisitorMap />
    </Space>
  );
};
export default Dashboard;
