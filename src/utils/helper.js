// import {Alert} from 'react-native';
import { message as Message } from 'antd'

export default class Helper {
  // static showSimpleAlert(title, body) {
  //   Alert.alert(title, body, [{text: 'Хаах'}], {cancelable: false});
  // }
  static formatDatetime(input) {
    if (input) {
      var t = new Date(input);
      let month = ('00' + (t.getMonth() + 1)).slice(-2);
      let day = ('00' + t.getDate()).slice(-2);
      return t.getFullYear() + '/' + month + '/' + day;
    }
    return input;
  }
  static removeSec(input) {
    if (input) {
      return input.slice(0, -3);
    }
  }
  static removeMinute(input) {
    if (input) {
      return input.slice(0, -6);
    }
  }
  static removeTime(input) {
    if (input) {
      return input.slice(0, -9);
    }
  }
  static formatDatetimeTZ(input) {
    if (input) {
      // input = input.split('+')[0];
      var t = new Date(Date.parse(input));
      let month = ('00' + (t.getMonth() + 1)).slice(-2);
      let day = ('00' + t.getDate()).slice(-2);
      let minutes = ('00' + (t.getMinutes() + 1)).slice(-2);
      let seconds = ('00' + t.getSeconds()).slice(-2);
      return `${t.getFullYear()}-${month}-${day} ${t.getHours()}:${minutes}:${seconds}`;
    }
    return input;
  }
  static formatOrderDatetime(input) {
    if (input) {
      input = input.split('+')[0];
      var t = new Date(input);
      let month = ('00' + (t.getMonth() + 1)).slice(-2);
      let day = ('00' + t.getDate()).slice(-2);
      return `${month}-р сарын ${day}`;
    }
    return input;
  }
  static date(input) {
    if (input) {
      input = input.split(' ');
      //   console.log(input);
      const t = new Date(input[0]);
      //   var t = new Date(input);
      //   var t = Date.parse(input);
      //   console.log(t);
      let month = ('00' + (t.getMonth() + 1)).slice(-2);
      let day = ('00' + t.getDate()).slice(-2);
      return `${month}-р сарын ${day}`;
    }
    return input;
  }
  static yearDate(input) {
    if (input) {
      input = input.split('+')[0];
      var t = new Date(Date.parse(input));
      let month = ('00' + (t.getMonth() + 1)).slice(-2);
      let day = ('00' + t.getDate()).slice(-2);
      return `${t.getFullYear()}-${month}-${day}`;
    }
    return input;
  }
  static time(input) {
    if (input) {
      input = input.split(' ');
      input = input[1].split(':');
      return `${input[0]}:${input[1]}`;
    }
    return input;
  }
  static formatDatetimeT(input) {
    if (input) {
      input = input.split('+')[0];
      var t = new Date(Date.parse(input));
      let month = ('00' + (t.getMonth() + 1)).slice(-2);
      let day = ('00' + t.getDate()).slice(-2);
      let minutes = ('00' + (t.getMinutes() + 1)).slice(-2);
      let seconds = ('00' + t.getSeconds()).slice(-2);
      return `${t.getFullYear()}/${month}/${day}\n${t.getHours()}:${minutes}:${seconds}`;
    }
    return input;
  }
  static getMonthDays(input) {
    let value = {
      month: '',
      day: '',
    };
    if (input) {
      var t = new Date(input);
      let month = t.getMonth() + 1;
      let day = t.getDate();
      value = {
        month: month,
        day: day,
      };
    }
    return value;
  }
  static getDiffDays(start, end) {
    let days = 0;
    if (start && end) {
      // var start1 = new Date(start);
      var end1 = new Date(end);
      // let diff = end1.getTime() - start1.getTime();
      let diff = end1.getTime() - start;
      days = Math.floor(diff / (1000 * 60 * 60 * 24));
    }
    return days;
  }
  static formatValue(input) {
    if (input != null) {
      input = Math.round(input);
      input = String(input)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, ',');
    }
    return input;
  }
  static formatValueReverse(input) {
    if (input) {
      input = Math.round(input);
      input = String(input).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return 0;
    }
    return input;
  }

  static clearSpaces(input) {
    if (input) {
      input = String(input).replace(/ /g, '');
    }
    return input;
  }
  static repeatStringNumTimes(string) {
    var repeatedString = '';
    times = string.length;
    while (times > 0) {
      repeatedString += string;
      times--;
    }
    return repeatedString;
  }


