import './App.css';
import React, { useEffect, useState, useReducer } from 'react';
import ButtonAppBar from './components/ButtonAppBar';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import { Container, Paper, Button, FormControlLabel, Switch as MaterialSwitch } from '@material-ui/core';
import axios from 'axios';
import Register from './components/Register'
import EditQuestion from './components/EditQuestion';
import EditAnswerOption from './components/EditAnswerOption';
import AnswerOption from './components/AnswerOption';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import strings from './localization/strings';
import { useSnackbar, withSnackbar } from 'notistack';
import socketIOClient from 'socket.io-client'
import NewQuizDialog from './components/NewQuizDialog';
import EditQuizTitleComponent from './components/EditQuizTitleComponent';
import QuizTitleComponent from './components/QuizTitleComponent';
const sIOEndpoint = 'wss://vappus-quiz-app.herokuapp.com:9000'
// const sIOEndpoint = 'ws://localhost:9000'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


var path = null;
switch (process.env.NODE_ENV) {

  case 'production':
    path = 'https://vappus-quiz-app.herokuapp.com/'
    break;
  case 'development':
    path = 'http://localhost:5000/'
    break;
  case 'test':
    path = 'http://localhost:5000/'
    break;
  default:
    throw "Environment not set"
}

// ----------------REDUCER----------------------------------------------------
function reducer(state, action) {
  let deepCopy = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case "INIT_DATA":
      console.log(action)
      return action.data; /// <--- this should be state
    case "ANSWER_CHANGED":
      deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].answerOptions[action.data.answerIndex].answer = action.data.newText;
      return deepCopy;
    case "QUESTION_CHANGED":
      deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].question = action.data.newText;
      return deepCopy;
    case "QUIZ_CHANGED":
      deepCopy[action.data.quizIndex].quizName = action.data.newText;
      return deepCopy;
    case "ADD_ANSWER":
      let newAnswer = { answer: "", correct: false, selected: false, id: action.data.id }
      deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].answerOptions.push(newAnswer)
      return deepCopy;
    case "ADD_QUESTION":
      let newQuestion = { question: "", answerOptions: [], id: action.data.id }
      deepCopy[action.data.quizIndex].quizQuestions.push(newQuestion)
      return deepCopy;
    case "ADD_QUIZ":
      let newQuiz = { id: action.data.quizId, quizname: action.data.quizname, quizQuestions: [] }
      deepCopy.push(newQuiz)
      return deepCopy;
    case "DELETE_ANSWER":
      deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].answerOptions.splice(action.data.answerIndex, 1)
      return deepCopy;
    case "DELETE_QUESTION":
      deepCopy[action.data.quizIndex].quizQuestions.splice(action.data.questionIndex, 1)
      return deepCopy;
    case "DELETE_QUIZ":
      deepCopy.splice(action.data.quizIndex, 1)
      return deepCopy;
    case "SELECT_TOGGLE":
      deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].answerOptions[action.data.answerIndex].selected =
        !deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].answerOptions[action.data.answerIndex].selected;
      return deepCopy;
    case "CORRECT_TOGGLE":
      deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].answerOptions[action.data.answerIndex].correct =
        !deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].answerOptions[action.data.answerIndex].correct;
      return deepCopy;
    default:
      throw new Error();
  }
}

// ----------------APP-------------------------------------------------------

