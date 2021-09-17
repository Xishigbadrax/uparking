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

  // eslint-disable-next-line no-unused-vars
  const [messageShow, setmessageShow] = useState(false);
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


  // const [visibleDrawerMore, setVisibleDrawerMore] = useState(false);
  const [parkingObject, setParkingObject] = useState({});

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
  const onClickMap =(e)=>{
    console.log(e, 'darsaaaa');
  };
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
      // console.log(mergedparks, 'wdawd');
      setMarkers(mergedparks);
      setDefaultCenter({
        lat: mergedparks[0].residence.latitude,
        lng: mergedparks[0].residence.longitude,
      });
      setSearchedData(mergedparks);
      console.log(searchedData, 'eneeeeeeeeeeeeeeeeeeeeeeeeeeee');
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
    // console.log(end, 'endDate end bnaa bandia');
  };
  const onTransfer = (id) => {
    console.log(id, 'ehnii id');
    id &&
      router.push({
        pathname: 'park/payment',
        query: {
          id: id,
        },
      });
  };
  const onFinish = async (values) => {
    setGetDataLoading(true);
    console.log(values);
    console.log(searchId);
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
    console.log(searchType, 'typeeeeeeeeeeeeeee');
    console.log(url, 'urlllllllllllllllllllllllll');
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
                  format="YYYY/MM/DD"
                  className="selectdates"
                  onChange={onChangeStartDate}
                />
              </Form.Item>{' '}
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
          <div style={{height: '100vh', width: '100%'}}>
            <MapWithAMarkerClusterer
              markers={markers}
              onClick={onClickMap}
              defaultCenter={defaultCenter}
            />
          </div>
        </Content>
        <Spin spinning={getdataLoading}>
          <Sider width={550}>
            <Tabs defaultActiveKey="1" className="searchTab" onChange={callback}>
              <TabPane tab="Тохирох" key="1">
                {searchedData.length > 0 ? (
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
                {searchType ==='full' && <Search data={searchDataOfPosition} startDate={startDate} endDate={endDate} tunetype={tuneType}/>}
                {searchType ==='fsearch' &&<ToFit data={searchDataOfPosition} lat={defaultCenter.lat} lng={defaultCenter.lng} />}
              </TabPane>
            </Tabs>
          </Sider>
        </Spin>
      </Layout>
    </Layout>

  );
};

export default Dashboard;
