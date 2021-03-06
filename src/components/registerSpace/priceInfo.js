import {callGet} from '@api/api';
import Context from '@context/Context';
import {Row, Col} from 'antd';
import Helper from '@utils/helper';
import {Form, Input, Divider} from 'antd';
import {useEffect, useState, useContext} from 'react';

const priceInfo = (props) => {
  const ctx = useContext(Context);
  const [dayWinterValue, setdayWinterValue] = useState(null);
  const [daySummerValue, setdaySummerValue] = useState(null);
  const [nightWinterValue, setnightWinterValue] = useState(null);
  const [nightSummerValue, setnightSummerValue] = useState(null);
  const [fullDayWinterValue, setfullDayWinterValue] = useState(null);
  const [fullDaySummerValue, setfullDaySummerValue] = useState(null);
  const [hourlyPrice, sethourlyPrice] = useState(null);
  const [priceData, setPriceData] = useState();
  var summerPrice = {};
  var winterPrice = {};
  // const [realData, setRealData] = useState();
  // const [realData2, setRealData2] = useState();

  useEffect(async () => {
    ctx.setIsLoading(true);
    const bigData = await callGet('/parkingspace/timesplit');
    setPriceData(bigData);
    const total = bigData.timeSet1.price / bigData.timeSet1.value;
    summerPrice && setdayWinterValue(summerPrice.priceForRenter2);
    winterPrice && setdaySummerValue(winterPrice.priceForRenter2);
    winterPrice && setnightSummerValue(winterPrice.priceForRenter3);
    summerPrice &&  setnightWinterValue(summerPrice.priceForRenter3);
    winterPrice && setfullDaySummerValue(winterPrice.priceForRenter1);
    summerPrice && setfullDayWinterValue(summerPrice.priceForRenter1);
    sethourlyPrice(total.toString());
    ctx.setIsLoading(false);
  }, []);


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
            color: 'blue',
            fontSize: '20px',
            marginTop: '50px',
            marginLeft: '100px',
          }}
        >
          <b> ?????????????????? ?????????? ????????????????</b>
        </p>
      </Row>
      <Form
        labelCol={{span: 10}}
        layout="vertical"
        className={'priceInfo'}
        form={props.form}
        initialValues={{
          remember: true,
        }}
      >
        <Row style={{marginTop: '100px'}}>
          <Col offset={4} span={6} style={{width: '375px'}}>
            <Row>
              <b style={{color: '#A2A4AA'}}>
              ???????????? ???????????? ?????????????????? ??????</b>
              <p style={{color: 'blue'}}>
                |
                {priceData ? (
                  <b>
                    {' '}
                    {priceData.daySplit.start} - {priceData.daySplit.end}
                  </b>
                ) : null}
                |
              </p>
            </Row>
            <Row style={{fontSize: '14px', color: 'gray', marginTop: '23px'}}>
              ???????? |{' '}
              {priceData ? (
                <>
                  {priceData.daySplit.winterStart} -{' '}
                  {priceData.daySplit.winterEnd}
                </>
              ) : null}
            </Row>
            <Form.Item
              name="daySplitWinterPrice"
              style={{marginTop: '10px'}}
              rules={[
                {
                  required: true,
                  message: '???????????? ???????????? ?????????????????? ???????????? ?????????????? ?????',
                },
              ]}
            >
              <Input
                style={{fontSize: '16px'}}
                type="text"
               
                onChange={(e) => setdayWinterValue(Number(e.target.value))}
              />
            </Form.Item>
            <Divider />
            <Row
              style={{fontSize: '14px', color: 'gray', marginTop: '20px'}}
            >
              ?????? |{' '}
              {priceData ? (
                <>
                  {' '}
                  {priceData.daySplit.summerStart} -
                  {priceData.daySplit.summerEnd}
                </>
              ) : null}
            </Row>
            <Form.Item
              name="daySplitSummerPrice"
              style={{marginTop: '10px'}}
              rules={[
                {
                  required: true,
                  message: '???????????? ???????????? ?????????????????? ???????????? ?????????????? ?????',
                },
              ]}
            >
              <Input
                style={{fontSize: '16px'}}
                type="text"
                
                onChange={(e) => setdaySummerValue(Number(e.target.value))}
              ></Input>
            </Form.Item>
            <Divider />
            <Row style={{marginTop: '20px'}}>
              <b style={{color: '#A2A4AA'}}>
              ???????????? ???????????? ?????????????????? ??????</b>
              <p style={{color: 'blue'}}>
                {priceData ? (
                  <b>
                    | {priceData.nightSplit.start} - {priceData.nightSplit.end}
                  </b>
                ) : null}
              </p>
            </Row>
            <Row style={{fontSize: '14px', color: 'gray', marginTop: '20px'}}>
              ????????|
              {priceData ? (
                <>
                  {' '}
                  {priceData.nightSplit.winterStart} -
                  {priceData.nightSplit.winterEnd}
                </>
              ) : null}
            </Row>
            <Form.Item
              style={{marginTop: '10px'}}
              name="nightSplitWinterPrice"
              rules={[
                {
                  required: true,
                  message: '???????????? ???????????? ?????????????????? ???????????? ?????????????? ?????',
                },
              ]}
            >
              <Input
                style={{fontSize: '16px'}}
                type="text"
                onChange={(e) => setnightWinterValue(Number(e.target.value))}
              ></Input>
            </Form.Item>
            <Divider />
            <Row style={{fontSize: '14px', color: 'gray', marginTop: '20px'}}>
              ??????|
              {priceData ? (
                <>
                  {' '}
                  {priceData.nightSplit.summerStart} -
                  {priceData.nightSplit.summerEnd}
                </>
              ) : null}
            </Row>
            <Form.Item
              style={{marginTop: '10px'}}
              name="nightSplitSummerPrice"
              rules={[
                {
                  required: true,
                  message: '???????????? ???????????? ?????????????????? ???????????? ?????????????? ?????',
                },
              ]}
            >
              <Input
                style={{fontSize: '16px'}}
                type="text"
                onChange={(e) => setnightSummerValue(Number(e.target.value))}
              ></Input>
            </Form.Item>
            <Divider />
          </Col>
          <Col offset={4} span={6}>
            <Row>
              <b style={{color: '#A2A4AA'}}>
              ?????????? ???????????? ?????????????????? ??????</b>
              <p style={{color: 'blue'}}>
                <b>|24 ??????|</b>
              </p>
            </Row>
            <Row style={{fontSize: '14px', color: 'gray', marginTop: '20px'}}>
              ????????|
              {priceData ? (
                <>
                  {priceData.fullDaySplit.winterStart} -
                  {priceData.fullDaySplit.winterEnd}
                </>
              ) : null}
            </Row>
            <Form.Item
              name="fullDaySplitWinterPrice"
              style={{marginTop: '10px'}}
              rules={[
                {
                  required: true,
                  message: '?????????? ???????????? ?????????????????? ???????????? ?????????????? ?????',
                },
              ]}
            >
              <Input
                style={{fontSize: '16px'}}
                type="text"
                onChange={(e) => setfullDayWinterValue(Number(e.target.value))}
              ></Input>
            </Form.Item>
            <Divider />
            <Row style={{fontSize: '14px', color: 'gray', marginTop: '20px'}}>
              ??????|{' '}
              {priceData ? (
                <>
                  {priceData.fullDaySplit.summerStart} -
                  {priceData.fullDaySplit.summerEnd}
                </>
              ) : null}
            </Row>
            <Form.Item
              style={{marginTop: '10px'}}
              name="fullDaySplitSummerPrice"
              rules={[
                {
                  required: true,
                  message: '?????????? ???????????? ?????????????????? ???????????? ?????????????? ?????',
                },
              ]}
            >
              <Input
                style={{fontSize: '16px'}}
                type="text"
                onChange={(e) => setfullDaySummerValue(Number(e.target.value))}
              ></Input>
            </Form.Item>
            <Divider />
            <Row style={{marginTop: '20px'}}>
              <b style={{color: '#A2A4AA'}}>
              ???????????? ?????????????????? ??????</b>
              <p style={{color: 'blue'}}>
                <b>|1 ??????|</b>
              </p>
            </Row>
            <Row style={{fontSize: '14px', color: 'gray', marginTop: '20px'}}>
              1 ?????? ??????????????????
            </Row>
            <Form.Item
              style={{marginTop: '10px'}}
              name="hourlyPrice"
              rules={[
                {
                  required: true,
                  message: '1 ???????????? ?????????????????? ???????????? ?????????????? ?????',
                },
              ]}
            >
              <Input
                style={{fontSize: '16px'}}
                type="text"
                
                onChange={(value) => sethourlyPrice(Number(value.target.value))}
              ></Input>
            </Form.Item>
            <Divider />
            <Row style={{marginTop: '20px'}}>
              <Col span={6} offset={2}>
                <p style={{fontSize: '12px', color: '#35446D'}}>
                  ???????? 1 | {priceData ? priceData.timeSet1.description : null}|
                </p>
                <p style={{marginLeft: '20%', fontSize: '16px'}}>
                  {hourlyPrice ?
                    Helper.formatValueReverse(
                      hourlyPrice * priceData.timeSet1.value,
                    ) + '???' :
                    null}
                </p>
              </Col>
              <Col span={6} offset={2}>
                <p style={{fontSize: '12px', color: '#35446D'}}>
                  ???????? 2 | {priceData ? priceData.timeSet2.description : null} |
                </p>
                <p style={{marginLeft: '20%', fontSize: '16px', fontFamily: 'Helvetica'}}>
                  {hourlyPrice ?
                    Helper.formatValueReverse(
                      hourlyPrice * priceData.timeSet2.value,
                    ) + '???' :
                    null}
                </p>
              </Col>
              <Col span={6} offset={2}>
                <p style={{fontSize: '12px', color: '#35446D', fontWeight: '400'}}>
                  ???????? 3 | {priceData ? priceData.timeSet3.description : null}|
                </p>
                <p style={{marginLeft: '20%', fontSize: '16px'}}>
                  {hourlyPrice ?
                    Helper.formatValueReverse(
                      hourlyPrice * priceData.timeSet3.value,
                    ) + '???' :
                    null}
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
