import { Button } from "antd";

const CustomButton = ({ type, text, shape, key }) => {
    return (
        <Button type={type} shape={shape} key={key}>{text}</Button>
    );
};

export default CustomButton;
