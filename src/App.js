
import './App.css';
import React, { useEffect, useState } from 'react';
import ButtonAppBar from './ButtonAppBar';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

import {Container, Card, Paper, Button, Avatar, ListItemAvatar} from '@material-ui/core';

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

  const initialData = [{
    quizName: "Mining",
    quizQuestions: [
      {
      question: "What is sepiolite also called?",
      answerOptions: [
      {
        answer: "Montmonite",
        correct: false,
        selected: false
      },{
        answer: "Calcite",
        correct: false,
        selected: false
      },{
        answer: "Meerschaum",
        correct: true,
        selected: false
      },{
        answer: "Silica gel",
        correct: false,
        selected: false
      }
      ]},
      {
      question: "How is sepiolite commonly mined?",
      answerOptions: [
      {
        answer: "Surface mining",
        correct: true,
        selected: false
      },{
        answer: "Shaft mining",
        correct: false,
        selected: false
      },{
        answer: "In situ mining",
        correct: false,
        selected: false
      },{
        answer: "Fracking",
        correct: false,
        selected: false
      }
      ]},{
      question: "Which country is the largest sepiolite producer in the world?",
      answerOptions: [
      {
        answer: "USA",
        correct: false,
        selected: false
      },{
        answer: "Tanzania",
        correct: false,
        selected: false
      },{
        answer: "Spain ",
        correct: true,
        selected: false
      },{
        answer: "Turkey",
        correct: false,
        selected: false
      }
      ]},{
      question: "Which state holds the largest bentonite mine in the USA?",
      answerOptions: [
      {
        answer: "Kentucky",
        correct: false,
        selected: false
      },{
        answer: "Ohio",
        correct: false,
        selected: false
      },{
        answer: "Wisconsin ",
        correct: false,
        selected: false
      },{
        answer: "Wyoming",
        correct: true,
        selected: false
      }
      ]}
    ]},{
    quizName: "Eurovision",
    quizQuestions: [
    {
      question: "Which country won the Eurovision song contest in 2014?",
      answerOptions: [
      {
        answer: "Australia",
        correct: false,
        selected: false
      },{
        answer: "Azerbaijan",
        correct: false,
        selected: false
      },{
        answer: "Armenia",
        correct: false,
        selected: false
      },{
        answer: "Austria",
        correct: true,
        selected: false
      }
    ]},
      {
      question: "Which country has the most wins in the Eurovision Song Contest?",
      answerOptions: [
      {
        answer: "France",
        correct: false,
        selected: false
      },{
        answer: "Ireland",
        correct: true,
        selected: false
      },{
        answer: "Sweden",
        correct: false,
        selected: false
      },{
        answer: "The United Kingdom",
        correct: false,
        selected: false
      }
    ]}
  ]}
];

  const classes = useStyles();
  const [data, setData] = useState(initialData)
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
  
  const selectQuiz = (quizNo) => {
    setQuiz(quizNo);
  }

  const toggleAnswers = () => {
    setAnswersVisible(!answersVisible);
  }

  return (
    <div>
      <ButtonAppBar/>
        <Container className="quizContainer">
        <div className={classes.root}>
          <Button variant="outlined" onClick={() => selectQuiz(0)}>Mining quiz</Button> 
          <Button variant="outlined" onClick={() => selectQuiz(1)}>Eurovision quiz</Button>
        </div>
            {data[quiz].quizQuestions.map((value, parentIndex) => {
              return(
                <div className="questionCard">
                <Card elevation={1}>
                <List className={classes.root}>
                <p className="question">{value.question}</p>
                {value.answerOptions.map((value, index) => {
                  return(
                  <ListItem key={index} role={undefined} dense >
                   { answersVisible ? <ListItemIcon>
                      <Checkbox
                        onChange={(event) => handleToggle(event, index, parentIndex)}
                        checked={value.correct}
                        edge="start"
                        tabIndex={-1}
                        hidden={answersVisible}
                        disabled
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
                    <ListItemText id={index} primary={value.answer} />
                  </ListItem>
                  )
                })}
                </List>
                </Card>
                </div>
              );
            })}<br/>
            <div className="bottomButtons">
              <Button variant="contained" onClick={() => toggleAnswers()}>{answersVisible ? "Hide answers" : "Show answers"}</Button> <br />
            </div>
        </Container>
    </div>
  );
}

export default App;