document.getElementById('formRegistro').addEventListener('submit', buscarRegistro);

function buscarRegistro(e) {
  let cedula = document.getElementById('Cedula').value;
  let correo= document.getElementById('Correo').value;
  let escuela= document.getElementById('Escuela').value;
  let descripcion= document.getElementById('Descripcion').value;
  let foto= document.getElementById('Foto').value;
 

  let task = {
    cedula,
    correo, 
    escuela, 
    descripcion, 
    foto
  };

  if(localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('formRegistro').reset();
  e.preventDefault();
}

function borrarRegistro(cedula) {
  console.log(cedula)
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].cedula == cedula) {
     if(confirm("¿Esta seguro de borrar este reporte?")){
      tasks.splice(i, 1);
     }
     
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

/*function deleteEverything(title) {
  console.log(title)
  let tasks = JSON.parse(localStorage.getItem('tasks'));
    if(confirm("Estas seguro que quieres borrar este formulario?"))
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].title == title) {
      tasks.splice(i, 10000);
    }
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}*/


function editarRegistro(cedula){
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  var num;
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].cedula == cedula) {
        tasks.splice(i, 1); 
      }

    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
  buscarRegistro();
  }
function imprimirReporte(){
    window.print();
  }
  

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  for(let i = 0; i < tasks.length; i++) {
    let cedula = tasks[i].cedula;
    let correo = tasks[i].correo;
    let escuela = tasks[i].escuela;
    let descripcion = tasks[i].descripcion;
    let foto = tasks[i].foto;
      
    const url = `https://api.adamix.net/apec/cedula/${cedula}`;
      
fetch(url)
.then(response => response.json())
.then(data => {

    tasksView.innerHTML += `
<div class="card mb-3 colores alinear">
        <div class="card-body">
            <img src="${data.foto}" alt="Imagen Profesor" style="width:170px; height:200px; margin-left:17rem;" title="Imagen Profesor" >

         <table border="3" style="margin-top: 1rem; margin-bottom:-1rem;">
          <tr style="background-color:brown; color: whitesmoke;">
              <th>Cedula</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Fecha de Nacimiento</th>
              <th>Sexo</th>
              <th>Correo</th>
              <th>Descripcion</th>
              <th>Foto con equipo</th>
              <th>Escuela</th>
          </tr>
         
          <tr style="background-color:whitesmoke;">
              <td>${cedula}</td>
              <td>${data.Nombres}</td>
              <td>${data.Apellido1} ${data.Apellido2}</td>
              <td>${data.FechaNacimiento}</td>
              <td>${data.IdSexo}</td>
              <td>${correo}</td>
              <td>${descripcion}</td>
              <td>${foto}</td>
              <td>${escuela}</td>
          </tr>
        
         <a href="#" onclick="borrarRegistro('${cedula}')" class="btn btn-danger ml-5" style="background-color:black; margin-top:10rem;">Eliminar</a>
            <a href="#" onclick="editarRegistro('${cedula}')" class="btn btn-danger ml-5" style="background-color:black; margin-top:10rem;">Editar</a>
         
        </table>
        </div>
      </div>`;
    
    console.log(data);
})

.catch(err=>console.log(err))
      }
    
  }

getTasks();


    






























/*const url = 'https://api.adamix.net/apec/cedula/40233226535'

fetch(url)
.then(response => response.json())
.then(data => {

    let element = document.getElementById('element')
    element.innerHTML = ` <p>${data.Nombres}</p>
    <p>${data.Apellido1}</p>
    <img src = '${data.foto}'/>`
    ;
    console.log(data)

})

.catch(err=>console.log(err))*/