import Image from "next/image";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
const staff = [
  {
    photo: "/ganbat.png",
    name: "Пунцаг Бямбадорж",
    position: "Системийн инженер",
  },
  {
    photo: "/Davaanyan.png",
    name: "Дашдаваа Давааням",
    position: "Зогсоолын системийн мэргэжилтэн",
  },
  {
    photo: "/Bat-ochir.png",
    name: "Дамдинсүрэн Бат-Очир",
    position: "БИзнес хөгжлийн хариуцсан мэргэжилтэн",
  },
  {
    photo: "/Lkhagvajargal.png",
    name: "Ганхуяг Лхагважаргал",
    position: "Маркетинг ,контент менежер",
  },
  {
    photo: "/tungaa.png",
    name: "Батцогт Бямбадорж  ",
    position: "Хамтран үүсгэн байгуулагч",
  },
  {
    photo: "/Adiyadorj.png",
    name: "Батцогт Адъяадорж",
    position: "Үүсгэн байгуулагч,Гүйцэтгэх захирал",
  },
];
const AboutUs = () => {
  console.log('aboutus')
  return (
    <div>
    <Navbar />
      <div className="background">
        <img src="/about_back.png" height="600px" width="100%"></img>
      </div>
      <div className={`aboutus mt-16 md:ml-32 sm:ml-8 lg:ml-64`}>
        <span>Бидний тухай</span>
      </div>
      <div className={`line md:ml-32 sm:ml-4 lg:ml-64 `}></div>
      <div
        className={`flex md:flex-row  flex-col box sm: pt-16 md :mt-32 lg:ml-64 lg:mt-16 md:ml-32 sm:ml-4`}
      >
        <div className="flex sm:ml-32  ">
          <div
            style={{ width: "400px", height: "480px" }}
            className="flex-none justify-self-center "
          >
            <img src="/image32.png " />
          </div>
        </div>
        <div className="flex" style={{ width: "100px" }}></div>
        <div className=" flex ml-32">
          <div
            style={{ width: "505px", height: "auto" }}
            className="flex flex-wrap  "
          >
            <div style={{ width: "505px" }} className="block  flex-grow ">
              <div className="py-2 text-justify mt-16 ">
                <b> Uparking. Your parking </b> from <b>Uparking Int LLC</b>
                “Юу Паркинг Инт” ХХК нь Монгол улсад анхдагч болох Авто
                зогсоолын түрээсийн цахим peer to peer Uparking платформыг
                хөгжүүлж байгаа юм.
                <p className="mt-4">
                  {" "}
                  Uparking платформ нь Авто зогсоолын түрээсийн үйл ажиллагаанд
                  технологийн шийдлийг ашиглан Тээврийн хэрэгсэл эзэмшигчдэд
                  Хаана ч Хэзээ ч өөрт тохирох зогсоолыг захиалан тээврийн
                  хэрэгслээ байршуулах, Зогсоол эзэмшигчдэд өөрийн зогсоолыг
                  илүү үр ашигтайгаар бусдад хуваалцан нэмэлт орлого олох
                  боломжийг олгоно.
                </p>{" "}
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
      <div className={`Ourteam mt-32 md:ml-32 sm:ml-8 lg:ml-64 sm:`}>
        <span>Манай баг</span>
      </div>
      <div className={`lineTeam md:ml-32 sm:ml-4 lg:ml-64`}></div>
      <div>
        <div className="grid grid-rows-1 sm:mt-16 md:grid-cols-3  sm:grid-cols-1">
          {staff.map((item, index) => (
            <div
            key={index}
              className="grid grid-cols-1"
              style={{
                position: "relative",
                marginLeft: "5px",
                marginTop: "5px",
              }}
            >
              <Image src={item.photo} height="632px" width="460px" />
              <div
                className="flex  h-20  "
                style={{ backgroundColor: "blue", width: "auto" }}
              >
                <div
                  className="flex-1   h-16 ml-16 text-white  "
                  style={{ width: "400px" }}
                >
                  <span style={{ color: "white", width: "300px" }}>
                    {item.name}
                  </span>
                  <br />
                  <span style={{ color: "white" }}>{item.position}</span>
                </div>
                <div className="flex-1 pl-32 ml-32 mt-4">
                  <img src="/u_linkedin.png" height="40px" width="40px" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`aboutus mt-16 md:ml-32 sm:ml-8 lg:ml-64`}>
        <span>Бидэнтэй Нэгдэх</span>
      </div>
      <div className={`line md:ml-32 sm:ml-4 lg:ml-64 `}></div>

      <div
        style={{ paddingTop: "100px" }}
        className="flex md:flex-row  flex-col justify-center lg:pl-20"
      >
        <div className="flex justify-center">
          <div
            style={{ width: "505px", height: "300px" }}
            className="flex flex-wrap content-center"
          >
            <div
              style={{ width: "505px" }}
              className="block justify-center flex-grow "
            >
              <div className={`py-2 `}>
                <p className="text-red-400" style={{ color: "gray" }}>
                  Удирдлага төвт бус
                </p>
                <span className="text-xl text-gray-600 ">
                  ЧӨЛӨӨТ ХАМТЫН АЖИЛЛАГААГ ЭРХЭМЛЭГЧ
                </span>
                <p style={{ color: "gray" }}>Зөвхөн өөрөөрөө байх</p>
                <span className="text-xl text-gray-600 ">
                  ТАНЫГ Л БИД ХАЙЖ БАЙНА.
                </span>
                <br></br>
                <button className={`buttonJoin mt-16`}>Нэгдэх</button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "100px" }}></div>
        <div className="flex justify-center">
          <div
            style={{ width: "450px", height: "300px" }}
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
