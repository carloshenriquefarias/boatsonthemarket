import React, { useEffect } from 'react';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

interface BarChartProps {
  data: {
    source: (string | number)[][];
  };
  colors: string[];
}

const GroupBarChart: React.FC<BarChartProps> = ({ data, colors }) => {
  useEffect(() => {
    const chartDom = document.getElementById('main')!;
    const myChart = echarts.init(chartDom);
    const option: EChartsOption = {
      legend: {},
      tooltip: {},
      dataset: {
        source: data.source
      },
      xAxis: { type: 'category' },
      yAxis: {
        interval: 20,
        type: 'value'
      },
      series: [
        { type: 'bar', itemStyle: { color: colors[0] } },
        { type: 'bar', itemStyle: { color: colors[1] } },
        { type: 'bar', itemStyle: { color: colors[2] } },
        { type: 'bar', itemStyle: { color: colors[3] } },
        // { type: 'bar', itemStyle: { color: colors[4] } },       
      ]
    };

    option && myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [data, colors]);

  return <div id="main" style={{ width: 'auto', height: '95%' }} />;
};

export default GroupBarChart;
