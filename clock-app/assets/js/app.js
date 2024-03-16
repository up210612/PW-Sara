const hours = document.getElementById('hours');
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const formAlarm = document.getElementById("form-alarm");
let isPermitNotification = false;
let isCreatedNotification = false;
let notificationCounter = 0;

function formatNumber (value){
    if(value < 10){
        return "0" + value;
    }
        return value;
    
}

document.addEventListener('DOMContentLoaded', (event) => {
    if('Notification' in window){
        Notification.requestPermission((request)=>{
            isPermitNotification = request === 'granted'


            if (!isPermitNotification){
            
                [input, button] = formAlarm.children;
    
                input.value = "";
                input.disabled = true;
                button.disabled =  true;
    
            }
        })

    }

    if(localStorage.getItem('alarma') !== null){
        const input = formAlarm.children[0]
        
        const alarm = new Date(localStorage.getItem('alarma'))

        input.value = formatNumber(alarm.getHours())+":"+formatNumber(alarm.getMinutes())
        console.log("ya hay alarma wei "+input.value)
    }
    getCurrentTime();
})

setInterval (function(){
    getCurrentTime();
},1000);

const showAlarm = () => {
    if(isPermitNotification && localStorage.getItem('alarma') !== null ){
        const currentTime = new Date();
        const alarm = new Date(localStorage.getItem('alarma'));

        const isTheSameDay = currentTime.getDate() === alarm.getDate();
        const isTheSameHour = currentTime.getHours() === alarm.getHours();
        const isTheSameMinutes = currentTime.getMinutes() === alarm.getMinutes();

        if(isTheSameDay && isTheSameHour && isTheSameMinutes && notificationCounter <= 10){
            new Notification("Alarrrrmmmmm!!");
            notificationCounter++;
        }   

        if (notificationCounter > 10) {
            formAlarm.childNodes[0].value = 0;
            localStorage.removeItem('alarma');  
        }
    
    }
}

function getCurrentTime(){
    showAlarm();

    const currentDate = new Date();
  
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();

    hours.innerText = formatNumber(currentHours);
    minutes.innerText = formatNumber(currentMinutes);
    seconds.innerText = formatNumber(currentSeconds);
}

formAlarm.addEventListener('submit', (event) => {
    
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const value = formData.get('time');

    if (value === null || value === ""){
        alert("selecciona una hora precisa");
    }
    else{
        let alarmHours = parseInt(value.substring(0,2));
        let alarmMinutes = parseInt(value.substring(3));

        const currentDate = new Date();
        const setAlarm = new Date();

        const HorasMenores = alarmHours < currentDate.getHours();
        const HorasIguales = alarmHours === currentDate.getHours();
        const MinutosMenores = alarmMinutes <= currentDate.getMinutes();


        if(HorasMenores || (HorasIguales && MinutosMenores)){
            
            setAlarm.setDate(setAlarm.getDate()+1);
        }
        setAlarm.setHours(alarmHours);
        setAlarm.setMinutes(alarmMinutes);
        setAlarm.setSeconds(0);

        localStorage.setItem("alarma", setAlarm.toString());

    }
});