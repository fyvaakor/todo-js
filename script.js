const addBtn = document.getElementById("addBtn");
const inp = document.getElementById("inp");
const taskList = document.querySelector(".task-list");

const displayData = ()=>{
    const getTask = JSON.parse(localStorage.getItem("toDoTask")) ?? [];

    let html = "";

    getTask.map(item =>{
        html += `<li>
                <p>${item.data}</p>
                <div class="btns">
                    <i onClick="updateItem(${item.id}, '${item.data}')" class="fa-solid fa-pen-to-square"></i>
                    <i onClick="deleteItem(${item.id})" class="fa-solid fa-trash"></i>
                </div>
            </li>`
    })

    taskList.innerHTML = html;
}

displayData();

const updateItem = (id, tsk)=>{
    const editTask = prompt("Edit Your Task", tsk);
    const getTask = JSON.parse(localStorage.getItem("toDoTask")) ?? [];
    getTask.map(item => {
        if(item.id == id) {
            item.data = editTask;
        }
    })

    localStorage.setItem("toDoTask", JSON.stringify(getTask));
    displayData();
}

const deleteItem = (id)=>{
    const getTask = JSON.parse(localStorage.getItem("toDoTask")) ?? [];
    let newData = getTask.filter(item=> item.id != id);
    localStorage.setItem("toDoTask", JSON.stringify(newData));
    displayData();
}

const saveTask = (task)=>{
    const getTask = JSON.parse(localStorage.getItem("toDoTask")) ?? [];

    getTask.push({
        id: Date.now(),
        data:task
    })

    localStorage.setItem("toDoTask", JSON.stringify(getTask));
    inp.value = "";
    displayData();
}

addBtn.addEventListener("click", () => {
    let inpValue = inp.value.trim();

    if(!inpValue) {
        return alert("Input Is Empty")
    }

    saveTask(inpValue);
    
})