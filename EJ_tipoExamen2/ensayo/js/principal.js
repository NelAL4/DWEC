// Nombre y apellidos: (tu nombre aquí)
//
// ============================================================
// GUÍA RÁPIDA DE LECTURA
// ============================================================
// - Cada función lleva arriba: QUÉ HACE, QUÉ RECIBE y QUÉ DEVUELVE.
// - Los comentarios "SINTAXIS" explican las herramientas nuevas la primera
//   vez que aparecen (no se repiten después).
// - Idea central de todo el examen:
//     1. El ARRAY `tareas` es la fuente de verdad (los datos).
//     2. Las funciones de datos (apartado 2) solo calculan, no tocan la página.
//     3. Las funciones de pintar (apartado 3) dibujan a partir de los datos.
//     4. Cada evento (apartado 4) MODIFICA el array y luego llama a repintar().

// SINTAXIS · import { nombre } from './archivo.js'
//   Trae algo que otro archivo exporta con `export`. Las llaves llevan el nombre
//   exacto exportado. La ruta empieza por ./ si está en la misma carpeta.
//   Solo funciona si el <script> del HTML lleva type="module" y la página se
//   abre con un servidor (Live Server), no con doble clic (file://).
import { tareasIniciales } from './datos.js';

// ============================================================
// Constantes y elementos de la página (ya definidos: no los cambies)
// ============================================================

// Orden de las columnas. Sirve para saber cuál es la "siguiente" o la
// "anterior" con indexOf y sumando/restando posiciones.
const ESTADOS = ['porhacer', 'encurso', 'hecha'];
const LIMITE_HORAS = 40;

// document.querySelector('#id') devuelve UN elemento del DOM (o null si no
// existe). '#' = id, '.' = clase, sin símbolo = etiqueta.
const formularioTarea = document.querySelector('#formulario-tarea');

// formulario.elements = colección de los controles del formulario (input,
// select, textarea, button). Se accede por su atributo name o id:
// formulario.elements.horas  →  <input name="horas" id="horas">
const campoHoras = formularioTarea.elements.horas;

const mensajeFormulario = document.querySelector('#mensaje-formulario');
const buscador = document.querySelector('#buscador');
const botonArchivar = document.querySelector('#boton-archivar');
const tablero = document.querySelector('#tablero');
const listaHoras = document.querySelector('#horas-asignatura');
const progreso = document.querySelector('#progreso');

// Objetos que asocian cada estado con su elemento: así se accede con
// columnas[estado] en lugar de repetir if/else para cada columna.
const columnas = {
  porhacer: document.querySelector('#col-porhacer'),
  encurso: document.querySelector('#col-encurso'),
  hecha: document.querySelector('#col-hecha')
};

const contadores = {
  porhacer: document.querySelector('#num-porhacer'),
  encurso: document.querySelector('#num-encurso'),
  hecha: document.querySelector('#num-hecha')
};

// Desactiva los mensajes y bloqueos de validación del propio navegador.
// Con esto, el evento submit se dispara aunque haya errores, y los mensajes
// los escribimos nosotros. (Se pone desde JS, no en el HTML.)
formularioTarea.noValidate = true;

// `let` porque archivarHechas() reasigna el array entero.
// .map(t => ({ ...t })) crea un array NUEVO con una COPIA de cada objeto:
//   - map devuelve un array nuevo del mismo tamaño.
//   - ({ ... }) con paréntesis: así la flecha devuelve un objeto, no un bloque.
//   - { ...t } (spread) copia las propiedades de t en un objeto nuevo.
// Así `tareasIniciales` nunca se modifica (lo exige el enunciado).
let tareas = tareasIniciales.map((tarea) => ({ ...tarea }));

// Repinta todo a partir del array de tareas.
// Aplica el filtro del buscador al tablero, pero el resumen se calcula
// siempre con TODAS las tareas.
const repintar = () => {
  pintarTablero(buscarTareas(tareas, buscador.value));
  pintarResumen(tareas);
};


