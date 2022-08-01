let addbtn = document.getElementById("addBtn");
showNotes();
addbtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  addTxt.value = "";
  console.log(notesObj);
  showNotes();
});

// fucntion for showing notes from localStorage
function showNotes(ele) {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
      <div class="my-2 mx-2 card" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">Note ${index + 1}</h5>
                <p class="card-text">${element}</p>
                <button id = "${index}"  onclick = "deleteNote(this.id)" class="btn btn-danger">Delete Note </button>
              </div>
          </div>
      `;
  });
  let display = document.getElementById("notes");
  if (notesObj.length != 0) {
    display.innerHTML = html;
  } else {
    display.innerHTML = `Nothing to show. No notes added 😔, Use the Add notes section to add notes.`;
  }
}

// function to delete notes
function deleteNote(index) {
  console.log("deleting the note", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  
  let inputVal = search.value.toLowerCase();
  console.log("input event fired..", inputVal);
  let noteCard = document.getElementsByClassName("card");
  Array.from(noteCard).forEach(function (ele) {
    let cardTxt = ele.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      ele.style.display = "block";
    } else {
      ele.style.display = "none";
    }
  });
});
