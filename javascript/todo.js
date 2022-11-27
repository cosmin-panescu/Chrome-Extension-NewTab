const inputValue = document.getElementsByClassName("input-value")[0];
const addTaskBtn = document.getElementsByClassName("add-btn")[0];

addTaskBtn.addEventListener("click", () => {
    if (inputValue.value.trim() != 0) {
        let localItems = JSON.parse(localStorage.getItem('localItems'));

        if (localItems == null) {
            taskList = [];
        } else {
            taskList = localItems;
        }

        taskList.push(inputValue.value);
        localStorage.setItem('localItem', JSON.stringify(taskList));
    }

    showList();
})

function showList() {
    let output = '';
    let taskListShow = document.querySelector(".todo-list-iten");
    let localItems = JSON.parse(localStorage.getItem('localItems'));

    if (localItems == null) {
        taskList = [];
    } else {
        taskList = localItems;
    }

    taskList.forEach((data, index) => {
        output += `
            <div class="todo-list">
                <p class="todo-text">${data}</p>
                <button class="delete-todo" onclick="deleteItem(${index})">
                    X
                </button>
            </div>
        `
    });

    taskListShow.innerHTML = output;
}

showList();

function deleteItem(index) {
    let localItems = JSON.parse(localStorage.getItem('localItems'));

    taskList.splice(index, 1);

    localStorage.setItem('localItem', JSON.stringify(taskList));

    showList();
}