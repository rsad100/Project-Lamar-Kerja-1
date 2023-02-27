import React, { Component, Fragment, useEffect, useState } from "react";
// import Head from "next/head";
import styles from "../styles/main.module.css";
import Axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Main = () => {
  interface ApiResponse {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
  }

  const router = useRouter();

  const [question, setQuestion] = useState<ApiResponse[]>([]);
  const [number, setNumber] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [score, setScore] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");

  function shuffleArray(array) {
    // Loop through the array
    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));

      // Swap the current element with the random element
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    const url = "https://opentdb.com/api.php?amount=4";
    localStorage.setItem("score", String(0));
    Axios.get(url)
      .then((res) => {
        setQuestion(res.data.results);
        console.log(res.data.results);
        const tempArray = [];
        const correctArray = [];
        for (let x = 0; x < res.data.results.length; x++) {
          tempArray.push(res.data.results[x].incorrect_answers);
          tempArray[x].push(res.data.results[x].correct_answer);
          correctArray.push(res.data.results[x].correct_answer);
        }
        // console.log(tempArray);

        const randomArray = [];

        for (let a = 0; a < tempArray.length; a++) {
          // console.log(tempArray[a]);
          randomArray.push(shuffleArray(tempArray[a]));
        }

        console.log(randomArray);

        setCorrectAnswer(correctArray);
        setAnswer(tempArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleScore = () => {
    let count = 0;
    for (let i = 0; i < correctAnswer.length; i++) {
      if (correctAnswer[i] === userAnswer[i]) {
        count++;
      }
    }
    localStorage.setItem("score", String(count));
    Swal.fire({
      title: "Are you sure?",
      text: `You have answered ${userAnswer.length} out of ${question.length} of questions, you can't revert this decision!`,
      showCancelButton: true,
      confirmButtonColor: "#5f2eea",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/score");
      }
    });
  };

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

  // console.log(question[0]?.category);
  // console.log(answer[number]);
  // console.log(userAnswer);
  // console.log(question.length);
  // console.log(number);
  return (
    <div className={styles["main"]}>
      <div>
        <h1 className={styles["text-3"]}>QUIZ!</h1>
        <p className={styles["text-1"]}>
          Question {number + 1} / {question.length}
        </p>
        <p className={styles["text-2"]}>
          Category : {question[number]?.category}
        </p>
        <p className={styles["text-2"]}>
          Difficulty : {question[number]?.difficulty}
        </p>
        <p className={styles["text-2"]}>
          Question : {question[number]?.question}
        </p>
        {answer.length &&
          answer[number]?.map((item) => (
            <div className={styles.choice}>
              <input
                type="radio"
                name="choice"
                value={item}
                onChange={() => {
                  const newarray = userAnswer;
                  newarray[number] = item;
                  setUserAnswer(newarray);
                  setCurrentAnswer(item);
                }}
                checked={
                  userAnswer[number] === item || currentAnswer === item
                    ? true
                    : false
                }
              />
              <p className={styles["text-2"]}>{item}</p>;
            </div>
          ))}
        <div className={styles["button-div-2"]}>
          <div className={styles["button-div-1"]}>
            <button
              className={styles["button-1"]}
              onClick={() => {
                number === 0 ? setNumber(number) : setNumber(number - 1);
              }}
            >
              Previous
            </button>
            {number === question.length - 1 ? (
              <button className={styles["button-1"]} onClick={handleScore}>
                Submit
              </button>
            ) : (
              <button
                className={styles["button-1"]}
                onClick={() => {
                  number === question.length - 1
                    ? setNumber(number)
                    : setNumber(number + 1);
                }}
              >
                Next
              </button>
            )}
          </div>
          <button onClick={handleLogout} className={styles["button-1"]}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
