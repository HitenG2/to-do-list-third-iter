const addTaskBtn = document.getElementById('add-todo-btn'),
deskTaskInput = document.getElementById('description-task'),
todoList = document.getElementById('todo-list');

let todoItemElems = [];
let tasks;
if (!localStorage.tasks) tasks = [];
else tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(description) {
	this.description = description;
	this.completed = false;
}

const updateLocal = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

const update = () => {
	updateLocal();
	fillHtml();
}

const addBtnHandler = () =>{
	deskTaskInput.value = deskTaskInput.value.trim();
	if (deskTaskInput.value == '') return;
	tasks.push(new Task(deskTaskInput.value));
	update();
	deskTaskInput.value = '';
}

deskTaskInput.addEventListener('keypress', KeyboardEvent =>{
	if (KeyboardEvent.key == 'Enter') {
		addBtnHandler();
	}
	else return;
})

addTaskBtn.addEventListener('click', () => {
	addBtnHandler();
});

const createTemplate = (task,index) => {
	return `
		<ul class="todo-list__item ${task.completed ? 'checked' : ''}"> 
			<li class="description">${task.description}</li>
			<div class="todo-list__btns">
				<input onclick="completeTask(${index})" class="checkbox" type="checkbox" ${task.completed ? 'checked' : ''}>
				<button onclick="deleteTask(${index})" class="todo-list__delete-btn">Delete</button>
			</div>
		</ul>
	`;
}

const filterTasks = () => {
	const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
	const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
	tasks = [...activeTasks, ...completedTasks];
}

const fillHtml = () => {
	todoList.innerHTML = '';
	if(tasks.length > 0){
		filterTasks();
		tasks.forEach((item,index) => {
			todoList.innerHTML += createTemplate(item, index);
		});
		todoItemElems = document.querySelectorAll('.todo-list__item');
	}
}
fillHtml();

const completeTask = index => {
	tasks[index].completed = !tasks[index].completed;
	if(tasks[index].completed) {
		todoItemElems[index].classList.add('checked');
	}
	else {
		todoItemElems[index].classList.remove('checked');
	}
	update();
}

const deleteTask = index => {
	todoItemElems[index].classList.add('fade-out')
	setTimeout(() => {
		tasks.splice(index, 1);
		update();
	},600);
}

// const editTask = index => {

// }
