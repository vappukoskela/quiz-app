import './App.css';
import React, { useEffect, useState, useReducer } from 'react';
import ButtonAppBar from './components/ButtonAppBar';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import { Container, Paper, Button } from '@material-ui/core';
import axios from 'axios';
import Register from './components/Register'
import EditQuestion from './components/EditQuestion';
import EditAnswerOption from './components/EditAnswerOption';
import AnswerOption from './components/AnswerOption';
import Login from './components/Login';
import {
  Switch,
  Route
} from "react-router-dom";
import strings from './localization/strings';
import { useSnackbar, withSnackbar } from 'notistack';
import socketIOClient from 'socket.io-client'
import NewQuizDialog from './components/NewQuizDialog';
import EditQuizTitleComponent from './components/EditQuizTitleComponent';
import QuizTitleComponent from './components/QuizTitleComponent';
import CorrectAnswersCard from './components/CorrectAnswersCard';
import { map, toLower } from 'lodash';
var sIOEndpoint = ''

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
    sIOEndpoint = 'https://vappus-quiz-app.herokuapp.com'
    break;
  case 'development':
    path = 'http://localhost:5000/'
    sIOEndpoint = 'http://localhost:5000'
    break;
  case 'test':
    path = 'http://localhost:5000/'
    break;
  default:
    // eslint-disable-next-line no-throw-literal
    throw "Environment not set"
}

// ----------------REDUCER----------------------------------------------------
function reducer(state, action) {
  let deepCopy = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case "INIT_DATA":
      return action.data; /// <--- this should be state
    case "ANSWER_CHANGED":
      deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].answerOptions[action.data.answerIndex].answer = action.data.newText;
      return deepCopy;
    case "QUESTION_CHANGED":
      deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].question = action.data.newText;
      return deepCopy;
    case "QUIZ_CHANGED":
      deepCopy[action.data.quizIndex].quizname = action.data.newText;
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
    case "USERANSWER_CHANGED":
      deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].answerOptions[action.data.answerIndex].selected = action.data.selected;
      return deepCopy;
    case "UPDATE_POINTS":
      deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].points = action.data.points;
      deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].correctOptions = action.data.correctOptions;
      console.log(deepCopy)
      return deepCopy;
    default:
      throw new Error();
  }
}

// ----------------APP-------------------------------------------------------

