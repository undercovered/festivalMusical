document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
})

function iniciarApp() {
    navegacionFija(); //Para dejar el header fijo
    crearGaleria();
    scrollNav();
}


function navegacionFija() {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');
    window.addEventListener('scroll', function() {
        // console.log(sobreFestival.getBoundingClientRect());// en que posición está el elemento
        if( sobreFestival.getBoundingClientRect().bottom <= 0 ) {
            header.classList.add('fixed');
            body.classList.add('body-scroll');
        } else {
            header.classList.remove('fixed');	
            body.classList.remove('body-scroll');	
        }
    })
}


function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach ( enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const destino = enlace.getAttribute('href');
            document.querySelector(destino).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } )
    })
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    for(let i=1; i<=12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="">
        `
        imagen.onclick = function() {
           console.log('Abrio la imagen1');
           mostrarImagen(i)
        }
        galeria.appendChild(imagen);

    }
}

function mostrarImagen(index) {
    console.log('Imagen seleccionada: ', index);
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <img loading="lazy" width="200" height="300" src="build/img/grande/${index}.jpg" alt="">
        `
    //Crea el Overlay
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    console.log(overlay);

    //Añade botón de cerrar
    const btnCerrar = document.createElement('P');
    btnCerrar.textContent = 'X';
    console.log(btnCerrar);

    btnCerrar.classList.add('btn-cerrar');
    btnCerrar.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }


    overlay.appendChild(btnCerrar);

    //Lo añade al body
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body')
}