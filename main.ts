const btnAdd = document.getElementById("btn-add") as HTMLButtonElement;
const btnRemoveAll = document.getElementById(
  "btn-remove-all"
) as HTMLButtonElement;

const listBox = document.getElementById("list-box") as HTMLDivElement;
const list = document.getElementById("list") as HTMLUListElement;

const input = document.getElementById("element-text") as HTMLInputElement;

const error = document.getElementById("error-text") as HTMLSpanElement;

// Cargar elementos de la lista almacenados en localStorage al cargar la página
window.addEventListener("load", () => {
  const storedList = localStorage.getItem("tasks");
  if (storedList) {
    list.innerHTML = storedList;
    btnRefresh();
    listBox.classList.remove("hide");
    listBox.classList.add("show");
  }
});

function addElement(): void {
  if (input.value === "") {
    error.classList.remove("hide");
    error.classList.add("animated");
    setTimeout(() => {
      error.classList.remove("animated");
    }, 300);
    return;
  }

  error.classList.add("hide");

  const listElement = document.createElement("li");
  listElement.classList.add("list-element");

  const textSpan = document.createElement("span");
  textSpan.textContent = input.value;
  textSpan.classList.add("li-text");

  const btn = document.createElement("button");
  btn.textContent = "Delete";
  btn.classList.add("btn");
  btn.classList.add("btn-remove");

  listElement.appendChild(textSpan);
  listElement.appendChild(btn);

  list.append(listElement);

  btnRefresh();

  updateLocalStorage(); // Guardar la lista actualizada en localStorage

  input.value = "";

  listBox.classList.remove("hide");
  listBox.classList.add("show");
}

function btnRefresh() {
  const btnRemoveList = document.querySelectorAll(".btn-remove");

  btnRemoveList.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement?.remove();
      updateLocalStorage(); // Actualizar el almacenamiento local después de eliminar un elemento
      if (list.children.length === 0) {
        listBox.classList.remove("show");
        listBox.classList.add("hide");
      }
    });
  });
}

function updateLocalStorage() {
  const taskList = list.innerHTML;
  localStorage.setItem("tasks", taskList);
}

btnAdd.addEventListener("click", addElement);

btnRemoveAll.addEventListener("click", () => {
  list.innerHTML = "";
  updateLocalStorage(); // Limpiar el almacenamiento local al eliminar todos los elementos
  listBox.classList.remove("show");
  listBox.classList.add("hide");
});
