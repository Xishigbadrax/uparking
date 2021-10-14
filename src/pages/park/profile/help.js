import {useState, useEffect, useContext} from 'react';
import {callGet} from '@api/api';
import ProfileLayout from '@components/layouts/ProfileLayout';
import {Tabs, Row, Col, Divider, Collapse} from 'antd';
import Context from '@context/Context';
import YouTube from 'react-youtube';

const Help = () => {
  const {TabPane} = Tabs;
  const {Panel} = Collapse;
  const [data, setdata] = useState(null);
  const [data2, setdata2] = useState(null);
  const ctx = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      ctx.setIsLoading(true);
      await callGet('/help/video', null).then((res) => {
        setdata(res);
      });
      await callGet('/help/faq', null).then((res) => {
        setdata2(res);
      });
      ctx.setIsLoading(false);
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, []);

  //   const fetchData = async () => {
  //     ctx.setIsLoading(true);
  //     await callGet(`/help/faq`, null).then((res) => {
  //       setdata2(res);
  //     });
  //     ctx.setIsLoading(false);
  //   };
  //   useEffect(() => {
  //     fetchData();
  //   }, [])

  return (
    <ProfileLayout>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Видео заавар" key="1">
          {data != null ?
            data.map((item, index) => {
              return (
                <div key={index}>
                  <Divider styles={divider} orientation="left">
                    {item.category}
                  </Divider>{' '}
                  <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    {item.videoList.map((video, i) => {
                      return (
                        <Col
                          key={i}
                          // onClick={() => window.open(video.url, "_blank")}
                          className="gutter-row"
                          style={styles}
                          span={6}
                        >
                          <div>
                            <div
                              style={{
                                height: '44px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                              }}
                            >
                              {video.title}
                            </div>
                            <YouTube
                              videoId={video.url.split('=')[1]}
                              opts={opts}
                            />
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              );
            }) :
            null}
        </TabPane>
        <TabPane tab="Түгээмэл асуулт" key="2">
          <Collapse expandIconPosition="right" ghost accordion>
            {data2 != null ?
              data2.map((item, index) => {
                return (
                  <Panel header={item.question} key={index}>
                    <p>{item.answer}</p>
                  </Panel>
                );
              }) :
              null}
          </Collapse>
        </TabPane>
      </Tabs>
    </ProfileLayout>
  );
};

const styles = {
  //   height: "180px",
  width: '180px',
};
const divider = {
  margin: '5px',
};

const opts = {
  height: '194',
  width: '194',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

export default Help;
