import './App.css';
import React, { useEffect, useState, useReducer } from 'react';
import ButtonAppBar from './ButtonAppBar';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import quizzesImported from './Quizzes'
import uuid from 'react-uuid'
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import ChartsDemo from './ChartsDemo.js'
import { Container, Paper, Button, Switch, FormControlLabel, TextField } from '@material-ui/core';
import axios from 'axios';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  PieSeries,

} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

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

const chartData = {
  labels: ['Aihealue 1', 'Aihealue 2', 'Aihealue 3'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 100]
    }
  ]
};


const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

// ----------------REDUCER----------------------------------------------------

function reducer(state, action) {
  let deepCopy = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case "INIT_DATA":
      return action.data; /// <--- this should be state
    case "ANSWER_CHANGED":
      deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].answerOptions[action.data.answerIndex].answer = action.data.newText;
      return deepCopy;
    case "QUESTION_CHANGED":
      deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].question = action.data.newText;
      return deepCopy;
    case "QUIZ_CHANGED":
      //TODO: implement controls
      deepCopy[action.data.quizIndex].quizName = action.data.newText;
      return deepCopy;
    case "ADD_ANSWER":
      let newAnswer = { answer: "", correct: false, selected: false, uuid: uuid() }
      deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].answerOptions.push(newAnswer)
      return deepCopy;
    case "ADD_QUESTION":
      let newQuestion = { question: "", answerOptions: [{ answer: "", correct: false, selected: false, uuid: uuid() }], uuid: uuid() }
      deepCopy[action.data.quizIndex].quizQuestions.push(newQuestion)
      return deepCopy;
    case "ADD_QUIZ":
      let newQuiz = { quizName: "New Quiz", quizQuestions: [{ question: "", answerOptions: [{ answer: "", correct: false, selected: false, uuid: uuid() }], uuid: uuid() }], uuid: uuid() }
      deepCopy.push(newQuiz)
      return deepCopy;
    case "DELETE_ANSWER":
      deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].answerOptions.splice(action.data.answerIndex, 1)
      return deepCopy;
    case "DELETE_QUESTION":
      deepCopy[action.data.quizIndex].quizQuestions.splice(action.data.questionIndex, 1)
      return deepCopy;
    case "DELETE_QUIZ":
      // TODO: implement controls
      deepCopy[action.data.quizIndex].splice(action.data.quizIndex, 1)
      return deepCopy;
    case "SELECT_TOGGLE":
      deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].answerOptions[action.data.answerIndex].selected =
        !deepCopy[action.data.quizIndex].quizQuestions[action.data.questionIndex].answerOptions[action.data.answerIndex].selected;

      /*
       if( deepcopy jne....selected && deepcopyjne...correct) {
        answerCorrecti = true;
      }
      */
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


  useEffect(() => {
    const createData = async () => {
      try {
        const initialData = quizzesImported
        let result = await axios.post("http://localhost:3005/quizzes", initialData)
        dispatch({ type: "INIT_DATA", data: initialData })
        setDataAlustettu(true)
      } catch (exception) {
        alert("Tietokannan alustaminen epäonnistui" + exception)
      }
    }

    const fetchData = async () => {
      try {
        let result = await axios.get("http://localhost:3005/quizzes")
        if (result.data.length > 0) {
          dispatch({ type: "INIT_DATA", data: result.data })
          setDataAlustettu(true)

        } else {
          throw ("Nyt pitää data kyllä alustaa!")
        }
      }
      catch (exception) {
        createData();
        console.log(exception)
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    const updateData = async () => {
      try {
        let result = await axios.put("http://localhost:3005/quizzes", state)
      } catch (exception) {
        console.log("Datan päivitys ei onnistunut")
      }
      finally {

      }
    }
    if (dataAlustettu) {
      updateData();
    }
  }, [state])

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

  const [topicList, setTopicList] = useState([])

  const buildTopicList = (topic) => {
    if (!topicList.includes(topic)) {
      var newTopicList = [...topicList].concat(topic)
      setTopicList(newTopicList)
    }
  }


  return (
    <div>
      <ButtonAppBar />
      <Container className="quizContainer">


        <ChartsDemo/>

        
        <div className={classes.root}>
          <FormControlLabel
            control={
              <Switch
                checked={status.teacherMode}
                onChange={handleChange}
                name="teacherMode"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            }
            label="Teacher mode" /><br />
          {dataAlustettu ? state.map((val, index) => {
            return <Button variant="outlined" onClick={() => selectQuiz(index)}>{val.quizName}</Button>
          })
            : null}
          {status.teacherMode ? <Button onClick={(event) => dispatch({ type: "ADD_QUIZ", data: {} })}><AddCircleIcon /></Button> : ""}
        </div>

        {dataAlustettu ? state[quiz].quizQuestions.map((value, parentIndex) => {
          buildTopicList(value.topicArea)
          console.log(topicList)

          return (
            <div className="questionCard">
              <Paper elevation={1}>
                <List className={classes.root}>
                  <h3>{value.topicArea}</h3>
                  {status.teacherMode ?
                    <ListItem key={value.uuid} role={undefined} dense >
                      <TextField fullWidth onChange={(event) => dispatch({ type: "QUESTION_CHANGED", data: { newText: event.target.value, quizIndex: quiz, questionIndex: parentIndex } })} size="small" label={"Question " + (parentIndex + 1)} variant="outlined" value={value.question} />
                      <Button className="deleteButton" onClick={(event) => dispatch({ type: "DELETE_QUESTION", data: { newText: event.target.value, quizIndex: quiz, questionIndex: parentIndex } })}><DeleteIcon /></Button>
                    </ListItem>
                    : <div className="question">{value.question}</div>}
                  {value.answerOptions.map((value, index) => {

                    return (
                      <ListItem key={value.uuid} role={undefined} dense >
                        { answersVisible || status.teacherMode ? <ListItemIcon>
                          <GreenCheckbox
                            onChange={(event) => dispatch({ type: "CORRECT_TOGGLE", data: { newText: event.target.value, quizIndex: quiz, questionIndex: parentIndex, answerIndex: index } })}
                            checked={value.correct}
                            edge="start"
                            tabIndex={-1}
                            hidden={answersVisible}
                            disabled={!status.teacherMode}
                          />
                        </ListItemIcon> : null}
                        <ListItemIcon>
                          <Checkbox
                            onChange={(event) => dispatch({ type: "SELECT_TOGGLE", data: { newText: event.target.value, quizIndex: quiz, questionIndex: parentIndex, answerIndex: index } })}
                            checked={value.selected}
                            edge="start"
                            tabIndex={-1}
                          />
                        </ListItemIcon>
                        {status.teacherMode ?
                          <div>
                            <TextField onChange={(event) => dispatch({ type: "ANSWER_CHANGED", data: { newText: event.target.value, quizIndex: quiz, questionIndex: parentIndex, answerIndex: index } })} size="small" label={"Answer " + (index + 1)} variant="outlined" value={value.answer} />
                            <Button className="deleteButton" onClick={(event) => dispatch({ type: "DELETE_ANSWER", data: { newText: event.target.value, quizIndex: quiz, questionIndex: parentIndex, answerIndex: index } })}><DeleteIcon /></Button>
                          </div>
                          : <div><ListItemText id={index} primary={value.answer} /></div>
                        }
                      </ListItem>
                    )
                  })}
                  {status.teacherMode ? <div className="addButton"><Button onClick={(event) => dispatch({ type: "ADD_ANSWER", data: { newText: event.target.value, quizIndex: quiz, questionIndex: parentIndex } })}><AddCircleIcon /></Button></div> : ""}
                </List>
              </Paper>
            </div>
          );
        })
          : null}
        <div className="bottomButtons">
          {status.teacherMode ? <Button variant="contained" onClick={(event) => dispatch({ type: "ADD_QUESTION", data: { newText: event.target.value, quizIndex: quiz } })}><AddIcon />   Add new question</Button> :
            <Button variant="contained" onClick={() => toggleAnswers()}>{answersVisible ? "Hide correct answers" : "Show correct answers"}</Button>
          }</div> 
      </Container>

    </div>
  );
}

export default App;