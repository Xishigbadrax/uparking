import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar"

const Driver = () => {
  return (
    <div>
      <Navbar />
      <div className={`driver `}>
        <img src="/driver.png" height="600px" width="100%"></img>
      </div>
      <div
        className={`textInfoTitle sm:ml-4 lg:ml-80 md:ml-32 lg:mt-32 md:mt-16 sm:mt-4`}
      >
        ТА ХААНА Ч ХЭЗЭЭ Ч ӨӨРТ ТОХИРОХ АВТО ЗОГСООЛЫГ ЗАХИАЛАХ БОЛОМЖТОЙ
      </div>
      <div
        className={`textInfoDesc lg:ml-80 md:ml-16 sm:ml-16 mr-64 mt-8`}
      >
        Хаана ч хэзээ ч өөрт тохирох зогсоолыг түрээслэн өөрийн машинаа
        байршуулах боломжийг Uparking авто зогсоолын түрээсийн систем танд
        олгоно. Та өөрийн тээврийн хэрэгслээ байршуулах байршил, түрээсийн төрөл
        болох Өдөр, Шөнө, Бүтэн өдрөөс сонгон хугацаагаа оруулан хайлтын
        илэрцүүдээс өөрт тохирох зогсоолыг сонгон, төлбөрөө урьдчилан төлж
        захиалах боломжтой. Үүний тулд та систем дээр бүртгэл үүсгэн, тээврийн
        хэрэгслээ бүртгүүлсэн байхад хангалттай.{" "}
      </div>

      <div
        className={`howToUse md:ml-16 lg:ml-40 lg:mt-64 md:mt-32 sm:mt-96`}
      >
        <div className={`flex flex-col `}>
          <div
            className={`howToUseTitle lg:text-3xl md:text-xl sm:text-base sm:ml-4 lg:ml-32`}
          >
            Хэрхэн хэрэглэх вэ?
          </div>
          <div style={{ height: "20px" }}></div>
          <div
            className={`grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2  mt-16`}
          >
            <div className="flex flex-col">
              <div className={`grid grid-row-2`}>
                <img
                  src="/alham-1.png"
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
              <div className={`grid grid-row-2`}>
                <img
                  src="/alham-2.png"
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
              <div className={`grid grid-row-2`}>
                <img
                  src="/alham-3.png"
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
                  src="/alham-4.png"
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
                  src="/alham-5.png"
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
            <div className="flex flex-col sm:pb-10 pb-10">
              <div className={`grid grid-row-2`}>
                <img
                  src="/alham-6.png"
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
                  Алхам 6 | ЗОГСООЛЫГ ҮНЭЛЭХ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "300px" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Driver;
