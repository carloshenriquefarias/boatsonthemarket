import React, { useEffect } from 'react';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

interface BarChartProps {
  data: {
    amounts: number[];
    products: string[];
  };
}

const BarCharts: React.FC<BarChartProps> = ({ data }) => {
  useEffect(() => {
    const chartDom = document.getElementById('barChart')!;
    const myChart = echarts.init(chartDom);

    const colors = ['cyan', '#003661', '#DBAC2C', '#9699b0', '#53BF9D', '#E8BAAB', ]; 
    const option: EChartsOption = {
      dataset: {
        source: [
          ['amount', 'product'],
          ...data.amounts.map((amount, index) => [amount, data.products[index]])
        ]
      },
      grid: { containLabel: true },
      xAxis: { name: '' },
      yAxis: { type: 'category' },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: '{c}'
      },
      series: [
        {
          type: 'bar',
          itemStyle: {
            color: (params: any) => colors[params.dataIndex]
          },
          encode: {
            x: 'amount',
            y: 'product'
          }
        }
      ]
    };

    option && myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [data]);

  return <div id="barChart" style={{ width: 'auto', height: '100%' }} />;
};

export default BarCharts;

