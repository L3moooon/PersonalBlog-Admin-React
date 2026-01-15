import { Drawer } from 'antd';
import Icon from '@/components/Icon';
import { useState } from 'react';
const Setting = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Icon name="main-setting" size="1.2rem" onClick={showDrawer} />
      <Drawer
        title="Basic Drawer"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default Setting;
