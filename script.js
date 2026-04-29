const display = document.querySelector(".calculator-display");
const keypad = document.querySelector(".calculator-keypad");

//Definimos los botones como objetos con su etiqueta y tipo para facilitar su creación y manejo de eventos
const buttons = [
{ label: "7", type: "number" },
{ label: "8", type: "number" },
{ label: "9", type: "number" },
{ label: "/", type: "operator" },
{ label: "4", type: "number" },
{ label: "5", type: "number" },
{ label: "6", type: "number" },
{ label: "*", type: "operator" },
{ label: "1", type: "number" },
{ label: "2", type: "number" },
{ label: "3", type: "number" },
{ label: "-", type: "operator" },
{ label: "0", type: "number" },
{ label: "C", type: "clear" },
{ label: "=", type: "equals" },
{ label: "+", type: "operator" }
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
}