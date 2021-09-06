import React from 'react';
import {useState, useEffect, useContext} from 'react';
import {Image} from 'antd';
import {callGet} from '@api/api';
import Helper from '@utils/helper';
import Context from '@context/Context';

const WalletCard = () => {
  const [orderData, setOrderData] = useState({});
  const ctx = useContext(Context);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    ctx.setIsLoading(true);
    await callGet('/wallet/user', null).then((res) => {
      console.log(res, 'resres22222');
      setOrderData(res);
      ctx.setIsLoading(false);
    });
  };

  return (
    <div
      style={{
        backgroundImage: 'url(/images/wallet-background.png',
        width: '327px',
        height: '200px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div style={{padding: '25px'}}>
        <Image src={'/images/logo-white.png'} width="94px" />
        <div style={{marginTop: '50px'}}>
          <div
            style={{
              fontSize: '16px',
              lineHeight: '16px',
              textAlign: 'right',
              letterSpacing: '0.4px',
              color: '#FFFFFF',
            }}
          >
            Нийт дүн:
          </div>
          <div
            style={{
              fontSize: '26px',
              lineHeight: '28px',
              textAlign: 'right',
              letterSpacing: '0.4px',
              color: '#FFFFFF',
            }}
          >
            {orderData.walletBalance ?
              Helper.formatValueReverse(orderData.walletBalance) :
              0}
          </div>
          <div
            style={{
              fontSize: '16px',
              lineHeight: '16px',
              textAlign: 'right',
              letterSpacing: '0.4px',
              color: '#FFFFFF',
            }}
          >
            Бонус:
          </div>
          <div
            style={{
              fontSize: '26px',
              lineHeight: '28px',
              textAlign: 'right',
              letterSpacing: '0.4px',
              color: '#FFFFFF',
            }}
          >
            {orderData.promoBalance ?
              Helper.formatValueReverse(orderData.promoBalance) :
              0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
