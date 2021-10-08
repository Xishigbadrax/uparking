import {useContext} from 'react';
import LoadingBar from 'react-top-loading-bar';
import {Layout, Spin,Card} from 'antd';
// import Header from './Header';
import WalletSidebar from './WalletSidebar';
import Context from '@context/Context';
import {LoadingOutlined} from '@ant-design/icons';

const {Content} = Layout;

// eslint-disable-next-line react/prop-types
const ProfileLayout = ({children, title, className}) => {
  // eslint-disable-next-line no-unused-vars
  const {isLoading, setIsLoading} = useContext(Context);
  const antIcon = <LoadingOutlined style={{fontSize: 40}} spin />;

  return (
    <Spin
      indicator={antIcon}
      tip="Таны хүсэлтийг боловсруулж байна. Түр хүлээнэ үү..."
      spinning={isLoading}
    >
      <Layout
        style={{maxWidth: '1400px', margin: 'auto'}}
        className={'profileLayout'}
      >
        <LoadingBar color="#109720" progress={isLoading ? 70 : 100} /> 
        <Card style={{borderRadius: '50px', height: '800px'}}>
          <WalletSidebar />
        </Card>
        <Layout style={{background: 'none'}}>
          {/* <Header /> */}
          <Content className={'profileContent'}>
            {/* {title && <h1 className="main-title">{title}</h1>} */}
            {children}
          </Content>
        </Layout>
      </Layout>
    </Spin>
  );
};
export default ProfileLayout;
