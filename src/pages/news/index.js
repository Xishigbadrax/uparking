
// const Test = () =>{

//   return <div>

//   </div>;
// };
// export default Test;

import {Tabs, Divider} from 'antd';
import Footer from '../../components/Footer';
// import InforNavbar from '../../components/InfoNavbar/InforNavbar';
// import {Image} from 'antd';
import Image from 'next/image';
import Context from '@context/Context';
import {useRouter} from 'next/router';
import {useEffect, useState, useContext} from 'react';
import {callGet} from '@api/api';
import eye from '../../../public/eye-24.png';
import heart from '../../../public/heart.png';

// import {auto} from 'async';
// import {data} from 'autoprefixer';


const News = () => {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  // const [data3, setData3] = useState(null);
  // const [data4, setData4] = useState(null);
  // const [data5, setData5] = useState(null);
  // const [data6, setData6] = useState(null);
  const {TabPane} = Tabs;

  const router = useRouter();

  const ctx = useContext(Context);
  const myLoader = ({src, width, quality}) => {
    return `https://uparking.mn/${src}?w=${width}&q=${quality || 75}`;
  };

  const fetchData = async () => {
    ctx.setIsLoading(true);
    await callGet('/news/list/app/test', null).then((res) => {
      if (res && res.length > 0) {
        console.log(res, 'news iin res');
        setData1(res[0]);
        setData2(res[1]);
        // setData3(res[2]);
        // setData4(res[3]);
        // setData5(res[4]);
        // setData6(res[5]);
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
    console.log('hewlelee');
    fetchData();
  }, []);

  return (

    <div className=" relative">
      <p className="absolute right-[2%] text-[blue]">10/19/2020, <b>Даваа гариг</b></p>
      <div className="ml-[100px] newsNavbar">
        <Tabs defaultActiveKey="1" >
          <TabPane tab="ШИНЭ МЭДЭЭ" key="1">


            <div className="flex w-full ">
              <div>
                <div onClick={() =>newsDetails(data1.id)} className="w-[542px] h-[360px]  cursor-pointer">
                  <div className=" w-full h-full relative">
                    {data1 && <Image className="object-cover " layout="fill" height="100px" loader={myLoader} src={data1.image} />}
                    {data1 && <p className="absolute text-[white] text-[10px] bg-[#0013D4] right-[0px] top-[10px] pl-[5px] pr-[5px] ">{data1.createdDate}</p>}
                    <div className=" absolute  flex">
                      <div className="flex items-center pl-[5px]">
                        <Image className=" ml-[8px] " src={eye} />
                        <p className=" text-[10px] ml-[3px] text-[white]">11200</p>
                      </div>
                      <div className=" pt-[5px] pl-[3px]">
                        <Image width="16px" height="16px" src={heart} />
                      </div>
                    </div>
                    <div className="w-[542px] h-[80px] bg-black  bg-opacity-[50%] absolute bottom-0">
                      {data1 && <p className="absolute text-[white] text-[24px] right-[24px] top-[16px]">{data1.title}</p>}
                    </div>

                  </div>
                </div>
                <div className="flex mt-[28px] mb-[65px]">
                  <div onClick={() =>newsDetails(data2.id)} className="w-[255px] h-[323px]  mr-[30px] cursor-pointer">
                    <div className="h-full w-full relative">
                      {data2 && <Image className="object-cover" layout="fill" height="100px" loader={myLoader} src={data2.image} />}
                      {data2 && <p className="absolute text-[white] text-[10px] bg-[#0013D4] right-[0px] top-[10px] pl-[5px] pr-[5px] ">{data2.createdDate}</p>}
                      <div className="w-full h-[80px] bg-black  bg-opacity-[50%] absolute bottom-0">
                        {data2 && <p className="absolute text-[white] text-[24px] right-[24px] top-[16px]">{data2.title}</p>}
                      </div>
                    </div>
                  </div>
                  <div onClick={() =>newsDetails(data2.id)} className="w-[255px] h-[323px]  mr-[30px] cursor-pointer">
                    <div className="h-full w-full relative">
                      {data2 && <Image className="object-cover" layout="fill" height="100px" loader={myLoader} src={data2.image} />}
                      {data2 && <p className="absolute text-[white] text-[10px] bg-[#0013D4] right-[0px] top-[10px] pl-[5px] pr-[5px] ">{data2.createdDate}</p>}
                      <div className="w-full h-[80px] bg-black  bg-opacity-[50%] absolute bottom-0">
                        {data2 && <p className="absolute text-[white] text-[24px] right-[24px] top-[16px]">{data2.title}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex mb-[28px]">
                  <div onClick={() =>newsDetails(data2.id)} className="w-[255px] h-[323px]  mr-[30px] cursor-pointer">
                    <div className="h-full w-full relative">
                      {data2 && <Image className="object-cover" layout="fill" height="100px" loader={myLoader} src={data2.image} />}
                      {data2 && <p className="absolute text-[white] text-[10px] bg-[#0013D4] right-[0px] top-[10px] pl-[5px] pr-[5px] ">{data2.createdDate}</p>}
                      <div className="w-full h-[80px] bg-black  bg-opacity-[50%] absolute bottom-0">
                        {data2 && <p className="absolute text-[white] text-[24px] right-[24px] top-[16px]">{data2.title}</p>}
                      </div>
                    </div></div>
                  <div onClick={() =>newsDetails(data2.id)} className="w-[255px] h-[323px] cursor-pointer">
                    <div className="h-full w-full relative">
                      {data2 && <Image className="object-cover" layout="fill" height="100px" loader={myLoader} src={data2.image} />}
                      {data2 && <p className="absolute text-[white] text-[10px] bg-[#0013D4] right-[0px] top-[10px] pl-[5px] pr-[5px] ">{data2.createdDate}</p>}
                      <div className="w-full h-[80px] bg-black bg-opacity-[50%] absolute bottom-0">
                        {data2 && <p className="absolute text-[white] text-[24px] right-[24px] top-[16px]">{data2.title}</p>}
                      </div>
                    </div></div>
                </div>
                <div onClick={() =>newsDetails(data2.id)} className="w-full h-[360px]  cursor-pointer">
                  <div className="h-full w-full relative">
                    {data2 && <Image className="object-cover" layout="fill" height="100px" loader={myLoader} src={data2.image} />}
                    {data2 && <p className="absolute text-[white] text-[10px] bg-[#0013D4] right-[0px] top-[10px] pl-[5px] pr-[5px] ">{data2.createdDate}</p>}
                    <div className="w-full h-[80px] bg-black  bg-opacity-[50%] absolute bottom-0">
                      {data2 && <p className="absolute text-[white] text-[24px] right-[24px] top-[16px]">{data2.title}</p>}
                    </div>
                  </div></div>
              </div>
            </div>

          </TabPane>
          <TabPane tab="КОМПАНИЙН МЭДЭЭ" key="2">
            <div className="mr-4 mb-[71px]">
              <div>
                <div onClick={() =>newsDetails(data2.id)} className=" bg-red-500 w-full h-[500px] relative cursor-pointer">
                  {data2 && <Image className="object-cover" layout="fill" height="100px" loader={myLoader} src={data2.image} />}
                  {data2 && <p className="absolute text-[white] text-[10px] bg-[#0013D4] right-[0px] top-[10px] pl-[5px] pr-[5px] ">{data2.createdDate}</p>}

                  <div className="w-[300px] h-[80px] bg-black  bg-opacity-[50%] absolute bottom-[150px] right-0">
                    {data2 && <p className="absolute text-[white]  text-[24px] right-[24px] top-[16px]">{data2.title}</p>}
                  </div>

                </div>
                <div onClick={() =>newsDetails(data2.id)} className="flex justify-between mt-[10px] cursor-pointer">
                  <div className="w-[256px] h-[308px] ">
                    {data2 && <Image className="bg-green-400" width="256px" height="166px" loader={myLoader} src={data2.image} />}
                    {data2 && <p className=" text-[white] text-[10px] bg-[#0013D4] pl-[5px] pr-[5px] w-[110px] ">{data2.createdDate}</p>}
                    {
                      data2 && <p className=" text-[#35446D]  text-[24px] ">{data2.title}</p>}
                    { data2 && <p className="text-[8px] text-[#647189]">Бүх автозогсоолын таны утсанд. Энэ бол  Uparking онлайн автозогсоолын платформ. Хаана ч хэзээ ч өөрт тохирох зогсоолыг түрээслэн өөрийн машинаа байршуулах боломжийг олгож ...</p>}


                  </div>
                  <div onClick={() =>newsDetails(data2.id)} className="w-[256px] h-[308px] cursor-pointer ">
                    {data2 && <Image className="bg-green-400" width="256px" height="166px" loader={myLoader} src={data2.image} />}
                    {data2 && <p className=" text-[white] text-[10px] bg-[#0013D4] pl-[5px] pr-[5px] w-[110px] ">{data2.createdDate}</p>}
                    {
                      data2 && <p className=" text-[#35446D]  text-[24px] ">{data2.title}</p>}
                    { data2 && <p className="text-[8px] text-[#647189]">Бүх автозогсоолын таны утсанд. Энэ бол  Uparking онлайн автозогсоолын платформ. Хаана ч хэзээ ч өөрт тохирох зогсоолыг түрээслэн өөрийн машинаа байршуулах боломжийг олгож ...</p>}


                  </div>
                  <div onClick={() =>newsDetails(data2.id)} className="w-[256px] h-[308px] cursor-pointer ">
                    {data2 && <Image className="bg-green-400" width="256px" height="166px" loader={myLoader} src={data2.image} />}
                    {data2 && <p className=" text-[white] text-[10px] bg-[#0013D4] pl-[5px] pr-[5px] w-[110px] ">{data2.createdDate}</p>}
                    {
                      data2 && <p className=" text-[#35446D]  text-[24px] ">{data2.title}</p>}
                    { data2 && <p className="text-[8px] text-[#647189]">Бүх автозогсоолын таны утсанд. Энэ бол  Uparking онлайн автозогсоолын платформ. Хаана ч хэзээ ч өөрт тохирох зогсоолыг түрээслэн өөрийн машинаа байршуулах боломжийг олгож ...</p>}


                  </div>
                  <div onClick={() =>newsDetails(data2.id)} className="w-[256px] h-[308px] cursor-pointer ">
                    {data2 && <Image className="bg-green-400" width="256px" height="166px" loader={myLoader} src={data2.image} />}
                    {data2 && <p className=" text-[white] text-[10px] bg-[#0013D4] pl-[5px] pr-[5px] w-[110px] ">{data2.createdDate}</p>}
                    {
                      data2 && <p className=" text-[#35446D]  text-[24px] ">{data2.title}</p>}
                    { data2 && <p className="text-[8px] text-[#647189]">Бүх автозогсоолын таны утсанд. Энэ бол  Uparking онлайн автозогсоолын платформ. Хаана ч хэзээ ч өөрт тохирох зогсоолыг түрээслэн өөрийн машинаа байршуулах боломжийг олгож ...</p>}


                  </div>
                </div>
              </div>
              <Divider className="bg-[#0013D4]" />
              {/* <div className="flex justify-between">
                <div className=" w-[323px] h-[80vh] flex  flex-col justify-between">
                  <div className="bg-green-300 w-[323px] h-[100px]"></div>
                  <div className="bg-green-300 w-[323px] h-[100px]"></div>
                  <div className="bg-green-300 w-[323px] h-[100px]"></div>
                  <div className="bg-green-300 w-[323px] h-[100px]"></div>
                </div>
                <div className=" w-[323px] h-[80vh] flex  flex-col justify-between">
                  <div className="bg-green-300 w-[323px] h-[100px]"></div>
                  <div className="bg-green-300 w-[323px] h-[100px]"></div>
                  <div className="bg-green-300 w-[323px] h-[100px]"></div>
                  <div className="bg-green-300 w-[323px] h-[100px]"></div>
                </div>
                <div className=" w-[323px] h-[80vh] flex  flex-col justify-between">
                  <div className="bg-green-300 w-[323px] h-[100px]"></div>
                  <div className="bg-green-300 w-[323px] h-[100px]"></div>
                  <div className="bg-green-300 w-[323px] h-[100px]"></div>
                  <div className="bg-green-300 w-[323px] h-[100px]"></div>
                </div>

              </div> */}

              <div className="grid grid-flow-col grid-cols-3 grid-rows-3 gap-4">
                {data1 && <NewsItem img={data1.image} loader={myLoader} title={data1.title} createdDate={data1.createdDate} click={() =>newsDetails(data1.id)} /> }
                {data1 && <NewsItem img={data1.image} loader={myLoader} title={data1.title} createdDate={data1.createdDate} click={() =>newsDetails(data1.id)} /> }
                {data1 && <NewsItem img={data1.image} loader={myLoader} title={data1.title} createdDate={data1.createdDate} click={() =>newsDetails(data1.id)} /> }
                {data1 && <NewsItem img={data1.image} loader={myLoader} title={data1.title} createdDate={data1.createdDate} click={() =>newsDetails(data1.id)} /> }
                {data1 && <NewsItem img={data1.image} loader={myLoader} title={data1.title} createdDate={data1.createdDate} click={() =>newsDetails(data1.id)} /> }
                {data1 && <NewsItem img={data1.image} loader={myLoader} title={data1.title} createdDate={data1.createdDate} click={() =>newsDetails(data1.id)} /> }
                {data1 && <NewsItem img={data1.image} loader={myLoader} title={data1.title} createdDate={data1.createdDate} click={() =>newsDetails(data1.id)} /> }
                {data1 && <NewsItem img={data1.image} loader={myLoader} title={data1.title} createdDate={data1.createdDate} click={() =>newsDetails(data1.id)} /> }
                {data1 && <NewsItem img={data1.image} loader={myLoader} title={data1.title} createdDate={data1.createdDate} click={() =>newsDetails(data1.id)} /> }


              </div>

            </div>
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

const NewsItem =(props) => {
  return <div onClick={props.click} className=" w-[323px] h-[100px] cursor-pointer ">
    <div className=" flex relative">
      <div className="mr-[10px] flex-shrink-0"><Image height="98" width="150" loader={props.loader} src={props.img} /></div>
      <div className="flex-grow">
        <p className=" text-[#35446D]  text-[16px] ">{props.title}</p>
        <p className=" text-[white] text-[10px] bg-[#0013D4] pl-[5px] pr-[5px] w-[110px] ">{props.createdDate}</p>
        <p className="text-[8px] text-[#647189]">Бүх автозогсоолын таны утсанд. Энэ бол  Uparking онлайн автозогсоолын платформ. Хаана ч хэзээ ч өөрт тохирох зогсоолыг түрээслэн өөрийн машинаа байршуулах боломжийг олгож ...</p>
      </div>

    </div>

  </div>;
};

