import { useState, useEffect } from "react";
import React from "react";
import ProfileLayout from "@components/layouts/ProfileLayout";
import { apiList, callGet } from "@api/api";
import { Steps } from "antd";
import Link from "next/link";

const { Step } = Steps;

const nemelt = () => {
  const [vehicles, setVehicles] = useState([]);
  useEffect(async () => {
    const data = await callGet("/user/vehicle/list");
    setVehicles(data);
  }, []);
  return (
    <div>
      {console.log(vehicles)}
      <ProfileLayout className="main-content-no-back ">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 md: grid-cols-1 -ml-60">
          <div className="grid-cols-1 mt-32">
            <img src="/Nemelt.png"></img>
          </div>
          <div className="grid-cols-1">
            <div className="lg:grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 grid-cols-1 lg:mt-8 lg:ml-16 w-full">
              <Steps
                size="small"
                style={{ fontSize: "15px", color: "blue" }}
                current={1}
              >
                <Step
                  title="Үндсэн мэдээлэл"
                  style={{ fontSize: "10px", color: "blue" }}
                />
                <Step title="Нэмэлт мэдээлэл" style={{ fontSize: "15px" }} />
              </Steps>
            </div>
            <div className="lg:mt-16 sm:mt-8 mt-8 md:mt-8">
              <div
                className="text-justify-start lg:w-3/5 sm:w-4/5 md:w-4/5"
                style={{ color: "grey" }}
              >
                Та хаана ч хэзээ ч өөрийн зогсоолд тээврийн хэрэгсэлээ
                байршуулахыг хүсэж байвал тээврийн хэрэгслийн бүртгэлээ хийнэ
                үү.
              </div>
              <div style={{ color: "grey" }} className="mt-8">
                <b>Тээврийн хэрэгсэл бүртгүүлэх</b>
              </div>
              {vehicles.map((item) => (
                <div
                  key={item.value}
                  class="mt-4 width-auto  rounded flex shadow-sm"
                  style={{ backgroundColor: "white", width: "325px" }}
                >
                  <div class="mt-4 ml-4">
                    <img src="/directions_car_24px.png"></img>
                  </div>
                  <div class="ml-4">
                    {/* <div class="text-sm">{item.label}</div> */}
                    <div class="text-base" style={{ color: "blue " }}>
                      {item.label}
                    </div>
                  </div>
                  <div class="ml-40 mt-2 ">
                    <Link href={`/teever/edit/${item.id}`}>
                      <img src="/mode_24px.png" />
                    </Link>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <Link href={`/admin/profile/vehicle`}>
                  <button>
                    <img src="/add.png" />
                  </button>
                </Link>
              </div>
              <div
                className="text-justify-start w-3/5 mt-8"
                style={{ color: "#666666" }}
              >
                Та өөрийн зогсоолыг илүү үр ашигтайгаар бусдад хуваалцахыг хүсэж
                байвал авто зогсоолын бүртгэлээ хийнэ үү.
              </div>
              <div style={{ color: "#666666" }}>
                <b>Авто зогсоол бүртгүүлэх</b>
              </div>
              <div className="mt-4">
                <Link href="/zogsool/addZogsool">
                  <button>
                    <img src="/add.png" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className=" grid lg:grid-cols-2 grid-cols-2 lg:ml-16 lg:mt-32 mb-8 mr-4 sm:mt-8 sm:ml-16 ml-16 mt-32 sm:mr-8 mr-8 md:">
          <div className="grid-cols-1 cursor-pointer ">
            <Link href="/nemelt">
              <img src="/Container.png" />
            </Link>
          </div>
          <div className="grid-cols-1 grid justify-items-end lg:mr-32 cursor-pointer">
            <Link href="/admin/profile/nemelt">
              <div
                className={`border rounded lg:w-1/4 sm:w-2/4 md:w-2/4 buttonGo flex px-3 py-3`}
              >
                <button style={{ paddingLeft: "10px", color: "white" }}>
                  Дуусгах
                </button>
                <div className="ml-4 pt-1">
                  <img src="/arrow_forward_24px.png" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </ProfileLayout>
    </div>
  );
};
export default nemelt;
