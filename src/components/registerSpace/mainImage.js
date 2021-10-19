import {Col, Row} from 'antd';
import {useState} from 'react';
import {Upload, message} from 'antd';
import {Spin, Form} from 'antd';
import {LoadingOutlined, PlusOutlined, RedoOutlined} from '@ant-design/icons';
const getBase64 = (img, callback) => {
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
const mainImage = (props) => {
  const LoadIcon = <LoadingOutlined />;
  const [selectedPositionImage, setSelectedResidenceSideImage] = useState();
  const [selectedDirectionImage, setSelectedMainImage] = useState();
  const [selectedNumberingImage, setSelectedDoorExitImage] = useState();
  const [selectResidenceEXitImage, setSelectedResidenceExitImage] = useState();
  const [loadingPosition, setLoadingPosition] = useState(false);
  const [loadingDirect, setLoadingDirect] = useState(false);
  const [loadingExit, setLoadingExit] = useState(false);
  const [loadingExitImage, setLoadingExitImage] = useState(false);

  const onChangeDoorExitImage = (info) => {
    if (info.file.status === 'uploading') {
      setLoadingExitImage(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(
        info.file.originFileObj,
        (image) => (setLoadingExitImage(false), setSelectedDoorExitImage(image)),
      );
    }
  };
  const onChangeMainImage = (info) => {
    if (info.file.status === 'uploading') {
      setLoadingDirect(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(
        info.file.originFileObj,
        (image2) => (setLoadingDirect(false), setSelectedMainImage(image2)),
      );
    }
  };
  const onChangeResidenceExitImage = (info) => {
    if (info.file.status === 'uploading') {
      setLoadingExit(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(
        info.file.originFileObj,
        (image2) => (
          setLoadingExit(false), setSelectedResidenceExitImage(image2)
        ),
      );
    }
  };
  const onChangeResidenceSideImage = (info) => {
    if (info.file.status === 'uploading') {
      setLoadingPosition(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(
        info.file.originFileObj,
        (image3) => (
          setLoadingPosition(false),
          setSelectedResidenceSideImage(image3)
        ),
      );
    }
  };
  return (
    <div className="MainImage">
      <Form form={props.form}
        onFinish={(values) => props.onFinish(form, values)}
        // onFinishFailed={onFinishFailed}
      >
        <Row offset={4}>
          <p
            style={{
              fontSize: '20px',
              marginTop: '50px',
              color: 'blue',
              marginLeft: '100px',
            }}
          >
            <b>Хайлтын хэсгийн үндсэн зураг</b>
          </p>
        </Row>
        <Row>
          <p style={{fontSize: '12px', marginLeft: '100px'}}>
            Тухайн хэсэгт зогсоолын байрлал, дугаарлалт харагдаж буй зураг
            хийхгүй
          </p>
        </Row>
        <Row style={{marginTop: '25px'}}>
          <Col offset={3} span={6}>
            <p style={{fontSize: '14px', height: '30px'}}>Хотхоны ойр орчмын зураг</p>
            <Form.Item
              style={{marginTop: '10px'}}
              name="imageResidenceSurrounding"
              initialValue={selectedPositionImage}
              rules={[
                {
                  required: true,
                  message: 'Хотхоны ойр орчмын зураг сонгоно уу?',
                },
              ]}
            >
              <Upload
                name="avatar"
                accept='.png , .jpg'
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={onChangeResidenceSideImage}
              >
                {selectedPositionImage ? (
                  <div>
                    <img
                      src={selectedPositionImage}
                      alt="avatar"
                      style={{width: '380px', height: '180px', borderRadius: '10px'}}
                    />
                    <div
                      className={'UploadAgainButton'}
                      style={{
                        marginTop: '-40px',
                        zIndex: 5,
                        position: 'absolute',
                        marginLeft: '200px',
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
          <Col offset={4}>
            <p style={{fontSize: '14px', height: '30px'}}>Хотхоны орц гарцын зураг</p>
            <Form.Item
              style={{marginTop: '10px'}}
              name="imageParkingGate"
              rules={[
                {
                  required: true,
                  message: 'Хотхоны орц гарцын зураг сонгоно уу?',
                },
              ]}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={onChangeResidenceExitImage}
              >
                {selectResidenceEXitImage ? (
                  <div>
                    <img
                      src={selectResidenceEXitImage}
                      alt="avatar"
                      style={{width: '380px', height: '180px', borderRadius: '10px'}}
                    />
                    <div
                      className={'UploadAgainButton'}
                      style={{
                        marginTop: '-40px',
                        zIndex: 5,
                        position: 'absolute',
                        marginLeft: '200px',
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
                    {loadingExit ? (
                      <Spin indicator={LoadIcon} tip = "зургийг хуулж байна." />
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

        {/* Доод талын 2 зураг*/}
        <Row style={{marginTop: '50px'}}>
          <Col offset={3} span={6}>
            <p style={{fontSize: '14px', height: '30px', width: '100%'}}>
              Зогсоолын хаалганы ,орох гарах хэсгийн зураг
            </p>
            <Form.Item
              style={{marginTop: '10px'}}
              name="imageResidenceGate"
              rules={[
                {
                  required: true,
                  message: 'Зогсоолын хаалганы хэсгийн зураг оруулна уу?',
                },
              ]}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={onChangeDoorExitImage}
              >
                {selectedNumberingImage ? (
                  <div>
                    <img
                      src={selectedNumberingImage}
                      alt="avatar"
                      style={{width: '380px', height: '180px', borderRadius: '10px'}}
                    />
                    <div
                      className={'UploadAgainButton'}
                      style={{
                        marginTop: '-40px',
                        zIndex: 5,
                        position: 'absolute',
                        marginLeft: '200px',
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
                    {loadingExitImage ? (
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
          <Col offset={4}>
            <p style={{fontSize: '14px', height: '30px'}}>Зогсоолын ерөнхий зураглал</p>
            <Form.Item
              style={{marginTop: '10px'}}
              name="imageParkingOverall"
              rules={[
                {required: true, message: 'Ерөнхий зураглалаа сонгоно уу?'},
              ]}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={onChangeMainImage}
              >
                {selectedDirectionImage ? (
                  <div>
                    <div>
                      <img
                        src={selectedDirectionImage}
                        alt="avatar"
                        style={{width: '380px', height: '180px', borderRadius: '10px'}}
                      ></img>
                    </div>
                    <div
                      className={'UploadAgainButton'}
                      style={{
                        marginTop: '-40px',
                        zIndex: 5,
                        position: 'absolute',
                        marginLeft: '200px',
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
      </Form>
    </div>
  );
};
export default mainImage;
