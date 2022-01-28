// Variable declarations
let today = moment();
let currentHr = parseInt(today.format("H"));
let headerDate = today.format("dddd, MMMM Do");
let saveDate = today.format("L");
let timeBlockEl = $(".time-block");
let timeBlockId = timeBlockEl.attr("id");
let timeBlockHr = parseInt(timeBlockId);
let saveBtnEl = $(".saveBtn");

/* 
Function that colors time blocks by giving a time block a specific class
depending on if the time block is before, after, or within the current hour
*/
function timeBlockStyle() {
    timeBlockEl.each(function () {
        // Use "this" so that it works for each block in the container
        timeBlockHr = parseInt($(this).attr("id"));
        // First we remove every class
        $(this).removeClass("past future present");
        // Then add the class to each block accordingly
        if (currentHr > timeBlockHr) {
            $(this).addClass("past");
        } else if (currentHr < timeBlockHr) {
            $(this).addClass("future");
        } else {
            $(this).addClass("present");
        }
    });
}

// Function for saving data in the text area in each time block
function saveText(event) {
    // Redefine timeBlockId so that it refers to the time block the save button is in
    let timeBlockId = $(this).parent().attr("id");
    let textAreaContent = $('#' + timeBlockId + " textarea").val()
    // This sets a unique key for each time block while also saving the contents of the text area
    // Key is unique to that day, meaning that a day later, the area will be empty again
    localStorage.setItem(saveDate + "-" + timeBlockId, textAreaContent);
}

// Function for loading data in the text area in each time block
function loadText() {
    timeBlockEl.each(function () {
        // Redefine timeBlockId to use "this" so that it refers to each time block in this function properly
        let timeBlockId = $(this).attr("id");
        let textArea = $('#' + timeBlockId + " textarea");
        // Key will change every day because we are using Moment.js. Yesterday's saved data will not show
        textArea.text(localStorage.getItem(saveDate + "-" + timeBlockId));
    });
}

// Display time in the jumbotron
$("#currentDay").text(headerDate);

// Call functions and event handlers
timeBlockStyle();
loadText();
saveBtnEl.on("click", saveText);

