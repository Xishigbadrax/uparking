import {React} from 'react';
import parse from 'html-react-parser';
import {callGet} from '@api/api';
import Footer from '../../components/Footer';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import {Image} from 'antd';

const NewsId = () => {
  const router = useRouter();
  const {id} = router.query;
  const [data, setdata] = useState(null);

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
    <div>
      <Image
        preview={false}
        style={{zIndex: '1'}}
        src="../../images/news.png"
      />
      <div style={{position: 'absolute', top: '318px'}}>
        <div
          style={{
            top: '318px',
            zIndex: '2',
            marginLeft: '10%',
            width: '1110px',
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <div
            style={{fontSize: '24px', marginTop: '64px', color: '#35446D'}}
          >
            {data && data.title}
          </div>
          <div>
            {data != [] && data != null ? (
              <Image
                preview={false}
                width={600}
                height={350}
                src={'https://uparking.mn' + data.image}
              />
            ) : null}
          </div>
          <div
            style={{width: '540px', alignItems: 'center', color: '#141A29'}}
          >
            {data != [] && data ? parse(` ${data.content}`) : null}
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
