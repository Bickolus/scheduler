let today = moment();
let currentHr = parseInt(today.format("H"));
let headerDate = today.format("dddd, MMMM do");
let saveDate = today.format("DDDMMYYYY");
let timeBlockEl = $(".time-block");
let timeBlockId = timeBlockEl.attr("id");
let timeBlockHr = parseInt(timeBlockId.replace("block-",""));
let saveBtnEl = $(".saveBtn");

/* 
Function that colors time blocks by giving a time block a specific class
depending on if the time block is before, after, or within the current hour
*/
function timeBlockStyle() {
    timeBlockEl.each(function () {
        timeBlockEl.removeClass("past future present");
        if (currentHr > timeBlockHr) {
            timeBlockEl.addClass("past");
        } else if (currentHr < timeBlockHr) {
            timeBlockEl.addClass("future");
        } else {
            timeBlockEl.addClass("present");
        }
    });
}

// Function for saving data in the textrea in each time block
function saveText(event) {
    let btnParentId = saveBtnEl.parent().attr("id");
    let textAreaContent = $('#' + btnParentId + " textarea").val()
    // this sets a unique key for each time block while also saving the contents of the text area
    localStorage.setItem(saveDate + btnParentId, textAreaContent);
}

// Function for time displayed in the jumbotron
$("#currentDay").text(headerDate);

timeBlockStyle();

