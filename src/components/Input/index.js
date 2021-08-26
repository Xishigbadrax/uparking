import {Form, Input} from 'antd';

// eslint-disable-next-line react/prop-types
const CustomInput = ({restField, label, name, fieldKey, placeholder, message}) => {
  return (
    <Form.Item
      {...restField}
      label={label}
      name={name}
      fieldKey={fieldKey}
      rules={[
        {
          required: message ? true : false,
          message: message,
        },
      ]}
    >
      <Input allowClear={true} placeholder={placeholder} />
    </Form.Item>
  );
};

export default CustomInput;
