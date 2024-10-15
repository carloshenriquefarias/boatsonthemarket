import React, { useEffect } from 'react';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

interface PieChartProps {
  data: {
    seriesData: { value: number; name: string }[];
  };
}

const PieCharts: React.FC<PieChartProps> = ({ data }) => {
  useEffect(() => {
    const chartDom = document.getElementById('pieChart')!;
    const myChart = echarts.init(chartDom);

    const colors = ['cyan', '#9699b0', '#DBAC2C', '#003661', '#53BF9D', '#E8BAAB'];

    // Converter os valores para percentuais
    const totalValue = data.seriesData.reduce((sum, item) => sum + item.value, 0);
    const percentualData = data.seriesData.map(item => ({
      value: (item.value / totalValue) * 100,
      name: item.name
    }));

    const option: EChartsOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c}%'
      },
      series: [
        {
          name: 'Percentual',
          type: 'pie',
          radius: '60%',
          center: ['50%', '50%'],
          data: percentualData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          itemStyle: {
            color: (params: any) => colors[params.dataIndex]
          }
        }
      ]
    };

    option && myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [data]);

  return <div id="pieChart" style={{ width: 'auto', height: '100%' }} />;
};

export default PieCharts;
