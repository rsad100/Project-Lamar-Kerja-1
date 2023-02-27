import React, { Component, Fragment, useEffect, useState } from "react";
// import Head from "next/head";
import styles from "../styles/score.module.css";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const score = () => {
  const router = useRouter();

  const [score, setScore] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
    setScore(localStorage.getItem("score"));
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonColor: "#5f2eea",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        router.push("/");
      }
    });
  };

  return (
    <>
      <main className={styles["main"]}>
        <p className={styles["text-3"]}>Your score is</p>
        <p className={styles["text-2"]}>{score}</p>
        <div className={styles["button-div-1"]}>
          <Link href="/main">
            <button className={styles["button-1"]}>Try again?</button>
          </Link>
          <button onClick={handleLogout} className={styles["button-1"]}>
            Logout
          </button>
        </div>
      </main>
    </>
  );
};

export default score;
