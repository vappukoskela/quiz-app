const requests = require('./TestsDemo/requests');

// ASYNC: Jestillä voi testata asynkronisia funktioita
// Esimerkkinä HTTP-pyyntöjä

/////////////////////////////////////////////////////////
// OIKEITA KUTSUJA //////////////////////////////////////

// test('GET: returns quizname by id', async () => {
//     await requests.getQuizById(5).then(result => {
//         const quizname = result.quizname;
//         expect(quizname).toEqual('Computer Science');
//     });
// });

// // Katso mitä tietokannassa tapahtuu kun tämä ajetaan.....
// test('POST: adds a question', async () => {
//     await requests.addQuestion(5).then(result => {
//         console.log("UUDEN KYSYMYKSEN ID ON: " + result.data.id)
//         expect(result.status).toEqual(200)
//     })
// })

// HTTP-pyyntöjä voi myös mockata
// Mockin etuna on se, että tietokanta ei tukkeudu testipyynnöistä
// Mockatun pyynnön vastaus on myös ennalta-arvattava

////////////////////////////////////////////////////////
// MOCK ////////////////////////////////////////////////

const axios = require('axios');
jest.mock('axios')
it('returns all quizzes, mocked', async () => {
    axios.get.mockResolvedValue({
        data: [{
            id: 1,
            quizname: "hello world"
        },
        {
            id: 2,
            quizname: "goodbye universe"
        }]
    })
    await requests.getAllQuizzes().then(result => {
        expect(result.length).toEqual(2);
    });
})