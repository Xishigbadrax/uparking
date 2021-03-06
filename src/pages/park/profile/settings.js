import {useState, useEffect, useContext} from 'react';
import ProfileLayout from '@components/layouts/ProfileLayout';
import {Switch, Modal, Input, Button, Alert} from 'antd';
import {RightOutlined} from '@ant-design/icons';
import {callGet, callPost} from '@api/api';
import Context from '@context/Context';

const Settings = () => {
  const ctx = useContext(Context);
  const [isLoginModalVisible, setisLoginModalVisible] = useState(false);
  const [isTransferModalVisible, setisTransferModalVisible] = useState(false);
  const [isTransferModalVisible2, setisTransferModalVisible2] = useState(false);
  const [password, setpassword] = useState(null);
  const [oldPass, setoldPass] = useState(null);
  const [transferOldPass, setTransferOldPass] = useState(null);
  const [transferNewPass, setTransferNewPass] = useState(null);

  const [matchPassword, setmatchPassword] = useState(null);
  const [message, setmessage] = useState(null);
  const [messageShow, setmessageShow] = useState(false);
  const [messageShow2, setmessageShow2] = useState(false);
  const [title, settitle] = useState(null);
  const [status, setstatus] = useState(null);

  const [value2, setvalue2] = useState(false);
  const [value3, setvalue3] = useState(false);
  const [value4, setvalue4] = useState(false);
  const [value5, setvalue5] = useState(false);
  const [value6, setvalue6] = useState(false);
  const [value7, setvalue7] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [formData, setformData] = useState({
    label: null,
    state: null,
  });

  // eslint-disable-next-line no-unused-vars
  const [isTrust, setisTrust] = useState(false);
  const {userdata} = useContext(Context);
  const [userRealData, setUserRealData] = useState('');

  useEffect(async () => {
    if (typeof userdata.firstName != 'undefined') {
      setUserRealData(userdata);
    }
  }, [userdata]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await callGet('/user/config', null);
      setvalue4(res.isFingerPrintPS);
      setvalue2(res.isFingerPrintUserInfo);
      setvalue3(res.isFingerPrintVehicle);
      setvalue5(res.isTransactionPassBooking);
      setvalue6(res.isTransactionPassWallet);
      setvalue7(res.isTransactionPassTransfer);
      // setdatas(res)
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, []);

  // const showPhoneModal = () => {
  //   setIsPhoneModalVisible(true);
  // };
  const showLoginModal = () => {
    setisLoginModalVisible(true);
  };
  const showTransferModal = () => {
    setisTransferModalVisible(true);
  };
  const handleCancel = () => {
    setmessageShow2(false);
    setisLoginModalVisible(false);
    setisTransferModalVisible(false);
    setisTransferModalVisible2(false);
    setmessageShow(false);
  };
  const submit = async (label, state) => {
    ctx.setIsLoading(true);
    formData.label = label;
    formData.state = state;
    const res = await callPost('/user/config', formData);
    ctx.setIsLoading(false);
  };
  const submit2 = async () => {
    if (transferNewPass && transferNewPass.length == 4) {
      ctx.setIsLoading(true);
      const formData = {
        transactionPassword: transferNewPass,
        userPhoneNumber: userRealData.phoneNumber,
      };
      await callPost('/register/transactionpass', formData).then((res) => {
        if (res.status == 'success') {
          setisTrust(false);
          setTransferNewPass('');
          setmessageShow2(true);
          settitle(res.status);
          setmessage('???????? ???????????????????? ???????? ???? ?????????????????? ??????????????????');
        } else {
          setmessageShow(true);
          setmessage(res);
          settitle('??????????????????????');
          setstatus('warning');
        }
        ctx.setIsLoading(false);
      });
    } else {
      setmessageShow(true);
      setmessage('???????????? ?????????????? ?????? ?????????????? ????');
      settitle('??????????????????????');
      setstatus('warning');
    }
  };
  const checkPass = async () => {
    ctx.setIsLoading(true);
    await callGet(
      `/user/check/transactionpass?rawPass=${transferOldPass}`,
      null,
    ).then((res) => {
      if (res.status == 'success') {
        setoldPass('');
        setisTrust(true);
        setisTransferModalVisible2(true);
      } else {
        setmessageShow(true);
        setmessage(res.error);

        setoldPass('');
        settitle('??????????????????????');
        setstatus('warning');
      }
      ctx.setIsLoading(false);
    });
  };
  return (
    <ProfileLayout>
      <Modal
        footer={[
          <>
            <Button
              onClick={async () => {
                await callGet(
                  `/user/check/password?rawPass=${oldPass}`,
                  null,
                ).then(async (res) => {
                  if (res.status !== 'success') {
                    const formData = {
                      password: password,
                      passwordRepeat: matchPassword,
                    };
                    await callPost('/user/changepassword', formData).then(
                      (res2) => {
                        if (res.status == 'success') {
                          setmessageShow2(true);
                          setisLoginModalVisible(false);
                          setmessage(res2.error);
                          settitle('Success');
                        } else {
                          setmessageShow(true);
                          setmessage(res2.error);
                          settitle('??????????????????????');
                          setstatus('warning');
                        }
                      },
                    );
                  } else {
                    setmessageShow(true);
                    setmessage(res.error);
                    settitle('??????????????????????');
                    setstatus('warning');
                  }
                });
              }}
              type="primary"
              block
            >
            ????????????????
            </Button>
          </>,
        ]}
        onCancel={handleCancel}
        width="400px"
        title="???????? ???? ??????????"
        visible={isLoginModalVisible}
      >
        <Input
          type="password"
          onChange={(e) => setoldPass(e.target.value)}
          style={input}
          placeholder="???????????? ???????? ????"
        />
        <Input
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          style={input}
          placeholder="???????? ???????? ????"
        />
        <Input
          type="password"
          onChange={(e) => setmatchPassword(e.target.value)}
          style={input}
          placeholder="???????? ???????? ???? ????????????"
        />
      </Modal>

      <Modal
        footer={[
          <>
            <Button onClick={() => checkPass()} type="primary" block>
            ????????????????????????
            </Button>
          </>,
        ]}
        onCancel={handleCancel}
        width="400px"
        title="???????????????????? ???????? ???? ??????????"
        visible={isTransferModalVisible}
      >
        <p style={{fontSize: '16px', color: '#35446D', textAlign: 'center'}}>
          ???? ???????????? ???????????????????? ???????? ???????? ?????????????? ????
        </p>
        <Input
          style={input}
          type="password"
          onChange={(e) => setTransferOldPass(e.target.value)}
          placeholder="???????????????????? ???????? ????"
        />
      </Modal>
      <Modal
        footer={[
          <>
            <Button onClick={() => submit2()} type="primary" block>
            ????????????????
            </Button>
          </>,
        ]}
        onCancel={handleCancel}
        width="400px"
        title="???????????????????? ???????? ???? ??????????"
        visible={isTransferModalVisible2}
      >
        <p style={{fontSize: '16px', color: '#35446D', textAlign: 'center'}}>
          ???? ???????? ???????????????????? ???????? ???????? ?????????????? ????
        </p>
        <Input
          style={input}
          type="password"
          onChange={(e) => setTransferNewPass(e.target.value)}
          placeholder="???????????????????? ???????? ????"
        />
      </Modal>

      <div style={{width: 785}}>
        <div>
          <p style={style}>?????????????? ??????, ???????? ????</p>
        </div>

        <div onClick={showLoginModal} style={style3}>
          <div>?????????????? ???????? ???? ??????????</div>
          <div>
            <RightOutlined />
          </div>
        </div>
        <p style={style}>???????? ???? ??????????????</p>
        <div style={style2}>
          <div>???????????? ???????????????? ???????????????? , isFingerPrintUserInfo</div>
          <div>
            <Switch
              checked={value2}
              onClick={async () => {
                setvalue2(!value2), submit('isFingerPrintUserInfo', !value2);
              }}
            />
          </div>
        </div>
        <div style={style2}>
          <div>???????????????? ???????????????????? ???????????????? ????????????????, isFingerPrintVehicle</div>
          <div>
            <Switch
              checked={value3}
              onClick={async () => {
                setvalue3(!value3), submit('isFingerPrintVehicle', !value3);
              }}
            />
          </div>
        </div>
        <div style={style2}>
          <div>???????? ?????????????????? ???????????????? ????????????????, isFingerPrintPS</div>
          <div>
            <Switch
              checked={value4}
              onClick={async () => {
                setvalue4(!value4), submit('isFingerPrintPS', !value4);
              }}
            />
          </div>
        </div>
        <p style={style}>???????????????????? ???????? ????</p>
        <div style={style2}>
          <div>?????????????????? ???????????? ?????????? ,isTransactionPassBooking</div>
          <div>
            <Switch
              checked={value5}
              onClick={async () => {
                setvalue5(!value5), submit('isTransactionPassBooking', !value5);
              }}
            />
          </div>
        </div>

        <div style={style2}>
          <div>?????????????????? ??????????, isTransactionPassWallet</div>
          <div>
            <Switch
              checked={value6}
              onClick={async () => {
                setvalue6(!value6), submit('isTransactionPassWallet', !value6);
              }}
            />
          </div>
        </div>

        <div style={style2}>
          <div>?????????????????? isTransactionPassTransfer</div>
          <div>
            <Switch
              checked={value7}
              onClick={async () => {
                setvalue7(!value7),
                submit('isTransactionPassTransfer', !value7);
              }}
            />
          </div>
        </div>
        <div onClick={showTransferModal} style={style3}>
          <div>???????????????????? ???????? ???? ??????????</div>
          <div>
            <RightOutlined />
          </div>
        </div>
      </div>
      <Modal
        visible={messageShow}
        title="????????????????"
        onCancel={handleCancel}
        footer={[]}
      >
        <Alert message={title} description={message} type={status} />
      </Modal>
      <Modal
        visible={messageShow2}
        title="????????????????"
        onCancel={handleCancel}
        footer={[]}
      >
        <Alert message={title} description={message} type={status} />
      </Modal>
    </ProfileLayout>
  );
};

const input = {
  height: '56px',
  margin: '5px 0px',
};

const style = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#35446D',
  height: '48px',
};
const style2 = {
  display: 'flex',
  justifyContent: 'space-between',
  height: '48px',
};
const style3 = {
  display: 'flex',
  justifyContent: 'space-between',
  height: '48px',
  cursor: 'pointer',
};

export default Settings;
