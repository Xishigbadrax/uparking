import {apiList, callPost} from '@api/api';
import Link from 'next/link';
import ProfileLayout from '@components/layouts/ProfileLayout';
import {Form, Button, Input} from 'antd';
import {Steps} from 'antd';
import {Row, Col} from 'antd';

const {Step} = Steps;


const Verify = () => {
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
    <ProfileLayout className="" style={{width: '100%', height: '100vh'}}>
      <Row className="">
        <Col span={10} style={{marginTop: '150px'}} offset={2}>
          <img src="/personal.png" />
        </Col>
        <Col span={10} offset={2}>
          <Steps size="small" style={{fontSize: '15px'}} current={0}>
            <Step title="Үндсэн мэдээлэл" size="middle" />
            <Step title="Нэмэлт мэдээлэл" />
          </Steps>

          <Form
            {...layout}
            name="n,est-messages"
            size={[8, 12]}
            layout="vertical"
            onFinish={onFinish}
            validateMessages={validateMessages}
            offset={4}
            className="col-4"
            style={{marginTop: '50px', marginLeft: '50px'}}
          >
            <Form.Item
              name={['user', 'firstName']}
              rules={[{required: true, message: 'Овгоо оруулна уу'}]}
              label="Овог"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Нэр"
              style={{marginTop: '-10px', fontSize: '10px'}}
              name={['user', 'lastName']}
              rules={[{required: true, message: 'Нэрээ оруулна уу'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['user', 'registerNumber']}
              rules={[
                {required: true, message: 'Регистрийн дугаараа оруулна уу?'},
              ]}
            >
              <Input placeholder="Регистрийн дугаар" className="w-full h-10" />
            </Form.Item>
            <Form.Item name={['user']}>
              <Input placeholder="88101010" />
            </Form.Item>
            <Form.Item name={['user', 'email']}>
              <Input
                placeholder="И-мейл"
                style={{borderBottom: '1px solid gray'}}
              />
            </Form.Item>
            <Form.Item
              className="w-full flex"
              wrapperCol={{...layout.wrapperCol}}
            >
              <div className="flex cursor-pointer justify-space-between w-full">
                <div className="">
                  <img src="/Frame.png"></img>
                </div>
                <button className="ml-4">Facebook холбох</button>
                <div className="mt-2 ml-12">
                  <img src="/icons/right.png"></img>
                </div>
              </div>
            </Form.Item>
            <Form.Item
              className="lg:ml-64 lg:mt-16 sm:mt-4"
              wrapperCol={{...layout.wrapperCol}}
            >
              <Button type="primary" htmlType="submit" className="flex">
                <text>Үргэлжлүүлэх</text>
                <img
                  className="ml-8 mt-2 pr-2"
                  src="/icons/arrow_forward_24px.png"
                ></img>
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <div className="grid-cols-1 lg:-mt-16 sm:mt-2 mt-2 lg:ml-32 cursor-pointer">
        <Link href="/park/profile/optional">
          <Button type="link" color="primary">
            Алгасах
          </Button>
        </Link>
      </div>
    </ProfileLayout>
  );
};

export default Verify;
