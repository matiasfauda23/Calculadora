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

// Estado incial de la calcualdora
const calculatorState = {
  currentValue: "0",
  previousValue: null,
  operator: null,
};

//Actualizar display
function renderDisplay() {
  display.textContent = calculatorState.currentValue;
}