import {useState, useEffect} from 'react';
import React from 'react';
import ProfileLayout from '@components/layouts/ProfileLayout';
import {callGet} from '@api/api';
import {Steps} from 'antd';
import Link from 'next/link';
import {Row, Col} from 'antd';

const {Step} = Steps;

const Nemelt = () => {
  const [vehicles, setVehicles] = useState([]);
  useEffect(async () => {
    const data = await callGet('/user/vehicle/list');
    setVehicles(data);
  }, []);
  return (
    <div>
      {console.log(vehicles)}
      <ProfileLayout className="" style={{width: '100%', height: '100vh'}}>
        <Row>
          <Col span={10} offset={2} style={{marginTop: '150px'}}>
            <img src="/Nemelt.png"></img>
          </Col>
          <Col span={10} offset={2}>
            <div className="">
              <Steps
                size="small"
                style={{fontSize: '15px', color: 'blue'}}
                current={1}
              >
                <Step
                  title="Үндсэн мэдээлэл"
                  style={{fontSize: '10px', color: 'blue'}}
                />
                <Step title="Нэмэлт мэдээлэл" style={{fontSize: '15px'}} />
              </Steps>
            </div>
            <div style={{marginTop: '140px'}}>
              <div className="text-justify-start " style={{color: 'grey'}}>
                Та хаана ч хэзээ ч өөрийн зогсоолд тээврийн хэрэгсэлээ
                байршуулахыг хүсэж байвал тээврийн хэрэгслийн бүртгэлээ хийнэ
                үү.
              </div>
              <div style={{color: 'grey'}} className="mt-8">
                <b>Тээврийн хэрэгсэл бүртгүүлэх</b>
              </div>
              {vehicles.map((item) => (
                <div
                  key={item.value}
                  className="mt-4 width-auto  rounded flex shadow-sm"
                  style={{backgroundColor: 'white', width: '325px'}}
                >
                  <div className="mt-4 ml-4">
                    <img
                      src="/directions_car_24px.png"
                      height="20px "
                      width="20px"
                    ></img>
                  </div>
                  <div className="ml-4">
                    {/* <div class="text-sm">{item.label}</div> */}
                    <div className="text-base" style={{color: 'blue '}}>
                      {item.label}
                    </div>
                  </div>
                  <div className="ml-40 mt-2 ">
                    <Link href={`/teever/edit/${item.id}`}>
                      <img src="/mode_24px.png" />
                    </Link>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <Link href={'/a/profile/vehicle'}>
                  <button>
                    <img src="/add.png" />
                  </button>
                </Link>
              </div>
              <div className="text-justify-start " style={{color: '#666666'}}>
                Та өөрийн зогсоолыг илүү үр ашигтайгаар бусдад хуваалцахыг хүсэж
                байвал авто зогсоолын бүртгэлээ хийнэ үү.
              </div>
              <div style={{color: '#666666'}}>
                <b>Авто зогсоол бүртгүүлэх</b>
              </div>
              <div style={{marginTop: '10px'}}>
                <Link href="/park/profile/space">
                  <button>
                    <img src="/add.png" />
                  </button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{marginTop: '30px'}}>
          <Col offset={2}>
            <Link href="/nemelt">
              <img src="/Container.png" />
            </Link>
          </Col>
          <Col offset={16}>
            <Link href="/park/profile/optional">
              <div className={'buttonGo flex'}>
                <button style={{paddingLeft: '10px', color: 'white'}}>
                  Дуусгах
                </button>
                <div className="ml-4 pt-1">
                  <img src="/arrow_forward_24px.png" />
                </div>
              </div>
            </Link>
          </Col>
        </Row>
      </ProfileLayout>
    </div>
  );
};
export default Nemelt;