// ============================================================
// APARTADO 1 · Formulario y validación
// ============================================================

// ------------------------------------------------------------
// 1.1 · mensajeDeError(campo)
// Recibe: un campo del formulario (input o select).
// Devuelve: string con el primer error, o '' si el campo es válido.
//
// SINTAXIS · campo.validity
//   Objeto con booleanos que dicen QUÉ falla (los calcula el navegador a
//   partir de los atributos HTML required, minlength, min, max...):
//     valueMissing   → required y está vacío
//     tooShort       → menos caracteres que minlength (solo si el usuario
//                      ha escrito el valor él mismo)
//     rangeUnderflow → número menor que min
//     rangeOverflow  → número mayor que max
//     customError    → error puesto con setCustomValidity()
//     typeMismatch, patternMismatch, tooLong, badInput... (otros)
//   El ORDEN de los if define la prioridad: devuelve el primero que se cumpla.
// ------------------------------------------------------------
const mensajeDeError = (campo) => {
  if (campo.validity.valueMissing) {
    return 'Este campo es obligatorio';
  }

  if (campo.validity.tooShort) {
    // campo.minLength = valor del atributo minlength (número)
    return `Escribe al menos ${campo.minLength} caracteres`;
  }

  if (
    campo.validity.rangeUnderflow ||
    campo.validity.rangeOverflow
  ) {
    // campo.min y campo.max = valores de los atributos min y max (strings)
    return `Debe estar entre ${campo.min} y ${campo.max}`;
  }

  if (campo.validity.customError) {
    // validationMessage = el texto que pasaste a setCustomValidity()
    return campo.validationMessage;
  }

  return '';
};

// ------------------------------------------------------------
// 1.2 · validarCampo(campo)
// Recibe: un campo. Devuelve: true si es válido, false si no.
// Efectos: escribe el mensaje en el <small class="error"> y marca el campo.
// ------------------------------------------------------------
const validarCampo = (campo) => {
  const mensaje = mensajeDeError(campo);

  // nextElementSibling = el siguiente HERMANO que sea elemento (ignora texto
  // y saltos de línea). En el HTML, el <small> va justo después del campo.
  const elementoError = campo.nextElementSibling;

  // textContent = texto del elemento. Se lee y se escribe con la misma
  // propiedad. Aquí asignar '' borra el mensaje anterior.
  elementoError.textContent = mensaje;

  // classList.toggle('clase', condición):
  //   condición true  → añade la clase
  //   condición false → la quita
  //   (sin segundo argumento alterna: si estaba la quita, si no la pone)
  campo.classList.toggle('invalido', mensaje !== '');

  return mensaje === '';
};

// ------------------------------------------------------------
// 1.3 · comprobarHoras()
// No recibe nada ni devuelve nada: pone o quita el error PERSONALIZADO de
// #horas según el límite de horas pendientes.
//
// SINTAXIS · campo.setCustomValidity('texto')
//   Con texto NO vacío: el campo pasa a ser inválido (validity.customError
//   = true) con ese mensaje. Con '' (vacío): quita el error personalizado.
//   OJO: el error se QUEDA hasta que lo quitas con ''. Por eso hay un else.
// ------------------------------------------------------------
const comprobarHoras = () => {
  // Horas pendientes = tareas que NO están hechas, sumando sus horas.
  //   filter(cond)       → array nuevo solo con las que cumplen.
  //   reduce(fn, inicial)→ reduce el array a un único valor. fn recibe
  //                        (acumulador, elemento) y devuelve el nuevo
  //                        acumulador. El 0 final es el valor inicial
  //                        (¡va FUERA de la función, como 2.º argumento!).
  const horasPendientes = tareas
    .filter((tarea) => tarea.estado !== 'hecha')
    .reduce((total, tarea) => total + tarea.horas, 0);

  // .value de un input es SIEMPRE un string. Si está vacío cuenta como 0;
  // si no, se convierte a número con Number(...).
  const horasNuevas =
    campoHoras.value === '' ? 0 : Number(campoHoras.value);

  // `>` estricto: llegar justo a 40 es válido, pasarse no.
  if (horasPendientes + horasNuevas > LIMITE_HORAS) {
    campoHoras.setCustomValidity(
      `Superas el límite de ${LIMITE_HORAS} h pendientes ` +
      `(ahora hay ${horasPendientes} h)`
    );
  } else {
    campoHoras.setCustomValidity('');
  }
};