// import moment from 'moment'
// import axios from 'axios'
static uniqueId () {
  return '_' + Math.random().toString(36).substr(2, 9)
}
static isNull (value) {
  return value === undefined || value === null
}
static isNullOrEmpty (values) {
  return this.isNull(values) || values.length === 0;
}
static isNullOrWhitespace (value) {
  return isNull(value) || value.trim() === ''
}
static getRouteTitles (name, vue) {
  let titles = []
  for (const menu of vue.$store.state.menuDatas) {
    if (
      menu.items !== null &&
      menu.items !== undefined &&
      menu.items.length > 0
    ) {
      for (const item of menu.items) {
        if (item.name === name) {
          titles = [menu.title, `<span> / ${item.title}</span>`]
          break
        }
      }
    } else if (menu.name === name) {
      titles = [`<span>${menu.title}</span>`]
      break
    }
  }
  return titles
}
static downloadExcel (
  name,
  headers,
  lq,
  headerText,
  subLabel,
  subText
) {
  const listQuery = Object.assign(
    {
      columns: [],
      headerText,
      subLabel,
      subText
    },
    lq
  )
  for (const header of headers) {
    listQuery.columns.push({
      header: header.text,
      key: header.value,
      width: 10,
      hidden: false
    })
  }
  // const response = await axios.create({responseType: 'blob'}).get(`/api/executeQueryExcel/${name}`, { params: {listQuery}})
  // var url = URL.createObjectURL(response.data)
  // downloadURI(url, moment().format('YYYYMMDDHHmm') + '.xlsx')
}
static viewPdf (departmentCode, documentRegId) {
  // const response = await axios.create({responseType: 'blob'}).get(`/api/executePdf`, { params: {folderName: departmentCode, fileName: documentRegId} })
  // var url = URL.createObjectURL(response.data)
  viewURI(
    `/api/executePdf?folderName=${departmentCode}&fileName=${documentRegId}`
  )
}

static viewURI (uri) {
  const link = document.createElement('a')
  // link.download = name
  link.target = '_blank'
  link.href = uri
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// function downloadURI(uri, name) {
//   var link = document.createElement("a")
//   link.download = name
//   link.href = uri
//   document.body.appendChild(link)
//   link.click()
//   document.body.removeChild(link)
// }
static strip (html) {
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.textContent || ''
}
static numberFormat (value, fixed) {
  if (isNaN(value)) {
    return value
  }
  if (fixed) {
    return value.toFixed(fixed).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  } else {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

static date2str (x, y) {
  /* eslint-disable */
  var z = {
    M: x.getMonth() + 1,
    d: x.getDate(),
    h: x.getHours(),
    m: x.getMinutes(),
    s: x.getSeconds()
  };
  y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
    return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
  })
  return y.replace(/(y+)/g, function (v) {
    return x.getFullYear().toString().slice(-v.length)
  })
  /* eslint-enable */
}
static getKeyAttributeValue (item, value) {
  for (const key in item) {
    if (key === value) {
      return item[key]
    }
  }
  return null
}

static isObject (item) {
  return typeof item === 'object' && !Array.isArray(item) && item !== null
}
static removeAtts (datas, removeAtts) {
  const removeAttributes = [
    'createdOrganizationId',
    'createdBy',
    'createdAt',
    'modifiedOrganizationId',
    'modifiedBy',
    'modifiedAt',
    '__v',
    'deleted',
    'isChanged'
  ]
  let removeCustomAtts = []
  if (!isNull(removeAtts)) {
    removeCustomAtts = removeAtts
  } else {
    removeCustomAtts = []
  }
  if (Array.isArray(datas)) {
    removeArray(datas)
  } else if (isObject(datas)) {
    removeObject(datas)
  }
}
static newId() {
  return ObjectID.generate()
}
static removeObject (datas) {
  for (const data in datas) {
    if (removeAttributes.includes(data) || removeCustomAtts.includes(data)) {
      delete datas[data]
    } else if (Array.isArray(datas[data])) {
      removeArray(datas[data])
    } else if (isObject(datas[data])) {
      removeObject(datas[data])
    }
  }
}

static removeArray (datas) {
  if (datas == null || datas.length === 0) {
    return
  }
  for (let i = 0; i < datas.length; i++) {
    if (Array.isArray(datas[i])) {
      removeArray(datas[i])
    } else if (isObject(datas[i])) {
      removeObject(datas[i], true)
    }
  }
}
static validateShowMessage (fields, vue, reg) {
  let message =
    '<p style="line-height: 20px; margin-left: -5px;">Дараах алдааг арилгана уу.</p><ul style="margin:0px;-webkit-margin-before: 0px;-webkit-margin-after: 0px;-webkit-margin-start: 15px; -webkit-margin-end: 0px; -webkit-padding-start: 0px; list-style-type: circle;">'
  for (const field in fields) {
    for (const data of fields[field]) {
      console.log(data, 'data')
      message =
        message +
        '<li style="line-height: 20px;">' +
        (!isNull(reg)
          ? '<strong>' + reg + '.' + data.field + ' </strong>'
          : '') +
        data.message +
        '</li>'
    }
  }
  message = message + '</ul>'
  Message({
    dangerouslyUseHTMLString: true,
    type: 'warning',
    message,
    duration: 5000,
    showClose: true
  })
}
static checkValidSub (tempList, formName, vue, reg) {
  let isValidSub = true
  if (isNullOrEmpty(tempList)) {
    return true
  }
  for (let i = 0; i < tempList.length; i++) {
    vue.$refs[formName + i].validate((valid, fields) => {
      if (!valid) {
        isValidSub = false
        validateShowMessage(fields, vue, reg)
      } else {
        tempList[i].editMode = false
      }
    })
  }
  return isValidSub
}
static isEqualsData (newData, oldData, ignoreAtts) {
  const ignoreAttributes = ['createdOrganizationId', 'createdBy', 'createdAt', 'modifiedOrganizationId', 'modifiedBy', 'modifiedAt', '__v', '_id', 'editMode', 'isChanged']
  let ignoreCustomAtts = []
  if (!isNull(ignoreAtts)) {
    ignoreCustomAtts = ignoreAtts
  } else {
    ignoreCustomAtts = []
  }
  console.log(ignoreCustomAtts, ' ignoreCustomAtts')
  if (Array.isArray(newData)) {
    // console.log('array', newData, oldData)
    return isEqualsArray(newData, oldData)
  } else if (isObject(newData)) {
    // console.log('object', newData, oldData)
    return isEqualsObject(newData, oldData)
  } else {
    // console.log('is equals DATA', newData, oldData)
    return isEqualsValue(newData, oldData)
  }
}
static isEqualsObject (newData, oldData) {
  for (const data in newData) {
    if (ignoreAttributes.includes(data) || ignoreCustomAtts.includes(data)) {
      continue
    }
    if (Array.isArray(newData[data])) {
      if (!Array.isArray(oldData[data])) {
        return false
      }
      if (!isEqualsArray(newData[data], oldData[data])) {
        return false
      }
    } else if (isObject(newData[data])) {
      if (!isObject(oldData[data])) {
        return false
      }
      if (!isEqualsObject(newData[data], oldData[data])) {
        return false
      }
    } else if (!isEqualsValue(newData[data], oldData[data])) {
      return false
    }
  }
  return true
}
static isEqualsArray (newData, oldData) {
  if (newData === oldData) {
    return true
  }
  if (newData == null || oldData == null) {
    return false
  }
  if (newData.length !== oldData.length) {
    return false
  }
  for (let i = 0; i < newData.length; i++) {
    if (Array.isArray(newData[i])) {
      if (!Array.isArray(oldData[i])) {
        return false
      }
      if (!isEqualsArray(newData[i], oldData[i])) {
        return false
      }
    } else if (isObject(newData[i])) {
      if (!isObject(oldData[i])) {
        return false
      }
      if (!isEqualsObject(newData[i], oldData[i])) {
        return false
      }
    } else if (!isEqualsValue(newData[i], oldData[i])) {
      return false
    }
  }
  return true
}
static isEqualsValue (newVal, oldVal) {
  // console.log(oldVal === newVal, oldVal, newVal)
  return oldVal === newVal
}
static checkValidSubArray (
  tempList,
  formName,
  tempSubAttribute,
  vue,
  reg
) {
  let isValidSub = true
  for (let i = 0; i < tempList.length; i++) {
    for (const key in tempList[i]) {
      if (key === tempSubAttribute) {
        const tempSubList = tempList[i][key]
        for (let k = 0; k < tempSubList.length; k++) {
          vue.$refs[formName + i + 'r' + k].validate((valid, fields) => {
            if (!valid) {
              isValidSub = false
              validateShowMessage(fields, vue, reg)
            } else if (!isNull(tempSubList[i])) {
              tempSubList[i].editMode = false
            }
          })
        }
        break
      }
    }
  }
  return isValidSub
}
}

