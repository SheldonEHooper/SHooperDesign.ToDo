var enterBut = document.getElementById("enter");
var listInput = document.getElementById("userInput");
var ul = document.querySelector("ul");
var itemList = [];
var div = document.querySelector("div");

//checking input length
function inputLength() {
    return listInput.value.length;
}

//checking if the input already exists or not
function exists() {
    for (var i = 0; i < itemList.length; i++) {
        if (listInput.value === itemList[i]) {
            alert("This item already exisits!");
            return false;
        }
    }
    return true;
}

//deletes the item triggered by the delete button linked to its list id
function deleteItem(item) {
    var itemToDel = document.getElementById(item);
    ul.removeChild(itemToDel);
    var index = itemList.indexOf(item);
    if (index > -1) {
        itemList.splice(index, 1);
    }
}

//Creating the list element and its associated delete button
function createListElement() {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", listInput.value);
    ul.appendChild(newDiv);

    var newLi = document.createElement("li");
    newLi.appendChild(document.createTextNode(listInput.value));
    newLi.setAttribute("id", "li" + listInput.value);
    newDiv.appendChild(newLi);
    itemList = itemList.concat(listInput.value);

    var newDelBut = document.createElement("button");
    newDelBut.appendChild(document.createTextNode("X"));
    newDelBut.setAttribute("class", "delBut");
    newDelBut.setAttribute("onClick", "deleteItem(\"" + listInput.value + "\")");
    newDiv.appendChild(newDelBut);

    listInput.value = "";

}

function addListAfterClick() {
    if (exists()) {
        if (inputLength() > 0) {
            createListElement();
        } else {
            alert("Please enter an item");
            listInput.value = "";
        }
    } else {
        listInput.value = "";
    }
}

function addListAfterKeyPress(event) {
    if (exists()) {
        if (inputLength() > 0 && event.keyCode === 13) {
            createListElement();
        } else if (event.keyCode === 13) {
            alert("Please enter an item");
            listInput.value = "";
        }
    } else {
        listInput.value = "";
    }

}

//listens for global clicks and if the id starts with li then it toggles the done task
function liClickListener(event) {
    var elemClicked = event.target;
    var idClicked = elemClicked.getAttribute("id").substring(0, 2);
    if (idClicked === "li") {
        elemClicked.classList.toggle("done");
    }


}

enterBut.addEventListener("click", addListAfterClick);
listInput.addEventListener("keypress", addListAfterKeyPress);
document.addEventListener("click", liClickListener);