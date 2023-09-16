function currentTime() {
    let timeForDocument = document.querySelector(".now-time");
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    minutes < 10 ? minutes = '0' + minutes : minutes;

    timeForDocument.innerHTML = hours + ':' + minutes;

    let dateInputMin = document.querySelector("#form-date");
    let years = date.getFullYear();
    let day = date.getDate();
    let month = date.getMonth();

    month++;

    month < 10 ? month = '0' + month : month;

    day < 10 ? day = '0' + day : day;

    dateInputMin.setAttribute("min", `${years}-${month}-${day}`);
}

setInterval(currentTime, 500);


let addTaskButton = document.querySelector(".todo-add__button");
let formCancelButton = document.querySelector(".form-cancel");
let formSaveButton = document.querySelector(".form-save");

addTaskButton.onclick = function () {
    openForm();
}

formCancelButton.onclick = function () {
    openForm();
    clearAll();
}

let tasksList = document.querySelector(".tasks-list");
let inputName = document.querySelector("#form-name");
let inputDescript = document.querySelector("#form-description");
let inputCategory = document.querySelector("#form-category");
let inputDate = document.querySelector("#form-date");
let inputTime = document.querySelector("#form-time");
let inputPriority = document.querySelector("#form-priority");
let inputFulfillment = document.querySelector('#form-fulfillment');

formSaveButton.onclick = function () {
    if (inputName.value === '') {
        alert("The name cannot be empty");
        return;
    }
    if (inputCategory.value === '') {
        alert("The category cannot be empty");
        return;
    }
    if (inputPriority.value === '') {
        alert("The priority cannot be empty");
        return;
    }

    let description = inputDescript.value;
    let taskDate = inputDate.value;
    let taskTime = inputTime.value;

    description === '' ? description = '-' : description;

    if (taskDate === '' && taskTime === '') {
        taskDate = '-';
        taskTime = '';
    } else if (taskDate === '' && taskTime !== '') {
        taskDate = '';
        taskTime = taskTime;
    } else if (taskDate !== '' && taskTime === '') {
        taskDate = taskDate;
        taskTime = '';
    } else {
        taskDate;
        taskTime;
    }

    let newTask = new CreateTask(inputName.value, description, inputCategory.value, taskDate, taskTime, inputPriority.value, inputFulfillment.value);
    newTask.addTask(tasksList);
    clearAll();
    openForm();
}

class CreateTask {
    constructor(name, descrtiption, caletgory, date, time, priority, fulfillment) {
        this.name = name;
        this.descrtiption = descrtiption;
        this.caletgory = caletgory;
        this.date = date;
        this.time = time;
        this.priority = priority;
        this.fulfillment = fulfillment;
        this.complete = false;
        this.task = null;
    }

    addTask(e) {
        this.task = document.createElement("div");
        this.task.classList.add("item");

        let itemTask = document.createElement("p");
        itemTask.innerHTML = this.name;
        itemTask.classList.add("item-task");
        this.task.append(itemTask);

        let itemDes = document.createElement("p");
        itemDes.innerHTML = this.descrtiption;
        itemDes.classList.add("item-description");
        this.task.append(itemDes);

        let itemCat = document.createElement("p");
        itemCat.innerHTML = this.caletgory;
        itemCat.classList.add("item-category");
        this.task.append(itemCat);

        let itemWhen = document.createElement("p");
        itemWhen.innerHTML = `${this.date} <br> ${this.time}`;
        itemWhen.classList.add("item-when");
        this.task.append(itemWhen);

        let itemPrior = document.createElement("p");
        itemPrior.innerHTML = this.priority;
        itemPrior.classList.add("item-priority");
        this.task.append(itemPrior);

        let itemFulfill = document.createElement("p");
        itemFulfill.innerHTML = this.fulfillment + '%';
        itemFulfill.classList.add("item-fulfillment");
        this.task.append(itemFulfill);

        let createImgBlocks = document.createElement("div");
        createImgBlocks.classList.add("item-img");
        let createEdit = document.createElement("img");
        createEdit.setAttribute("src", "./assets/done.svg");
        createEdit.addEventListener("click", () => this.completeTask(this.task))
        createImgBlocks.append(createEdit);
        let createDelte = document.createElement("img");
        createDelte.setAttribute("src", "./assets/trash.svg");
        createDelte.addEventListener("click", () => this.deleteTask(this.task))
        createImgBlocks.append(createDelte);
        this.task.append(createImgBlocks);

        // this.task.setAttribute("draggable", "false");


        e.append(this.task);
        tasksNoFound();
    }

