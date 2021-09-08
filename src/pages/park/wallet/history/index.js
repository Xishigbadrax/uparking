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
  const [imgSrc, setImgSrc] = useState('');
  const [symbol, setSymbol] = useState('');
  const [color, setColor] = useState(false);


  const columns = [
    {
      title: '',
      dataIndex: {imgSrc},
      // eslint-disable-next-line react/display-name
      render: () => <img alt="icon" src={imgSrc}/>,
    },
    {
      title: <p style={Header}>Өдөр</p>,
      dataIndex: 'createdDate',
    },
    {
      title: <p style={Header}>Утга</p>,
      dataIndex: 'description',
    },
    {
      title: <p style={Header}>Мөнгөн дүн</p>,
      dataIndex: 'outcome',
      // eslint-disable-next-line react/display-name
      render: (dataIndex) => color ? <text className="text-[#76E8AA]">{symbol + dataIndex}</text> : <text className="text-[#C6231A]">{symbol + dataIndex}</text>,
    },
    {
      title: <p style={Header}>Харилцах данс</p>,
      dataIndex: 'walletId',
    },
  ];

  const fetchData = async () => {
    await callGet(`/wallet/user/history?userId=${id}`, null).then((res) => {
      const arr = [];

      if (res && typeof res.history != 'undefined') {
        res.history.forEach((element) => {
          if (element['list'].length > 0) {
            element['list'].forEach((el) => {
              arr.push(el);
              if (el.outcome) {
                setImgSrc('../../images/icon/out.png');
                setSymbol('- ');
                setColor(false);
              } else {
                setImgSrc('../../images/icon/in.png');
                setSymbol('+  ');
                setColor(true);
              }
            });
          }
        });
      }

      // res.history.map((item, index) => {
      //   if (item.list.length > 0) {
      //     arr.push(item.list);
      //   }
      // });

      setdata(arr);
    });
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <WalletLayout>

      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </WalletLayout>
  );
};

export default History;
