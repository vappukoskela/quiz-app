// UNIT TESTS 

const areNumbers = (x) => {
    return x.every(item => {
        return typeof item=='number'
    })
}

const sum = (a, b) => {
    if (areNumbers([a,b])) {
        return a + b;
    }
    else { return "womp womp" }
}

const times = (a, b) => {//['-','-','-','-','a']
const merkkaaLöydetytKirjaimet = (arvatutKirjaimet, sananKirjaimet) => {
    let alaviivaSana = []
    //'_'.repeat(sananKirjaimet.length)
    for (x = 0; x < sananKirjaimet.length; x++) {
        alaviivaSana.push("-");
        for (y = 0; y < arvatutKirjaimet.length - 1; y++) {
            if (arvatutKirjaimet[y] == sananKirjaimet[x]) {
                alaviivaSana[x] = arvatutKirjaimet[y];
            }
        }
    }
    return alaviivaSana;
}
/* for (const [i, v] of ['a', 'b', 'c'].entries()) {
    console.log(i, v)
  }
 */
const merkkaaLöydetytKirjaimet_ = (arvatutKirjaimet, sananKirjaimet) => {
    let alaviivaSana = []
    //'_'.repeat(sananKirjaimet.length)
    for (const [index, sananKirjain] of sananKirjaimet.entries()) {
        alaviivaSana.push("-");
        for (arvattuKirjain of arvatutKirjaimet) {
            if (arvattuKirjain == sananKirjain) {
                alaviivaSana[index] = arvattuKirjain;
            }
        }
    }
    return alaviivaSana;
}
//['a','e','y']    ['k','i','s','s','a']  
//['-','-','-','-','a']
const merkkaaLöydetytKirjaimet__ = (arvatutKirjaimet, sananKirjaimet) => {
    return sananKirjaimet.reduce((acc, sananKirjain) => (
        arvatutKirjaimet.includes(sananKirjain) ? acc.concat([sananKirjain]) : acc.concat(['_'])
    ), [])
}
    return a * b;
}


module.exports = {
    sum: sum,
    times: times
}