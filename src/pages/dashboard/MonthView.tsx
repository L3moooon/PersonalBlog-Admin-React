import { useRef, useEffect, useMemo, useState } from 'react';
import { createStyles } from 'antd-style';
import { getBarData } from '@/api/dashboard';
import type { EchartsTimeData } from '@/api/dashboard/type';

import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册需要的图表和组件
echarts.use([
  BarChart,
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
]);
const useStyles = createStyles(() => ({
  map: {
    width: '100%',
    height: '30rem',
  },
}));

const formatTimeToYearMonth = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，补0
  return `${year}-${month}`;
};

const ViewTrend = () => {
  const { styles } = useStyles();

  const chartRef = useRef<HTMLDivElement>(null);
  const myChart = useRef<echarts.ECharts | null>(null);

  const [monthData, setMonthData] = useState<EchartsTimeData>([]);

  // 1. 只有数据变化时才重新计算配置
  const option = useMemo(() => {
    return {
      xAxis: [
        {
          type: 'time', // 声明为时间轴
          // interval: 3600,
          axisLabel: {
            show: true, // 显示标签
            interval: 0, // 强制显示所有标签（0 表示不自动隐藏）
            formatter: (value: number) => {
              // value 是时间戳（毫秒），需转换为可读性强的格式
              const date = new Date(value);
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              return `${year}年${month}月`; // 显示 "6:00" "7:00" 等
            },
          },
        },
      ],
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            backgroundColor: '#6a7985',
          },
          shadowStyle: {
            color: 'rgba(0,0,0,0.5)', // 阴影透明度，不遮挡图表
          },
        },
        formatter: function (params: any) {
          return `
          <div>${formatTimeToYearMonth(params[0].axisValue)}</div>
          <div>本月新增用户量：${params[0].value.toString().split(',')[1]}</div>
          `;
        },
      },
      grid: {
        left: '0%',
        right: '3%',
        top: '5%',
        bottom: '0%',
        containLabel: true,
      },
      series: [
        {
          data: monthData,
          type: 'bar',
          coordinateSystem: 'cartesian2d', // 显式指定坐标系
        },
      ],
    };
  }, [monthData]);

  // 2. 初始化图表实例、注册地图、绑定自适应事件（仅挂载时执行一次）
  useEffect(() => {
    if (!chartRef.current) return;

    // 初始化实例
    const chartInstance = echarts.init(chartRef.current);
    myChart.current = chartInstance;

    const resizeHandler = () => {
      chartInstance.resize();
    };
    window.addEventListener('resize', resizeHandler);

    // 销毁逻辑
    return () => {
      chartInstance.dispose();
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  // 3. 异步获取数据（仅挂载时执行一次）
  useEffect(() => {
    //获取数据
    let cancelled = false;
    const fetchGeoData = async () => {
      try {
        const { data, code } = await getBarData();
        if (code === 1 && !cancelled) {
          setMonthData(data);
        }
      } catch (error) {
        console.error('获取地图数据失败:', error);
      }
    };
    fetchGeoData();

    return () => {
      cancelled = true;
    };
  }, []);

  // 4. 当 option 或数据变化时，更新图表（不要在这里初始化实例）
  useEffect(() => {
    if (myChart.current) {
      myChart.current.setOption(option);
    }
  }, [option]);

  return <div ref={chartRef} className={styles.map}></div>;
};

export default ViewTrend;
