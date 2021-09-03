import {useState, useEffect} from 'react';
import React from 'react';
// import ProfileLayout from '@components/layouts/ProfileLayout';
import {callGet} from '@api/api';
import {Steps} from 'antd';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Row, Col} from 'antd';

const {Step} = Steps;

const Nemelt = () => {
  const [vehicles, setVehicles] = useState([]);
  const router = useRouter();
  const onFinish = ()=>{
    router.push('/park');
  };
  useEffect(async () => {
    const data = await callGet('/user/vehicle/list');
    setVehicles(data);
  }, []);
  return (
    <div>
      <Row>
        <Col span={10} offset={2} style={{marginTop: '150px'}}>
          <Row>
            <Col style={{height: '400px'}}>
              <img src="/Nemelt.png"></img>
            </Col>
          </Row>
          <Row style={{marginTop: '30px'}}>
            <Col offset={2}>
              <Link href="/nemelt">
                <img src="/Container.png" />
              </Link>
            </Col>
          </Row>
        </Col>
        <Col span={10} offset={1} style={{marginTop: '50px', height: '400px'}}>
          <Row>
            <Col span={16} offset={1}>
              <Steps size="small" style={{fontSize: '15px', marginTop: '50px'}} current={0}>
                <Step title="Үндсэн мэдээлэл" size="middle" />
                <Step title="Нэмэлт мэдээлэл" />
              </Steps>
            </Col>
          </Row>
          <Row style={{marginTop: '30px'}}>
            <Col span={14} offset={1} style={{color: 'grey', textAlign: 'justify'}}>
                Та хаана ч хэзээ ч өөрийн зогсоолд тээврийн хэрэгсэлээ
                байршуулахыг хүсэж байвал тээврийн хэрэгслийн бүртгэлээ хийнэ
                үү.
            </Col>
          </Row>
          <Row>
            <Col offset={1} style={{color: 'grey'}} className="mt-8">
              <b>Тээврийн хэрэгсэл бүртгүүлэх</b>
            </Col>
          </Row>
          <Row>
            <Col offset={1}>
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
            </Col>
          </Row>
          <Row style={{marginTop: '30px'}}>
            <Col offset={1} span={14} style>
              <p style={{color: '#666666', textAlign: 'justify'}}>
                Та өөрийн зогсоолыг илүү үр ашигтайгаар бусдад хуваалцахыг хүсэж
                байвал авто зогсоолын бүртгэлээ хийнэ үү.
              </p>
            </Col>
          </Row>
          <Row style={{marginTop: '20px'}}>
            <Col offset={1}>
              <div style={{color: '#666666'}}>
                <b>Авто зогсоол бүртгүүлэх</b>
              </div>
            </Col>
          </Row>
          <Row>
            <Col offset={1} style={{marginTop: '10px'}}>
              <Link href="/park/profile/space">
                <button>
                  <img src="/add.png" />
                </button>
              </Link>
            </Col>
          </Row>
          <Row style={{marginTop: '40px'}} >
            <Col offset={16}>
              <div className={'FinishButton flex'} onClick={onFinish}>
                <button style={{paddingLeft: '10px', color: 'white'}}>
                  Дуусгах
                </button>
                <div style={{marginTop: '10px', marginLeft: '20px'}}>
                  <img src="/arrow_forward_24px.png" />
                </div>
              </div>
            </Col>
          </Row>

        </Col>
      </Row>


    </div>
  );
};
export default Nemelt;
