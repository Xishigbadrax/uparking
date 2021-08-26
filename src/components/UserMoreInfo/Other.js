/* eslint-disable react/prop-types */
import {Form, Input, Row, Col} from 'antd';

const OtherInfo = ({data}) => {
  const layout = {
    labelCol: {
      span: 12,
    },
    wrapperCol: {
      span: 12,
    },
  };

  return (
    <>
      <Row>
        {data && (
          <Col span={24}>
            <Form {...layout}>
              <Form.Item label="Яаралтай үед холбоо барих хүнийн нэр 1">
                <Input value={data.relation_person_family} />
              </Form.Item>
              <Form.Item label="Таны юу болох">
                <Input value={data.relation_person_type} />
              </Form.Item>
              <Form.Item label="Гар утасны дугаар">
                <Input value={data.relation_person_mobile} />
              </Form.Item>
              <Form.Item label="Яаралтай үед холбоо барих хүнийн нэр 2">
                <Input value={data.relation_person_family2} />
              </Form.Item>
              <Form.Item label="Таны юу болох">
                <Input value={data.relation_person_type2} />
              </Form.Item>
              <Form.Item label="Гар утасны дугаар">
                <Input value={data.relation_person_mobile2} />
              </Form.Item>
            </Form>
          </Col>
        )}
      </Row>
    </>
  );
};

export default OtherInfo;
