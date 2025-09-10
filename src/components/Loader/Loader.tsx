import styles from './Loader.module.css';
import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div>
      <ClipLoader 
        color="#36d7b7" 
        size={50} 
      />
    <p className={styles.text}>Loading movies, please wait...</p>
    </div>
  );
}





