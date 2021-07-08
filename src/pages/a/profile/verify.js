import { ConsoleSqlOutlined } from "@ant-design/icons";
import { apiList, callPost, callGet } from "@api/api";
import Link from "next/link";
import ProfileLayout from "@components/layouts/ProfileLayout";
import { InputNumber, Form, Button, Input, AutoComplete } from "antd";
import { Steps, message } from "antd";
const { Step } = Steps;
const steps = [
  {
    title: "Үндсэн мэдээлэл",
    content: "First-content",
  },
  {
    title: "Нэмэлт мэдээлэл",
    content: "Second-content",
  },
];

const verify = () => {
  const onFinish = (values) => {
    const res = callPost(apiList.userUpdate, values.user);
    console.log("success", values.user);
  };

  // const onFilled = () => {
  //   const res = callGet(apiList., values.user);
  //   console.log("success", values.user);
  // };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <ProfileLayout className="" style={{ width: "100%", height: "100vh" }}>
      <div className="grid lg:grid-cols-2  grid-cols-1 space-x lg: ml-16 ">
        <div className="grid-cols-1 p-8 justify-items-center  lg:mt-32 md:mt-16 sm:mt-8 mt-8  sm:ml-8">
          <div>
            <img src="/personal.png" />
          </div>
        </div>
        <div>
          <div className="lg:grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 grid-cols-1 lg:mt-8 lg:ml-16 w-full">
            <Steps size="small" style={{ fontSize: "15px" }} current={0}>
              <Step title="Үндсэн мэдээлэл" style={{ fontSize: "10px" }} />
              <Step title="Нэмэлт мэдээлэл" style={{ fontSize: "15px" }} />
            </Steps>
          </div>

          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            className="lg:ml-16 sm:ml-16 ml-16 w-2/3 px-3 py-3 lg:mt-8 mt-8 ml:mt-4  "
          >
            <label className="mt-16 text-xs" style={{ fontSize: "15px" }}>
              Овог
            </label>
            <Form.Item
              name={["user", "firstName"]}
              rules={[{ required: true, message: "Овгоо оруулна уу" }]}
            >
              <Input
                style={{
                  borderBottom: "2px solid gray",
                }}
                className="w-full h-10"
              />
            </Form.Item>
            <label
              className="text-xs -mt-4"
              style={{ marginTop: "-10px", fontSize: "15px" }}
            >
              Нэр
            </label>
            <Form.Item
              name={["user", "lastName"]}
              className="w-full"
              rules={[{ required: true, message: "Нэрээ оруулна уу" }]}
            >
              <Input
                style={{ borderBottom: "2px solid gray" }}
                className="w-full h-10"
              />
            </Form.Item>
            <Form.Item
              name={["user", "registerNumber"]}
              rules={[
                { required: true, message: "Регистрийн дугаараа оруулна уу?" },
              ]}
            >
              <Input
                placeholder="Регистрийн дугаар"
                style={{ borderBottom: "2px solid gray" }}
                className="w-full h-10"
              />
            </Form.Item>
            <Form.Item name={["user"]} className="w-full">
              <Input
                placeholder="88101010"
                style={{ borderBottom: "2px solid gray" }}
                className="w-full h-10"
              />
            </Form.Item>
            <Form.Item name={["user", "email"]} className="w-full">
              <Input
                placeholder="И-мейл"
                style={{ borderBottom: "2px solid gray" }}
                className="w-full h-10"
              />
            </Form.Item>
            <Form.Item
              className="w-full flex"
              wrapperCol={{ ...layout.wrapperCol }}
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
              wrapperCol={{ ...layout.wrapperCol }}
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
        </div>
      </div>

      <div className="grid-cols-1 lg:-mt-16 sm:mt-2 mt-2 lg:ml-32">
        <Link href="/admin/profile/nemelt">
          <button className="" style={{ color: "blue" }}>
            Алгасах
          </button>
        </Link>
      </div>
    </ProfileLayout>
  );
};

export default verify;
