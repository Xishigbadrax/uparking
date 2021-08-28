/* eslint-disable react/prop-types */
import {Form, Input, Row, Col} from 'antd';

// eslint-disable-next-line react/prop-types
const Address = ({data}) => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  return (
    <>
      <Row>
        {data && (
          <Col span={24}>
            <Form {...layout}>
              <Form.Item label="Аймаг/хот">
                <Input value={data.aimag_name} />
              </Form.Item>
              <Form.Item label="Сум/дүүрэг">
                <Input value={data.sum_name} />
              </Form.Item>
              <Form.Item label="Баг/хороо">
                <Input value={data.khoroo_name} />
              </Form.Item>
              <Form.Item label="Байр/гудамж">
                <Input value={data.address_bair} />
              </Form.Item>
              <Form.Item label="Тоот">
                <Input value={data.address_toot} />
              </Form.Item>
              <Form.Item label="Хаягийн өөрчлөлтийн тоо">
                <Input value={data.address_change_count} />
              </Form.Item>
              <Form.Item label="Хаяг дээрээ бүртгэлтэй эсэх">
                <Input value={data.in_address} />
              </Form.Item>
              <Form.Item label="Тухайн хаяган дээрх хугацаа">
                <Input value={data.in_address_year} />
              </Form.Item>
            </Form>
          </Col>
        )}
      </Row>
    </>
  );
};

export default Address;
