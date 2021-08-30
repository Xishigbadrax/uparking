// import News from '../../components/News';
import InforNavbar from '../../components/InfoNavbar/InforNavbar';
import NewDetails from './newDetails';
const title=()=> {
  return (
    <div>
      <div className="mt-8">
        <InforNavbar />
      </div>
      <NewDetails/>
      <div className={'grid lg: grid-cols-1 mx-32'}></div>
    </div>
  );
};
export default title;
