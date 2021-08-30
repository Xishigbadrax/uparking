import {useState} from 'react';
import css from './style.module.css';

const navbar = [
  {id: 0, name: 'ШИНЭ МЭДЭЭ', href: 'newInfo'},
  {id: 1, name: 'КОМПАНИЙН МЭДЭЭ', href: 'companyInfo'},
  {id: 2, name: 'ЗӨВӨЛГӨӨ', href: 'Zuwluguu'},
  {id: 3, name: 'АВТО МАШИН', href: 'AutoCar'},
  {id: 4, name: 'АВТО ЗОГСООЛ', href: 'AutoZogsool'},
  {id: 5, name: 'УРАМШУУЛАЛ', href: 'Uramshuulal'},
  {id: 6, name: 'БУСАД МЭДЭЭ', href: 'otherInfo'},
];
const InforNavbar = (props, {onClick2}) =>{
  // eslint-disable-next-line no-unused-vars
  const [filterType, setFilterType] = useState('newInfo');
  console.log(filterType, 'filtertypee');
  const submit = (value) =>{
    setFilterType(value);
    // eslint-disable-next-line react/prop-types
    props.onClick2(value);
  };
  return (

    <div>


      <div className="flex" style={{marginTop: '41px'}}>
        <div
          // className={'lg:grid grid-cols-7 md:grid-cols-7 sm:grid-cols-2 lg:ml-32'}
          style={{width: '90%', display: 'flex', justifyContent: 'space-between', padding: '0 135px'}}
        >
          {' '}
          {navbar.map((item) => (
            <div
              key={item.id}
              onClick={() => submit(item.href)}
              className={`${css.item}  ${filterType == item.href ? css.active : null }` }
            >
              {item.name}
            </div>
          ))}
        </div>

        <span className="py-3 ml-32" style={{color: 'blue', width: '20%'}}>
            10/19/2020 , <b> Даваа гараг</b>
        </span>

      </div>
      <div />
    </div>
  );
};

export default InforNavbar;
