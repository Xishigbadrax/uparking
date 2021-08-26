import {useContext, useEffect, useState} from 'react';
import {callGet, sList} from '@api/api';
import {
  Card,
  Col,
  Row,
  Button,
  DatePicker,
  Input,
  Select,
  Modal,
  Form,
  AutoComplete,
} from 'antd';
import Context from '@context/Context';
import moment from 'moment';
import Data from '../../../data/googlrMapData.json';
import {
  SearchOutlined,
  DownOutlined,
  TrademarkOutlined,
} from '@ant-design/icons';
import dynamic from 'next/dynamic';
import {Tabs} from 'antd';
import ToFit from '@components/fsearch/toFIt';
import Closest from '@components/fsearch/closest';
import Farthest from '@components/fsearch/farthest';
import GoogleMapReact from 'google-map-react';
import {useRouter} from 'next/router';
import {dateTimePickerLocale} from '@constants/constants';

const {TabPane} = Tabs;
const IndexPageMoreInfo = dynamic(
  () => import('@components/IndexPageMoreInfo'),
  {ssr: false},
);
const {RangePicker} = DatePicker;

const {Option} = Select;
const ClickLocation = () => (
  <div
    style={{
      height: '15px',
      width: '15px',
      backgroundColor: 'blue',
      borderRadius: '10px',
      marginTop: '-10px',
      marginLeft: '-15px',
      alignContent: 'center',
      border: '3px solid deepskyblue',
    }}
  ></div>
);

