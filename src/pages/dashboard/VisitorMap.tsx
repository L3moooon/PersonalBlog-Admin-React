import { useRef, useEffect, useMemo, useState } from 'react';
import { Card } from 'antd';
import { createStyles } from 'antd-style';
import { getGeoData } from '@/api/dashboard';
import type { GeoDataItem } from '@/api/dashboard/type';
import chinaGeo from '@/assets/geo/china.json';

import * as echarts from 'echarts/core';
import { MapChart } from 'echarts/charts';
import {
  VisualMapComponent,
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册需要的图表和组件
echarts.use([
  MapChart,
  VisualMapComponent,
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
]);
const useStyles = createStyles(() => ({
  mapContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  ratioContainer: {
    width: '100%',
    aspectRatio: 5 / 3,
  },
  map: {
    width: '100%',
    height: '80%',
  },
}));
interface GeoData {
  name: string;
  value: number;
}
const VisitorMap = () => {
  const { styles } = useStyles();

  const chartRef = useRef<HTMLDivElement>(null);
  const myChart = useRef<echarts.ECharts | null>(null);

  const [geoData, setGeoData] = useState<GeoDataItem[]>([]);

  // 1. 只有数据变化时才重新计算配置
  const option = useMemo(() => {
    return {
      title: {
        text: '访客地图',
        textAlign: 'center',
      },
      tooltip: {
        trigger: 'item',
        showDelay: 1,
        transitionDuration: 0.5,
        // backgroundColor: "rgba(255, 255, 255, 0.95)",
        // borderColor: "#E8F3FF",
        borderWidth: 1,
        textStyle: { color: '#1D2129' },
        formatter: (params: GeoData) =>
          `${params.name}: ${params.value || 0} 人`,
      },
      visualMap: {
        left: 'left',
        min: 0,
        max: 100,
        inRange: {
          // color: ["#bd9683", "#955a42", "#81492c", "#68361a"],//褐色
          color: ['#f2bbb0', '#DD6B4F', '#D24735', '#B93A26'],
        },
        // text: ["30", "0"],
        calculable: true,
      },
      series: [
        {
          name: '访客数量',
          type: 'map',
          map: 'china',
          // roam: true, // 新增：允许缩放/拖拽地图
          left: '20%',
          top: '-12%',
          right: '20%',
          bottom: '0%',
          zoom: 1.2, // 放大
          center: [105, 38], // 以经度105、纬度38为中心
          label: {
            show: true,
            color: '#000', // 文字颜色
            fontSize: 14, // 文字大小
            // fontWeight: "semboid", // 文字加粗
            formatter: '{b}', // 显示省份名称
          },
          // 地图板块默认样式
          itemStyle: {
            areaColor: '#eaf1e9', // 基础底色 #bebeb6
            borderColor: '#bebeb6', // 板块边框
            borderWidth: 1,
          },
          emphasis: {
            label: { show: true, color: '#222' }, // 高亮时文字设为白色
            itemStyle: {
              areaColor: '#bed2bb',
              borderColor: '#2a6e3f',
            },
          },
          data: geoData, // 数据
        },
      ],
    };
  }, [geoData]);

  // 2. 初始化图表实例、注册地图、绑定自适应事件（仅挂载时执行一次）
  useEffect(() => {
    if (!chartRef.current) return;

    // 注册地图
    echarts.registerMap(
      'china',
      chinaGeo as Parameters<typeof echarts.registerMap>[1]
    );

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
        const { data, code } = await getGeoData();
        if (code === 1 && !cancelled) {
          setGeoData(data);
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

  return (
    <Card className={styles.mapContainer}>
      {/* <div className={styles.mapContainer}></div> */}
      <div className={styles.ratioContainer}>
        <div ref={chartRef} className={styles.map}></div>
      </div>
    </Card>
  );
};

export default VisitorMap;
