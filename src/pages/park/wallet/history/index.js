import WalletLayout from '@components/layouts/WalletLayout';
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect, useContext} from 'react';
import {Table} from 'antd';
import {callGet} from '@api/api';
import Context from '@context/Context';


const Header = {
  color: '#35446D',
  fontWeight: 'bold',
};


const History = () => {
  const {userdata} = useContext(Context);
  const id = userdata.id;
  const [data, setdata] = useState([]);
  const [imgIn, setImgIn] = useState('../../images/icon/in.png');
  const [imgOut, setImgOut] = useState('../../images/icon/out.png');

  const ctx = useContext(Context);


  const getImgColumn = (data) => {
    if (data.income) {
      return <img alt="icon" src={imgIn}/>;
    } else if (data.outcome) {
      return <img alt="icon" src={imgOut}/>;
    } else {
      return <span>-</span>;
    }
  };
  const getIncomeOutcomeColumn = (data) => {
    if (data.income) {
      return <div style={{color: '#76E8AA'}}>+ {data.income}</div>;
    } else if (data.outcome) {
      return <div style={{color: '#C6231A'}}>- {data.outcome}</div>;
    } else {
      return <span>-</span>;
    }
  };
  const columns = [
    {
      title: '',
      dataIndex: {imgOut},
      key: 'img',


      // eslint-disable-next-line react/display-name
      render: (text, data) => (
        <div>
          {getImgColumn(data)}
        </div>
      ),
    },
    {
      title: <p style={Header}>Өдөр</p>,
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: <p style={Header}>Утга</p>,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: <p style={Header}>Мөнгөн дүн</p>,
      // dataIndex: ['outcome'],
      key: 'outcome',
      // eslint-disable-next-line react/display-name
      render: (data) => (
        <div>
          {getIncomeOutcomeColumn(data)}
        </div>
      ),


    },
    {
      title: <p style={Header}>Харилцах данс</p>,
      dataIndex: 'walletId',
      key: 'walletId',
    },
  ];
  // console.log(data, 'dataaaa');
  const fetchData = async () => {
    await callGet(`/wallet/user/history?userId=${id}`, null).then((res) => {
      ctx.setIsLoading(true);
      // console.log(res, 'resssss');
      const arr = [];

      if (res && typeof res.history != 'undefined') {
        res.history.map((element, index) => {
          if (element['list'].length > 0) {
            element['list'].map((el, index) => {
              arr.push(el);
            });
          }
        });
        console.log(arr, '----------arr----------');
      }


      setdata(arr);
      ctx.setIsLoading(false);
    });
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <WalletLayout>

      <div>
        <Table columns={columns} dataSource={data} rowKey="createdDate"/>
      </div>
    </WalletLayout>
  );
};

export default History;
