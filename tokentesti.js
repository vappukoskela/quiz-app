var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt')
const SALT_ROUNDS = 12
let alkuhetki = Date.now();
let loppuhetki;
let pwHashed;
// bcrypt.hash("kissa", SALT_ROUNDS, (err, hash) => {
//     console.log(hash)
//     pwHashed = hash
//     loppuhetki = Date.now()
//     console.log("ms: ", loppuhetki - alkuhetki)
//     bcrypt.compare("kissa", pwHashed, (err, result) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(result)
//         }
//     })
// })
(async () => {
    try {
        pwHashed = await bcrypt.hash("kissa", 10)
        console.log(pwHashed)
        let result = await bcrypt.compare("kisa", pwHashed)
        console.log(result)
    } catch (e) {
        console.log(e)
    }
})();
var token1 = jwt.sign({foo: 'bar'}, 'shhhhh');
var token2 = jwt.sign({foo: 'bar'}, 'shhhhh');
try {
    let result = jwt.verify(token1, 'shhhhh')
    console.log("token verified ", result)
}catch (e) {
    console.log("token not ok")
}
// console.log(token);

