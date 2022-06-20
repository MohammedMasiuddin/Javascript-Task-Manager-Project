
var allTasksArr = [];

function setDataInTable() {
    let tbl = document.getElementById("userTasks");
    for (let index = 0; index < allTasksArr.length; index++) {
        const element = allTasksArr[index];
        let row = tbl.insertRow(-1);

        for (let colIndex = 0; colIndex < 9; colIndex++) {
            var cell = row.insertCell(-1);
            switch (colIndex) {
                case 0:
                    cell.innerHTML = element.id;
                    break;
                case 1:
                    cell.innerHTML = element.name;
                    break;
                case 2:
                    cell.innerHTML = element.description;
                    break;
                case 3:
                    let startDate = getDisplayableDateFromTimestamp(element.startDate);
                    cell.innerHTML = startDate.includes("NaN") ? "" : startDate
                    break;
                case 4:
                    let endDate = getDisplayableDateFromTimestamp(element.endDate);
                    cell.innerHTML = endDate.includes("NaN") ? "" : endDate
                    break;
                case 5:
                    cell.innerHTML = element.hourlyRate;
                    break;
                case 6:
                    cell.innerHTML = element.totalHours;
                    break;
                case 7:
                    var checkbox = document.createElement('input');
                    checkbox.type = "checkbox";
                    checkbox.name = "name";
                    checkbox.value = "value";
                    checkbox.id = "checkBox" + element.id;
                    checkbox.onclick = function () {
                        // set that this task is completed in db
                        window.updateTaskStatus(checkbox.checked ? true : false, element.id)
                    };
                    if (element.status == "Completed") {
                        checkbox.checked = true;
                    } else {
                        checkbox.checked = false;
                    }
                    cell.appendChild(checkbox);
                    break;
                case 8:
                    var txtArea = document.createElement('input');
                    txtArea.type = "textarea";
                    txtArea.name = "hrsWorked";
                    txtArea.id = "txt" + element.id;
                    cell.appendChild(txtArea);
                    break;
                default:
                    break;
            }
        }
    }
}

function getDisplayableDateFromTimestamp(param) {
    var date = new Date(param);
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
}
