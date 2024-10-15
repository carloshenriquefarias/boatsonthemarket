import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

interface HorizontalChartsProps {
  seriesData: { Product: string; Amount: number }[];
}

const HorizontalCharts: React.FC<HorizontalChartsProps> = ({ seriesData }) => {
  const chartRef = useRef(null);
  const myChart = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    myChart.current = echarts.init(chartRef.current);

    const colors = ['cyan', '#003661', '#DBAC2C', '#9699b0', '#53BF9D', '#E8BAAB'];

    const option: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: seriesData.map(entry => entry.Product),
        align: 'left',
        textStyle: {
          color: '#333'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: ['All boats']
      },
      series: seriesData.map((entry, index) => ({
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: colors[index % colors.length] 
        },
        name: entry.Product, 
        data: [entry.Amount]
      }))
    };

    option && myChart.current?.setOption(option);

    return () => {
      myChart.current?.dispose();
    };
  }, [seriesData]);

  return <div ref={chartRef} style={{ width: '100%', height: '250px' }} />;
};

export default HorizontalCharts;
