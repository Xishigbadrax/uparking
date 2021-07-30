import ProfileLayout from "@components/layouts/ProfileLayout";
import { Tabs } from 'antd';
import CustomCalendar from "@components/Calendar";
import { Calendar } from "antd";
import { apiList, sList } from '@api/api';
import { useEffect, useState, useContext } from "react";
import { callGet } from "@api/api";
import Context from '@context/Context';
import { messageType, defaultMsg } from "@constants/constants";
import { showMessage } from "@utils/message";
import moment from 'moment';
import { calendarLocale } from "@constants/constants.js"
moment.updateLocale('mn', {
    weekdaysMin: ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"]
});

const { TabPane } = Tabs;
const callback = (key) => {
    console.log(key);
}
const data = []

const Order = () => {
    const ctx = useContext(Context);

    const [asWho, setAsWho] = useState(1);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [calendarData, setCalendarData] = useState([]);
    const [isDataLoading] = useState(false);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        ctx.setIsLoading(true);
        const res = await callGet(`/booking?asWho=${asWho}&isConfirmed=${isConfirmed}`);
        if (!res || res === undefined) {
            showMessage(messageType.FAILED.type, defaultMsg.dataError);
        } else {
            console.log(res, 'resresresresresresres')
            setCalendarData(res);
        }
        ctx.setIsLoading(false);
    };





    const getListData = (value) => {
        let listData = [];
        if (calendarData.length > 0) {
            calendarData.forEach(function (element) {
                var check = moment(element.startDateTime, 'YYYY/MM/DD');
                var day = check.format('D');
                if (value.date().toString() === day) {
                    let listElement = {
                        id: element.bookingId,
                        content: element.bookingNumber,
                        type: 'success'
                    };
                    listData.push(listElement);

                }
            });
        }
        return listData || [];
    }

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.id}>
                        {/* <Badge status={item.type} text={item.content} /> */}
                        <span className="eventText">{item.content}</span>
                    </li>
                ))}
            </ul>
        );
    }

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


    return (
        <ProfileLayout>
            <Tabs defaultActiveKey="1" onChange={callback} type="card" className={"profileTab"}>
                <TabPane tab="Түрээслэгч" key="1">
                    <Tabs defaultActiveKey="1" className="profileSubTab">
                        <TabPane tab="Хадгалсан" key="1">
                            <Calendar locale={calendarLocale} dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
                        </TabPane>
                        <TabPane tab="Баталгаажсан" key="2">
                            <Calendar locale={calendarLocale} dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
                        </TabPane>
                        <TabPane tab="Түүх" key="3">
                            <CustomCalendar data={data} ></CustomCalendar>
                        </TabPane>
                    </Tabs>
                </TabPane>
                <TabPane tab="Түрээслүүлэгч" key="2">
                    <CustomCalendar data={data} ></CustomCalendar>
                </TabPane>
            </Tabs>
        </ProfileLayout>
    );
}

export default Order;