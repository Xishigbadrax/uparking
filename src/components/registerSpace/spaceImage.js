import {Col, Row} from 'antd';
import {useState} from 'react';
import {Upload, message} from 'antd';
import {Spin, Form} from 'antd';
import {LoadingOutlined, PlusOutlined, RedoOutlined} from '@ant-design/icons';

const getBase64 = (img, callback) =>{
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 6;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
const spaceImage = (props) => {
  console.log(props);
  const LoadIcon = <LoadingOutlined />;
  const [selectedPositionImage, setSelectedPositionImage] = useState();
  const [selectedDirectionImage, setSelectedDirectionImage] = useState();
  const [selectedNumberingImage, setSelectedNumberingImage] = useState();
  const [loadingPosition, setLoadingPosition] = useState(false);
  const [loadingDirect, setLoadingDirect] = useState(false);
  const [loadingNumbering, setLoadingNumbering] = useState(false);
  const onChangeNumberingImage = (info) => {
    if (info.file.status === 'uploading') {
      setLoadingNumbering(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(
        info.file.originFileObj,
        (image) => (
          setLoadingNumbering(false), setSelectedNumberingImage(image)
        ),
      );
    }
  };
  const onChangeDirectionImage = (info) => {
    if (info.file.status === 'uploading') {
      setLoadingDirect(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(
        info.file.originFileObj,
        (image2) => (setLoadingDirect(false), setSelectedDirectionImage(image2)),
      );
    }
  };
  const onChangePositionImage = (info) => {
    if (info.file.status === 'uploading') {
      setLoadingPosition(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(
        info.file.originFileObj,
        (image3) => (
          setLoadingPosition(false), setSelectedPositionImage(image3)
        ),
      );
    }
  };
  return (
    <div className={'spaceImage'}>
      <Form form={props.form}>
        <Row offset={4}>
          <p
            style={{
              fontSize: '20px',
              marginTop: '50px',
              color: 'blue',
              marginLeft: '100px',
            }}
          >
            <b>Түрээслэгчид харагдах зогсоолын зураг</b>
          </p>
        </Row>
        <Row>
          <p style={{fontSize: '12px', marginLeft: '100px'}}>
            Тухайн зогсоолийн байрлал, дугаарлалт харагдаж буй зогсоолыг олоход
            тохиромжтой олоход тохиромжтой зураг хийнэ.
          </p>
        </Row>
        <Row style={{marginTop: '30px'}}>
          <Col offset={4} span={6}>
            <p style={{fontSize: '15px'}}>
              Зогсоолын байршлын зураг (хаалга хэсгээс)
            </p>
            <Form.Item
              name="imageFromGate"
              rules={[
                {
                  required: true,
                  message: 'Зогсоолын байршлын зураг оруулна уу?',
                },
              ]}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={onChangePositionImage}
              >
                {selectedPositionImage ? (
                  <div>
                    <img
                      src={selectedPositionImage}
                      alt="avatar"
                      style={{width: '327px', height: '134px'}}
                    />
                    <div
                      className={'buttonGo'}
                      style={{
                        marginTop: '-40px',
                        zIndex: 5,
                        position: 'absolute',
                        marginLeft: '150px',
                        height: '28px',
                        width: '150px',
                        display: 'flex',
                      }}
                    >
                      <p style={{marginLeft: '30px', color: 'white'}}>
                        Дахин авах{' '}
                      </p>
                      <RedoOutlined
                        style={{
                          color: 'white',
                          marginLeft: '10px',
                          marginTop: '5px',
                          height: '20px',
                          width: '20px',
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    {loadingPosition ? (
                      <Spin indicator={LoadIcon} tip="зургийг хуулж байна." />
                    ) : (
                      <PlusOutlined
                        style={{
                          justifyContent: 'center',
                          alignContent: 'center',
                          backgroundColor: 'blue',
                          color: 'white',
                          height: '20px',
                          width: '20px',
                          borderRadius: '10px',
                        }}
                      />
                    )}
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col offset={4} span={6}>
            <p style={{fontSize: '15px'}}>
              Зогсоолын эргэх урсгал харагдах зураг
            </p>
            <Form.Item
              name="imageRouting"
              rules={[
                {
                  required: true,
                  message: 'Зогсоолын эргэх урсгал харагдах зураг оруулна уу?',
                },
              ]}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                style={{width: '400px'}}
                beforeUpload={beforeUpload}
                onChange={onChangeDirectionImage}
              >
                {selectedDirectionImage ? (
                  <div>
                    <img
                      src={selectedDirectionImage}
                      alt="avatar"
                      style={{height: '134px', width: '327px'}}
                    />
                    <div
                      className={'buttonGo'}
                      style={{
                        marginTop: '-40px',
                        zIndex: 5,
                        position: 'absolute',
                        marginLeft: '150px',
                        height: '28px',
                        width: '150px',
                        display: 'flex',
                      }}
                    >
                      <p style={{marginLeft: '30px', color: 'white'}}>
                        Дахин авах{' '}
                      </p>
                      <RedoOutlined
                        style={{
                          color: 'white',
                          marginLeft: '10px',
                          marginTop: '5px',
                          height: '20px',
                          width: '20px',
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    {loadingDirect ? (
                      <Spin indicator={LoadIcon} tip="зургийг хуулж байна." />
                    ) : (
                      <PlusOutlined
                        style={{
                          justifyContent: 'center',
                          alignContent: 'center',
                          backgroundColor: 'blue',
                          color: 'white',
                          height: '20px',
                          width: '20px',
                          borderRadius: '10px',
                        }}
                      />
                    )}
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row style={{marginTop: '50px'}}>
          <Col offset={4} span={6}>
            <p style={{fontSize: '15px'}}>
              Дугаарлалтын харагдах байдлын зураг
            </p>
            <Form.Item
              name="imageSpaceNumber"
              rules={[
                {
                  required: true,
                  message: 'Дугаарлалтын харагдах байдлын зураг оруулна уу?',
                },
              ]}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={onChangeNumberingImage}
              >
                {selectedNumberingImage ? (
                  <div>
                    <img
                      src={selectedNumberingImage}
                      alt="avatar"
                      style={{width: '327px', height: '134px'}}
                    />
                    <div
                      className={'buttonGo'}
                      style={{
                        marginTop: '-40px',
                        zIndex: 5,
                        position: 'absolute',
                        marginLeft: '150px',
                        height: '28px',
                        width: '150px',
                        display: 'flex',
                      }}
                    >
                      <p style={{marginLeft: '30px', color: 'white'}}>
                        Дахин авах{' '}
                      </p>
                      <RedoOutlined
                        style={{
                          color: 'white',
                          marginLeft: '10px',
                          marginTop: '5px',
                          height: '20px',
                          width: '20px',
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    {loadingNumbering ? (
                      <Spin indicator={LoadIcon} tip="зургийг хуулж байна." />
                    ) : (
                      <PlusOutlined
                        style={{
                          justifyContent: 'center',
                          alignContent: 'center',
                          backgroundColor: 'blue',
                          color: 'white',
                          height: '20px',
                          width: '20px',
                          borderRadius: '10px',
                        }}
                      />
                    )}
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default spaceImage;
