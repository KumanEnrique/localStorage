const formu = document.getElementById("formu")
formu.addEventListener("submit",saveTask)

let contadorID
let s = JSON.parse(localStorage.getItem("tareas"))
if (s == null){
    contadorID = 0
    console.log(contadorID)
}else{
    try {
        contadorID = s[s.length - 1].contadorID
        contadorID++
        console.log(contadorID)
    } catch (error) {
        
    }
}
function saveTask(e) {
    const titulo = document.getElementById('tarea').value;
    const descripcion = document.getElementById('description').value;
    const newTarea = {
        titulo,
        descripcion,
        contadorID
    }
    if(document.getElementById("oculto").value){
        const titulo = document.getElementById('tarea').value;
        const descripcion = document.getElementById('description').value;
        const contadorID = document.getElementById("oculto").value
        const newTarea = {
            titulo,
            descripcion,
            contadorID
        }
        let contenedorTareas = JSON.parse(localStorage.getItem("tareas"))
        for(let i=0;i<contenedorTareas.length;i++){
            if(contenedorTareas[i].contadorID == contadorID){
                contenedorTareas[i] = newTarea 
            }
        }
        localStorage.setItem("tareas",JSON.stringify(contenedorTareas))
    }else{
        if(localStorage.getItem("tareas") === null){
            let contenedorTareas = []
            contenedorTareas.push(newTarea)
            localStorage.setItem("tareas",JSON.stringify(contenedorTareas))
        }else{
            let contenedorTareas = JSON.parse(localStorage.getItem("tareas"))
            contenedorTareas.push(newTarea)
            localStorage.setItem("tareas",JSON.stringify(contenedorTareas))
        }
        contadorID++
    }
    
    pintar()
    formu.reset()
    e.preventDefault();
}
function pintar(){
    const container = document.getElementById("tareas")
    const contenedorTareas = JSON.parse(localStorage.getItem("tareas"))
    container.innerHTML = ''
    if(contenedorTareas != null){
        for(let i=0;i<contenedorTareas.length;i++){
            const titulo = contenedorTareas[i].titulo
            const descripcion = contenedorTareas[i].descripcion
            const id = contenedorTareas[i].contadorID
            container.innerHTML += `<tr>
            <td>
            <a href="#" class="btn btn-warning" role="button" aria-pressed="true" onclick="actualizar(${id})">Actualizar</a> 
            <a href="#" class="btn btn-danger" role="button" aria-pressed="true" onclick="eliminar(${id})">Elimnar</a></td>
            <td>${titulo}</td>
            <td>${descripcion}</td>
            </tr>`
        }
    }
}
function actualizar(id){
    console.log("actualizar en el id ",id)
    const contenedorTareas = JSON.parse(localStorage.getItem("tareas"))
    const titulo = document.getElementById("tarea")
    const descripcion = document.getElementById('description')
    const oculto = document.getElementById("oculto")

    for (let i=0;i < contenedorTareas.length;i++){
        if(contenedorTareas[i].contadorID == id){
            titulo.value = contenedorTareas[i].titulo
            descripcion.value = contenedorTareas[i].descripcion
            oculto.value = contenedorTareas[i].contadorID
        }
    }
}
function eliminar(id){
    const contenedorTareas = JSON.parse(localStorage.getItem("tareas"))
    for(let i=0;i<contenedorTareas.length;i++){
        if(contenedorTareas[i].contadorID == id){
            contenedorTareas.splice(i,1)
        }
    }
    localStorage.setItem("tareas",JSON.stringify(contenedorTareas))
    pintar()
}
pintar()
