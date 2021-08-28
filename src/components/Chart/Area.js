import React from 'react';
import {Area} from '@ant-design/charts';
import css from './_.module.css';
// eslint-disable-next-line react/prop-types
const DemoArea = ({title, data, xField, yField, additionalConfig}) => {
  const config = {
    title: title,
    data: data,
    xField: xField,
    yField: yField,
    xAxis: {tickCount: 5},
    slider: {
      start: 0.1,
      end: 0.9,
      trendCfg: {isArea: true},
    },
    ...additionalConfig,
  };
  return (
    <div className={css.chartDiv}>
      <h1 className={css.chartTitle}>{title}</h1>
      <Area {...config} />
    </div>
  );
};
export default DemoArea;
