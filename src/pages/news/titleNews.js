import News from "../../components/News";
import styles from "../../styles/News.module.css";
import InforNavbar from "../../components/InforNavbar";
export default function newDetails() {
  return (
    <div>
      <div class="mt-8">
        <InforNavbar />
      </div>

      <div className={`grid lg: grid-cols-1 ${styles.Infor} mx-32`}></div>
    </div>
  );
}
