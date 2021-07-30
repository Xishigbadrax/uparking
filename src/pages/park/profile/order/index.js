import ProfileLayout from "@components/layouts/ProfileLayout";
import { Tabs } from 'antd';
import CustomCalendar from "@components/Calendar";
import { Row, Col } from "antd";

const { TabPane } = Tabs;
const callback = (key) => {
  console.log(key);
}

const data = []


const Order = () => {

    return (
        <ProfileLayout>
            <Tabs defaultActiveKey="1" onChange={callback} type="card" className={"profileTab"}>
                <TabPane tab="Түрээслэгч" key="1">
                    <Tabs defaultActiveKey="1"  className="profileSubTab">
                        <TabPane tab="Хадгалсан" key="1">
                            <CustomCalendar data={data} ></CustomCalendar>
                        </TabPane>
                        <TabPane tab="Баталгаажсан" key="2">
                            <CustomCalendar data={data} ></CustomCalendar>
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