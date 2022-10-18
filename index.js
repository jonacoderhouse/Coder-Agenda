const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const elemento = document.querySelector('#elemento')
const input = document.querySelector('#input')
const inputNombre = document.querySelector('#inputNombre')
const botonEnter = document.querySelector('#boton-enter')
const contenedorSaludo = document.querySelector(`#contenedorSaludo`)
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
const container = document.querySelector(`.container`)

const button = document.querySelector(`#button`)
const contenedorImagenCarga = document.querySelector(`#contenedorImagenCarga`)
const body = document.querySelector(`.body`)


let LIST;
let id;// para que inicie en 0 cada tarea tendra un id diferente



particlesJS(
  {
    "particles": {
      "number": {
        "value": 200,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#ffffff"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.2,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 10,
          "size_min": 5,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.3,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }
)
//creacion de fecha actualizada 
const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleString('es-MX', { weekday: 'long', month: 'short', day: 'numeric' })

//oculto contenedor de la agenda hasta iniciar boton
container.classList.toggle(`oculto`)


//boton que inicia sistema de agenda
button.onclick = () => {
  button.classList.toggle(`oculto`)
  body.classList.remove(`body`)

  contenedorImagenCarga.innerHTML = `<img  class = "img"src="./image/agenda gif.gif" alt="AGENDA...">`

  setTimeout(() => {
    Swal.fire({
      title: 'Bienvenid@',
      text: `A tu agenda de tareas `,
      icon: 'success',
      confirmButtonText: 'Iniciemos '
    });
    container.classList.toggle(`aparecer`)
    contenedorImagenCarga.innerHTML = ``
  }, 2000)

}

// funcion de agregar tarea 

function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) { return } // si existe eliminado y es true nada del resto se va a ejecutar

  const REALIZADO = realizado ? check : uncheck // si realizado es verdadero check si no uncheck
  const LINE = realizado ? lineThrough : ''

  const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea} </p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `
  lista.insertAdjacentHTML("beforeend", elemento)

}


// funcion de Tarea Realizada 

function tareaRealizada(element) {
  element.classList.toggle(check)
  element.classList.toggle(uncheck)
  element.parentNode.querySelector('.text').classList.toggle(lineThrough)
  LIST[element.id].realizado = LIST[element.id].realizado ? false : true

}
//funcion rde Tarea Eliminada
function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode)
  LIST[element.id].eliminado = true
}


// crear un evento para escuchar el enter y para habilitar el boton 
botonEnter.addEventListener('click', () => {
  const tarea = input.value
  if (tarea) {
    agregarTarea(tarea, id, false, false)
    LIST.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false
    })
    localStorage.setItem('TODO', JSON.stringify(LIST))
    id++
    input.value = ''
  }
  acomodar(tarea)
  console.log(LIST)
})

document.addEventListener('keyup', function (event) {
  if (event.key == 'Enter') {
    const tarea = input.value
    if (tarea) {
      agregarTarea(tarea, id, false, false)
      LIST.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false
      })
      localStorage.setItem('TODO', JSON.stringify(LIST))

      input.value = ''
      id++
      console.log(LIST)
    }
  }

})

//accedo a los elementos ubicados dentro del Ul (#lista)
/*estoy accediendo al valor del icono por medio del even.target,attributE  */
lista.addEventListener('click', function (event) {
  const element = event.target
  const elementData = element.attributes.data.value
  console.log(elementData)

  if (elementData === 'realizado') {
    tareaRealizada(element)
  }
  else if (elementData === 'eliminado') {
    tareaEliminada(element)
    console.log("elimnado")
  }
  localStorage.setItem('TODO', JSON.stringify(LIST))
})


//llamando al LOCALSTORAGE GETITEM
let data = JSON.parse(localStorage.getItem('TODO'))

const cargarLista = (array) => {
  array.forEach(function (item) {
    agregarTarea(item.nombre, item.id, item.realizado, item.eliminado)
  })

}

if (data) {
  LIST = data
  id = LIST.length

  cargarLista(LIST)


} else {
  LIST = []
  id = 0

}

