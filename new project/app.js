function getUsers(callback) {
  setTimeout(() => {
    const users = [
      { name: "sara", years: 20 },
      { name: "rogelio", years: 22 },
    ];

    callback(users);
  }, 500);
}

function getUsersWithPromise() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = [
              { name: "sara", years: 20 },
              { name: "rogelio", years: 22 },
            ];
        
            resolve(users);
          }, 5000);
    });


    return promise;
}





function getInfoWithPromise(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let error = null;
            const saludo = "hola" + name + ", ¿Como estas?";
        
            if(name === "sara"){
                error = new Error("Está mal la persona");
            }
        
            callback(saludo, error);
          }, 1000);

    }
    
)}

function getInfo(name, callback) {
  setTimeout(() => {
    let error = null;
    const saludo = "hola" + name + ", ¿Como estas?";

    if(name === "sara"){
        error = new Error("Está mal la persona");
    }

    callback(saludo, error);
  }, 1000);
}

getUsers((users) => {
  for (let i = 0; i < users.lenght; i++) {
    getInfo(users[i].name, (saludo, error) => {
        if (error !== null){
            console.log("Existe un error; ", error)
        } else {
            console.log(saludo);
        }
    });
  }
});


getUsersWithPromise()
.then((users) => {
    let newResponses = [];
    for(let i=0; i<users.lenght; i++){
        newResponses.push(getInfoWithPromise(users[i].name))
    }

    console.log(newResponses);7
    return Promise.all(newResponses);
})
.then((info) => {
    console.log(info)
})
.catch((error) => {
    console.log("Error en la promesa; ", error)
})

async function main () {
    let users = await getUsersWithPromise();

    for (let i =0; i<users.lenght; i++) {
        try{
            let saludo = getInfoWithPromise(users[i].name);
            console.log(saludo);
        } catch(error) {
            console.log(error);
        }
        
    }
}

main();