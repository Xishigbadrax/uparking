import ProfileLayout from "@components/layouts/ProfileLayout";
import { Tabs } from 'antd';
import CustomCalendar from "@components/Calendar";
import { Row, Col, Card } from "antd";
import { Radar, Bar } from 'react-chartjs-2';

const { TabPane } = Tabs;
const callback = (key) => {
    console.log(key);
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

    return (
        <ProfileLayout>
            <Tabs defaultActiveKey="1" onChange={callback} type="card" className={"profileTab"}>
                <TabPane tab="Түрээслэгч" key="1">
                    <Row className={"status"}>
                        <Col span={9}>
                            <div className="totalSpentAmount">
                                <span>140000₮</span>
                            </div>
                            <div className="totalSpentText">
                                <span>Нийт заруулалт</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="levelAmount">
                                <span>35%</span>
                            </div>
                            <div className="levelText">
                                <span>Ашиглалтын түвшин</span>
                            </div>
                        </Col>
                        <Col span={7}>
                            <div className="daystatuses">
                                <span>Өдөр  2</span>
                            </div>
                            <div className="daystatuses">
                                <span>Шөнө  2</span>
                            </div>
                            <div className="daystatuses">
                                <span>Бүтэн өдөр  2</span>
                            </div>

                        </Col>
                    </Row>
                    <CustomCalendar data={data} ></CustomCalendar>
                    <Row>
                        <Col span={12}></Col>
                        <Col span={12}></Col>
                    </Row>
                </TabPane>
                <TabPane tab="Түрээслүүлэгч" key="2">
                    <Row className={"status"}>
                        <Col span={9}>
                            <div className="totalSpentAmount">
                                <span>140000₮</span>
                            </div>
                            <div className="totalSpentText">
                                <span>Нийт түрээсийн орлого</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="levelAmount">
                                <span>35%</span>
                            </div>
                            <div className="levelText">
                                <span>Ашиглалтын түвшин</span>
                            </div>
                        </Col>
                        <Col span={7}>
                            <div className="daystatuses">
                                <span>Өдөр  2</span>
                            </div>
                            <div className="daystatuses">
                                <span>Шөнө  2</span>
                            </div>
                            <div className="daystatuses">
                                <span>Бүтэн өдөр  2</span>
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