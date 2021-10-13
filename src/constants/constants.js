const defaultMsg = {
  success: 'Амжилттай',
  error: 'Та түр хүлээгээд дахин оролдоно уу.',
  permissionEmpty: 'Эрх сонгоно уу.',
  formErrorTxt: 'Формын утгыг үнэн зөв бөглөнө үү.',
  loginSuccessTxt: 'Амжилттай.',
  validateLocation: 'Газрын зураг дээр байршил тэмдэглэнэ үү.',
  loginErrorTxt: 'Нэвтрэх нэр эсвэл нууц үг буруу байна.',
  chooseDate: 'Цуцлах огноо сонгоно уу?',
  newDeviceConfirmErrorTxt:
    'Та шинэ төхөөрөмжөөс хандалт хийж байгаа тул баталгаажуулалт хийнэ үү.',
  dataError: 'Мэдээлэл дуудахад алдаа гарлаа',
  createError:'Мэдээлэл хадгалахад алдаа гарлаа.'
};

const dataType = {
  TEXT: 'text',
  NUMBER: 'number',
  AMOUNT: 'amount',
  SELECT: 'select',
  DATE: 'date',
  DATETIME: 'datetime',
  PASSWORD: 'password',
  CHECKBOX: 'checkbox',
  TEXTAREA: 'textarea',
  BASE64: 'base64',
  SEPARATOR: 'separator',
};

const searchOp = {
  EQUALS: 'equals',
  CONTAINS: 'contains',
  IN_RANGE: 'inRange',
};

const sortType = {
  ASCEND: 'asc',
  DESCEND: 'desc',
};

const messageType = {
  FAILED: {
    title: 'Амжилтгүй',
    type: 'Failed',
    msgType: 'error',
  },
  SUCCESS: {
    title: 'Амжилттай',
    type: 'Success',
    msgType: 'success',
  },
  WARNING: {
    title: 'Анхааруулга',
    type: 'Warning',
    msgType: 'warning',
  },
};

const datePickerLocale = {
  lang: {
    locale: 'mn_MN',
    yearFormat: 'YYYY',
  },
};

const dateTimePickerLocale = {
  lang: {
    locale: 'mn_MN',
    dateTimeFormat: 'YYYY-MM-DD HH:mm',
    yearFormat: 'YYYY',
    ok: 'Ok',
    rangePlaceholder: ['Эхлэх өдөр', 'Дуусах өдөр'],
  },
  dateTimeFormat: 'YYYY-MM-DD HH:mm',
};

const calendarLocale = {
  lang: {
    locale: 'mn_MN',
    placeholder: 'Сонгох',
    rangePlaceholder: ['Эхлэх өдөр', 'Дуусах өдөр'],
    today: 'Өнөөдөр',
    now: 'Одоо',
    backToToday: 'Өчигдөррүү буцах',
    ok: 'Тийм',
    clear: 'Цэвэрлэх',
    month: 'Сар',
    year: 'Жил',
    timeSelect: 'Цаг сонгох',
    dateSelect: 'Өдөр сонгох',
    monthSelect: 'Сар сонгох',
    yearSelect: 'Жил сонгох',
    decadeSelect: 'Арванаар сонгох',
    yearFormat: 'YYYY',
    dateFormat: 'M/D/YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'M/D/YYYY HH:mm:ss',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
    previousMonth: 'Өмнөх сар (PageUp)',
    nextMonth: 'Дараагын сар (PageDown)',
    previousYear: 'Өнгөрсөн жил (Control + left)',
    nextYear: 'Дараагын жил (Control + right)',
    previousDecade: 'Өнгөрсөн арван',
    nextDecade: 'Дараагын арван',
    previousCentury: 'Өмнөх зуун',
    nextCentury: 'Дараагын зуун',
  },
  timePickerLocale: {
    placeholder: 'Select time',
  },
  dateFormat: 'YYYY-MM-DD',
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
  weekFormat: 'YYYY-wo',
  monthFormat: 'YYYY-MM',
};

export {
  defaultMsg,
  dataType,
  searchOp,
  sortType,
  messageType,
  datePickerLocale,
  dateTimePickerLocale,
  calendarLocale,
};
