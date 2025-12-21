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
// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
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
  
  // Variables del carrusel
  let indiceActual = 0;
  const totalImagenes = 7; 
  
  // URLs de ejemplo para las imágenes (reemplázalas con tus propias imágenes)
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
  // Modifica la función inicializarCarrusel para asignar clases según dimensiones
function inicializarCarrusel() {
  // Limpiar contenido existente
  carrusel.innerHTML = '';
  indicadoresContainer.innerHTML = '';
  
  // Dimensiones de las imágenes
  const dimensiones = [
    {width: 1600, height: 1200, clase: 'imagen-4-3'},    // 1.1
    {width: 1200, height: 1600, clase: 'imagen-3-4'},    // 1.3
    {width: 960, height: 1280, clase: 'imagen-3-4'},     // 1.4
    {width: 960, height: 1280, clase: 'imagen-3-4'},     // 1.5
    {width: 1600, height: 900, clase: 'imagen-16-9'},    // 1.6
    {width: 1600, height: 900, clase: 'imagen-16-9'},    // 1.7
    {width: 1200, height: 1600, clase: 'imagen-3-4'}     // 1.8
  ];
  
  // Crear imágenes del carrusel
  imagenes.forEach((imagen, index) => {
    const imgElement = document.createElement('img');
    imgElement.src = imagen;
    imgElement.alt = `Imagen ${index + 1}`;
    imgElement.classList.add('imagen-carrusel');
    
    // Asignar clase según dimensiones
    if (dimensiones[index]) {
      imgElement.classList.add(dimensiones[index].clase);
    }
    
    // Manejar error si la imagen no se carga
    imgElement.onerror = function() {
      console.error(`No se pudo cargar la imagen: ${imagen}`);
      // Crear una imagen de reemplazo si falla
      this.src = `https://via.placeholder.com/${dimensiones[index]?.width || 800}x${dimensiones[index]?.height || 600}/f0f8ff/c3d3f2?text=Imagen+${index+1}`;
      this.alt = `Imagen ${index + 1} no disponible`;
    };
    
    carrusel.appendChild(imgElement);
    
    // Crear indicadores
    const indicador = document.createElement('div');
    indicador.classList.add('carrusel-indicador');
    if (index === 0) indicador.classList.add('activo');
    
    indicador.addEventListener('click', () => {
      cambiarImagen(index);
    });
    
    indicadoresContainer.appendChild(indicador);
  });
  
  // Actualizar contador
  actualizarContador();
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
      if (index === indiceActual) {
        indicador.classList.add('activo');
      } else {
        indicador.classList.remove('activo');
      }
    });
    
    // Actualizar contador
    actualizarContador();
  }
  
  // Función para actualizar el contador de imágenes
  function actualizarContador() {
    imagenActualSpan.textContent = indiceActual + 1;
  }
  
  // Función para mostrar la sorpresa
  function mostrarSorpresa() {
    sorpresaContenido.classList.add('mostrado');
    // Inicializar el carrusel solo cuando se muestra
    inicializarCarrusel();
    
    // Ocultar el botón de sorpresa después de hacer clic
    btnSorpresa.style.display = 'none';
  }
  
  // Función para mostrar el video
  function mostrarVideo() {
    videoContainer.classList.add('mostrar');
    // Pausar el carrusel automático si existe
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  }
  
  // Función para cerrar el video
  function cerrarVideo() {
    videoContainer.classList.remove('mostrar');
    // Reanudar el carrusel automático si existe
    if (autoPlayInterval) {
      iniciarAutoPlay();
    }
  }
  
  // Auto-play del carrusel (cambia cada 5 segundos)
  let autoPlayInterval;
  
  function iniciarAutoPlay() {
    autoPlayInterval = setInterval(() => {
      cambiarImagen(indiceActual + 1);
    }, 5000);
  }
  
  // Event Listeners
  btnSorpresa.addEventListener('click', mostrarSorpresa);
  
  btnPrev.addEventListener('click', () => {
    cambiarImagen(indiceActual - 1);
    // Reiniciar auto-play
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      iniciarAutoPlay();
    }
  });
  
  btnNext.addEventListener('click', () => {
    cambiarImagen(indiceActual + 1);
    // Reiniciar auto-play
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      iniciarAutoPlay();
    }
  });
  
  btnVerVideo.addEventListener('click', mostrarVideo);
  btnCerrarVideo.addEventListener('click', cerrarVideo);
  
  // Cerrar el video al hacer clic fuera de él
  videoContainer.addEventListener('click', function(e) {
    if (e.target === videoContainer) {
      cerrarVideo();
    }
  });
  
  // Cerrar el video con la tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoContainer.classList.contains('mostrar')) {
      cerrarVideo();
    }
  });
  
  // Iniciar auto-play cuando se muestra la sorpresa
  btnSorpresa.addEventListener('click', function() {
    // Pequeño retraso para asegurar que el carrusel se haya inicializado
    setTimeout(() => {
      iniciarAutoPlay();
    }, 500);
  });
  
  // Pausar auto-play al pasar el mouse sobre el carrusel
  carrusel.addEventListener('mouseenter', function() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  });
  
  // Reanudar auto-play al quitar el mouse del carrusel
  carrusel.addEventListener('mouseleave', function() {
    if (sorpresaContenido.classList.contains('mostrado')) {
      iniciarAutoPlay();
    }
  });
});

// ===============================
// 3. CALENDARIO DE POEMAS
// ===============================
function inicializarCalendarioPoemas() {
  const hoy = new Date();
  const diaActual = hoy.getDate();
  const mesActual = hoy.getMonth(); // Diciembre = 11
  
  // Para pruebas: descomenta la siguiente línea
  //const diaActual = 22;
  
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

// ===============================
// MÚSICA DE FONDO AUTOMÁTICA
// ===============================

function inicializarMusicaFondo() {
  console.log('🎵 Configurando música de fondo...');
  
  const audio = document.getElementById('musica-fondo');
  
  if (!audio) {
    console.error('❌ No se encontró el elemento de audio');
    return;
  }
  
  // Configurar volumen bajo (30%)
  audio.volume = 0.3;
  
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
          // Esperar a que el usuario interactúe
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
          // Remover los event listeners una vez que se reproduce
          eventos.forEach(evento => {
            document.removeEventListener(evento, iniciarDespuesDeInteraccion);
          });
        })
        .catch(e => console.log('Error al reproducir:', e));
    }
    
    // Agregar listeners para eventos de interacción
    eventos.forEach(evento => {
      document.addEventListener(evento, iniciarDespuesDeInteraccion, { once: true });
    });
  }
  
  // Intentar reproducir después de un breve retraso
  setTimeout(intentarReproducir, 1000);
}

// Llamar a la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarMusicaFondo);