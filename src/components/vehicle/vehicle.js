
import {
  Form,
  Input,
  Select,
  Divider,
} from 'antd';
import {useState} from 'react';
import {useEffect} from 'react';
import {callGet} from '@api/api';
const {Option} = Select;

const vehicle = (props) => {
  const [uildwer, setUildwer] = useState([]);
  // const [selectedUildwer, setSelectedUildwer] = useState({});
  const [zagwar, setZagwar] = useState([]);
  const [color, setColor] = useState([]);
  // const [selectedZagwar, setSelectedZagwar] = useState({});
  // const [selectedColor, setSelectedColor] = useState({});
  // const [vehicles, setVehicles] = useState([]);

  useEffect(async () => {
    // const data = await callGet('/user/vehicle/list');
    // setVehicles(data);
    const uildwer = await callGet('/user/vehicle/maker');
    // setSelectedUildwer(uildwer);
    setUildwer(uildwer);
    const color = await callGet('/user/vehicle/color');
    setColor(color);
    // const space = await callGet("/parkingspace/list");
    // setFormdata({ ...formData, rfid: "12" });
  }, []);

  const onChangeUildver = async (e) => {
    console.log('i am here-->', e);
    const uildver = uildwer.find((item) => item.value === e);
    // setSelectedUildwer(uildver);/
    const model = await callGet(`/user/vehicle/model?maker=${uildver.label}`);
    setZagwar(model);
    // setFormdata({ ...formData, maker: uildver.value });
  };
  const onChangeZagwar = (e) => {
    // console.log(e);
    // const selectZagwar = zagwar.find((item) => item.value === e);
    // setSelectedZagwar(selectZagwar);
    // setFormdata({ ...formData, model: selectZagwar.value });
  };
  const onChangeDugaar = (e) => {
    const dugar = e.target.value;
    setDugaar(dugar);
    // setFormdata({ ...formData, vehicleNumber: dugar });
  };
  const onChangeColor = (e) => {
    // console.log(e);
    // const selectColor = color.find((item) => item.label === e);
    // setSelectedColor(selectColor);
    // setFormdata({ ...formData, color: selectColor.value });
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
            {zagwar.map((item) => (
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
