
// const Test = () =>{

//   return <div>

//   </div>;
// };
// export default Test;

import {Tabs} from 'antd';
import Footer from '../../components/Footer';
// import InforNavbar from '../../components/InfoNavbar/InforNavbar';
import {Image} from 'antd';
import Context from '@context/Context';
import {useRouter} from 'next/router';
import {useEffect, useState, useContext} from 'react';
import {callGet} from '@api/api';

import {auto} from 'async';


const News = () => {
  const [data, setdata] = useState(null);
  // const [data2, setdata2] = useState(null);
  const {TabPane} = Tabs;

  const router = useRouter();

  const ctx = useContext(Context);

  const fetchData = async () => {
    ctx.setIsLoading(true);
    await callGet('/news/list/app/test', null).then((res) => {
      if (res && res.length > 0) {
        setdata(res);
        console.log(res, 'news iin res');
      }
      ctx.setIsLoading(false);
    });
  };
  // console.log(data, "dataa");

  const newsDetails = (id) => {
    id &&
      router.push({
        pathname: `news/${id}`,
        query: {
          id: id,
        },
      });
  };

  // useEffect(() => {
  //   console.log('sss');
  //   console.log(data2);
  // }, [data2]);
  useEffect(() => {
    fetchData();
  }, []);

  return (

    <div className=" relative">
      <p className="absolute right-[2%] text-[blue]">10/19/2020, <b>Даваа гариг</b></p>
      <div className="ml-[100px] newsNavbar">
        <Tabs defaultActiveKey="1" >
          <TabPane tab="ШИНЭ МЭДЭЭ" key="1">
            <div className="grid grid-cols-3 gap-5">
              {data &&
          data.map((item, index) => (

            <div
              key={index}
              onClick={() => newsDetails(item.id)}
              className="relative"

            >
              <p

                className="bg-[#0013D4] w-[135px] text-white h-[18px] absolute z-50 self-end items-stretch right-1 top-[10px]"
              >
                {item.createdDate}
              </p>
              <p
                style={{
                  position: 'absolute',
                  left: '8px',
                  top: '10px',
                  zIndex: '2',
                  color: 'white',
                }}
              >
                <Image preview= {false} src="/eye-24.png " />
              </p>
              <p
                style={{
                  position: 'absolute',
                  left: '30px',
                  top: '12px',
                  zIndex: '2',
                  color: 'white',
                  fontSize: '10px',
                  fontStyle: 'italic',

                }}
              >
                11200
              </p>

              <p
                style={{
                  position: 'absolute',
                  left: '62px',
                  top: '10px',
                  zIndex: '2',
                  color: 'white',


                }}
              >
                <Image preview= {false} src="/heart.png " />
              </p>


              <div


                style={{

                  backgroundColor: 'rgba(0, 0,0,0.5)',
                  height: '60px',
                  position: 'absolute',
                  zIndex: '2',
                  width: '100%',
                  bottom: '6px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '18px',
                }}
              >
                <p style={{marginLeft: '24px', marginTop: '12px'}}> {item.title}</p>

              </div>

              <Image
                alt="img"
                preview={false}

                height={auto}
                src={'https://uparking.mn' + item.image}
              />

            </div>


          )) }
            </div>

          </TabPane>
          <TabPane tab="КОМПАНИЙН МЭДЭЭ" key="2">
          КОМПАНИЙН МЭДЭЭ
          </TabPane>
          <TabPane tab="ЗӨВӨЛГӨӨ" key="3">
          ЗӨВӨЛГӨӨ
          </TabPane>
          <TabPane tab="АВТОМАШИН" key="4">
          АВТОМАШИН
          </TabPane>
          <TabPane tab="АВТОЗОГСООЛ" key="5">
          АВТОЗОГСООЛ
          </TabPane>
          <TabPane tab="УРАМШУУЛАЛ" key="6">
          УРАМШУУЛАЛ
          </TabPane>
          <TabPane tab="БУСАД МЭДЭЭ" key="7">
          БУСАД МЭДЭЭ
          </TabPane>

        </Tabs>
      </div>


      {/* <InforNavbar onClick2={(e) =>setdata2(e)}/> */}

      <Footer />
    </div>

  );
};

export default News;


{/* ////////////////////////////////////////////////// */}


{/* /////////////////////// */}

