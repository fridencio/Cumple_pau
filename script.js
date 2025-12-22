// Variable global para el intervalo del autoplay
let autoPlayInterval = null;

// ===============================
// INICIALIZACIÓN PRINCIPAL
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  console.log('🎉 Iniciando aplicación...');
  inicializarApp();
});

function inicializarApp() {
  // 1. Botón Descubrir (Hero)
  inicializarBotonDescubrir();
  
  // 2. Sorpresa con corazón y carrusel
  inicializarSorpresaCorazon();
  
  // 3. Calendario de poemas
  inicializarCalendarioPoemas();
  
  // 4. Efectos visuales globales
  inicializarEfectosVisuales();
  
  // 5. Música de fondo
  inicializarMusicaFondo();
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
    console.log('✅ Botón descubrir inicializado');
  } else {
    console.warn('⚠️ No se encontró el botón descubrir');
  }
}

// ===============================
// 2. SORPRESA Y CARRUSEL
// ===============================
function inicializarSorpresaCorazon() {
  // Elementos principales
  const btnSorpresa = document.getElementById('btn-sorpresa');
  const sorpresaContenido = document.getElementById('sorpresa');
  const carrusel = document.querySelector('.carrusel');
  const indicadoresContainer = document.querySelector('.carrusel-indicadores');
  const imagenActualSpan = document.getElementById('imagen-actual');
  const btnPrev = document.querySelector('.carrusel-prev');
  const btnNext = document.querySelector('.carrusel-next');
  const btnVerVideo = document.getElementById('ver-video');
  const videoContainer = document.getElementById('corazon-video');
  const btnCerrarVideo = document.getElementById('cerrar-video');
  
  // Verificar que existan los elementos
  if (!btnSorpresa || !sorpresaContenido || !carrusel) {
    console.warn('⚠️ Elementos de sorpresa no encontrados');
    return;
  }
  
  // Variables del carrusel
  let indiceActual = 0;
  const totalImagenes = 7;
  
  // URLs de las imágenes
  const imagenes = [
    'img/1.1.jpeg',
    'img/1.3.jpeg',
    'img/1.4.jpeg',
    'img/1.5.jpeg',
    'img/1.6.jpeg',
    'img/1.7.jpeg',
    'img/1.8.jpeg'
  ];
  
  // Función para inicializar el carrusel
  function inicializarCarrusel() {
    console.log('🎠 Inicializando carrusel...');
    
    // Limpiar contenido existente
    carrusel.innerHTML = '';
    indicadoresContainer.innerHTML = '';
    
    // Crear imágenes del carrusel
    imagenes.forEach((imagen, index) => {
      const imgElement = document.createElement('img');
      imgElement.src = imagen;
      imgElement.alt = `Imagen ${index + 1}`;
      imgElement.classList.add('imagen-carrusel');
      
      // Manejar error si la imagen no se carga
      imgElement.onerror = function() {
        console.error(`❌ No se pudo cargar: ${imagen}`);
        this.src = `https://via.placeholder.com/800x600/f0f8ff/c3d3f2?text=Imagen+${index+1}`;
        this.alt = `Imagen ${index + 1} no disponible`;
      };
      
      carrusel.appendChild(imgElement);
      
      // Crear indicadores
      const indicador = document.createElement('div');
      indicador.classList.add('carrusel-indicador');
      if (index === 0) indicador.classList.add('activo');
      
      indicador.addEventListener('click', () => {
        cambiarImagen(index);
        reiniciarAutoPlay();
      });
      
      indicadoresContainer.appendChild(indicador);
    });
    
    actualizarContador();
    console.log('✅ Carrusel inicializado');
  }
  
  // Función para cambiar de imagen
  function cambiarImagen(nuevoIndice) {
    if (nuevoIndice < 0) nuevoIndice = totalImagenes - 1;
    if (nuevoIndice >= totalImagenes) nuevoIndice = 0;
    
    indiceActual = nuevoIndice;
    const desplazamiento = -indiceActual * 100;
    carrusel.style.transform = `translateX(${desplazamiento}%)`;
    
    // Actualizar indicadores activos
    const indicadores = document.querySelectorAll('.carrusel-indicador');
    indicadores.forEach((indicador, index) => {
      indicador.classList.toggle('activo', index === indiceActual);
    });
    
    actualizarContador();
  }
  
  // Función para actualizar el contador de imágenes
  function actualizarContador() {
    if (imagenActualSpan) {
      imagenActualSpan.textContent = indiceActual + 1;
    }
  }
  
  // Auto-play del carrusel
  function iniciarAutoPlay() {
    detenerAutoPlay();
    autoPlayInterval = setInterval(() => {
      cambiarImagen(indiceActual + 1);
    }, 5000);
  }
  
  function detenerAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }
  
  function reiniciarAutoPlay() {
    detenerAutoPlay();
    iniciarAutoPlay();
  }
  
  // Función para mostrar la sorpresa
  function mostrarSorpresa() {
    sorpresaContenido.classList.add('mostrado');
    inicializarCarrusel();
    btnSorpresa.style.display = 'none';
    
    // Iniciar autoplay después de un breve retraso
    setTimeout(() => {
      iniciarAutoPlay();
    }, 500);
    
    console.log('🎁 Sorpresa mostrada');
  }
  
  // Función para mostrar el video
  function mostrarVideo() {
    if (videoContainer) {
      videoContainer.classList.add('mostrar');
      detenerAutoPlay();
      console.log('📹 Video mostrado');
    }
  }
  
  // Función para cerrar el video
  function cerrarVideo() {
    if (videoContainer) {
      videoContainer.classList.remove('mostrar');
      const video = videoContainer.querySelector('video');
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      if (sorpresaContenido.classList.contains('mostrado')) {
        iniciarAutoPlay();
      }
      console.log('📹 Video cerrado');
    }
  }
  
  // Event Listeners
  btnSorpresa.addEventListener('click', mostrarSorpresa);
  
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      cambiarImagen(indiceActual - 1);
      reiniciarAutoPlay();
    });
  }
  
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      cambiarImagen(indiceActual + 1);
      reiniciarAutoPlay();
    });
  }
  
  if (btnVerVideo) {
    btnVerVideo.addEventListener('click', mostrarVideo);
  }
  
  if (btnCerrarVideo) {
    btnCerrarVideo.addEventListener('click', cerrarVideo);
  }
  
  // Cerrar el video al hacer clic fuera de él
  if (videoContainer) {
    videoContainer.addEventListener('click', function(e) {
      if (e.target === videoContainer) {
        cerrarVideo();
      }
    });
  }
  
  // Cerrar el video con la tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoContainer && videoContainer.classList.contains('mostrar')) {
      cerrarVideo();
    }
  });
  
  // Pausar auto-play al pasar el mouse sobre el carrusel
  carrusel.addEventListener('mouseenter', detenerAutoPlay);
  
  // Reanudar auto-play al quitar el mouse del carrusel
  carrusel.addEventListener('mouseleave', () => {
    if (sorpresaContenido.classList.contains('mostrado')) {
      iniciarAutoPlay();
    }
  });
  
  console.log('✅ Sorpresa y carrusel inicializados');
}