function App() {

  const classes = useStyles();
  const [dataAlustettu, setDataAlustettu] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [answersVisible, setAnswersVisible] = useState(false);
  const [state, dispatch] = useReducer(reducer, []);
  const [loggedIn, setLoggedIn] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [lan, setLan] = useState('en')
  const { enqueueSnackbar } = useSnackbar();
  const [token, setToken] = useState(localStorage.getItem('jwtToken'))
  const [user, setUser] = useState({
    firstname: "",
    surname: "",
    email: "",
    id: null,
    role_id: null
  })

  /// LOGIN
  const logOut = () => {
    setUser({
      firstname: "",
      surname: "",
      email: "",
      id: null,
      role_id: null
    })
    setLoggedIn(false)
    setAdmin(false)
    setToken(null)
    setQuiz(null)
    setAnswersVisible(false)
    localStorage.removeItem('jwtToken')
  }


  useEffect(() => {
    console.log("TOKEN ", token)
    if (token === null) {
      setLoggedIn(false)
    }
    else {
      setLoggedIn(true)
      // if (loggedIn) {
      getUser() // get user profile to populate user object
      // }
    }
  }, [loggedIn, token])

  const getUser = async () => {
    try {
      await axios.get(path + "user?secret_token=" + token).then(response => {
        setUser(
          {
            firstname: response.data.firstname,
            surname: response.data.surname,
            email: response.data.username,
            id: response.data.id,
            role_id: response.data.role_id
          }
        )
        if (response.data.role_id == 2) {
          setAdmin(true)
        }
        setLoggedIn(true)
      })
    } catch (e) {
      console.log("error getting user", e)
    }
  }

  const submitRegistration = async (userData) => {
    var emailLower = toLower(userData.email)
    console.log(userData)
    let body = {
      email: emailLower,
      password: userData.password,
      firstname: userData.firstname,
      surname: userData.surname,
      role_id: userData.role_id
    }
    console.log(body)
    try {
      await axios.post(path + "register/", body).then(response => {
        var snackMsg = strings.registersuccess
        enqueueSnackbar(snackMsg, { variant: 'success' })
        if (userData.role_id == 2) {
          setAdmin(true)
        }
        setUser(userData)
        setLoggedIn(true)
      })

    } catch (e) {
      var snackMsg = strings.registerfail
      enqueueSnackbar(snackMsg, { variant: 'error' })
      console.log("registration error", e)
    }
  }

  const submitLogin = async (userData) => {
    var emailLower = toLower(userData.email)
    let body = {
      email: emailLower,
      password: userData.password,
    }
    console.log(body)
    try {
      await axios.post(path + "login/", body).then(response => {
        console.log(response, "LOGIN RESPONSE")
        localStorage.setItem('jwtToken', response.data.token)
        setUser({
          firstname: response.data.userObj.firstname,
          surname: response.data.userObj.surname,
          email: response.data.userObj.username,
          id: response.data.userObj.id,
          role_id: response.data.userObj.role_id
        })
        if (response.data.userObj.role_id == 2) {
          setAdmin(true)
        }
        setLoggedIn(true)
        setToken(response.data.token)
        var snackMsg = strings.loginsuccess
        enqueueSnackbar(snackMsg, { variant: 'success' })
      })
    } catch (e) {
      var snackMsg = strings.loginfail
      enqueueSnackbar(snackMsg, { variant: 'error' })
      console.log("login error", e)
    }
  }

  useEffect(() => {
    const socket = socketIOClient(sIOEndpoint)
    socket.on('connected', function (data) {
      socket.emit('ready for data', {})
      enqueueSnackbar('Socket connected!')
    });
    socket.on('update', function (data) {
      var snackMsg = ""
      switch (data.message.channel) {
        case "addquiz":
          snackMsg = "New Quiz: " + data.message.payload
          break;
        case "adduser":
          snackMsg = data.message.payload + " just registered for the first time!"
          break;
        case "alterquiz":
          let thisPayload = JSON.parse(data.message.payload)
          snackMsg = "Quiz: " + thisPayload.old + " was renamed to " + thisPayload.new
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
                let answers = await axios.get(path + "useranswer/" + user.id + "/question/" + result.data[i].quizQuestions[j].id + "/answer")
                result.data[i].quizQuestions[j].answerOptions = answers.data;
                result.data[i].quizQuestions[j].points = 0;
                result.data[i].quizQuestions[j].correctOptions = 0;
              }
            }
          }
          dispatch({ type: "INIT_DATA", data: result.data })
          setDataAlustettu(true)
        } else {
          // eslint-disable-next-line no-throw-literal
          throw ("No data :(")
        }
      }
      catch (exception) {
        console.log("fetchData exception", exception)
      }
    }

    fetchData();

  }, [user])

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
    console.log(event.target.value)
    let quizId = state[quizIndex].id;
    let body = {
      quizname: event.target.value
    }
    try {
      let result = await axios.put(path + "quiz/" + quizId, body)
      dispatch({ type: "QUIZ_CHANGED", data: { newText: body.quizname, quizIndex: quizIndex } })
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
    console.log(state[quizIndex].quizQuestions[questionIndex].answerOptions[answerIndex])
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

  const updateUseranswer = async (event, quizIndex, questionIndex, answerIndex) => {
    let quizId = state[quizIndex].id;
    let questionId = state[quizIndex].quizQuestions[questionIndex].id;
    let answerId = state[quizIndex].quizQuestions[questionIndex].answerOptions[answerIndex].id;
    let body = {};

    if (state[quizIndex].quizQuestions[questionIndex].answerOptions[answerIndex].selected === null) {
      body.selected = true
      let result = await axios.post(path + "useranswers/" + user.id + "/answer/" + answerId, body)
    } else {
      // invert
      body.selected = !state[quizIndex].quizQuestions[questionIndex].answerOptions[answerIndex].selected;
      let result = await axios.put(path + "useranswers/" + user.id + "/answer/" + answerId, body)
    }
    dispatch({ type: "USERANSWER_CHANGED", data: { selected: body.selected, quizIndex: quizIndex, questionIndex: questionIndex, answerIndex: answerIndex } })
    console.log('update user answer', body.selected)

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
      setQuiz(null)
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
    console.log(state)
    for (var i = 0; i < state.length; i++){
      tallyAnswersForQuestions(i)
    }
  }


  const tallyAnswersForQuestions = (quizIndex) => {
    var talliedQuiz = state[quizIndex]
    var questionPoints, correctOptions;

    for (var i = 0; i < talliedQuiz.quizQuestions.length; i++) {
      for (var j = 0; j < talliedQuiz.quizQuestions[i].answerOptions.length; j++) {
        if (j === 0) {
          questionPoints = 0;
          correctOptions = 0
        } // reset
        if (talliedQuiz.quizQuestions[i].answerOptions[j].correct) {
          correctOptions++;
          if (talliedQuiz.quizQuestions[i].answerOptions[j].selected) {
            questionPoints++;
          } // else {} option for minus points for wrong questions
        }
      }
      dispatch({ type: "UPDATE_POINTS", data: { points: questionPoints, correctOptions: correctOptions, quizIndex: quizIndex, questionIndex: i } })
    }
  }

  //// JSX ------------------------------------------------------------------------------------------------------
  return (
    <div>
      <Container className="quizContainer">
        <ButtonAppBar switchLanguage={switchLanguage} user={user} isLoggedIn={loggedIn} logOut={logOut} language={lan} />

        <Switch>
          <Route exact path="/register" component={() => <Register submitRegistration={submitRegistration} isRegistered={loggedIn} />} />
          <Route exact path="/">
            {loggedIn ?
              <div>
                <div className={classes.root}>
                  {dataAlustettu && state.length > 0 ? state.map((val, index) => {
                    return <Button variant="outlined" onClick={() => setQuiz(index)}>{val.quizname}</Button>
                  }) : null}
                  {admin ? <div><NewQuizDialog addNewQuiz={addQuiz} /></div> : ""}
                </div>
                {quiz != null ?
                  <div className="questionCard">
                    <Paper elevation={1} padding="10%">
                      {admin
                        ? <EditQuizTitleComponent quizname={state[quiz].quizname} quizid={state[quiz].id} quizindex={quiz} updateQuiz={updateQuiz} deleteQuiz={deleteQuiz} />
                        : <QuizTitleComponent quizname={state[quiz].quizname} />}
                    </Paper>
                  </div>
                  : ""}
                {quiz != null ? state[quiz].quizQuestions.map((value, parentIndex) => {
                  return (
                    <div className="questionCard">
                      <Paper elevation={1}>
                        <List className={classes.root}>
                          <h3>{value.topicArea}</h3>
                          {admin ?
                            <EditQuestion value={value} quiz={quiz} parentIndex={parentIndex} updateQuestion={updateQuestion} deleteQuestion={deleteQuestion} />
                            : <div className="question">{value.question}</div>
                          }
                          {value.answerOptions.map((value, index) => {
                            return (
                              <div>
                                {admin ?
                                  <EditAnswerOption value={value} quiz={quiz} parentIndex={parentIndex} index={index}
                                    updateAnsweroption={updateAnsweroption}
                                    updateUseranswer={updateUseranswer}
                                    deleteAnsweroption={deleteAnsweroption}
                                    dispatch={dispatch}
                                  />
                                  : <AnswerOption updateUseranswer={updateUseranswer} value={value} quiz={quiz} parentIndex={parentIndex} index={index} answersVisible={answersVisible} />}
                              </div>
                            )
                          })}
                          {answersVisible ? <div>{state[quiz].quizQuestions[parentIndex].points}/{state[quiz].quizQuestions[parentIndex].correctOptions} {strings.correct}</div> : null}
                          {admin ? <div className="addButton"><Button onClick={(event) => addAnsweroption(event, quiz, parentIndex)}><AddCircleIcon /></Button></div> : ""}
                        </List>
                      </Paper>
                    </div>
                  );
                })
                  : null}
                <div className="bottomButtons">
                  {admin && quiz != null ? <Button variant="contained" onClick={(event) => addQuestion(event, quiz)}><AddIcon />   {strings.addnewquestion}</Button> : null}
                  {!admin && quiz != null ? <Button variant="contained" onClick={() => toggleAnswers()}>{answersVisible ? strings.hidecorrect : strings.showcorrect}</Button> : null}
                </div>
              </div> :
              <Login submitLogin={submitLogin} isLoggedIn={loggedIn} />}
          </Route>
        </Switch>
      </Container >
    </div >
  );
}
export default withSnackbar(App);

