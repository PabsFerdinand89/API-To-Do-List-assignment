//API ID= 163


const todaysDate = function () {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  
  getElementById($('#listed-tasks')).innerHTML = `Today is ${dd}/${mm}/${yyyy}`;

  //how do you get today's date in Javascript?*



  
  };


  var getAndShowAllTasks = function (){
  $.ajax({
    type: 'GET',
    URL: 'https://fewd-todolist-api.onrender.com/tasks?api_key=163',
    dataType: 'json',
    success: function (response, textStatus) {
      $('#todo-list').empty();
      response.tasks.forEach(function (task) {
        $('#todo-list').append(`<div class="row"
          <li class="list-item"> 
            <input class="form-input" id="${task.id}" type="checkbox" data-id="${task.id}" ${task.completed ? "checked" : ""}/>
            <label class="check-label" for=${task.id}>${task.content}</label>
            <button class="delete-button">Remove</button>
          </li>
        </div>`);  
      });
      updateList();
      },
      Error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });
  };

//new task
  var newTasks = function () {
    $.ajax({
      type: 'POST',
      URL: 'https://fewd-todolist-api.onrender.com/tasks/:id?api_key=163',
      content: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
      task: {
        content: $('#newTask').val(),
        },
      }),
      success: function (response, textStatus) {
        getAndShowAllTasks();},
      Error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

//submitted task
  var tasksSubmitted = function () {
    let inputTheTask = $('.new-to-do input');

    $.ajax({
      type: 'POST',
      url:'https://fewd-todolist-api.onrender.com/tasks?api_key=163',
      dataType: 'application/json',
      success: function (response, textStatus) {
        filterAllResults();},
      Error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

//delete task
  var Tasksdeleted = function () {
    $.ajax({
      type: 'DELETE',
      url: 'https://fewd-todolist-api.onrender.com/tasks/:id?api_key=163',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndShowAllTasks();
      },
      Error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

//
  var tasksCompleted = function (id) {
    $.ajax({
      type: 'PUT',
      url:'https://fewd-todolist-api.onrender.com/tasks/:id/mark_complete?api_key=163',
      data:'json',
      success: function (response, textStatus) {
        getAndShowAllTasks();
      },
      Error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

//
  var tasksIsActive = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/:id/mark_active?api_key=163',
      data: 'json',
      success: function (response, textStatus) {
        getAndShowAllTasks();
      },
      Error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  getAndShowAllTasks();


$(document).ready(function () {

  getAndShowAllTasks();
  
  $(document).on('click', 'select', function (){
    if (this.checked) {
      taskCompleted($(this).data.('id'));
    } else {
      taskIsActive($(this).data.('id'));
    }
  });

  $(document).on('click', 'delete', function ({
    
  })

  $(document).on('submit', function (e) {
    e.preventDefault();
    taskSubmitted()  ;
  })
});
