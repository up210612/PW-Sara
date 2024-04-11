

export async function getAllUsers(){
  const responseponse = await fetch("./api/getUsers.php");
  const json = await responseponse.json(); 

  console.log(json);
  
  return json;
} 

export async function fetchTasksByUser(idUser) {
  const response = await fetch(`./api/getTasks.php?id=${idUser}`);
  const json = await response.json();
  return json;
  };

export async function addTask(formdata) {
  const response = await fetch(`./api/createTask.php`,{
       method:"POST",
       body: formdata
  });
  const json = await response.json();
  return json;
  };

export async function removeTask(taskId){
  console.log(taskId)
  const response = await fetch(`./api/deleteTask.php?id=${taskId}`);
  const json = await response.json();
  console.log(json);
  return json;
};

export async function fetchTask(taskId){
  const response = await fetch(`./api/getTask.php?id=${taskId}`);
  const json = await response.json();
  return json;
};

export async function updateTask(formdata,taskId) {
  const response = await fetch(`./api/updateTask.php?id=${taskId}`,{
       method:"POST",
       body: formdata
  });
  const json = await response.json();
  return json;
  };
  