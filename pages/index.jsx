import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import SignInComp from "../pages/signin";
export default function Home() {
  return (
    <div className={styles.container}>
      <SignInComp></SignInComp>
    </div>
  );
}
