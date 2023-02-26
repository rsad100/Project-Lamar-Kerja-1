import React, { useEffect, useState } from "react";
import styles from "../styles/index.module.css";
import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const Login = () => {
  const router = useRouter();

  const handleSubmit = () => {
    Swal.fire({
      title: "Login success!",
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        router.push("/main");
      }
    });
  };

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
          {/* <Link href="/main"> */}
          <button onClick={handleSubmit} className={styles["button-1"]}>
            Login
          </button>
          {/* </Link> */}
          <button className={styles["button-1"]}>Register</button>
        </div>
      </div>
    </main>
  );
};

export default Login;
