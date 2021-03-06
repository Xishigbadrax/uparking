import {Row} from 'antd';
import {
  Form,
  Input,
  Select,
  Divider,
} from 'antd';
import {useState} from 'react';
import {useEffect} from 'react';
import {callGet} from '@api/api';
import GoogleMapReact from 'google-map-react';
const GOOGLE_API = process.env.NEXT_GOOGLE_API;

const ClickLocation = () => (
  <div
    className={'locationBackground'}
    style={{marginTop: '-35px', marginLeft: '-27px'}}
  >
    <p
      style={{
        textAlign: 'center',
        fontSize: '16px',
        color: 'white',
      }}
    >
      <b>Энд</b>
    </p>
  </div>
);

const mainInfo = (props) => {
  const [residenceData, setResidenceData] = useState({});
  const [aimag, setAimag] = useState([]);
  const [provinceId, setSelectedAimag] = useState({});
  const [sum, setSum] = useState([]);
  const [districtId, setSelectedSum] = useState({});
  const [khoroo, setKhoroo] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedKhoroo, setSelectedKhoroo] = useState({});
  const [residence, setResidence] = useState([]);
  const [selectedResidence, setSelectedResidence] = useState({});
  const [residenceblock, setResidenceBlock] = useState([]);
  const [selectedResidenceBlock, setSelectedResidenceBlock] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [DoorNo, setDoorNo] = useState();
  // eslint-disable-next-line no-unused-vars
  const [spaceNumber, setSpaceNumber] = useState();
  // eslint-disable-next-line no-unused-vars
  const [longitude, setLongitude] = useState(106.9057);
  // eslint-disable-next-line no-unused-vars
  const [latitude, setLatitude] = useState(47.886398);
  const [selectLat, setSelectLat] = useState();
  const [selectLng, setSelectLng] = useState();
  useEffect(async () => {
    const aimag = await callGet('/address/aimag');
    setAimag(aimag);
  }, []);

  useEffect(() =>{
    props.setMainData(residenceData);
  }, [residenceData]);
  const onChangeAimag =async (e)=>{
    const aimag1 = aimag.find((item) => item.value === Number(e));
    setSelectedAimag(aimag1);
    setResidenceData({
      ...residenceData,
      provinceId: aimag1.value,
      parkingSpaceGarageNumber: 'axaxa',
    });
    const sums = await callGet(`/address/sum/${aimag1.value}`);
    setSum(sums);
  };
  const onChangeSum = async (e) => {
    const sum1 = sum.find((item) => item.value === Number(e));
    setSelectedSum(sum1);
    setResidenceData({...residenceData, districtId: sum1.value});
    const khoroo = await callGet(`/address/khoroo/${sum1.value}`);
    setKhoroo(khoroo);
  };
  const onChangeKhoroo = async (e) => {
    const horoo = khoroo.find((item) => item.value === Number(e));
    setSelectedKhoroo(horoo);
    setResidenceData({...residenceData, sectionId: horoo.value});
    const residence = await callGet(`/address/residence?districtId=${districtId.value}&provinceId=${provinceId.value}&sectionId=${horoo.value}`,
    );
    setResidence(residence);
  };
  const onChangeResidence = async (e) => {
    const residence1 = residence.find((item) => item.value === Number(e));
    setSelectedResidence(residence1);
    setResidenceData({
      ...residenceData,
      residenceName: residence1.label,
      residenceId: e,
    });
    const residenceBlock = await callGet(
      `/address/residenceblock?residenceId=${e}`,
    );
    setResidenceBlock(residenceBlock);
  };
  const onChangeInputResidence = (e) => {
    setResidenceData({...residenceData, residenceName: e.target.value});
  };
  const onChangeInputResidenceNumber = (e) => {
    setResidenceData({
      ...residenceData,
      residenceBlockNumber: e.target.value,
    });
  };
  const onChangeResidenceNumber = (e) => {
    const resiblock = residenceblock.find((item) => item.value === Number(e));
    setSelectedResidenceBlock(resiblock);

    setResidenceData({
      ...residenceData,
      residenceBlockNumber: resiblock.value,
      residenceBlockId: parseInt(resiblock.value),
    });
  };
  const onChangeDoorNumber = (e) => {
    setDoorNo(e.target.value);
    setResidenceData({
      ...residenceData,
      parkingGateNumber: e.target.value,
    });
  };
  const onChangeSpaceNumber = (e) => {
    setSpaceNumber(e.target.value);
    setResidenceData({
      ...residenceData,
      parkingSpaceId: parseInt(e.target.value),
    });
  };
  const onFinishFailed = (errorInfo) => {
  };
  const onMapClick = (e) => {
    setSelectLng(e.lng);
    setSelectLat(e.lat);
    setResidenceData({
      ...residenceData,
      latitude: e.lat,
      longitude: e.lng,
    });
  };
  return (
    <div style={{marginLeft: '162px'}}>
      <div>
        <p
          style={{
            color: 'blue',
            fontSize: '20px',
            marginTop: '25px',
          }}
        >
          <b> Орон сууц хотхоны үндсэн мэдээлэл</b>
        </p>
      </div>
      <div>
        <p
          style={{
            width: '300px',
            fontSize: '12px',
          }}
        >
          Албан ёсны болон олон нийтийн нэршил болсон нэрийг ашиглана уу!
        </p>
      </div>
      <div style={{display: 'flex'}}>
        <div className={'address'}>
          <Form
            form={props.form}
            layout="horizontal"
            style={{marginTop: '20px'}}
            onFinish={(values) => props.onFinish(props.form, values)}
            onFinishFailed={onFinishFailed}
            className={'spaceMainInfo'}
          >
            <Form.Item
              name="provinceId"
              rules={[{required: true, message: 'Аймаг хотоо сонгоно уу?'}]}
            >
              <Select onChange={onChangeAimag} placeholder="Аймаг хот*">
                {aimag.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Divider />
            <Form.Item
              name="districtId"
              rules={[
                {
                  required: true,
                  message: 'Сум болон дүүргийн мэдээллээ сонгоно уу ? ',
                },
              ]}
            >
              <Select onChange={onChangeSum} placeholder="Сум дүүрэг">
                {sum.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Divider />
            <Form.Item
              name="sectionId"
              rules={[
                {
                  required: true,
                  message: 'Баг хорооны мэдээллээ оруулна уу?',
                },
              ]}
            >
              <Select onChange={onChangeKhoroo} placeholder="Баг Хороо">
                {/* <Option value="Бусад">Бусад</Option> */}
                {khoroo.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Divider />
            <Form.Item
              name="residenceName"
              rules={[{required: true, message: 'Байрны нэрээ сонгоно уу'}]}
            >
              <Select onChange={onChangeResidence} placeholder="Байрны нэр*">
                {residence.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Divider />
            {selectedResidence.label === 'Бусад' ? (
              <div>
                <Form.Item
                  name="residenceName"
                  rules={[
                    {required: true, message: 'Байрны нэрээ оруулна уу?'},
                  ]}
                >
                  <Input
                    onChange={onChangeInputResidence}
                    placeholder="Байрны нэр "
                  />
                </Form.Item>
                <Divider />
                <Form.Item
                  name="residenceNumber"
                  rules={[
                    {required: true, message: 'Байрны дугаараа оруулна уу?'},
                  ]}
                >
                  <Input
                    onChange={onChangeInputResidenceNumber}
                    placeholder="Байрны дугаар "
                  />
                </Form.Item>
                <Divider />
              </div>
            ) : (
              <div>
                <Form.Item
                  name="residenceNumber"
                  rules={[
                    {required: true, message: 'Байрны дугаар  сонгоно  уу?'},
                  ]}
                >
                  <Select
                    placeholder="Байрны дугаар*"
                    onChange={onChangeResidenceNumber}
                  >
                    {residenceblock.map((item) => (
                      <Select.Option key={item.value} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Divider />
              </div>
            )}
            {selectedResidenceBlock === 'Бусад' && (
              <div>
                <Form.Item
                  name="residenceBlockNumber"
                  rules={[
                    {
                      required: true,
                      type: 'number',
                      message: 'Хаалганы дугаар оруулна',
                    },
                  ]}
                >
                  <Input
                    placeholder="Авто зогсоолын хаалганы тоо"
                    onChange={onChangeInputResidenceNumber}
                  />
                </Form.Item>
                <Divider />
              </div>
            )}
            <Form.Item
              name="parkingGateNumber"
              rules={[
                {
                  required: true,
                  types: 'number',
                  message: 'Хаалганы тоо оруулна уу?',
                },
              ]}
            >
              <Input
                placeholder="Авто зогсоолын хаалганы тоо"
                onChange={onChangeDoorNumber}
              />
            </Form.Item>
            <Divider />
            <Form.Item
              name="parkingSpaceId "
              rules={[
                {
                  required: true,
                  types: 'number',
                  message: 'Авто зогсоолын дугаар оруулна уу?',
                },
              ]}
            >
              <Input
                onChange={onChangeSpaceNumber}
                placeholder="Авто зогсоолын дугаар"
              />
            </Form.Item>
            <Divider />
            <Row
              style={{
                position: 'absolute',
                marginRight: '300px',
              }}
            >
              {/* <Form.Item style={{ position: "absolute", marginTop: "20px" }}>
                <Button className={`buttonGo`} htmlType="submit">
                  Үргэлжлүүлэх
                </Button>
              </Form.Item> */}
            </Row>
          </Form>
        </div>
        <div style={{marginLeft: '163px'}}>
          <div width={690} style={{fontSize: '14px', fontWeight: '400', color: '#A2A4AA'}}>
            Хамгийн нарийвчлалтайгаар авто зогсоолын орох хаалгыг{' '}
            <b style={{color: 'black'}}>“Google Map” дээр</b> тэмдэглэнэ үү!
          </div>
          <div>
            <div
              className="flex"
              style={{
                border: '1px solid #F8C40C',
                borderRadius: '10px',
                marginTop: '10px',
                height: '40px',
                width: '359px',
              }}
            >
              <div style={{padding: '5px'}}>
                <img src="/icons/info_outline_24px.png"></img>
              </div>
              <div
                style={{fontSize: '14px', color: '#F8C40C', padding: '5px'}}
              >
                Та зогсоолын орох хаалгын зааж өгнө үү!!
              </div>
            </div>
          </div>
          <div style={{height: '342.5px', width: '688px', marginTop: '30px'}}>
            <GoogleMapReact
              bootstrapURLKeys={{key: GOOGLE_API}}
              center={{lat: latitude, lng: longitude}}
              defaultZoom={16}
              onClick={onMapClick}
            >
              {selectLat & selectLng ? (
                <ClickLocation lat={selectLat} lng={selectLng} />
              ) : null}
            </GoogleMapReact>
          </div>
        </div>
      </div>
    </div>
  );
};
export default mainInfo;
