// load a tile layer
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});
// Estas son imagenes satelitales
var Esri_WorldImagery = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

// initialize the map
var map = L.map('map', {
    center: [-17.784071, -63.180522],
    zoom: 12,
    layers: [OpenStreetMap_Mapnik, Stadia_OSMBright, Esri_WorldImagery, ]
    // layers: [OpenStreetMap_Mapnik ]
});

var baseMaps = {
    "Barrios": Stadia_OSMBright,
    "Satelite": Esri_WorldImagery,
    "Base": OpenStreetMap_Mapnik,
};
var overlayMaps;
var marker;
var cotizarEnable = false;
var celular = "+59171011118";
// const waiting = document.getElementById('waiting');
// const modal = document.getElementById("modal");
const precioEle = document.getElementById("precio");
const precioText = precioEle.querySelector("p");
document.getElementById('map').style.cursor =
    'crosshair';
// const xModal = document.getElementById("xModal");

L.control.layers(baseMaps, overlayMaps, {
    position: 'topleft',
    collapsed: true
}).addTo(map);

L.control.scale().addTo(map);

// UBICAR
// Agrega boton para encontrar ubicacion 
var botonUbicar = L.control.custom({
        position: 'topright',
        content: `    
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" viewBox="0 0 24 24">
                <path d="M2 12h3m14 0h3M12 2v3m0 14v3" />
                <circle cx="12" cy="12" r="7" />
                <circle cx="12" cy="12" r="3" />
              </svg>`,
        classes: 'ml-auto h-14 w-14 bg-white rounded-md border border-black',
        id: 'ubicando',
        title: "Encuentra tu ubicación",
        style: {
            cursor: 'pointer',
        },
        events: {
            click: function (data) {
                ttubicacion.remove();
                LoadOverlay(true);
                waitingSpinner.classList.toggle("invisible");
                map.findAccuratePosition({
                    maxWait: 10000, // defaults to 10000
                    desiredAccuracy: 25 // defaults to 20
                });
            },
        }
    })
    .addTo(map);

// botonUbicar.bindTooltip("my tooltip text").openTooltip();

function onAccuratePositionProgress(e) {
    console.log(e.accuracy);
    console.log(e.latlng);
}

function onAccuratePositionFound(e) {
    LoadOverlay(false);
    waitingSpinner.classList.toggle("invisible");
    console.log(e.accuracy);
    console.log(e.latlng);
    map.flyTo(e.latlng, 15);
    if (marker != undefined) {
        map.removeLayer(marker);
    };
    marker = L.marker(e.latlng, {
        icon: iconRed
    }).addTo(map);
    if (!cotizarEnable) {
        contratanos.classList.remove("opacity-50", "cursor-not-allowed");
        cotizarEnable = true;
    }
}

function onAccuratePositionError(e) {
    waitingSpinner.classList.toggle("invisible");
    // alert(e.message);
    LoadOverlay(false);
    // Crea el Toast fuera de rango
    var idToast = 'accesoUbicacion';
    var iconToast = `
        <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path
            d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
        </svg>`;
    var colorToast = 'warning';
    var tituloToast = 'UBICACION';
    var textoToast = `No pudimos acceder a tu ubicación... Intentalo manualmente o comunicate con nosotros.`;
    createToast(idToast, iconToast, colorToast, tituloToast, textoToast);
    WappMensaje ("No se encontro la ubicación");
    cancelaccesoUbicacion.onclick = function (event) {
        accesoUbicacion.remove();
    }
}

function onMapClick(e) {
    if (marker != undefined) {
        map.removeLayer(marker);
    };
    marker = L.marker(e.latlng, {
        icon: iconRed
    }).addTo(map);
    if (!cotizarEnable) {
        contratanos.classList.remove("opacity-50", "cursor-not-allowed");
        cotizarEnable = true;
    }
    ttubicacion.classList.remove("animate-bounce-bottom")
}

map.on('accuratepositionprogress', onAccuratePositionProgress);
map.on('accuratepositionfound',
    onAccuratePositionFound);
map.on('accuratepositionerror', onAccuratePositionError);
map.on('click',
    onMapClick);

// Cambia el icono del globito
var iconRed = L.icon({
    iconUrl: './img/leaflet/marker-red.svg',
    iconRetinaUrl: './img/leaflet/marker-red.svg',
    iconSize: [26, 42],
    iconAnchor: [13, 42],
    popupAnchor: [-3, -76],
    shadowUrl: './img/leaflet/marker-shadow.png',
    shadowRetinaUrl: './img/leaflet/marker-shadow.png',
    shadowSize: [68, 50],
    shadowAnchor: [22, 49]
});


