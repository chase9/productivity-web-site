var addTaskButton = document.getElementById('new-task');
var addListButton = document.getElementById('new-list');
var taskListDropdown = document.getElementById('list-select');
var tasklistHeaders = document.getElementsByClassName('task-list-header');
var tasklists = document.getElementsByClassName('task-list');
var prompt = document.getElementById('prompt');
var dateForm = document.getElementById('date-form');
var closeButton = document.getElementById('close');
var colorForm = document.getElementById('color-form');
var container = document.getElementById('container');

var submitType = "";

// Check if the user's browser supports date and color inputs
try {
    var input = document.createElement("input");
    input.type = "time";
    if (input.type !== "time") {
        alert("Your browser doesn't appear to support time inputs. Your experience will be diminished.");
    }

    input.type = "color";
    if (input.type !== "color") {
        alert("Your browser doesn't appear to support color inputs. Your experience will be diminished.");
    }
} catch (e) {
    alert("Your browser doesn't support HTML5 inputs. Please upgrade to a modern browser.");
}

// Load tasks if nothing's on the page
if (container.childNodes.length <= 1) {
    loadTasks();
}

// Add event listeners to single buttons
addListButton.addEventListener("click", addList);
addTaskButton.addEventListener("click", addTask);
closeButton.addEventListener("click", close);
updateDropdown();

document.addEventListener("keypress", function (ev) {
    if (ev.keyCode === 27) {
        close();
    }
});

function updateDropdown() {
    taskListDropdown.innerHTML = "";
    for (var i = 0; i < tasklistHeaders.length; i++) {
        var listTitle = tasklistHeaders[i].innerText;
        taskListDropdown.innerHTML += "<option value='" + listTitle + "'>" + listTitle + " </option>"
    }
}

function deleteList(ev) {
    if (confirm("Are you sure you want to delete the list?")) {
        container.removeChild(ev.parentNode);
        saveTasks();
    }
}

function deleteTask(ev) {
    if (confirm("Are you sure you want to remove the task?")) {
        ev.parentNode.parentNode.removeChild(ev.parentNode);
        saveTasks();
    }
}

function toggleTask(ev) {
    if (ev.childNodes[2].style.visibility === "hidden") {
        ev.childNodes[2].style.visibility = "visible";
    } else {
        ev.childNodes[2].style.visibility = "hidden";
    }
    saveTasks();
}

function addList() {
    prompt.style.visibility = "visible";
    prompt.style.opacity = "1";
    taskListDropdown.style.display = "none";
    dateForm.style.display = "none";
    colorForm.style.display = "inline";
    submitType = "list";
}

function addTask() {
    prompt.style.visibility = "visible";
    prompt.style.opacity = "1";
    dateForm.style.display = "block";
    taskListDropdown.style.display = "inline";
    colorForm.style.display = "none";
    submitType = "task";
}

function close() {
    prompt.style.visibility = "hidden";
    prompt.style.opacity = "0";
}

function submit() {
    var title = document.getElementById('title').value;
    if (submitType === "task") {
        var date = document.getElementById('date').value;

        tasklists[taskListDropdown.selectedIndex].innerHTML +=
            "<div class='task' onclick='toggleTask(event.target)'>" +
            "<h3>" + title + "</h3>" +
            "<p>" + date + "</p>" +
            "<span class='check' style='visibility: hidden'>&#10004;</span>" +
            "<span onclick='deleteTask(event.target)' class='close'>×</span>" +
            "</div>"
    } else if (submitType === "list") {
        var color = document.getElementById('color').value;
        container.innerHTML += "<div class='task-list' style='background-color: " + color + "'><span onclick='deleteList(event.target)' class='close'>&times;</span><h2 class='task-list-header'>" + title + "</h2></div>";
        updateDropdown();
    } else {
        console.error("Unexpected submit type: " + submitType);
    }
    saveTasks();
    close();
}

function saveTasks() {
    localStorage.setItem("container", container.innerHTML);
    console.log("Saved");
}

function loadTasks() {
    var loadedData = localStorage.getItem("container");

    if (loadedData === null || loadedData.trim() === "") {
        container.innerHTML += "<div class='task-list' style='background-color: green'><span onclick='deleteList(event.target)' class='close'>&times;</span><h2 class='task-list-header'>Reminders</h2>" +
            "<div class='task' onclick='toggleTask(event.target)'>" +
            "<h3>Complete this project!</h3>" +
            "<p>2018-02-28</p>" +
            "<span class='check'>✔</span>" +
            "<span onclick='deleteTask(event.target)' class='close'>×</span>" +
            "</div>" +
            "</div>";
        console.log("Loaded sample data");
    } else {
        container.innerHTML = loadedData;
        console.log("Loaded");
    }
}