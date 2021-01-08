var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
const routes = require("./routes/routes");

var app = express()
module.exports = app
var port = process.env.PORT || 5000
app.use(bodyParser.json())
//https://expressjs.com/en/resources/middleware/cors.html
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))
app.use(routes)

// middleware jutut
// app.use('/timeis',function(req,res,next) {
//   console.log('kello on:', Date.now())
//   next()
// })
// käytä to_timestamp




// get all quizzes
const db = require('./db')
app.get('/quiz', cors(), (req, res, next) => {
  db.query('SELECT * FROM quizzes', (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
});

// get questions by quiz_id
app.get('/quiz/:quiz_id/question', cors(), (req, res, next) => {
  db.query('SELECT * FROM questions WHERE quiz_id = $1', [req.params.quiz_id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
});

// get answeroptions by question_id
app.get('/quiz/:id/question/:question_id/answer', cors(), (req, res, next) => {
  db.query('SELECT * FROM answeroptions WHERE question_id = $1', [req.params.question_id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
});

// get quiz by ID
app.get('/quiz/:id', cors(), (req, res, next) => {
  db.query('SELECT * FROM quizzes WHERE id = $1', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows[0])
  })
});


// get all users
app.get('/user/', cors(), (req, res, next) => {
  db.query('SELECT * from users', (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
})

// get user by id
app.get('/user/:id', cors(), (req, res, next) => {
  db.query('SELECT * from users WHERE id = $1', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows[0])
  })
})
// --------------------- POST -----------------------


// add a quiz
app.post('/quiz', cors(), (req, res, next) => {
  db.query('INSERT INTO quizzes (quizname, user_id) values ($1, $2) RETURNING id', [req.body.quizname, req.body.user_id], (err, result) => {
    if (err) {
      return next(err)
    }
    console.log(result.rows[0])
    res.send(result.rows[0])
  })
})

// add a question to quiz
app.post('/quiz/:id', cors(), (req, res, next) => {
  db.query('INSERT INTO questions (question, quiz_id) values ($1, $2) RETURNING id', [req.body.question, req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    console.log(result.rows[0])
    res.send(result.rows[0])
  })
})

// add an answeroption to question
app.post('/quiz/:id/question/:id2', cors(), (req, res, next) => {
  db.query('INSERT INTO answeroptions (quiz_id, answer, correct, question_id) values ($1, $2, $3, $4) RETURNING id', [req.params.id, req.body.answer, req.body.correct, req.params.id2], (err, result) => {
    if (err) {
      return next(err)
    }
    console.log(result.rows[0])
    res.send(result.rows[0])
  })
})

// add new user
app.post('/user', cors(), (req, res, next) => {
  db.query('INSERT INTO users (username, pw_hash, firstname, surname, role_id) values ($1, $2, $3, $4, $5) RETURNING id', [req.body.username, req.body.pw_hash, req.body.firstname, req.params.surname, req.params.role_id], (err, result) => {
    if (err) {
      return next(err)
    }
    console.log(result.rows[0])
    res.send(result.rows[0])
  })
})

// --------------------------------------------------

// update quiz name
app.put('/quiz/:id', cors(), (req, res, next) => {
  db.query('UPDATE quizzes SET quizname=$1 WHERE id=$2', [req.body.quizname, req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    console.log(req.body)
    res.send(req.body)
  })
})

// update question text
app.put('/quiz/:id/question/:id2', cors(), (req, res, next) => {
  db.query('UPDATE questions SET question=$1 WHERE id=$2', [req.body.question, req.params.id2], (err, result) => {
    if (err) {
      return next(err)
    }
    console.log(req.body)
    res.send(req.body)
  })
})

// update answeroption text and correct option
app.put('/quiz/:id/question/:id2/answer/:id3', cors(), (req, res, next) => {
  db.query('UPDATE answeroptions SET answer=$2, correct=$3 where id=$1', [req.params.id3, req.body.answer, req.body.correct], (err, result) => {
    if (err) {
      return next(err)
    }
    console.log(req.body)
    res.send(req.body)
  })
})

// ------- DELETE ---------------------------------

// delete quiz
app.delete('/quiz/:id', cors(), (req, res, next) => {
  db.query('DELETE FROM quizzes WHERE id=$1', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    console.log(req.body)
    res.send(req.body)
  })
})

// delete question
app.delete('/quiz/:id/question/:id2', cors(), (req, res, next) => {
  db.query('DELETE FROM questions WHERE id=$1', [req.params.id2], (err, result) => {
    if (err) {
      return next(err)
    }
    console.log(req.body)
    res.send(req.body)
  })
})

// delete answeroption
app.delete('/quiz/:id/question/:id2/answer/:id3', cors(), (req, res, next) => {
  db.query('DELETE FROM answeroptions WHERE id=$1', [req.params.id3], (err, result) => {
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


