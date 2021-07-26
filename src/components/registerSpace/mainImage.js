import { Col, Row, Input } from "antd";
import { useState } from "react";
import { useMutate } from "restful-react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { info } from "autoprefixer";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 6;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}
const mainImage = () => {
  const [selectedPositionImage, setSelectedPositionImage] = useState();
  const [selectedDirectionImage, setSelectedDirectionImage] = useState();
  const [selectedNumberingImage, setSelectedNumberingImage] = useState();
  const [loadingPosition, setLoadingPosition] = useState(false);
  const [loadingDirect, setLoadingDirect] = useState(false);
  const [loadingNumbering, setLoadingNumbering] = useState(false);
  const onChangeNumberingImage = (info) => {
    if (info.file.status === "uploading") {
      setLoadingNumbering(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(
        info.file.originFileObj,
        (image) => (
          setLoadingNumbering(false), setSelectedNumberingImage(image)
        )
      );
    }
  };
  const onChangeDirectionImage = (info) => {
    if (info.file.status === "uploading") {
      setLoadingDirect(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(
        info.file.originFileObj,
        (image2) => (setLoadingDirect(false), setSelectedDirectionImage(image2))
      );
    }
  };
  const onChangePositionImage = (info) => {
    if (info.file.status === "uploading") {
      setLoadingPosition(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(
        info.file.originFileObj,
        (image3) => (
          setLoadingPosition(false), setSelectedPositionImage(image3)
        )
      );
    }
  };
  return (
    <div>
      <Row offset={4}>
        <p
          style={{
            fontSize: "20px",
            marginTop: "50px",
            color: "blue",
            marginLeft: "100px",
          }}
        >
          <b>Хайлтын хэсгийн үндсэн зураг</b>
        </p>
      </Row>
      <Row>
        <p style={{ fontSize: "12px", marginLeft: "100px" }}>
          Тухайн хэсэгт зогсоолын байрлал, дугаарлалт харагдаж буй зураг хийхгүй
        </p>
      </Row>
      <Row style={{ marginTop: "50px" }}>
        <Col offset={4}>
          <p style={{ fontSize: "15px" }}>
            Зогсоолын байршилын зураг (хаалга хэсгээс)
          </p>

          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={onChangePositionImage}
          >
            {selectedPositionImage ? (
              <img
                src={selectedPositionImage}
                alt="avatar"
                style={{ width: "100%", height: "240px" }}
              />
            ) : (
              <div>
                {loadingPosition ? <LoadingOutlined /> : <PlusOutlined />}
              </div>
            )}
          </Upload>
        </Col>
        <Col offset={4}>
          <p style={{ fontSize: "15px" }}>
            Зогсоолын эргэх урсгал харагдах зураг
          </p>

          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            style={{ width: "400px" }}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={onChangeDirectionImage}
          >
            {selectedDirectionImage ? (
              <img
                src={selectedDirectionImage}
                alt="avatar"
                style={{ height: "240px" }}
              >
                <text className={`ButtonGo`}>Дахин сонгох</text>
              </img>
            ) : (
              <div>
                {loadingDirect ? (
                  <LoadingOutlined>Уншиж байна</LoadingOutlined>
                ) : (
                  <PlusOutlined />
                )}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Col>
      </Row>
      <Row style={{ marginTop: "50px" }}>
        <Col offset={4}>
          <p style={{ fontSize: "15px" }}>
            Дугаарлалтын харагдах байдлын зураг
          </p>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={onChangeNumberingImage}
          >
            {selectedNumberingImage ? (
              <img
                src={selectedNumberingImage}
                alt="avatar"
                style={{ width: "100%", height: "250px" }}
              />
            ) : (
              <div>
                {loadingNumbering ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Col>
      </Row>
    </div>
  );
};
export default mainImage;
