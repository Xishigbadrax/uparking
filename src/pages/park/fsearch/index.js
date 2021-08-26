/* eslint-disable no-unused-vars */
import {useContext, useState} from 'react';
import {callGet} from '@api/api';
import {
  Card,
  Col,
  Row,
  Button,
  DatePicker,
  Layout,
  Select,
  Form,
  AutoComplete,
} from 'antd';
import Context from '@context/Context';
const {compose, withProps, withHandlers} = require('recompose');
import moment from 'moment';
// import Data from '../../../data/googlrMapData.json';
import {

  DownOutlined} from '@ant-design/icons';
// import dynamic from 'next/dynamic';
import {Tabs} from 'antd';
import ToFit from '@components/fsearch/toFIt';
import Closest from '@components/fsearch/closest';
import Farthest from '@components/fsearch/farthest';
// import GoogleMapReact from 'google-map-react';
// import {useRouter} from 'next/router';
const {Header, Sider, Content} = Layout;

const {TabPane} = Tabs;
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require('react-google-maps');
const {
  MarkerClusterer,
} = require('react-google-maps/lib/components/addons/MarkerClusterer');
// const {RangePicker} = DatePicker;
const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD15334amUTZVfPVXv7p989Mew8iMmAoA0&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{height: '100%'}} />,
    containerElement: <div style={{height: '100%'}} />,
    mapElement: <div style={{height: '100%'}} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      markerClusterer.getMarkers();
    },
  }),
  withScriptjs,
  withGoogleMap,
)((props) => (
  <GoogleMap defaultZoom={13} defaultCenter={props.defaultCenter}>
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map((marker) => (
        <Marker
          key={marker.residence.residenceBlockCode}
          position={{
            lat: marker.residence.latitude,
            lng: marker.residence.longitude,
          }}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));
const {Option} = Select;
// const ClickLocation = () => (
//   <div
//     style={{
//       height: '15px',
//       width: '15px',
//       backgroundColor: 'blue',
//       borderRadius: '10px',
//       marginTop: '-10px',
//       marginLeft: '-15px',
//       alignContent: 'center',
//       border: '3px solid deepskyblue',
//     }}
//   ></div>
// );

// const AnyReactComponent = (text) => (
//   <div
//     className={'locationBackground'}
//     style={{marginTop: '-35px', marginLeft: '-27px'}}
//   >
//     <p
//       style={{
//         textAlign: 'center',
//         fontSize: '16px',
//       }}
//     >
//       <b>{text}</b>
//     </p>
//   </div>
// );
const fsearch = () => {
  // const array = [];
  const GOOGLE_API = process.env.NEXT_GOOGLE_API;
  const ctx = useContext(Context);
  // eslint-disable-next-line no-unused-vars
  const [longitude, setLongitude] = useState(106.905746);
  // eslint-disable-next-line no-unused-vars
  const [latitude, setLatitude] = useState(47.886398);
  const [startDate, setStartDate] = useState();
  const [keywordId, setKeywordId] = useState({});
  const [dataSource, setDataSource]=useState([]);
  const [type, setType] = useState({});
  const [endDate, setEndtDate] = useState();
  const [spaceData, setSpacedata] = useState([]);
  const [markers, setMarkers]= useState([]);
  const [defaultCenter, setDefaultCenter]=useState({
    lat: null,
    lng: null,
  });
  // const [options, setOptions] = useState([]);
  const [searchedData, setSearchedData] = useState([]);

  const onFinish = async (values) => {
    console.log(values, 'values');
    let url = '';
    if (values.tuneType === 'Бүтэн өдөр') {
      url = `/search/test/input?latitude=${position.latitude}&longitude=${
        position.longitude
      }&keywordId=${searchId}&startDate=${values.startdate.format(
        'YYYY-MM-DD',
      )}&endDate=${values.enddate.format(
        'YYYY-MM-DD',
      )}&fullDay=true&startTime=${timeSplit.dayStart}&endTime=${
        timeSplit.nightEnd
      }`;
    } else if (values.tuneType === 'Өдөр') {
      url = `/search/test/input?latitude=${position.latitude}&longitude=${
        position.longitude
      }&keywordId=${searchId}&startDate=${values.startdate.format(
        'YYYY-MM-DD',
      )}&endDate=${values.enddate.format(
        'YYYY-MM-DD',
      )}&fullDay=false&startTime=${timeSplit.dayStart}&endTime=${
        timeSplit.dayEnd
      }`;
    } else if (values.tuneType === 'Шөнө') {
      url = `/search/test/input?latitude=${position.latitude}&longitude=${
        position.longitude
      }&keywordId=${searchId}&startDate=${values.startdate.format(
        'YYYY-MM-DD',
      )}&endDate=${values.enddate.format(
        'YYYY-MM-DD',
      )}&fullDay=false&startTime=${timeSplit.nightStart}&endTime=${
        timeSplit.nightEnd
      }`;
    }
    if (url != '') {
      const res = await callGet(url);
      if (!res || res === undefined) {
        showMessage(messageType.FAILED.type, defaultMsg.dataError);
        return;
      }
      loadData(res);
    }
  };
  const onFinishFailed = (values) => {
    console.log(values, 'onFinishFailed');
  };
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
  const onChangeType = (e) => {
    console.log(e);
    setType(e);
    console.log(startDate, endDate, type);
  };
  // const onMapClick = async (e) => {
  //   console.log(e);
  //   setSelectLate(e.lat);
  //   setSelectLng(e.lng);
  //   const locationsData = await callGet(
  //     `/search/location/test?latitude=${e.lat}&longitude=${e.lng}`,
  //   );
  //   console.log(locationsData);
  //   setSpacedata(locationsData);
  // };
  const loadData = (res) => {
    const mergedparks = [];
    setSearchedData([]);
    setMarkers([]);
    if (res.length > 0) {
      res.map((residence) => {
        residence.parkingSpaceList.content.map((park) => {
          mergedparks.push({residence, park});
        });
      });
      setMarkers(mergedparks);
      setDefaultCenter({
        lat: mergedparks[0].residence.latitude,
        lng: mergedparks[0].residence.longitude,
      });
      setSearchedData(mergedparks);
    } else {
      setDefaultCenter({
        lat: 47.91909306508191,
        lng: 106.91761127921768,
      });
    }
  };
  const onSelect = async (value, option) => {
    if (option.id && option.id != '') {
      setKeywordId(option.id);
      const res = await callGet(`/search/input/test?keywordId=${option.id}`);
      if (!res || res === undefined) {
        showMessage(messageType.FAILED.type, defaultMsg.dataError);
        return;
      } else {
        loadData(res);
      }
    }
  };
  const onSearchAuto =async (searchText)=>{
    if (searchText.length > 0) {
      const data = await callGet(`/search/keyword?syllable=${searchText}`);
      const cutData = data.slice(0, 20);
      setDataSource(searchText ? searchResult(cutData, searchText) : []);
    } else {
      setDataSource([]);
    }
  };
  const searchResult = (list) =>
    list.map((item) => {
      return {
        id: item.id,
        value: item.keyword,
      };
    });


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
  const disabledDate=(current)=> {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };
  const callback = async (key)=> {
    if (key === '2') {
      // const cheapSpace = await callGet('');
    }
  };
  return (
    <div style={{backgroundColor: '#fff'}}>
      <Form onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Row style={{padding: '20px'}}>
          <Col span={9}>
            <Form.Item
              name="keywordId"
              rules={[{required: true, message: 'Хаягаа сонгоно уу ?'}]}
            >
              <AutoComplete
                style={{
                  width: '100%',
                  height: '70px',
                }}

                // onChange={onChangeAddress}
                onSearch={onSearchAuto}
                onSelect={(value, option)=>onSelect(value, option)}
                placeholder="Байршилаа хайна уу!"
              >
                {dataSource.map((item, key) => (
                  <Option key={key} value={item.value} id={item.id}>
                    {item.value}
                  </Option>
                ))}
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
            <Content>
              <div style={{height: '100vh', width: '100%'}}>
                <MapWithAMarkerClusterer
                  markers={markers}
                  defaultCenter={defaultCenter}
                />
              </div>
            </Content>

            {/* <GoogleMapReact
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


            </GoogleMapReact> */}
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
                  <ToFit data={searchedData} lat={defaultCenter.lat} lng={defaultCenter.lng} markers={markers} />
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
