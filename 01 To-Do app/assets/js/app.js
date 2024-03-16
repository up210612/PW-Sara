document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementById('usuario-dropdown');
  const userContainer = document.getElementById('user-container');
  const taskContainer = document.getElementById('task-container');
  let usuarios = [];
  let tareas = [];

  function inicializarDropdown(usuarios) {
      usuarios.forEach(usuario => {
          const option = document.createElement('option');
          option.text = usuario.firstname;
          option.value = usuario.id;
          dropdown.appendChild(option);
      });
  }
  async function cargarUsuarios() {
      const response = await fetch('usuarios.json');
      usuarios = await response.json();
      return usuarios;
  }

  async function cargarTareas() {
      const response = await fetch('tareas.json');
      tareas = await response.json();
      return tareas;
  }

function mostrarTareas(usuarioId) {
    const usuarioSeleccionado = usuarios.find(usuario => usuario.id === parseInt(usuarioId));
    
    userContainer.innerHTML = `
        <h3>Información del usuario seleccionado</h3>
        <ul>
            <li>Nombre completo: ${usuarioSeleccionado.firstname} ${usuarioSeleccionado.lastname}</li>
            <li>Email: ${usuarioSeleccionado.email}</li>
        </ul>
    `;

    const tareasUsuario = tareas.filter(tarea => tarea.userId === parseInt(usuarioId));
    
    taskContainer.innerHTML = `
        <h3>Lista de tareas del usuario</h3>
        <ul>
            ${tareasUsuario.map(tarea => `
                <li>
                    ${tarea.title}
                    <input type="checkbox" ${tarea.completed ? 'checked' : ''}>
                </li>`).join('')}
        </ul>
    `;
}

  dropdown.addEventListener('change', () => {
      const selectedUserId = dropdown.value;
      mostrarTareas(selectedUserId);
  });

  Promise.all([cargarUsuarios(), cargarTareas()])
      .then(() => {
          inicializarDropdown(usuarios);
      })
      .catch(error => {
          console.error('Error al cargar los datos:', error);
      });
});
