/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
// import {Line} from '@ant-design/charts';
import {Line} from 'react-chartjs-2';
import {Button, Tabs} from 'antd';
import {Legend} from 'chart.js';

const WalletChart = (props) => {
  const {TabPane} = Tabs;
  
  let outcome;
  
    outcome = {
      labels: ['1 сар', '2 сар', '3 сар', '4 сар', '5 сар', '6 сар', '7 сар', '8 сар', '9 сар', '10 сар', '11 сар', '12 сар'],
      datasets: [
        {
          label: 'null',
          data: [7, 19, 3, 5, 2, 3, 5, 4, 3, 7, 4, 6],
          fill: false,
          backgroundColor: '#00F9B8',
          borderColor: '#35446D',
        },
      ],
    };
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
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Орлого" key="1">
          {/* <div style={{textAlign: 'right', lineHeight: '10px', fontSize: '11px'}}>
            <button onClick={() => setActive('day')} className=" mr-[20px] text-[#35446D]">Өдөр</button>
            <button onClick={() => setActive('week')} className=" mr-[20px] text-[#35446D]">Долоо хоног</button>
            <button onClick={() => setActive('month')} className=" text-[#35446D]">Сар</button>
          </div> */}
          <div>
            {/* <Line {...config} style={{marginTop:'-150px'}} /> */}
            <Line data={props.income} options={options} />
          </div>
        </TabPane>
        <TabPane tab="Зарлага" key="2">
          {/* <div style={{textAlign: 'right', lineHeight: '10px', fontSize: '11px'}}>
            <button onClick={() => setActive('day')} className="mr-[20px] text-[#35446D]"><p >Өдөр</p> </button>
            <button onClick={() => setActive('week')} className="mr-[20px] text-[#35446D]"> <p>Долоо хоног</p></button>
            <button onClick={() => setActive('month')} className=" text-[#35446D]"> <p>Сар</p></button>
          </div> */}
          <div>
            <Line data={outcome} options={options}/>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default WalletChart;