// Agrega boton de CONTRATANOS que haga fetch al servidor de mapas y encontrar rutas y tiempos
var distancia, tiempo;
var pathColor = ['red', 'blue', 'green'];
L.control.custom({
    position: 'bottomcenter',
    content: `<div>
                    <button id="contratanos" class="bg-secondary hover:bg-red-700 focus:ring-4 focus:ring-red-300 text-base text-white font-medium py-2.5 px-6 opacity-50 rounded-lg cursor-not-allowed">
                    CONTRATANOS
                    </button>
                  </div>`,
    classes: 'pb-8',
    events: {
        click: async function () {
            if (inscrito(marker, scz) === true) {
                LoadOverlay(true);
                waitingSpinner.classList.toggle("invisible");
                console.log("---------------------");
                // const url = 'http://router.project-osrm.org/route/v1';
                const url = 'http://127.0.0.1:5000/route/v1';
                const profile = '/driving/';
                const saguapac = '-63.12672898420913,-17.74620847104891';
                const garaje = '-63.124512434005744,-17.785958137470452';
                let distancia, tiempo;
                // https://stackoverflow.com/questions/56153172/fetch-data-from-multiple-apis-with-async-await
                try {
                    let [garajeData, saguapacData] = await Promise.all([
                        fetch(url + profile + garaje + ";" + marker._latlng.lng + "," + marker._latlng.lat +
                            "?steps=true&geometries=geojson")
                        .then(response => response.json())
                        .then(function (e) {
                            result = json(e);
                            return result;
                        }),
                        fetch(url + profile + saguapac + ";" + marker._latlng.lng + "," + marker._latlng.lat +
                            "?steps=true&geometries=geojson")
                        .then(response => response.json())
                        .then(function (e) {
                            result = json(e);
                            return result;
                        })
                    ]);
                    console.log("%cGaraje: " + garajeData[0] + " km ;" + garajeData[1] + " min", "color:" + pathColor[
                        1]);
                    console.log("%cSaguapac: " + saguapacData[0] + " km ;" + saguapacData[1] + " min", "color:" +
                        pathColor[0]);
                    if (garajeData[0] < saguapacData[0]) {
                        distancia = garajeData[0];
                        tiempo = garajeData[1];
                    } else {
                        distancia = saguapacData[0];
                        tiempo = saguapacData[1];
                    }
                    console.log("%cdistancia: " + distancia, "color:purple");
                    console.log("%ctiempo: " + tiempo, "color:purple");
                    cotiza(distancia, tiempo); //Llama a la función para cotizar
                } catch (err) {
                    LoadOverlay(false);

                    waitingSpinner.classList.toggle("invisible");
                    // Crea el Toast de error
                    var idToast = 'errorFetch';
                    var iconToast = `
                        <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40">
                            <path
                            d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                        </svg>`;
                    var colorToast = `error`;
                    var tituloToast = 'SERVIDOR';
                    var textoToast = `Algo sucedió... Comunicate con nosotros para cotizarte!`;
                    createToast(idToast, iconToast, colorToast, tituloToast, textoToast);
                    WappMensaje ("No pude cotizar el servicio");
                    cancelerrorFetch.onclick = function (event) {
                        errorFetch.remove();
                    }
                }
            } else {
                console.log("----------OO---------");
                // Crea el Toast fuera de rango
                var idToast = 'fueraRango';
                var iconToast = `
                        <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <path
                            d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
                        </svg>`;
                var colorToast = 'warning';
                var tituloToast = 'FUERA DE RANGO';
                var textoToast = `Comunicate con nosotros para cotizar el servicio!`;
                createToast(idToast, iconToast, colorToast, tituloToast, textoToast, 'center');
                WappMensaje ("Mi ubicación fuera de rango");
                cancelfueraRango.onclick = function (event) {
                    fueraRango.remove();
                }
            }
            iPathColor = 0;
        },
    }
}).addTo(map);

var iPathColor = 0;
// Funcion desprendida de arriba con la API obtiene datos y graficar ruta
function json(e) {
    var array = [];
    var result;
    distancia = parseFloat((e.routes[0].distance / 1000).toFixed(2)); //kilometros
    tiempo = parseInt(Math.round(e.routes[0].duration % 3600 / 60)); //minutos
    var pasos = e.routes[0].legs[0].steps;
    pasos.forEach(e => {
        for (let index = 1; index < e.geometry.coordinates.length; index++) {
            array.push(e.geometry.coordinates[index]);
        }
    });
    // Da la vuelta entre latitud y longitud
    for (var i = 0; i < array.length; i++) {
        array[i].reverse();
    }
    // Dibuja la ruta
    var polyline = L.polyline(array, {
        color: pathColor[iPathColor]
    }).addTo(map);
    iPathColor++;
    result = [distancia, tiempo];
    return result;
}

// Se desprende del boton y cotiza
var precio;