export const regs = [
  // { value: null, label: "Сонгоно уу" },
  {value: 'А', label: 'А'},
  {value: 'Б', label: 'Б'},
  {value: 'В', label: 'В'},
  {value: 'Г', label: 'Г'},
  {value: 'Д', label: 'Д'},
  {value: 'Е', label: 'Е'},
  {value: 'Ё', label: 'Ё'},
  {value: 'Ж', label: 'Ж'},
  {value: 'З', label: 'З'},
  {value: 'И', label: 'И'},
  {value: 'Й', label: 'Й'},
  {value: 'К', label: 'К'},
  {value: 'Л', label: 'Л'},
  {value: 'М', label: 'М'},
  {value: 'Н', label: 'Н'},
  {value: 'О', label: 'О'},
  {value: 'Ө', label: 'Ө'},
  {value: 'П', label: 'П'},
  {value: 'Р', label: 'Р'},
  {value: 'С', label: 'С'},
  {value: 'Т', label: 'Т'},
  {value: 'У', label: 'У'},
  {value: 'Ү', label: 'Ү'},
  {value: 'Ф', label: 'Ф'},
  {value: 'Х', label: 'Х'},
  {value: 'Ц', label: 'Ц'},
  {value: 'Ч', label: 'Ч'},
  {value: 'Ш', label: 'Ш'},
  {value: 'Щ', label: 'Щ'},
  {value: 'Ъ', label: 'Ъ'},
  {value: 'Ь', label: 'Ь'},
  {value: 'Ы', label: 'Ы'},
  {value: 'Э', label: 'Э'},
  {value: 'Ю', label: 'Ю'},
  {value: 'Я', label: 'Я'},
];