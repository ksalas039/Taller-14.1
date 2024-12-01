// Función para buscar imágenes
function buscarImagenes(query) {
    const API_URL = `https://images-api.nasa.gov/search?q=${query}`;

    fetch(API_URL)
        .then(res => {
            if (!res.ok) {
                throw new Error('Error en la solicitud a la API.');
            }
            return res.json();
        })
        .then((data) => {
            mostrarDatos(data.collection.items);
        })
        .catch(error => {
            console.error('Hubo un problema con el fetch:', error);
            document.getElementById('contenedor').innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
        });
}

// Función para mostrar los datos
function mostrarDatos(data) {
    const resultadosContenedor = document.getElementById('contenedor');
    resultadosContenedor.innerHTML = ''; // Limpiar resultados previos

    if (data.length === 0) {
        resultadosContenedor.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    data.forEach((item) => {
        const { title, description, date_created } = item.data[0];
        const imageUrl = item.links ? item.links[0].href : 'https://via.placeholder.com/150';

        const card = `
        <div class="col-md-4 col-sm-6 mb-4 d-flex align-items-stretch">
          <div class="card mb-4 shadow-sm d-flex flex-column">
            <img src="${imageUrl}" class="card-img-top img-fluid w-100" alt="${title}" style="height: 150px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${title || 'Sin título'}</h5>
              <p class="card-text text-start flex-grow-1 scroll">${description || 'Sin descripción disponible.'}</p>
              <p class="card-text mt-auto"><small class="text-muted">${new Date(date_created).toLocaleDateString()}</small></p>
            </div>
          </div>
        </div>
      `;

        resultadosContenedor.innerHTML += card;
    });
}

// Manejador de búsqueda
document.getElementById('btnBuscar').addEventListener('click', () => {
    const query = document.getElementById('inputBuscar').value.trim(); // Captura el valor del input
  
    if (query) {
      buscarImagenes(query); // Llama a la función para realizar la búsqueda
    } else {
      alert('Por favor, ingresa un término de búsqueda.');
    }
  });