let player = [];
let computer = [];
let playerSum = 0;
let computerSum = 0;

document.addEventListener("DOMContentLoaded", () => {
    

    let startDiv = document.querySelector(".start")

    let startBtn = document.querySelector("#start-btn")
    // startBtn.innerHTML = " "
    startBtn.addEventListener("click", () => {
       
        shuffledPlayerDeck()
       
        hitBtn.style.display = "inline"
        stayBtn.style.display = "inline"
        startBtn.style.display = "none"
        //  playerTurn()
        //  playerScore()
    })
    
    let hitBtn = document.querySelector("#hit")
     hitBtn.addEventListener("click", () => {
            playerHit(draw1)
        })
            hitBtn.style.display = "none"
        

    let stayBtn = document.querySelector("#stay")
    stayBtn.addEventListener("click", () => {
        fetchCompCards()
        computerTurn()

    })
    stayBtn.style.display = "none"
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
        
            playerScore(cards)
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
     console.log("cards!!", draw1)
    // console.log(startDiv)
    let playerDiv = document.querySelector("#player")
  
    let image1 = document.createElement("img") // two image tags for each card.
    image1.src = draw1[0].image
    console.log("link", image1.src)

    let image2 = document.createElement("img")
    image2.src = draw1[1].image

   playerDiv.append(image1, image2)
//    if (playersum < 21) {
//        let image3 = document.createElement("img")
//        image3.src
//    }
   playerHit(draw1)
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

    let draw2 = computer.cards
    console.log("draw2", draw2)

    let computerDiv = document.querySelector("#computer")
    let score = document.createElement("div")
    score.classList.add('score')
    for (let i = 0; i < draw2.length; i++) {
        if (draw2[i].value === 'KING' || draw2[i].value === 'QUEEN' || draw2[i].value === 'JACK') {
            draw2[i].value = 10
        } else if (draw2[i].value === "ACE") {
            draw2[i].value = 1

        } else {
            draw2[i].value = Number(draw2[i].value)
        }
        computerSum += draw2[i].value
        computerDiv.appendChild(score)
        console.log("computer sum", computerSum)

    }
    computerTurn(draw2)

}

const computerTurn = (draw2) => {
    let computerDiv = document.querySelector("#computer")
    // if (stay)

    let image1 = document.createElement("img") // three image tags for each card.
    image1.src = draw2[0].image
    console.log("computer card1", image1.src)

    let image2 = document.createElement("img")
    image2.src = draw2[1].image

    let image3 = document.createElement("img")
    image3.src = draw2[2].image

    computerDiv.append(image1, image2, image3)
}

const playerHit = (draw1) => {
    console.log('player hit', draw1)
    for (let i = 0; i < draw1.length; i++) {
        let playerSum = draw1[i].value
        console.log("player sum", playerSum)
        //let computerSum = draw2[i].value
        if (playerSum < 21) {
         
            let playerDiv = document.querySelector('#player')
            let image3 = document.createElement("img")
            image3.src = draw1[2].image
            console.log("player hit", image3.src)
            playerDiv.append(image3)
           
        } else if (playerSum > 21) {
            
        } 
        
    }
}

