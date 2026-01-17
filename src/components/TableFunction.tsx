import { Card, Input, DatePicker, type TimeRangePickerProps } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';

const { Search } = Input;
const { RangePicker } = DatePicker;

interface TableFunctionProps {
  children?: React.ReactNode;
  search?: boolean;
  date?: boolean;
  onSearch?: (value: string) => void;
  onDateChange?: (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => void;
}
const TableFunction: React.FC<TableFunctionProps> = ({
  children,
  search = true,
  date = true,
  onSearch,
  onDateChange,
}) => {
  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: '最近 7 天', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: '最近 14 天', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: '最近 30 天', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: '最近 90 天', value: [dayjs().add(-90, 'd'), dayjs()] },
  ];
  return (
    <Card
      styles={{
        body: {
          width: '100%',
          padding: '0.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      }}
    >
      {/* 按钮 */}
      {children}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          marginLeft: 'auto',
        }}
      >
        {search && (
          <Search
            placeholder="搜索文章..."
            allowClear
            enterButton="搜索"
            size="large"
            onSearch={onSearch}
            styles={{
              root: {
                width: '20rem',
                height: '2rem',
              },
              input: {
                fontSize: '0.8rem',
              },
              button: {
                root: {
                  height: '2rem',
                  background: '#333',
                  fontSize: '0.8rem',
                },
              },
            }}
          />
        )}
        {date && (
          <RangePicker
            onChange={onDateChange}
            presets={rangePresets}
            styles={{
              root: {
                width: '20rem',
                height: '2rem',
              },
              input: {
                fontSize: '0.8rem',
              },
            }}
          />
        )}
      </div>
    </Card>
  );
};
export default TableFunction;
