<!DOCTYPE html><html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Feria Americana Virtual</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      margin: 0;
      background: #f5f5f5;
      color: #333;
    }header {
  background: #111;
  color: #fff;
  padding: 1rem;
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 1.8rem;
}

.catalogo {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.02);
}

.carousel {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.carousel img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: none;
}

.carousel img.active {
  display: block;
}

.card-content {
  padding: 0.8rem;
}

.precio {
  font-weight: bold;
  color: #008000;
  margin-top: 0.5rem;
}

/* Modal */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal.active {
  display: flex;
}

.modal-content {
  background: #fff;
  max-width: 600px;
  width: 90%;
  border-radius: 8px;
  overflow: hidden;
}

.modal-body {
  padding: 1rem;
}

.modal-carousel img {
  height: 350px;
}

.close {
  text-align: right;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
}

.btn-wsp {
  display: inline-block;
  margin-top: 1rem;
  background: #25D366;
  color: #fff;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
}

  </style>
</head>
<body>
  <header>
    <h1>Feria Americana Virtual</h1>
  </header>  <main class="catalogo" id="catalogo"></main>  <!-- Modal -->  <div class="modal" id="modal">
    <div class="modal-content">
      <div class="close" onclick="cerrarModal()">✕</div>
      <div class="carousel modal-carousel" id="modalCarousel"></div>
      <div class="modal-body" id="modalBody"></div>
    </div>
  </div>  <script>
    const productos = [
      {
        id: 1,
        nombre: "Campera de jean",
        precio: "$12.000",
        descripcionCorta: "Campera de jean clásica, buen estado",
        descripcion: "Campera de jean clásica, talle M. Sin roturas, ideal para media estación.",
        imagenes: [
          "https://via.placeholder.com/600x400?text=Campera+1",
          "https://via.placeholder.com/600x400?text=Campera+2"
        ]
      },
      {
        id: 2,
        nombre: "Zapatillas deportivas",
        precio: "$18.500",
        descripcionCorta: "Zapatillas urbanas usadas",
        descripcion: "Zapatillas deportivas urbanas, talle 42. Uso moderado.",
        imagenes: [
          "https://via.placeholder.com/600x400?text=Zapas+1",
          "https://via.placeholder.com/600x400?text=Zapas+2",
          "https://via.placeholder.com/600x400?text=Zapas+3"
        ]
      }
    ];

    const catalogo = document.getElementById('catalogo');

    productos.forEach((p, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="carousel" id="carousel-${index}">
          ${p.imagenes.map((img, i) => `<img src="${img}" class="${i === 0 ? 'active' : ''}">`).join('')}
        </div>
        <div class="card-content">
          <h3>${p.nombre}</h3>
          <p>${p.descripcionCorta}</p>
          <div class="precio">${p.precio}</div>
        </div>
      `;

      card.onclick = () => abrirModal(p);
      catalogo.appendChild(card);
      iniciarCarousel(`carousel-${index}`);
    });

    function iniciarCarousel(id) {
      const contenedor = document.getElementById(id);
      const imgs = contenedor.querySelectorAll('img');
      let i = 0;
      setInterval(() => {
        imgs[i].classList.remove('active');
        i = (i + 1) % imgs.length;
        imgs[i].classList.add('active');
      }, 3000);
    }

    function abrirModal(producto) {
      const modal = document.getElementById('modal');
      const carousel = document.getElementById('modalCarousel');
      const body = document.getElementById('modalBody');

      carousel.innerHTML = producto.imagenes
        .map((img, i) => `<img src="${img}" class="${i === 0 ? 'active' : ''}">`)
        .join('');

      body.innerHTML = `
        <h2>${producto.nombre}</h2>
        <p>${producto.descripcion}</p>
        <div class="precio">${producto.precio}</div>
        <a class="btn-wsp" target="_blank" href="https://wa.me/5490000000000?text=${encodeURIComponent('Hola! Me interesa el producto: ' + producto.nombre)}">
          Contactar por WhatsApp
        </a>
      `;

      iniciarCarousel('modalCarousel');
      modal.classList.add('active');
    }

    function cerrarModal() {
      document.getElementById('modal').classList.remove('active');
    }
  </script></body>
</html>
