/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
// import {Line} from '@ant-design/charts';
import {Line} from 'react-chartjs-2';
import {Button, Tabs} from 'antd';
import {Legend} from 'chart.js';

const WalletChart = () => {
  const {TabPane} = Tabs;
  const [active, setActive] = useState('month');
  let income;
  let outcome;

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

  if (active == 'month') {
    income = {

      labels: ['1 сар', '2 сар', '3 сар', '4 сар', '5 сар', '6 сар', '7 сар', '8 сар', '9 сар', '10 сар', '11 сар', '12 сар'],
      datasets: [
        {
          label: 'null',
          data: [12, 19, 3, 5, 2, 3, 5, 4, 3, 7, 4, 6],
          fill: false,
          backgroundColor: '#00F9B8',
          borderColor: '#35446D',
        },
      ],
    };
  } else if (active == 'day') {
    income = {

      labels: ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба', 'Ням'],
      datasets: [
        {
          label: 'null',
          data: [12, 19, 3, 5, 2, 3, 6],
          fill: false,
          backgroundColor: '#00F9B8',
          borderColor: '#35446D',
        },
      ],
    };
  } else if (active == 'week') {
    income = {

      labels: ['1-р Д/Х', '2-р Д/Х', '3-р Д/Х', '4-р Д/Х', '5-р Д/Х'],
      datasets: [
        {
          label: 'null',
          data: [12, 19, 3, 5, 2],
          fill: false,
          backgroundColor: '#00F9B8',
          borderColor: '#35446D',
        },
      ],
    };
  }

  // const incomeMonth = {

  //   labels: ['1 сар', '2 сар', '3 сар', '4 сар', '5 сар', '6 сар', '7 сар', '8 сар', '9 сар', '10 сар', '11 сар', '12 сар'],
  //   datasets: [
  //     {
  //       label: 'null',
  //       data: [12, 19, 3, 5, 2, 3],
  //       fill: false,
  //       backgroundColor: '#00F9B8',
  //       borderColor: '#35446D',
  //     },
  //   ],
  // };


  // const data2 = {
  //   labels: ['1 сар', '2 сар', '3 сар', '4 сар', '5 сар', '6 сар', '7 сар', '8 сар', '9 сар', '10 сар', '11 сар', '12 сар'],


  //   datasets: [

  //     {
  //       label: false,
  //       data: [5, 9, 3, 5, 2, 3],
  //       fill: false,
  //       backgroundColor: '#00F9B8',
  //       borderColor: '#35446D',
  //     },
  //   ],
  // };

  if (active == 'month') {
    outcome = {

      labels: ['1 сар', '2 сар', '3 сар', '4 сар', '5 сар', '6 сар', '7 сар', '8 сар', '9 сар', '10 сар', '11 сар', '12 сар'],
      datasets: [
        {
          label: 'null',
          data: [5, 19, 3, 5, 2, 3, 5, 4, 3, 7, 4, 6],
          fill: false,
          backgroundColor: '#00F9B8',
          borderColor: '#35446D',
        },
      ],
    };
  } else if (active == 'day') {
    outcome = {

      labels: ['Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба', 'Ням'],
      datasets: [
        {
          label: 'null',
          data: [12, 19, 3, 5, 2, 3, 6],
          fill: false,
          backgroundColor: '#00F9B8',
          borderColor: '#35446D',
        },
      ],
    };
  } else if (active == 'week') {
    outcome = {

      labels: ['1-р Д/Х', '2-р Д/Х', '3-р Д/Х', '4-р Д/Х', '5-р Д/Х'],
      datasets: [
        {
          label: 'null',
          data: [12, 19, 3, 5, 2],
          fill: false,
          backgroundColor: '#00F9B8',
          borderColor: '#35446D',
        },
      ],
    };
  }

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },

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
            <button onClick={() => setActive('day')} className=" mr-[20px] text-[#35446D]">Өдөр</button>
            <button onClick={() => setActive('week')} className=" mr-[20px] text-[#35446D]">Долоо хоног</button>
            <button onClick={() => setActive('month')} className=" text-[#35446D]">Сар</button>
          </div>
          <div>
            {/* <Line {...config} /> */}
            <Line data={income} options={options} height="75"/>
          </div>
        </TabPane>
        <TabPane tab="Зарлага" key="2">
          <div style={{textAlign: 'right', lineHeight: '10px', fontSize: '11px'}}>
            <button onClick={() => setActive('day')} className="mr-[20px] text-[#35446D]"><p >Өдөр</p> </button>
            <button onClick={() => setActive('week')} className="mr-[20px] text-[#35446D]"> <p>Долоо хоног</p></button>
            <button onClick={() => setActive('month')} className=" text-[#35446D]"> <p>Сар</p></button>
          </div>
          <div>
            {/* <Line {...config} />; */}
            <Line data={outcome} options={options} height="75"/>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default WalletChart;
