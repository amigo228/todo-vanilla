var Todos = /** @class */ (function () {
    function Todos(str) {
        this.str = "";
        this.state = false;
        this.str = str;
    }
    Todos.prototype.getStr = function () {
        return this.str;
    };
    Todos.prototype.setState = function () {
        this.state = !this.state;
    };
    Todos.prototype.getState = function () {
        return this.state ? 'active' : '';
    };
    return Todos;
}());
var input = document.querySelector('.input-text');
var container = document.querySelector('.point-holder');
var arrOfTodos = [];
input.addEventListener('keyup', function (e) {
    var val = document.querySelector('.input-text').value;
    if (val == "")
        return 0;
    if (e.key == 'Enter') {
        arrOfTodos.push(new Todos(val));
        clearContent();
        showArray(arrOfTodos);
        document.querySelector('.input-text').value = '';
    }
});
container.addEventListener('click', function (e) {
    var target = e.target;
    var check = target.closest('.delete');
    if (check) {
        var attr = Number(target.getAttribute('id'));
        clearContent();
        arrOfTodos.splice(attr, 1);
        showArray(arrOfTodos);
    }
});
container.addEventListener('click', function (e) {
    var target = e.target;
    var check = target.closest('.state');
    if (check) {
        var attr = Number(target.getAttribute('itemid'));
        arrOfTodos[attr].setState();
        console.log(attr);
        console.log(arrOfTodos);
        clearContent();
        showArray(arrOfTodos);
    }
});
function showArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        var block = "<div class=\"points ".concat(arr[i].getState(), "\">\n                    <span class=\"state\" itemid=").concat(i, "></span>\n                    <p class=\"task\">").concat(arr[i].getStr(), "</p>\n                    <button class=\"delete\" id=").concat(i, "></button>\n                </div>");
        container.insertAdjacentHTML('beforeend', block);
    }
}
function clearContent() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
