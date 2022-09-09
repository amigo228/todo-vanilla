class Todos {
    private str: string = "";
    private state: boolean = false;
    constructor(str: string) {
        this.str = str;
    }

    public getStr() {
        return this.str;
    }

    public setState() {
        this.state = !this.state;
    }

    public getState() {
        return this.state ? 'active' : '';
    }
}

const input = document.querySelector('.input-text');
const container = document.querySelector('.point-holder');
let arrOfTodos: Todos[] = [];

input.addEventListener('keyup', (e: KeyboardEvent)=> {
    const val = (document.querySelector('.input-text') as HTMLInputElement).value;
    if(val == "") return 0;
    if(e.key == 'Enter') {
        arrOfTodos.push(new Todos(val));
        clearContent();
        showArray(arrOfTodos);
        (document.querySelector('.input-text') as HTMLInputElement).value = '';
    }
});

container.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLButtonElement;
    const check = target.closest('.delete');
    if(check) {
        const attr = Number(target.getAttribute('id'));
        clearContent();
        arrOfTodos.splice(attr, 1);
        showArray(arrOfTodos);
    }
});

container.addEventListener('click', (e: Event) => {
   const target = e.target as HTMLHtmlElement;
   const check = target.closest('.state');
   if (check) {
       const attr = Number(target.getAttribute('itemid'));
       arrOfTodos[attr].setState();
       clearContent();
       showArray(arrOfTodos);
   }
});

function showArray(arr: Todos[]) {
    for (let i = 0; i < arr.length; i++) {
        const block = `<div class="points ${arr[i].getState()}">
                    <span class="state" itemid=${i}></span>
                    <p class="task">${arr[i].getStr()}</p>
                    <button class="delete" id=${i}></button>
                </div>`;
        container.insertAdjacentHTML('beforeend', block);
    }
}

function clearContent() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}





