import Footer from "../../components/Footer";
const SpaceOwner = () => {
  return (
    <div>
      <div className={`background `}>
        <img src="/zogsoolEzemshigch.png" height="600px" width="100%" />
      </div>
      <div className={`textInfo mt-4`}>
        ТАНЫ АВТО ЗОГСООЛ НЭМЭЛТ ОРЛОГО ОЛОХ БОЛОМЖ
      </div>
      <div className="textInfoDesc">
        Илүү үр ашигтай зогсоол ашиглалтын менежментийг энэхүү систем танд
        олгож, орлогын нэмэлт эх үүсгэвэрийг бий болгоно. Uparking нь зогсоол
        эзэмшигч танд өөрийн зогсоолыг ашиглахгүй байгаа үедээ бусдад түрээслэх
        боломжийг олгох бөгөөд та өөрийн зогсоолын түрээслэх өдрүүдийг систем
        дээр Өдөр |09:00-18:30| болон Шөнийн |19:00-08:30| цагийн хуваарьт
        оруулснаар таны зогсоолыг тухайн өдрүүдэд зогсоол түрээслэгчид санал
        болгоно.
        <p className="mt-4">
          ТА ӨӨРИЙН ЗОГСООЛЫН ТӨЛВИЙГ ӨДӨР БҮРЭЭР 3 ТӨЛӨВТ АНГИЛНА.{" "}
        </p>
        <p style={{ textAlign: "justify" }}>
          1.<span style={{ color: "red" }}> Боломжгүй /Unavailable/</span> -
          энэхүү төлвөөр та өөрийн зогсдог цагийг долоо хоног болон сарын
          календарь дээр тохируулна. Систем{" "}
          <span style={{ color: "red" }}>Unavailable</span> төлөвтэй өдрүүдэд
          таны зогсоолд захиалга авах боломжгүйгээр тохируулна.
        </p>
        <p>
          2.<span style={{ color: "green" }}> Боломжтой /Available/</span>-
          энэхүү төлвөөр та өөрийн зогсоолын сул байдаг цагийг долоо хоног болон
          сарын календарь дээр тохируулна.{" "}
          <span style={{ color: "green" }}> Avalaible</span> төлөвтэй өдрүүдэд
          ирсэн захиалгыг систем автоматаар баталгаажуулж, захиалгын мэдээллийг
          танд мэдэгдэнэ.
        </p>
        <p>
          3. <span style={{ color: "yellow" }}>Хүсэлт авах /Requested/</span> -
          энэхүү төлвөөр та өөрийн зогсох магадлалтай өдрүүдийг долоо хоног
          болон сарын календарь дээр тохируулна.{" "}
          <span style={{ color: "yellow" }}> Requested </span> төлөвтэй өдрүүд
          хамаарсан захиалгыг танд хүсэлт байдлаар илгээж, та өөрийн захиалга
          хэсгээс тухайн захиалгын мэдээллийг хянаж хүсэлтийг баталгаажуулах,
          засварлан баталгаажуулах, цуцлах боломжтой.
        </p>
      </div>
      <div className={`howToUse md:ml-16 lg:ml-40`}>
        <div className={`flex flex-col `}>
          <div
            className={`howToUseTitle lg:text-3xl md:text-xl sm:text-base sm:ml-4 lg:ml-32`}
          >
            Авто зогсоолдоо хэрхэн бүртгүүлэх вэ?
          </div>
          <div style={{ height: "20px" }}></div>
          <div
            className={`grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1  `}
          >
            <div className="flex flex-col">
              <div className={`grid grid-row-1 mt-8`}>
                <img
                  src="/2.png"
                  className="place-self-center"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    zIndex: "0",
                    position: "relative",
                    boxSizing: "border-box",
                  }}
                />
                <div style={{ height: "12px" }}></div>
                <div
                  className={`place-self-center text-center stepDesc`}
                >
                  Алхам 1 | БҮРТГҮҮЛЭХ эсвэл НЭВТРЭХ
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className={`grid grid-row-2 mt-8`}>
                <img
                  src="/1.png"
                  className="place-self-center"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    zIndex: "0",
                    position: "relative",
                    boxSizing: "border-box",
                  }}
                />
                <div style={{ height: "12px" }}></div>
                <div
                  className={`place-self-center text-center stepDesc`}
                >
                  Алхам 2 | ЗОГСООЛ ХАЙХ
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className={`grid grid-row-2 mt-8`}>
                <img
                  src="/3.png"
                  className="place-self-center"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    zIndex: "0",
                    position: "relative",
                    boxSizing: "border-box",
                  }}
                />
                <div style={{ height: "12px" }}></div>
                <div
                  className={`place-self-center text-center stepDesc`}
                >
                  Алхам 3 | СОНГОХ
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className={`grid grid-row-3`}>
                <img
                  src="/4.png"
                  className="place-self-center"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    zIndex: "0",
                    position: "relative",
                    boxSizing: "border-box",
                  }}
                />
                <div style={{ height: "12px" }}></div>
                <div
                  className={`place-self-center text-center stepDesc`}
                >
                  Алхам 4 | ТӨЛБӨР ТӨЛӨХ
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className={`grid grid-row-2`}>
                <img
                  src="/5.png"
                  className="place-self-center"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    zIndex: "0",
                    position: "relative",
                    boxSizing: "border-box",
                  }}
                />
                <div style={{ height: "12px" }}></div>
                <div
                  className={`place-self-center text-center stepDesc`}
                >
                  Алхам 5 | ЗОГСООЛД БАЙРШУУЛАХ
                </div>
              </div>
            </div>
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
