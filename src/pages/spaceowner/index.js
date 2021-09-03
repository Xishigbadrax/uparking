import Footer from '../../components/Footer';
import Link from 'next/link';
import {Image} from 'antd';
const SpaceOwner = () => {
  return (
    <div>
      <div className={'background '}>
        <img src="/zogsoolEzemshigch.png" height="600px" width="100%" />
      </div>
      <div className={'textInfo mt-10 mb-3'}>
        ТАНЫ АВТО ЗОГСООЛ НЭМЭЛТ ОРЛОГО ОЛОХ БОЛОМЖ
      </div>
      <div className="textInfoDesc mb-[52px]">
        Илүү үр ашигтай зогсоол ашиглалтын менежментийг энэхүү систем танд
        олгож, орлогын нэмэлт эх үүсгэвэрийг бий болгоно. Uparking нь зогсоол
        эзэмшигч танд өөрийн зогсоолыг ашиглахгүй байгаа үедээ бусдад түрээслэх
        боломжийг олгох бөгөөд та өөрийн зогсоолын түрээслэх өдрүүдийг систем
        дээр Өдөр |09:00-18:30| болон Шөнийн |19:00-08:30| цагийн хуваарьт
        оруулснаар таны зогсоолыг тухайн өдрүүдэд зогсоол түрээслэгчид санал
        болгоно.
        <p className="mt-4 mb-4">
          ТА ӨӨРИЙН ЗОГСООЛЫН ТӨЛВИЙГ ӨДӨР БҮРЭЭР 3 ТӨЛӨВТ АНГИЛНА.{' '}
        </p>
        <p style={{textAlign: 'justify'}} className="mb-4">
          1.<span style={{color: 'red'}}> Боломжгүй /Unavailable/</span> -
          энэхүү төлвөөр та өөрийн зогсдог цагийг долоо хоног болон сарын
          календарь дээр тохируулна. Систем{' '}
          <span style={{color: 'red'}}>Unavailable</span> төлөвтэй өдрүүдэд
          таны зогсоолд захиалга авах боломжгүйгээр тохируулна.
        </p>
        <p className="mb-4">
          2.<span style={{color: 'green'}}> Боломжтой /Available/</span>-
          энэхүү төлвөөр та өөрийн зогсоолын сул байдаг цагийг долоо хоног болон
          сарын календарь дээр тохируулна.{' '}
          <span style={{color: 'green'}}> Avalaible</span> төлөвтэй өдрүүдэд
          ирсэн захиалгыг систем автоматаар баталгаажуулж, захиалгын мэдээллийг
          танд мэдэгдэнэ.
        </p>
        <p>
          3. <span style={{color: 'yellow'}}>Хүсэлт авах /Requested/</span> -
          энэхүү төлвөөр та өөрийн зогсох магадлалтай өдрүүдийг долоо хоног
          болон сарын календарь дээр тохируулна.{' '}
          <span style={{color: 'yellow'}}> Requested </span> төлөвтэй өдрүүд
          хамаарсан захиалгыг танд хүсэлт байдлаар илгээж, та өөрийн захиалга
          хэсгээс тухайн захиалгын мэдээллийг хянаж хүсэлтийг баталгаажуулах,
          засварлан баталгаажуулах, цуцлах боломжтой.
        </p>
      </div>
      <div className={' w-full bg-[#F8FAFC] '}>
        <div className={'flex flex-col '}>
          <div
            className={' lg:text-3xl md:text-xl sm:text-base sm:ml-4 lg:ml-32 text-[#35446D]'}
          >
            Авто зогсоолдоо хэрхэн бүртгүүлэх вэ?
          </div>
          <div style={{height: '20px'}}></div>
          <div
            className={'grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1  '}
          >
            <div className="flex flex-col">
              <div className={'grid grid-row-1 mt-8'}>
                <img
                  src="/2.png"
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
                <div
                  className={'place-self-center text-center stepDesc text-[#0013D4]'}
                >
                  Алхам 1 | МЭДЭЭЛЭЛ БҮРДҮҮЛЭХ
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className={'grid grid-row-2 mt-8'}>
                <img
                  src="/1.png"
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
                <div
                  className={'place-self-center text-center stepDesc text-[#0013D4]'}
                >
                  Алхам 2 | БҮРТГҮҮЛЭХ эсвэл НЭВТРЭХ
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className={'grid grid-row-2 mt-8'}>
                <img
                  src="/3.png"
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
                <div
                  className={'place-self-center text-center stepDesc text-[#0013D4]'}
                >
                  Алхам 3 | АВТО ЗОГСООЛ БҮРТГҮҮЛЭХ
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className={'grid grid-row-3'}>
                <img
                  src="/4.png"
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
                <div
                  className={'place-self-center text-center stepDesc text-[#0013D4]'}
                >
                  Алхам 4 | БАТАЛГААЖУУЛАХ
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className={'grid grid-row-2'}>
                <img
                  src="/5.png"
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
                <div
                  className={'place-self-center text-center stepDesc text-[#0013D4]'}
                >
                  Алхам 5 | ЗОГСООЛ ТҮРЭЭСЛҮҮЛЭХ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full  justify-around mt-[36px]'>
        <div className="mt-[151px]">
          <p className="w-[475px]">ТА ӨӨРИЙН АВТО ЗОГСООЛЫГ БҮРТГҮҮЛЭХИЙГ ХҮСЭЖ БАЙВАЛ ДАРААХ ШААРДЛАГЫГ ХАНГАСАН БАЙХ ЁСТОЙ.</p>
          <div className="ml-[35px]">
            <div className='flex justify-start mt-[38px]'>
              <div className="mr-[32px]"> <Image preview={false} src="/images/icon/breakpoint.png" /> </div>
              <div>Нийтийн зориулалттай авто зогсоол байх</div>
            </div>
            <div className='flex justify-start mt-[18px] mb-[18px] '>
              <div className="mr-[32px]"> <Image preview={false} src="/images/icon/breakpoint.png" /> </div>
              <div>Авто зогсоолын тэмдэг, тэмдэглэгээ хийгдсэн байх </div>
            </div>
            <div className='flex justify-start items-center'>
              <div className="mr-[32px]"> <Image preview={false} src="/images/icon/breakpoint.png" /> </div>
              <div className=" w-[350px]">Орох хаалга Чип, дугаар таньдаг, удирдлагатай тохиолдолд бүртгэл бүхий хотхон байх</div>
            </div>

          </div>
          <div className="mt-[50px]">
            <Link href="/spaceowner">
              <a className="bodyBtn ">Бүртгүүлэх</a>
            </Link>
          </div>

        </div>
        <div>
          <Image preview={false} width={555} height={555} src="/images/parking.png" />
        </div>

      </div>
      <div className="h-[300px] w-full bg-[#F8FAFC]">
        <div className=" text-[34px] mt-[36px] ml-[165px]">Үл хөдлөх хөрөнгө хөгжүүлэгчид</div>
        <div className="flex  justify-around mt-[72px]">
          <div> <Image src="/images/teso.png" /> </div>
          <div> <Image src="/images/hurd.png" /> </div>
          <div> <Image src="/images/camder.png" /> </div>
          <div> <Image src="/images/const.png" /> </div>
          <div> <Image src="/images/ncd.png" /> </div>
          <div> <Image src="/images/im.png" /> </div>
        </div>
      </div>
      <div className='flex w-full  justify-around mt-[36px]'>
        <div>
          <Image preview={false} width={555} height={555} src="/images/parking2.png" />
        </div>
        <div className="mt-[151px]">
          <p className="w-[475px]">ХӨГЖҮҮЛСЭН БОЛОН ХӨГЖҮҮЛЖ БУЙ ТӨСЛҮҮДИЙНХЭЭ ТАЛААРХ МЭДЭЭЛИЙГ МАНАЙ СИСТЕМД НЭГТГЭСНЭЭР ТАНАЙ КОМПАНИД ДАРААХ БОЛОМЖУУД ҮҮСНЭ.</p>
          <div className="ml-[35px]">
            <div className='flex justify-start mt-[38px]'>
              <div className="mr-[32px]"> <Image preview={false} src="/images/icon/breakpoint.png" /> </div>
              <div>Зарагдаагүй зогсоолын орлогын урсгал бүхий бүтээгдэхүүн болгох</div>
            </div>
            <div className='flex justify-start mt-[18px] mb-[18px] '>
              <div className="mr-[32px]"> <Image preview={false} src="/images/icon/breakpoint.png" /> </div>
              <div>Оршин суугчдын авто зогсоолын хүрэлцээг нэмэгдүүлэх </div>
            </div>
            <div className='flex justify-start items-center'>
              <div className="mr-[32px]"> <Image preview={false} src="/images/icon/breakpoint.png" /> </div>
              <div className=" w-[350px]">Орон сууцны борлуулалтын дэмжлэг болгон ашиглах боломж үүснэ </div>
            </div>

          </div>
          <div className="mt-[50px]">
            <Link href="/spaceowner">
              <a className="bodyBtn ">Бүртгүүлэх</a>
            </Link>
          </div>

        </div>


      </div>

      <div className="mt-64">
        <Footer />
      </div>
    </div>
  );
};

export default SpaceOwner;
