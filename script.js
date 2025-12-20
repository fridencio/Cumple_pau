// ===============================
// SCRIPT PRINCIPAL - PÁGINA CUMPLEAÑOS
// ===============================

// Esperar a que cargue el DOM
window.addEventListener("DOMContentLoaded", () => {
  inicializarApp();
});

// ===============================
// INICIALIZACIÓN PRINCIPAL
// ===============================
function inicializarApp() {
  // 1. Botón Descubrir (Hero)
  inicializarBotonDescubrir();
  
  // 2. Sorpresa con corazón y carrusel
  inicializarSorpresaCorazon();
  
  // 3. Calendario de poemas
  inicializarCalendarioPoemas();
  
  // 4. Efectos visuales globales
  inicializarEfectosVisuales();
}

// ===============================
// 1. BOTÓN DESCUBRIR (HERO)
// ===============================
function inicializarBotonDescubrir() {
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
}

// ===============================
// 2. SORPRESA CORAZÓN CON CARRUSEL
// ===============================
function inicializarSorpresaCorazon() {
  const btnSorpresa = document.getElementById('btn-sorpresa');
  const sorpresaContenido = document.getElementById('sorpresa');
  
  if (!btnSorpresa || !sorpresaContenido) return;
  
  // Variables para el carrusel
  let imagenIndex = 0;
  const totalImagenes = 8;
  let intervaloAutoAvance;
  
  btnSorpresa.addEventListener('click', () => {
    const isVisible = sorpresaContenido.style.display === 'flex';
    
    if (!isVisible) {
      sorpresaContenido.style.display = 'flex';
      sorpresaContenido.style.opacity = '0';
      sorpresaContenido.style.transform = 'scale(0.9)';
      
      setTimeout(() => {
        sorpresaContenido.style.transition = 'all 0.6s ease';
        sorpresaContenido.style.opacity = '1';
        sorpresaContenido.style.transform = 'scale(1)';
      }, 50);
      
      // Cambiar texto del botón
      btnSorpresa.textContent = '¡Gracias por abrirme!';
      btnSorpresa.style.backgroundColor = '#FFD3D5';
      
      // Ocultar botón después de 2 segundos
      setTimeout(() => {
        btnSorpresa.style.display = 'none';
      }, 2000);
      
      // Inicializar el carrusel del corazón
      setTimeout(() => {
        inicializarCarrusel();
      }, 600);
    }
  });
  
  // ===============================
  // FUNCIONES PARA EL CARRUSEL
  // ===============================
  
  function inicializarCarrusel() {
    const corazonCarrusel = document.querySelector('.corazon-carrusel');
    const indicadoresContainer = document.querySelector('.carrusel-indicadores');
    const imagenActual = document.getElementById('imagen-actual');
    
    if (!corazonCarrusel) return;
    
    // Limpiar contenido previo
    corazonCarrusel.innerHTML = '';
    if (indicadoresContainer) indicadoresContainer.innerHTML = '';
    
    // Crear imágenes del carrusel
    for (let i = 1; i <= totalImagenes; i++) {
      const imgDiv = document.createElement('div');
      imgDiv.className = 'imagen-corazon';
      imgDiv.style.backgroundImage = `url('img/1.${i}.jpeg')`;
      imgDiv.dataset.index = i - 1;
      corazonCarrusel.appendChild(imgDiv);
      
      // Crear indicadores
      if (indicadoresContainer) {
        const indicador = document.createElement('div');
        indicador.className = 'indicador';
        if (i === 1) indicador.classList.add('activo');
        indicador.dataset.index = i - 1;
        indicador.addEventListener('click', () => cambiarImagen(i - 1));
        indicadoresContainer.appendChild(indicador);
      }
    }
    
    // Actualizar contador
    if (imagenActual) imagenActual.textContent = '1';
    
    // Mostrar primera imagen
    cambiarImagen(0);
    
    // Iniciar navegación con botones
    inicializarControlesCarrusel();
    
    // Inicializar video
    inicializarVideo();
    
    // Iniciar auto-avance después de 3 segundos
    setTimeout(iniciarAutoAvance, 3000);
  }
  
  function cambiarImagen(nuevoIndex) {
    imagenIndex = nuevoIndex;
    const corazonCarrusel = document.querySelector('.corazon-carrusel');
    const imagenActual = document.getElementById('imagen-actual');
    
    if (corazonCarrusel) {
      corazonCarrusel.style.transform = `translateX(-${imagenIndex * 100}%)`;
    }
    
    // Actualizar indicadores
    document.querySelectorAll('.indicador').forEach((ind, index) => {
      ind.classList.toggle('activo', index === imagenIndex);
    });
    
    // Actualizar contador
    if (imagenActual) {
      imagenActual.textContent = imagenIndex + 1;
    }
  }
  
  function inicializarControlesCarrusel() {
    const btnPrev = document.querySelector('.carrusel-prev');
    const btnNext = document.querySelector('.carrusel-next');
    const corazonCarrusel = document.querySelector('.corazon-carrusel');
    
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        const nuevoIndex = (imagenIndex - 1 + totalImagenes) % totalImagenes;
        cambiarImagen(nuevoIndex);
        reiniciarAutoAvance();
      });
    }
    
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        const nuevoIndex = (imagenIndex + 1) % totalImagenes;
        cambiarImagen(nuevoIndex);
        reiniciarAutoAvance();
      });
    }
    
    // Pausar auto-avance al interactuar con el carrusel
    if (corazonCarrusel) {
      corazonCarrusel.addEventListener('mouseenter', detenerAutoAvance);
      corazonCarrusel.addEventListener('mouseleave', iniciarAutoAvance);
    }
  }
  
  function inicializarVideo() {
    const btnVerVideo = document.getElementById('ver-video');
    const corazonVideo = document.getElementById('corazon-video');
    const btnCerrarVideo = document.getElementById('cerrar-video');
    const videoElement = corazonVideo ? corazonVideo.querySelector('video') : null;
    
    if (btnVerVideo && corazonVideo && videoElement) {
      btnVerVideo.addEventListener('click', function() {
        corazonVideo.style.display = 'block';
        videoElement.play();
        detenerAutoAvance();
      });
      
      btnCerrarVideo.addEventListener('click', function() {
        cerrarVideo();
      });
      
      // Cerrar video con tecla ESC
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && corazonVideo.style.display === 'block') {
          cerrarVideo();
        }
      });
      
      function cerrarVideo() {
        corazonVideo.style.display = 'none';
        videoElement.pause();
        videoElement.currentTime = 0;
        iniciarAutoAvance();
      }
    }
  }
  
  // ===============================
  // FUNCIONES AUTO-AVANCE
  // ===============================
  
  function iniciarAutoAvance() {
    detenerAutoAvance();
    intervaloAutoAvance = setInterval(() => {
      const nuevoIndex = (imagenIndex + 1) % totalImagenes;
      cambiarImagen(nuevoIndex);
    }, 5000);
  }
  
  function detenerAutoAvance() {
    if (intervaloAutoAvance) {
      clearInterval(intervaloAutoAvance);
    }
  }
  
  function reiniciarAutoAvance() {
    detenerAutoAvance();
    iniciarAutoAvance();
  }
}

// ===============================
// 3. CALENDARIO DE POEMAS
// ===============================
function inicializarCalendarioPoemas() {
  const hoy = new Date();
  //const diaActual = hoy.getDate();
  const mesActual = hoy.getMonth(); // Diciembre = 11
  
  // Para pruebas: descomenta la siguiente línea
  const diaActual = 31;
  
  const diasPoemas = document.querySelectorAll(".dia.poema");
  
  diasPoemas.forEach(dia => {
    const diaNumero = parseInt(dia.dataset.dia);
    
    // Solo funciona en diciembre
    if (mesActual === 11 && diaNumero <= diaActual) {
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
}

// ===============================
// 4. EFECTOS VISUALES GLOBALES
// ===============================
function inicializarEfectosVisuales() {
  // Efecto de click suave (margaritas)
  inicializarEfectoClick();
  
  // Flores de fondo animadas
  inicializarFloresFondo();
}

function inicializarEfectoClick() {
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
  });
}

function inicializarFloresFondo() {
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
}