// ===============================
// 3. CALENDARIO DE POEMAS
// ===============================
function inicializarCalendarioPoemas() {
  console.log('📅 Inicializando calendario de poemas...');
  
  const hoy = new Date();
  const mesActual = hoy.getMonth(); 
  const diaActual = hoy.getDate();
  //const diaActual = 22; // Para pruebas
  
  const diasPoemas = document.querySelectorAll(".dia.poema");
  
  if (diasPoemas.length === 0) {
    console.warn('⚠️ No se encontraron días de poemas');
    return;
  }
  
  console.log(`📆 Fecha actual: ${diaActual} de ${mesActual === 11 ? 'diciembre' : 'mes ' + (mesActual + 1)}`);
  console.log(`📝 Total de días encontrados: ${diasPoemas.length}`);
  
  diasPoemas.forEach(dia => {
    const diaNumero = parseInt(dia.dataset.dia);
    
    console.log(`🔍 Procesando día ${diaNumero}`);
    
    // Solo funciona en diciembre Y si el día ya pasó o es hoy
    if (mesActual === 11 && diaNumero <= diaActual) {
      dia.classList.remove("bloqueado");
      dia.classList.add("activo");
      console.log(`✅ Día ${diaNumero} desbloqueado`);
    } else {
      dia.classList.remove("activo");
      dia.classList.add("bloqueado");
      console.log(`🔒 Día ${diaNumero} bloqueado`);
    }
    
    // Click para abrir / cerrar
    dia.addEventListener("click", function() {
      // Si está bloqueado, no hace nada
      if (this.classList.contains("bloqueado")) {
        console.log(`🚫 Día ${diaNumero} está bloqueado`);
        return;
      }
      
      // Cerrar otras cartas abiertas
      diasPoemas.forEach(d => {
        if (d !== this) {
          d.classList.remove("abierto");
        }
      });
      
      // Abrir / cerrar la actual
      this.classList.toggle("abierto");
      
      if (this.classList.contains("abierto")) {
        console.log(`📖 Día ${diaNumero} abierto`);
      } else {
        console.log(`📕 Día ${diaNumero} cerrado`);
      }
    });
  });
  
  console.log('✅ Calendario de poemas inicializado');
}

// ===============================
// 4. EFECTOS VISUALES GLOBALES
// ===============================
function inicializarEfectosVisuales() {
  inicializarEfectoClick();
  inicializarFloresFondo();
  console.log('✅ Efectos visuales inicializados');
}

function inicializarEfectoClick() {
  document.addEventListener('click', (e) => {
    const cantidad = 8;
    
    for (let i = 0; i < cantidad; i++) {
      const margarita = document.createElement('span');
      margarita.classList.add('click-effect');
      
      const size = Math.random() * 20 + 20;
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

// ===============================
// 5. MÚSICA DE FONDO AUTOMÁTICA
// ===============================
function inicializarMusicaFondo() {
  console.log('🎵 Configurando música de fondo...');
  
  const audio = document.getElementById('musica-fondo');
  
  if (!audio) {
    console.warn('⚠️ No se encontró el elemento de audio');
    return;
  }
  
  // Configurar volumen bajo (30%)
  audio.volume = 0.1;
  
  // Función para intentar reproducir
  function intentarReproducir() {
    const promesa = audio.play();
    
    if (promesa !== undefined) {
      promesa
        .then(() => {
          console.log('✅ Música de fondo reproduciéndose');
        })
        .catch(error => {
          console.log('🔇 Esperando interacción del usuario para reproducir música...');
          configurarEsperaInteraccion();
        });
    }
  }
  
  // Configurar espera por interacción del usuario
  function configurarEsperaInteraccion() {
    const eventos = ['click', 'touchstart', 'keydown'];
    
    function iniciarDespuesDeInteraccion() {
      audio.play()
        .then(() => {
          console.log('✅ Música iniciada después de interacción');
          eventos.forEach(evento => {
            document.removeEventListener(evento, iniciarDespuesDeInteraccion);
          });
        })
        .catch(e => console.warn('⚠️ Error al reproducir:', e));
    }
    
    eventos.forEach(evento => {
      document.addEventListener(evento, iniciarDespuesDeInteraccion, { once: true });
    });
  }
  
  // Intentar reproducir después de un breve retraso
  setTimeout(intentarReproducir, 1000);
}