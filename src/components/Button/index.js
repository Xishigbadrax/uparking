import {Button} from 'antd';

// eslint-disable-next-line react/prop-types
const CustomButton = ({type, text, shape, key}) => {
  return (
    <Button type={type} shape={shape} key={key}>{text}</Button>
  );
};

export default CustomButton;
