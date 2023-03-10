import React, { useEffect, useState } from "react";
import styles from "../styles/index.module.css";
import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const url = `https://intermedietebackend.vercel.app/api/v1/auth`;
    const data = { email: email, password: password };
    Axios.post(url, data)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        Swal.fire({
          title: "Login Success",
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            router.push("/main");
          }
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Wrong password or email",
          showConfirmButton: false,
          timer: 1000,
        });
      });
  };

  return (
    <main className={styles["main"]}>
      <div className={styles["div-1"]}>
        <h1 className={styles["text-3"]}>QUIZ!</h1>
        <div className={styles["div-2"]}>
          <p className={styles["text-2"]}>Email</p>
          <input
            id="email"
            className={styles["input-1"]}
            placeholder="Write your email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className={styles["div-2"]}>
          <p className={styles["text-2"]}>Password</p>
          <input
            id="password"
            className={styles["input-1"]}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Write your password"
          />
        </div>
        <div className={styles["button-div-1"]}>
          {/* <Link href="/main"> */}
          <button onClick={handleSubmit} className={styles["button-1"]}>
            Login
          </button>
          {/* </Link> */}
          <Link href="/register">
            <button className={styles["button-1"]}>Register</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
