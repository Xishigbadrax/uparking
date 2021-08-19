import { Col, Row, Input } from "antd";
import { useEffect, useState } from "react";

import { Upload, message } from "antd";
import { Spin } from "antd";
import { Image } from "next/image";
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
  const LoadIcon = <LoadingOutlined />;
  const [selectedPositionImage, setSelectedResidenceSideImage] = useState();
  const [selectedDirectionImage, setSelectedMainImage] = useState();
  const [selectedNumberingImage, setSelectedDoorExitImage] = useState();
  const [selectResidenceEXitImage, setSelectedResidenceExitImage] = useState();
  const [loadingPosition, setLoadingPosition] = useState(false);
  const [loadingDirect, setLoadingDirect] = useState(false);
  const [loadingNumbering, setLoadingNumbering] = useState(false);
  const [loadingExitImage, setLoadingExitImage] = useState(false);
  const onChangeDoorExitImage = (info) => {
    if (info.file.status === "uploading") {
      setLoadingExitImage(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(
        info.file.originFileObj,
        (image) => (setLoadingExitImage(false), setSelectedDoorExitImage(image))
      );
    }
  };
  const onChangeMainImage = (info) => {
    if (info.file.status === "uploading") {
      setLoadingDirect(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(
        info.file.originFileObj,
        (image2) => (
          setLoadingDirect(false),
          setSelectedMainImage(image2),
          console.log(image2)
        )
      );
    }
  };
  const onChangeResidenceExitImage = (info) => {
    if (info.file.status === "uploading") {
      setLoadingNumbering(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(
        info.file.originFileObj,
        (image2) => (
          setLoadingNumbering(false), setSelectedResidenceExitImage(image2)
        )
      );
    }
  };
  const onChangeResidenceSideImage = (info) => {
    if (info.file.status === "uploading") {
      setLoadingPosition(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(
        info.file.originFileObj,
        (image3) => (
          setLoadingPosition(false), setSelectedResidenceSideImage(image3)
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
      <Row style={{ marginTop: "25px" }}>
        <Col offset={4}>
          <p style={{ fontSize: "15px" }}>Хотхоны ойр орчмын зураг</p>

          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={onChangeResidenceSideImage}
          >
            {selectedPositionImage ? (
              <img
                src={selectedPositionImage}
                alt="avatar"
                style={{ width: "100%", height: "240px" }}
              />
            ) : (
              <div>
                {loadingPosition ? (
                  <Spin indicator={LoadIcon} tip="зургийг хуулж байна." />
                ) : (
                  <PlusOutlined
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                      backgroundColor: "blue",
                      color: "white",
                      height: "20px",
                      width: "20px",
                      borderRadius: "10px",
                    }}
                  />
                )}
              </div>
            )}
          </Upload>
        </Col>
        <Col offset={4}>
          <p style={{ fontSize: "15px" }}>Хотхоны орц гарцын зураг</p>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            style={{ width: "400px" }}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={onChangeResidenceExitImage}
          >
            {selectResidenceEXitImage ? (
              <Image
                src={selectResidenceEXitImage}
                alt="avatar"
                style={{ height: "240px" }}
              />
            ) : (
              <div>
                {loadingDirect ? (
                  <Spin indicator={LoadIcon} tip="зургийг хуулж байна." />
                ) : (
                  <PlusOutlined
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                      backgroundColor: "blue",
                      color: "white",
                      height: "20px",
                      width: "20px",
                      borderRadius: "10px",
                    }}
                  />
                )}
              </div>
            )}
          </Upload>
        </Col>
      </Row>
      <Row style={{ marginTop: "50px" }}>
        <Col offset={4}>
          <p style={{ fontSize: "15px" }}>
            Зогсоолын хаалганы ,орох гарах хэсгийн зураг
          </p>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={onChangeDoorExitImage}
          >
            {selectedNumberingImage ? (
              <img
                src={selectedNumberingImage}
                alt="avatar"
                style={{ width: "100%", height: "250px" }}
              />
            ) : (
              <div>
                {loadingExitImage ? (
                  <Spin indicator={LoadIcon} tip="зургийг хуулж байна." />
                ) : (
                  <PlusOutlined
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                      backgroundColor: "blue",
                      color: "white",
                      height: "20px",
                      width: "20px",
                      borderRadius: "10px",
                    }}
                  />
                )}
              </div>
            )}
          </Upload>
        </Col>
        <Col offset={4}>
          <p style={{ fontSize: "15px" }}>Зогсоолын ерөнхий зураглал</p>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={onChangeMainImage}
          >
            {selectedDirectionImage ? (
              <img
                src={selectedDirectionImage}
                alt="avatar"
                style={{ width: "100%", height: "250px" }}
              />
            ) : (
              <div>
                {loadingNumbering ? (
                  <Spin indicator={LoadIcon} tip="зургийг хуулж байна." />
                ) : (
                  <PlusOutlined
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                      backgroundColor: "blue",
                      color: "white",
                      height: "20px",
                      width: "20px",
                      borderRadius: "10px",
                    }}
                  />
                )}
              </div>
            )}
          </Upload>
        </Col>
      </Row>
    </div>
  );
};
export default mainImage;
