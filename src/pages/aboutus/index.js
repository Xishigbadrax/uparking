import Image from 'next/image';
import Footer from '../../components/Footer';
const staff = [
  {
    photo: '/ganbat.png',
    name1: 'Пунцаг ',
    name2: 'Бямбадорж',
    position: 'Системийн инженер',
  },
  {
    photo: '/Davaanyan.png',
    name1: 'Дашдаваа ',
    name2: 'Давааням',
    position: 'Зогсоолын системийн мэргэжилтэн',
  },
  {
    photo: '/Bat-ochir.png',
    name1: 'Дамдинсүрэн ',
    name2: 'Бат-Очир',
    position: 'БИзнес хөгжлийн хариуцсан мэргэжилтэн',
  },
  {
    photo: '/Lkhagvajargal.png',
    name1: 'Ганхуяг ',
    name2: 'Лхагважаргал',
    position: 'Маркетинг ,контент менежер',
  },
  {
    photo: '/tungaa.png',
    name1: 'Батцогт ',
    name2: 'Бямбадорж',
    position: 'Хамтран үүсгэн байгуулагч',
  },
  {
    photo: '/Adiyadorj.png',
    name1: 'Батцогт ',
    name2: 'Адъяадорж',
    position: 'Үүсгэн байгуулагч,Гүйцэтгэх захирал',
  },
];
const AboutUs = () => {
  return (
    <div>
      <div className="background ">
        <img src="/about_back.png" height="600px" width="100%"></img>
      </div>
      <div className={'aboutus mt-16 md:ml-32 sm:ml-8 lg:ml-64'}>
        <span>Бидний тухай</span>
      </div>
      <div className={'line md:ml-32 sm:ml-4 lg:ml-64 '}></div>
      <div
        className={'flex md:flex-row  flex-col box sm: pt-16 md :mt-32 lg:ml-34 lg:mt-16 md:ml-32 sm:ml-4'}
      >
        <div className="flex sm:ml-32  ">
          <div
            style={{width: '400px', height: '480px'}}
            className="flex-none justify-self-center "
          >
            <img src="/image32.png " />
          </div>
        </div>
        <div className="flex" style={{width: '100px'}}></div>
        <div className=" flex ml-32">
          <div
            style={{width: '505px', height: 'auto'}}
            className="flex flex-wrap  "
          >
            <div style={{width: '505px'}} className="block  flex-grow  w-full">
              <div className="py-2 text-justify mt-16  " style={{color: '#35446D'}}>
                <p style={{fontSize: '18px', marginBottom: '20px'}}>  Uparking. Your parking  <span style={{fontStyle: 'italic'}}>from</span> <b>Uparking Int LLC</b></p>

                “Юу Паркинг Инт” ХХК нь Монгол улсад анхдагч болох Авто
                зогсоолын түрээсийн цахим peer to peer Uparking платформыг
                хөгжүүлж байгаа юм.
                <p className="mt-4">
                  {' '}
                  Uparking платформ нь Авто зогсоолын түрээсийн үйл ажиллагаанд
                  технологийн шийдлийг ашиглан Тээврийн хэрэгсэл эзэмшигчдэд
                  Хаана ч Хэзээ ч өөрт тохирох зогсоолыг захиалан тээврийн
                  хэрэгслээ байршуулах, Зогсоол эзэмшигчдэд өөрийн зогсоолыг
                  илүү үр ашигтайгаар бусдад хуваалцан нэмэлт орлого олох
                  боломжийг олгоно.
                </p>{' '}
                <p className="mt-4">
                  Бид автозогсоолын асуудлыг хүрэлцээнээсээ бус зөв
                  менежментгүйгээсээ болж үүсдэг. Тиймээс Uparking платформ нь
                  авто зогсоолын хүрэлцээг нэмэгдүүлэх боломж, цаашид авто
                  зогсоол төлөвлөлтийг нэмэгдүүлэх ач холбогдолтой төсөл гэж
                  харж, хөгжүүлж байна.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={'Ourteam mt-32 md:ml-32 sm:ml-8 lg:ml-64 sm:'}>
        <span>Манай баг</span>
      </div>
      <div className={'lineTeam md:ml-32 sm:ml-4 lg:ml-64'}></div>
      <div>
        <div className="grid grid-rows-1 sm:mt-16 md:grid-cols-3  sm:grid-cols-1">
          {staff.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1"
              style={{
                position: 'relative',
                marginLeft: '5px',
                marginTop: '5px',
              }}
            >
              <Image src={item.photo} height="632px" width="460px" />
              <div
                className="flex px-[38px] h-20 bg-[blue]"
              >
                <div className="my-auto flex flex-row justify-between w-full">
                  <div>
                    <p className="text-white">{item.name1} <b>{item.name2}</b></p>
                    <p className="text-white">{item.position}</p>
                  </div>
                  <div>
                    <img src="/u_linkedin.png" height="40px" width="40px" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={'aboutus mt-16 md:ml-32 sm:ml-8 lg:ml-64'}>
        <span>Бидэнтэй Нэгдэх</span>
      </div>
      <div className={'line md:ml-32 sm:ml-4 lg:ml-64 '}></div>

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
              className="block justify-center flex-grow  text-[#647189]"
            >
              <div className={'py-2 '}>
                <p style={{color: '#647189'}}>
                  Удирдлага төвт бус
                </p>
                <span className="text-xl  ">
                  ЧӨЛӨӨТ ХАМТЫН АЖИЛЛАГААГ ЭРХЭМЛЭГЧ
                </span>
                <p className="mt-1">Зөвхөн өөрөөрөө байх</p>
                <span className="text-xl font-bold 7 ">
                  ТАНЫГ Л БИД ХАЙЖ БАЙНА.
                </span>
                <br></br>
                <button className={'buttonJoin mt-16 text-[#0013D4]'}>Нэгдэх</button>
              </div>
            </div>
          </div>
        </div>
        <div style={{width: '100px'}}></div>
        <div className="flex justify-center">
          <div
            style={{width: '450px', height: '300px'}}
            className="flex-none justify-self-center"
          >
            <img src="/image33.png" />
          </div>
        </div>
      </div>
      <div className="mt-64">
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
