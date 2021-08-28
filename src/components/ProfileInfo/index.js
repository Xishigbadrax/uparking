/* eslint-disable react/prop-types */
import {Form, Input, Grid, Row, Col} from 'antd';

// eslint-disable-next-line react/prop-types
const ProfileInfo = ({data}) => {
  const screens = Grid.useBreakpoint();

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
        <Col span={screens.xl ? 12 : 24}>
          {data &&
          <Form {...layout}>
            <Form.Item label="Овог">
              <Input value={data.last_name} />
            </Form.Item>
            <Form.Item label="Нэр">
              <Input value={data.first_name} />
            </Form.Item>
            <Form.Item label="И-мэйл" >
              <Input value={data.username} />
            </Form.Item>
            <Form.Item label="Утас" >
              <Input value={data.username} />
            </Form.Item>
          </Form>
          }
        </Col>
      </Row>
    </>
  );
};

export default ProfileInfo;
