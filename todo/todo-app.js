/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-loop-func */
/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-cond-assign */
/* eslint-disable no-constant-condition */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable wrap-iife */
/* eslint-disable comma-dangle */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-arrow-callback */
(function () {
  function createAppTitle(title) {
    const appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const buttonWrapper = document.createElement('div');
    const button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control', 'mr-1');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    button.disabled = true;

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  function createTodoList() {
    const list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(name) {
    const item = document.createElement('li');
    const buttonGroup = document.createElement('div');
    const doneButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    item.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-center'
    );
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success', 'mr-1');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  function createTodoApp(container, title = 'Список дел', todos) {
    let localTodos = [];
    if (localStorage.getItem(todos) !== null) {
      localTodos = JSON.parse(localStorage.getItem(todos));
    }

    const todoAppTitle = createAppTitle(title);
    const todoItemForm = createTodoItemForm();
    const todoList = createTodoList();

    todoItemForm.input.addEventListener('input', function () {
      if (todoItemForm.input.value.length > 0) {
        todoItemForm.button.removeAttribute('disabled');
      } else {
        todoItemForm.button.setAttribute('disabled', 'disabled');
      }
    });

    for (let i = 0; localTodos.length > i; i++) {
      const todoItem = createTodoItem(localTodos[i].name);

      if (localTodos[i].done === true) {
        todoItem.item.classList.add('list-group-item-success');
      }
      todoItem.doneButton.addEventListener('click', function () {
        todoItem.item.classList.toggle('list-group-item-success');
        if (localTodos[i].done === true) {
          localTodos[i].done = false;
        } else {
          localTodos[i].done = true;
        }
        localStorage.setItem(todos, JSON.stringify(localTodos));
      });
      todoItem.deleteButton.addEventListener('click', function () {
        if (confirm('Вы уверенны?')) {
          todoItem.item.remove();
          localTodos.splice(i, 1);
          localStorage.setItem(todos, JSON.stringify(localTodos));
          location.reload();
        }
      });
      todoList.append(todoItem.item);
    }

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    todoItemForm.form.addEventListener('submit', function (e) {
      e.preventDefault();

      // let todo = {
      //   id: Date.now(),
      //   name: todoItemForm.input.value,
      //   done: false,
      // };

      const todo = {};
      todo.name = todoItemForm.input.value;
      todo.done = false;

      const item = todo;
      const todoItem = createTodoItem(todo.name);
      localTodos.push(todo);
      todoList.append(todoItem.item);
      localStorage.setItem(todos, JSON.stringify(localTodos));
      location.reload();

      for (let i = 0; localTodos.length > i; i++) {
        todoItem.doneButton.addEventListener('click', function () {
          if (item.done === true) {
            item.done = false;
          } else {
            item.done = true;
            todoItem.item.classList.toggle('list-group-item-success');
          }
          localStorage.setItem(page, JSON.stringify(localTodos));
        });

        todoItem.deleteButton.addEventListener('click', function () {
          if (confirm('Вы уверены?')) {
            todoItem.item.remove(i);
            localTodos.splice(i, 1);
            localStorage.setItem(page, JSON.stringify(localTodos));
            location.reload();
          }
        });
      }

      todoItemForm.input.value = '';
      todoItemForm.button.disabled = true;
    });
  }

  window.createTodoApp = createTodoApp;
})();
