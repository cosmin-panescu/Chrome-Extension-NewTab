const inputValue = document.getElementsByClassName("input-value")[0];
const addTaskBtn = document.getElementsByClassName("add-btn")[0];

addTaskBtn.addEventListener("click", () => {
    if (inputValue.value.trim() != 0) {
        let localItems = JSON.parse(localStorage.getItem('localItem'));

        if (localItems === null) {
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
    let html = '';
    let taskListShow = document.querySelector(".todo-list-item");
    let localItems = JSON.parse(localStorage.getItem('localItem'));

    if (localItems == null) {
        taskList = [];
    } else {
        taskList = localItems;
    }

    taskList.forEach((data, index) => {
        html += `
            <div class="todo-list">
                <p class="todo-text">${data}</p>
                <button class="delete-todo btn" onClick="deleteItem(${index})">
                    ✖
                </button>
            </div>
        `
    });

    taskListShow.innerHTML = html;
}

showList();

function deleteItem(index) {
    let localItems = JSON.parse(localStorage.getItem('localItem'));

    taskList.splice(index, 1);

    localStorage.setItem('localItem', JSON.stringify(taskList));

    showList();
}