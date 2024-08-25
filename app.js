const taskForm = document.getElementById('task-form')
const taskList = document.getElementById('task-list')
const localStorageContent = JSON.parse(localStorage.getItem('tasks') || '[]')
const themeToggleButton = document.getElementById('toggle-theme-btn')
const currentTheme = localStorage.getItem('theme')

if(currentTheme === 'dark'){
    document.body.className = 'dark-theme'
}

taskForm.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const taskInput = document.getElementById('task-input')
    const task = taskInput.value

    if (task){
        createTask(task)
        storeTaskInLocalStorage(task)
        taskInput.value = ''
    }
})

const createTask = (task) => {
    const liElement = document.createElement('li')
    const deleteBtn = createButton('❌', 'delete-btn', 'span')
    const editBtn = createButton('✏️', 'edit-btn', 'span')

    liElement.textContent = task
    liElement.appendChild(deleteBtn)
    liElement.appendChild(editBtn)
    taskList.appendChild(liElement)
}

const createButton = (textContent, className, tagName) => {
    const btn = document.createElement(tagName)

    btn.textContent = textContent
    btn.classList.add(className)

    return btn
}

taskList.addEventListener('click', (ev) => {
    const target = ev.target
    const taskLi = target.parentElement
    const isDelete = target.classList.contains('delete-btn')
    const isEdit = target.classList.contains('edit-btn')

    if (isDelete){
        console.log('delete')
        deleteTask(taskLi)
    } else if (isEdit){
        console.log('edit')
        editTask(taskLi)
    }
})

const deleteTask = (taskItem) => {
    if (confirm("Are you sure to delete this element")){
        taskItem.remove()
        updateLocalStorage()
    }
}

const editTask = (taskItem) => {
    const newTask = prompt('edit task', taskItem.firstChild.textContent)

    if (newTask !== null){
        taskItem.firstChild.textContent = newTask
        updateLocalStorage()
    }
}

const storeTaskInLocalStorage = (task) => {
    const tasks = localStorageContent

    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const loadTasks = () => {
    const tasks = localStorageContent

    tasks.forEach((task) => {
        createTask(task)
    })
}

const updateLocalStorage = () => {
    const tasks = Array
        .from(taskList.querySelectorAll('li'))
        .map((li) => li.firstChild.textContent)

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

themeToggleButton.addEventListener('click', (ev) => {
    document.body.classList.toggle('dark-theme')

    const theme = document.body.classList.contains('dark-theme')
        ? 'dark'
        : 'light'

    localStorage.setItem('theme', theme)
})

loadTasks() // load all tasks at first