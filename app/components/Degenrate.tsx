"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import styles from "../styles/Degen.module.css";
import Lottie from "lottie-react";
import wrongAnimation from "../../public/wrong.json";
import correctAnimation from "../../public/correct.json";
import { getResponse, McqItem } from "../lib/actions/getResponse";

const loadingMessages = [
  "Patience is virtue...",
  "Loading sucks we know.. TwT",
  "Generating good stuff...",
  "Good things take time.. ;)",
];

const DegeneratePage: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [quizData, setQuizData] = useState<McqItem[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(10);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showNextButton, setShowNextButton] = useState(false);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setTimer(10);
      setShowNextButton(false);
    } else {
      setQuizEnded(true);
    }
  };

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  useEffect(() => {
    if (quizData.length > 0 && !showAnswer && !quizEnded) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(timerInterval);
            setShowAnswer(true);
            setShowNextButton(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [quizData, showAnswer, currentQuestionIndex, quizEnded]);

  useEffect(() => {
    const dateTimeInterval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(dateTimeInterval);
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    setQuizData([]);
    setShowAnswer(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizEnded(false);

    try {
      const response = await getResponse(inputText);
      if (response && Array.isArray(response)) {
        setQuizData(response.slice(0, 10)); // Limit to 10 questions
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
    } finally {
      setIsLoading(false);
      setTimer(10);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (!showAnswer) {
      setSelectedAnswer(index);
      setShowAnswer(true);
      if (index === parseInt(quizData[currentQuestionIndex].answer) - 1) {
        setScore(score + 1);
      }
      setShowNextButton(true);
      setTimer(0);
    }
  };

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className={styles.generatePage}>
      <div className={styles.navbarWrapper}>
        <Navbar />
      </div>
      {!isLoading && quizData.length === 0 && !quizEnded && (
        <div className={styles.content}>
          <div className={styles.rectangleParent}>
            <svg
              width="21"
              height="23"
              viewBox="0 0 21 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6698 0L10.8638 0.931968C11.9152 5.98385 15.7396 10.003 20.7331 11.3038C15.7396 12.6047 11.9152 16.6238 10.8638 21.6757L10.6698 22.6077L10.4758 21.6757C9.42432 16.6238 5.59992 12.6047 0.606445 11.3038C5.59992 10.003 9.42432 5.98385 10.4758 0.931968L10.6698 0Z"
                fill="black"
              />
            </svg>
            <div className={styles.geninput1}>Education with AI</div>
          </div>
          <h1 className={styles.heroheader}>Learn With AI</h1>
          <p className={styles.herodescribe}>
            Your ultimate guide to learning with AI
          </p>
          <div className={styles.homeinput}>
            <input
              type="text"
              className={styles.geninput}
              placeholder="Enter a topic or an idea..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button className={styles.genbutton} onClick={handleGenerate}>
              Generate
            </button>
          </div>
        </div>
      )}
      {isLoading && (
        <div className={styles.loadingContainer}>
          <p className={styles.loadingMessage}>{loadingMessage}</p>
        </div>
      )}
      {quizData.length > 0 && currentQuestion && !quizEnded && (
        <div className={styles.quizContainer}>
          <div className={styles.cardFront}>
            <h2 className={styles.question}>{currentQuestion.question}</h2>
            {[
              currentQuestion.choice1,
              currentQuestion.choice2,
              currentQuestion.choice3,
              currentQuestion.choice4,
            ].map((option, index) => (
              <div
                key={index}
                className={`${styles.option} 
                  ${selectedAnswer === index ? styles.selected : ""}
                  ${showAnswer && index === parseInt(currentQuestion.answer) - 1 ? styles.correctHighlight : ""}
                `}
                onClick={() => handleAnswerSelect(index)}
              >
                <span className={styles.optionNumber}>{index + 1}</span>
                <span className={styles.optionText}>{option}</span>
              </div>
            ))}
            <div className={styles.timerAndDate}>
              <span className={styles.timer}>{timer}s</span>
              <span className={styles.dateTime}>{currentDateTime.toLocaleString()}</span>
            </div>
            {showNextButton && (
              <button onClick={handleNextQuestion} className={styles.nextButton}>
                Next Question
              </button>
            )}
          </div>
          {showAnswer && (
            <div className={styles.answerFeedback}>
              {selectedAnswer === parseInt(currentQuestion.answer) - 1 ? (
                <div className={styles.correctAnswer}>
                  <h2 className={styles.answerResult}>Correct Answer!</h2>
                  <Lottie
                    animationData={correctAnimation}
                    loop={true}
                    style={{ width: 100, height: 100 }}
                  />
                </div>
              ) : (
                <div className={styles.wrongAnswer}>
                  <h2 className={styles.answerResult}>Wrong Answer</h2>
                  <Lottie
                    animationData={wrongAnimation}
                    loop={true}
                    style={{ width: 100, height: 100 }}
                  />
                  <p className={styles.correctOption}>
                    Correct answer: {[
                      currentQuestion.choice1,
                      currentQuestion.choice2,
                      currentQuestion.choice3,
                      currentQuestion.choice4,
                    ][parseInt(currentQuestion.answer) - 1]}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {quizEnded && (
        <div className={styles.quizEndContainer}>
          <h2>Quiz Ended</h2>
          <p>Your score: {score} out of {quizData.length}</p>
          <button onClick={() => window.location.reload()} className={styles.restartButton}>
            Start New Quiz
          </button>
        </div>
      )}
      <p className={styles.disclaimer}>
        AI results may not be accurate. Please ensure to not consider it as real
        information at all times.
      </p>
    </div>
  );
};

export default DegeneratePage;