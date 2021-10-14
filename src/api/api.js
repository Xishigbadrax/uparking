import axios from 'axios';
import {showMessage} from '../utils/message';
import {
  messageType,
  defaultMsg,
  dataType,
  searchOp,
} from '@constants/constants';
import baseAxios from './baseAxios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASEURL;

/* #region Datatable, Form main funtions */
const sListInfo = async (code) => {
  // return callGet(`slist/info/${code}`);
};

const sList = async (data) => {
  if (!data.pagination) {
    data.pagination = {
      current: 1,
    };
  }

  if (data.customFilter) {
    const customFilter = data.customFilter;
    delete data.customFilter;
    customFilter.map((cfil) => {
      data.filter = {
        [cfil.key]: {
          filterType: cfil.type ? cfil.type : dataType.NUMBER,
          filter: cfil.val,
          type: searchOp.EQUALS,
        },
      };
    });
  }

  return callPost(`slist/${data.code}`, data);
};

const deleteSList = async (code, id) => {
  return callPost(`ds/crud/delete/${code}`, {id: id});
};

/* #endregion */

const callGet = async (command) => {
  const result = await baseAxios.get(command);
  if (result.status === 200) return result.data;
  if (result.status === 201) return result.data;
  else return result.data;
};

const execData = async (code, data, child, deletedIds) => {
  return callPost(`ds/crud/exec/${code}`, {
    data: Array.isArray(data) ? data : [data],
    child: child,
    deletedIds: deletedIds,
  });
};

const callPost = async (command, data) => {
  const result = await baseAxios.post(command,data);
  if (result.status === 403) {
    // console.log(1111111);
    showMessage(messageType.FAILED.type, result.message);
    return result.message;
  }else if(result.status === 400){
     return  result.data;
  }else if(result.status === 500){
    return result;
  }
  if ((result.status !== 200 && result.status !== 201) || !result.data) {
    // console.log(result.error);
    // console.log("dsfsdfdsfdsfdsf");
    showMessage(
      messageType.FAILED.type,
      typeof result.error != 'undefined' ? result.error : defaultMsg.error,
    );
    return defaultMsg.error;
  }
  const resultData = result.data;
  if (resultData.status) {
    if (resultData.msgList && resultData.msgList.length > 0) {
      resultData.msgList.map((m) => {
        showMessage(resultData.status, m.text);
      });
    } else {
      showMessage(
        resultData.status,
        defaultMsg[resultData.status.toLowerCase()],
      );
    }
  }
  return resultData;
};

const apiList = {
  userUpdate: '/user/update',
};

export {sListInfo, sList, deleteSList, callGet, callPost, execData, apiList};
