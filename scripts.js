function shuffle_array(arr) {
    let shuffled_array = [];
    let rando = 0;
    
    for (let i=0;i<arr.length;i++) {
        
        rando = Math.floor(Math.random * arr.length);
        
        shuffled_array[rando] = arr[i];
    }

    console.log(shuffled_array);
    return shuffled_array;
}

const getTriviaConnection = () => {
    
    let result = "https://opentdb.com/api_token.php?command=request";

    return axios.get(result).then(
        response => {
            return response.data.token;
        }
    )
        
    .catch (error => console.log(error));

}


const getQuestions = (query) => {
           
    return axios.get(query).then(
         response => {
            return response.data.results;
        }
    )
        
    .catch (error => console.log(error));

}

getTriviaConnection().then(
    token => {
        
        return getQuestions(apiURL+"?token="+token+"&amount=10");
    }
).then(
    data => {
        for (let i = 0; i < data.length; i++) {
            questions.push(data[i]);
        }
        
        createQuestions(questions);

    }
);

let apiURL = "https://opentdb.com/api.php";
let questions = [];


function createQuestions () {
    
    // DOM

    //for each question
    for (let i = 0; i < questions.length; i++) {

        let choices = [];
        //create an array of questions
        for (let j =0; j<questions[i].incorrect_answers.length;j++) {
            choices.push(questions[i].incorrect_answers[j]);
        }
        choices.push(questions[i].correct_answer);

        //console.log("Choices:" , shuffle_array(choices));
        


        renderQuestions(questions[i].question,choices, i);
    }

}




function renderQuestions (q, choices, questNum) {

    let choice = document.querySelector('.choice');

    let question = document.createElement('div');
    question.innerText = q.replace(/&quot;/g,'"');
    question.classList.add('choice__question');
    

    let choiceContainer = document.createElement('div');
    choiceContainer.classList.add('choice__container');

    for (let i=0; i<choices.length;i++) {

        let choiceList = document.createElement('input');
        choiceList.setAttribute("type", "radio");
        choiceList.setAttribute("name", questNum);
        choiceList.classList.add('choice__list');
        choiceContainer.appendChild(choiceList);

        let choiceLabel = document.createElement('label');
        choiceLabel.setAttribute("for", questNum);
        choiceLabel.classList.add('choice__list');
        choiceLabel.innerText = choices[i]
        choiceContainer.appendChild(choiceLabel);
    }

    choice.appendChild(question);
    choice.appendChild(choiceContainer);

    //<button class="choice__button">SUBMIT</button>
    // let but = document.createElement("button");
    // but.classList.add("choice__button");
    // choice.appendChild(but);

    // question.innerText = ;
    // choiceLabel.innerText = ;
    
}



// EVENTLISTENER
let formSubmit = document.querySelector('.choice__button');
formSubmit.addEventListener('click', e => {
    e.preventDefault();
    console.log(e.target);
    e.target.innerText = "It doesn't matter, you did your best, and that's what matters";


})
