import {useEffect, useState,useContext} from 'react';
import {callGet} from '@api/api';
import { useRouter } from 'next/router';
import {showMessage} from '../../utils/message';
import {messageType, defaultMsg} from '@constants/constants';
// import ReactCursorPosition from "react-cursor-position";
import moment from 'moment';
import Context from '@context/Context';
import {
  Col,
  Row,
  Button,
  DatePicker,
  Select,
  Layout,
  Spin,
  Empty,
  AutoComplete,
  Form,

} from 'antd';
// import moment from 'moment';
import GoogleMapReact from 'google-map-react';
import ToFit from '@components/fsearch/toFIt.js';
import Search from '@components/search/Search';
// import Farthest from '@components/fsearch/farthest';


// const {compose, withProps, withHandlers} = require('recompose');
// const {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } = require('react-google-maps');
// const {
//   MarkerClusterer,
// } = require('react-google-maps/lib/components/addons/MarkerClusterer');


// const {TabPane} = Tabs;
// const { Option } = Select;
const {Option} = AutoComplete;
const {Header, Sider, Content} = Layout;
// const MapWithAMarkerClusterer = compose(
//   withProps({
//     googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD15334amUTZVfPVXv7p989Mew8iMmAoA0&v=3.exp&libraries=geometry,drawing,places',
//     loadingElement: <div style={{height: '100%'}} />,
//     containerElement: <div style={{height: '100%'}} />,
//     mapElement: <div style={{height: '100%'}} />,
//   }),
//   withHandlers({
//     onMarkerClustererClick: () => (markerClusterer) => {
//       const clickedMarkers= markerClusterer.getMarkers();
//     },
//   }),
//   withScriptjs,
//   withGoogleMap,
// )((props) => (

//   <GoogleMap defaultZoom={13} defaultCenter={props.defaultCenter}>
//     <MarkerClusterer
//       onClick={props.onMarkerClustererClick}
//       averageCenter
//       enableRetinaIcons
//       gridSize={60}
//     >
//       {props.markers.map((marker) => (
//         <Marker
//           key={marker.residence.residenceBlockCode}
//           position={{
//             lat: marker.residence.latitude,
//             lng: marker.residence.longitude,
//           }}
//         />
//       ))}
//       <Marker/>
//     </MarkerClusterer>
//   </GoogleMap>
// ));
// eslint-disable-next-line react/prop-types


