import Image from 'next/image';
import {Fragment, useState} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid';
import Link from 'next/link';
import {DatePicker} from 'antd';
import ParkResult from '../components/ParkResult';
import News from '../components/News';
import Footer from '../components/Footer';
import moment from 'moment';
import {DownOutlined} from '@ant-design/icons';
import {useRouter} from 'next/router';

const news = [
  {
    head: 'Урамшуулал',
    image: '/news/news-1.png',
    date: '2020/10/10 12:40',
    title: 'Зогсоолын',
    titlebold: 'Шинэ ЭРИН',
    desc: 'Бүх автозогсоолын таны утсанд. Энэ бол Uparking онлайн автозогсоолын платформ. Хаана ч хэзээ ч өөрт тохирох зогсоолыг түрээслэн өөрийн машинаа байршуулах боломжийг олгож ...',
  },
  {
    head: 'Зөвөлгөө',
    image: '/news/news-2.png',
    date: '2020/12/10 12:40',
    title: 'Хэрхэн',
    titlebold: 'Ашиглэх Вэ ?',
    desc: 'Бүх автозогсоолын таны утсанд. Энэ бол Uparking онлайн автозогсоолын платформ. Хаана ч хэзээ ч өөрт тохирох зогсоолыг түрээслэн өөрийн машинаа байршуулах боломжийг олгож ...',
  },
  {
    head: 'Компанийн мэдээ',
    image: '/news/news-3.png',
    date: '2020/12/10 12:40',
    title: 'Uparking',
    titlebold: 'Your PARKING ?',
    desc: 'Бүх автозогсоолын таны утсанд. Энэ бол Uparking онлайн автозогсоолын платформ. Хаана ч хэзээ ч өөрт тохирох зогсоолыг түрээслэн өөрийн машинаа байршуулах боломжийг олгож ...',
  },
];

const orderType = [
  {
    id: 1,
    name: 'Өдөр',
  },
  {
    id: 2,
    name: 'Шөнө',
  },
];

const parks = [
  {
    image: '/hunnu11.png',
    title: 'Ажилчдын орон сууц',
    count: 1,
  },
  {
    image: '/hunnu11.png',
    title: 'Ажилчдын орон сууц',
    count: 2,
  },
  {
    image: '/hunnu11.png',
    title: 'Ажилчдын орон сууц',
    count: 3,
  },
  {
    image: '/hunnu11.png',
    title: 'Ажилчдын орон сууц',
    count: 4,
  },
  {
    image: '/hunnu11.png',
    title: 'Ажилчдын орон сууц',
    count: 5,
  },
  {
    image: '/hunnu11.png',
    title: 'Ажилчдын орон сууц',
    count: 6,
  },
  {
    image: '/hunnu11.png',
    title: 'Ажилчдын орон сууц',
    count: 7,
  },
  {
    image: '/hunnu11.png',
    title: 'Ажилчдын орон сууц',
    count: 8,
  },
  {
    image: '/hunnu11.png',
    title: 'Ажилчдын орон сууц',
    count: 9,
  },
  {
    image: '/hunnu11.png',
    title: 'Ажилчдын орон сууц',
    count: 10,
  },
  {
    image: '/hunnu11.png',
    title: 'Ажилчдын орон сууц',
    count: 11,
  },
  {
    image: '/hunnu11.png',
    title: 'Ажилчдын орон сууц',
    count: 12,
  },
];

