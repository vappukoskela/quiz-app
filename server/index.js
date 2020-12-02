var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
 
var app = express()
module.exports = app
var port = process.env.PORT || 5000
app.use(bodyParser.json())
//https://expressjs.com/en/resources/middleware/cors.html
app.use(cors())

// käytä to_timestamp

// get all quizzes
const db = require('./db')
app.get('/quiz', (req, res, next) => {
  db.query('SELECT * FROM quizzes', (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
});

// get questions by quiz_id
app.get('/quiz/:id/question', (req, res, next) => {
  db.query('SELECT * FROM questions WHERE quiz_id = $1', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
});

// get answeroptions by question_id
app.get('/quiz/:id/question', (req, res, next) => {
  db.query('SELECT * FROM answeroptions WHERE question_id = $1', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
});

// get quiz by ID
app.get('/quiz/:id', (req, res, next) => {
  db.query('SELECT * FROM quizzes WHERE id = $1', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows[0])
  })
});

// --------------------- POST -----------------------


// add a quiz
app.post('/quiz', (req, res, next) => {
  db.query('INSERT INTO quizzes (quizname, user_id) values ($1, $2)', [req.body.quizname, req.body.user_id], (err,result) => {
    if (err) {
      return next(err)
    }
    console.log(req.body)
    res.send(req.body)
  })
})

// add a question to quiz
app.post('/addquestion/:id', (req, res, next) => {
  db.query('INSERT INTO questions (question, quiz_id) values ($1, $2)', [req.body.question, req.body.quiz_id], (err,result) => {
    if (err) {
      return next(err)
    }
    console.log(req.body)
    res.send(req.body)
  })
})

// add an answeroption to question
app.post('/addanswer/:id/question/:id2', (req, res, next) => {
  db.query('INSERT INTO answeroptions (quiz_id,answer, correct, question_id) values ($1, $2, $3, $4)', [req.body.quiz_id, req.body.answer, req.body.correct, req.body.question_id], (err,result) => {
    if (err) {
      return next(err)
    }
    console.log(req.body)
    res.send(req.body)
  })
})

// --------------------------------------------------

// update quiz name
app.put('/quiz/:id', (req, res, next) => {
  db.query('UPDATE quizzes SET quizname=$1 WHERE id=$2)', [req.body.quizname, req.body.quiz_id], (err,result) => {
    if (err) {
      return next(err)
    }
    console.log(req.body)
    res.send(req.body)
  })
})

// update question text
app.put('/quiz/:id/question/:id2', (req, res, next) => {
  db.query('UPDATE questions SET question=$1 WHERE id=$2)', [req.body.question, req.body.question_id], (err,result) => {
    if (err) {
      return next(err)
    }
    console.log(req.body)
    res.send(req.body)
  })
})

// update answeroption text and correct option
app.put('/quiz/:id/question/:id2/answer/:id3', (req, res, next) => {
  db.query('UPDATE answeroptions SET answer=$2, correct=$3 where id=$1', [req.body.answer_id, req.body.answer, req.body.correct], (err,result) => {
    if (err) {
      return next(err)
    }
    console.log(req.body)
    res.send(req.body)
  })
})

// ------- DELETE ---------------------------------

// delete quiz
app.delete('/quiz/:id', (req, res, next) => {
  db.query('DELETE FROM quizzes WHERE id=$1', [req.body.quiz_id], (err,result) => {
    if (err) {
      return next(err)
    }
    console.log(req.body)
    res.send(req.body)
  })
})

// delete question
app.delete('/quiz/:id/questions/:id2', (req, res, next) => {
  db.query('DELETE FROM questions WHERE id=$1', [req.body.question_id], (err,result) => {
    if (err) {
      return next(err)
    }
    console.log(req.body)
    res.send(req.body)
  })
})

// delete answeroption
app.delete('/quiz/:id/question/:id2/answer/:id3', (req, res, next) => {
  db.query('DELETE FROM answeroptions WHERE id=$1', [req.body.answer_id], (err,result) => {
    if (err) {
      return next(err)
    }
    console.log(req.body)
    res.send(req.body)
  })
})

// ------ LISTEN -------------------------

app.listen(port, () => {
    console.log("Palvelin käynnistyi portissa: " + port)
})
