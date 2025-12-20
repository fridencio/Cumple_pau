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
// 2.CARRUSEL
// ===============================
function inicializarSorpresaCorazon() {
  const btnSorpresa = document.getElementById('btn-sorpresa');
  const sorpresaContenido = document.getElementById('sorpresa');
  
  if (!btnSorpresa || !sorpresaContenido) return;
  
  // Variables para el carrusel
  let imagenIndex = 0;
  const totalImagenes = 8;
  let intervaloAutoAvance;
  let carruselElement; // Variable global para el carrusel
  
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
      
      // Inicializar el carrusel
      setTimeout(() => {
        inicializarCarrusel();
      }, 100);
    }
  });
  
  // ===============================
  // FUNCIONES PARA EL CARRUSEL
  // ===============================
  
  function inicializarCarrusel() {
    carruselElement = document.querySelector('.carrusel');
    const indicadoresContainer = document.querySelector('.carrusel-indicadores');
    const imagenActual = document.getElementById('imagen-actual');
    
    console.log('Carrusel encontrado:', carruselElement);
    console.log('Indicadores encontrados:', indicadoresContainer);
    
    if (!carruselElement) {
      console.error('ERROR: No se encontró .carrusel');
      return;
    }
    
    // Limpiar contenido previo
    carruselElement.innerHTML = '';
    if (indicadoresContainer) indicadoresContainer.innerHTML = '';
    
    // Crear imágenes del carrusel
    for (let i = 1; i <= totalImagenes; i++) {
      const imgDiv = document.createElement('div');
      imgDiv.className = 'carrusel-imagen';
      imgDiv.style.backgroundImage = `url('img/1.${i}.jpeg')`;
      imgDiv.dataset.index = i - 1;
      carruselElement.appendChild(imgDiv);
      
      console.log(`Imagen ${i} creada: img/1.${i}.jpeg`);
      
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
    
    // Iniciar auto-avance después de 1 segundo
    setTimeout(iniciarAutoAvance, 1000);
  }
  
  function cambiarImagen(nuevoIndex) {
    console.log(`Cambiando imagen: ${imagenIndex} -> ${nuevoIndex}`);
    
    imagenIndex = nuevoIndex;
    const imagenActual = document.getElementById('imagen-actual');
    
    if (carruselElement) {
      const translateX = -(imagenIndex * 100);
      carruselElement.style.transform = `translateX(${translateX}%)`;
      console.log(`Transform aplicada: translateX(${translateX}%)`);
    }
    
    // Actualizar indicadores
    document.querySelectorAll('.indicador').forEach((ind, index) => {
      const isActive = index === imagenIndex;
      ind.classList.toggle('activo', isActive);
    });
    
    // Actualizar contador
    if (imagenActual) {
      imagenActual.textContent = imagenIndex + 1;
    }
  }
  
  function inicializarControlesCarrusel() {
    // Usar event delegation para los botones ya que podrían no estar disponibles inmediatamente
    document.addEventListener('click', (e) => {
      // Botón anterior
      if (e.target.classList.contains('carrusel-prev') || 
          e.target.closest('.carrusel-prev')) {
        e.preventDefault();
        const nuevoIndex = (imagenIndex - 1 + totalImagenes) % totalImagenes;
        cambiarImagen(nuevoIndex);
        reiniciarAutoAvance();
      }
      
      // Botón siguiente
      if (e.target.classList.contains('carrusel-next') || 
          e.target.closest('.carrusel-next')) {
        e.preventDefault();
        const nuevoIndex = (imagenIndex + 1) % totalImagenes;
        cambiarImagen(nuevoIndex);
        reiniciarAutoAvance();
      }
    });
    
    // Pausar auto-avance al interactuar con el carrusel
    if (carruselElement) {
      carruselElement.addEventListener('mouseenter', detenerAutoAvance);
      carruselElement.addEventListener('mouseleave', iniciarAutoAvance);
    }
  }
  
  function inicializarVideo() {
  const btnVerVideo = document.getElementById('ver-video');
  const corazonVideo = document.getElementById('corazon-video');
  const btnCerrarVideo = document.getElementById('cerrar-video');
  
  if (btnVerVideo && corazonVideo) {
    const videoElement = corazonVideo.querySelector('video');
    
    btnVerVideo.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Mostrando video en forma de corazón');
      
      // Ocultar el carrusel
      document.querySelector('.carrusel').style.opacity = '0.3';
      document.querySelector('.carrusel-indicadores').style.opacity = '0.3';
      
      // Mostrar el corazón con video
      corazonVideo.style.display = 'flex';
      
      // Reproducir video
      if (videoElement) {
        videoElement.play().catch(e => console.error('Error al reproducir video:', e));
      }
      
      // Detener auto-avance
      detenerAutoAvance();
    });
    
    if (btnCerrarVideo) {
      btnCerrarVideo.addEventListener('click', function(e) {
        e.preventDefault();
        cerrarVideo();
      });
    }
    
    // Cerrar video con tecla ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && corazonVideo.style.display === 'flex') {
        cerrarVideo();
      }
    });
    
    function cerrarVideo() {
      // Restaurar el carrusel
      document.querySelector('.carrusel').style.opacity = '1';
      document.querySelector('.carrusel-indicadores').style.opacity = '1';
      
      // Ocultar el corazón con video
      corazonVideo.style.display = 'none';
      
      // Pausar y resetear video
      if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
      
      // Reanudar auto-avance
      iniciarAutoAvance();
    }
  }
}
  
  // ===============================
  // FUNCIONES AUTO-AVANCE
  // ===============================
  
  function iniciarAutoAvance() {
    detenerAutoAvance();
    console.log('Iniciando auto-avance');
    intervaloAutoAvance = setInterval(() => {
      const nuevoIndex = (imagenIndex + 1) % totalImagenes;
      console.log('Auto-avance a imagen:', nuevoIndex);
      cambiarImagen(nuevoIndex);
    }, 3000); // Cambié a 3 segundos para probar más rápido
  }
  
  function detenerAutoAvance() {
    console.log('Deteniendo auto-avance');
    if (intervaloAutoAvance) {
      clearInterval(intervaloAutoAvance);
      intervaloAutoAvance = null;
    }
  }
  
  function reiniciarAutoAvance() {
    console.log('Reiniciando auto-avance');
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
  const diaActual = 22;
  
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