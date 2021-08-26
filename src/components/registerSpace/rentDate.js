import {Calendar, Select} from 'antd';
import {Row, Col, Button, Divider, Radio} from 'antd';
import {useState, useEffect} from 'react';
import {callGet} from '@api/api';
import {calendarLocale} from '@constants/constants.js';
import DayNightColumn from '@components/DayNightColumn';
import {InfoCircleOutlined} from '@ant-design/icons';
import moment from 'moment';
moment.updateLocale('mn', {
  weekdaysMin: ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'],
});

const rentDate = (props) => {
  console.log(props);
  const [weekData, setWeekData] = useState();
  const [checked, setChecked] = useState();

  const [mondayMorning, setmondayMorning] = useState('Боломжтой');
  const [tuesdayMorning, settuesdayMorning] = useState('Боломжтой');
  const [wednesdayMorning, setwednesdayMorning] = useState('Боломжтой');
  const [thursdayMorning, setthursdayMorning] = useState('Боломжтой');
  const [fridayMorning, setfridayMorning] = useState('Боломжтой');
  const [saturdayMorning, setsaturdayMorning] = useState('Боломжтой');
  const [sundayMorning, setsundayMorning] = useState('Боломжтой');
  const [mondayNight, setmondayNight] = useState('Боломжтой');
  const [tuesdayNight, settuesdayNight] = useState('Боломжтой');
  const [wednesdayNight, setwednesdayNight] = useState('Боломжтой');
  const [thursdayNight, setthursdayNight] = useState('Боломжтой');
  const [fridayNight, setfridayNight] = useState('Боломжтой');
  const [saturdayNight, setsaturdayNight] = useState('Боломжтой');
  const [sundayNight, setsundayNight] = useState('Боломжтой');

  const [daySplitId, setDaySplitId] = useState();
  const [nightSplitId, setNightSplit] = useState();

  const onChangeViewCalendar = (e) => {
    setChecked(e.target.value);
    const data = {
      dayOfWeek: [
        {
          day: 1,
          timeSplitDescription: 'Өдөр',
          timeSplitId: Number(daySplitId),
          spaceStatusDescription: mondayMorning,
        },
        {
          day: 1,
          timeSplitDescription: 'Шөнө',
          timeSplitId: Number(nightSplit),
          spaceStatusDescription: mondayNight,
        },
        {
          day: 2,
          timeSplitDescription: 'Өдөр',
          timeSplitId: Number(daySplitId),
          spaceStatusDescription: tuesdayMorning,
        },
        {
          day: 2,
          timeSplitDescription: 'Шөнө',
          timeSplitId: Number(nightSplit),
          spaceStatusDescription: tuesdayNight,
        },
        {
          day: 3,
          timeSplitDescription: 'Өдөр',
          timeSplitId: Number(daySplitId),
          spaceStatusDescription: wednesdayMorning,
        },
        {
          day: 3,
          timeSplitDescription: 'Шөнө',
          timeSplitId: Number(nightSplit),
          spaceStatusDescription: wednesdayNight,
        },
        {
          day: 4,
          timeSplitDescription: 'Өдөр',
          timeSplitId: Number(daySplitId),
          spaceStatusDescription: thursdayMorning,
        },
        {
          day: 4,
          timeSplitDescription: 'Шөнө',
          timeSplitId: Number(nightSplit),
          spaceStatusDescription: thursdayNight,
        },
        {
          day: 5,
          timeSplitDescription: 'Өдөр',
          timeSplitId: Number(daySplitId),
          spaceStatusDescription: fridayMorning,
        },
        {
          day: 5,
          timeSplitDescription: 'Шөнө',
          timeSplitId: Number(nightSplit),
          spaceStatusDescription: fridayNight,
        },
        {
          day: 6,
          timeSplitDescription: 'Өдөр',
          timeSplitId: Number(daySplitId),
          spaceStatusDescription: saturdayMorning,
        },
        {
          day: 6,
          timeSplitDescription: 'Шөнө',
          timeSplitId: Number(nightSplit),
          spaceStatusDescription: saturdayNight,
        },
        {
          day: 0,
          timeSplitDescription: 'Өдөр',
          timeSplitId: Number(daySplitId),
          spaceStatusDescription: sundayMorning,
        },
        {
          day: 0,
          timeSplitDescription: 'Шөнө',
          timeSplitId: Number(nightSplit),
          spaceStatusDescription: sundayNight,
        },
      ],
    };
    setWeekData(data);
  };
  const timeSplit = [
    {id: 1, name: 'Боломжтой'},
    {id: 2, name: 'Боломжгүй'},
  ];
  const getListData = (value) =>{
    const array = [];

    weekData.dayOfWeek.map((item) => {
      switch (item.day) {
        case value.day():
          if (item.spaceStatusDescription === 'Боломжтой') {
            array.push({
              type: item.spaceStatusDescription,
              content: item.timeSplitDescription,
            });
          }
          if (item.spaceStatusDescription === 'Боломжгүй') {
            array.push({
              type: item.spaceStatusDescription,
              content: item.timeSplitDescription,
            });
          }
          break;
        default:
      }
    });
    return array || [];
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    console.log(listData);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content} style={{height: '15px'}}>
            <span
              style={{fontSize: '10px'}}
              className={item.type === 'Боломжтой' ? 'Success' : 'NotSuccess'}
            >
              {item.type}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month" style={{height: '50px'}}>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  useEffect(async () => {
    const data = await callGet('/parkingspace/timesplit');
    console.log(data);
    setDaySplitId(data.daySplit.id);
    setNightSplit(data.nightSplit.id);
    console.log(daySplitId, nightSplitId);
  }, []);
  return (
    <div>
      <Row offset={4}>
        <p
          style={{
            color: 'blue',
            fontSize: '20px',
            marginTop: '50px',
            marginLeft: '100px',
          }}
        >
          <b> Түрээслэх өдөр</b>
        </p>
      </Row>
      <Row>
        <p style={{fontSize: '12px', marginLeft: '100px'}}>
          Тухайн зогсоолийн байрлал, дугаарлалт харагдаж буй зогсоолыг олоход
          тохиромжтой олоход тохиромжтой зураг хийнэ.
        </p>
      </Row>
      <Row>
        <Col span={10}>
          <Row
            style={{
              marginLeft: '100px',
            }}
          >
            <Button
              //   onClick={() => setFilterType("AV")}
              //   className={`text-center  col-span-1 buttonFilter1 ${
              //     filterType === "AV" ? "activeButton" : ""
              //   }`}
              style={{
                backgroundColor: '#33FFFC',
                color: '#76E8AA',
                border: '1px solid #00F9B8',
              }}
            >
              AV
            </Button>
            <Button
              //   onClick={() => setFilterType("UN")}
              //   className={`text-center  col-span-1 buttonFilter1 ${
              //     filterType === "UN" ? "activeButton" : ""
              //   }`}
              style={{
                marginLeft: '10px',
                backgroundColor: 'gray',
              }}
            >
              UN
            </Button>

            <p style={{marginLeft: '10px', fontSize: '16px'}}>
              Тохиргоо хийх
            </p>
            <Divider className={`stateDivider`} />
          </Row>
          <Row style={{marginLeft: '100px'}}>
            <Col span={6} offset={1}></Col>
            <Col span={6} offset={1}>
              Өдөр|08:00-18:30
            </Col>
            <Col span={6} offset={1}>
              Шөнө|08:00-18:30
            </Col>
          </Row>
          <Row
            style={{marginLeft: '100px', marginTop: '5px'}}
            className={`pickWeekDayState`}
          >
            <Col span={4} offset={3} style={{fontSize: '15px'}}>
              Ням
            </Col>
            <Col span={5} offset={1}>
              <Select
                onChange={(e) => {
                  props.setRentData(weekData);
                  setsundayMorning(e), setChecked(2);
                }}
                value={sundayMorning}
                className={
                  sundayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={5} offset={2}>
              <Select
                onChange={(e) => {
                  props.setRentData(weekData);
                  setsundayNight(e), setChecked(2);
                }}
                value={sundayNight}
                className={
                  sundayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          {/* Даваа гараг*/}
          <Row
            style={{marginLeft: '100px', marginTop: '5px'}}
            className={`pickWeekDayState`}
          >
            <Col span={4} offset={3} style={{fontSize: '15px'}}>
              Даваа
            </Col>
            <Col span={5} offset={1}>
              <Select
                onChange={(e) => {
                  props.setRentData(weekData);
                  setmondayMorning(e), setChecked(2);
                }}
                value={mondayMorning}
                className={
                  mondayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={5} offset={2}>
              <Select
                onChange={(e) => {
                  setmondayNight(e), setChecked(2);
                  props.setRentData(weekData);
                }}
                value={mondayNight}
                className={
                  mondayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          {/* Мягмар гараг */}
          <Row
            style={{marginLeft: '100px', marginTop: '5px'}}
            className={`pickWeekDayState`}
          >
            <Col span={4} offset={3} style={{fontSize: '15px'}}>
              Мягмар
            </Col>
            <Col span={5} offset={1}>
              <Select
                s
                onChange={(e) => {
                  settuesdayMorning(e), setChecked(2);
                  props.setRentData(weekData);
                }}
                value={tuesdayMorning}
                className={
                  tuesdayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={5} offset={2}>
              <Select
                onChange={(e) => {
                  settuesdayNight(e), setChecked(2);
                  props.setRentData(weekData);
                }}
                value={tuesdayNight}
                className={
                  tuesdayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          {/* Лхагва гараг  */}
          <Row
            style={{marginLeft: '100px', marginTop: '5px'}}
            className={`pickWeekDayState`}
          >
            <Col span={4} offset={3} style={{fontSize: '15px'}}>
              Лхагва
            </Col>
            <Col span={5} offset={1}>
              <Select
                span={6}
                onChange={(e) => {
                  setwednesdayMorning(e), setChecked(2);
                  props.setRentData(weekData);
                }}
                value={wednesdayMorning}
                className={
                  wednesdayMorning === 'Боломжтой' ?
                    'Surrender' :
                    'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={5} offset={2}>
              <Select
                onChange={(e) => {
                  props.setRentData(weekData);
                  setwednesdayNight(e), setChecked(2);
                }}
                value={wednesdayNight}
                className={
                  wednesdayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          {/* Пүрэв гараг */}
          <Row
            style={{marginLeft: '100px', marginTop: '5px'}}
            className={`pickWeekDayState`}
          >
            <Col span={4} offset={3} style={{fontSize: '15px'}}>
              Пүрэв
            </Col>
            <Col span={5} offset={1}>
              <Select
                onChange={(e) => {
                  setthursdayMorning(e), setChecked(2);
                  props.setRentData(weekData);
                }}
                value={thursdayMorning}
                className={
                  thursdayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={5} offset={2}>
              <Select
                onChange={(e) => {
                  setthursdayNight(e), setChecked(2);
                  props.setRentData(weekData);
                }}
                value={thursdayNight}
                className={
                  thursdayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          {/* Баасан гараг */}
          <Row
            style={{marginLeft: '100px', marginTop: '5px'}}
            className={`pickWeekDayState`}
          >
            <Col span={4} offset={3} style={{fontSize: '15px'}}>
              Баасан
            </Col>
            <Col span={5} offset={1}>
              <Select
                onChange={(e) => {
                  setfridayMorning(e), setChecked(2);
                  props.setRentData(weekData);
                }}
                value={fridayMorning}
                className={
                  fridayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={5} offset={2}>
              <Select
                onChange={(e) => {
                  setfridayNight(e), setChecked(2), props.setRentData(weekData);
                }}
                value={fridayNight}
                className={
                  fridayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          {/* Бямба гараг*/}
          <Row
            style={{marginLeft: '100px', marginTop: '5px'}}
            className={`pickWeekDayState`}
          >
            <Col span={4} offset={3} style={{fontSize: '15px'}}>
              Бямба
            </Col>
            <Col span={5} offset={1}>
              <Select
                onChange={(e) => {
                  setsaturdayMorning(e),
                  setChecked(2),
                  props.setRentData(weekData);
                }}
                value={saturdayMorning}
                className={
                  saturdayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={5} offset={2}>
              <Select
                onChange={(e) => {
                  setsaturdayNight(e),
                  setChecked(2),
                  props.setRentData(weekData);
                }}
                value={saturdayNight}
                className={
                  saturdayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row style={{marginLeft: '100px', marginTop: '20px'}}>
            <p
              style={{
                color: '#141A29',
                fontSize: '14px',
                fontFamily: 'Helvetica',
                fontWeight: 'normal',
                fontStyle: 'normal',
              }}
            >
              Долоо хоногын хувиарыг сарын календарлуу шилжүүлэх үү ?
            </p>
          </Row>
          <Row
            style={{marginLeft: '100px', height: '24px'}}
            className={`InfoIconInDayState`}
          >
            <Col span={2}>
              <InfoCircleOutlined
                style={{height: '24px', width: '24px', color: 'yellow'}}
              />
            </Col>
            <Col span={22}>
              <p style={{fontSize: '12px', fontWeight: 400}}>
                Үгүй гэсэн сонголтыг хийсэн тохиолдолд 7 хоног бүр хуваарийг
                шинэчлэхийг анхаарна уу!
              </p>
            </Col>
          </Row>
          <Row style={{marginLeft: '100px', marginTop: '10px'}}>
            <Radio.Group onChange={onChangeViewCalendar} value={checked}>
              <Radio value={1}>Тийм</Radio>
              <Radio value={2}>Үгүй</Radio>
            </Radio.Group>
          </Row>
        </Col>
        <Divider
          type="vertical"
          style={{
            height: '450px ',
            width: '1px',
            marginTop: '20px',
          }}
        />
        {checked === 1 && (
          <Col>
            <Row style={{width: '720px'}} className={`rentDate`}>
              <Col span={2}>
                <DayNightColumn className={`rentCalendarDayNightText`} />
              </Col>
              <Col span={20}>
                <Calendar
                  className={`rentDateCalendar`}
                  dateCellRender={dateCellRender}
                  locale={calendarLocale}
                  monthCellRender={monthCellRender}
                />
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </div>
  );
};
export default rentDate;