const Dashboard = () => {
  const [form] = Form.useForm();
  const [markers, setMarkers] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [searchDataOfPosition, setSearchedDataOfPosition]=useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [getdataLoading, setGetDataLoading]= useState(false);
  const GOOGLE_API = process.env.NEXT_GOOGLE_API;
  const {userdata} = useContext(Context);
  const [userRealData, setUserRealData] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [transfer, setTransfer] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [messageShow, setmessageShow] = useState(false);
  const router = useRouter();
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
  const [selectLat, setSelectLate] = useState();
  const [selectLng, setSelectLng] = useState();
  const [currentSpaceId,setCurrentSpaceId]= useState(null)
  // const [visibleDrawerMore, setVisibleDrawerMore] = useState(false);
  const [parkingObject, setParkingObject] = useState({});

  
  useEffect(() => {
    setParkingObject(parkingObject);
  }, [parkingObject]);
  useEffect(async () => {
    if (typeof userdata.firstName != 'undefined') {
      setUserRealData(userdata);
    }
    // } else{
    //     router.push('/park/createUser');
    // }
  }, [userdata]);
  useEffect(() => {
    const fetchData = async () => {
      await callGet('/config/timesplit').then((res) => {
        settimeSplit(res);
      });
      // if(userdata.firstName && userdata.lastName ){
      //    router.push('/park') ;
      // }else{
      //   router.push('/park/createUser');
      // }
    };
    
    fetchData();
  }, []);
  // const Markers = (props) => {
  //   return <Marker className="SuperAwesomePin" style={{background: 'red'}} position={{
  //     lat: props.lat,
  //     lng: props.lng,
  //   }}>aaaaaaaaaaaa</Marker>;
  // };

  useEffect(() => {
    setParkingObject(parkingObject);
  }, [parkingObject]);
  // eslint-disable-next-line no-unused-vars
  const callback = (key) => {};
  const loadData = (res) => {
    const mergedparks = [];
    setSearchedData([]);
    setMarkers([]);
    if (res && res.length > 0) {
      res.map((residence) => {
        if (residence.parkingSpaceList) {
          residence.parkingSpaceList.content.map((park) => {
            mergedparks.push({residence, park});
          });
        }
      });
      setMarkers(mergedparks);
      setSearchedData(mergedparks);
    }
  };
  const loadDataOfPosition = (res) => {
    const parks = [];
    setSearchedDataOfPosition([]);
    setMarkers([]);
    if (res && res.length > 0) {
      res.map((residence) => {
        residence.parkingSpaceList.content.map((park) => {
          parks.push({residence, park});
        });
      });

      setSearchedDataOfPosition(parks);
      setMarkers(parks);
    } else {
      setDefaultCenter({
        lat: selectLat,
        lng: selectLng,
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
      setDataSource(searchText ? searchResult(data) : []);
    } else {
      setDataSource([]);
    }
  };
  const onChangeDay = (type) => {
    setTuneType(type);
  };
  const onChangeStartDate = (date) => {
    const a= moment(date).format('YYYY/MM/DD');
    setStartDate(a);
  };
  const onChangeEndDate = (date) => {
    const end = moment(date).format('YYYY/MM/DD');
    setEndDate(end);
  };
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
      setSearchType('fsearch');
      url=`/search/input/test?keywordId=${searchId}`;
    }
    const res = await callGet(`${url}`);
    if (!res || res === undefined) {
      showMessage(messageType.FAILED.type, defaultMsg.dataError);
    }
    loadData(res);
    loadDataOfPosition(res);
    setGetDataLoading(false);
  };
  const onClickMap = async (e) => {
    setCurrentSpaceId(null)
    setSearchType('fsearch');
    setGetDataLoading(true);
    setSelectLate(e.lat);
    setSelectLng(e.lng);
    const searchOfLocation = await callGet(`/search/location/test?latitude=${e.lat}&longitude=${e.lng}`);
    loadDataOfPosition(searchOfLocation);
    loadData(searchOfLocation);
    setGetDataLoading(false);
  };
  const onClickMarkeditem = (id,lat,lng)=>{
    setCurrentSpaceId(id);
    setDefaultCenter({
      lat: lat,
      lng: lng,
    });
  }
  const AnyReactComponent = ({text,parkingSpaceId,lat,lng}) => (
    <div
      className={'locationBackground'}
      onClick={()=>onClickMarkeditem(parkingSpaceId,lat,lng)}
      style={{marginTop: '-35px', marginLeft: '-27px'}}>
      <p
        style={{
          textAlign: 'center',
          color: '#fff',
          fontSize: '12px',
          paddingTop: '5px',
        }}
      >
        <b>{text}</b>
      </p>
    </div>
  );
  const ClickLocation = () => (
    <div
      // style={{
      //   height: '20px',
      //   width: '20px',
      //   backgroundColor: 'blue',
      //   borderRadius: '10px',
      //   marginTop: '-10px',
      //   marginLeft: '-15px',
      //   alignContent: 'center',
      //   border: '3px solid deepskyblue',
      // }}
    ></div>
  );

  const onFinishFailed = (values) => {
  };
  return (
    <Layout>
      <Header>
        <Form
          form={form}
          className='searchFormControl'
          style={{marginTop: '10px'}}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row >
            <Col span={7}>
              <Form.Item
                className="mapheadersearch"
                name="text"
              >
                <AutoComplete
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
            </Col>
            <Col span={4} >
              <div style={{border: '1px solid #A2A4AA', paddingLeft: '20px', paddingRight: '10px', borderRadius: '20px'}} className={'pickType'}>
                <label style={{color: '#A2A4AA', fontSize: '12px'}}>Захиалгын төрөл</label>
                <Form.Item
                  name="tuneType">
                  <Select
                    placeholder="Өдрийн төрөл"
                    className=" rounded-[40px] mt-[-7px]"
                    onChange={onChangeDay}
                  >
                    <Option value="Бүтэн өдөр">Бүтэн өдөр</Option>
                    <Option value="Өдөр">Өдөр</Option>
                    <Option value="Шөнө">Шөнө</Option>
                  </Select>
                </Form.Item>
              </div>
            </Col>
            <Col span={4} className={'pickType'} style={{border: '1px solid #A2A4AA', borderRadius: '20px'}}>
              <label style={{color: '#A2A4AA', fontSize: '12px', paddingLeft: '20px'}}>Эхлэх хугацаа</label>
              <Form.Item
                name="startdate" >
                <DatePicker
                  placeholder="Сонгох"
                  style={{width: '80%', borderRadius: '30px', marginLeft: '10%'}}
                  format="YYYY-MM-DD"
                  className="selectdates"
                  onChange={onChangeStartDate}
                />
              </Form.Item>{''}
            </Col>
            <Col span={4} className={'pickType'} style={{border: '1px solid #A2A4AA', borderRadius: '20px'}}>
              <label style={{color: '#A2A4AA', fontSize: '12px', paddingLeft: '20px'}}>Дуусах хугацаа</label>
              <Form.Item
                name="enddate">
                <DatePicker
                  placeholder="Сонгох"
                  format="YYYY/MM/DD"
                  style={{width: '80%', borderRadius: '30px', marginLeft: '10%'}}
                  className="selectdates"
                  onChange={onChangeEndDate}
                />
              </Form.Item>
            </Col>
            <Col span={4} >
              <Button htmlType="submit" type="primary" style={{width: '90%', height: '50px', borderRadius: '20px', marginLeft: '10px'}} >
                Хайх
              </Button>
            </Col>
          </Row>
        </Form>
      </Header>
      <Layout style={{background: '#F8FAFC!important', marginTop: '30px'}}>
        <Content>
          {/* <div style={{height: '100vh', width: '100%'}}>
            <MapWithAMarkerClusterer
              markers={markers}
              onClick={onClickMap}
              defaultCenter={defaultCenter}
            />
          </div> */}
          <Row>
            <Col span={24} >
              <GoogleMapReact
                style={{height: '100vh'}}
                bootstrapURLKeys={{key: GOOGLE_API}}
                center={{lat: defaultCenter.lat, lng: defaultCenter.lng}}
                defaultZoom={16}
                onClick={onClickMap}
                yesIWantToUseGoogleMapApiInternals
                // onGoogleApiLoaded={({map, markers}) => renderMarkers(map, markers)}
              >
                <div
                  className={'locationBackground'}
                  style={{color: 'white', paddingTop: '5px'}}
                >
                    Энд хайх
                </div>
                {selectLat & selectLng ? (
                  <ClickLocation lat={selectLat} lng={selectLng} />
                ) : null}
                {markers && markers.length && markers.map((item)=>(
                  <AnyReactComponent
                    key={item.park.parkingSpaceId}
                    lat={item.residence.latitude}
                    lng={item.residence.longitude}
                    parkingSpaceId={item.park.parkingSpaceId}
                    text="1p"
                  />
                ))}
              </GoogleMapReact>
            </Col>
          </Row>
        </Content>
        <Spin spinning={getdataLoading}>
          <Sider width={550}>
            {searchDataOfPosition && searchDataOfPosition.length > 0 ? (
              <div style={{height: '100vh'}}>
                {searchType ==='full' && <Search data={searchedData} startDate={startDate} endDate={endDate} tunetype={tuneType} currentSpaceId={currentSpaceId} setDefaultCenter={setDefaultCenter} setCurrentSpaceId={setCurrentSpaceId} /> }
                {searchType ==='fsearch' && <ToFit data={searchDataOfPosition} lat={selectLat} lng={selectLng} currentSpaceId={currentSpaceId} currentSpaceId={currentSpaceId} setDefaultCenter={setDefaultCenter} setCurrentSpaceId={setCurrentSpaceId} />}</div>):(
              <Empty description={<span>Өгөгдөл байхгүй</span>} />
            )}
            {/* <Tabs defaultActiveKey="1" className="searchTab" onChange={callback}>
              <TabPane tab="Тохирох" key="1">
                { searchedData && searchedData.length > 0 ? (
                  <div>
                    {searchType ==='full' && <Search data={searchedData} startDate={startDate} endDate={endDate} tunetype={tuneType}/>}
                    {searchType ==='fsearch' &&<ToFit data={searchedData}/>}
                  </div>
                ) : (
                  <Empty description={<span>Өгөгдөл байхгүй</span>} />
                )}
              </TabPane>
              <TabPane tab="Хамгийн хямд" key="2">
              Хамгийн хямд
              </TabPane>
              <TabPane tab="Хамгийн ойр" key="3">
                {searchDataOfPosition && searchDataOfPosition.length > 0 ? (
                  <div>
                    {searchType ==='full' && <Search data={searchDataOfPosition} startDate={startDate} endDate={endDate} tunetype={tuneType}/>}
                    {<ToFit data={searchDataOfPosition} lat={selectLat} lng={selectLng} />}</div>):(
                  <Empty description={<span>Өгөгдөл байхгүй</span>} />
                )}
              </TabPane>
            </Tabs> */}
          </Sider>
        </Spin>
      </Layout>
    </Layout>

  );
};

export default Dashboard;
