let highscore = document.querySelector('.highscore');
let currscore = document.querySelector('.currscore');
let quefield = document.querySelector('.question');
let options = document.querySelectorAll('.ans-option');
let next_btn = document.querySelector('.next-btn');
let skip_btn = document.querySelector('.skip-btn');
let load = document.querySelector('.load');
let con = document.querySelector('.container');
let cat = document.querySelector('.cat-main');
let diff = document.querySelector('.diff-main');

//localStorage.setItem("hs", 0);
// localStorage.getItem("lastname");


let hs = localStorage.getItem("hs"); 
let cs = 0;

updatehs = ()=>{
    highscore.innerText = "High Score :- "+hs;
}
updatehs();

updatecurr=()=>{
    cs++;
    currscore.innerText = "Current Score :- "+cs;
}

let categorie = cat.options[cat.selectedIndex].text;


cat.addEventListener('change',function(){
    categorie = cat.options[cat.selectedIndex].text;
    
    getquestion();
})

let difficult = diff.options[diff.selectedIndex].text;

diff.addEventListener('change',function(){
    difficult = diff.options[diff.selectedIndex].text;
    getquestion();
})

let ans;
let flag = 1;

getquestion = async() =>{

    load.classList.add("visible");
    con.classList.add("op");

    let url = "https://the-trivia-api.com/api/questions?categories="+categorie+"&difficulty="+difficult;

    const info = await fetch(url);

    let converted_info = await info.json();

    load.classList.remove("visible");
    con.classList.remove("op");

   

    quefield.innerText = converted_info[0].question;

    ans = Math.floor((Math.random() * 4) + 1);

    

    options[ans-1].innerText = ans+" "+converted_info[0].correctAnswer;

    let it=0;

    if(0!==ans-1){
        options[0].innerText = 1 + " "+converted_info[0].incorrectAnswers[it];
        it++;
    }

    if(1!==ans-1){
        options[1].innerText = 2 + " "+converted_info[0].incorrectAnswers[it];
        it++;
    }

    if(2!==ans-1){
        options[2].innerText = 3 + " "+converted_info[0].incorrectAnswers[it];
        it++;
    }

    if(3!==ans-1){
        options[3].innerText = 4 + " "+converted_info[0].incorrectAnswers[it];
    }  

}

for(let val = 0;val<4;val++){
    options[val].addEventListener('click',function(){
        checkans(val);
    })
}


checkans =(val)=>{

    if(val === ans-1){
        options[val].classList.add("green");

        updatecurr();

        if(hs<cs){
            hs=cs;
            localStorage.setItem("hs",cs);
            updatehs();
        }

        setTimeout(function(){
            getquestion();
            options[val].classList.remove("green");
            load.classList.add("visible");
            con.classList.add("op");
         },1000)
    }

    else{
        options[val].classList.add("red");
        setTimeout(function(){
            options[val].classList.remove("red");
         },1000)
    }

}

next_btn.addEventListener('click',function(){
    nextque();
})

nextque = () =>{
    load.classList.add("visible");
    con.classList.add("op");
    getquestion();
}

skip_btn.addEventListener('click',function(){
    cs--;
    cs--;
    updatecurr();
    nextque();
})



getquestion();


