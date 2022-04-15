import React from 'react'
import ReactDom from 'react-dom'

function randomize(tab) {
    var i, j, tmp;
    for (i = tab.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = tab[i];
        tab[i] = tab[j];
        tab[j] = tmp;
    }
    return tab;
}

function restructur(data) {
    return data.map(function (z) {
        z.bouger = z.incorrect_answers.concat(z.correct_answer)
        randomize(z.bouger)
        return z;
    })
}

function QCM() {
    const [question, setQCM] = React.useState([]);
    const [reponse, reponseCoche] = React.useState(false);
    const [count, setCount] = React.useState(0 + 1)
    const [score, setScore] = React.useState(0)

    React.useEffect(() => {

        fetch("https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple")
            .then((Response) => Response.json())
            .then((data) => {
                setQCM(restructur(data.results))
            })
            .catch((err) => console.log(err))

    }, [])

    if (question.length == 0) {
        return <p>Loading QCM ...</p>
    };

    const answ = question[count].bouger

    if (count > 10) {
        return (
            <div className="">
                <h1>Votre score est de <span>{score}/10</span></h1>
            </div>
        )
    } else {
        return (
            <>
                <div className="Block" method="get">
                    <h2 className="question">{question[count].question}</h2>
                    <span className="nbrQuestion">{count}/10</span>
                    <ul id="reponse">
                        {answ.map(function (rep) {
                            return <li key={rep + count}><input type="radio" name="r" className="checkbox" onChange={() => reponseCoche(!reponse)} />{rep}</li>
                        })}
                    </ul>
                    <div id="divButton">
                        <button onClick={function () {
                            reponseCoche(false)
                            setCount(count + 1)
                            if (reponse == question[count].correct_answer) {
                                setScore(score + 1)
                            }
                        }}>VALIDER</button>
                    </div>
                </div>
            </>

        );
    }
}

ReactDom.render(
    <QCM />,
    document.getElementById("QCM")
)