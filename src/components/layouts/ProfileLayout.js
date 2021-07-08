import { useContext, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { Layout, Spin } from "antd";
// import Header from './Header';
import Sidebar from "./Sidebar";
import Context from "@context/Context";
import { LoadingOutlined } from "@ant-design/icons";

const { Content } = Layout;

const ProfileLayout = ({ children, title, className }) => {
  const { isLoading, setIsLoading } = useContext(Context);
  const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

  return (
    <Spin
      indicator={antIcon}
      tip="Таны хүсэлтийг боловсруулж байна. Түр хүлээнэ үү..."
      spinning={isLoading}
    >
      <Layout
        style={{ maxWidth: "1200px", margin: "auto" }}
        className={"profileLayout"}
      >
        <LoadingBar color="#109720" progress={isLoading ? 70 : 100} />
        <Sidebar />
        <Layout style={{ background: "none" }}>
          {/* <Header /> */}
          <Content
            className={className !== undefined ? className : "main-content"}
          >
            {title && <h1 className="main-title">{title}</h1>}
            {children}
          </Content>
        </Layout>
      </Layout>
    </Spin>
  );
};

export default ProfileLayout;
