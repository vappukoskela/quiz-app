const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(fileUpload({
  limits: { fileSize: 2 * 1024 * 1024 * 1024 },
}));

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

// add a file
app.post('/upload', cors(), (req, res) => {
  /* if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  } */
  try {
    console.log('here')
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("now here", req.files)
      return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let newFile = req.files.file;
    console.log(req.files)
    let date = Date.now().toString();
    let fileName = 'questionPhoto' + date + req.files.file.name;
    newFile.mv('./uploads/' + fileName)
    res.send({
      status: true,
      message: "file uploaded",
      data: {
        name: fileName,
        mimetype: newFile.mimetype,
        size: newFile.size
      }
    })
  }catch (err) {
    res.status(500).send(err)
  }
  // newFile.mv(fileName, function (err) {
  //     if (err) {
  //         return res.status(500).send(err)
  //     } else {
  //         parser.parseBankTransactions(fileName, (items) => {

  //             return res.json(items);

  //         });
  //     }
  // });
  console.log("hereweare")
});

//make uploads directory static
app.use(express.static('uploads'));


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


