import { Card } from 'antd';
import { useState } from 'react';

import PageHeader from '@/components/PageHeader';
import Backup from './Backup';
import Reboot from './Reboot';
import Status from './Status';

const ScheduleTask = () => {
  const [activeTabKey, setActiveTabKey] = useState('1');
  const tabList = [
    { key: '1', label: '备份' },
    { key: '2', label: '重启' },
    { key: '3', label: '状态' },
  ];
  const contentList: Record<string, React.ReactNode> = {
    '1': <Backup />,
    '2': <Reboot />,
    '3': <Status />,
  };
  return (
    <div>
      <PageHeader title="定时任务" desc="本页用于查看定时脚本执行情况" />
      <Card
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={value => setActiveTabKey(value)}
      >
        {contentList[activeTabKey]}
      </Card>
    </div>
  );
};
export default ScheduleTask;
