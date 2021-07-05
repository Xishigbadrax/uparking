import Image from "next/image";

const ParkResult = ({ image, title, count }) => {
  return (
    <div
      style={{
        width: "185px",
        height: "271px",
        zIndex: "0",
        position: "relative",
        boxSizing: "border-box",
        marginTop: "30px",
        marginLeft: "50px",
        backgroundImage: "initial",
      }}
    >
      <Image className="parkImage" src={image} layout="fill" />
      <div className="grid gird-rows-2 gap-y-44">
        <div
          style={{
            paddingLeft: "5%",
            paddingTop: "5%",
            paddingRight: "5%",
            zIndex: "1",
          }}
          className="flex flex-rows justify-between row-span-1"
        >
          <img src="/icons/Vector.png" />
          <div style={{ width: "100px" }}></div>
          <p className="parkImageTitle">{title}</p>
        </div>
        <div
          style={{
            paddingLeft: "5%",
            paddingTop: "5%",
            paddingRight: "5%",
            zIndex: "1",
          }}
          className="flex flex-rows justify-between row-span-1"
        >
          <div className="flex flex-rows place-items-center">
            <img src="/icons/Car icons 15.png" width="30px" height="auto" />
            <p className="parkImageNumber">{count}</p>
          </div>
          <button className={`self-center mr-2 searchPark`}>
            Зогсоол хайх
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParkResult;