// ------------------------------------------------------------
// 1.4 · limpiarFormulario()
// Deja el formulario como recién cargado.
//
// SINTAXIS · formulario.reset()
//   Restaura los valores iniciales de los campos (lo que pone value="" o
//   selected en el HTML). NO borra mensajes ni clases ni errores
//   personalizados: eso hay que hacerlo a mano.
// ------------------------------------------------------------
const limpiarFormulario = () => {
  formularioTarea.reset();

  const campos = formularioTarea.elements;

  // for...of recorre una colección elemento a elemento. Vale con arrays,
  // NodeList y colecciones de elementos de formulario.
  for (const campo of campos) {
    // `instanceof` pregunta "¿es de este tipo?". Así nos saltamos el botón
    // de enviar y los fieldset, que no tienen validación.
    if (
      campo instanceof HTMLInputElement ||
      campo instanceof HTMLSelectElement ||
      campo instanceof HTMLTextAreaElement
    ) {
      campo.classList.remove('invalido');   // quita la clase
      campo.setCustomValidity('');           // quita error personalizado

      const elementoError = campo.nextElementSibling;

      // ?. (encadenamiento opcional): si elementoError fuera null/undefined,
      // devuelve undefined en vez de lanzar TypeError.
      // classList.contains('x') → true/false.
      if (elementoError?.classList.contains('error')) {
        elementoError.textContent = '';
      }
    }
  }

  campoHoras.setCustomValidity('');
  mensajeFormulario.textContent = '';
};

// ------------------------------------------------------------
// 1.5 · Eventos del formulario (DELEGACIÓN)
//
// SINTAXIS · elemento.addEventListener('evento', función)
//   - 'evento' va en string y SIN "on": 'click', 'change', 'input', 'submit',
//     'keydown'...
//   - La función se ejecuta cuando ocurre y recibe el objeto del evento.
//   - NO pongas paréntesis a una función con nombre (se ejecutaría ya).
//
// DELEGACIÓN: un solo listener en el contenedor (el formulario) que sirve a
// todos sus campos, gracias a que estos eventos "burbujean" hacia arriba.
// evento.target = el elemento concreto donde ocurrió el evento.
//
//   change  → se dispara al CONFIRMAR un valor (salir del campo, elegir en
//             un select). input → se dispara con CADA cambio mientras se
//             escribe.
// ------------------------------------------------------------
formularioTarea.addEventListener('change', (evento) => {
  const campo = evento.target;

  comprobarHoras();
  validarCampo(campo);
});

formularioTarea.addEventListener('input', (evento) => {
  const campo = evento.target;

  // Solo revalida si el campo YA estaba marcado como inválido: así el error
  // desaparece al corregir, pero no avisa mientras se escribe por 1.ª vez.
  if (campo.classList.contains('invalido')) {
    comprobarHoras();
    validarCampo(campo);
  }
});

// keydown → se dispara al pulsar una tecla. evento.key = nombre de la tecla
// ('Escape', 'Enter', 'a', 'ArrowUp'...). Respeta mayúsculas en el nombre.
formularioTarea.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') {
    limpiarFormulario();
  }
});


