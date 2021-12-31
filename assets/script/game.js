// ============= Quiz =============

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "What are the big plant Geodomes in Cornwall called?",
        choice1: 'Landhydrock Gardens',
        choice2: 'The Eden Project',
        choice3: 'The Lost Gardens of Heligan',
        choice4: 'Trelissick Gardens',
        answer: 2,
    },
    {
        question: "What colour is the Cornwall flag?",
        choice1: "Green & Gold",
        choice2: "Red & White",
        choice3: "Yellow & Blue",
        choice4: "Black & White",
        answer: 4,
    },
    {
        question: "The iconic Tate gallery is in which Cornish town?",
        choice1: "Penzance",
        choice2: "Rock",
        choice3: "St Ives",
        choice4: "Falmouth",
        answer: 3,
    },
    {
        question: "Which of these ingredients does not belong in a traditional Cornish pasty?",
        choice1: "Onion",
        choice2: "Swede",
        choice3: "Carrot",
        choice4: "Potato",
        answer: 3,
    },
    {
        question: "Which of these celebrities is NOT from Cornwall?",
        choice1: "Roger Taylor",
        choice2: "Ben Ainslie",
        choice3: "Helen Glover",
        choice4: "Philip Schofield",
        answer: 4,
    },
    {
        question: "The 1990s adaptation of Roald Dahl’s ‘The Witches’ was partly filmed in which Cornish hotel?",
        choice1: "The Greenbank, Falmouth",
        choice2: "Padstow Harbour Hotel, Padstow",
        choice3: "The Headland Hotel, Newquay",
        choice4: "The Lugger, Portloe",
        answer: 3,
    },
    {
        question: "Cornwall’s only UNESCO World Heritage Site is valued because it is the site of a former…",
        choice1: "Copper and tin mine",
        choice2: "Cotton Mmill",
        choice3: "Neolithic settlement",
        choice4: "Silk factory",
        answer: 1,
    },
    {
        question: "Which British celebrity chef has a restaurant in Padstow?",
        choice1: "Jamie Oliver",
        choice2: "Gordon Ramsay",
        choice3: "Marcus Waring",
        choice4: "Rick Stein",
        answer: 4,
    },
    {
        question: "What is the Cornish name for Cornwall?",
        choice1: "Hornwall",
        choice2: "Kernow",
        choice3: "Cairnwall",
        choice4: "Kernwall",
        answer: 2,
    },
    {
        question: "Which Daphne du Maurier novel is set in Cornwall?",
        choice1: "Rebecca",
        choice2: "The Birds",
        choice3: "Jamaica Inn",
        choice4: "The Scapegoat",
        answer: 3,
    },

]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()

// highscore

// end
const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')


finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')

    
}