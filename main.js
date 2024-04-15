var btnAdd = document.getElementById("btn-add");
var btnRemoveAll = document.getElementById("btn-remove-all");
var listBox = document.getElementById("list-box");
var list = document.getElementById("list");
var input = document.getElementById("element-text");
var error = document.getElementById("error-text");
// Cargar elementos de la lista almacenados en localStorage al cargar la página
window.addEventListener("load", function () {
    var storedList = localStorage.getItem("tasks");
    if (storedList) {
        list.innerHTML = storedList;
        btnRefresh();
        listBox.classList.remove("hide");
        listBox.classList.add("show");
    }
});
function addElement() {
    if (input.value === "") {
        error.classList.remove("hide");
        error.classList.add("animated");
        setTimeout(function () {
            error.classList.remove("animated");
        }, 300);
        return;
    }
    error.classList.add("hide");
    var listElement = document.createElement("li");
    listElement.classList.add("list-element");
    var textSpan = document.createElement("span");
    textSpan.textContent = input.value;
    textSpan.classList.add("li-text");
    var btn = document.createElement("button");
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
    var btnRemoveList = document.querySelectorAll(".btn-remove");
    btnRemoveList.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var _a;
            (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
            updateLocalStorage(); // Actualizar el almacenamiento local después de eliminar un elemento
            if (list.children.length === 0) {
                listBox.classList.remove("show");
                listBox.classList.add("hide");
            }
        });
    });
}
function updateLocalStorage() {
    var taskList = list.innerHTML;
    localStorage.setItem("tasks", taskList);
}
btnAdd.addEventListener("click", addElement);
btnRemoveAll.addEventListener("click", function () {
    list.innerHTML = "";
    updateLocalStorage(); // Limpiar el almacenamiento local al eliminar todos los elementos
    listBox.classList.remove("show");
    listBox.classList.add("hide");
});
