import { Row, Col } from "antd";
import { useState, useEffect } from "react";
const spaceImage = () => {
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
          <b>Түрээслэгчид харагдах зогсоолын зураг</b>
        </p>
      </Row>
      <Row>
        <p style={{ fontSize: "12px", marginLeft: "100px" }}>
          Тухайн зогсоолийн байрлал, дугаарлалт харагдаж буй зогсоолыг олоход
          тохиромжтой олоход тохиромжтой зураг хийнэ.
        </p>
      </Row>
      <Row style={{ marginTop: "50px" }}>
        <Col offset={4}>
          <p style={{ fontSize: "15px" }}>
            Зогсоолын байршилын зураг (хаалга хэсгээс)
          </p>
          <button>
            <div
              style={{
                border: "1px dotted gray",
                borderRadius: "10px",
                height: "200px",
                width: "400px",
                paddingLeft: "50px",
              }}
              className="justify-items-center"
            >
              <img
                style={{ paddingTop: "90px", paddingLeft: "130px" }}
                src="/icons/add_24px.png"
              ></img>
            </div>
          </button>
        </Col>
        <Col offset={4}>
          <p style={{ fontSize: "15px" }}>
            Зогсоолийн эргэх урсгал харагдах зураг
          </p>
          <button>
            <div
              style={{
                border: "1px dotted gray",
                borderRadius: "10px",
                height: "200px",
                width: "400px",
                paddingLeft: "50px",
              }}
            >
              <img
                style={{ paddingTop: "90px", paddingLeft: "130px" }}
                src="/icons/add_24px.png"
              ></img>
            </div>
          </button>
        </Col>
      </Row>
      <Row style={{ marginTop: "50px" }}>
        <Col offset={4}>
          <p style={{ fontSize: "15px" }}>
            Дугаарлалтын харагдах байдлын зураг
          </p>
          <button>
            <div
              style={{
                border: "1px dotted gray",
                borderRadius: "10px",
                height: "200px",
                width: "400px",
                paddingLeft: "50px",
              }}
              className="justify-items-center"
            >
              <img
                style={{ paddingTop: "90px", paddingLeft: "130px" }}
                src="/icons/add_24px.png"
              ></img>
            </div>
          </button>
        </Col>
      </Row>
    </div>
  );
};
export default spaceImage;
