const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const error = document.getElementById("error");

const allBtn = document.getElementById("allBtn");
const doneBtn = document.getElementById("doneBtn");
const activeBtn = document.getElementById("activeBtn");
const sortBtn = document.getElementById("sortBtn");

let tasks = [];
function showTasks(list = tasks) {
    taskList.innerHTML = "";
    list.forEach(task => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.done) {
            span.classList.add("done");
        }
        span.onclick = () => {
            task.done = !task.done;
            showTasks();
        };
        const delBtn = document.createElement("button");
        delBtn.textContent = "Удалить";
      
        delBtn.onclick = () => {
            tasks = tasks.filter(t => t.id !== task.id);
            showTasks();
        };

        li.appendChild(span);
        li.appendChild(delBtn);

        taskList.appendChild(li);
    });
}

addBtn.onclick = () => {
    const text = taskInput.value.trim();
    if (text === "") {
        error.textContent = "Введите задачу";
        error.className = "error";
        return;
    }

    error.textContent = "";

    const task = {
        id: Date.now(),
        text: text,
        done: false
    };
    tasks.push(task);
    taskInput.value = "";

    showTasks();
};

allBtn.onclick = () => {
    showTasks(tasks);
};

doneBtn.onclick = () => {
    const filtered = tasks.filter(task => task.done);
    showTasks(filtered);
};

activeBtn.onclick = () => {
    const filtered = tasks.filter(task => !task.done);
    showTasks(filtered);
};

sortBtn.onclick = () => {
    tasks.sort((a, b) => a.text.localeCompare(b.text));
    showTasks();
};
