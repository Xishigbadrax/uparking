/* eslint-disable react/prop-types */
import React from 'react';
import {Input, Divider} from 'antd';

const WalletBankInfo2 = (props) => {
  const onChange = (e) => {
    const {value} = e.target;
    if (props.onChangeInput) {
      props.onChangeInput(value);
    }
  };
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{}}>
          <Input
            bordered={false}
            placeholder={props.place}
            onChange={onChange}
          />
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default WalletBankInfo2;
