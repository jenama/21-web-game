let player = [];
let computer = [];
let playerSum = 0;
let computerSum = 0;

document.addEventListener("DOMContentLoaded", () => {

    let startDiv = document.querySelector(".start")

    let startBtn = document.querySelector("#start-btn")
    // startBtn.innerHTML = " "
    startBtn.addEventListener("click", () => {
        if (stayBtn === "click") {
        }
        shuffledPlayerDeck()
        fetchCompCards()
    })

    let hitBtn = document.querySelector("#hit")
    hitBtn.addEventListener("click", () => {
        playerTurn()
    })

    let stayBtn = document.querySelector("#stay")
    stayBtn.addEventListener("click", () => {
        computerTurn()
    })
})

// making a network request for the shuffled cards 
const shuffledPlayerDeck = () => {
    let shuffledDeckUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
    //console.log()

    fetch(shuffledDeckUrl)

        .then(response => {
            //console.log("response", response)
            return response.json()
        })
        .then(deck => {
            //console.log('deck', deck)
            fetchPlayerCards(deck)
        })

        .catch(error => {
            console.log("error!!", error)
        })
}

const fetchPlayerCards = (deck1) => {

    let id1 = deck1.deck_id

    let drawCardUrl = `https://deckofcardsapi.com/api/deck/${id1}/draw/?count=2`
    //console.log('player cards', drawCardUrl)
    fetch(drawCardUrl)
        .then(response => {

            console.log(response)
            return response.json()
        })
        .then(cards => {
            console.log('player cards', cards)
        })
}


const playerScore = (cards) => {
    let draw1 = cards.cards

    let cardDiv = document.querySelector(".cards-div")
    let score = document.createElement("div")
    score.classList.add('score')

    for (let i = 0; i < draw1.length; i++) {
        if (draw1[i].value === 'KING' || draw1[i].value === 'QUEEN' || draw1[i].value === 'JACK') {
            draw1[i].value = 10
        } else if (draw1[i].value === "ACE") {
            draw1[i].value = 1

        } else {
            draw1[i].value = Number(draw1[i].value)
        }
        playerSum += draw1[i].value
        console.log("playerSum", playerSum)

    }
    cardDiv.appendChild(score)

    playerTurn(draw1)
}


const playerTurn = (draw1) => {
    // console.log("cards!!", draw1)
    // console.log(startDiv)
    let playerDiv = document.querySelector("#player")
    let cardDiv = document.querySelector(".cards-div")
    let image1 = document.createElement("img") // two image tags for each card.
    image1.src = draw1[0].image

    let image2 = document.createElement("img")
    image2.src = draw1[1].image

    playerDiv.append(image1, image2)
}


const fetchCompCards = () => {

    let url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6'
    fetch(url)
        .then(response => {
            //console.log("computer response", response)
            return response.json()
        })
        .then(cards => {
            drawComputerCards(cards)
        })
}


const drawComputerCards = (cards) => {

    let id2 = cards.deck_id
    let drawCardUrl2 = `https://deckofcardsapi.com/api/deck/${id2}/draw/?count=3`
    fetch(drawCardUrl2)
        .then(response => {
            console.log('response!!!!', response)
            return response.json()
        })
        .then(computer => {
            //console.log("computer cards", computer)
            computerScore(computer)
        })

}

const computerScore = (computer) => {
    let draw1 = computer.cards

    let computerDiv = document.querySelector("#computer")
    let score = document.createElement("div")
    score.classList.add('score')
    for (let i = 0; i < draw1.length; i++) {
        if (draw1[i].value === 'KING' || draw1[i].value === 'QUEEN' || draw1[i].value === 'JACK') {
            draw1[i].value = 10
        } else if (draw1[i].value === "ACE") {
            draw1[i].value = 1

        } else {
            draw1[i].value = Number(draw1[i].value)
        }
        computerSum += draw1[i].value
        computerDiv.appendChild(score)
        console.log("computer sum", computerSum)

    }
    computerTurn(draw1)

}

const computerTurn = (draw1) => {
    let computerDiv = document.querySelector("#computer")
    // if (stay)

    let image1 = document.createElement("img") // three image tags for each card.
    image1.src = draw1[0].image

    let image2 = document.createElement("img")
    image2.src = draw1[1].image

    let image3 = document.createElement("img")
    image3.src = draw1[2].image

    computerDiv.append(image1, image2, image3)
}