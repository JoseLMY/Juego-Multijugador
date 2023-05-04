const seccionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const volverAJugar = document.getElementById("reiniciar")
const botonGuerreroJugador = document.getElementById("boton-guerrero")
const botonReiniciar = document.getElementById("boton-reiniciar")

const seccionSeleccionarguerrero = document.getElementById("seleccionar-guerrero")
const spanLuchadorJugador = document.getElementById("luchadorJugador")

const luchadorEnemigo = document.getElementById("luchadorEnemigo")

const spanVidasJugador = document.getElementById("vidasJugador")
const spanVidasEnemigo = document.getElementById("vidasEnemigo")

const seccionMensajes = document.getElementById("notificacion")

const ataqueDelJugador = document.getElementById("ataque-del-jugador")
const ataqueDelEnemigo = document.getElementById("ataque-del-enemigo")

const contenedorAtaques = document.getElementById("contenedorAtaques")

const seccionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId
let enemigoId
let monsters = []
let monstersEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let vidasEnemigo = 3
let vidasJugador = 3
let victoriasEnemigo = 0
let victoriasJugador = 0
let opcionDeMonsters
let contenedorTarjetas = document.getElementById("contenedorTarjetas")
let guerreroJugador
let ataquesJugador
let ataqueGuerreroEnemigo
let botonFuego
let botonAgua
let botonTierra 
let botones = []
let indexAtaqueJugador 
let indexAtaqueEnemigo 
let inputLaion
let inputDrako 
let inputLodonte
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/mapa.png"
let guerreroJugadorObjeto  
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximo = 700

if (anchoDelMapa > anchoMaximo) {
    anchoDelMapa = anchoMaximo
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Monster {
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadx = 0
        this.velocidady = 0
    }
    pintarMonster(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}
// SE POSICIONA A LOS MONSTERS DEL JUGADOR
let drako = new Monster ("Drako", "./assets/drako.png", 5, "./assets/drako.png")
let laion = new Monster ("Laion", "./assets/laion.png", 5, "./assets/laion.png")
let lodonte = new Monster ("Lodonte", "./assets/lodonte.png", 5, "./assets/lodonte.png")

const DRAKO_ATAQUES =  [
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua" },
    {nombre: "🌱", id: "boton-tierra"}
]
drako.ataques.push(...DRAKO_ATAQUES)

const LAION_ATAQUES = [
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "🌱", id: "boton-tierra"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"}
]
laion.ataques.push(...LAION_ATAQUES)

const LODONTE_ATAQUES = [
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌱", id: "boton-tierra"}
]
lodonte.ataques.push(...LODONTE_ATAQUES)

monsters.push(drako, laion, lodonte)
console.log(monsters);

// INICIAR JUEGO = EN ESTA FUNCION SE ENCUENTRAN LOS BOTONES QUE SE USAN EN HTML
function iniciarJuego (){
    
    seccionSeleccionarAtaque.style.display = "none"
    volverAJugar.style.display = "none"
    seccionVerMapa.style.display = "none"
    botonGuerreroJugador.addEventListener("click", seleccionarGuerreroJugador)
    botonReiniciar.addEventListener("click", reinciarJuego)

    monsters.forEach((monster) => {
        opcionDeMonsters = `
        <input type="radio" name="guerrero" id=${monster.nombre} class="selector"/>   
                <label class="tarjeta-guerrero" for=${monster.nombre}>
                    <p>${monster.nombre}</p>
                    <img src=${monster.foto} alt=${monster.nombre}>
                </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMonsters
        inputLaion = document.getElementById("Laion")
        inputDrako = document.getElementById("Drako")  
        inputLodonte = document.getElementById("Lodonte")
        
    })

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.1.12:8080/unirse")
        .then(function(res){
            if(res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta  
                    })
            }
        })
}
    
// ALEATORIO = ESTA FUNCION NOS AYUDA A ELEGR ENTRE 3 ATAQUES Y/O JUGADORS ALEATORIAMENTE
function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

// SECCION GUERRERO (JUGADOR) = ENONTRAREMOS LO NECESARIO PARA QUE UN SUJETO PUEDA CUMPLIR EL ROL DE JUGADOR.
function seleccionarGuerreroJugador(){    
    seccionSeleccionarguerrero.style.display = "none"  

    if(inputDrako.checked){
        spanLuchadorJugador.innerHTML = inputDrako.id
        guerreroJugador = inputDrako.id
    } else if (inputLaion.checked){
        spanLuchadorJugador.innerHTML = inputLaion.id
        guerreroJugador = inputLaion.id
    } else if (inputLodonte.checked){
        spanLuchadorJugador.innerHTML = inputLodonte.id
        guerreroJugador = inputLodonte.id
    } else {
        alert("Debes escoger un guerrero para empezar el juego")
        location.reload()
    }

    extraerAtaques(guerreroJugador)
    seccionVerMapa.style.display = "flex"
    iniciarMapa()  
    seleccionarGuerrero(guerreroJugador)
}

function seleccionarGuerrero(guerreroJugador){
    fetch(`http://192.168.1.12:8080/monsters/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            monsters: guerreroJugador
        })
    })
}

