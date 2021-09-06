import {React} from 'react';
import parse from 'html-react-parser';
import {callGet} from '@api/api';
import Footer from '../../components/Footer';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import {Image, Input, Divider, Button} from 'antd';
import {EyeOutlined, HeartFilled, HeartOutlined, ShareAltOutlined} from '@ant-design/icons';

const NewsId = () => {
  const router = useRouter();
  const {id} = router.query;
  const [data, setdata] = useState(null);
  const {TextArea} = Input;

  const fetchData = async () => {
    // setisLoading(true);
    await callGet(`/news/id/test?newsId=${id}`, null).then((res) => {
      // console.log(res);
      if (res != 'undefined') {
        setdata(res);
        console.log(res, 'bnuuuuu');
      } else {
        alert('data hoosn');
      }

      // setisLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  data != null ? console.log(data, 'dataaa') : null;

  return (
    <div style={{position: 'relative'}}>
      <p style={{position: 'absolute', zIndex: '2', left: '794px', top: '40px', fontSize: '60px', width: '481px', height: '142', color: '#DEE2E9',
        textAlign: 'right', fontWeight: 'bold', letterSpacing: '-0.5px'}}>
        {data && data.title}</p>
      <Image
        preview={false}
        style={{zIndex: '1'}}
        width= {'100%'}
        src="../../images/news.png"
      />


      <div style={{position: 'absolute', top: '250px'}}>
        <div
          className=""
          style={{
            zIndex: '2',
            marginLeft: '10%',
            width: '1110px',
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <div className="flex w-full justify-between  mt-[18px] ">
            <div className="flex items-center w-[15%] justify-around text-[#0013D4] ">
              <div className="flex items-center">
                <div className="mr-1"><EyeOutlined /></div>
                <div className="pt-[4px]">11200</div>
              </div>
              <div className=" flex ">
                <div className=" mr-1"><HeartFilled /></div>
                <div className="pt-[2px]">110</div>
              </div>


            </div>
            <div className="text-white bg-[#0013D4] pl-2 pr-2 h-[24px] ">{data && data.createdDate}</div>

          </div>

          <div style={{marginTop: '64px', alignItems: 'center'}}>
            {data != [] && data != null ? (
              <Image
                preview={false}
                width={600}
                height={350}

                src={'https://uparking.mn' + data.image}
              />

            ) : null}

            <div
              style={{width: '540px', alignItems: 'center', color: '#141A29', marginBottom: '50px'}}
            >
              {data != [] && data ? parse(` ${data.content}`) : null}
            </div>
            <div style={{display: 'flex', cursor: 'pointer', justifyContent: 'space-around', width: '300px', marginLeft: '20%'}}>
              <div style={{display: 'flex', width: '100px', justifyContent: 'space-around'}}>
                <div style={{color: 'blue'}}><HeartOutlined /></div>
                <div style={{fontSize: '14px', color: '#0013D4', marginTop: '2px', fontWeight: 'bold'}}>Таалагдлаа </div>
              </div>
              <div style={{display: 'flex', width: '100px', justifyContent: 'space-around'}}>
                <div style={{color: 'blue'}}><ShareAltOutlined /></div>
                <div style={{fontSize: '14px', color: '#0013D4', marginTop: '2px', fontWeight: 'bold'}}>Хуваалцах</div>
              </div>
            </div>
            <div style={{width: '600px', height: '220px', top: '500px', margin: '32px'}}>
              <Input bordered={false} placeholder="Таны нэр" />
              <Divider />
              <TextArea bordered={false} rows={4} autoSize={{minRows: 3, maxRows: 5}} placeholder="Сэтгэгдэл бичих" />
              <Button style={{marginLeft: '70%', borderRadius: '8px'}} type="primary" >Сэтгэгдэл илгээх</Button>
            </div>


          </div>
        </div>
        <div>

          <Footer />
        </div>
      </div>


      {/* <div style={{ position: "absolute", zIndex: "2" }}>
        <Footer />
      </div> */}
    </div>
  );
};

// data.content != "undefined"?

//   : null;

export default NewsId;
