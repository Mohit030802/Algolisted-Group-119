import React, { useState, useEffect } from "react";
import styled from "styled-components";


const MockAssessmentRunning = ({ allQuestions, time, testId }) => {
  const [needDarkMode, setNeedDarkMode] = useState(false);
  const [numberofQuestion, setNumberOfQuestion] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isAnswerCorrect, setIsAnswerCorrect] = useState({});
  const [startTest, setStartTest] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [timer, setTimer] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const calculateScore = () => {
    let scoreCount = 0;
    const correctAnswersData = {};
    allQuestions.forEach((question) => {
      const { _id, correct_ans } = question;
      if (selectedAnswers[_id] === correct_ans) {
        scoreCount++;
      }
      correctAnswersData[_id] = correct_ans;
    });
    setScore(scoreCount);
    setCorrectAnswers(correctAnswersData);
  };
  useEffect(() => {
    let selectedTheme = localStorage.getItem("selectedTheme");
  }, []);

  useEffect(() => {
    document.title = "Generate Mock Online Assessment - Algolisted";
  }, []);

  console.log("needDarkMode : ", needDarkMode);
  const toggleDarkMode = () => {
    setNeedDarkMode(!needDarkMode);
  };
  const startTestButton = () => {
    setStartTest(true);
    setTimer(time * 60);
    console.log(allQuestions);
  };
  useEffect(() => {
    let interval;
    if (startTest && timer > 0 && !submitted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      if (submitted) {
        clearInterval(interval);
        calculateScore();
      }
      else{
        handleSubmit();
      }
    }
    else{
      clearInterval(interval);
      calculateScore()
    }

    return () => clearInterval(interval);
  }, [startTest, timer, submitted]);
  const handleCheckboxChange = (questionId, option) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: option,
    }));
  };
  const checkAnswer = (questionId) => {
    const correctAnswer = allQuestions.find(
      (question) => question._id === questionId
    )?.correct_ans;
    const isCorrect = selectedAnswers[questionId] === correctAnswer;
    console.log(correctAnswer, isCorrect);
    setIsAnswerCorrect((prevIsAnswerCorrect) => ({
      ...prevIsAnswerCorrect,
      [questionId]: isCorrect,
    }));
  };
  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };
  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const goToPrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };
  return (
    <GrandContainer needDarkMode={needDarkMode}>
      <div className="main-content">
        <h1 className="main-heading">
          Mock Online Assessment - SET (A-{testId})
        </h1>
        <p className="heading-supporter">
          We've designed this page as a platform for students to hone their
          skills in tackling Online Assessments from various companies. Here,
          you'll find MCQs to solve within a specified time frame, simulating
          real competition scenarios. Additionally, we provide comprehensive
          analytics at the end to enhance your understanding of the subjects.
        </p>

        <div className="display-line"></div>

        <div className="main-content">
          {!startTest ? (
            <button className="start-btn" onClick={startTestButton}>
              Start test
            </button>
          ) : (
            <>
              <div className="questions">
                <div className="question">
                  <div className="questions">
                    {allQuestions.length > 0 && (
                      <div
                        className="question"
                        key={allQuestions[currentQuestionIndex]._id}
                      >
                        <div className="main-question">
                          <b>Question {currentQuestionIndex + 1} : </b>{" "}
                          {allQuestions[currentQuestionIndex].question}
                        </div>
                        {/* Your options rendering code */}
                        <div className="options">
                          {["a", "b", "c", "d"].map((option, optionIndex) => (
                            <div className="option" key={optionIndex}>
                              <input
                                type="checkbox"
                                id={`${allQuestions[currentQuestionIndex]._id}-${option}`}
                                onChange={() =>
                                  handleCheckboxChange(
                                    allQuestions[currentQuestionIndex]._id,
                                    option
                                  )
                                }
                                checked={
                                  selectedAnswers[
                                    allQuestions[currentQuestionIndex]._id
                                  ] === option
                                }
                              />
                              <label
                                htmlFor={`${allQuestions[currentQuestionIndex]._id}-${option}`}
                              >
                                {`${option}. ${
                                  allQuestions[currentQuestionIndex][
                                    option.toLowerCase()
                                  ]
                                }`}
                              </label>
                            </div>
                          ))}
                          {submitted && (
                            <div className="check">
                              Correct Answer is Opition :{" "}
                              {allQuestions[currentQuestionIndex].correct_ans}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {submitted && (
                    <div className="score">
                      <h2>Your Score: {score}</h2>
                    </div>
                  )}
                </div>
              </div>

              <div className="tracker">
                {startTest && (
                  <div className="time-left">{formatTime(timer)} mins</div>
                )}

                <div className="questions-track">
                  {allQuestions.map((question, index) => (
                    <div
                      key={question._id}
                      className={`question ${
                        index === currentQuestionIndex ? "active-question" : ""
                      } ${
                        selectedAnswers[question._id] ? "done-question" : ""
                      }`}
                      onClick={() => goToQuestion(index)}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>

                <div className="move-prev-next">
                  <button
                    className="btn"
                    onClick={goToPrevQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Prev
                  </button>
                  <button
                    className="btn"
                    onClick={goToNextQuestion}
                    disabled={currentQuestionIndex === allQuestions.length - 1}
                  >
                    Next
                  </button>
                  <button className="btn" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </GrandContainer>
  );
};

export default MockAssessmentRunning;

const GrandContainer = styled.div`
  position: relative;
  margin-top: -40px;

  display: flex;
  justify-content: space-between;

  .display-line {
    width: 100%;
    margin: 20px 0 30px 0;
    height: 1px;
    background-color: #404249;
  }

  background-color: ${(props) =>
    props.needDarkMode ? "#313338" : "transparent"};

  a {
    color: ${(props) => (props.needDarkMode ? "#6d93d8" : "#18489f")};
  }

  input {
    background-color: transparent;
  }

  .main-content {
    width: 100%;
    position: relative;
    width: 100%;
    margin: auto;

    .main-heading {
      font-size: 1.65rem;
      font-weight: 600;
      color: ${(props) => (props.needDarkMode ? "#e5e6e8" : "#292929")};
    }

    .heading-supporter {
      font-size: 1.05rem;
      margin-bottom: 10px;
      font-weight: 400;
      color: ${(props) => (props.needDarkMode ? "#ffffffa6" : "#696168")};

      a {
        color: ${(props) => (props.needDarkMode ? "#18489f" : "#18489f")};
        font-size: 0.95rem;
        font-weight: 300;
        margin-left: 0.25rem;
      }
    }

    .start-btn {
      padding: 10px 20px;
      background-color: #404249;
      border: none;
      color: white;
      font-size: 0.75rem;
      /* font-weight: 300; */
      text-transform: uppercase;
      letter-spacing: 0.15rem;
      border-radius: 5px;
    }

    .message {
      display: inline-block;
      /* display: flex; */
      /* align-items: center; */
      background-color: ${(props) =>
        props.needDarkMode ? "#444754" : "#d5f7e1"};
      border-radius: 5px;
      padding: 10px;
      margin: 20px 0 10px 0;

      .text {
        font-size: 0.8rem;
        color: ${(props) => (props.needDarkMode ? "#b7b8ba" : "#13803b")};
        font-weight: 300;

        b {
          font-weight: 500;
          color: ${(props) => (props.needDarkMode ? "#b7b8ba" : "#13803b")};
        }
      }
    }

    .main-content {
      width: 100%;
      display: flex;
      align-items: flex-start;

      .questions {
        width: calc(100% - 200px);
        display: flex;
        flex-direction: column;

        .question {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 50px;

          .main-question {
            color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
            font-size: 0.9rem;
            font-weight: 300;

            b {
              color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
              font-weight: 600;
            }

            img {
              height: 250px;
              display: block;
              margin: 10px 0 15px 0;
            }
          }

          .options {
            display: flex;
            flex-direction: column;

            .option {
              display: flex;
              align-items: center;
              margin-top: 10px;

              label {
                color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
                margin-left: 5px;
                font-size: 0.9rem;
                font-weight: 300;
              }

              input[type="checkbox"] {
                margin-right: 2.5px;
                border: none;
                cursor: pointer;
                scale: 1.15;
              }
            }
            .check{
              color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
              font-size: 1.75rem;
              font-weight: 300;
              margin-top: 10px;
              font-family: 'Courier New', Courier, monospace;
            }
          }

          .problem-tag {
            background-color: ${(props) =>
              props.needDarkMode ? "#404249" : "#e5e5e5"};
            color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
            font-size: 0.75rem;
            padding: 5px 10px;
            border-radius: 10px;
            font-weight: 200;
            margin-top: 20px;
          }
          .btn {
            width: 180px;
            margin-top: 10px;
            background-color: #404249;
            height: 45px;
            border-radius: 10px;
            border: 1px solid #c2b1b1;
            color: #333;
            display: inline-block;
            font-size: 0.85rem;
            font-weight: 300;
            text-decoration: none;
            /* text-transform: uppercase; */
            border-radius: 100px;
            background: linear-gradient(
              300deg,
              #56f238,
              #b3adff,
              #c5c5ef,
              #bde6ce,
              #56f238
            );
            background-size: 400% 400%;
            -webkit-animation: AnimationName 10s ease infinite;
            -moz-animation: AnimationName 10s ease infinite;
            animation: AnimationName 10s ease infinite;
            border-color: transparent;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            opacity: 0.75;

            a {
              color: #333;
            }

            &:hover {
              background-color: whitesmoke;
              color: #333;
              cursor: pointer;
              transition-duration: 500ms;
              opacity: 1;
            }
          }
        }
        .score{
          color: ${(props) => (props.needDarkMode ? "#e5e5e5" : "#333")};
          font-size: 1.75rem;
          font-weight: 300;
          margin-top: 10px;
          font-family: 'Courier New', Courier, monospace;
        
        }
      }
      .tracker {
        width: 200px;
        height: 40px;
        margin-left: 20px;

        .time-left {
          width: 100%;
          background-color: white;
          color: #333;
          text-align: center;
          padding: 5px;
          font-size: 0.85rem;
          border-radius: 5px;
          letter-spacing: 0.25rem;
          font-weight: 500;
        }

        .questions-track {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          width: 100%;
          padding: 0;
          margin-top: 20px;

          .question {
            width: calc(20% - 5px);
            height: 35px;
            margin-bottom: 6.25px;
            background-color: #2b2d31;

            display: grid;
            place-items: center;

            color: white;
            font-size: 0.65rem;
            border-radius: 5px;

            &:hover {
              cursor: pointer;
            }
          }

          .done-question {
            background-color: green;
            color: #333;
          }
          .active-question {
            background-color: orange;
            color: #333;
          }
        }

        .move-prev-next {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;

          .btn {
            width: calc(33% - 3.15px);
            background-color: white;
            color: #333;
            text-align: center;
            padding: 5px;
            font-size: 0.75rem;
            border-radius: 5px;
            border: none;
          }
        }
      }
    }
  }
`;
