import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Ruleta - Busca el color y números</h1>
    <input type="number" id="input-num" placeholder="Escribe un número del 1 al 36" min="1" max="36" />
    <button id="btn-buscar">Buscar</button>
    <div id="resultado"></div>
  </div>
`

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('SW registrado'))
      .catch(err => console.error('SW error', err));
  });
}

const btnBuscar = document.getElementById('btn-buscar');
const inputNum = document.getElementById('input-num');
const resultado = document.getElementById('resultado');

let data = {};

async function cargarDatos() {
  try {
    const res = await fetch('/data.json');
    data = await res.json();
    console.log('Datos cargados:', data);
  } catch (e) {
    console.error('Error al cargar el JSON:', e);
  }
}

function colorPorUltimoDigito(num) {
  const ultimo = num % 10;
  switch (ultimo) {
    case 2: return 'rojo';
    case 3: return 'azul';
    case 5: return 'naranja';
    default: return 'negro';
  }
}

function mostrarResultado(numero) {
  console.log('Número ingresado:', numero);
  const key = numero.toString();
  if (!data[key]) {
    resultado.textContent = 'Número no encontrado en los datos.';
    return;
  }
  const color = colorPorUltimoDigito(numero);
  const numeros = data[key];

  resultado.innerHTML = `
    <p>Número: <strong>${numero}</strong></p>
    <p>Color: <strong style="color:${color}">${color}</strong></p>
    <p>Números relacionados: <strong>${numeros.join(', ')}</strong></p>
  `;
}

btnBuscar.addEventListener('click', () => {
  const numero = parseInt(inputNum.value);
  console.log('Botón clickeado. Valor ingresado:', numero);

  if (isNaN(numero) || numero < 1 || numero > 36) {
    resultado.textContent = 'Por favor ingresa un número válido entre 1 y 36.';
    return;
  }
  mostrarResultado(numero);
});

cargarDatos();


function findLowestPrice(products, discounts) {
    let total = 0;

    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let originalPrice = parseInt(product[0]);
        let lowestPrice = originalPrice;

        for (let j = 1; j < product.length; j++) { // Asumiendo product[0] es el precio, tags empiezan en product[1]
            let tag = product[j];

            if (tag === "EMPTY") {
                continue;
            }

            for (let k = 0; k < discounts.length; k++) {
                let [discountTag, discountType, discountValue] = discounts[k];

                if (discountTag === tag) {
                    let currentDiscountPrice;

                    if (discountType === "0") { // Descuento porcentual
                        currentDiscountPrice = Math.trunc(originalPrice - originalPrice * (parseInt(discountValue) / 100));
                    } else if (discountType === "1") { // Descuento de valor fijo
                        currentDiscountPrice = Math.trunc(originalPrice - parseInt(discountValue));
                    } else if (discountType === "2") { // Precio fijo establecido por el descuento
                        currentDiscountPrice = Math.trunc(parseInt(discountValue));
                    }

                    if (currentDiscountPrice < lowestPrice) {
                        lowestPrice = currentDiscountPrice;
                    }
                }
            }
        }
        total += lowestPrice;
    }

    return total;
}


