//API ID= 163

const todaysDate = function () {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  $('#currentDate').innerHTML = `Today is ${dd}/${mm}/${yyyy}`;
  };

var filterTasks = function () {
  $(this).addClass('active');
  $(this).siblings().removeClass('active');
  getAndShowAllTasks();
}

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
var newTask = function () {
  $.ajax({
    type: 'POST',
    URL: 'https://fewd-todolist-api.onrender.com/tasks/:id?api_key=163',
    content: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: $('#new-task').val();
        getAndShowAllTasks();
        }
      }),
    success: function (response, textStatus) {
      $('#new-task').val('');
      getAndShowAllTasks();
    },
    Error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
}; 

//delete task
var TaskDeleted = function (id) {
  $.ajax({
    type: 'DELETE',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=163',
    success: function (response, textStatus) {
      getAndShowAllTasks();
    },
    Error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};

//task completed
var tasksCompleted = function (id) {
  $.ajax({
    type: 'PUT',
    url:'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=163',
    data:'json',
    success: function (response, textStatus) {
      getAndShowAllTasks();
    },
    Error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};  

//task active
var tasksIsActive = function (id) {
  $.ajax({
    type: 'PUT',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=163',
    dataType: 'json',
    Success: function (response, textStatus) {
      console.log('API request successful');
      getAndShowAllTasks();
    },
    Error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};


$(document).ready(function (){
  //show all tasks
  $('#all-button').on('click', function () {
    $('.listed-items').each(function (i,e) {
      $(e).show();
    });
    $(this).addClass('selectedTasks');
    $(this).siblings().removeClass('selectedTasks');
  })

  //newTask event handler
  $('#new-task').on('submit', function (e) {
    e.preventDefault();
    newTask();
  });

  //taskDeleted event handler
  $(document).on('click', '.delete', function (){
    TaskDeleted($(this).data('id'));
  });

  //event for checked/unchecked checkbox
  $(document).on('change', '.mark-complete', function (){
    if (this.checked) {
      tasksCompleted($(this).data('id'));
      } else {
      tasksIsActive($(this).data('id'));
    }
  });

  todaysDate();
  getAndShowAllTasks();
});