function App() {

  const classes = useStyles();
  const [dataAlustettu, setDataAlustettu] = useState(false);
  const [quiz, setQuiz] = useState(0);
  const [answersVisible, setAnswersVisible] = useState(false);
  const [state, dispatch] = useReducer(reducer, []);
  const [loggedIn, setLoggedIn] = useState(false)
  const [lan, setLan] = useState('en')
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();





  useEffect(() => {
    const socket = socketIOClient(sIOEndpoint)
    socket.on('connected', function (data) {
      console.log("CONNECTED")
      socket.emit('ready for data', {})
      enqueueSnackbar('Socket connected!')
    });
    socket.on('update', function (data) {
      var snackMsg = ""
      console.log("UPDATED", data.message.payload)
      switch (data.message.channel) {
        case "addquiz":
          snackMsg = "New Quiz: " + data.message.payload
          break;
        case "adduser":
          snackMsg = data.message.payload + " just registered for the first time!"
          break;
        case "alterquiz":
          let thisPayload = JSON.parse(data.message.payload)
          console.log("hi from here")
          console.log(thisPayload)
          snackMsg = "Quiz: " + thisPayload.old + " was renamed to " + thisPayload.new
          break;
        case "addedrecord":
          snackMsg = "this is a test!"
          break;
        default:
          break;
      }
      enqueueSnackbar(snackMsg)
    })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await axios.get(path + "quiz")
        if (result.data.length > 0) {
          for (var i = 0; i < result.data.length; i++) {
            result.data[i].quizQuestions = []
            let questions = await axios.get(path + "quiz/" + result.data[i].id + "/question/")
            result.data[i].quizQuestions = questions.data;
            if (result.data[i].quizQuestions.length > 0) {
              for (var j = 0; j < result.data[i].quizQuestions.length; j++) {
                result.data[i].quizQuestions[j].answerOptions = [];
                let answers = await axios.get(path + "quiz/" + result.data[i].id + "/question/" + result.data[i].quizQuestions[j].id + "/answer")
                result.data[i].quizQuestions[j].answerOptions = answers.data;
              }
            }
          }
          console.log(result.data)
          dispatch({ type: "INIT_DATA", data: result.data })
          setDataAlustettu(true)
        } else {
          throw ("No data :(")
        }
      }
      catch (exception) {
        console.log(exception)
      }
    }
    fetchData();
  }, [])

  const getWindowLanguage = () => {
    var language
    console.log(window.navigator.languages)
    if (window.navigator.languages) {
      language = window.navigator.languages[0]
    } else {
      language = window.navigator.userLanguage || window.navigator.language
    }
    return language;
  }

  const switchLanguage = (newLan) => {
    setLan(newLan)
    strings.setLanguage(newLan)
  }


  // TODO: updateUseranswer

  //// POST ---------------------------------------------------------------------------------------------------
  const addQuestion = async (event, quizIndex) => {
    let quizId = state[quizIndex].id;
    let body = {}
    try {
      let result = await axios.post(path + "quiz/" + quizId, body).then(response => {
        console.log("new id" + response.data.id);
        dispatch({ type: "ADD_QUESTION", data: { quizIndex: quiz, id: response.data.id } })
      })
    } catch (e) {
      console.log(e)
    }
  }

  const addAnsweroption = async (event, quizIndex, questionIndex) => {
    let quizId = state[quizIndex].id;
    let questionId = state[quizIndex].quizQuestions[questionIndex].id;
    let body = { correct: false }
    try {
      let result = await axios.post(path + "quiz/" + quizId + "/question/" + questionId, body).then(response => {
        console.log("new id" + response.data.id);
        dispatch({ type: "ADD_ANSWER", data: { quizIndex: quiz, questionIndex: questionIndex, id: response.data.id } })
      })
    } catch (e) {
      console.log(e)
    }
  }

  const addQuiz = async (quizname) => {
    let body = { quizname: quizname }
    try {
      let result = await axios.post(path + "quiz/", body).then(response => {
        console.log("new id" + response.data.id);
        dispatch({ type: "ADD_QUIZ", data: { quizId: response.data.id, quizname: quizname } })
      })
    } catch (e) {
      console.log(e);
    }
  }

  //// PUT -------------------------------------------------------------------------------------------------------
  const updateQuiz = async (event, quizIndex,) => {
    let quizId = state[quizIndex].id;
    let body = {
      quizname: event.target.value
    }
    try {
      let result = await axios.put(path + "quiz/" + quizId, body)
      dispatch({ type: "QUIZ_CHANGED", data: { newText: body.question, quizIndex: quizIndex } })
    } catch (e) {
      console.log(e)
    }
  }

  const updateQuestion = async (event, quizIndex, questionIndex) => {
    let quizId = state[quizIndex].id;
    let questionId = state[quizIndex].quizQuestions[questionIndex].id;
    let body = {
      question: event.target.value
    }
    try {
      let result = await axios.put(path + "quiz/" + quizId + "/question/" + questionId, body)
      dispatch({ type: "QUESTION_CHANGED", data: { newText: body.question, quizIndex: quizIndex, questionIndex: questionIndex } })
    } catch (e) {
      console.log(e)
    }
  }
  const updateAnsweroption = async (event, quizIndex, questionIndex, answerIndex, editMode) => {
    let quizId = state[quizIndex].id;
    let questionId = state[quizIndex].quizQuestions[questionIndex].id;
    let answerId = state[quizIndex].quizQuestions[questionIndex].answerOptions[answerIndex].id;
    let body = {}
    switch (editMode) {
      case "TEXT":
        body.answer = event.target.value;
        body.correct = state[quizIndex].quizQuestions[questionIndex].answerOptions[answerIndex].correct;
        break;
      case "CHECKBOX":
        body.answer = state[quizIndex].quizQuestions[questionIndex].answerOptions[answerIndex].answer;
        body.correct = !state[quizIndex].quizQuestions[questionIndex].answerOptions[answerIndex].correct;
        break;
      default:
        body.answer = state[quizIndex].quizQuestions[questionIndex].answerOptions[answerIndex].answer;
        body.correct = state[quizIndex].quizQuestions[questionIndex].answerOptions[answerIndex].correct;
        break;
    }
    try {
      let result = await axios.put(path + "quiz/" + quizId + "/question/" + questionId + "/answer/" + answerId, body)
      switch (editMode) {
        case "TEXT":
          dispatch({ type: "ANSWER_CHANGED", data: { newText: body.answer, quizIndex: quizIndex, questionIndex: questionIndex, answerIndex: answerIndex } })
          break;
        case "CHECKBOX":
          dispatch({ type: "CORRECT_TOGGLE", data: { newText: body.answer, quizIndex: quizIndex, questionIndex: questionIndex, answerIndex: answerIndex } })
          break;
        default:
          break;
      }
    } catch (e) {
      console.log(e)
    }
  }

  //// DELETE ------------------------------------------------------------------------------------------------

  const deleteQuestion = async (event, quizIndex, questionIndex) => {
    let quizId = state[quizIndex].id;
    let questionId = state[quizIndex].quizQuestions[questionIndex].id;
    try {
      let result = await axios.delete(path + "quiz/" + quizId + "/question/" + questionId)
      dispatch({ type: "DELETE_QUESTION", data: { newText: '', quizIndex: quiz, questionIndex: questionIndex } })
    } catch (e) {
      console.log(e)
    }
  }

  const deleteQuiz = async (event, quizIndex) => {
    let quizId = state[quizIndex].id;
    try {
      setQuiz(0)
      let result = await axios.delete(path + "quiz/" + quizId)
      dispatch({ type: "DELETE_QUIZ", data: { newText: '', quizIndex: quizIndex } })
    } catch (e) {
      console.log(e)
    }
  }

  const deleteAnsweroption = async (event, quizIndex, questionIndex, answerIndex) => {
    let quizId = state[quizIndex].id;
    let questionId = state[quizIndex].quizQuestions[questionIndex].id;
    let answerId = state[quizIndex].quizQuestions[questionIndex].answerOptions[answerIndex].id;
    try {
      let result = await axios.delete(path + "quiz/" + quizId + "/question/" + questionId + "/answer/" + answerId)
      dispatch({ type: "DELETE_ANSWER", data: { newText: '', quizIndex: quiz, questionIndex: questionIndex, answerIndex: answerIndex } })
    } catch (e) {
      console.log(e)
    }
  }

  //// MISC ---------------------------------------------------------------------------------------------------
  const selectQuiz = (quizNo) => {
    setQuiz(quizNo);
  }

  const toggleAnswers = () => {
    setAnswersVisible(!answersVisible);
  }

  const [status, setStatus] = React.useState({
    teacherMode: false,
  });

  const handleChange = (event) => {
    setStatus({ ...status, [event.target.name]: event.target.checked });
  };

  // const [topicList, setTopicList] = useState([])
  // const buildTopicList = (topic) => {
  //   if (!topicList.includes(topic)) {
  //     var newTopicList = [...topicList].concat(topic)
  //     setTopicList(newTopicList)
  //   }
  // }



  //// JSX ------------------------------------------------------------------------------------------------------
  return (
    <div>
      <Container className="quizContainer">
        <ButtonAppBar switchLanguage={switchLanguage} language={lan} />
        <Switch>
          <Route exact path="/register" component={withRouter(Register)} />
          <Route exact path="/login" component={withRouter(Login)} />
          <Route exact path="/">
            <div className={classes.root}>
              <FormControlLabel
                control={
                  <MaterialSwitch
                    checked={status.teacherMode}
                    onChange={handleChange}
                    name="teacherMode"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                }
                label={strings.teachermode} /><br />

              {dataAlustettu ? state.map((val, index) => {
                return <Button variant="outlined" onClick={() => selectQuiz(index)}>{val.quizname}</Button>
              }) : null}
              {status.teacherMode && dataAlustettu ? <div><NewQuizDialog addNewQuiz={addQuiz} /></div> : ""}
            </div>
            {dataAlustettu ?
              <div className="questionCard">
                <Paper elevation={1} margin="10%">
                  {status.teacherMode 
                  ? <EditQuizTitleComponent quizname={state[quiz].quizname} quizid={state[quiz].id} quizindex={quiz} updateQuiz={updateQuiz} deleteQuiz={deleteQuiz}/> 
                  : <QuizTitleComponent quizname={state[quiz].quizname}/>}
                </Paper>
              </div>
              : ""}
            {dataAlustettu ? state[quiz].quizQuestions.map((value, parentIndex) => {
              return (
                <div className="questionCard">
                  <Paper elevation={1}>
                    <List className={classes.root}>
                      <h3>{value.topicArea}</h3>
                      {status.teacherMode ?
                        <EditQuestion value={value} quiz={quiz} parentIndex={parentIndex} updateQuestion={updateQuestion} deleteQuestion={deleteQuestion} />
                        : <div className="question">{value.question}</div>
                      }
                      {value.answerOptions.map((value, index) => {
                        return (
                          <div>
                            {status.teacherMode ?
                              <EditAnswerOption value={value} quiz={quiz} parentIndex={parentIndex} index={index} status={status}
                                updateAnsweroption={updateAnsweroption}
                                deleteAnsweroption={deleteAnsweroption}
                                dispatch={dispatch}
                              />
                              : <AnswerOption value={value} quiz={quiz} parentIndex={parentIndex} index={index} answersVisible={answersVisible} />}
                          </div>
                        )
                      })}
                      {status.teacherMode ? <div className="addButton"><Button onClick={(event) => addAnsweroption(event, quiz, parentIndex)}><AddCircleIcon /></Button></div> : ""}
                    </List>
                  </Paper>
                </div>
              );
            })
              : null}
            <div className="bottomButtons">
              {status.teacherMode ? <Button variant="contained" onClick={(event) => addQuestion(event, quiz)}><AddIcon />   {strings.addnewanswer}</Button> :
                <Button variant="contained" onClick={() => toggleAnswers()}>{answersVisible ? strings.hidecorrect : strings.showcorrect}</Button>
              }</div>

          </Route>
        </Switch>
      </Container >
    </div >
  );
}
export default withSnackbar(App);

