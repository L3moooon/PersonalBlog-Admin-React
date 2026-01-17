import { useRef, useEffect, useMemo, useState } from 'react';
import { createStyles } from 'antd-style';
import { getLineData } from '@/api/dashboard';
import type { EchartsTimeData } from '@/api/dashboard/type';

import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册需要的图表和组件
echarts.use([
  LineChart,
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

const ViewTrend = () => {
  const { styles } = useStyles();

  const chartRef = useRef<HTMLDivElement>(null);
  const myChart = useRef<echarts.ECharts | null>(null);

  const [dayData, setDayData] = useState<EchartsTimeData>([]);
  const [weekData, setWeekData] = useState<EchartsTimeData>([]);

  // 1. 只有数据变化时才重新计算配置
  const option = useMemo(() => {
    return {
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      grid: {
        left: '0%',
        right: '3%',
        top: '5%',
        bottom: '0%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: [
            '6:00',
            '7:00',
            '8:00',
            '9:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
            '22:00',
            '23:00',
          ],
        },
      ],
      yAxis: [
        {
          type: 'value',
          minInterval: 1,
        },
      ],
      series: [
        {
          name: '周访问量',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 0,
          },
          areaStyle: {
            opacity: 0.5,
            color: 'rgb(77, 119, 255)',
          },
          emphasis: {
            focus: 'series',
          },
          data: weekData,
        },
        {
          name: '日访问量',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 0,
          },
          areaStyle: {
            opacity: 0.5,
            color: 'rgb(128, 255, 165)',
          },
          emphasis: {
            focus: 'series',
          },
          data: dayData,
        },
      ],
    };
  }, [dayData, weekData]);

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
        const { data, code } = await getLineData();
        if (code === 1 && !cancelled) {
          setWeekData(data.week);
          setDayData(data.day);
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
