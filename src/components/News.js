import Image from 'next/image';

// eslint-disable-next-line react/prop-types
const News = ({head, image, date, title, titlebold, desc}) => {
  return (
    <div
      style={{width: '350px', height: '450px'}}
      className="flex flex-col sm:mb-10 lg:mr-[9.7px] mb-10 overflow-hidden"
    >

      <div
        style={{
          width: '350px',
          width: 'auto',
          background: 'linear-gradient(90deg, #0013d4 0%, #00f9b8 100%)',
          paddingRight: '15px',
          lineHeight: '48px',
        }}
        className="flex justify-end h-[48px] flex-wrap content-center pr-[20px]"
      >
        <div className={'justify-self-end newsHeadTitle items-center'}>{head}</div>
      </div>
      <div

        className="flex content-evenly flex-wrap  items-center ml-[25px] "

      >
        <div>
          <div
            className='mt-[30px] pl-[20px] pr-[20px]'
            style={{
              width: '300px',
              height: '200px',
              zIndex: '0',
              position: 'relative',
              alignItems: 'center',
            }}
          >
            <Image src={image} layout="fill" />
          </div>
          <div
            className={'newsDate'}
          >
            <div className={'newsDateText w-[80px] text-[10px] bg-[#0013D4] text-[white]'}>{date}</div>
          </div>
        </div>
        <div className="grid grid-rows-2 text-[24px] text-[#35446D]">
          <div className=" mt-[23px]">{titlebold}</div>
          <div style={{fontWeight: 'bold'}} className="">
            {title}
          </div>
        </div>
        <div className="newsDesc text-[#647189]">{desc}</div>
      </div>
    </div>
  );
};

export default News;
