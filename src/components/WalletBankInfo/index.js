

/* eslint-disable react/prop-types */
import React from 'react';
import {Input, Divider, Image, message} from 'antd';
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

  const success = () => {
    message.success('Амжилттай хуулагдлаа');
  };
  return (

    <div>

      <p style={{height: 16, fontSize: 12, color: '#A2A4AA'}}>

        {props.children}
      </p>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{}}>
          {propData && propData !== '' ? (
            <Input bordered={false} value={propData} />
          ) : (
            <Input bordered={false} onChange={onChange} />
          )}
        </div>
        <div>
          {/* <CopyOutlined width={'20px'} /> */}
          <div>
            <Image onClick={() => {
              navigator.clipboard.writeText(props.value), success();
            }} className="cursor-pointer" preview={false} src="../../../copy.png" />
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default WalletBankInfo;
