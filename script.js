// ===============================
// SCRIPT PRINCIPAL - PÁGINA CUMPLEAÑOS
// ===============================

// Esperar a que cargue el DOM
window.addEventListener("DOMContentLoaded", () => {

  /* =========================
     BOTÓN DESCUBRIR (HERO)
     ========================= */
  const btnDescubrir = document.querySelector('.btn-primary');

  if (btnDescubrir) {
    btnDescubrir.addEventListener('click', () => {
      const primeraSeccion = document.querySelector('.intro');
      if (primeraSeccion) {
        primeraSeccion.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  }

  /* =========================
     SORPRESA
     ========================= */
  const btnSorpresa = document.getElementById('btn-sorpresa');
  const sorpresaContenido = document.getElementById('sorpresa');

  if (btnSorpresa && sorpresaContenido) {
    btnSorpresa.addEventListener('click', () => {
      const isVisible = sorpresaContenido.style.display === 'block';

      if (!isVisible) {
        sorpresaContenido.style.display = 'block';
        sorpresaContenido.style.opacity = '0';
        sorpresaContenido.style.transform = 'scale(0.9)';

        setTimeout(() => {
          sorpresaContenido.style.transition = 'all 0.6s ease';
          sorpresaContenido.style.opacity = '1';
          sorpresaContenido.style.transform = 'scale(1)';
        }, 50);
      }
    });
  }

  /* =========================
  LÓGICA CALENDARIO POEMAS
   ========================= */

const hoy = new Date();
const diaActual = hoy.getDate();
const mesActual = hoy.getMonth(); // Diciembre = 11

const diasPoemas = document.querySelectorAll(".dia.poema");

diasPoemas.forEach(dia => {
  const diaNumero = parseInt(dia.dataset.dia);

  // Solo funciona en diciembre
  if (mesActual === 16 && diaNumero <= diaActual) {
    dia.classList.add("activo");
  } else {
    dia.classList.add("bloqueado");
  }

  // Click para abrir / cerrar
  dia.addEventListener("click", () => {
    // Si está bloqueado, no hace nada
    if (dia.classList.contains("bloqueado")) return;

    // Cerrar otras cartas abiertas
    diasPoemas.forEach(d => {
      if (d !== dia) {
        d.classList.remove("abierto");
      }
    });

    // Abrir / cerrar la actual
    dia.classList.toggle("abierto");
  });
});


  /* =========================
EFECTO CLICK SUAVE (GLOBAL)
========================= */
  document.addEventListener('click', (e) => {
  const cantidad = 8; // número de margaritas por click

  for (let i = 0; i < cantidad; i++) {
    const margarita = document.createElement('span');
    margarita.classList.add('click-effect');

    const size = Math.random() * 20 + 20; // tamaño variable
    const x = e.clientX;
    const y = e.clientY;

    const offsetX = (Math.random() - 0.5) * 120;
    const offsetY = (Math.random() - 0.5) * 120;
    const rotation = Math.random() * 360;

    margarita.style.width = `${size}px`;
    margarita.style.height = `${size}px`;
    margarita.style.left = `${x}px`;
    margarita.style.top = `${y}px`;
    margarita.style.setProperty('--x', `${offsetX}px`);
    margarita.style.setProperty('--y', `${offsetY}px`);
    margarita.style.setProperty('--r', `${rotation}deg`);

    document.body.appendChild(margarita);

    setTimeout(() => {
      margarita.remove();
    }, 900);
  }

  /* =========================
   FLORES DE FONDO
   ========================= */
const fondo = document.querySelector('.background-flowers');

if (fondo) {
  for (let i = 0; i < 14; i++) {
    const flower = document.createElement('span');
    flower.classList.add('flower');

    const size = Math.random() * 40 + 30;
    const left = Math.random() * 100;
    const duration = Math.random() * 30 + 20;

    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;
    flower.style.left = `${left}%`;
    flower.style.animationDuration = `${duration}s`;
    flower.style.animationDelay = `${Math.random() * 10}s`;

    fondo.appendChild(flower);
  }
}

});


  /* =========================
   MÚSICA (SIEMPRE ACTIVA)
   ========================= */
const music = document.getElementById('bg-music');
const btnMusic = document.getElementById('music-toggle');

if (music) {
  music.volume = 0.3; // volumen suave

  // Intentar reproducir al cargar
  music.play().catch(() => {
    // Algunos navegadores requieren interacción
  });
}

if (btnMusic && music) {
  btnMusic.addEventListener('click', () => {
    if (music.paused) {
      music.play();
      btnMusic.textContent = 'Pausar música';
    } else {
      music.pause();
      btnMusic.textContent = 'Reproducir música';
    }
  });
}


});

/* =========================
   NOTA:
   El efecto de click requiere un pequeño CSS
   que luego podemos agregar.
   ========================= */