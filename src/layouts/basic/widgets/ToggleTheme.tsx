import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { setTheme } from '@/store/slices/settingSlice';

import Icon from '@/components/Icon';

const ToggleTheme = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.setting.theme);

  const handleChangeTheme = (theme: 'light' | 'dark' | 'system') => {
    console.log(22222);

    dispatch(setTheme(theme));
  };

  return (
    <>
      {theme === 'light' ? (
        <Icon
          name="main-moon"
          size="1.1rem"
          onClick={() => handleChangeTheme('dark')}
        />
      ) : (
        <Icon
          name="main-sun"
          size="1.25rem"
          onClick={() => handleChangeTheme('light')}
        />
      )}
    </>
  );
};
export default ToggleTheme;