function cotiza(dist, time) {
    // evaluar el precio y saca por consola
    var ajusteBarrio = 1;
    costoDist = (dist * 11 + 260).toFixed(2);
    console.log("%cCosto por distancia: " + costoDist, "color: brown");
    costoTime = (time * 12.5 + 212.50).toFixed(2);
    console.log("%cCosto por tiempo: " + costoTime, "color: brown");
    costo = costoDist > costoTime ? costoDist : costoTime
    console.log("%cPrecio: " + costo, "color: red");
    costo = Math.floor(costo / 10) * 10;
    console.log("%cPrecio redondeo: " + costo, "color: red");

    if (inscrito(marker, satNorte) === true) {
        ajusteBarrio = 0.8;
    }
    if (inscrito(marker, intNorte) === true) {
        ajusteBarrio = 0.8;
    }
    if (inscrito(marker, laguardia) === true) {
        ajusteBarrio = 0.9;
    }
    if (inscrito(marker, urubo) === true) {
        ajusteBarrio = 1.05;
    }
    if (inscrito(marker, warnes) === true) {
        ajusteBarrio = 0.83;
    }
    costo = costo * ajusteBarrio;
    console.log("%cPrecio barrio: " + costo + " Factor: " + ajusteBarrio, "color:green");
    precio = Math.floor(costo / 10) * 10;
    if (costo < 300) {
        precio = 300;
        console.log("%cTarifa minima: " + costo, "color:green");
    } else {
        console.log("%cTarifa: " + costo, "color:green");
    }
    // Activa el Modal
    // LoadOverlay(true);
    precioText.textContent = "Bs." + precio;
    waitingSpinner.classList.toggle("invisible");
    modal.classList.toggle("invisible");
}

// Agregar poligonos
var polyUrubo = L.polygon(urubo, {
    color: 'red'
});
var polyLaguardia = L.polygon(laguardia, {
    color: 'yellow'
});
var polySatNorte = L.polygon(satNorte, {
    color: 'red'
});
var polyIntNorte = L.polygon(intNorte, {
    color: 'yellow'
});
var polyWarnes = L.polygon(warnes, {
    color: 'blue'
});

var areasDiferenciadas = L.layerGroup([polyUrubo, polyLaguardia, polySatNorte, polyIntNorte, polyWarnes]);
areasDiferenciadas.addTo(map);

var polyScz = L.polygon(scz, {
    color: 'gray'
}).addTo(map);


// Verificar si el punto se encuentra dentro un poligono
function inscrito(marker, polygon) {
    var x = marker._latlng.lat,
        y = marker._latlng.lng;
    var inside = false;
    for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        var xi = polygon[i][0],
            yi = polygon[i][1];
        var xj = polygon[j][0],
            yj = polygon[j][1];
        var intersect = ((yi > y) != (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) {
            inside = !inside;
        }
    }
    return inside;
};


// Modal
xModal.onclick = function (event) {
    LoadOverlay(false);
    modal.classList.toggle("invisible");

};
confirmarModal.onclick = function (event) {
    LoadOverlay(false);
    modal.classList.toggle("invisible");
    console.log(precio);
};

// Coloca pantalla gris y deshabilita funciones 
function LoadOverlay(status) {
    waiting.classList.toggle("invisible");
    status ? map.off('click', onMapClick) : map.on('click', onMapClick)
}

// Toast de Titulo
let toast = document.getElementById("toastTitulo");

toast.addEventListener("mouseover", function (event) {
    event.target.style.color = "green";
    map.off('click', onMapClick);
}, false);

toast.addEventListener("mouseout", function (event) {
    map.on('click', onMapClick);
}, false);

toastTituloButton.onclick = function (event) {
    toastTitulo.classList.toggle("invisible");
    setTimeout(function () {
        map.on('click', onMapClick);
    }, 500);
}

// Crear toast con diferentes variabes para los mensajes
function createToast(id, icon, color, titulo, texto, posicion) {
    var initizeTailwind = `text-error text-warning bg-error bg-warning`;
    if (posicion === 'top') {
        posicion = 'absolute top-2 left-1/2 transform -translate-x-1/2';
    } else
    if (posicion === 'bottom') {
        posicion = 'absolute bottom-24 left-1/2 transform -translate-x-1/2';
    } else {
        posicion = 'absolute centrearXY';    
    }
    var div = document.createElement('div');
    div.id = id;
    div.setAttribute('class', posicion + ' ' + 'z-[600] flex justify-between w-full max-w-sm mx-auto bg-white rounded-lg shadow-md opacity-90');
    div.innerHTML = `
            <div class="flex items-center justify-center w-12 bg-${color}">
            ${icon}  
            </div>
            <div class="px-4 py-2 mr-auto">
                <div class="mx-3">
                <span class="font-semibold text-${color}">${titulo}</span>
                <p class="text-sm ">${texto}</p>
                </div>
            </div>
            <button id="cancel${id}" type="button" class="flex items-center justify-center w-12 cursor-pointer">
                <svg class="w-4 h-4 mr-2 fill-current" viewBox="0 0 512 512">
                    <path fill="currentColor"
                    d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z">
                    </path>
                </svg>
            </button>`;
    document.body.appendChild(div);
}

// Mensaje en el whatsapp
function WappMensaje (mensaje) {
    wapp.classList.remove("invisible");
    wapp.classList.add("animate-wapp");
    link = "https://wa.me/";
    link += celular;
    link += '?text=';
    mensaje = mensaje.replace(/ /g,"%20");
    link += mensaje
    wapp.querySelector("a").href = link;
}
// setTimeout(function () {
//     console.log("globo whatsapp");
// }, 1500);