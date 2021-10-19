/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
// import {Line} from '@ant-design/charts';
import {Line} from 'react-chartjs-2';
import {Button, Tabs} from 'antd';
import {Legend} from 'chart.js';
import {callGet, callPost} from '@api/api';

const WalletChart = (props) => {
  console.log(props);
  const {TabPane} = Tabs;
  const [comeData,setComeData]=useState([]);
  const [expenseData,setExpenseData]=useState([]);
  const [comeValue,setComeValue]=useState([]);
  const [expenseValue,setExpenseValue]=useState([]);
  useEffect(()=>{
 const comeD=[];
    const expeD = [];
    const comeVal=[];
    const expeVal = [];
      // props.incomeData.map((item)=>{
      //   comeD.push(item.amount);
      //   comeVal.push(item.date);
      // });
      // props.expenceData.map((item)=>{
      //   expeD.push(item.amount);
      //   expeVal.push(item.date);
      // });
      // setComeData(comeD);
      // setComeValue(comeVal);
      // setExpenseData(expeD);
      // setExpenseValue(expeVal);
      // console.log(comeD,comeVal,expeD,expeVal,'yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
    },[props]);
  let outcome;
  let income;
    income = {
      labels: comeValue,
      datasets: [
        {
          data: comeData,
          fill: false,
          backgroundColor: '#00F9B8',
          borderColor: '#35446D',
        },
      ],
    };
    outcome = {
      labels: expenseValue,
      datasets: [
        {
          label: 'null',
          data: expenseData,
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
            <Line data={income} options={options} />
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
