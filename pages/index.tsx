import React, { useEffect, useState } from "react";
// import Head from "next/head";
import styles from "../styles/index.module.css";
import Axios from "axios";
import Link from "next/link";

const Login = () => {
  return (
    <main className={styles["main"]}>
      <div className={styles["div-1"]}>
        <h1 className={styles["text-3"]}>QUIZ!</h1>
        <div className={styles["div-2"]}>
          <p className={styles["text-2"]}>Username</p>
          <input
            id="username"
            className={styles["input-1"]}
            placeholder="Write your username"
          />
        </div>
        <div className={styles["div-2"]}>
          <p className={styles["text-2"]}>Password</p>
          <input
            id="password"
            className={styles["input-1"]}
            placeholder="Write your password"
          />
        </div>
        <div className={styles["button-div-1"]}>
          <Link href="/main">
            <button className={styles["button-1"]}>Login</button>
          </Link>
          <button className={styles["button-1"]}>Register</button>
        </div>
      </div>
    </main>
  );
};

export default Login;
