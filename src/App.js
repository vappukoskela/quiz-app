import './App.css';
import React, { useEffect, useState } from 'react';
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
import {Container, Paper, Button, Switch, FormControlLabel, TextField} from '@material-ui/core';

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

function App() {
  const initialData = [...quizzesImported].map((quizObject) => {
    console.log(quizObject)
    quizObject.uuid = uuid();
    quizObject.quizQuestions.map((questionObject) => {
      console.log(questionObject)
      questionObject.uuid = uuid();

      return questionObject
    })
    return quizObject
  });
  console.log("INITIAL DATA BELOW")
  console.log(initialData)
  const classes = useStyles();
  const [data, setData] = useState([])
  const [dataAlustettu, setDataAlustettu] = useState(false)
  const [quiz, setQuiz] = useState(0);
  const [answersVisible, setAnswersVisible] = useState(false)

  useEffect(() => {
    let jemma = window.localStorage;
    let tempData = JSON.parse(jemma.getItem("data"))
    if (tempData == null) {
      jemma.setItem("data", JSON.stringify(initialData))
      tempData = initialData
    } 
    setData(tempData);
    setDataAlustettu(true)
  }, [])

  useEffect(() => {
    if (dataAlustettu) {
      window.localStorage.setItem("data", JSON.stringify(data))
    }
  }, [data])

  const handleToggle = (event, index, parentIndex) => {
    let deepCopy = JSON.parse(JSON.stringify(data))
    deepCopy[quiz].quizQuestions[parentIndex].answerOptions[index].selected = !deepCopy[quiz].quizQuestions[parentIndex].answerOptions[index].selected;
    setData(deepCopy)
  };

  const handleCorrectToggle = (event, index, parentIndex) => {
    let deepCopy = JSON.parse(JSON.stringify(data))
    deepCopy[quiz].quizQuestions[parentIndex].answerOptions[index].correct = !deepCopy[quiz].quizQuestions[parentIndex].answerOptions[index].correct;
    setData(deepCopy)
  };
  
  const selectQuiz = (quizNo) => {
    setQuiz(quizNo);
  }

  const toggleAnswers = () => {
    setAnswersVisible(!answersVisible);
  }

  // --------------------------------------
  
  const addNewQuestion= (quizIndex) => {
    let deepCopy = JSON.parse(JSON.stringify(data))
    let newQuestion= {question: "", answerOptions: [ {answer: "", correct: false, selected: false,uuid: uuid()}], uuid: uuid() }
    deepCopy[quizIndex].quizQuestions.push(newQuestion) 
    setData(deepCopy)
  }

  const addNewAnswer= (quizIndex, questionIndex) => {
    let deepCopy = JSON.parse(JSON.stringify(data))
    let newAnswer= {answer: "", correct: false, selected: false, uuid: uuid()}
    deepCopy[quizIndex].quizQuestions[questionIndex].answerOptions.push(newAnswer) 
    setData(deepCopy)
  }

  const questionChanged = (event, quizIndex, questionIndex) => {
    let deepCopy = JSON.parse(JSON.stringify(data))
    deepCopy[quizIndex].quizQuestions[questionIndex].question = event.target.value;
    setData(deepCopy)
  }

  const answerChanged = (event, quizIndex, questionIndex, answerIndex) => {
    let deepCopy = JSON.parse(JSON.stringify(data))
    deepCopy[quizIndex].quizQuestions[questionIndex].answerOptions[answerIndex].answer = event.target.value;
    setData(deepCopy)
  }

  const deleteQuestion = (quizIndex, questionIndex) => {
    let deepCopy = JSON.parse(JSON.stringify(data))
    deepCopy[quizIndex].quizQuestions.splice(questionIndex,1)
    setData(deepCopy)
  }

  const deleteAnswer = (quizIndex, questionIndex, answerIndex) => {
    let deepCopy = JSON.parse(JSON.stringify(data))
    deepCopy[quizIndex].quizQuestions[questionIndex].answerOptions.splice(answerIndex,1)
    setData(deepCopy)
  }

  // --------------------------------------

  const [status, setStatus] = React.useState({
    teacherMode: true,
  });

  const handleChange = (event) => {
    setStatus({ ...status, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <ButtonAppBar/>
      <Container className="quizContainer">
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
        label="Teacher mode"/><br/>
        {data.map((val, index) => {
          return (
            <Button variant="outlined" onClick={() => selectQuiz(index)}>{val.quizName}</Button>
          )
        })}
        </div>
            {dataAlustettu ? data[quiz].quizQuestions.map((value, parentIndex) => {
              return(
                <div className="questionCard">
                <Paper elevation={1}>
                <List className={classes.root}>
                {status.teacherMode ?  
                  <ListItem key={value.uuid} role={undefined} dense >
                  <TextField fullWidth onChange={(event) => questionChanged(event, quiz, parentIndex)} size="small" label={"Question " + (parentIndex+1)} variant="outlined" value={value.question}/> 
                  <Button className="deleteButton" onClick={() => deleteQuestion(quiz, parentIndex)}><DeleteIcon/></Button>
                 </ListItem>
                : <div className="question">{value.question}</div>}
                {value.answerOptions.map((value, index) => {
                  return(
                  <ListItem key={value.uuid} role={undefined} dense >
                   { answersVisible || status.teacherMode ? <ListItemIcon>
                      <Checkbox
                        onChange={(event) => handleCorrectToggle(event, index, parentIndex)}
                        checked={value.correct}
                        edge="start"
                        tabIndex={-1}
                        hidden={answersVisible}
                        disabled={!status.teacherMode}
                      />
                    </ListItemIcon> : null }
                    <ListItemIcon>
                      <Checkbox
                        onChange={(event) => handleToggle(event, index, parentIndex)}
                        checked={value.selected}
                        edge="start"
                        tabIndex={-1}
                      />
                    </ListItemIcon>
                    {status.teacherMode ?  
                      <div>
                        <TextField onChange={(event) => answerChanged(event, quiz, parentIndex, index)} size="small" label={"Answer " + (index+1)} variant="outlined" value={value.answer}/>
                        <Button className="deleteButton" onClick={() => deleteAnswer(quiz, parentIndex, index)}><DeleteIcon/></Button> 
                      </div>
                      :  <ListItemText id={index} primary={value.answer} />
                    }
                  </ListItem>
                  )
                })}
                {status.teacherMode ? <div className="addButton"><Button onClick={() => addNewAnswer(quiz, parentIndex)}><AddCircleIcon/></Button></div> : ""}
                </List>
                </Paper>
                </div>
              );
            }): "" }
            <div className="bottomButtons">
            {status.teacherMode ? <Button variant="contained" onClick={() =>addNewQuestion(quiz)}><AddIcon/>   Add new question</Button> : 
            <Button variant="contained" onClick={() => toggleAnswers()}>{answersVisible ? "Hide correct answers" : "Show correct answers"}</Button> 
            }</div>
      </Container>
    </div>
  );
}

export default App;