function extraerAtaques(guerreroJugador) {
    let ataques
    for (let i = 0; i < monsters.length; i++) {
        if (guerreroJugador === monsters[i].nombre) {
            ataques = monsters[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesJugador = `
        <button id=${ataque.id} class = "BAtaque"> ${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesJugador
    })
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")

    botones = document.querySelectorAll(".BAtaque")
    // console.log(botones)
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.innerText === "🔥"){
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "rgba(91, 3, 3, 0.438)"
                boton.disabled = true  
            } else if (e.target.innerText === "💧"){
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "rgba(0, 15, 73, 0.445)"
                boton.disabled = true 
            } else {
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "rgba(69, 13, 3, 0.438)"
                boton.disabled = true 
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques() {
    fetch(`http://192.168.1.12:8080/monsters/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.1.12:8080/monsters/${enemigoId}/ataques`).then(function(res){
        if (res.ok) {
            res.json().then(function({ ataques }){
                if (ataques.length === 5){
                    ataqueEnemigo = ataques
                    combate()   
                }
            })
        }
    })
}

// SECCION GUERRERO (ENEMIGO) = ENCONTRAREMOS LO NECESARIO PARA QUE EL PC PUEDA CUMPLIR SU ROL.
function seleccionarGuerreroEnemigo(enemigo){
    luchadorEnemigo.innerHTML = enemigo.nombre
    ataqueGuerreroEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function seleccionAtaqueEnemigo(){
    let aleatorioAtaque = aleatorio(0,ataqueGuerreroEnemigo.length -1)
    
    if (aleatorioAtaque == 0 || aleatorioAtaque == 1){
        ataqueEnemigo.push("FUEGO")
    } else if( aleatorioAtaque === 3 || aleatorioAtaque === 4){
        ataqueEnemigo.push("AGUA")
    } else {
        ataqueEnemigo.push("TIERRA")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length === 5){
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("Has empatado 😬")
        } else if (ataqueJugador[index] == "FUEGO" && ataqueEnemigo [index]== "AGUA" || ataqueJugador[index] == "AGUA" && ataqueEnemigo [index] == "TIERRA" || ataqueJugador[index] == "TIERRA" && ataqueEnemigo [index]== "FUEGO"){
            indexAmbosOponentes(index, index)
            crearMensaje ("HAS GANADOOO!! 🥳")
            victoriasJugador = victoriasJugador + 1
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("Has perdido 🤡") 
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVidas()
}
// NOTA: QUEDÉ EN REALIZAR LA LÓGICA PARA QUE SE MUESTRE CUANDO SE GANA O PIERDE, CUANDO LAS VIDAS LLEGAN A CERO.
function revisarVidas (){
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("Esto ha sido un empate!!!")
    } else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal ("FELICITACIONES, HAS GANADO 🎉")
    } else{
        crearMensajeFinal("Lo siento, perdiste 💀")
    }
}

function crearMensajeFinal(resultadoFinal){
    
    seccionMensajes.innerHTML = resultadoFinal    
    volverAJugar.style.display = "flex"
}

function reinciarJuego (){
    location.reload()
}

function crearMensaje(resultado){

    let nuevoataqueDelJugador = document.createElement("p")
    let nuevoataqueDelEnemigo = document.createElement("p")

    seccionMensajes.innerHTML = resultado
    nuevoataqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoataqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataqueDelJugador.appendChild(nuevoataqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoataqueDelEnemigo)
}

function pintarCanvas(){
    guerreroJugadorObjeto.x = guerreroJugadorObjeto.x + guerreroJugadorObjeto.velocidadx
    guerreroJugadorObjeto.y = guerreroJugadorObjeto.y + guerreroJugadorObjeto.velocidady
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    guerreroJugadorObjeto.pintarMonster()

    enviarPosicion(guerreroJugadorObjeto.x , guerreroJugadorObjeto.y)

    monstersEnemigos.forEach(function(monster){
        monster.pintarMonster()
        revisarColision(monster)
    })

}

function enviarPosicion(x, y) {
    fetch(`http://192.168.1.12:8080/monsters/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            x,
            y
        })
    })
    .then(function(res){
        if (res.ok) {
            res.json().then(function({ enemigos }){
                console.log(enemigos)

                monstersEnemigos = enemigos.map(function(enemigo){
                    let monsterEnemigo = null
                    const monsterNombre = enemigo.guerrero.nombre || ""
                    if (monsterNombre === "Drako") {
                        monsterEnemigo = new Monster ("Drako", "./assets/drako.png", 5, "./assets/drako.png", enemigo.id)
                    }else if (monsterNombre === "Laion"){
                        monsterEnemigo = new Monster ("Laion", "./assets/laion.png", 5, "./assets/laion.png", enemigo.id)
                    } else if (monsterNombre === "Lodonte"){
                        monsterEnemigo = new Monster ("Lodonte", "./assets/lodonte.png", 5, "./assets/lodonte.png", enemigo.id)
                    }   
                    monsterEnemigo.x = enemigo.x
                    monsterEnemigo.y = enemigo.y
                    return monsterEnemigo
                })                   
            })
        }
    })
}
function moverDerecha(){
    guerreroJugadorObjeto.velocidadx = 5
}
function moverIzquierda(){
    guerreroJugadorObjeto.velocidadx = -5
    
}
function moverArriba(){
    guerreroJugadorObjeto.velocidady = -5
}
function moverAbajo(){
    guerreroJugadorObjeto.velocidady = 5
}

function detenerPersonaje(){
    guerreroJugadorObjeto.velocidadx = 0
    guerreroJugadorObjeto.velocidady = 0
}

function moverPersonaje(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break;
        case "ArrowDown":
            moverAbajo()
            break;
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        default:
            break;
    }
}

function iniciarMapa() {

    intervalo = setInterval(pintarCanvas, 50)
    guerreroJugadorObjeto = obtenerObjetoMascota(guerreroJugador)

    window.addEventListener("keydown", moverPersonaje)
    window.addEventListener("keyup", detenerPersonaje)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < monsters.length; i++) {
        if (guerreroJugador === monsters[i].nombre) {
            return monsters[i]
        }
    }
}

function revisarColision(enemigo) {

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = guerreroJugadorObjeto.y
    const abajoMascota = guerreroJugadorObjeto.y + guerreroJugadorObjeto.alto
    const derechaMascota = guerreroJugadorObjeto.x + guerreroJugadorObjeto.ancho
    const izquierdaMascota = guerreroJugadorObjeto.x

    if (abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo) {
        return
    } 
    detenerPersonaje()
    clearInterval(intervalo)

    enemigoId = enemigo.id

    seccionSeleccionarAtaque.style.display = "flex"
    seccionVerMapa.style.display = "none"
    seleccionarGuerreroEnemigo(enemigo)
}

window.addEventListener("load", iniciarJuego)
