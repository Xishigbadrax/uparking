import {apiList, callPost} from '@api/api';
import Link from 'next/link';
// import ProfileLayout from '@components/layouts/ProfileLayout';
import {Form, Button, Divider, Input} from 'antd';
import {Steps} from 'antd';
import {Row, Col} from 'antd';
import {useState, useContext, useEffect} from 'react';
import Context from '@context/Context';
const {Step} = Steps;


const Verify = () => {
  const {userdata} = useContext(Context);
  const [active, setActive] = useState(null);
  const [userRealData, setUserRealData] = useState('');
  const [user, setUser] = useState(userRealData.phoneNumber);
  const onFinish = async (values) => {
    const formData = {
      email: values.email,
      fbLink: null,
      firstName: values.firstName,
      homeAddress: null,
      homeAddressDistrictId: 0,
      homeAddressLatitude: 0,
      homeAddressLongitude: 0,
      homeAddressProvinceId: 0,
      homeAddressSectionId: 0,
      lastName: values.lastName,
      registerNumber: values.registerNumber,
      workAddress: null,
      workAddressLatitude: 0,
      workAddressLongitude: 0
    }
    const res = await callPost(apiList.userUpdate, formData);

  
  };

  // const onFilled = () => {
  //   const res = callGet(apiList., values.user);
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

  useEffect( async () => {
    setUserRealData(userdata)
    setUser(userdata.phoneNumber)
  }, []);

  useEffect(async () => {
    if (typeof userdata.firstName != 'undefined') {
      setUserRealData(userdata);
    setUser(userdata.phoneNumber)
    
    }
    
  }, [userdata]);

 

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
                <p><b>??????????????</b></p>
              </Button>
            </Link>
          </Row>
        </Col>
        <Col span={10} offset={1}>
          <Row>
            <Col span={16} offset={1}>
              <Steps size="small" style={{fontSize: '15px', marginTop: '50px'}} current={0}>
                <Step title={<b>???????????? ????????????????</b>} />
                <Step title="???????????? ????????????????" />
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
                {active == '????????' ? <label style={{color: '#0013D4', fontWeight: '400'}}>????????</label> :<label style={{color: '#A2A4AA', fontWeight: '400'}}>????????</label>}
                <Form.Item
                  name={'firstName'}
                  style={{marginTop: '10px', width: '327px'}}
                  rules={[{required: true, message: '?????????? ?????????????? ????'}]}
                >
                  <Input onClick={() =>onChangeDividerColor('????????')} bordered={false} style={{width: '327px'}}/>
                </Form.Item>
                {active == '????????' ? <Divider className="bg-gradient-to-r from-[#0013D4] to-[#00F9B8] w-[327px] h-[2px]" /> : <Divider className="h-[2px] w-[327px]"/>}


                {active == '??????' ? <label className="mt-[20px] text-[#0013D4]">?????? *</label> : <label className="mt-[20px] text-[#A2A4AA]">?????? *</label> }
                <Form.Item
                  style={{marginTop: '10px', width: '327px'}}
                  name={'lastName'}
                  rules={[{required: true, message: '?????????? ?????????????? ????'}]}
                >
                  <Input bordered={false} onClick={() =>onChangeDividerColor('??????')} style={{width: '327px'}}/>
                </Form.Item>
                {active == '??????' ? <Divider className="bg-gradient-to-r from-[#0013D4] to-[#00F9B8] w-[327px] h-[2px]" /> : <Divider className="h-[2px] w-[327px]"/>}
                <Form.Item
                  style={{marginTop: '20px', width: '327px'}}
                  name={'registerNumber'}
                  rules={[
                    {required: true, message: '???????????????????? ???????????????? ?????? ?????????????? ?????',
                      pattern: new RegExp('[??-????-??]{2}[0-9]{8}')},
                  ]}
                >
                  <Input bordered={false} onClick={() =>onChangeDividerColor('????')} placeholder="???????????????????? ????????????" style={{width: '327px'}}/>
                </Form.Item>
                {active == '????' ? <Divider className="bg-gradient-to-r from-[#0013D4] to-[#00F9B8] w-[327px] h-[2px]" /> : <Divider className="h-[2px] w-[327px]"/>}
                {
                  user && userRealData ? (
                    <Form.Item name={['user']}  initialValue={user} style={{marginTop: '20px', width: '327px'}}>
                      <Input bordered={false}  placeholder={userRealData.phoneNumber} disabled style={{width: '327px'}}/>
                    </Form.Item>
                  ) : null
                }
                <Divider className="h-[2px] w-[327px]"/>
                <Form.Item name={ 'email'} style={{marginTop: '20px', width: '327px'}} rules={[{required: true, message: '?????????????? ?????? ?????????????? ?????', pattern: new RegExp( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)}]}>
                  <Input
                    bordered={false}
                    onClick={() =>onChangeDividerColor('??????????')}
                    placeholder="??-????????"
                    style={{width: '327px'}}
                  />
                </Form.Item>
                {active == '??????????' ? <Divider className="bg-gradient-to-r from-[#0013D4] to-[#00F9B8] w-[327px] h-[2px]" /> : <Divider className="h-[2px] w-[327px]"/>}
                <Form.Item style={{marginTop: '20px'}}
                  wrapperCol={{...layout.wrapperCol}}
                >
                  <div style={{display: 'inline-flex', width: '100%', flexWrap: 'wrap'}}>
                    <div style={{width: '50px'}}>
                      <img src="/Frame.png"></img>
                    </div>
                    <button style={{width: '230px'}} >Facebook ????????????</button>
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
                      <text>????????????????????????</text>
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
