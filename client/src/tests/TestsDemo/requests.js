  import React from 'react'
  import axios from 'axios'

  // HTTP-pyyntöjä yksinkertaistettuna testauksen tarkastelua varten

  // GET
  const getQuizById = async(id) => {
    return await axios.get("http://localhost:5000/quiz/"+id)
    .then(res=>res.data).catch(err=>err)
  }

  // POST
  const addQuestion = async (quizId) => {
    let body = {}
    return await axios.post("http://localhost:5000/quiz/" + quizId, body).then(response =>response)
    .catch(err => err);
  }

  // GET: Tämä mockataan
  const getAllQuizzes = async() => {
    return await axios.get("http://localhost:5000/quiz").then(res => res.data).catch(err=>err)
  }

  module.exports.getQuizById = getQuizById;
  module.exports.addQuestion = addQuestion;
  module.exports.getAllQuizzes = getAllQuizzes;