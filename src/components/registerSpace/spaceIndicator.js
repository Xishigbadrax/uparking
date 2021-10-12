import {callGet} from '@api/api';
import {Row, Col} from 'antd';
import {Divider} from 'antd';
import {Form, Checkbox, Select} from 'antd';
import {useEffect, useState} from 'react';

const spaceIndicator = (props) => {
  const [spaceSizeData, setSpaceSizeData] = useState([]);
  const [entranceData, setEncranceData] = useState([]);
  const [parkingData, setParkingData] = useState([]);
  const [spaceTypeData, setSpaceTypeData] = useState([]);
  const [routeData, setRouteData] = useState([]);
  const [floorData, setFloorData] = useState([]);
  // const [spaceSizeData, setSpaceSizeData] = useState([]);

  useEffect(async () => {
    console.log(props);

    const spaceSize = await callGet('/reference/list/test?type=SPACE_TYPE');
    setSpaceSizeData(spaceSize);
    const parking = await callGet('/reference/list/test?type=SPACE_SIGN');
    setParkingData(parking);
    const entranceLock = await callGet(
      '/reference/list/test?type=ENTRANCE_LOCK',
    );
    setEncranceData(entranceLock);
    const spaceType = await callGet('/reference/list/test?type=SPACE_CAPACITY');
    setSpaceTypeData(spaceType);
    const route = await callGet('/reference/list/test?type=RETURN_ROUTE');
    setRouteData(route);
    const floor = await callGet('/reference/list/test?type=FLOOR_NUMBER');
    setFloorData(floor);
  }, []);
  const onChangeEntranceLock = (e) => {
    //   const entrance = entranceData.find((item) => item.label === e);
    //   setIndicatorData({ ...IndicatorData, entranceLock: entrance.value });
  };
  const onChangeFloor = (e) => {
    //   const floor1 = floorData.find((item) => item.label === e);
    //   setIndicatorData({ ...IndicatorData, floorNumber: floor1.value });
  };
  const onChangeIsNumber = (e) => {
    // console.log(e);
    // const numbering = parkingData.find((item) => item.label === e);
    // setIndicatorData({ ...IndicatorData, isNumbering: numbering.value });
  };
  const onChangeSpaceSize = (e) => {
    // console.log(e);
    // const spaceSizee = spaceSizeData.find((item) => item.label === e);
    // setIndicatorData({ ...IndicatorData, capacityId: spaceSizee.value });
    // console.log(IndicatorData);
  };
  const onChangeCheckBox = (e) => {
    // const checked = routeData.find((item) => item.label === e[0]);
    // console.log(checked);
    // setIndicatorData({ ...IndicatorData, returnRoutes: checked.value });
    // console.log(IndicatorData);
  };
  const onChangeType = (e) => {
    // const type = spaceTypeData.find((item) => item.label === e);
    // setIndicatorData({ ...setIndicatorData, typeId: type.value });
  };
  return (
    <div className={'spaceIndocator'} style={{height: '520px'}}>
      <Row offset={4}>
        <p
          style={{
            fontSize: '20px',
            marginTop: '50px',
            color: 'blue',
            marginLeft: '100px',
          }}
        >
          <b>Зогсоолийн үндсэн үзүүлэлт</b>
        </p>
      </Row>
      <Row>
        <p style={{fontSize: '12px', marginLeft: '100px'}}>
          Тухайн зогсоолийн тохиромжтой байдлыг илэрхийлэх үзүүлэлтүүд
        </p>
      </Row>
      <Row style={{height: '360px'}}>
        <Col span={24}>
          <Form
            className='spaceIndicator'
            form={props.form}
            onFinish={(values) => props.onFinish(values, form)}
            style={{marginTop: '50px'}}
          >
            <div style={{display: 'flex'}}>
              <Col offset={2} span={6} className='indicator'>
                <Form.Item
                  name="entranceLock"
                  span={4}
                  rules={[
                    {
                      required: true,
                      message: 'Зогсоолын хаалгаа сонгоно уу?',
                    },
                  ]}
                >
                  <Select
                    placeholder="Зогсоолын орох хаалга /Хэрхэн нэвтрэх/"
                    onChange={onChangeEntranceLock}
                  >
                    {entranceData.map((item) => (
                      <Select.Option
                        key={item.value}
                        value={item.value}
                        span={4}
                      >
                        <div style={{display: 'flex'}}>
                          <div>
                            <img
                              src={'https://uparking.mn' + item.image}
                              height="24px"
                              width="48px"
                              style={{
                                marginTop: '-3px',
                                marginLeft: '-10px',
                              }}
                            ></img>
                          </div>
                          {item.label}
                          <p style={{fontSize: '12px'}}></p>
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Divider />
                <Form.Item
                  span={4}
                  name="floorNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Зогсоолын давхрын байршилаа сонгоно уу?',
                    },
                  ]}
                >
                  <Select
                    placeholder="Зогсоолын давхрын байршил*"
                    onChange={onChangeFloor}
                  >
                    {floorData.map((item) => (
                      <Select.Option key={item.value} value={item.value}>
                        <div style={{display: 'flex'}}>
                          <div>
                            <img
                              src={'https://uparking.mn' + item.image}
                              height="24px"
                              width="24px"
                            ></img>
                          </div>
                          <p style={{marginLeft: '10px', fontSize: '12px'}}>
                            {item.label}
                          </p>
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Divider />
                <Form.Item
                  span={6}
                  name="isNumbering"
                  rules={[{required: true, message: 'Зогсоолын дугаарын тэмдэглэгээ сонгоно уу?'}]}
                >
                  <Select
                    placeholder="Зогсоолын дугаарын тэмдэглэгээ*"
                    span={6}
                    onChange={onChangeIsNumber}
                  >
                    {parkingData.map((item) => (
                      <Select.Option key={item.value} value={item.value}>
                        <div style={{display: 'flex'}}>
                          <div>
                            <img
                              src={'https://uparking.mn' + item.image}
                              height="24px"
                              width="24px"
                            ></img>
                          </div>
                          <div>{item.label}</div>
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Divider />
                <Form.Item
                  span={4}
                  name="capacityId"
                  rules={[
                    {required: true, message: 'Зогсоолын хэмжээ сонгоно уу?'},
                  ]}
                >
                  <Select
                    placeholder="Зогсоолын хэмжээ*"
                    onChange={onChangeSpaceSize}
                  >
                    {spaceTypeData.map((item) => (
                      <Select.Option key={item.value} value={item.value}>
                        <div style={{display: 'flex'}}>
                          <div>
                            <img
                              src={'https://uparking.mn' + item.image}
                              height="24px"
                              width="24px"
                            ></img>
                          </div>
                          <p style={{marginLeft: '10px', fontSize: '12px'}}>
                            {item.label}
                          </p>
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Divider />

                <Form.Item
                  span={4}
                  name="typeId"
                  rules={[
                    {required: true, message: 'Зогсоолын төрөл сонгоно уу?'},
                  ]}
                >
                  <Select
                    placeholder="Зогсоолын төрөл*"
                    onChange={onChangeType}
                  >
                    {spaceSizeData.map((item) => (
                      <Select.Option key={item.value} value={item.value}>
                        <div style={{display: 'flex'}}>
                          <div>
                            <img
                              src={'https://uparking.mn' + item.image}
                              height="20px"
                              width="24px"
                            ></img>
                          </div>
                          <p style={{fontSize: '12px', marginLeft: '10px'}}>
                            {item.label}
                          </p>
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Divider />
              </Col>
              <Col offset={4} span={6} style={{width: '375px', height: '224px'}}>
                <p style={{fontSize: '14px'}}>
                  Зогсоолын эргэж гарах боломжтой чиглэл
                </p>
                <Form.Item
                  name="returnRoutes"
                  rules={[
                    {required: true, message: 'Эргэлтийн юу сонгоно уу?'},
                  ]}
                >
                  <Checkbox.Group
                    className={'checkOption'}
                    onChange={onChangeCheckBox}
                    style={{marginTop: '50px'}}
                  >
                    {routeData.map((item) => (
                      <Row key={item.value}>
                        <Checkbox value={item.value}>
                          <div style={{display: 'flex', paddingTop: '5px'}}>
                            <div style={{paddingTop: '5px'}}>
                              <img
                                src={'https://uparking.mn' + item.image}
                                height="20px"
                                width="20px"
                              ></img>
                            </div>
                            <p style={{fontSize: '16px', marginTop: '5px', lineHeight: '24px'}}>
                              {item.label}
                            </p>
                          </div>
                        </Checkbox>
                      </Row>
                    ))}
                  </Checkbox.Group>
                </Form.Item>
              </Col>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default spaceIndicator;
