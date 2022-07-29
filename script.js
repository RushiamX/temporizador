const time = document.querySelector('.time');
const play = document.querySelector('.icon__play');
const pause = document.querySelector('.icon__pause');
const stop = document.querySelector('.icon__stop');
const progressBar = document.querySelector('.progress__bar');

let minhaHora = new Date();
let horaDez = '';
let minutoDez = '';
let segundoDez = '';


minhaHora.setHours(00,00,00,00);

progressBar.setAttribute("style","width:500px");


const addMinute = () => {
    minhaHora.setMinutes(minhaHora.getMinutes() + 1)
}

const addSecond = () => {
    minhaHora.setSeconds(minhaHora.getSeconds() + 1)
}

const reduceSecond = () => {
    minhaHora.setSeconds(minhaHora.getSeconds() - 1)
}


const showTime = () =>{

    if(minhaHora.getHours() < 10){
        horaDez = "0";
    }else{
        horaDez = "";
    }

    if(minhaHora.getMinutes() < 10){
        minutoDez = "0";
    }else{
        minutoDez = "";
    }

    if(minhaHora.getSeconds() < 10){
        segundoDez = "0";
    }else{
        segundoDez = "";
    }

    time.value = (horaDez + minhaHora.getHours() + ":"+ minutoDez + minhaHora.getMinutes()
     + ":" + segundoDez + minhaHora.getSeconds());

}

play.addEventListener('click', ()=>{
    setIntervalId = setInterval(() => {
        reduceSecond();
        showTime();
    }, 100);
      
})

stop.addEventListener('click', ()=>{
    minhaHora.setHours(0, 0, 0, 0)
    clearInterval(setIntervalId);
    showTime();
})

pause.addEventListener('click', ()=>{
    clearInterval(setIntervalId);
})

