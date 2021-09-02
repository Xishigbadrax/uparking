import {useEffect, useState} from 'react';
import {callGet} from '@api/api';
// import { Router } from 'next/router';
import {showMessage} from '../../utils/message';
import moment from 'moment';
import {
  Col,
  Row,
  Button,
  DatePicker,
  Select,
  Layout,
  Tabs,
  Spin,
  Empty,

  AutoComplete,
  Form,

} from 'antd';
// import moment from 'moment';

import ToFit from '@components/fsearch/toFIt.js';
import Search from '@components/search/Search';
// import Farthest from '@components/fsearch/farthest';


const {compose, withProps, withHandlers} = require('recompose');
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require('react-google-maps');
const {
  MarkerClusterer,
} = require('react-google-maps/lib/components/addons/MarkerClusterer');

const {TabPane} = Tabs;
// const { Option } = Select;
const {Option} = AutoComplete;
const {Header, Sider, Content} = Layout;

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

const Dashboard = () => {
  const [form] = Form.useForm();
  const [markers, setMarkers] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [searchDataOfPosition, setSearchedDataOfPosition]=useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [getdataLoading, setGetDataLoading]= useState(false);

  // eslint-disable-next-line no-unused-vars
  const [transfer, setTransfer] = useState(null);

  // const router = useRouter();
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 47.91909306508191,
    lng: 106.91761127921768,
  });
  // eslint-disable-next-line no-unused-vars
  const [position, setPosition] = useState({
    latitude: 47.918913,
    longitude: 106.917584,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  // eslint-disable-next-line no-unused-vars
  const [tuneType, setTuneType] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [startDate, setStartDate] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [endDate, setEndDate] = useState(null);
  const [searchId, setSearchId] = useState(null);
  const [searchType, setSearchType]=useState('');
  const [timeSplit, settimeSplit] = useState(null);


  const [visibleDrawerMore, setVisibleDrawerMore] = useState(false);

  const [parkingObject, setParkingObject] = useState({});
  // const isBase64 = async (str) => {
  //   if (str === '' || str.trim() === '') {
  //     return false;
  //   }
  //   try {
  //     return btoa(atob(str)) == str;
  //   } catch (err) {
  //     return false;
  //   }
  // };

  // const showDrawer = async (item) => {
  //   const res = await callGet(
  //     `/parkingspace?parkingSpaceId=${item.park.parkingSpaceId}`,

  //     setTransfer(item.park.parkingSpaceId),

  //   );
  //   if (!res || res === undefined) {
  //     showMessage(messageType.FAILED.type, defaultMsg.dataError);
  //     return;
  //   }
  //   const merged = {...res, ...item};
  //   setParkingObject(merged);
  //   setVisibleDrawerMore(true);
  // };

  const onCloseDrawerMore = () => {
    setVisibleDrawerMore(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await callGet('/config/timesplit').then((res) => {
        settimeSplit(res);
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    setParkingObject(parkingObject);
  }, [parkingObject]);

  const callback = (key) => {};

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
      console.log(mergedparks, 'wdawd');
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
  const loadDataOfPosition = (res) => {
    const parks = [];
    setSearchedDataOfPosition([]);
    setMarkers([]);
    if (res.length > 0) {
      res.map((residence) => {
        residence.parkingSpaceList.content.map((park) => {
          parks.push({residence, park});
        });
      });
      console.log(parks, 'position search data');
      setMarkers(parks);
      setDefaultCenter({
        lat: parks[0].residence.latitude,
        lng: parks[0].residence.longitude,
      });
      setSearchedDataOfPosition(parks);
    } else {
      setDefaultCenter({
        lat: 47.91909306508191,
        lng: 106.91761127921768,
      });
    }
  };


  const onSelectAuto = async (val, option) => {
    if (option.id && option.id != '') {
      setSearchId(option.id);
    }
  };
  const searchResult = (list) =>
    list.map((item) => {
      return {
        id: item.id,
        value: item.keyword,
      };
    });
  const onSearchAuto = async (searchText) => {
    if (searchText.length > 0) {
      const data = await callGet(`/search/keyword?syllable=${searchText}`);
      const cutData = data.slice(0, 20);
      setDataSource(searchText ? searchResult(cutData, searchText) : []);
    } else {
      setDataSource([]);
    }
  };
  const onChangeDay = (type) => {
    console.log(type, 'type');
    setTuneType(type);
  };
  const onChangeStartDate = (date) => {
    const a= moment(date).format('YYYY/MM/DD');
    setStartDate(a);
    console.log(a, 'start dtae->');
  };
  const onChangeEndDate = (date) => {
    const end = moment(date).format('YYYY/MM/DD');
    setEndDate(end);
    console.log(end, 'endDate end bnaa bandia');
  };
  // const onTransfer = (id) => {
  //   console.log(id, 'ehnii id');
  //   id &&
  //     router.push({
  //       pathname: 'park/payment',
  //       query: {
  //         id: id,
  //       },
  //     });
  // };
  const onFinish = async (values) => {
    setGetDataLoading(true);
    let url = '';
    if (tuneType !== null && startDate !== null && endDate!==null) {
      setSearchType('full');
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
    } else if (tuneType=== null || startDate === null || endDate===null) {
      console.log('fsearch bolson');
      setSearchType('fsearch');
      url=`/search/input/test?keywordId=${searchId}`;
    }
    if (url != '') {
      const res = await callGet(url);
      if (!res || res === undefined) {
        showMessage(messageType.FAILED.type, defaultMsg.dataError);
        return;
      }
      loadData(res);
      const searchOfLocation = await callGet(`/search/location/test?latitude=${position.latitude}&longitude=${position.longitude}`);
      console.log(searchOfLocation, 'searching locationnn');
      loadDataOfPosition(searchOfLocation);
      setGetDataLoading(false);
    }
  };
  const onFinishFailed = (values) => {
    console.log(values, 'onFinishFailed');
  };
  const onReset = () => {
    setStartDate(null);
    setEndDate(null);
    setTuneType(null);
    form.resetFields();
    setSearchedData([]);
  };
  return (
    <Layout>
      <Header>
        <Form
          form={form}
          style={{marginTop: '10px'}}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row className="mapheadersearch">
            <Col span={8}>
              <Form.Item
                name="text"
                // rules={[{required: true, message: 'Хайх утга оруулна уу'}]}
              >
                <AutoComplete
                  // dataSource={dataSource}
                  // options={options}
                  style={{width: '100%'}}
                  onSelect={(value, option) => onSelectAuto(value, option)}
                  onSearch={onSearchAuto}
                  placeholder="Байршил хайх"
                >
                  {dataSource.map((item, key) => (
                    <Option key={key} value={item.value} id={item.id}>
                      {item.value}
                    </Option>
                  ))}
                </AutoComplete>
              </Form.Item>
              {/* <Input
              placeholder="Хаяг"
              onChange={onChangeAddress}
              prefix={<SearchOutlined />}
            /> */}
            </Col>
            <Col span={4}>
              <Form.Item
                name="tuneType"
                // rules={[{required: true, message: 'Өдрийн төрөл сонгоно уу'}]}
              >
                <Select
                  placeholder="Өдрийн төрөл"
                  className="selectday"
                  onChange={onChangeDay}
                >
                  <Option value="Бүтэн өдөр">Бүтэн өдөр</Option>
                  <Option value="Өдөр">Өдөр</Option>
                  <Option value="Шөнө">Шөнө</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="startdate"
                // rules={[{required: true, message: 'Эхлэх огноо сонгоно уу'}]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  placeholder="Эхлэх огноо"
                  className="selectdates"
                  onChange={onChangeStartDate}
                />
              </Form.Item>{' '}
            </Col>
            <Col span={4}>
              <Form.Item
                name="enddate"
                // rules={[{required: true, message: 'Дуусах огноо сонгоно уу'}]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  placeholder="Дуусах огноо"
                  className="selectdates"
                  onChange={onChangeEndDate}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button htmlType="submit" type="primary" style={{width: '63%'}}>
                Хайх
              </Button>
              <Button
                htmlType="button"
                onClick={onReset}
                style={{width: '35%'}}
              >
                Цэвэрлэх
              </Button>
            </Col>
          </Row>
        </Form>
      </Header>
      <Layout style={{background: '#F8FAFC!important'}}>
        <Content>
          <div style={{height: '100vh', width: '100%'}}>
            <MapWithAMarkerClusterer
              markers={markers}
              defaultCenter={defaultCenter}
            />
          </div>
        </Content>
        <Spin spinning={getdataLoading}>
          <Sider width={550}>
            <Tabs defaultActiveKey="1" className="searchTab" onChange={callback}>
              <TabPane tab="Тохирох" key="1">
                {searchedData.length > 0 ? (
                // searchedData.map((item) => (
                //   <Card
                //     className="searchListItem"
                //     key={item.residence.residenceBlockId}
                //   >
                //     <Row>
                //       <Col span="12" className="imageSide">
                //         <div>
                //           <Image
                //             src={
                //               item.park.parkingSpaceImage ?
                //                 IMG_URL + item.park.parkingSpaceImage :
                //                 '/pexels-photo-3349460 1.png'
                //             }
                //             width="209.58px"
                //             preview={false}
                //           ></Image>
                //         </div>
                //         <Row>
                //           <Col
                //             span={24}
                //             style={{
                //               background: 'rgba(222, 226, 233, 0.2)',
                //               borderRadius: '24px',
                //               padding: '13px 23px',
                //               display: 'inline-flex',
                //               textAlign: 'center',
                //               justifyContent: 'center',
                //             }}
                //           >
                //             {item.park && item.park.floorNumber ? (
                //               <div style={{marginRight: '13px'}}>
                //                 {!isBase64(item.park.floorNumber) ? (
                //                   <Image
                //                     preview={false}
                //                     width={18}
                //                     src={IMG_URL + item.park.floorNumber}
                //                   />
                //                 ) : (
                //                   <Image
                //                     preview={false}
                //                     width={18}
                //                     fallback={
                //                       'data:image/png;base64,' +
                //                       item.park.floorNumber
                //                     }
                //                   />
                //                 )}
                //               </div>
                //             ) : null}
                //             {item.park && item.park.entranceLock ? (
                //               <div style={{marginRight: '13px'}}>
                //                 <Image
                //                   preview={false}
                //                   width={18}
                //                   src={IMG_URL + item.park.entranceLock}
                //                 />
                //               </div>
                //             ) : null}
                //             {item.park && item.park.isNumbering ? (
                //               <div style={{marginRight: '13px'}}>
                //                 <Image
                //                   preview={false}
                //                   width={18}
                //                   src={IMG_URL + item.park.isNumbering}
                //                 />
                //               </div>
                //             ) : null}
                //             {item.park && item.park.capacity ? (
                //               <div style={{marginRight: '13px'}}>
                //                 <Image
                //                   preview={false}
                //                   width={18}
                //                   src={IMG_URL + item.park.capacity}
                //                 />
                //               </div>
                //             ) : null}
                //             {item.park && item.park.type ? (
                //               <div style={{marginRight: '13px'}}>
                //                 <Image
                //                   preview={false}
                //                   width={18}
                //                   src={IMG_URL + item.park.type}
                //                 />
                //               </div>
                //             ) : null}
                //             {item.park && item.park.returnRoutes ? (
                //               <div style={{marginRight: '13px'}}>
                //                 <Image
                //                   preview={false}
                //                   width={18}
                //                   src={IMG_URL + item.park.returnRoutes}
                //                 />
                //               </div>
                //             ) : null}
                //           </Col>
                //         </Row>
                //       </Col>
                //       <Col span="12" className="descriptionSide">
                //         <div className="title" style={{marginBottom: '5px'}}>
                //           {item.residence.residenceName}
                //         </div>

                //         <Rate
                //           className="rateing"
                //           disabled
                //           value={item.park.totalRating}
                //         />

                //         <Row>
                //           <Col span={10} className="distance">
                //             • 110m
                //           </Col>
                //           <Col span={14} className="id">
                //             Байршил ID: {item.residence.residenceBlockCode}
                //           </Col>
                //         </Row>
                //         <Row className="addresss">
                //           <Col
                //             span="2"
                //             style={{
                //               display: 'flex',
                //               alignItems: 'center',
                //               justifyContent: 'center',
                //             }}
                //           >
                //             <Image
                //               preview={false}
                //               width="10px"
                //               src={'/images/icon/location_on.png'}
                //             ></Image>
                //           </Col>
                //           <Col span="22">{item.residence.address}</Col>
                //         </Row>
                //         {/* <div>
                //           <div className="totalText">Нийт үнэ</div>
                //           <div className="totalAmount">
                //             {item.park.price ? item.park.price : 0} ₮
                //           </div>
                //         </div> */}
                //         <div
                //           style={{
                //             display: 'flex',
                //             justifyContent: 'flex-end',
                //           }}
                //         >
                //           <Button type="info" onClick={() => showDrawer(item)}>
                //             Дэлгэрэнгүй
                //           </Button>
                //           {/* ))} */}
                //         </div>
                //       </Col>
                //     </Row>
                //   </Card>
                  <div>
                    {searchType ==='full' && <Search data={searchedData} startDate={startDate} endDate={endDate} tunetype={tuneType}/>}
                    {searchType ==='fsearch' &&<ToFit data={searchedData} lat={defaultCenter.lat} lng={defaultCenter.lng} />}
                  </div>
                ) : (
                  <Empty description={<span>Өгөгдөл байхгүй</span>} />
                )}
              </TabPane>
              <TabPane tab="Хамгийн хямд" key="2">
              Хамгийн хямд
              </TabPane>
              <TabPane tab="Хамгийн ойр" key="3">
                <Search data={searchDataOfPosition} startDate={startDate} endDate={endDate} />
              </TabPane>
            </Tabs>
          </Sider>
        </Spin>
      </Layout>
    </Layout>

  );
};

export default Dashboard;
