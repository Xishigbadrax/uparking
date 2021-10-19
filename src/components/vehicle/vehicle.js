import {Form, Input, Select, Divider} from 'antd';
import {useState} from 'react';
import {useEffect} from 'react';
import {callGet} from '@api/api';
const {Option} = Select;
const vehicle = (props) => {
  const [uildwer, setUildwer] = useState([]);
  const [zagwar, setZagwar] = useState([]);
  const [color, setColor] = useState([]);
  useEffect(async () => {
    const uildwer = await callGet('/user/vehicle/maker');
    setUildwer(uildwer);
    const color = await callGet('/user/vehicle/color');
    setColor(color);
  }, []);
  const onChangeUildver = async (e) => {
    const uildver = uildwer.find((item) => item.value === e);
    const model = await callGet(`/user/vehicle/model?maker=${uildver.label}`);
    setZagwar(model);
  };
  const onChangeZagwar = (e) => {
  };
  const onChangeDugaar = (e) => {
    const dugar = e.target.value;
    setDugaar(dugar);
  };
  const onChangeColor = (e) => {
  };
  return (
    <div>
      <Form
        layout="vertical"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        form={props.form}
      >
        <Form.Item
          label="Улсын дугаар"
          name="vehicleNumber"
          rules={[
            {
              required: true,
              message: 'Улсын дугаар оруулна уу',
            },
          ]}
        >
          <Input onChange={onChangeDugaar} />
        </Form.Item>
        <Divider />
        <Form.Item
          label="Үйлдвэр"
          name="maker"
          rules={[
            {
              required: true,
              message: 'Үйлдвэр сонгоно уу',
            },
          ]}
        >
          <Select onChange={onChangeUildver}>
            {uildwer.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Divider />
        <Form.Item
          label="Загвар"
          name="model"
          rules={[
            {
              required: true,
              message: 'Загвар сонгоно уу',
            },
          ]}
        >
          <Select onChange={onChangeZagwar}>
            {zagwar.map((item) =>(
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Divider />
        <Form.Item
          label="Өнгө"
          name="color"
          rules={[
            {
              required: false,
              message: 'Өнгө сонгон уу?',
            },
          ]}
        >
          <Select onChange={onChangeColor}>
            {color.map((item) => (
              <Option key={item.value} value={item.label}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Divider />
      </Form>
    </div>
  );
};
export default vehicle;
