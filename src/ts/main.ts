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

    public getStateBool () {
        return this.state;
    }
}

const input = document.querySelector('.input-text');
const container = document.querySelector('.point-holder');
const clearBtn = document.querySelector('.btn-clear');
const showAllBtn = document.querySelector('.show-all-btn');
const showActiveBtn = document.querySelector('.show-active-btn');
const showCompletedBtn = document.querySelector('.show-completed-btn');
let arrOfTodos: Todos[] = [];

//Add

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

//Delete

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

//Check

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

//Clear

clearBtn.addEventListener('click', () => {
    arrOfTodos = arrOfTodos.filter(item => !item.getStateBool());
    clearContent();
    showArray(arrOfTodos);
})

// ------ Filters

//Show All

showAllBtn.addEventListener('click', () => showAll(arrOfTodos));

//Show Active

showActiveBtn.addEventListener('click', () => showActive(arrOfTodos));

//Show Completed

showCompletedBtn.addEventListener('click', () => showCompleted(arrOfTodos));

function showArray(arr: Todos[]) {
    for (let i = 0; i < arr.length; i++) {
        const block = `<div class="points ${arr[i].getState()}">
                    <span class="state" itemid=${i}></span>
                    <p class="task">${arr[i].getStr()}</p>
                    <button class="delete" id=${i}></button>
                </div>`;
        container.insertAdjacentHTML('beforeend', block);
    }
    showItems(arrOfTodos);
    checkItems(arrOfTodos);
}

function clearContent() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function showItems(arr: Todos[]) : void {
    const l: string = arr.length.toString();
    const itemCount = document.getElementById('item-count');
    itemCount.innerText = l;
}

function checkItems(arr: Todos[]) : void {
    if(arr.length === 0) {
        document.querySelector('.footer').classList.add('hide');
    }
    else {
        document.querySelector('.footer').classList.remove('hide');
    }
}

function showAll(arr: Todos[]) : void {
    clearContent();
    showArray(arr);
}

function showActive(arr: Todos[]) : void {
    clearContent();
    showArray(arr.filter(item => !item.getStateBool()));
}

function showCompleted(arr: Todos[]) : void {
    clearContent();
    showArray(arr.filter(item => item.getStateBool()));
}





