import { Row, Col, Card, Button } from "antd";
import { Rate } from "antd";
import { Drawer } from "antd";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CloseOutlined } from "@ant-design/icons";
import { Pagination } from "antd";

const statData = [
  {
    id: 2,
    residenceName: "Sky Garden Residence 11",
    star: 3,

    zai: "110 m",
    positionId: 23434,

    address:
      "Улаанбаатар хот, сүхбаатар дүүрэг, 7-р хороо, Хангай хотхон, 516-р ...",
    image: "/pexels-photo-3349460 1.png",
  },
  {
    id: 1,
    residenceName: "Sky Garden Residence",
    star: 3,
    zai: "110 m",
    positionId: 2334,
    address:
      "Улаанбаатар хот, сүхбаатар дүүрэг, 7-р хороо, Хангай хотхон, 516-р ...",
    image: "/pexels-photo-3349460 1.png",
  },
  {
    id: 3,
    residenceName: "Hilchin horoololol",
    star: 3,
    zai: "110 m",
    positionId: 2334,
    address:
      "Улаанбаатар хот, сүхбаатар дүүрэг, 7-р хороо, Хангай хотхон, 516-р ...",
    image: "/pexels-photo-3349460 1.png",
  },
];

const tofit = ({ data }) => {
  const [PickTimevisible, setPickTimeVisible] = useState(false);
  const [detailVisible, setDetailsVisible] = useState(false);
  const [selectItem, setSelected] = useState();
  const [drawerItem, setDrawerItem] = useState({});

  const DetailsDrawerOpen = (e) => {
    setDetailsVisible(true);
  };
  const showTimePickDrawer = (id) => {
    alert(id);
    setSelected(id);
    setPickTimeVisible(true);
    const selectDataa = data.find((item) => item.id == id);
    console.log(selectDataa);
    setDrawerItem(selectDataa);
  };
  const onClose = () => {
    setDetailsVisible(false);
    setPickTimeVisible(false);
  };

  const onChange = () => {};
  // useEffect(() => {
  //   const selectDataa = data.find((item) => item.id == selectItem);
  //   console.log(selectDataa);
  //   setDrawerItem(selectDataa);
  // }, [selectItem]);
  // useEffect(() => {
  //   console.log("props--->", data);
  // }, [data]);
  return (
    <div style={{ overflow: "auto", height: "100vh" }}>
      {data.map((item) => (
        <div key={item.id}>
          <Card style={{ borderRadius: "20px", marginTop: "10px" }}>
            <div style={{ padding: "5px" }}>
              {/* <Button style={{ marginTop: "-20px" }}>Шууд захиалах</Button> */}
              <Row>
                <Col span={12}>
                  <Image
                    src="/pexels-photo-3349460 1.png"
                    height="140px"
                    width="210px"
                  ></Image>
                </Col>
                <Col span={8} offset={1}>
                  <p style={{ fontSize: "15px" }}>
                    <b>
                      {item.keyword.split(" ")[0]}
                      {item.keyword.split(" ")[1]}
                      {item.keyword.split(" ")[2]}
                    </b>
                  </p>
                  <Col>
                    <Rate style={{ fontSize: "10px" }} defaultValue={3.5} />
                  </Col>

                  <Row>
                    <div style={{ display: "flex" }}>
                      <div>
                        <Image
                          src="/directions_car_24px.png"
                          height="12px"
                          width="12px"
                        />
                      </div>
                      <p style={{ fontSize: "12px", paddingTop: "2px" }}>
                        <p style={{ marginLeft: "10px" }}>
                          112м Байршил ID {item.locationId}
                        </p>
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div>
                        <Image
                          src="/icons/location_on_24px.png"
                          height="15px"
                          width="15px"
                        />
                      </div>
                      <Col span={8}>
                        <p
                          style={{
                            fontSize: "12px",
                            width: "150px",
                            textAlign: "justify",
                          }}
                        >
                          {item.keyword}
                        </p>
                      </Col>
                    </div>
                  </Row>
                </Col>
                <Row>
                  <Col span={12}>
                    <div style={{ display: "flex " }}>
                      <p style={{ fontSize: "15px", marginLeft: "20px" }}>
                        <b>B1</b>
                      </p>
                      <Image
                        src="/icons/1) Checkbox.png"
                        width="20px"
                        height="20px"
                        style={{ marginLeft: "10px" }}
                      />
                      <Image
                        src="/icons/temdegleegui.png"
                        width="20px"
                        height="10px"
                        style={{ paddingLeft: "10px" }}
                      />
                      <Image
                        src="/icons/haadag.png"
                        width="20px"
                        height="20px"
                      />
                      <Image
                        src="/icons/Small SUV.png"
                        width="20px"
                        height="20px"
                        style={{ paddingLeft: "10px" }}
                      />
                      <Image
                        src="/icons/Up.png"
                        width="20px"
                        height="20px"
                        style={{ paddingLeft: "10px" }}
                      />
                      <Image
                        src="/icons/haadag.png"
                        width="20px"
                        height="20px"
                        style={{ paddingLeft: "10px" }}
                      />
                      <Image
                        src="/keyboard_arrow_down_24px.png"
                        width="20px"
                        height="20px"
                        style={{ paddingLeft: "10px" }}
                      />
                    </div>
                  </Col>
                  <Col span={10} offset={2}>
                    <div style={{ display: "flex" }}>
                      <Button
                        style={{ width: "100px", marginLeft: "10px" }}
                        onClick={() => showTimePickDrawer(item.id)}
                        className={`freeTimePick`}
                      >
                        Сул цаг харах
                      </Button>
                      <Button
                        className={`freeTimePick`}
                        style={{
                          color: "blue",
                          width: "100px",
                          marginLeft: "10px",
                        }}
                        onClick={DetailsDrawerOpen}
                      >
                        Дэлгэрэнгүй
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Row>
            </div>
          </Card>
          {PickTimevisible && (
            <Drawer
              height="100vh"
              width={400}
              closeIcon={<CloseOutlined />}
              placement="right"
              closable={false}
              onClose={onClose}
              visible={PickTimevisible}
              getContainer={false}
              style={{ position: "absolute", height: "100vh" }}
            >
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    fontSize: "15px",
                    textAlign: "justify",
                  }}
                >
                  <b>xaxaxa</b>
                </p>
                <CloseOutlined
                  style={{ marginLeft: "200px" }}
                  onClick={onClose}
                />
              </div>
              <div>
                <Rate
                  style={{
                    fontSize: "12px",
                    lineHeight: "1.2px",
                    width: "80px",
                  }}
                  defaultValue={3}
                />
              </div>
              <div style={{ display: "flex" }}>
                <Image
                  src="/directions_car_24px.png"
                  height="15px"
                  width="15px"
                />
              </div>
            </Drawer>
          )}
        </div>
      ))}
      {/* <Pagination onChange={onChange} total={50} /> */}
    </div>
  );
};
export default tofit;