// ============================================================
// APARTADO 2 · Cálculos con los datos (funciones "puras")
// ============================================================
// Reciben datos por parámetro, devuelven un resultado NUEVO y no tocan ni la
// página ni la variable `tareas`. Por eso se pueden probar con console.log.

// ------------------------------------------------------------
// 2.1 · buscarTareas(lista, texto)
// Recibe: array de tareas y un string. Devuelve: array nuevo con las tareas
// cuyo título o asignatura CONTIENEN el texto (sin mayúsculas ni espacios
// de los extremos). Con texto vacío devuelve copia de todas.
//
// SINTAXIS de los métodos de string (devuelven un string nuevo, no
// modifican el original):
//   texto.trim()        → quita espacios al principio y al final
//   texto.toLowerCase() → pasa a minúsculas
//   texto.includes(x)   → true si contiene el fragmento x (distingue
//                         mayúsculas, por eso se pasa todo a minúsculas)
// ------------------------------------------------------------
const buscarTareas = (lista, texto) => {
  const textoNormalizado = texto.trim().toLowerCase();

  if (textoNormalizado === '') {
    // [...lista] = copia del array (spread). Así quien lo reciba no puede
    // alterar el original sin querer.
    return [...lista];
  }

  // filter(cond): conserva los elementos para los que la función devuelve
  // true. Siempre devuelve un array (vacío si ninguno cumple).
  return lista.filter((tarea) => {
    const titulo = tarea.titulo.toLowerCase();
    const asignatura = tarea.asignatura.toLowerCase();

    return (
      titulo.includes(textoNormalizado) ||
      asignatura.includes(textoNormalizado)
    );
  });
};

// ------------------------------------------------------------
// 2.2 · agruparPorEstado(lista)
// Devuelve: { porhacer: [...], encurso: [...], hecha: [...] } con SIEMPRE las
// tres claves, aunque estén vacías, y conservando el orden de la lista.
//
// Se crea el objeto con los tres arrays vacíos desde el principio: así no
// hay que comprobar si la clave existe antes de hacer push.
// ------------------------------------------------------------
const agruparPorEstado = (lista) => {
  const grupos = {
    porhacer: [],
    encurso: [],
    hecha: []
  };
  

  // forEach recorre sin devolver nada (úsalo cuando haces algo por cada
  // elemento, no cuando quieres un array resultante).
  lista.forEach((tarea) => {
    // grupos[tarea.estado]: los CORCHETES permiten usar el valor de una
    // variable como nombre de la clave ('porhacer', 'encurso'...).
    // El if protege contra estados desconocidos.
    if (grupos[tarea.estado]) {
      // push(x) añade al FINAL del array (muta el array y devuelve la
      // nueva longitud).
      grupos[tarea.estado].push(tarea);
    }
  });

  return grupos;
};

// ------------------------------------------------------------
// 2.3 · horasPorAsignatura(lista)
// Devuelve: [{ asignatura, horas }, ...] ordenado de más a menos horas y, a
// igualdad, alfabético. Con lista vacía devuelve [].
// ------------------------------------------------------------
const horasPorAsignatura = (lista) => {
  // 1) Acumular en un objeto { DWEC: 9, DWES: 9, ... }
  const acumuladas = {};

  lista.forEach((tarea) => {
    // Leer lo que ya había (o 0 si es la primera vez) y SUMAR.
    // `??` solo sustituye cuando lo de la izquierda es undefined o null.
    // Primero se calcula el lado derecho del `=` y luego se asigna: por eso
    // hace falta el `?? 0` en la lectura.
    acumuladas[tarea.asignatura] =
      (acumuladas[tarea.asignatura] ?? 0) + tarea.horas;
  });

  // 2) Pasar el objeto a array de objetos y ordenar.
  //   Object.entries(obj) → array de pares [clave, valor]:
  //       [['DWEC', 9], ['DWES', 9], ...]
  //   ([asignatura, horas]) → desestructuración: separa cada par en dos
  //       variables directamente en el parámetro.
  return Object.entries(acumuladas)
    .map(([asignatura, horas]) => ({
      asignatura,   // forma corta de asignatura: asignatura
      horas
    }))
    // sort(fn(a, b)): ORDENA el array (¡muta el original!). La función debe
    // devolver: negativo → a va antes; positivo → a va después; 0 → igual.
    //   Números descendente: b - a. Ascendente: a - b.
    //   Strings: a.localeCompare(b) (respeta tildes y la ñ).
    // Aquí es una copia recién creada por map, así que no importa que mute.
    .sort((a, b) => {
      if (b.horas !== a.horas) {
        return b.horas - a.horas;
      }

      return a.asignatura.localeCompare(b.asignatura);
    });
};


