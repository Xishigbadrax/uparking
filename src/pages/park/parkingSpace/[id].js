import {Row, Col, Button, Divider, Form, Input, Upload, Spin} from 'antd';
import {
  EditOutlined,
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import {useState} from 'react';
import Image from 'next/image';
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } from "react-google-maps";
const data = [
  {id: 1, image: '/ganbat.png'},
  {id: 2, image: '/Adiyadorj.png'},
  {id: 3, image: '/Bat-ochir.png'},
];
// const MyMapComponent = withScriptjs(
//   withGoogleMap((props) => (
//     <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
//       {props.isMarkerShown && (
//         <Marker position={{ lat: -34.397, lng: 150.644 }} />
//       )}
//     </GoogleMap>
//   ))
// );
// const getBase64=(img, callback)=> {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// };

const beforeUpload = (file)=> {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 6;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
const Edit = () => {
  // const router = useRouter();
  const [current, setCurrent] = useState(0);
  // const {id} = router.query;
  const [Mainvalue, setValue] = useState(false);
  const [spaceValue, setSpaceValue] = useState(false);
  const [mainImageValue, setMainImageValue] = useState(false);
  const LoadIcon = <LoadingOutlined />;
  // eslint-disable-next-line no-unused-vars
  const [selectedPositionImage, setSelectedResidenceSideImage] = useState();
  // const [selectedDirectionImage, setSelectedMainImage] = useState();
  // const [selectedNumberingImage, setSelectedDoorExitImage] = useState();
  // eslint-disable-next-line no-unused-vars
  const [selectResidenceEXitImage, setSelectedResidenceExitImage] = useState();
  // eslint-disable-next-line no-unused-vars
  const [loadingPosition, setLoadingPosition] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loadingDirect, setLoadingDirect] = useState(false);
  // const [loadingNumbering, setLoadingNumbering] = useState(false);
  // const [loadingExitImage, setLoadingExitImage] = useState(false);

  // useEffect = async () => {
  //   const data = await callGet(`/parkingspace/update/${id}`);
  //   console.log(data);
  // };
  const changeMainValue = (e) => {
    setMainImageValue(true);
  };
  const changeMaindata = (e) => {
    setValue(true);
  };
  const changeSpaceData = (e) => {
    setSpaceValue(true);
  };
  const savedData = (e) => {
    setValue(false);
  };
  const spaceDataSave = (e) => {
    setSpaceValue(false);
  };
  const addCurrent = (e) => {
    setCurrent(current + 1);
  };
  const divideCurrent = (e) => {
    setCurrent(current - 1);
  };
  const onsaveMainImage = () => {
    setMainImageValue(false);
  };
  const onFinish = (e) => {
    console.log('xaaxaa');
  };
  return (
    <div>
      <Row
        style={{
          fontSize: '20px',
          marginTop: '50px',
          marginLeft: '100px',
        }}
      >
        Авто зогсоол бүртгүүлэх
      </Row>
      <div style={{width: '1500px', marginLeft: '160px'}}>
        <Row>
          <Col span={6}>
            <p
              style={{
                color: 'blue',
                fontSize: '17px',
                marginTop: '50px',
              }}
            >
              <b>Үндсэн мэдээлэл</b>
              <p style={{color: 'gray', fontSize: '12px'}}>Алхам 1/7</p>
            </p>
          </Col>
          <Col style={{marginTop: '50px '}} span={6} push={16}>
            <Button
              onClick={changeMaindata}
              title="Засах"
              icon={<EditOutlined />}
              shape="rounded"
            >
              засах
            </Button>
          </Col>
        </Row>
        <Divider />
        {Mainvalue ? (
          <div style={{padding: '30px'}}>
            <Form
              onFinish={onFinish}
              labelCol={{span: 3}}
              wrapperCol={{span: 6}}
            >
              <Form.Item label="Аймаг,Хот*">
                <Input />
              </Form.Item>
              <Form.Item label="Сум,Дүүрэг *">
                <Input />
              </Form.Item>
              <Form.Item label="Хороо Баг *">
                <Input />
              </Form.Item>
              <Form.Item label="Байрны нэр*">
                <Input />
              </Form.Item>
              <Form.Item label="Байрны дугаар*">
                <Input />
              </Form.Item>
              <Form.Item label="Хаалганы тоо*">
                <Input />
              </Form.Item>
              <Form.Item label="Зогсоолын дугаар*">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button onClick={savedData}>Save</Button>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <Row style={{padding: '30px'}}>
            <Col style={{lineHeight: '40px'}}>
              <p>Хот,Аймаг *</p>
              <p>Дүүрэг ,Сум *</p>
              <p>Хороо ,Баг*</p>
              <p>Байрны нэр </p>
              <p>БАйрны дугаар</p>
              <p>Хаалганы тоо</p>
              <p>Зогсоолын дугаар *</p>
            </Col>
            <Col offset={4} style={{lineHeight: '40px', alignItems: 'right'}}>
              <p>A</p>
              <p>AA</p>
              <p>AAA</p>
              <p>AAA</p>
              <p>AAA</p>
              <p>AAAA</p>
              <p>AAAAA</p>
            </Col>
            <Col offset={4}>
              {/* <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={
                  <div
                    style={{
                      height: `300px`,

                      width: "600px",
                    }}
                  />
                }
                mapElement={<div style={{ height: `100%` }} />}
              /> */}
            </Col>
          </Row>
        )}
        <Col></Col>
      </div>
      <div style={{width: '1500px', marginLeft: '160px'}}>
        <Row>
          <Col span={6}>
            <p
              style={{
                color: 'blue',
                fontSize: '17px',
                marginTop: '50px',
              }}
            >
              <b>Зогсоолын үзүүлэлт</b>
              <p style={{color: 'gray', fontSize: '12px'}}>Алхам 2/7</p>
            </p>
          </Col>
          <Col style={{marginTop: '50px '}} span={6} push={16}>
            <Button
              onClick={changeSpaceData}
              title="Засах"
              icon={<EditOutlined style={{fontSize: '12px'}} />}
              shape="rounded"
            >
              засах
            </Button>
          </Col>
        </Row>
        <Divider />
        {spaceValue ? (
          <div style={{padding: '30px'}}>
            <Form
              onFinish={onFinish}
              labelCol={{span: 3}}
              wrapperCol={{span: 6}}
            >
              <Form.Item label="Давхрын байршил*" width={400}>
                <Input />
              </Form.Item>
              <Form.Item label="Орох хаалга">
                <Input />
              </Form.Item>
              <Form.Item label="Дугаарын тэмдэглэгээ*">
                <Input />
              </Form.Item>
              <Form.Item label="Хэмжээ*">
                <Input />
              </Form.Item>
              <Form.Item label="Төрөл*">
                <Input />
              </Form.Item>
              <Form.Item label="Эргэх урсгал">
                <Input />
              </Form.Item>
              <Form.Item label="Нэмэлт тайлбар">
                <Input />
              </Form.Item>
              <Form.Item>
                <Button onClick={spaceDataSave}>Save</Button>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <div>
            <Row style={{padding: '30px'}}>
              <Col style={{lineHeight: '40px'}}>
                <p>Давхрын байршил *</p>
                <p>Орох хаалга</p>
                <p>Дугаарын тэмдэглэгээ </p>
                <p>Хэмжээ </p>
                <p>Төрөл</p>
                <p>Эргэх урсгал</p>
                <p>Нэмэлт тайлбар</p>
              </Col>
              <Col offset={4} style={{lineHeight: '40px'}}>
                <p>A</p>
                <p>AA</p>
                <p>AAA</p>
                <p>AAA</p>
                <p>AAA</p>
                <p>AAAA</p>
                <p>AAAAA</p>
              </Col>
              <Col></Col>
            </Row>
          </div>
        )}
      </div>
      <div style={{width: '1500px', marginLeft: '160px'}}>
        <Row>
          <Col span={6}>
            <p
              style={{
                color: 'blue',
                fontSize: '17px',
                marginTop: '50px',
              }}
            >
              <b>Үндсэн зураг </b>
              <p style={{color: 'gray', fontSize: '12px'}}>Алхам 3/7</p>
            </p>
          </Col>
          <Col style={{marginTop: '50px '}} span={6} push={16}>
            <Button
              onClick={changeMainValue}
              title="Засах"
              icon={<EditOutlined style={{fontSize: '12px'}} />}
              shape="rounded"
            >
              засах
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          {!mainImageValue ? (
            <Col offset={2} style={{marginTop: '30px'}}>
              <div >
                <Image
                  src={data[current].image}
                  width="1400px"
                  height="600px"
                  style={{zIndex: '-1'}}
                />
                <div
                  style={{
                    display: 'flex',
                    color: 'white',
                    marginTop: '-30px',
                    marginLeft: '884px',
                    position: 'absolute',
                  }}
                >
                  <p>Зогсоолын орц гарцын зураг</p>
                  {current >= 1 && (
                    <LeftOutlined
                      onClick={divideCurrent}
                      style={{marginLeft: '10px'}}
                    />
                  )}
                  <p style={{marginLeft: '10px'}}>{current + 1}/3</p>
                  {current < 2 && (
                    <RightOutlined
                      onClick={addCurrent}
                      style={{fontSize: '12px', marginLeft: '10px'}}
                    />
                  )}
                </div>
              </div>
            </Col>
          ) : (
            <div>
              <Row style={{marginTop: '50px'}}>
                <Col offset={4}>
                  <p style={{fontSize: '15px'}}>Хотхоны ойр орчмын зураг</p>

                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                  >
                    {selectedPositionImage ? (
                      <img
                        src={selectedPositionImage}
                        alt="avatar"
                        style={{width: '100%', height: '240px'}}
                      />
                    ) : (
                      <div>
                        {loadingPosition ? (
                          <Spin
                            indicator={LoadIcon}
                            tip="зургийг хуулж байна."
                          />
                        ) : (
                          <PlusOutlined
                            style={{
                              justifyContent: 'center',
                              alignContent: 'center',
                              backgroundColor: 'blue',
                              color: 'white',
                              height: '20px',
                              width: '20px',
                              borderRadius: '10px',
                            }}
                          />
                        )}
                      </div>
                    )}
                  </Upload>
                </Col>
                <Col offset={4}>
                  <p style={{fontSize: '15px'}}>Хотхоны орц гарцын зураг</p>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    style={{width: '400px'}}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                  >
                    {selectResidenceEXitImage ? (
                      <Image
                        src={selectResidenceEXitImage}
                        alt="avatar"
                        style={{height: '240px'}}
                      />
                    ) : (
                      <div>
                        {loadingDirect ? (
                          <Spin
                            indicator={LoadIcon}
                            tip="зургийг хуулж байна."
                          />
                        ) : (
                          <PlusOutlined
                            style={{
                              justifyContent: 'center',
                              alignContent: 'center',
                              backgroundColor: 'blue',
                              color: 'white',
                              height: '20px',
                              width: '20px',
                              borderRadius: '10px',
                            }}
                          />
                        )}
                      </div>
                    )}
                  </Upload>
                </Col>
              </Row>
              <Button onClick={onsaveMainImage}>Svaeaee</Button>
            </div>
          )}
        </Row>
      </div>
    </div>
  );
};
export default Edit;
