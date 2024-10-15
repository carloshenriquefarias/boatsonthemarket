import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

interface ColumnLinesProps {
  data: number[];
}

const ColumnCharts: React.FC<ColumnLinesProps> = ({ data }) => {
  const chartRef = useRef(null);
  const option: EChartsOption = {
    xAxis: [
      {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          show: false,
        },
      }
    ],
    tooltip: {
      trigger: 'axis',
    },
    series: [
      {
        name: 'Incomes',
        type: 'bar',
        data: data,
        itemStyle: {
          color: '#003661'
        },
      }
    ]
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);
    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: 'auto', height: '100%', margin: 'auto' }} />;
};

export default ColumnCharts;
