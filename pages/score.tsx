import React, { Component, Fragment, useEffect, useState } from "react";
// import Head from "next/head";
import styles from "../styles/score.module.css";
import Axios from "axios";
import Link from "next/link";

const score = () => {
  const [score, setScore] = useState("");
  useEffect(() => {
    setScore(localStorage.getItem("score"));
  }, []);

  return (
    <>
      <main className={styles["main"]}>
        <p className={styles["text-3"]}>Your score is</p>
        <p className={styles["text-2"]}>{score}</p>
        <div className={styles["button-div-1"]}>
          <Link href="/main">
            <button className={styles["button-1"]}>Try again?</button>
          </Link>
          <Link href="/">
            <button className={styles["button-1"]}>Logout</button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default score;
