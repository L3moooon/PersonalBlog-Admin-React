import buildingImg from '@/assets/images/build.png';
import { Flex } from 'antd';
const TrackList = () => {
  return (
    <Flex orientation="vertical" align="center" justify="center">
      <img src={buildingImg} alt="" style={{ marginTop: '15rem' }} />
      开发中...
    </Flex>
  );
};
export default TrackList;
