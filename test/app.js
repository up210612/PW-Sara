/*function clickEvent() {
    console.log('Has dado click');
}
btn.addEventListener('click', clickEvent);*/

const btn = document.getElementById('btn');
const title = document.getElementById('titulo');
const input = document.getElementById('input');
const container = document.getElementById('container');

/*window.addEventListener('load', () => {
    alert('Se ha cargado la ventana ')
})*/

btn.addEventListener('click', function() {
    //document.getElementById('title').innerHTML = '<h1>Chao!</h1>'
    //document.getElementById('titulo').innerText = 'neww'
    //console.log('han dado click');

   const inputValue = input.value;
   container.innerText = inputValue;
});


btn.addEventListener('dblclick', () => {
    console.log('double')
})

btn.addEventListener('dblclick', () =>{
    fetch('/info.json')
        .then((response) =>{
            console.log(response)
        })
})