    completeTask(e) {
        this.complete = !this.complete;
        e.classList.toggle("complete");
    }

    deleteTask(e) {
        askDelete("Are you sure?", (result) => {
            if (result) {
                e.remove();
            }
            tasksNoFound();
        });
    }
}

function clearAll() {
    inputName.value = '';
    inputDescript.value = '';
    inputCategory.value = '';
    inputDate.value = '';
    inputTime.value = '';
    inputPriority.value = '';
    inputFulfillment.value = '10';
}

function openForm() {
    document.querySelector(".form").classList.toggle("hidden");
}



let sortButton = document.querySelector(".todo-sort");

sortButton.onclick = function (e) {
    let event = e.target;
    if (!event.classList.contains("todo-sort__button")) {
        return;
    }

    let sortButtons = document.querySelectorAll(".todo-sort__button");

    for (let item of sortButtons) {
        item.classList.remove("todo-sort__selected");
    }

    event.classList.add("todo-sort__selected");


    let allItem = document.querySelectorAll(".item");

    if (event.innerHTML === "All") {
        for (let item of allItem) {
            if (item.classList.contains("hide")) {
                item.classList.remove("hide");
            }
        }
        tasksNoFound();
    } else if (event.innerHTML === "To-Do") {
        for (let item of allItem) {
            if (item.classList.contains("hide")) {
                item.classList.remove("hide");
            }
            if (item.classList.contains("complete")) {
                item.classList.add("hide");
            }
        }
        tasksNoFound();
    } else if (event.innerHTML === "Completed") {
        for (let item of allItem) {
            if (item.classList.contains("hide")) {
                item.classList.remove("hide");
            }
            if (!item.classList.contains("complete")) {
                item.classList.add("hide");
            }
        }
        tasksNoFound();
    }
}

document.querySelector(".tasks-drag").onclick = function (e) {
    let tasksToDraggable = document.querySelectorAll(".item");
    let onOrOff;

    tasksToDraggable[0].draggable === true ? onOrOff = true : onOrOff = false;

    tasksToDraggable.forEach(drag => {
        if (!onOrOff) {
            drag.draggable = true;
        } else {
            drag.draggable = false;
        }
    })



}

function tasksNoFound() {
    let messegeNoFound = document.querySelector(".tasks__no-found");
    if (tasksList.innerText === "") {
        messegeNoFound.classList.remove("hide");
    } else {
        messegeNoFound.classList.add("hide");
    }
}

function askDelete(text, result) {
    let div = document.createElement("div");
    let p = document.createElement("p");
    let divButtons = document.createElement('div');
    let buttonTrue = document.createElement("button");
    let buttonFalse = document.createElement("button");
    div.classList.add("ask");
    p.classList.add("ask-title");
    divButtons.classList.add("ask-buttons");
    buttonTrue.classList.add("ask-true");
    buttonFalse.classList.add("ask-false");
    p.innerHTML = text;
    divButtons.addEventListener("click", (e) => {
        if (e.target.classList.contains("ask-true")) {
            div.remove();
            return result(true);
        } else if (e.target.classList.contains("ask-false")) {
            div.remove();
            return result(false);
        }
    })
    buttonTrue.innerHTML = "Yes";
    buttonFalse.innerHTML = "No";
    divButtons.append(buttonTrue);
    divButtons.append(buttonFalse);
    div.append(p);
    div.append(divButtons);
    document.body.append(div);
}

tasksList.addEventListener('dragstart', (evt) => {
    evt.target.classList.add("drag-selected");
})

tasksList.addEventListener('dragend', (evt) => {
    evt.target.classList.remove("drag-selected");
})

tasksList.addEventListener('dragover', (evt) => {

    evt.preventDefault();

    const activeElement = tasksList.querySelector(".drag-selected");

    const curentElement = evt.target;

    const isMoveable = activeElement !== curentElement && curentElement.classList.contains('item');

    if (!isMoveable) {
        return;
    }

    const nextElement = (curentElement === activeElement.nextElementSibling) ? curentElement.nextElementSibling : curentElement;

    tasksList.insertBefore(activeElement, nextElement);
});

const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

    const nextElement = (cursorPosition < currentElementCenter) ?
        currentElement :
        currentElement.nextElementSibling;

    return nextElement;
};

tasksNoFound();