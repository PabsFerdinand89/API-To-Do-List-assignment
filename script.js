// my API=163
//URL: "https://fewd-todolist-api.onrender.com/tasks

$(document).ready(function(){

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let d = new Date();
  let day = days[d.getDay()];
  let month = months[d.getMonth()];
  let date = d.getDate();
  let year = d.getFullYear();
  
  let hour = d.getHours();
  let amPm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12;
    hour.toLocaleString;
  
  let minute = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  
  $('#date-and-time').append(`<h6 class="my-0">Today is ${day}, ${month} ${date}, ${year}</h6> ${hour}:${minute}`);


  var getAndDisplayAllTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=163',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#todo-list').empty();
        
        var returnActiveTasks = response.tasks.filter(function (task) {
          if (!task.completed) {
            return task.id;
          }
        });

        var returnCompletedTasks = response.tasks.filter(function (task) {
          if (task.completed) {
            return task.id;
          }
        });
  
        var filterAllTasks = $('.active').attr('id');

        switch (filterAllTasks) {
          case '':
            taskItems = response.tasks;
            break;
          case 'all':
            taskItems = response.tasks;
            break;
          case 'active':
            taskItems = returnActiveTasks;
            break;
          case 'completed':
            taskItems = returnCompletedTasks;
        };      
        

        var sortTasks = taskItems.sort(function (a, b) {
          return Date.parse(a.created_at) - Date.parse(b.created_at);
        });

        sortTasks.forEach(function (task) {
          $('#todo-list').append(`
          <div class="row">  
            <div class="task">
              <div class="custom-control checkbox ml-3 mr-5">
                <input type="checkbox" class="custom-control-input mark-complete" id="customCheck${task.id}" data-id="${task.id}" ${task.completed ? 'checked' : ''} />
                <label class="custom-control-label" for="customCheck${task.id}"></label>
              </div>
            </div>
            <div colspan="column">
              <p class="task-content ${task.completed ? 'crossed-out' : ''}">${task.content}</p>
              <button class="btn delete-button px-3" data-id="${task.id}"><i class="far fa-trash-alt"></i></button>
            </div>
          </div>
          `);
        })
        $('.to-do-amount span').innerHTML(returnActiveTasks.length);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }


  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=163',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('.add-input').val()
        }
      }),
      success: function (response, textStatus) {
        $('.add-input').val('');
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });  
  }


  var deleteTask = function (id) {
    $.ajax({
      type: 'DELETE',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=163',
      success: function (response, textStatus) {
        getAndDisplayAllTasks
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('click', '.delete-button', function () {
    deleteTask($(this).data('id'))
  });

  var markTaskComplete = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=163',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

   var markTaskActive = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=163',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  $('#create-task').on('submit', function (e) {
    e.preventDefault();
    createTask();
  });

  $(document).on('change', '.mark-complete', function () {
    if (this.checked) {
      markTaskComplete($(this).data('id'));
    } else {
      markTaskActive($(this).data('id'));
    }
  });
    
  $('.to-do-filter button').on('click', function() {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    getAndDisplayAllTasks();
  });

  getAndDisplayAllTasks();

});