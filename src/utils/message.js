import {notification} from 'antd';
import {messageType, defaultMsg} from '@constants/constants';

const showMessage = (type, description) => {
  const t = messageType[type.toUpperCase()];
  notification[t.msgType]({
    messageType: t.title,
    defaultMsg,
    description,
  });
};
export {
  showMessage,
};
