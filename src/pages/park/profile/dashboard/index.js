import ProfileLayout from "@components/layouts/ProfileLayout";
import { Tabs } from 'antd';
import CustomCalendar from "@components/Calendar";
import { Row, Col, Card, Calendar, Tag } from "antd";
import { Radar, Bar } from 'react-chartjs-2';
import { callGet, callPost } from "@api/api";
import { useContext, useState, useEffect } from "react"
import Context from '@context/Context';
import Helper from '@utils/helper';
import { calendarLocale } from "@constants/constants.js"
import moment from 'moment';
import DayNightColumn from "@components/DayNightColumn"

const { TabPane } = Tabs;
const callback = (key) => {
    // console.log(key);
}
moment.updateLocale('mn', {
    weekdaysMin: ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"]
});


// const getListData = (value) => {
//   let listData;
//   switch (value.date()) {
//     case 8:
//       listData = [
//         { id:1, type: 'warning', content: 'Uparking дугаар' },
//         { id:2, type: 'success', content: 'This is usual event.' },
//       ];
//       break;
//     case 10:
//       listData = [
//         { id:3, type: 'warning', content: 'Uparking дугаар' },
//         { id:5, type: 'error', content: 'This is error event.' },
//       ];
//       break;
//     case 15:
//       listData = [
//         { id:6, type: 'warning', content: 'Uparking дугаар' },
//         { id:7, type: 'warning', content: 'Uparking дугаар' },
//       ];
//       break;
//     default:
//   }
//   return listData || [];
// }

const getMonthData = (value) => {
    if (value.month() === 8) {
        return 1394;
    }
}

const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
        <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
        </div>
    ) : null;
}

const data = [];


const data1 = {
    labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
    datasets: [
        {
            label: '# of Votes',
            data: [2, 9, 3, 5, 2, 3],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        },
    ],
};

const options = {
    scale: {
        ticks: { beginAtZero: true },
    },
};

const data2 = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const options2 = {
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart',
        },
    },
};


const Dashboard = () => {
    const ctx = useContext(Context);
    const [userData, setuserData] = useState(null);
    const [markedDate, setmarkedDate] = useState(null);
    const [calendarData, setCalendarData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        ctx.setIsLoading(true);
        await callGet(`/wallet/user`, null).then((res) => {
            console.log(res, 'resres')
            setuserData(res);
            if (res && res.pendingList && res.pendingList.length > 0) {
                setCalendarData(res.pendingList);
                // let acc = {};
                // let array = [];
                // res.pendingList.forEach((c) => {
                //     (acc[c.date] = {
                //         marked: true,
                //         selected: true,
                //         selectedColor: '#0013D4',
                //         money: c.amount,
                //     }),
                //         array.push(acc);
                // });
                // setmarkedDate(Object.assign({}, ...array));
            }
            ctx.setIsLoading(false);
        });
    };

    const getListData = (value) => {
        let listData = [];
        if (calendarData.length > 0) {
            calendarData.forEach(function (element) {
                var currentMoment = moment(element.date, 'YYYY/MM/DD');
                if (value.format('YYYY-MM-DD') === currentMoment.format('YYYY-MM-DD')) {
                    listData.push(element);
                }
            });
        }
        return listData || [];
    }
    const getTagColor = (item) => {
        if (item.bookingStatus === "CONFIRMED") {
            if (calendarStatus == 3) {
                return 'cyan'
            }
            return 'green';
        }
    }

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.date}>
                        {/* <Badge status={item.type} text={item.content} /> */}
                        <Tag color="green" className="eventText">{item.amount}</Tag>
                    </li>
                ))}
            </ul>
        );
    }


    return (
        <ProfileLayout>
            <Tabs defaultActiveKey="1" onChange={callback} type="card" className={"profileTab"}>
                <TabPane tab="Түрээслэгч" key="1">
                    <Row className={"status"}>
                        <Col span={9}>
                            <div className="totalSpentAmount">
                                <span>
                                    {userData ? Helper.formatValueReverse(userData.totalIncome) : 0}₮</span>
                            </div>
                            <div className="totalSpentText">
                                <span>Нийт заруулалт</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="levelAmount">
                                <span>0%</span>
                            </div>
                            <div className="levelText">
                                <span>Ашиглалтын түвшин</span>
                            </div>
                        </Col>
                        <Col span={7}>
                            <div className="daystatuses">
                                <span>Өдөр  0</span>
                            </div>
                            <div className="daystatuses">
                                <span>Шөнө  0</span>
                            </div>
                            <div className="daystatuses">
                                <span>Бүтэн өдөр  0</span>
                            </div>

                        </Col>
                    </Row>
                    {/* <CustomCalendar data={data} ></CustomCalendar> */}
                    <DayNightColumn />  <Calendar className="customCalendar" locale={calendarLocale} dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
                    <Row>
                        <Col span={12}></Col>
                        <Col span={12}></Col>
                    </Row>
                </TabPane>
                <TabPane tab="Түрээслүүлэгч" key="2">
                    <Row className={"status"}>
                        <Col span={9}>
                            <div className="totalSpentAmount">
                                <span>0₮</span>
                            </div>
                            <div className="totalSpentText">
                                <span>Нийт түрээсийн орлого</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="levelAmount">
                                <span>0%</span>
                            </div>
                            <div className="levelText">
                                <span>Ашиглалтын түвшин</span>
                            </div>
                        </Col>
                        <Col span={7}>
                            <div className="daystatuses">
                                <span>Өдөр  0</span>
                            </div>
                            <div className="daystatuses">
                                <span>Шөнө  0</span>
                            </div>
                            <div className="daystatuses">
                                <span>Бүтэн өдөр  0</span>
                            </div>

                        </Col>
                    </Row>
                    <CustomCalendar data={data} ></CustomCalendar>
                    <Row>
                        <Col span={12}>

                            <Card >
                                <Radar data={data1} options={options} />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card >

                                <Bar data={data2} options={options2} />
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        </ProfileLayout>
    );
}

export default Dashboard;