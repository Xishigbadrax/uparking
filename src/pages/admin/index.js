import { useContext, useEffect, useState } from 'react';
import { apiList, sList } from '@api/api';
import { Card, Col, Row, Button, DatePicker, Input, Select } from 'antd';
import Context from '@context/Context';
import moment from "moment"
import { SearchOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import GoogleMapReact from 'google-map-react';
const IndexPageMoreInfo = dynamic(
  () => import('@components/IndexPageMoreInfo'),
  { ssr: false }
)
const { RangePicker } = DatePicker;
const { Option } = Select;
const Dashboard = () => {
  const GOOGLE_API = process.env.NEXT_GOOGLE_API;
  const ctx = useContext(Context);
  const [dashboardData, setDashboardData] = useState({});
  const [seeMore, setSeeMore] = useState(false);
  const [startDate, setStartDate] = useState("2019-05-01");
  const [endDate, setEndtDate] = useState();
  const dateFormat = 'YYYY-MM-DD';
  const disabledDate = (current) => {
    return current && current > moment().endOf('day');
  }
  const getData = async (start_date, end_date) => {
    ctx.setIsLoading(true);
    if (ctx.checkPermission("DASHBOARD_CARD")) {
      const data = await sList({
        code: apiList.dashboardCard, defaultParams: [{ key: "start_date", value: start_date }, { key: "end_date", value: end_date }]
      });
      setDashboardData(data?.data[0]);
    }
    ctx.setIsLoading(false);
  };
  useEffect(() => {
    // const today = moment(new Date()).format('YYYY-MM-DD');
    // setEndtDate(today);
    // getData(startDate, today);
  }, []);
  const handleDateChange = (value, dateString) => {
    if (dateString) {
      setStartDate(dateString[0]);
      setEndtDate(dateString[1]);
      getData(dateString[0], dateString[1]);
    }
  };


  function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  function onOk(value) {
    console.log('onOk: ', value);
  }

  return (
    <div>
      <Row style={{ padding: '20px' }}>
        <Col span={8}>
          <Input placeholder="Хаяг" prefix={<SearchOutlined />} />
        </Col>
        <Col span={4}>
          <Select defaultValue="day" style={{ width: 120 }}>
            <Option value="day">Өдөр</Option>
            <Option value="night">Шөнө</Option>
          </Select>
        </Col>
        <Col span={8}>
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onChange={onChange}
            onOk={onOk}
          />
        </Col>
        <Col span={4}>
          <Button
            htmlType="submit"
            type="primary"
            block
          >
            Хайх
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <GoogleMapReact
          style={{height:"100vh"}}
            bootstrapURLKeys={{ key:GOOGLE_API }}
            defaultCenter={{ 
              lat: 47.91899690115193,
              lng: 106.91699199253857
            }}
            defaultZoom={11}
          >
          </GoogleMapReact>
        </Col>
        <Col span={6}>
          list
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;