{/* <div className="mt-8">

      </div>
      <div className="px-36">
        <div className="grid lg:grid-cols-2">
          <div>
            <div
              className={'Information grid-cols-1 mt-8 flex justify-between'}
            >
              <div className="flex mt-2">
                <img
                  src="/eye-24.png "
                  className="ml-4"
                  style={{
                    height: '30px',
                    width: '30px',
                  }}
                ></img>
                <img
                  src="../heart.png "
                  className="ml-2 "
                  style={{
                    height: '30px',
                    width: '30px',
                  }}
                ></img>
              </div>
              <div
                className=" w-32 h-6 mt-2"
                style={{backgroundColor: 'blue', color: 'white'}}
              >
                2020/06/05 12:40
              </div>
            </div>
            <div
              style={{
                backgroundColor: 'black',
                opacity: '0.6',
                color: 'white',
                fontSize: '25px',
              }}
              className="grid justify-items-end -mt-20 pt-1 "
            >
              <span className="text-gray-300" style={{marginRight: '8px'}}>
                Авто зогсооолын
              </span>
              <p style={{color: 'white', opacity: '1', marginRight: '8px'}}>
                <b>Шинэ ЭРИН</b>
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 bg-blue-300 md ml-4 mt-8 ">
            <div>
              <div className={`grid-cols-1 Information1 flex justify-between`}>
                <div className="flex  mt-2">
                  <img
                    src="/eye-24.png "
                    className="ml-4"
                    style={{
                      height: '30px',
                      width: '30px',
                    }}
                  ></img>
                  <span style={{color: 'white', marginTop: '3px'}}>
                    11,200
                  </span>
                  <img
                    src="/heart.png "
                    className="ml-2 "
                    style={{
                      height: '30px',
                      width: '30px',
                    }}
                  ></img>
                </div>
                <div
                  className=" w-32 h-6 mt-2"
                  style={{backgroundColor: 'blue', color: 'white'}}
                >
                  2020/06/05 12:40
                </div>
              </div>
              <div
                style={{
                  backgroundColor: 'black',
                  opacity: '0.6',
                  color: 'white',
                  fontSize: '25px',
                }}
                className="grid justify-items-end -mt-20 pt-1 "
              >
                <span className="text-gray-300" style={{marginRight: '8px'}}>
                  Авто зогсооолын
                </span>{' '}
                <p style={{color: 'white', opacity: '1', marginRight: '8px'}}>
                  <b>Шинэ ЭРИН</b>
                </p>
              </div>
            </div>
            <div>
              <div
                className={'grid-cols-1 Information2 flex justify-between lg:mt-0 sm:mt-8 ml-4'}
              >
                <div className="flex mt-2">
                  <img
                    src="/eye-24.png "
                    className="ml-4"
                    style={{
                      height: '30px',
                      width: '30px',
                    }}
                  ></img>
                  <span style={{color: 'white', marginTop: '3px'}}></span>
                  <img
                    src="/heart.png "
                    className="ml-2 "
                    style={{
                      height: '30px',
                      width: '30px',
                    }}
                  ></img>
                </div>
                <div
                  className=" w-32 h-6 mt-2"
                  style={{backgroundColor: 'blue', color: 'white'}}
                >
                  2020/06/05 12:40
                </div>
              </div>
              <div
                style={{
                  backgroundColor: 'black',
                  opacity: '0.6',
                  color: 'white',
                  fontSize: '25px',
                }}
                className="grid justify-items-end -mt-20 pt-1 ml-4"
              >
                <span className="text-gray-300" style={{marginRight: '8px'}}>
                  Авто зогсооолын
                </span>{' '}
                <p style={{color: 'white', opacity: '1', marginRight: '8px'}}>
                  <b>Шинэ ЭРИН</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1">
          <div className="grid lg:grid-cols-2 bg-blue-300 md: ml-4 mt-8 lg:ml-0">
            <div>
              <div className={`grid-cols-1 Information3 flex justify-between`}>
                <div className="flex mt-2">
                  <img
                    src="/eye-24.png "
                    className="ml-4"
                    style={{
                      height: '30px',
                      width: '30px',
                    }}
                  ></img>
                  <span style={{color: 'white', marginTop: '3px'}}>
                    11,200
                  </span>
                  <img
                    src="/heart.png "
                    className="ml-2 "
                    style={{
                      height: '30px',
                      width: '30px',
                    }}
                  ></img>
                </div>
                <div
                  className=" w-32 h-6 mt-2"
                  style={{backgroundColor: 'blue', color: 'white'}}
                >
                  2020/06/05 12:40
                </div>
              </div>
              <div
                style={{
                  backgroundColor: 'black',
                  opacity: '0.6',
                  color: 'white',
                  fontSize: '25px',
                }}
                className="grid justify-items-end -mt-20 pt-1 "
              >
                <span className="text-gray-300" style={{marginRight: '8px'}}>
                  Авто зогсооолын
                </span>{' '}
                <p style={{color: 'white', opacity: '1', marginRight: '8px'}}>
                  <b>Шинэ ЭРИН</b>
                </p>
              </div>
            </div>
            <div>
              <div
                className={'grid-cols-1 Information4 flex justify-between lg:mt-0 sm:mt-8 ml-4'}
              >
                <div className="flex mt-2">
                  <img
                    src="/eye-24.png "
                    className="ml-4"
                    style={{
                      height: '30px',
                      width: '30px',
                    }}
                  ></img>
                  <span style={{color: 'white', marginTop: '3px'}}></span>
                  <img
                    src="/heart.png "
                    className="ml-2 "
                    style={{
                      height: '30px',
                      width: '30px',
                    }}
                  ></img>
                </div>
                <div
                  className=" w-32 h-6 mt-2"
                  style={{backgroundColor: 'blue', color: 'white'}}
                >
                  2020/06/05 12:40
                </div>
              </div>
              <div
                style={{
                  backgroundColor: 'black',
                  opacity: '0.6',
                  color: 'white',
                  fontSize: '25px',
                }}
                className="grid justify-items-end -mt-20 pt-1 ml-4 "
              >
                <span className="text-gray-300" style={{marginRight: '8px'}}>
                  Авто зогсооолын
                </span>{' '}
                <p style={{color: 'white', opacity: '1', marginRight: '8px'}}>
                  <b>Шинэ ЭРИН</b>
                </p>
              </div>
            </div>
          </div>
          <div>
            <div
              className={'grid-cols-1 Information6 ml-4 lg:-mt-16 flex justify-between sm: mt-4'}
            >
              <div className="flex mt-2">
                <img
                  src="/eye-24.png "
                  className="ml-4"
                  style={{
                    height: '30px',
                    width: '30px',
                  }}
                ></img>
                <img
                  src="/heart.png "
                  className="ml-2 "
                  style={{
                    height: '30px',
                    width: '30px',
                  }}
                ></img>
              </div>
              <div
                className=" w-32 h-6 mt-2"
                style={{backgroundColor: 'blue', color: 'white'}}
              >
                2020/06/05 12:40
              </div>
            </div>
            <div
              style={{
                backgroundColor: 'black',
                opacity: '0.6',
                color: 'white',
                fontSize: '25px',
              }}
              className="grid justify-items-end -mt-20 pt-1 ml-4 "
            >
              <span className="text-gray-300" style={{marginRight: '8px'}}>
                Авто зогсооолын
              </span>{' '}
              <p style={{color: 'white', opacity: '1', marginRight: '8px'}}>
                <b>Шинэ ЭРИН</b>
              </p>
            </div>
          </div>
        </div>
      </div> */}
{/* {news.map((item, index) => ({
        if(   =  "0") {
          <div
            className={`${styles.backgroundInformation} ml-16`}
            style={{ background: `url(${item.image})` }}
          ></div>;
        },
      }))}
      <div className="mt-16"> */}


