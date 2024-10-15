import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

interface ChartData {
  name: string;
  data: number[];
}

interface MixedChartsProps {
  chartData: ChartData[];
}

const getColorByIndex = (index: number): string => {
  switch (index) {
    case 0:
      return '#003661';
    case 1:
      return 'cyan';
    case 2:
      return '#53BF9D';
    case 3:
      return '#DBAC2C';
    default:
      return 'black'; // ou outra cor padrão
  }
};

// ...

const MixedCharts: React.FC<MixedChartsProps> = ({ chartData }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const myChart = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    myChart.current = echarts.init(chartRef.current);

    const option: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          crossStyle: {
            color: '#999',
          },
        },
      },
      legend: {
        data: chartData.map(({ name }) => name),
      },
      xAxis: [
        {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          axisPointer: {
            type: 'shadow',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          min: 0,
          axisLabel: {
            formatter: '{value}',
          },
          splitLine: { show: false },
        },
        {
          type: 'value',
          min: 0,
          interval: 3000,
          axisLabel: {
            formatter: '${value}',
          },
          splitLine: { show: false },
          axisTick: { show: false },
        },
      ],
      series: chartData.map(({ name, data }, index) => ({
        name,
        type: index === chartData.length - 1 ? 'line' : 'bar',
        yAxisIndex: index >= 1 ? 1 : 0,
        data,
        itemStyle: {
          color: index === chartData.length - 1 ? '#DBAC2C' : getColorByIndex(index),
        },
      })),
    };

    option && myChart.current?.setOption(option);

    return () => {
      myChart.current?.dispose();
    };
  }, [chartData]);

  return <div ref={chartRef} style={{ width: 'auto', height: '400px', paddingTop: '15px' }} />;
};

export default MixedCharts;
