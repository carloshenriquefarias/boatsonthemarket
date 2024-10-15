import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

interface IncomeComparisonChartProps {
  rawData: any[];
}

const LineCharts: React.FC<IncomeComparisonChartProps> = ({ rawData }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const myChart = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current || !rawData.length) return;

    myChart.current = echarts.init(chartRef.current);

    const months = rawData.map((entry) => entry.Month);
    const freeData = rawData.map((entry) => entry.Free);
    const basicData = rawData.map((entry) => entry.Basic);
    const classicData = rawData.map((entry) => entry.Classic);
    const enhancedData = rawData.map((entry) => entry.Enhanced);
    const masterData = rawData.map((entry) => entry.Master);
    const megaData = rawData.map((entry) => entry.Mega);

    const colors = ['#9699b0', '#53BF9D', '#DBAC2C', 'cyan', '#003661',   '#E8BAAB'];

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        nameLocation: 'middle',
        data: months
      },
      yAxis: {
        name: '',
        show: false,
        axisLabel: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      series: [
        {
          type: 'line',
          name: 'Free',
          data: freeData,
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 8,
          smooth: true,
          itemStyle: {
            color: colors[0]
          }
        },
        {
          type: 'line',
          name: 'Basic',
          data: basicData,
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 8,
          smooth: true,
          itemStyle: {
            color: colors[1]
          }
        },
        {
          type: 'line',
          name: 'Classic',
          data: classicData,
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 8,
          smooth: true,
          itemStyle: {
            color: colors[2]
          }
        },
        {
          type: 'line',
          name: 'Enhanced',
          data: enhancedData,
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 8,
          smooth: true,
          itemStyle: {
            color: colors[3]
          }
        },
        {
          type: 'line',
          name: 'Master',
          data: masterData,
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 8,
          smooth: true,
          itemStyle: {
            color: colors[4]
          }
        },
        {
          type: 'line',
          name: 'Mega',
          data: megaData,
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 8,
          smooth: true,
          itemStyle: {
            color: colors[5]
          }
        }
      ],
      legend: {
        orient: 'horizontal',
        top: '5%',
        data: ['Free', 'Basic', 'Classic', 'Enhanced', 'Master', 'Mega']
      }
    };

    option && myChart.current?.setOption(option);

    return () => {
      myChart.current?.dispose();
    };
  }, [rawData]);

  return <div ref={chartRef} style={{ width: 'auto', height: '100%' }} />;
};

export default LineCharts;
