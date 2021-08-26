import {useState} from 'react';
const navbar = [
  {id: 0, name: 'Шинэ мэдээ', href: 'newInfo'},
  {id: 1, name: 'Компанийн мэдээ', href: 'companyInfo'},
  {id: 2, name: 'Зөвлөгөө', href: 'Zuwluguu'},
  {id: 3, name: 'Авто машин', href: 'AutoCar'},
  {id: 4, name: 'Авто зогсоол', href: 'AutoZogsool'},
  {id: 5, name: 'Урамшуулал', href: 'Uramshuulal'},
  {id: 6, name: 'Бусад мэдээ', href: 'otherIndo'},
];
const InforNavbar = () =>{
  // eslint-disable-next-line no-unused-vars
  const [filterType, setFilterType] = useState('day');

  return (
    <div>
      <div className="flex">
        <div
          className={'lg:grid grid-cols-7 md:grid-cols-7 sm:grid-cols-2 lg:ml-32'}
          style={{width: '1110px'}}
        >
          {' '}
          {navbar.map((item) => (
            <div
              key={item.id}
              onClick={() => setFilterType(item.href)}
              className={'text-center py-3 grid-cols-1 dateFilter1 '}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className="py-3 ml-32">
          <span style={{color: 'blue'}}>
            10/19/2020 , <b> Даваа гараг</b>
          </span>
        </div>
      </div>
      <div />
    </div>
  );
};

export default InforNavbar;