// ============================================================
// APARTADO 3 · Pintar la página (sin innerHTML)
// ============================================================

// ------------------------------------------------------------
// 3.1 · crearTarjeta(tarea)
// Recibe: un objeto tarea. Devuelve: el <li> de la tarjeta, SIN insertar.
//
// SINTAXIS · document.createElement('etiqueta')
//   Crea un elemento en memoria (vacío, sin estar en la página). Se
//   configura (clases, texto, atributos) y después se inserta con append.
//   Un mismo elemento solo puede estar en UN sitio: si lo insertas en otro,
//   se MUEVE. Por eso se crea uno nuevo por cada tarjeta.
// ------------------------------------------------------------
const crearTarjeta = (tarea) => {
  const tarjeta = document.createElement('li');

  // classList.add('a', 'b') añade varias clases a la vez.
  tarjeta.classList.add('tarjeta', `prioridad-${tarea.prioridad}`);

  // dataset.nombre ↔ atributo data-nombre. Aquí: data-id="2".
  // Se guarda siempre como TEXTO (al leerlo, hay que usar Number()).
  tarjeta.dataset.id = tarea.id;

  const titulo = document.createElement('strong');
  titulo.classList.add('titulo');
  titulo.textContent = tarea.titulo;   // textContent: seguro, no interpreta HTML

  const meta = document.createElement('span');
  meta.classList.add('meta');
  meta.textContent = `${tarea.asignatura} · ${tarea.horas} h`;

  const botonRetroceder = document.createElement('button');
  botonRetroceder.type = 'button';               // evita que envíe formularios
  botonRetroceder.dataset.accion = 'retroceder'; // data-accion="retroceder"
  botonRetroceder.textContent = '←';

  const botonAvanzar = document.createElement('button');
  botonAvanzar.type = 'button';
  botonAvanzar.dataset.accion = 'avanzar';
  botonAvanzar.textContent = '→';

  // indexOf(valor) → posición (0, 1, 2) o -1 si no está.
  const posicion = ESTADOS.indexOf(tarea.estado);

  // `disabled` es una propiedad booleana del botón.
  botonRetroceder.disabled = posicion === 0;                    // 1.ª columna
  botonAvanzar.disabled = posicion === ESTADOS.length - 1;      // última

  // append(a, b, c...) mete todos los hijos AL FINAL, en ese orden.
  // (appendChild solo admite uno; prepend los pone al principio.)
  tarjeta.append(
    titulo,
    meta,
    botonRetroceder,
    botonAvanzar
  );

  return tarjeta;
};

// ------------------------------------------------------------
// 3.2 · pintarTablero(lista)
// Vacía las 3 columnas y coloca las tarjetas por estado; actualiza contadores.
//
// SINTAXIS · elemento.replaceChildren()
//   Sin argumentos: elimina TODOS los hijos. Con argumentos, los
//   reemplaza por esos nodos. Es la forma moderna de "vaciar" un elemento
//   (alternativa a innerHTML = '').
// ------------------------------------------------------------
/*
const agruparPorEstado = (lista) => {
  const grupos = {
    porhacer: [],
    encurso: [],
    hecha: []
  };
  const ESTADOS = ['porhacer', 'encurso', 'hecha'];
*/
const pintarTablero = (lista) => {
  const grupos = agruparPorEstado(lista);

  ESTADOS.forEach((estado) => {
    columnas[estado].replaceChildren();

    grupos[estado].forEach((tarea) => {
      columnas[estado].append(crearTarjeta(tarea));
    });

    // Un número asignado a textContent se convierte solo a texto.
    contadores[estado].textContent = grupos[estado].length;
  });
};