// eslint-disable-next-line require-jsdoc
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Home =()=> {
  const [selected, setSelected] = useState(orderType[0]);
  const [filterType, setFilterType] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const router = useRouter();
  let styles;
  let styles2;
  filterType ?
    (styles = {
      marginTop: '12px',
      color: 'blue',
      textAlign: 'center',
      width: '45%',
      display: 'inline-block',
      paddingBottom: '5px',
      background:
          'linear-gradient(to right,  #0013D4, #00F9B8), linear-gradient(to right,  #0013D4, #00F9B8)',
      backgroundSize: '100% 2px',
      backgroundPosition: 'bottom 0 left 0',
      backgroundRepeat: 'no-repeat',
    }) :
    (styles = {
      marginTop: '12px',
      width: '45%',
    });
  filterType ?
    (styles2 = {
      marginTop: '12px',
      width: '45%',
    }) :
    (styles2 = {
      marginTop: '12px',
      color: 'blue',
      textAlign: 'center',
      width: '45%',
      display: 'inline-block',
      paddingBottom: '5px',
      background:
          'linear-gradient(to right,  #0013D4, #00F9B8), linear-gradient(to right,  #0013D4, #00F9B8)',
      backgroundSize: '100% 2px',
      backgroundPosition: 'bottom 0 left 0',
      backgroundRepeat: 'no-repeat',
    });

  const typeOrder = selected.name;


  const onChangeStartDate=( data, dateString)=> {
    setStartDate(dateString);
  };

  const onChangeEndDate=(data, dateString) =>{
    setEndDate(dateString);
  };
  const onSearch=()=> {
    router.push({
      pathname: 'park/fsearch',
      query: {
        typeOrder: typeOrder,
        inputAdress: inputAddress,
        homeStartDate: startDate,
        homeEndDate: endDate,
      },
    });
  };

  return (
    <div>
      {/* <div className="imageContainer}>
        <Image className="backgroudImage} src='/search1.png' layout='responsive' width={100} height={44} objectPosition='center' />
        <div className="searchParking}>aas</div>
      </div> */}

      {/* <Image className=backgroudImage} src='/search1.png' layout='responsive' width='100' height='42' objectPosition='center' /> */}
      <div
        style={{
          width: '100%',
          height: '700px',
          backgroundImage: 'url("/search1.png")',
          backgroundSize: 'cover',
        }}
      >
        <div className="grid lg:grid-cols-2 mx-auto sm:px-5 md:px-10 px-5 sm:w-full md:w-11/12 lg:w-4/6 pt-20 lg:pl-20 pl-5">
          <div
            className={'md:col-span-2 sm:col-span-2 lg:col-span-1 flex flex-col justify-between searchFilter'}
          >
            <h6 className={'filterTitle'}>Авто зогсоол хайх</h6>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                backgroundColor: 'white',
                borderRadius: '10px',
                height: '48px',
                cursor: 'pointer',
                fontWeight: 'bold',
                color: '#A2A4AA',
                paddingRight: '20px',
                paddingLeft: '20px',
                textAlign: 'center',
              }}
            >
              <div style={styles} onClick={() => setFilterType(true)}>
                Өдрөөр
              </div>

              <div style={styles2} onClick={() => setFilterType(false)}>
                Сараар
              </div>
            </div>
            <div className={'flex flex-col-3 locationInput'}>
              <div className="py-4 px-2 flex-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                className="flex-grow"
                style={{outline: 'none'}}
                type="text"
                placeholder="Хаяг, байршил, ID"
                onChange={(e) => setInputAddress(e.target.value)}
              />
              <div className="py-4 px-2 flex-none">
                <img className="h6 w-6" src="./icons/location.png" />
              </div>
            </div>
            <div className={'orderType'}>
              <Listbox value={selected} onChange={setSelected}>
                {({open}) => (
                  <>
                    <div className="searchFilterLabel">Захиалгын төрөл</div>
                    <div className="relative">
                      <Listbox.Button className="relative w-full rounded-md pl-3 pr-10 py-1 text-left cursor-default focus:outline-none sm:text-sm">
                        <span className="flex items-center">
                          <span className="ml-3 block truncate">
                            {selected.name}
                          </span>
                        </span>
                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options
                          static
                          style={{backgroundColor: 'white'}}
                          className="absolute z-10 mt-1 w-full max-h-56 rounded-md py-1 text-base ring-1 ring-black overflow-auto focus:outline-none sm:text-sm"
                        >
                          {orderType.map((type) => (
                            <Listbox.Option
                              key={type.id}
                              className={({active}) =>
                                classNames(
                                  active ?
                                    'text-white bg-indigo-600' :
                                    'text-gray-900',
                                  'cursor-default select-none relative py-2 pl-3 pr-9',
                                )
                              }
                              value={type}
                            >
                              {({selected, active}) => (
                                <>
                                  <div className="flex items-center">
                                    <span
                                      className={classNames(
                                        selected ?
                                          'font-semibold' :
                                          'font-normal',
                                        'ml-3 block truncate',
                                      )}
                                    >
                                      {type.name}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ?
                                          'text-white' :
                                          'text-indigo-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
            <div className="flex flex-row justify-between">
              <div className="filterStartDate">
                <div className="searchFilterLabel">Эхлэх хугацаа</div>
                {filterType ? (
                  <DatePicker
                    showTime={{defaultValue: moment('00:00', 'HH:mm')}}
                    suffixIcon={<DownOutlined />}
                    bordered={false}
                    format="YYYY/MM/DD HH:mm"
                    onChange={onChangeStartDate}
                    placeholder="Сонгох"
                  />
                ) : (
                  <DatePicker
                    suffixIcon={<DownOutlined />}
                    bordered={false}
                    picker="month"
                    format="YYYY/MM/"
                    onChange={onChangeStartDate}
                    placeholder="Сонгох"
                  />
                )}
              </div>
              <div className="filterEndDate">
                <div className="searchFilterLabel">Дуусах хугацаа</div>
                {filterType ? (
                  <DatePicker
                    showTime={{defaultValue: moment('00:00', 'HH:mm')}}
                    suffixIcon={<DownOutlined />}
                    bordered={false}
                    format="YYYY/MM/DD HH:mm"
                    onChange={onChangeEndDate}
                    placeholder="Сонгох"
                  />
                ) : (
                  <DatePicker
                    suffixIcon={<DownOutlined />}
                    bordered={false}
                    picker="month"
                    format="YYYY/MM/"
                    onChange={onChangeEndDate}
                    placeholder="Сонгох"
                  />
                )}
              </div>
            </div>
            <button onClick={onSearch} className={'searchFilterBtn'}>
              Хайх
            </button>
          </div>
        </div>
      </div>

      <div
        style={{paddingTop: '100px'}}
        className="flex md:flex-row  flex-col justify-center"
      >
        <div className="flex justify-center">
          <div
            style={{width: '450px', height: '300px'}}
            className="flex-none justify-self-center"
          >
            <img src="/car.png" />
          </div>
        </div>
        <div style={{width: '100px'}}></div>
        <div className="flex justify-center">
          <div
            style={{width: '505px', height: '300px'}}
            className="flex flex-wrap content-center"
          >
            <div
              style={{width: '505px'}}
              className="block justify-center flex-grow "
            >
              <div className={'pl-3 bodyTitle'}>Жолооч</div>
              <div className={'py-2 bodyText'}>
                Хаана ч хэзээ ч өөрт тохирох зогсоолыг түрээслэн өөрийн машинаа
                байршуулах боломжийг Uparking авто зогсоолын түрээсийн систем
                танд олгоно. Та өөрийн тээврийн хэрэгслээ байршуулах байршил,
                түрээсийн төрөл болох Өдөр, Шөнө, Бүтэн өдрөөс сонгон хугацаагаа
                оруулан хайлтын илэрцүүдээс өөрт тохирох зогсоолыг сонгон,
                төлбөрөө урьдчилан төлж захиалах боломжтой. Үүний тулд та систем
                дээр бүртгэл үүсгэн, тээврийн хэрэгслээ бүртгүүлсэн байхад
                хангалттай.
              </div>
              <Link href="/driver">
                <a className="bodyBtn">Дэлгэрэнгүй</a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{paddingTop: '100px'}}
        className="flex md:flex-row  flex-col justify-center lg:pl-20"
      >
        <div className="flex justify-center">
          <div
            style={{width: '505px', height: '300px'}}
            className="flex flex-wrap content-center"
          >
            <div
              style={{width: '505px'}}
              className="block justify-center flex-grow "
            >
              <div className={'pl-3 bodyTitle'}>Зогсоол эзэмшигч</div>
              <div className={'py-2 bodyText'}>
                Илүү үр ашигтай зогсоол ашиглалтын менежментийг энэхүү систем
                танд олгож, орлогын нэмэлт эх үүсгэвэрийг бий болгоно. Uparking
                нь зогсоол эзэмшигч танд өөрийн зогсоолыг ашиглахгүй байгаа
                үедээ бусдад түрээслэх боломжийг олгох бөгөөд та өөрийн
                зогсоолын түрээслэх өдрүүдийг систем дээр Өдөр |09:00-18:30|
                болон Шөнийн |19:00-08:30| цагийн хуваарьт оруулснаар таны
                зогсоолыг тухайн өдрүүдэд зогсоол түрээслэгчид санал болгоно.
              </div>
              <Link href="/spaceowner">
                <a className="bodyBtn">Дэлгэрэнгүй</a>
              </Link>
            </div>
          </div>
        </div>
        <div style={{width: '100px'}}></div>
        <div className="flex justify-center">
          <div
            style={{width: '450px', height: '300px'}}
            className="flex-none justify-self-center"
          >
            <img src="/car-1.png" />
          </div>
        </div>
      </div>

      <div
        style={{
          height: '642px',
          width: '80%',
          zIndex: '0',
          position: 'relative',
          marginTop: '70px',
        }}
        className="mx-auto"
      >
        <Image src="/home-vid.png" layout="fill" />
      </div>

      <div className="howToUse">
        <div className="flex flex-col justify-center px-10">
          <div className="howToUseTitle">Хэрхэн хэрэглэх вэ?</div>
          <div style={{height: '20px'}}></div>
          <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2">
            <div className="flex flex-col">
              <div className={'grid grid-row-2'}>
                <img
                  src="/alham-1.png"
                  className="place-self-center"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    zIndex: '0',
                    position: 'relative',
                    boxSizing: 'border-box',
                  }}
                />
                <div style={{height: '12px'}}></div>
                <div className={'place-self-center text-center stepDesc'}>
                  Алхам 1 | БҮРТГҮҮЛЭХ эсвэл НЭВТРЭХ
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className={'grid grid-row-2'}>
                <img
                  src="/alham-2.png"
                  className="place-self-center"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    zIndex: '0',
                    position: 'relative',
                    boxSizing: 'border-box',
                  }}
                />
                <div style={{height: '12px'}}></div>
                <div className={'place-self-center text-center stepDesc'}>
                  Алхам 2 | ЗОГСООЛ ХАЙХ
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className={'grid grid-row-2'}>
                <img
                  src="/alham-3.png"
                  className="place-self-center"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    zIndex: '0',
                    position: 'relative',
                    boxSizing: 'border-box',
                  }}
                />
                <div style={{height: '12px'}}></div>
                <div className={'place-self-center text-center stepDesc'}>
                  Алхам 3 | СОНГОХ
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className={'grid grid-row-3'}>
                <img
                  src="/alham-4.png"
                  className="place-self-center"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    zIndex: '0',
                    position: 'relative',
                    boxSizing: 'border-box',
                  }}
                />
                <div style={{height: '12px'}}></div>
                <div className={'place-self-center text-center stepDesc'}>
                  Алхам 4 | ТӨЛБӨР ТӨЛӨХ
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className={'grid grid-row-2'}>
                <img
                  src="/alham-5.png"
                  className="place-self-center"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    zIndex: '0',
                    position: 'relative',
                    boxSizing: 'border-box',
                  }}
                />
                <div style={{height: '12px'}}></div>
                <div className={'place-self-center text-center stepDesc'}>
                  Алхам 5 | ЗОГСООЛД БАЙРШУУЛАХ
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:pb-10 pb-10">
              <div className={'grid grid-row-2'}>
                <img
                  src="/alham-6.png"
                  className="place-self-center"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    zIndex: '0',
                    position: 'relative',
                    boxSizing: 'border-box',
                  }}
                />
                <div style={{height: '12px'}}></div>
                <div className={'place-self-center text-center stepDesc'}>
                  Алхам 6 | ЗОГСООЛЫГ ҮНЭЛЭХ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{width: '70%', margin: '0px auto'}}
        className="flex flex-col justify-start"
      >
        <div className="parking">Авто зогсоол</div>
        <div className="mt-10 flex flex-col">
          <div className="flex flex-row self-start">
            <div className="grid grid-rows-2">
              <a className={'px-4 place-self-center parkTypes} parkTypeActive'}>
                Орон сууц
              </a>
              <div className={'place-self-center parkingActiveLine'}></div>
            </div>
            <div className="grid grid-rows-2">
              <a className={'px-4 place-self-center parkTypes'}>Оффис</a>
              <div className={'place-self-center parkingActiveLine'}></div>
            </div>
            <div className="grid grid-rows-2">
              <a className={'px-4 place-self-center parkTypes'}>
                Үйлчилгээний төв
              </a>
              <div className={'place-self-center parkingActiveLine'}></div>
            </div>
          </div>
          <div style={{marginTop: '-13px'}} className={'parkTypeLine'}></div>
        </div>
      </div>
      <div
        style={{overflowX: 'auto', width: '80%'}}
        className="flex flex-cols mx-auto"
      >
        {parks.map((item, index) => (
          <ParkResult
            key={index}
            image={item.image}
            title={item.title}
            count={item.count}
          />
        ))}
      </div>
      <div
        style={{width: '80%'}}
        className="flex flex-rows justify-end mx-auto"
      >
        <div>
          <a className="imageArrow">
            <svg
              width="11"
              height="18"
              viewBox="0 0 11 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=" uk-svg"
            >
              <path
                d="M9.99979 14.8124L4.17979 8.99238L9.99979 3.17238C10.5848 2.58738 10.5848 1.64238 9.99979 1.05738C9.71954 0.776502 9.33906 0.618652 8.94229 0.618652C8.54551 0.618652 8.16503 0.776502 7.88479 1.05738L0.999785 7.94238C0.414785 8.52738 0.414785 9.47238 0.999785 10.0574L7.88479 16.9424C8.46979 17.5274 9.41479 17.5274 9.99979 16.9424C10.5698 16.3574 10.5848 15.3974 9.99979 14.8124Z"
                fill="#647189"
              ></path>
            </svg>
          </a>
          <a className="imageArrow">
            <svg
              width="11"
              height="18"
              viewBox="0 0 11 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=" uk-svg"
            >
              <path
                className="zz"
                d="M0.999764 14.8124L6.81976 8.9924L0.999764 3.1724C0.718885 2.89216 0.561035 2.51168 0.561035 2.1149C0.561035 1.71813 0.718885 1.33765 0.999764 1.0574C1.58476 0.472402 2.52976 0.472402 3.11476 1.0574L9.99977 7.9424C10.5848 8.5274 10.5848 9.4724 9.99977 10.0574L3.11476 16.9424C2.52976 17.5274 1.58476 17.5274 0.999764 16.9424C0.429764 16.3574 0.414764 15.3974 0.999764 14.8124Z"
                fill="#647189"
              ></path>
            </svg>
          </a>
        </div>
      </div>

      <div className="howToUse2">
        <div className="flex flex-col justify-center px-10">
          <div className="howToUseTitle">Хэрхэн хэрэглэх вэ?</div>
          <div style={{height: '20px'}}></div>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
            <div className="grid grid-rows-2">
              <h1 style={{placeSelf: 'center'}} className="statisticsText">
                38
              </h1>
              <div
                style={{fontSize: '14px', placeSelf: 'center'}}
                className="statisticsText"
              >
                ЗОГСООЛ
              </div>
            </div>
            <div className="grid grid-rows-2">
              <h1 style={{placeSelf: 'center'}} className="statisticsText">
                105
              </h1>
              <div
                style={{fontSize: '14px', placeSelf: 'center'}}
                className="statisticsText"
              >
                ЭЗЭМШИГЧ
              </div>
            </div>
            <div className="grid grid-rows-2">
              <h1 style={{placeSelf: 'center'}} className="statisticsText">
                753
              </h1>
              <div
                style={{fontSize: '14px', placeSelf: 'center'}}
                className="statisticsText"
              >
                ОРОН СУУЦ
              </div>
            </div>
            <div className="grid grid-rows-2">
              <h1 style={{placeSelf: 'center'}} className="statisticsText">
                758
              </h1>
              <div
                style={{fontSize: '14px', placeSelf: 'center'}}
                className="statisticsText"
              >
                ЖОЛООЧ
              </div>
            </div>
            <div className="grid grid-rows-2">
              <h1 style={{placeSelf: 'center'}} className="statisticsText">
                15
              </h1>
              <div
                style={{fontSize: '14px', placeSelf: 'center'}}
                className="statisticsText"
              >
                ХАМТРАГЧ БАЙГУУЛЛАГА
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: 'rgba(222, 226, 233, 0.3)',
          padding: '100px 0px',
        }}
      >
        <div style={{width: '80%', height: 'auto'}} className="mx-auto ">
          <div
            style={{paddingBottom: '30px'}}
            className="flex flex-rows justify-between  "
          >
            <div
              style={{paddingLeft: '15px'}}
              className="newNews grid justify-items-center  "
            >
              Шинэ мэдээ
            </div>
            <Link href="/news">
              <div className="seeAllNews">Бүгдийг харах</div>
            </Link>
          </div>
          <div className="flex flex-wrap w-full lg:justify-start  md:justify-between sm:justify-center justify-center ">
            {news.map((item, index) => (
              <News
                key={index}
                head={item.head }
                image={item.image}
                date={item.date}
                title={item.title}
                titlebold={item.titlebold}
                desc={item.desc}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Home;
