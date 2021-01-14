import LocalizedStrings from "react-localization";
import en from './languages/en.json'
import fi from './languages/fi.json'
let strings = new LocalizedStrings(
    {
        en: {
            "login": "Login",
            "register": "Register",
            "email": "Email",
            "password": "Password",
            "reglink": "Register here",
            "firstname": "First name",
            "surname": "Surname",
            "adminuser": "Admin user",
            "teachermode": "Teacher mode",
            "showcorrect": "Show correct answers",
            "hidecorrect": "Hide correct answers",
            "question": "Question",
            "answer": "Answer",
            "addnewquestion": "Add new question",
            "addnewanswer": "Add new answer",
            "addnewquiz": "Add new quiz",
            "delete": "Delete",
            "regerror": "Registration failed"
        },
        fi: {
            "login": "Kirjaudu",
            "register": "Rekisteröidy",
            "email": "Sähköposti",
            "password": "Salasana",
            "reglink": "Rekisteröidy tästä",
            "firstname": "Etunimi",
            "surname": "Sukunimi",
            "adminuser": "Admin-käyttäjä",
            "teachermode": "Opettaja",
            "showcorrect": "Näytä oikeat vastaukset",
            "hidecorrect": "Piilota oikeat vastaukset",
            "question": "Kysymys",
            "answer": "Vastaus",
            "addnewquestion": "Lisää uusi kysymys",
            "addnewanswer": "Lisää uusi vastaus",
            "addnewquiz": "Lisää uusi tentti",
            "delete": "Poista",
            "regerror": "Rekisteröityminen epäonnistui"
        }
    }
)

export default strings