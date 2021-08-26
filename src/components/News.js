import Image from 'next/image';

// eslint-disable-next-line react/prop-types
const News = ({head, image, date, title, titlebold, desc}) => {
  return (
    <div
      style={{width: '350px', height: '450px', backgroundColor: ''}}
      className="flex flex-col sm:mb-10 lg:mr-10 mb-10"
    >
      <div
        style={{
          height: '48px',
          width: 'auto',
          background: 'linear-gradient(90deg, #0013d4 0%, #00f9b8 100%)',
          paddingRight: '15px',
        }}
        className="flex justify-end flex-wrap content-center"
      >
        <p className={'justify-self-end newsHeadTitle'}>{head}</p>
      </div>
      <div
        style={{height: '402px'}}
        className="flex content-evenly flex-wrap px-6"
      >
        <div>
          <div
            style={{
              width: '300px',
              height: '200px',
              zIndex: '0',
              position: 'relative',
            }}
          >
            <Image src={image} layout="fill" />
          </div>
          <div
            className={'flex justify-center flex-wrap content-center newsDate'}
          >
            <p className={'newsDateText'}>{date}</p>
          </div>
        </div>
        <div style={{width: 'auto'}} className="grid grid-rows-2">
          <div className="newsTitle">{titlebold}</div>
          <div style={{fontWeight: 'bold'}} className="newsTitle">
            {title}
          </div>
        </div>
        <div className="newsDesc">{desc}</div>
      </div>
    </div>
  );
};

export default News;
