/* eslint-disable react/prop-types */
import React from 'react';
import {Input, Divider} from 'antd';

import {useState, useEffect} from 'react';

const WalletBankInfo = (props) => {
  // const [inputValue, setInputValue] = useState('');
  const [propData, setPropData] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setPropData(props.value);
  // eslint-disable-next-line react/prop-types
  }, [props.value]);

  const onChange = (e) => {
    const {value} = e.target;
    // eslint-disable-next-line react/prop-types
    if (props.onChangeInput) {
      // eslint-disable-next-line react/prop-types
      props.onChangeInput(value);
    }
  };

  return (

    <div className='walletIput'>

      <p style={{height: 16, fontSize: 12, color: '#A2A4AA'}}>

        {props.children}
      </p>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{marginTop: '10px'}}>
          {propData && propData !== '' ? (
            <Input type="number" bordered={false} value={propData} />
          ) : (
            <Input type="number" bordered={false} onChange={onChange} />
          )}
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default WalletBankInfo;
