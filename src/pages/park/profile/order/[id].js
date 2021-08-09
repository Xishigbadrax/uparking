import DefaultLayout from "@components/layouts/DefaultLayout";
import { Layout, Button, Carousel, Image, Row, Col } from 'antd';
import { LeftOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useEffect, useState, useContext } from "react";
import { callGet } from "@api/api";
import Context from '@context/Context';
import { useRouter } from 'next/router';
import Helper from '@utils/helper';
import Link from "next/link";
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const { Header, Sider, Content } = Layout;

const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL;


const OrderId = () => {
    const router = useRouter();
    const ctx = useContext(Context);
    const [orderData, setOrderData] = useState({});
    const [images, setImages] = useState([]);
    const [parkingUpDownArrow, setParkingUpDownArrow] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const orderId = router.query.id;
        ctx.setIsLoading(true);
        const res = await callGet(`/booking/id/test?id=${orderId}&asWho=1`);
        console.log(res, 'resresres')
        if (!res || res === undefined) {
            showMessage(messageType.FAILED.type, defaultMsg.dataError);
        } else {
            setOrderData(res);
            setImages([]);
            if (!Helper.isNullOrEmpty(res.imageFromGate)) {
                setImages(images => [...images, { id: 4, path: res.imageFromGate }]);
            }
            if (!Helper.isNullOrEmpty(res.imageParkingOverall)) {
                setImages(images => [...images, { id: 5, path: res.imageParkingOverall }]);
            }
            if (!Helper.isNullOrEmpty(res.imageResidenceGate)) {
                setImages(images => [...images, { id: 6, path: res.imageResidenceGate }]);
            }
            if (!Helper.isNullOrEmpty(res.imageSpaceNumber)) {
                setImages(images => [...images, { id: 7, path: res.imageSpaceNumber }]);
            }
            if (!Helper.isNullOrEmpty(res.imageSpaceNumber)) {
                setImages(images => [...images, { id: 8, path: res.imageSpaceNumber }]);
            }
        }
        ctx.setIsLoading(false);
    };

    function callback(key) {
        console.log(key);
    }

    return (
        <DefaultLayout>
            <Layout>
                <Header style={{ padding: "0px" }}>
                    <Link href={{ pathname: `/park/profile/order/` }} passHref>
                        <Button type="primary" shape="circle" icon={<LeftOutlined />} size={'large'} />
                    </Link>
                    <span style={{ fontSize: "20px", lineHeight: "24px", color: "#0013D4", marginLeft: "20px" }}>Миний захиалга</span>
                </Header>
                <Layout style={{ padding: "0px 0px 0px 60px" }}>
                    <Content>
                        {images.length > 0 ?
                            <Carousel>
                                {images.map((image) => (
                                    <div key={image.id}>
                                        <Image
                                            width={468}
                                            src={IMG_URL + image.path}
                                        /></div>
                                ))}
                            </Carousel>
                            : null}
                        <Row style={{ marginTop: "24px" }}>
                            <Col span={12}>
                                <div style={{ fontSize: "20px" }}><strong>{!Helper.isNullOrEmpty(orderData.residenceName) ? orderData.residenceName : null}</strong></div>
                                {/* <div>rating</div> */}
                            </Col>
                            {/* <Col span={6}>2</Col> */}
                            <Col span={12}>{`${orderData.province}, ${orderData.district}, ${orderData.section}, ${orderData.residenceName}, ${orderData.residenceBlockNumber}`}</Col>
                        </Row>
                    </Content>
                    <Sider width={400}>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Танилцуулга" key="1">
                                <Row>
                                    <Col span={12}>Residence</Col>
                                    <Col span={12} style={{ color: "#0013D4", textAlign: "right", fontWeight: "bold" }}>{!Helper.isNullOrEmpty(orderData.residenceName) ? orderData.residenceName : null}</Col>
                                </Row>
                                <Row>
                                    <Col span={12}>Floor number</Col>
                                    <Col span={12} style={{ color: "#0013D4", textAlign: "right", fontWeight: "bold" }}>{!Helper.isNullOrEmpty(orderData.floorNumberLabel) ? orderData.floorNumberLabel : null}</Col>
                                </Row>
                                <Row>
                                    <Col span={12}>Garage number</Col>
                                    <Col span={12} style={{ color: "#0013D4", textAlign: "right", fontWeight: "bold" }}>{!Helper.isNullOrEmpty(orderData.parkingSpaceGarageNumber) ? orderData.parkingSpaceGarageNumber : null}</Col>
                                </Row>
                                <Row>
                                    <Col span={12}>Uparking number</Col>
                                    <Col span={12} style={{ color: "#0013D4", textAlign: "right", fontWeight: "bold" }}>{!Helper.isNullOrEmpty(orderData.uparkingNumber) ? orderData.uparkingNumber : null}</Col>
                                </Row>
                                <Row style={{ padding: "20px 10px" }}>
                                    <Col span={24} style={{ background: "rgba(222, 226, 233, 0.2)", borderRadius: "24px", padding: "13px 23px", display: "inline-flex", textAlign: "center", justifyContent: "center" }}>
                                        {orderData && orderData.floorNumber
                                            ?
                                            <div style={{ marginRight: "13px" }}>
                                                <Image
                                                    preview={false}
                                                    width={24}
                                                    src={IMG_URL + orderData.floorNumber}
                                                />
                                            </div>
                                            : null}
                                        {orderData && orderData.entranceLock
                                            ?
                                            <div style={{ marginRight: "13px" }}>
                                                <Image
                                                    preview={false}
                                                    width={24}
                                                    src={IMG_URL + orderData.entranceLock}
                                                />
                                            </div>
                                            : null}
                                        {orderData && orderData.isNumbering
                                            ?

                                            <div style={{ marginRight: "13px" }}>
                                                <Image
                                                    preview={false}
                                                    width={24}
                                                    src={IMG_URL + orderData.isNumbering}
                                                />
                                            </div>
                                            : null}
                                        {orderData && orderData.capacity
                                            ?

                                            <div style={{ marginRight: "13px" }}>
                                                <Image
                                                    preview={false}
                                                    width={24}
                                                    src={IMG_URL + orderData.capacity}
                                                />
                                            </div>
                                            : null}
                                        {orderData && orderData.type
                                            ?

                                            <div style={{ marginRight: "13px" }}>
                                                <Image
                                                    preview={false}
                                                    width={24}
                                                    src={IMG_URL + orderData.type}
                                                />
                                            </div>
                                            : null}
                                        {orderData && orderData.returnRoutes
                                            ?

                                            <div style={{ marginRight: "13px" }}>
                                                <Image
                                                    preview={false}
                                                    width={24}
                                                    src={IMG_URL + orderData.returnRoutes}
                                                />
                                            </div>
                                            : null}
                                        <div>
                                            {!parkingUpDownArrow ?
                                                <DownOutlined onClick={() => setParkingUpDownArrow(true)} /> :
                                                <UpOutlined onClick={() => setParkingUpDownArrow(false)} />
                                            }
                                        </div>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        {parkingUpDownArrow ?
                                            <div>
                                                {orderData && orderData.floorNumber
                                                    ?
                                                    <div style={{ marginRight: "13px", display: "flex" }}>
                                                        <Image
                                                            preview={false}
                                                            width={24}
                                                            src={IMG_URL + orderData.floorNumber}
                                                        />
                                                        <div style={{marginLeft:"25px"}}><span>{orderData.floorNumberLabel}</span></div>
                                                    </div>
                                                    : null}
                                                {orderData && orderData.entranceLock
                                                    ?
                                                    <div style={{ marginRight: "13px", display: "flex"  }}>
                                                        <Image
                                                            preview={false}
                                                            width={24}
                                                            src={IMG_URL + orderData.entranceLock}
                                                        />
                                                        <div style={{marginLeft:"25px"}}><span>{orderData.entranceLockLabel}</span></div>
                                                    </div>
                                                    : null}
                                                {orderData && orderData.isNumbering
                                                    ?

                                                    <div style={{ marginRight: "13px", display: "flex"  }}>
                                                        <Image
                                                            preview={false}
                                                            width={24}
                                                            src={IMG_URL + orderData.isNumbering}
                                                        />
                                                        <div style={{marginLeft:"25px"}}><span>{orderData.isNumberingLabel}</span></div>
                                                    </div>
                                                    : null}
                                                {orderData && orderData.capacity
                                                    ?

                                                    <div style={{ marginRight: "13px", display: "flex"  }}>
                                                        <Image
                                                            preview={false}
                                                            width={24}
                                                            src={IMG_URL + orderData.capacity}
                                                        />
                                                        <div style={{marginLeft:"25px"}}><span>{orderData.capacityLabel}</span></div>
                                                    </div>
                                                    : null}
                                                {orderData && orderData.type
                                                    ?

                                                    <div style={{ marginRight: "13px", display: "flex"  }}>
                                                        <Image
                                                            preview={false}
                                                            width={24}
                                                            src={IMG_URL + orderData.type}
                                                        />
                                                        <div style={{marginLeft:"25px"}}><span>{orderData.typeLabel}</span></div>
                                                    </div>
                                                    : null}
                                                {orderData && orderData.returnRoutes
                                                    ?

                                                    <div style={{ marginRight: "13px", display: "flex"  }}>
                                                        <Image
                                                            preview={false}
                                                            width={24}
                                                            src={IMG_URL + orderData.returnRoutes}
                                                        />
                                                        <div style={{marginLeft:"25px"}}><span>{orderData.returnRoutesLabel}</span></div>
                                                    </div>
                                                    : null}
                                            </div> :
                                            null
                                        }
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="Үнэлгээ" key="2">
                              Үнэлгээ
                            </TabPane>
                            <TabPane tab="Тусламж" key="3">
                              Тусламж
                            </TabPane>
                        </Tabs>
                    </Sider>
                </Layout>
            </Layout>
        </DefaultLayout>
    );
}

export default OrderId;