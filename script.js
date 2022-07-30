const time = document.querySelector('.time');
const play = document.querySelector('.icon__play');
const pause = document.querySelector('.icon__pause');
const stop = document.querySelector('.icon__stop');
const progressBar = document.querySelector('.progress__bar');

let minhaHora = new Date();
minhaHora.setHours(00,00,00,00);
let progressBarWidth = 0;

let bitTrava = false;
let startProgress = false;
let secondsTotal = 0;
let secondsAtual = 0;


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

    //mostra a hora atual
    time.value = (horaDez + minhaHora.getHours() + ":"+ minutoDez + minhaHora.getMinutes()
     + ":" + segundoDez + minhaHora.getSeconds());

}

const avancaProgressBar = () =>{
    if(time.value != "00:00:00"){

        let horaColetada = time.value;
        let h = parseInt(horaColetada.substr(0,2));
        let m = parseInt(horaColetada.substr(3,2));
        let s = parseInt(horaColetada.substr(6,2));
        secondsAtual = s + (m * 60) + (h * 60 * 60);

        progressBarWidth = parseInt(((-100 / secondsTotal) * secondsAtual)+100)
        progressBar.setAttribute("style","width:"+ progressBarWidth +"%");

    }else{
        progressBarWidth = 100;
        progressBar.setAttribute("style","width:"+ progressBarWidth +"%");
    }
}

//pausa o relógio
const pauseClock = () =>{
    clearInterval(setIntervalId);
    bitTrava = false;
}

//chamada quando o tempo acaba
const timeOut = () =>{
    minhaHora.setHours(0, 0, 0, 0)
    clearInterval(setIntervalId);
    showTime();
    bitTrava = false;
    time.disabled = false;
    startProgress = false;

    progressBarWidth = 0;
    //progressBar.setAttribute("style","width:"+ 0 +"%")

    secondsTotal = 0;
    secondsAtual = 0;    

}


play.addEventListener('click', ()=>{
if(!bitTrava){

    //coleta a hora digitada e transforma em 
    //objeto tipo hora
    let horaColetada = time.value;
    let h = parseInt(horaColetada.substr(0,2));
    let m = parseInt(horaColetada.substr(3,2));
    let s = parseInt(horaColetada.substr(6,2));

    //se a hora for válida prossegue

        if(!isNaN(h) && !isNaN(m) && !isNaN(s)){

            //após validado seta a hora
            minhaHora.setHours(h,m,s,0);

            //configura o tempo total inicial para calcular
            //os steps da progress bar
            if(!startProgress){
                secondsTotal = s + (m * 60) + (h * 60 * 60);
                startProgress = true;
                progressBarWidth = 0;
                progressBar.setAttribute("style","width:"+ 0 +"%")
            }
    
            //seta o intervalo e chama funções periodicamente
            setIntervalId = setInterval(() => {
                if(time.value != "00:00:00"){
                    reduceSecond();
                    showTime();
                    avancaProgressBar();
                }else{
                    timeOut();
                }
            }, 1000);
    
            //inpede de iniciar um novo interval
            bitTrava =true;
            time.disabled = true;
    
        }else{
            alert("Insira um tempo antes de iniciar o temporizador!")
            time.value = "00:00:00"
        }
    
}

})

//botao stop
stop.addEventListener('click', ()=>{
    minhaHora.setHours(0, 0, 0, 0)
    clearInterval(setIntervalId);
    showTime();
    bitTrava = false;
    startProgress = false;
    time.disabled = false;

    progressBarWidth = 0;
    progressBar.setAttribute("style","width:"+ 0 +"%")

    secondsTotal = 0;
    secondsAtual = 0;    

})

//botao pause
pause.addEventListener('click', ()=>{
    pauseClock();
})
