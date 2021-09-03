const Footer = () => {
  return (
    <div>
      <div className={'grid lg:grid-cols-3 md:pl-16 pl-16 footer1'}>
        <div style={{height: 'auto'}}>
          <img className="lg:mx-auto pt-7" src="/logo.png" />
        </div>
        <div className="lg:grid col-span-2 lg:grid-cols-5 py-6 md:space-y-6 space-y-6 lg:space-y-0">
          <div className="flex lg:flex-col md:flex-row md:space-x-5 flex-row space-x-5 lg:space-x-0 lg:justify-around lg:justify-self-center">
            <div>
              <img src="../icons/facebook.png" />
            </div>
            <div>
              <img src="../icons/instagram.png" />
            </div>
            <div>
              <img src="../icons/youtube.png" />
            </div>
            <div>
              <img src="../icons/Twitter.png" />
            </div>
            <div>
              <img src="../icons/invision.png" />
            </div>
          </div>
          <div className="flex flex-col justify-around md:space-y-1 space-y-1 lg:space-y-0">
            <div className="footerHeadTitle">Компани</div>
            <div className="footerTitle">Бидний тухай</div>
            <div className="footerTitle">Хамт олон</div>
            <div className="footerTitle">Ажлын байр</div>
            <div className="footerTitle">Мэдээ, мэдээлэл</div>
          </div>
          <div className="flex flex-col justify-around md:space-y-1 space-y-1 lg:space-y-0">
            <div className="footerHeadTitle">Үйл ажиллагаа</div>
            <div className="footerTitle">Жолооч</div>
            <div className="footerTitle">Авто зогсоол эзэмшигч</div>
            <div className="footerTitle">Хотхон бүртгүүлэх</div>
            <div className="footerTitle">Хамтран ажиллах</div>
          </div>
          <div
            style={{maxWidth: '70%'}}
            className="flex flex-col justify-around md:space-y-2 space-y-2"
          >
            <div className="footerHeadTitle">Холбоо барих</div>
            <div>
              <div className="footerLitleTitle">
                Info@uparking.mn
              </div>
              <div className="footerLitleTitle">
                + 976 7744 0606
              </div>
            </div>
            <div style={{height: 'auto'}} className="footerLitleTitle">
              Монгол улс, Улаанбаатар хот, Сүхбаатар дүүрэг, 7-р хороо, Алтайн
              гудамж 281, Хоймор оффис, 1408 тоот
            </div>
          </div>
          <div className="flex flex-col justify-around md:space-y-2 space-y-2 lg:space-y-0">
            <div className="footerHeadTitle">Апп татах</div>
            <div>
              <img src="/app.png" />
            </div>
            <div>
              <img src="/play-store.png" />
            </div>
          </div>
        </div>
      </div>
      <div
        className={'grid md:grid-cols-1 lg:grid-cols-2  $"footerEnd}'}
      >
        <div className="flex justify-center my-auto py-5">
          <p className="footerEndText">
            &copy; Copyright Uparking {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex flex-rows my-auto py-3">
          <p className="footerEndText">Үйлчилгээний нөхцөл</p>
          <p className="footerEndText">Нууцлалын бодлого</p>
          <p className="footerEndText">Цуцлалтын бодлого</p>
        </div>
      </div>
      {/* <div className={`flex flex-row $"footer1}`}>
            <div className={` $"footerLogo}`}>
                <img src='/logo.png' />
            </div>
            <div style={{ height: '70%' }} className='w-full my-auto'>
                <div className='grid grid-cols-5 h-full'>
                    <div className='flex flex-col justify-between'>
                        <div><img src='/icons/facebook.png' /></div>
                        <div><img src='icons/instagram.png' /></div>
                        <div><img src='icons/youtube.png' /></div>
                        <div><img src='icons/Twitter.png' /></div>
                        <div><img src='icons/invision.png' /></div>
                    </div>
                    <div className='flex flex-col justify-between'>
                        <div className="footerHeadTitle}>Компани</div>
                        <div className="footerTitle}>Бидний тухай</div>
                        <div className="footerTitle}>Хамт олон</div>
                        <div className="footerTitle}>Ажлын байр</div>
                        <div className="footerTitle}>Мэдээ, мэдээлэл</div>
                    </div>
                    <div className='flex flex-col justify-between'>
                        <div className="footerHeadTitle}>Үйл ажиллагаа</div>
                        <div className="footerTitle}>Жолооч</div>
                        <div className="footerTitle}>Авто зогсоол эзэмшигч</div>
                        <div className="footerTitle}>Хотхон бүртгүүлэх</div>
                        <div className="footerTitle}>Хамтран ажиллах</div>
                    </div>
                    <div style={{ maxWidth: '70%' }} className='flex flex-col justify-between'>
                        <div className="footerHeadTitle}>Холбоо барих</div>
                        <div>
                            <div className={`$"footerLitleTitle}`}>Info@uparking.mn</div>
                            <div className={`$"footerLitleTitle}`}>+ 976 7744 0606</div>
                        </div>
                        <div style={{ height: 'auto' }} className="footerLitleTitle}>Монгол улс, Улаанбаатар хот, Сүхбаатар дүүрэг, 7-р хороо, Алтайн гудамж 281, Хоймор оффис, 1408 тоот</div>
                    </div>
                    <div className='flex flex-col justify-between'>
                        <div className="footerHeadTitle}>Апп татах</div>
                        <div><img src='/app.png' /></div>
                        <div><img src='/play-store.png' /></div>
                    </div>
                </div>
            </div>
        </div>
        <div className={`grid grid-cols-2  $"footerEnd}`}>
            <div className='flex justify-center my-auto'>
                <p className="footerEndText}>&copy; Uparking {(new Date().getFullYear())}</p>
            </div>
            <div className='flex flex-rows my-auto'>
                <p className="footerEndText}>Үйлчилгээний нөхцөл</p>
                <p className="footerEndText}>Нууцлалын бодлого</p>
                <p className="footerEndText}>Цуцлалтын бодлого</p>
            </div>
        </div> */}
    </div>
  );
};

export default Footer;