// ------------------------------------------------------------
// 3.3 · pintarResumen(lista)
// Pinta una <li> por asignatura y el texto de progreso.
// ------------------------------------------------------------
const pintarResumen = (lista) => {
  listaHoras.replaceChildren();

  // ({ asignatura, horas }) → desestructura el objeto del parámetro.
  horasPorAsignatura(lista).forEach(({ asignatura, horas }) => {
    const elemento = document.createElement('li');
    elemento.textContent = `${asignatura} — ${horas} h`;   // guion LARGO
    listaHoras.append(elemento);
  });

  const total = lista.length;
  const hechas = lista.filter(
    (tarea) => tarea.estado === 'hecha'
  ).length;

  // Condicional ternario: condición ? valorSiTrue : valorSiFalse.
  // Evita dividir entre 0 con lista vacía (daría NaN).
  // Math.round(x) redondea al entero más cercano.
  const porcentaje =
    total === 0 ? 0 : Math.round((hechas / total) * 100);

  progreso.textContent =
    `Hechas: ${hechas} de ${total} (${porcentaje} %)`;
};


// ============================================================
// APARTADO 4 · Interacción
// ============================================================
// Regla: primero se MODIFICA el array `tareas`, después se llama a repintar().

// ------------------------------------------------------------
// 4.1 · moverTarea(id, paso)
// Recibe: id (número) y paso (+1 o -1). No devuelve nada.
//
// SINTAXIS · array.find(cond) → el PRIMER elemento que cumple, o undefined.
// Devuelve la referencia al objeto real del array, así que modificar
// `tarea.estado` cambia el dato dentro de `tareas`.
// ------------------------------------------------------------
const moverTarea = (id, paso) => {
  const tarea = tareas.find((elemento) => elemento.id === id);

  // `!tarea` es true si es undefined (no existe) → salimos sin hacer nada.
  if (!tarea) {
    return;
  }

  const posicionActual = ESTADOS.indexOf(tarea.estado);
  const posicionNueva = posicionActual + paso;

  // Fuera de rango → no hacer nada.
  if (
    posicionNueva < 0 ||
    posicionNueva >= ESTADOS.length
  ) {
    return;
  }

  tarea.estado = ESTADOS[posicionNueva];
};

// ------------------------------------------------------------
// 4.2 · anadirTarea(datos)
// Recibe: { titulo, asignatura, horas, prioridad }. Devuelve: la tarea creada.
//
// Math.max(a, b) → el mayor de dos números. Con reduce y valor inicial 0
// sirve para obtener el mayor id (y da 0 si no hay tareas → id nuevo = 1).
// ------------------------------------------------------------
const anadirTarea = (datos) => {
  const mayorId = tareas.reduce(
    (maximo, tarea) => Math.max(maximo, tarea.id),
    0
  );

  const nuevaTarea = {
    id: mayorId + 1,
    titulo: datos.titulo,
    asignatura: datos.asignatura,
    horas: datos.horas,
    estado: 'porhacer',
    prioridad: datos.prioridad
  };

  tareas.push(nuevaTarea);

  return nuevaTarea;
};

