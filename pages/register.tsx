import React, { useEffect, useState } from "react";
import styles from "../styles/register.module.css";
import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    const url = `https://intermedietebackend.vercel.app/api/v1/users/register`;
    const data = { phone_number: phone, email: email, password: password };
    Axios.post(url, data)
      .then((res) => {
        console.log(res.data.msg);
        Swal.fire({
          title: "Register Success!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            router.push("/");
          }
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Email or phone number already exist",
          showConfirmButton: false,
          timer: 1200,
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
        <div className={styles["div-2"]}>
          <p className={styles["text-2"]}>Phone Number</p>
          <input
            id="phone"
            className={styles["input-1"]}
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
            placeholder="Write your phone number"
          />
        </div>
        <div className={styles["button-div-1"]}>
          <button onClick={handleSubmit} className={styles["button-1"]}>
            Register
          </button>
          <Link href="/">
            <button className={styles["button-1"]}>Back to login</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
