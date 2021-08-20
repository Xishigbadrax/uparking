import { callGet } from "@api/api";

import { Row, Col } from "antd";
import Helper from "@utils/helper";
import { Form, Input, Label, Divider } from "antd";
import { useEffect, useState } from "react";

const priceInfo = (props) => {
  const [rentInfoData, setRentInfoData] = useState();
  const [rentInfo, setRentInfo] = useState();
  const [dayWinterValue, setdayWinterValue] = useState(null);
  const [daySummerValue, setdaySummerValue] = useState(null);
  const [nightWinterValue, setnightWinterValue] = useState(null);
  const [nightSummerValue, setnightSummerValue] = useState(null);
  const [fullDayWinterValue, setfullDayWinterValue] = useState(null);
  const [fullDaySummerValue, setfullDaySummerValue] = useState(null);
  const [hourlyPrice, sethourlyPrice] = useState(null);
  const [priceData, setPriceData] = useState();

  const onChangeDayofWinterPrice = (e) => {};
  const onChangeDayofSummerPrice = (e) => {
    setRentInfoData({});
  };
  const onChangeNightofWInterPrice = (e) => {};
  const onChangeNightofSummerPrice = (e) => {};
  const onChangeWinterDay = (e) => {};
  const onChangeSummerDay = (e) => {
    console.log(rentInfoData);
  };
  useEffect(async () => {
    const bigData = await callGet(`/parkingspace/timesplit`);
    console.log(bigData);
    setPriceData(bigData);
    let total = bigData.timeSet1.price / bigData.timeSet1.value;
    setdayWinterValue(bigData.daySplit.winterPrice);
    setdaySummerValue(bigData.daySplit.summerPrice);
    setnightSummerValue(bigData.nightSplit.summerPrice);
    setnightWinterValue(bigData.nightSplit.winterPrice);
    setfullDaySummerValue(bigData.fullDaySplit.summerPrice);
    setfullDayWinterValue(bigData.fullDaySplit.winterPrice);
    sethourlyPrice(total.toString());
  }, []);
  const onChangeTimePrice = (e) => {};

  useEffect(() => {
    {
      props.form.setFieldsValue({
        hourlyPrice: hourlyPrice,
      });
    }
  }, [sethourlyPrice]);
  return (
    <div>
      {props.form.setFieldsValue({
        daySplitWinterPrice: dayWinterValue,
        daySplitSummerPrice: daySummerValue,
        nightSplitWinterPrice: nightWinterValue,
        nightSplitSummerPrice: nightSummerValue,
        fullDaySplitWinterPrice: fullDayWinterValue,
        fullDaySplitSummerPrice: fullDaySummerValue,
        hourlyPrice: hourlyPrice,
      })}
      <Row offset={4}>
        <p
          style={{
            color: "blue",
            fontSize: "20px",
            marginTop: "20px",
            marginLeft: "100px",
          }}
        >
          <b> Түрээслэх үнийн мэдээлэл</b>
        </p>
      </Row>
      <Form
        labelCol={{ span: 10 }}
        layout="vertical"
        className={`priceInfo`}
        form={props.form}
        initialValues={{
          remember: true,
        }}
      >
        <Row style={{ marginTop: "30px" }}>
          <Col offset={4} span={6}>
            <Row>
              Өдрийн цагаар түрээслэх үнэ
              <p style={{ color: "blue" }}>
                |
                {priceData ? (
                  <b>
                    {" "}
                    {priceData.daySplit.start} - {priceData.daySplit.end}
                  </b>
                ) : null}
                |
              </p>
            </Row>
            <label style={{ fontSize: "14px", color: "gray" }}>
              Өвөл |{" "}
              {priceData ? (
                <>
                  {priceData.daySplit.winterStart} -{" "}
                  {priceData.daySplit.winterEnd}
                </>
              ) : null}
            </label>
            <Form.Item
              name="daySplitWinterPrice"
              style={{ marginTop: "10px" }}
              rules={[
                {
                  required: true,
                  message: "Өдрийн цагаар түрээслэх дүнгээ оруулна уу?",
                },
              ]}
            >
              <Input
                type="text"
                onChange={(e) => setdayWinterValue(Number(e.target.value))}
              />
            </Form.Item>
            <Divider />
            <label
              style={{ fontSize: "14px", color: "gray", marginTop: "10px" }}
            >
              Зун |{" "}
              {priceData ? (
                <>
                  {" "}
                  {priceData.daySplit.summerStart} -
                  {priceData.daySplit.summerEnd}
                </>
              ) : null}
            </label>
            <Form.Item
              name="daySplitSummerPrice"
              style={{ marginTop: "10px" }}
              rules={[
                {
                  required: true,
                  message: "Өдрийн цагаар түрээслэх дүнгээ оруулна уу?",
                },
              ]}
            >
              <Input
                type="text"
                onChange={(e) => setdaySummerValue(Number(e.target.value))}
              ></Input>
            </Form.Item>
            <Divider />
            <Row style={{ marginTop: "20px" }}>
              Шөнийн цагаар түрээслэх үнэ
              <p style={{ color: "blue" }}>
                {priceData ? (
                  <b>
                    | {priceData.nightSplit.start} - {priceData.nightSplit.end}
                  </b>
                ) : null}
              </p>
            </Row>
            <label style={{ fontSize: "14px", color: "gray" }}>
              Өвөл|
              {priceData ? (
                <>
                  {" "}
                  {priceData.nightSplit.winterStart} -
                  {priceData.nightSplit.winterEnd}
                </>
              ) : null}
            </label>
            <Form.Item
              style={{ marginTop: "10px" }}
              name="nightSplitWinterPrice"
              rules={[
                {
                  required: true,
                  message: "Шөнийн цагаар түрээслэх дүнгээ оруулна уу?",
                },
              ]}
            >
              <Input
                type="text"
                onChange={(e) => setnightWinterValue(Number(e.target.value))}
              ></Input>
            </Form.Item>
            <Divider />
            <label style={{ fontSize: "14px", color: "gray" }}>
              Зун|
              {priceData ? (
                <>
                  {" "}
                  {priceData.nightSplit.summerStart} -
                  {priceData.nightSplit.summerEnd}
                </>
              ) : null}
            </label>
            <Form.Item
              style={{ marginTop: "10px" }}
              name="nightSplitSummerPrice"
              rules={[
                {
                  required: true,
                  message: "Шөнийн цагаар түрээслэх дүнгээ оруулна уу?",
                },
              ]}
            >
              <Input
                type="text"
                onChange={(e) => setnightSummerValue(Number(e.target.value))}
              ></Input>
            </Form.Item>
            <Divider />
          </Col>
          <Col offset={4} span={6}>
            <Row>
              Бүтэн өдрийн түрээслэх үнэ
              <p style={{ color: "blue" }}>
                <b>|24 цаг|</b>
              </p>
            </Row>
            <label style={{ fontSize: "14px", color: "gray" }}>
              Өвөл|
              {priceData ? (
                <>
                  {priceData.fullDaySplit.winterStart} -
                  {priceData.fullDaySplit.winterEnd}
                </>
              ) : null}
            </label>
            <Form.Item
              name="fullDaySplitWinterPrice"
              style={{ marginTop: "10px" }}
              rules={[
                {
                  required: true,
                  message: "Бүтэн өдрийн түрээслэх дүнгээ оруулна уу?",
                },
              ]}
            >
              <Input
                type="text"
                onChange={(e) => setfullDayWinterValue(Number(e.target.value))}
              ></Input>
            </Form.Item>
            <Divider />
            <label style={{ fontSize: "14px", color: "gray" }}>
              Зун|{" "}
              {priceData ? (
                <>
                  {priceData.fullDaySplit.summerStart} -
                  {priceData.fullDaySplit.summerEnd}
                </>
              ) : null}
            </label>
            <Form.Item
              style={{ marginTop: "10px" }}
              name="fullDaySplitSummerPrice"
              rules={[
                {
                  required: true,
                  message: "Бүтэн өдрийн түрээслэх дүнгээ оруулна уу?",
                },
              ]}
            >
              <Input
                type="text"
                onChange={(e) => setfullDaySummerValue(Number(e.target.value))}
              ></Input>
            </Form.Item>
            <Divider />

            <Row>
              Цагийн түрээслэх үнэ
              <p style={{ color: "blue" }}>
                <b>|1 цаг|</b>
              </p>
            </Row>
            <label style={{ fontSize: "14px", color: "gray" }}>
              1 цаг түрээслэх
            </label>
            <Form.Item
              style={{ marginTop: "10px" }}
              name="hourlyPrice"
              rules={[
                {
                  required: true,
                  message: "1 цагаар түрээслэх дүнгээ оруулна уу?",
                },
              ]}
            >
              <Input
                type="text"
                onChange={(value) => sethourlyPrice(Number(value.target.value))}
              ></Input>
            </Form.Item>
            <Divider />
            <Row>
              <Col>
                <p style={{ fontSize: "12px" }}>
                  Багц 1 | {priceData ? priceData.timeSet1.description : null}|
                </p>
                <p>
                  {hourlyPrice
                    ? Helper.formatValueReverse(
                        hourlyPrice * priceData.timeSet1.value
                      ) + "₮"
                    : null}
                </p>
              </Col>
              <Col style={{ marginLeft: "15px" }}>
                <p style={{ fontSize: "12px" }}>
                  Багц 2 | {priceData ? priceData.timeSet2.description : null} |
                </p>
                <p>
                  {hourlyPrice
                    ? Helper.formatValueReverse(
                        hourlyPrice * priceData.timeSet2.value
                      ) + "₮"
                    : null}
                </p>
              </Col>
              <Col style={{ marginLeft: "15px" }}>
                <p style={{ fontSize: "12px" }}>
                  Багц 3 | {priceData ? priceData.timeSet3.description : null}|
                </p>
                <p>
                  {hourlyPrice
                    ? Helper.formatValueReverse(
                        hourlyPrice * priceData.timeSet3.value
                      ) + "₮"
                    : null}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default priceInfo;
