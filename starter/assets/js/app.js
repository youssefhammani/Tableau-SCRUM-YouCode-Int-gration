/**
 * In this file app.js you will find all CRUD functions name.
 * 
 */

function createTask() {
    // initialiser task form
    let to_do = document.getElementById('to-do-tasks');
    let in_progress = document.getElementById('in-progress-tasks');
    let well_done = document.getElementById('done-tasks');

    to_do.innerHTML='';
    in_progress.innerHTML='';
    well_done.innerHTML='';

    let to_do_count = 0;
    let in_progress_count = 0;
    let well_done_count = 0;

    // Afficher le boutton save
    for (let i = 0 ; i < all_tasks.length; i++) {
        let btn = `
        <div class="d-flex bg-white rounded-1 mt-2 p-4">
            <button id="${all_tasks[i].id}" class="d-flex w-100 bg-white border-0">
                <div class="text-green fs-5 ps-3 py-2">
                    <i class="`+((all_tasks[i].the_status == "To Do") ? "fa-regular fa-circle-question" : (all_tasks[i].the_status == "In Progress") ? "fas fa-circle-notch fa-spin" : "fa-regular fa-circle-check")+`"></i>
                </div>
                <div class="text-start ps-4 pb-3">
                    <div class="fs-5">${all_tasks[i].the_title}</div>
                    <div class="">
                        <div class="fw-lighter">#${all_tasks[i].id} created in ${all_tasks[i].the_date}</div>
                        <div class="fw-light" title="${all_tasks[i].the_description}">${all_tasks[i].the_description.substring(0, 70)}...</div>
                    </div>
                    <div class="mt-2">
                        <span class="bg-blue text-white rounded-3 px-2 py-1">${all_tasks[i].the_priority}</span>
                        <span class="bg-gray-400 rounded-3 px-2 py-1">${all_tasks[i].the_type}</span>
                    </div>
                </div>
            </button>
            <button class="border-0 bg-white d-flex fs-5 py-2 text-teal" onclick="editTask(${i})">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="border-0 bg-white d-flex fs-5 py-2 text-danger">
                <i class="fa-solid fa-trash" onclick="deleteTask(${all_tasks[i].id})"></i>
            </button>
        </div>`;
        
        if(all_tasks[i].the_status == 'To Do') {
            to_do_count++;
            to_do.innerHTML += btn;
        }
        else if(all_tasks[i].the_status == 'In Progress') {
            in_progress_count++;
            in_progress.innerHTML += btn;
        }
        else if (all_tasks[i].the_status == 'Done') {
            well_done_count++;
            well_done.innerHTML += btn;
        }
    }
    document.getElementById('to-do-tasks-count').innerText = to_do_count;
    document.getElementById('in-progress-tasks-count').innerText = in_progress_count;
    document.getElementById('done-tasks-count').innerText = well_done_count;
}

function saveTask() {
    // Recuperer task attributes a partir les champs input
    let new_title       = document.getElementById('Title');
    let new_priority    = document.getElementById('Priority');
    let new_status      = document.getElementById('Status');
    let new_date        = document.getElementById('date');
    let new_description = document.getElementById('Description');

    // Créez task object
    let info_task = {
        id: all_tasks.length + 1,
        the_title       : new_title.value,
        the_type        : whatsPriority(),
        the_priority    : new_priority.value,
        the_status      : new_status.value,
        the_date        : new_date.value,
        the_description : new_description.value,
    }
    // Ajoutez object au Array
    all_tasks.push(info_task);

    $('#exampleModal').modal('hide');
    document.getElementById("modal").reset();
    
    createTask();
}

function editTask(index) {
    $('#exampleModal1').modal('show');

    if (all_tasks[index].the_type == "Bug") {
        document.getElementById("Feature1").checked = false;
        document.getElementById("Bug1").checked = true;
    }
    else {
        document.getElementById("Bug1").checked = false;
        document.getElementById("Feature1").checked = true;
    }

    document.getElementById("Title1").value       = all_tasks[index].the_title;
    document.getElementById("priority1").value    = all_tasks[index].the_priority;
    document.getElementById("Status1").value      = all_tasks[index].the_status;
    document.getElementById("date1").value        = all_tasks[index].the_date;
    document.getElementById("Description1").value = all_tasks[index].the_description;

    document.getElementById("modal-footer1").innerHTML = `<button type="button" class="btn btn-light border" data-bs-dismiss="modal">Cansel</button>
    <button class="add btn btn-primary  col-2" type="button" onclick="updateTask(${index})" >Update</button>`;
}

function updateTask(idx) {
    // Remplacer ancienne task par nouvelle task
    all_tasks[idx].the_type        = whatsPriority();
    all_tasks[idx].the_title       = document.getElementById("Title1").value;
    all_tasks[idx].the_priority    = document.getElementById("priority1").value;
    all_tasks[idx].the_status      = document.getElementById("Status1").value;
    all_tasks[idx].the_date        = document.getElementById("date1").value;
    all_tasks[idx].the_description = document.getElementById("Description1").value;

    createTask();

    $('#exampleModal1').modal('hide');
    document.getElementById("modal1").reset();
}

function deleteTask(id) {
    // Get index of task in the array
    for (let i = 0; i < all_tasks.length; i++)
    {
        if (all_tasks[i].id == id)
        {
            // Remove task from array by index splice function
            all_tasks.splice(i, 1);
        }
    }
    createTask();
}

function whatsPriority() {
    let new_type = document.querySelectorAll('input[Type="radio"]');
    let isTrue;
    
    for (let i = 0; i < new_type.length; i++) {
      if (new_type[i].checked) {
        isTrue = new_type[i].value;
      }
    }
    return (isTrue);
}
