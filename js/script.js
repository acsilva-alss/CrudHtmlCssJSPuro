window.addEventListener('load', start);
var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
var globalInputName = null;
var globalIsEditing = false;
var globalCurrentIndex = null;

function start() {
  globalInputName = document.querySelector('#inputName');
  prevenFormSubmit();
  activateinput();
  render();
}

// Evitando que o form seja recarregado
function prevenFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}
// Ativando o foco no input de nome e dando push do nome digitado na lista
function activateinput() {
  function insertName(newName) {
    globalNames.push(newName);
  }
  function updateName(newName) {
    globalNames[globalCurrentIndex] = newName;
  }
  function handleTyping(event) {
    //Tornando algo verdadeirável ou falsiável
    var hasText = !!event.target.value && event.target.value.trim() !== '';
    if (!hasText) {
      clearInput();
      return;
    }
    if (event.key === 'Enter') {
      if (globalIsEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }

      render();
      globalIsEditing = false;
      clearInput();
    }
  }
  globalInputName.addEventListener('keyup', handleTyping);
  globalInputName.focus();
}

// Renderizando algo na tela
function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';

    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      globalInputName.value = name;
      globalInputName.focus();
      globalIsEditing = true;
      globalCurrentIndex = index;
    }
    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);
    return span;
  }
  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  var ul = document.createElement('ul');
  divNames.appendChild(ul);
  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);
    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
    clearInput();
  }
}

//Limpando input de texto
function clearInput() {
  globalInputName.value = '';
  globalInputName.focus();
}
