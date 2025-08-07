
window.addEventListener('load', () => { 

    todos = JSON.parse(localStorage.getItem("todos")) || [];
    const form = document.querySelector('#new-todo');
    const todoTitle = document.querySelector("#todoTitle");
    const todoDescription = document.querySelector("#todoDescription");
    const imageInput = document.querySelector("#imageInput");

    form.addEventListener('submit' , e => {
        e.preventDefault();

        const todo = {
            id:Date.now(),
            title: todoTitle.value,
            description: todoDescription.value,
            image: imageInput.value,
            priority: e.target.elements.priority.value,
            done: false
        }

        todos.push(todo);
        localStorage.setItem("todos",JSON.stringify(todos));

        e.target.reset();

        displayTodo();
    })
        displayTodo();
})

function displayTodo () {
    const todoItem = document.querySelector(".todoItem");
    todoItem.innerHTML="";

    todos.forEach(todo => {
        const addOne = document.createElement('div');
        addOne.classList.add('addone');

        const task = document.createElement('div');
        task.classList.add('todo-task');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const par = document.createElement('p');
        const parDes = document.createElement('p');
        const actions = document.createElement('div');
        const image = document.createElement('img');
        const edit = document.createElement('button');
        const deleteBtn = document.createElement('button');

        input.type='checkbox';
        input.addEventListener('change', () => {
            todo.done = input.checked; 
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodo();
        });

        par.classList.add('title-content');
        parDes.classList.add('description-content')

        span.classList.add('bubble');
        if(todo.priority == 'low'){
            span.classList.add('low');
        }
        else if(todo.priority == 'hard'){
            span.classList.add('hard');
        }
        else {
            span.classList.add('medium');
        }

        content.classList.add('todo-content');

        par.innerHTML=todo.title;
        parDes.innerHTML=todo.description;
        actions.classList.add('actions');

        image.src = todo.image;
        image.alt = "img";

        edit.classList.add('edit');
        edit.innerHTML="Edit";
        
        deleteBtn.classList.add('delete');
        deleteBtn.innerHTML="Delete";

        label.appendChild(input);
		label.appendChild(span);
        task.appendChild(label);
        content.appendChild(par);
        content.appendChild(parDes);
        task.appendChild(content);
        actions.appendChild(image);
		actions.appendChild(edit);
		actions.appendChild(deleteBtn);
		addOne.appendChild(task);
		addOne.appendChild(actions);

        todoItem.appendChild(addOne);


        if (todo.done) {
			addOne.classList.add('done');
		}

        deleteBtn.addEventListener('click', () => {
            todos = todos.filter( t => t!=todo);
            localStorage.setItem("todos",JSON.stringify(todos));
            displayTodo();
        })

    
    });
}
