const time = document.querySelector('.time');
const play = document.querySelector('.icon__play');
const pause = document.querySelector('.icon__pause');
const stop = document.querySelector('.icon__stop');
const progressBar = document.querySelector('.progress__bar');

let minhaHora = new Date();

let bitTrava = false;



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

    let horaDez = '';
    let minutoDez = '';
    let segundoDez = '';

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
if(!bitTrava){
    if(time.value != "00:00:00"){

        var horaColetada = time.value;
  
        let h = parseInt(horaColetada.substr(0,2));
        let m = parseInt(horaColetada.substr(3,2));
        let s = parseInt(horaColetada.substr(6,2));
            
        minhaHora.setHours(h,m,s,0);

        setIntervalId = setInterval(() => {
            reduceSecond();
            showTime();
        }, 100);

        bitTrava =true;
        time.disabled = true;

    }else{
        alert("Insira um tempo antes de iniciar o temporizador!")
    }

}
      
})


stop.addEventListener('click', ()=>{
    minhaHora.setHours(0, 0, 0, 0)
    clearInterval(setIntervalId);
    showTime();
    bitTrava = false;
    time.disabled = false;
})


pause.addEventListener('click', ()=>{
    clearInterval(setIntervalId);
    bitTrava = false;
})

