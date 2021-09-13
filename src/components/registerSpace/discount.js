import {Row, Col, Divider} from 'antd';
import {Form, Input} from 'antd';
import {useEffect, useState} from 'react';
import {callGet} from '@api/api';
const discount = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [weekId, setweekId] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [monthId, setmonthId] = useState(null);
  const [weekSale1, setweekSale] = useState(null);
  const [monthSale1, setmonthSale] = useState(null);

  useEffect(async () => {
    const res = await callGet('/division/salesplit');
    console.log(res);
    if (res && res.saleSplit) {
      res.saleSplit.forEach((c) => {
        if (c.code == 'WEEKLY_SALE') {
          setweekId(c.id);
          setweekSale(c.value);
        }
        if (c.code == 'MONTHLY_SALE') {
          setmonthId(c.id);
          setmonthSale(c.value);
        }
      });
    }
  }, []);
  {props.form.setFieldsValue({
    weekSale: weekSale1,
    monthSale: monthSale1,
  });}

  return (
    <div>
      <Form form={props.form} className={'Sale'} onFinish={props.onFinish}>
        <Row>
          <Col offset={3}>
            <p
              style={{
                color: 'blue',
                fontSize: '20px',
                marginTop: '50px',
              }}
            >
              <b> Хөнгөлөлтийн хувь</b>
            </p>
          </Col>
        </Row>
        <Row>
          <Col
            offset={3}
            style={{
              fontSize: '14px',
              fontWeight: '400',
              marginTop: '10px',
              lineHeight: '20px',
              color: '#A2A4AA',
            }}
          >
            1 удаагийн захиалгаар урт хугацааны захиалга үүсгэхэд олгох
            хөнгөлөлт
          </Col>
        </Row>
        <Row style={{marginTop: '100px'}}>
          <Col offset={5}>
            <Row style={{fontSize: '14px', fontWeight: '700', color: '#A2A4AA', fontStyle: 'Helvetica', width: ' 400px'}}>
              7 хоногын захиалга - Хөнгөлөлтийн %
            </Row>
            <Form.Item
              name="weekSale"
              rules={[
                {
                  required: true,
                  // type: 'number',
                  message: '7 хоногийн хөнгөлөлтийн хувиа оруулна уу?(зөвхөн тоон утга оруулна !)',
                },
              ]}
            >
              <Input
                placeholder="5%"
                onChange={(e) => {
                  setweekSale(e.target.value);
                }}
                style={{marginTop: '20px', width: '400px', height: '44px'}}
              />
            </Form.Item>
            <Divider style={{color: 'black'}} />
            <Row style={{fontSize: '14px', marginTop: '20px', color: '#A2A4AA', fontStyle: 'Helvetica', width: ' 400px', fontWeight: '700'}}>
              1 сарын захиалга - Хөнгөлөлтийн %
            </Row>
            <Form.Item
              name="monthSale"
              rules={[
                {
                  required: true,
                  // type: 'number',
                  message: '1 сарын хөнгөлөлтийн хувиа оруулна уу?(зөвхөн тоон утга оруулна !)',
                },
              ]}
            >
              <Input
                placeholder="10%"
                style={{marginTop: '20px', width: '295px', height: '44px'}}
                onChange={(e) => {
                  setmonthSale(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </Form.Item>
            <Divider />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default discount;