// ------------------------------------------------------------
// 4.3 · archivarHechas()
// Elimina las hechas y devuelve cuántas eran (0 si ninguna).
// Se reasigna `tareas` con filter (por eso se declaró con let).
// ------------------------------------------------------------
const archivarHechas = () => {
  const cantidadHechas = tareas.filter(
    (tarea) => tarea.estado === 'hecha'
  ).length;

  if (cantidadHechas > 0) {
    tareas = tareas.filter(
      (tarea) => tarea.estado !== 'hecha'
    );
  }

  return cantidadHechas;
};

// ------------------------------------------------------------
// 4.4 · Eventos del tablero, buscador y botón de archivar
//
// DELEGACIÓN en el tablero: las tarjetas se crean y destruyen continuamente,
// así que no se pone un listener en cada botón; se pone UNO en #tablero.
//
// SINTAXIS · elemento.closest('selector')
//   Sube desde el elemento (incluido él mismo) por sus antepasados hasta
//   encontrar el primero que cumple el selector; devuelve null si no hay.
//   Útil porque evento.target puede ser un hijo del botón.
//   'button[data-accion]' = un <button> que tenga el atributo data-accion.
// ------------------------------------------------------------
tablero.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-accion]');

  // Si el clic no fue en un botón de acción, no hacer nada.
  if (!boton || !tablero.contains(boton)) {
    return;
  }

  const tarjeta = boton.closest('.tarjeta');

  // dataset devuelve TEXTO → Number() para comparar con el id numérico.
  const id = Number(tarjeta.dataset.id);
  const paso = boton.dataset.accion === 'avanzar' ? 1 : -1;

  moverTarea(id, paso);
  repintar();
});

// Evento 'input' del buscador: se dispara con cada letra escrita.
buscador.addEventListener('input', () => {
  repintar();
});

botonArchivar.addEventListener('click', () => {
  archivarHechas();
  repintar();
});

// ------------------------------------------------------------
// 4.5 · Envío del formulario
//
// evento.preventDefault() → ¡con paréntesis! Cancela la acción por defecto
// (en un formulario: enviar y recargar la página).
// ------------------------------------------------------------
formularioTarea.addEventListener('submit', (evento) => {
  evento.preventDefault();

  // Orden importante: primero la regla de horas (para que el error
  // personalizado esté puesto) y luego validar todos los campos.
  comprobarHoras();

  const campos = [
    formularioTarea.elements.titulo,
    formularioTarea.elements.asignatura,
    formularioTarea.elements.horas,
    formularioTarea.elements.prioridad
  ];

  // Se validan TODOS (map ejecuta validarCampo en cada uno) para que se
  // muestren todos los errores a la vez. Si usaras `find` o `some` directamente,
  // se pararían en el primero y no marcarían los demás.
  const resultados = campos.map((campo) => validarCampo(campo));

  // find(fn(elemento, índice)): el 2.º parámetro es la posición, que
  // permite mirar el resultado de ese mismo campo en `resultados`.
  const primerCampoInvalido = campos.find(
    (campo, indice) => !resultados[indice]
  );

  if (primerCampoInvalido) {
    primerCampoInvalido.focus();   // pone el cursor/foco en ese campo
    return;                        // no se hace nada más
  }

  const titulo = formularioTarea.elements.titulo.value.trim();

  anadirTarea({
    titulo,
    asignatura: formularioTarea.elements.asignatura.value,
    horas: Number(formularioTarea.elements.horas.value),   // string → número
    prioridad: formularioTarea.elements.prioridad.value
  });

  // limpiarFormulario ANTES de escribir el mensaje, porque también lo borra.
  limpiarFormulario();
  repintar();

  mensajeFormulario.textContent = `Tarea añadida: ${titulo}`;
});

// Primer pintado al arrancar.
repintar();

// ============================================================
// PRUEBAS RÁPIDAS (descomenta para comprobar en la consola del navegador)
// ============================================================
// console.log(buscarTareas(tareasIniciales, ' dwes '));   // tareas 6 y 9
// console.log(agruparPorEstado(tareasIniciales));
// console.log(horasPorAsignatura(tareasIniciales));