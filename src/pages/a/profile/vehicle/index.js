import React from "react";
import { apiList, callGet, callPost } from "@api/api";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Fragment, useEffect, useState } from "react";

import Link from "next/link";

export default function vehicle() {
  const [formData, setFormdata] = useState({});
  const [dugaar, setDugaar] = useState();
  const [uildwer, setUildwer] = useState([]);
  const [selectedUildwer, setSelectedUildwer] = useState({});
  const [zagwar, setZagwar] = useState([]);
  const [rfId, setRfId] = useState();
  const [color, setColor] = useState([]);
  const [selectedZagwar, setSelectedZagwar] = useState({});
  const [selectedColor, setSelectedColor] = useState({});

  useEffect(async () => {
    const uildwer = await callGet("/user/vehicle/maker");
    setSelectedUildwer(uildwer);
    setUildwer(uildwer);
    const color = await callGet("/user/vehicle/color");
    setColor(color);
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join("  ");
  }
  const onSaved = () => {
    console.log(formData);
    const res = callPost("/user/vehicle", formData);
    console.log("success", res);
  };

  useEffect(async () => {
    const zagwar = await callGet(
      `/user/vehicle/model?maker=${selectedUildwer.label}`
    );
    setZagwar(zagwar);
  }, [selectedUildwer]);

  const onChangeUildver = (e) => {
    const uildver = uildwer.find(
      (item) => item.value === Number(e.target.value)
    );
    setSelectedUildwer(uildver);
    setFormdata({ ...formData, maker: uildver.value });
  };
  const onChangeZagwar = (e) => {
    const selectZagwar = zagwar.find(
      (item) => item.value === Number(e.target.value)
    );
    setSelectedZagwar(selectZagwar);
    setFormdata({ ...formData, model: selectZagwar.value });
  };
  const onChangeDugaar = (e) => {
    const dugar = e.target.value;
    setDugaar(dugar);
    setFormdata({ ...formData, vehicleNumber: dugar });
  };
  const onChangeColor = (e) => {
    const selectColor = color.find(
      (item) => item.value === Number(e.target.value)
    );
    setSelectedColor(selectColor);
    setFormdata({ ...formData, color: selectColor.value });
  };
  const onChangeRfId = (e) => {
    const id = e.target.value;
    setRfId(id);
    setFormdata({ ...formData, rfid: id });
  };

  return (
    <div>
      {console.log()}
      <div
        className="h-16 md:w-96 lg:w-96 ml-32 w-96 text-xl pl-4 pt-4 grid justify-items-center"
        style={{
          backgroundColor: "blue",
          borderRadius: "0px 0px 20px 20px",
          color: "white",
        }}
      >
        <b>Тээврийн хэрэгсэл бүртгүүлэх</b>
      </div>
      <div
        style={{ color: "blue" }}
        className="lg:ml-32 sm:ml-16 lg:mt-8 ml-32 mt-8 text-xl"
      >
        <b>Тээврийн - мэдээлэл</b>
      </div>
      <p
        className="lg:ml-32 sm:ml-12  ml-24  text-sm"
        style={{ color: "grey" }}
      >
        Тухайн хэсэгт зогсоолын байрлал, дугаарлалт харагдаж буй зураг хийхгүй
      </p>
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 grid-cols-1  w-2/5 lg:ml-32 sm:ml-16 ml-24 mt-16 ">
        <div className=" grid-cols-1">
          <div className="">
            <div className="text-sm  mt-8" style={{ color: "#D6DBD8" }}>
              Улсын дугаар *
            </div>
            <input
              type="text"
              onChange={onChangeDugaar}
              className="w-full"
              style={{ borderBottom: "1px solid black" }}
            ></input>
          </div>
          <div>
            <div className="text-sm  mt-8" style={{ color: "#D6DBD8" }}>
              Үйлдвэр *
            </div>
            <select
              className="relative w-full   pr-10 py-1 text-left cursor-default focus:outline-none sm:text-sm "
              onChange={onChangeUildver}
              style={{ borderBottom: "1px solid black" }}
            >
              {uildwer.map((item) => (
                <option className="py-1" key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="text-sm  mt-8" style={{ color: "#D6DBD8" }}>
              Загвар *
            </div>
            <select
              className="relative w-full   pr-10 py-1 text-left cursor-default focus:outline-none sm:text-sm "
              onChange={onChangeZagwar}
              style={{ borderBottom: "1px solid black" }}
            >
              {zagwar.map((item) => (
                <option className="py-1" key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="text-sm  mt-8" style={{ color: "#D6DBD8" }}>
              Өнгө
            </div>
            <select
              className="relative w-full   pr-10 py-1 text-left cursor-default focus:outline-none sm:text-sm"
              onChange={onChangeColor}
            >
              {color.map((item, index) => (
                <option className="py-1" key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="text-sm  mt-8" style={{ color: "#D6DBD8" }}>
              rfId *
            </div>
            <input
              type="text"
              onChange={onChangeRfId}
              className="w-full"
              style={{ borderBottom: "1px solid black" }}
            ></input>
          </div>
        </div>
        <div className=" grid-cols-1 lg:ml-24 sm:ml-16 sm:mt-8 mt-8 md:ml-24 ">
          <div
            className="flex w-96 rounded-lg h-auto  "
            style={{ border: "2px solid yellow" }}
          >
            <div className="w-1/3 grid flex items-center justify-center... ml-4">
              <img src="/info_outline_24px.png"></img>
            </div>
            <div
              className="ml-4 text-justify text-base mr-4  py-3"
              style={{ color: "#ffeb3b" }}
            >
              Түрээслэгдсэн зогсоолыг тээврийн хэрэгслийн мэдээлэлтэй тулган
              шалгах тохиолдолд байдаг тул Та тээврийн хэрэгслийн мэдээллийг
              үнэн зөв оруулна уу!{" "}
            </div>
          </div>
        </div>
      </div>
      <div className=" grid lg:grid-cols-2 grid-cols-2 lg:ml-32 lg:mt-32 mb-8 mr-4 sm:mt-8 sm:ml-16 ml-16 mt-32 sm:mr-8 mr-8 md:">
        <div className="grid-cols-1 cursor-pointer ">
          <Link href="/nemelt">
            <img src="/Container.png" />
          </Link>
        </div>
        <div className="grid-cols-1 grid justify-items-end lg:mr-32 cursor-pointer ">
          <Link href="/a/profile/optional">
            <div
              className={`border rounded lg:w-1/4 sm:w-2/4 md:w-2/4 buttonGo flex px-3 py-3`}
            >
              <button
                style={{ paddingLeft: "10px", color: "white" }}
                onClick={onSaved}
              >
                Хадгалах
              </button>
              <div className="ml-4 pt-1">
                <img src="/arrow_forward_24px.png" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
