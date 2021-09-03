/* eslint-disable no-unused-vars */
import React from 'react';
// import {Line} from '@ant-design/charts';
import {Line} from 'react-chartjs-2';
import {Button, Tabs} from 'antd';

const WalletChart = () => {
  const {TabPane} = Tabs;
  // const data = [
  //   {year: '1 сар', value: 3},
  //   {year: '2 сар', value: 4},
  //   {year: '3 сар', value: 3.5},
  //   {year: '4 сар', value: 5},
  //   {year: '5 сар', value: 4},
  //   {year: '6 сар', value: 6},
  //   {year: '7 сар', value: 7},
  //   {year: '8 сар', value: 3},
  //   {year: '10 сар', value: 4},
  //   {year: '11 сар', value: 5},
  //   {year: '12 сар', value: 4},
  // ];

  // const config = {
  //   data,
  //   height: 100,
  //   xField: 'year',
  //   yField: 'value',
  //   point: {
  //     size: 5,
  //     shape: 'circle',
  //   },
  //   label: {
  //     style: {
  //       fill: 'blue',
  //     },
  //   },
  // };
  const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        // label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  const data2 = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        // label: '# of Votes',
        data: [5, 9, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    height: 10,
  };
  return (
    <div
      className=" w-[529px] h-[199px]"
      // style={{
      //   height: '199px',
      //   backgroundColor: 'red',
      //   width: '529px',
      //   overflowWrap: 'break-word',
      //   // overflow: 'hidden',
      // }}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Орлого" key="1">
          <div style={{textAlign: 'right', lineHeight: '10px', fontSize: '11px'}}>
            <button className=" mr-[20px] text-[#35446D]">Өдөр</button>
            <button className=" mr-[20px] text-[#35446D]">Долоо хоног</button>
            <button className=" text-[#35446D]">Сар</button>
          </div>
          <div>
            {/* <Line {...config} /> */}
            <Line data={data} options={options} height="75"/>
          </div>
        </TabPane>
        <TabPane tab="Зарлага" key="2">
          <div style={{textAlign: 'right', lineHeight: '10px', fontSize: '11px'}}>
            <button className="mr-[20px] text-[#35446D]"><p >Өдөр</p> </button>
            <button className="mr-[20px] text-[#35446D]"> <p>Долоо хоног</p></button>
            <button className=" text-[#35446D]"> <p>Сар</p></button>
          </div>
          <div>
            {/* <Line {...config} />; */}
            <Line data={data2} options={options} height="75"/>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default WalletChart;
