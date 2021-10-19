/* eslint-disable react/prop-types */
import {callGet} from '@api/api';
import {Card, Col, Row, Image, Rate, Button, Drawer} from 'antd';
import {useState} from 'react';
import {showMessage} from '../../utils/message';

const ListItem = ({item}) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = async (id) => {
    const res = await callGet(`/search/input/test?keywordId=${id}`);
    if (!res || res === undefined) {
      showMessage(messageType.FAILED.type, defaultMsg.dataError);
      return;
    }

    // setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <Card className="searchListItem" key={item.id}>
      <Row>
        <Col span="12" className="imageSide">
          <div>
            <Image
              src="/pexels-photo-3349460 1.png"
              width="209.58px"
              preview={false}
            ></Image>
          </div>
          <div>
            <Image
              preview={false}
              src="/icons/1) Checkbox.png"
              width="20px"
              style={{marginLeft: '10px'}}
            />
            <Image
              preview={false}
              src="/icons/temdegleegui.png"
              width="20px"
              style={{paddingLeft: '10px'}}
            />
            <Image preview={false} src="/icons/haadag.png" width="20px" />
            <Image
              preview={false}
              src="/icons/Small SUV.png"
              width="20px"
              style={{paddingLeft: '10px'}}
            />
            <Image
              preview={false}
              src="/icons/Up.png"
              width="20px"
              style={{paddingLeft: '10px'}}
            />
            <Image
              preview={false}
              src="/icons/haadag.png"
              width="20px"
              style={{paddingLeft: '10px'}}
            />
            <Image
              preview={false}
              src="/keyboard_arrow_down_24px.png"
              width="20px"
              style={{paddingLeft: '10px'}}
            />
          </div>
        </Col>
        <Col span="12" className="descriptionSide">
          <div className="title">{item.keyword}</div>

          <Rate className="rateing" value={3} />

          <Row>
            <Col span={10} className="distance">
              • 110m
            </Col>
            <Col span={14} className="id">
              Байршил ID: {item.id}
            </Col>
          </Row>
          <Row className="address">
            <Col
              span="2"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                preview={false}
                width="10px"
                src={'/images/icon/location_on.png'}
              ></Image>
            </Col>
            <Col span="22">
              Улаанбаатар хот, сүхбаатар дүүрэг, 7-р хороо, Хангай хотхон, 516-р
              ...,{' '}
            </Col>
          </Row>
          <div>
            <div className="totalText">Нийт үнэ</div>
            <div className="totalAmount">16000</div>
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button type="primary" onClick={showDrawer(item.id)}>
              Дэлгэрэнгүй
            </Button>
          </div>
        </Col>
      </Row>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </Card>
  );
};

export default ListItem;
