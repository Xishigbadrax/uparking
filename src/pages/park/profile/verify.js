import {apiList, callPost} from '@api/api';
import Link from 'next/link';
// import ProfileLayout from '@components/layouts/ProfileLayout';
import {Form, Button, Divider, Input} from 'antd';
import {Steps} from 'antd';
import {Row, Col} from 'antd';
import {useState} from 'react';

const {Step} = Steps;


const Verify = () => {
  const [active, setActive] = useState(null);
  const onFinish = (values) => {
    const res = callPost(apiList.userUpdate, values.user);
    console.log('success', res);
  };

  // const onFilled = () => {
  //   const res = callGet(apiList., values.user);
  //   console.log("success", values.user);
  // };

  const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
  };
  const onChangeDividerColor = (value) =>{
    setActive(value);
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };


  return (
    <div>
      <Row className="">
        <Col span={10} style={{marginTop: '150px'}} offset={2}>
          <Row>
            <img src="/personal.png" />
          </Row>
          <Row style={{marginTop: '90px'}}>
            <Link href="/park/profile/optional">
              <Button type="link" color="primary">
                <p><b>Алгасах</b></p>
              </Button>
            </Link>
          </Row>
        </Col>
        <Col span={10} offset={1}>
          <Row>
            <Col span={16} offset={1}>
              <Steps size="small" style={{fontSize: '15px', marginTop: '50px'}} current={0}>
                <Step title={<b>Үндсэн мэдээлэл</b>} />
                <Step title="Нэмэлт мэдээлэл" />
              </Steps>
            </Col>
          </Row>
          <Row>
            <Col span={22} className='createUserDetail' offset={2}>
              <Form
                className=''
                {...layout}
                size={[8, 12]}
                layout="vertical"
                onFinish={onFinish}
                validateMessages={validateMessages}
                offset={4}
                style={{marginTop: '50px', marginLeft: '50px'}}
              >
                {active == 'Овог' ? <label style={{color: '#0013D4', fontWeight: '400'}}>Овог</label> :<label style={{color: '#A2A4AA', fontWeight: '400'}}>Овог</label>}
                <Form.Item
                  name={'firstName'}
                  style={{marginTop: '10px', width: '327px'}}
                  rules={[{required: true, message: 'Овгоо оруулна уу'}]}
                >
                  <Input onClick={() =>onChangeDividerColor('Овог')} bordered={false} style={{width: '327px'}}/>
                </Form.Item>
                {active == 'Овог' ? <Divider className="bg-gradient-to-r from-[#0013D4] to-[#00F9B8] w-[327px] h-[2px]" /> : <Divider className="h-[2px] w-[327px]"/>}


                {active == 'Нэр' ? <label className="mt-[20px] text-[#0013D4]">Нэр *</label> : <label className="mt-[20px] text-[#A2A4AA]">Нэр *</label> }
                <Form.Item
                  style={{marginTop: '10px', width: '327px'}}
                  name={'lastName'}
                  rules={[{required: true, message: 'Нэрээ оруулна уу'}]}
                >
                  <Input bordered={false} onClick={() =>onChangeDividerColor('Нэр')} style={{width: '327px'}}/>
                </Form.Item>
                {active == 'Нэр' ? <Divider className="bg-gradient-to-r from-[#0013D4] to-[#00F9B8] w-[327px] h-[2px]" /> : <Divider className="h-[2px] w-[327px]"/>}
                <Form.Item
                  style={{marginTop: '20px', width: '327px'}}
                  name={'registerNumber'}
                  rules={[
                    {required: true, message: 'Регистрийн дугаараа зөв оруулна уу?',
                      pattern: new RegExp('[А-Яа-я]{2}[0-9]{8}')},
                  ]}
                >
                  <Input bordered={false} onClick={() =>onChangeDividerColor('РД')} placeholder="Регистрийн дугаар" style={{width: '327px'}}/>
                </Form.Item>
                {active == 'РД' ? <Divider className="bg-gradient-to-r from-[#0013D4] to-[#00F9B8] w-[327px] h-[2px]" /> : <Divider className="h-[2px] w-[327px]"/>}
                <Form.Item name={['user']} style={{marginTop: '20px', width: '327px'}}>
                  <Input bordered={false} placeholder="88101010" disabled style={{width: '327px'}}/>
                </Form.Item>
                <Divider className="h-[2px] w-[327px]"/>
                <Form.Item name={ 'email'} style={{marginTop: '20px', width: '327px'}} rules={[{required: true, message: 'Имейлээ зөв оруулна уу?', pattern: new RegExp( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)}]}>
                  <Input
                    bordered={false}
                    onClick={() =>onChangeDividerColor('имайл')}
                    placeholder="И-мейл"
                    style={{width: '327px'}}
                  />
                </Form.Item>
                {active == 'имайл' ? <Divider className="bg-gradient-to-r from-[#0013D4] to-[#00F9B8] w-[327px] h-[2px]" /> : <Divider className="h-[2px] w-[327px]"/>}
                <Form.Item style={{marginTop: '20px'}}
                  wrapperCol={{...layout.wrapperCol}}
                >
                  <div style={{display: 'inline-flex', width: '100%', flexWrap: 'wrap'}}>
                    <div style={{width: '50px'}}>
                      <img src="/Frame.png"></img>
                    </div>
                    <button style={{width: '230px'}} >Facebook холбох</button>
                    <div style={{width: '30px', marginTop: '5px'}}>
                      <img src="/icons/right.png"></img>
                    </div>
                  </div>
                </Form.Item>
                <Form.Item style={{marginTop: '20px'}}
                  wrapperCol={{...layout.wrapperCol}}
                >
                  <Col span={10} offset={14} style={{marginTop: '50px'}}>
                    <Button type="primary" htmlType="submit" className="flex">
                      <text>Үргэлжлүүлэх</text>
                      <div style={{marginTop: '4px', marginLeft: '5px'}}>
                        <img
                          src="/icons/arrow_forward_24px.png"
                        ></img></div>
                    </Button>
                  </Col>
                </Form.Item>
              </Form>
            </Col>
          </Row>

        </Col>
      </Row>
      <div className="grid-cols-1 lg:-mt-16 sm:mt-2 mt-2 lg:ml-32 cursor-pointer">

      </div>
    </div>
  );
};

export default Verify;
