const display = document.querySelector(".calculator-display");
const keypad = document.querySelector(".calculator-keypad");
const historyDisplay = document.querySelector(".calculator-history");

//Definimos los botones como objetos con su etiqueta y tipo para facilitar su creación y manejo de eventos
const buttons = [
{ label: "C", type: "clear" },
  { label: "←", type: "backspace" },
  { label: "%", type: "percentage" }, 
  { label: "/", type: "operator" },
  { label: "7", type: "number" },
  { label: "8", type: "number" },
  { label: "9", type: "number" },
  { label: "*", type: "operator" },
  { label: "4", type: "number" },
  { label: "5", type: "number" },
  { label: "6", type: "number" },
  { label: "-", type: "operator" },
  { label: "1", type: "number" },
  { label: "2", type: "number" },
  { label: "3", type: "number" },
  { label: "+", type: "operator" },
  { label: "+/-", type: "sign" },     
  { label: "0", type: "number" },
  { label: ".", type: "decimal" },
  { label: "=", type: "equals" }
];

//Creamos los botones dinamicamente a partir del arreglo de objetos, asignando su etiqueta y clase para estilos
buttons.forEach(function(buttonConfig) {
  const button = document.createElement("button");
  button.textContent = buttonConfig.label;
  button.dataset.type = buttonConfig.type; //Asignamos el tipo como un atributo de datos para facilitar la identificación en el evento
  button.dataset.value = buttonConfig.label; //Asignamos el valor del botón para usarlo en la lógica de la calculadora
  button.classList.add("calculator-button");
  
  if (buttonConfig.type === "operator") {
    button.classList.add("operator-button"); //Agregamos una clase adicional para los botones de operador para estilos específicos
  }

  if(buttonConfig.type === "equals") {
    button.classList.add("equals-button"); //Agregamos una clase adicional para el botón de equals para estilos específicos
  }
  if (buttonConfig.type === "backspace" || buttonConfig.type === "clear") {
    button.classList.add("clear-button");
  }
  
  keypad.append(button); 
  
});

// Estado de la calculadora
const calculatorState = {
  currentValue: "0",
  previousValue: null,
  operator: null,
};

//Actualizar display
function renderDisplay() {
  display.textContent = calculatorState.currentValue;

}

// Escuchar eventos de click en los botones
keypad.addEventListener("click", function(event) {
  //even.target es el elemento específico que fue clickeado, y closest("button") busca el botón más cercano, si encuentra el boton lo guarda en la variable button
  const button = event.target.closest("button");
  if (!button) 
    return; //Si no se hizo click en un botón, salir
  
  const type = button.dataset.type;
  const value = button.dataset.value;
  
  if (type === "number") {
    handleNumber(value);
  }
  if (type === "operator") {
    handleOperator(value);
  }
  if (type === "clear") {
    handleClear();
  }
  if (type === "equals") {
    calculateResult();
  }
  if (type === "backspace") {
    handleBackspace();
  }
  if (type === "decimal") {
    handleDecimal();
  }
  if (type === "sign") {
    handleSign();
  }
  if (type === "percentage") {
    handlePercentage();
  }
  renderDisplay(); //Actualizar el display después de cada acción
});

//Arma los numeros en el display, si toco 1 y luego 5 arma el 15
function handleNumber(value) {
  if (calculatorState.currentValue === "0") {
    calculatorState.currentValue = value;
    return;
  } 
  calculatorState.currentValue += value;
}

// guardamos el numero actual, luego la operacion y reinicio la memoria para poder escribir el proximo numero
function handleOperator(operator) {
calculatorState.previousValue = calculatorState.currentValue;
calculatorState.operator = operator;
calculatorState.currentValue = "0";
}

// Borra todo el estado de la calculadora
function handleClear() {
calculatorState.currentValue = "0";
calculatorState.previousValue = null;
calculatorState.operator = null;
historyDisplay.textContent = "Sin operaciones"; // Limpiar el historial también
}
function handleBackspace() {
  if (calculatorState.currentValue === "0") {
    return; 
  }
  // Si el numero tiene mas de un digito, le cortamos el ultimo, sino lo reiniciamos a 0
  if (calculatorState.currentValue.length > 1) {
    // Le cortamos el último carácter
    calculatorState.currentValue = calculatorState.currentValue.slice(0, -1);
  } else {
    // Si tenía 1 solo dígito y lo borramos, volvemos a poner el "0" inicial
    calculatorState.currentValue = "0";
  }
}
// Agrega un punto decimal al número actual, solo si no tiene uno ya
function handleDecimal() {
  if (!calculatorState.currentValue.includes(".")) {
    
    // Si no tiene punto, se lo PEGAMOS al final.
    // Ejemplo: "15" + "." = "15."
    calculatorState.currentValue += ".";
    
  }
}
function handleSign() {
  if (calculatorState.currentValue !== "0") {
    // Multiplicamos por -1 para invertir el signo
    const valorInvertido = Number(calculatorState.currentValue) * -1;
    calculatorState.currentValue = String(valorInvertido);
  }
}

function handlePercentage() {
  if (calculatorState.currentValue !== "0") {
    // Dividimos por 100
    const valorPorcentaje = Number(calculatorState.currentValue) / 100;
    calculatorState.currentValue = String(valorPorcentaje);
  }
}

// Funcion para calcular el resultado de la operacion
function calculateResult() {
  if(calculatorState.previousValue === null || calculatorState.operator === null) {
    return; 
  }
  // Convertimos los valores a numeros para poder realizar las operaciones matematicas
  const previous = Number(calculatorState.previousValue);
  const current = Number(calculatorState.currentValue);
  
  // Buscamos que funcion usar en nuestro diccionario
  // Si operator es "+", esto nos devuelve la función sumar()
  const operacionElegida = operacionesMatematicas[calculatorState.operator];

  if (operacionElegida) {
    const result = operacionElegida(previous, current);
    const textoOperacion = `${previous} ${calculatorState.operator} ${current} = ${result}`;

    // Actualizamos el display de la historia
    historyDisplay.textContent = textoOperacion;

  // Actualizamos el estado de la calculadora con el resultado, y reiniciamos los valores anteriores y operador para permitir nuevas operaciones
  calculatorState.currentValue = String(result);
  calculatorState.previousValue = null;
  calculatorState.operator = null;
  
  }
}
// Diccionario que mapea cada operador a su función correspondiente
const operacionesMatematicas = {
  "+": sumar,
  "-": restar,
  "*": multiplicar,
  "/": dividir
};

function sumar(a, b) {
  return a + b;
}

function restar(a, b) {
  return a - b;
}

function multiplicar(a, b) {
  return a * b;
}

function dividir(a, b) {
  if (b === 0) {
    return "Error: Division por cero";
  }
  return a / b;
}