const AnyReactComponent = ({text}) => (
  <div
    className={'locationBackground'}
    style={{marginTop: '-35px', marginLeft: '-27px'}}
  >
    <p
      style={{
        textAlign: 'center',
        fontSize: '16px',
      }}
    >
      <b>{text}</b>
    </p>
  </div>
);
const fsearch = () => {
  const array = [];
  const GOOGLE_API = process.env.NEXT_GOOGLE_API;
  const ctx = useContext(Context);
  const [dashboardData, setDashboardData] = useState({});
  const [parkRegModalVisible, setParkRegModalVisible] = useState(true);
  const [seeMore, setSeeMore] = useState(false);
  const [longitude, setLongitude] = useState(106.905746);
  const [latitude, setLatitude] = useState(47.886398);
  const [selectLat, setSelectLate] = useState();
  const [selectLng, setSelectLng] = useState();
  const [startDate, setStartDate] = useState();
  const [keywordId, setKeywordId] = useState({});
  const [type, setType] = useState({});
  const [endDate, setEndtDate] = useState();
  const [spaceData, setSpacedata] = useState([]);
  const [options, setOptions] = useState([]);
  const dateFormat = 'YYYY-MM-DD';
  const [inputData, setInputdata] = useState();
  const [searchedData, setSearchedData] = useState([]);
  const router = useRouter();
  const {typeOrder, inputAdress, homeStartDate, homeEndDate} = router.query;

  const handleStartDateChange = (value, dateString) => {
    if (dateString) {
      setStartDate(dateString);
    }
  };
  const handleEndDateChange = (value, dateString) => {
    if (dateString) {
      setEndtDate(dateString);
      // getData(dateString[0], dateString[1]);
    }
  };
  const searchResult = (listData) =>
    listData.map((item) => {
      return {
        value: item.id + ' ' + item.keyword,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>{item.keyword}</span>
          </div>
        ),
      };
    });
  const onChangeAddress = async (e) => {
    const listData = await callGet(`/search/keyword/?syllable=${e}`);
    setOptions(listData ? searchResult(listData) : []);
  };
  const onChangeType = (e) => {
    console.log(e);
    setType(e);
    console.log(startDate, endDate, type);
  };
  const onMapClick = async (e) => {
    console.log(e);
    setSelectLate(e.lat);
    setSelectLng(e.lng);
    const locationsData = await callGet(
      `/search/location/test?latitude=${e.lat}&longitude=${e.lng}`,
    );
    console.log(locationsData);
    setSpacedata(locationsData);
  };
  const onSelect = (values) => {
    console.log('values', values);
    const id = values.split(' ')[0];
    setKeywordId(id);
  };

  // const onSearchingList = async (e) => {
  //   console.log(e);
  //   const listData = await callGet(`/search/keyword/?syllable=${e}`);
  //   console.log(listData);
  // };
  const onSearch = async () => {
    ctx.setIsLoading(true);
    //   if (inputData) {
    const data = await callGet(`/search/test/input?keywordId=${keywordId}`);
    const array = [];
    data.map((item) => {
      item.parkingSpaceList.content.map((el) => {
        array.push({item, el});
      });
    });
    setSearchedData(array);
    ctx.setIsLoading(false);
  };
  function onOk(value) {
    console.log('onOk: ', value);
  }
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  async function callback(key) {
    if (key === '2') {
      const cheapSpace = await callGet('');
    }
  }

  return (
    <div style={{backgroundColor: '#fff'}}>
      <Form>
        <Row style={{padding: '20px'}}>
          <Col span={9}>
            <Form.Item
              name="keywordId"
              rules={[{required: true, message: 'Хаягаа сонгоно уу ?'}]}
            >
              <AutoComplete
                style={{
                  width: '100%',
                }}
                options={options}
                // onChange={onChangeAddress}
                onSearch={onChangeAddress}
                onSelect={onSelect}
              >
                <Input
                  style={{height: '50px', borderRadius: '15px'}}
                  placeholder="Хаяг"
                  iconprefix={<SearchOutlined />}
                />
              </AutoComplete>
            </Form.Item>
          </Col>

          <Col
            span={3}
            style={{
              height: '50px',
              borderRadius: '15px',
              marginLeft: '10px',
              border: '1px solid #DCDCDC',
            }}
          >
            <div
              className={'pickType'}
              style={{marginLeft: '10px', paddingRight: '5px'}}
            >
              <p style={{fontSize: '10px'}}>Захиалгын төрөл</p>
              <Form.Item
                name="type"
                rules={[
                  {required: false, message: 'Захиалгын төрөл сонгож болно'},
                ]}
              >
                <Select
                  style={{width: '100%'}}
                  placeholder="Сонгох"
                  onChange={onChangeType}
                >
                  <Option value="day">Өдөр</Option>
                  <Option value="night">Шөнө</Option>
                </Select>
              </Form.Item>
            </div>
          </Col>
          <Col
            span={3}
            style={{
              height: '50px',
              borderRadius: '15px',
              marginLeft: '10px',
              border: '1px solid #DCDCDC',
            }}
          >
            <div
              className={'pickType'}
              style={{marginLeft: '10px', paddingRight: '5px'}}
            >
              <p style={{fontSize: '10px', color: 'gray'}}>
                Эхлэх хугацаа сонгох
              </p>
              <Form.Item
                name="startDate"
                rules={[
                  {required: false, message: 'Эхлэх хугацаа сонгоно уу ?'},
                ]}
              >
                <DatePicker
                  style={{width: '100%'}}
                  onChange={handleStartDateChange}
                  placeholder="Сонгох"
                  disabledDate={disabledDate}
                  suffixIcon={
                    <div>
                      <DownOutlined />
                    </div>
                  }
                ></DatePicker>
              </Form.Item>
            </div>
          </Col>
          <Col
            span={3}
            style={{
              height: '50px',
              borderRadius: '15px',
              marginLeft: '10px',
              border: '1px solid #DCDCDC',
            }}
          >
            <div
              className={'pickType'}
              style={{paddingRight: '5px', marginLeft: '10px'}}
            >
              <p style={{fontSize: '10px'}}>Дуусах хугацаа сонгох</p>
              <Form.Item
                name="endDate"
                rules={[
                  {required: false, message: 'Дуусах хугацаа сонгоно уу?'},
                ]}
              >
                <DatePicker
                  style={{width: '100%'}}
                  onChange={handleEndDateChange}
                  disabledDate={disabledDate}
                  placeholder="Сонгох"
                  suffixIcon={
                    <div>
                      <DownOutlined />
                    </div>
                  }
                ></DatePicker>
              </Form.Item>
            </div>
          </Col>
          <Col span={4} style={{marginLeft: '10px'}} size="large">
            <Form.Item>
              <Button
                style={{height: '50px'}}
                htmlType="submit"
                size={'large'}
                type="primary"
                className={'buttonGo'}
                block
                onClick={onSearch}
              >
                Хайх
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={15}>
            <GoogleMapReact
              style={{height: '828px'}}
              bootstrapURLKeys={{key: GOOGLE_API}}
              center={{lat: latitude, lng: longitude}}
              defaultZoom={16}
              onClick={onMapClick}
            >
              {selectLat & selectLng ? (
                <ClickLocation lat={selectLat} lng={selectLng} />
              ) : null}
              {spaceData.map((item) => (
                <AnyReactComponent
                  key={item.residenceBlockId}
                  lat={item.latitude}
                  lng={item.longitude}
                  text="20p"
                />
              ))}
            </GoogleMapReact>
          </Col>
          <Col span={9}>
            <Card>
              <Tabs
                defaultActiveKey="1"
                onChange={callback}
                className={'OptionPane'}
                style={{
                  alignContent: 'center',
                  marginLeft: '5%',
                }}
              >
                <TabPane
                  tab={
                    <div
                      style={{
                        width: '140px',
                        height: '48px',
                      }}
                    >
                      <p style={{height: '24px', paddingLeft: '25px'}}>
                        Тохирох
                      </p>
                    </div>
                  }
                  key="1"
                >
                  <ToFit data={searchedData} lat={latitude} lng={longitude} />
                </TabPane>
                <TabPane
                  tab={
                    <div
                      style={{
                        height: '48px',
                        width: '140px',
                      }}
                    >
                      <p style={{height: '24px'}}> Хамгийн хямд</p>
                    </div>
                  }
                  key="2"
                >
                  <Closest />
                </TabPane>
                <TabPane
                  tab={
                    <div
                      style={{
                        height: '48px',
                        width: '140px',
                      }}
                    >
                      <p style={{height: '24px'}}> Хамгийн ойр</p>
                    </div>
                  }
                  key="3"
                >
                  <Farthest data={spaceData} />
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default fsearch;