// const news = [
//   {
//     id: 0,
//     head: "Урамшуулал",
//     image: "/news/news-1.png",
//     date: "2020/10/10 12:40",
//     title: "Зогсоолын",
//     titlebold: "Шинэ ЭРИН",
//     desc: "Бүх автозогсоолын таны утсанд. Энэ бол Uparking онлайн автозогсоолын платформ. Хаана ч хэзээ ч өөрт тохирох зогсоолыг түрээслэн өөрийн машинаа байршуулах боломжийг олгож ...",
//   },
//   {
//     id: 1,
//     head: "Зөвөлгөө",
//     image: "/news/news-2.png",
//     date: "2020/12/10 12:40",
//     title: "Хэрхэн",
//     titlebold: "Ашиглэх Вэ ?",
//     desc: "Бүх автозогсоолын таны утсанд. Энэ бол Uparking онлайн автозогсоолын платформ. Хаана ч хэзээ ч өөрт тохирох зогсоолыг түрээслэн өөрийн машинаа байршуулах боломжийг олгож ...",
//   },
//   {
//     id: 2,
//     head: "Компанийн мэдээ",
//     image: "/medee3.png",
//     date: "2020/12/10 12:40",
//     title: "Uparking",
//     titlebold: "Your PARKING ?",
//     desc: "Бүх автозогсоолын таны утсанд. Энэ бол Uparking онлайн автозогсоолын платформ. Хаана ч хэзээ ч өөрт тохирох зогсоолыг түрээслэн өөрийн машинаа байршуулах боломжийг олгож ...",
//   },
//   {
//     id: 3,
//     head: "Компанийн мэдээ",
//     image: "/medee4.png",
//     date: "2020/12/10 12:40",
//     title: "Uparking",
//     titlebold: "Your PARKING ?",
//     desc: "Бүх автозогсоолын таны утсанд. Энэ бол Uparking онлайн автозогсоолын платформ. Хаана ч хэзээ ч өөрт тохирох зогсоолыг түрээслэн өөрийн машинаа байршуулах боломжийг олгож ...",
//   },
//   {
//     id: 4,
//     head: "Компанийн мэдээ",
//     image: "/medee6.png",
//     date: "2020/12/10 12:40",
//     title: "Uparking",
//     titlebold: "Your PARKING ?",
//     desc: "Бүх автозогсоолын таны утсанд. Энэ бол Uparking онлайн автозогсоолын платформ. Хаана ч хэзээ ч өөрт тохирох зогсоолыг түрээслэн өөрийн машинаа байршуулах боломжийг олгож ...",
//   },
//   {
//     id: 5,
//     head: "Компанийн мэдээ",
//     image: "/medee7.png",
//     date: "2020/12/10 12:40",
//     title: "Uparking",
//     titlebold: "Your PARKING ?",
//     desc: "Бүх автозогсоолын таны утсанд. Энэ бол Uparking онлайн автозогсоолын платформ. Хаана ч хэзээ ч өөрт тохирох зогсоолыг түрээслэн өөрийн машинаа байршуулах боломжийг олгож ...",
//   },
// ];
