import { Menu, Row, Col, Card, Alert } from 'antd';
import { UserOutlined, EditOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import ProfileLayout from "@components/layouts/ProfileLayout";
import { Modal, Button, Form, Input, Checkbox, Layout, Select } from 'antd';
import { useContext, useState } from 'react';

const { SubMenu } = Menu;
const { Content } = Layout;
const { Option } = Select;

const Profile = () => {
    const [isProfileNotEdit, setIsProfileNotEdit] = useState(true);
    const [isVehileVisible, setIsVehileVisible] = useState(false);;
    const [isParkVisible, setIsParkVisible] = useState(false);



    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const clickProfileEdit = () => {
        if (isProfileNotEdit) {
            setIsProfileNotEdit(false)
        } else {
            setIsProfileNotEdit(true)
        }
    }
    const handleOk = () => {
        setIsVehileVisible(false);
    };

    const handleCancel = () => {
        setIsVehileVisible(false);
    };




    const onFinishVehile = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailedVehile = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };














    return (
        <ProfileLayout>
            <Row className={"profileIndex"}>
                <Col span={12}>
                    <Card>
                        <Row className="header">
                            <Col span={3}><UserOutlined style={{ fontSize: "30px" }} /></Col>
                            <Col span={18}> <span className="text">Хувийн мэдээлэл</span></Col>
                            <Col span={3} style={{ textAlign: "right" }}><EditOutlined className="edit" onClick={clickProfileEdit} style={{ fontSize: "28px" }} /></Col>
                        </Row>
                        <Form
                            className="profileForm"
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Овог:"
                                name="surname"
                                rules={[{ required: true, message: 'Овог оруулна уу' }]}
                            >
                                <Input disabled={isProfileNotEdit} />
                            </Form.Item>
                            <Form.Item
                                label="Нэр:"
                                name="givenname"
                                rules={[{ required: true, message: 'Нэр оруулна уу' }]}
                            >
                                <Input disabled={isProfileNotEdit} />
                            </Form.Item>
                            <Form.Item
                                label="Регистрийн дугаар:"
                                name="register"
                                rules={[{ required: true, message: 'Регистрийн дугаар оруулна уу' }]}
                            >
                                <Input disabled={isProfileNotEdit} />
                            </Form.Item>
                            <Form.Item
                                label="Утасны дугаар:"
                                name="phonenumber"
                                rules={[{ required: true, message: 'Утасны дугаар оруулна уу' }]}
                            >
                                <Input disabled={isProfileNotEdit} />
                            </Form.Item>
                            <Form.Item
                                label="И-мэйл хаяг:"
                                name="email"
                                rules={[{ required: true, message: 'И-мэйл хаяг оруулна уу' }]}
                            >
                                <Input disabled={isProfileNotEdit} />
                            </Form.Item>
                            <Form.Item
                                label="Facebook:"
                                name="facebook"
                                rules={[{ required: false, message: 'Facebook оруулна уу' }]}
                            >
                                <Input disabled={isProfileNotEdit} />
                            </Form.Item>

                            <Form.Item
                                label="Хэрэглэгчийн дугаар:"
                                name="usernumber"
                            >
                                <Input disabled={true} />
                            </Form.Item>

                            {!isProfileNotEdit &&
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
                                    <Button type="primary" htmlType="submit">
                                        Хадгалах
                                    </Button>
                                </Form.Item>}
                        </Form>

                    </Card>
                </Col>
                <Col span={12} style={{ paddingLeft: "25px" }}>
                    <Card>
                        <Row className="header">
                            <Col span={3}></Col>
                            <Col span={18}> <span className="text">Тээврийн хэрэгсэл</span></Col>
                            <Col span={3} style={{ textAlign: "right" }}></Col>
                        </Row>
                        <Row style={{ minHeight: "200px", paddingTop: "30px" }}>asdasd</Row>
                        <Row>
                            <Button type="dashed" block onClick={() => setIsVehileVisible(true)}>+</Button>
                        </Row>

                    </Card>
                    <Card style={{ marginTop: "25px" }}>
                        <Row className="header">
                            <Col span={3}></Col>
                            <Col span={18}> <span className="text">Авто зогсоол</span></Col>
                            <Col span={3} style={{ textAlign: "right" }}></Col>
                        </Row>
                        <Row style={{ minHeight: "200px", paddingTop: "30px" }}>asdasd1</Row>
                        <Row>
                            <Button type="dashed" block onClick={() => setIsParkVisible(true)}>+</Button>
                        </Row>
                    </Card>
                </Col>
            </Row>


            <Modal
                className="fullModal"
                title="Тээврийн хэрэгсэл бүртгүүлэх"
                centered
                visible={isVehileVisible}
                okButtonProps={{form: 'vehile-edit-form', key:'submit', htmlType: 'submit'}}
                onOk={() => setIsVehileVisible(false)}
                onCancel={() => setIsVehileVisible(false)}
                width={1000}
                footer={[
                    <Button key="back" type="link" onClick={handleCancel}>
                        <ArrowLeftOutlined /> Буцах
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Хадгалах
                    </Button>,
                ]}
            >
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <div className={"titleV"}>
                            <div className="topV">Тээврийн - мэдээлэл</div>
                            <div className="bottomV">Тухайн хэсэгт зогсоолын байрлал, дугаарлалт харагдаж буй зураг хийхгүй</div>
                        </div>
                        <Row style={{ marginTop: "20px" }}>
                            <Col span={10}>
                                <Form
                                id="vehile-edit-form"
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
                                    onFinish={onFinishVehile}
                                    onFinishFailed={onFinishFailedVehile}
                                >
                                    <Form.Item
                                        label="Улсын дугаар"
                                        name="licensePlate"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Улсын дугаар оруулна уу',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Үйлдвэр"
                                        name="factory"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Үйлдвэр оруулна уу',
                                            },
                                        ]}
                                    >
                                        <Select defaultValue="toyota">
                                            <Option value="ford">Ford</Option>
                                            <Option value="toyota">Toyota</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="Загвар"
                                        name="model"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Загвар оруулна уу',
                                            },
                                        ]}
                                    >
                                        <Select defaultValue="prius20">
                                            <Option value="prius20">prius20</Option>
                                            <Option value="prius30">prius30</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="Өнгө"
                                        name="color"
                                        rules={[
                                            {
                                                required: false,
                                                message: 'Өнгө оруулна уу',
                                            },
                                        ]}
                                    >
                                        <Select defaultValue="black">
                                            <Option value="black">Хар</Option>
                                            <Option value="white">Цагаан</Option>
                                        </Select>
                                    </Form.Item>

                                    {/* <Form.Item
                                        wrapperCol={{
                                            offset: 8,
                                            span: 16,
                                        }}
                                    >
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item> */}
                                </Form>


                            </Col>
                            <Col span={14}>
                                <Alert
                                    message="Мэдэгдэл"
                                    description="Түрээслэгдсэн зогсоолыг тээврийн хэрэгслийн мэдээлэлтэй тулган шалгах тохиолдолд байдаг тул Та тээврийн хэрэгслийн мэдээллийг үнэн зөв оруулна уу! "
                                    type="warning"
                                    showIcon
                                />


                            </Col>
                        </Row>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </Modal>


            <Modal
                className="fullModal"
                title="Авто зогсоол"
                centered
                visible={isParkVisible}
                onOk={() => setIsParkVisible(false)}
                onCancel={() => setIsParkVisible(false)}
                width={1000}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>


        </ProfileLayout>
    );
}

export default Profile;