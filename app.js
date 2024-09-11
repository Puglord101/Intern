document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todo-list');
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');

  // Fetch and display todos
  function fetchTodos() {
    fetch('/todos')
      .then(response => response.json())
      .then(todos => {
        todoList.innerHTML = '';
        todos.forEach(todo => {
          const li = document.createElement('li');
          li.setAttribute('data-id', todo.id);

          const span = document.createElement('span');
          span.textContent = todo.todo_text;

          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.classList.add('delete-btn');
          deleteButton.setAttribute('data-id', todo.id);
          deleteButton.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            fetch(`/todos/${id}`, { method: 'DELETE' })
              .then(response => response.json())
              .then(() => {
                e.target.parentElement.remove();
              })
              .catch(err => console.error('Error:', err));
          });

          const updateButton = document.createElement('button');
          updateButton.textContent = 'Update';
          updateButton.classList.add('update-btn');
          updateButton.setAttribute('data-id', todo.id);
          updateButton.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const newTodoText = prompt('Enter new text for the todo:');
            if (newTodoText) {
              fetch(`/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ todo_text: newTodoText })
              })
              .then(response => response.json())
              .then(() => {
                span.textContent = newTodoText;
              })
              .catch(err => console.error('Error:', err));
            }
          });

          li.appendChild(span);
          li.appendChild(updateButton);
          li.appendChild(deleteButton);
          todoList.appendChild(li);
        });
      })
      .catch(err => console.error('Error:', err));
  }

  // Add a new todo
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = todoInput.value;
    fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo_text: todoText })
    })
    .then(response => response.json())
    .then(() => {
      todoInput.value = '';
      fetchTodos();
    })
    .catch(err => console.error('Error:', err));
  });

  // Initial fetch of todos
  fetchTodos();
});
