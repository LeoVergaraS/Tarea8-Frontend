class Personaje {
    constructor(nombre, especie, imagen) {
        this.nombre = nombre;
        this.especie = especie;
        this.imagen = imagen;
    }

    get getNombre() {
        return this.nombre;
    }

    get getEspecie() {
        return this.especie;
    }

    get getImagen() {
        return this.imagen;
    }

    show(per) {
        per.innerHTML += `
                        <div class="bloque">
                            <img class="portal hover-collapse" src="./assets/image/Daco_47559.png" class="card-img-top" alt="portal">
                            <div class="content">
                                <img src="${this.getImagen}" class="img-top" alt="${this.getNombre}">
                                <div class="text">
                                    <h4 class="title">${this.getNombre}</h5>
                                    <p class="card-text">${this.getEspecie}</p>
                                </div>
                            </div>
                        </div>`
    }
}

// Entrada: No tiene
// Salida: Json, retorna los primeros 20 personajes de la API
// Descripción: Función que hace un GET de la API de Rick and
//              Morty y retorna los primeros 20 personajes
const getPersonajes = async () => {
    try {
        const url = "https://rickandmortyapi.com/api/character";
        const response = await fetch(url);
        const data = await response.json();
        const personajes = data.results;
        return personajes;
    } catch (error) {
        console.error(error)
    }
}

// Entrada: No tiene
// Salida: No tiene
// Descripción: Función que muestra los personajes en el HTML
//              utilizando la clase Personajes.
const showPage = async () => {
    let per = document.getElementById("personajes");
    const personajes = await getPersonajes();
    personajes.forEach(personaje => {
        new Personaje(personaje.name, personaje.species, personaje.image).show(per);
    });

    // Para manejar el hover del portal
    const hoverCollapseList = document.querySelectorAll('.hover-collapse');
    const content = document.querySelectorAll('.content');

    hoverCollapseList.forEach(function (hoverCollapse, i) {
        hoverCollapse.addEventListener('mouseenter', function () {
            content[i].classList.add('active');
        });

        hoverCollapse.addEventListener('mouseleave', function () {
            content[i].classList.remove('active');
        });
    });

    content.forEach(function (cont, i) {
        cont.addEventListener('mouseenter', function () {
            cont.classList.add('active');
        });

        cont.addEventListener('mouseleave', function () {
            cont.classList.remove('active');
        });
    });
};

showPage();



