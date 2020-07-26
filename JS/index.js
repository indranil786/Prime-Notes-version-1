console.log("Welcome to My Prime Notes");
showNotes();//calling showNotes to display at the first

//creating a new Node
let addnote = document.querySelector(".new-note");
addnote.addEventListener("click", function (e) {
  console.log("The Add button has been clicked");
  let titl = document.querySelector("#notes-title");
  let noteBody = document.querySelector("#notes-body");
  let nts = localStorage.getItem("notes");

  if (nts == null) {
    totalnotes = [];
  } else {
    totalnotes = JSON.parse(nts);
  }
  let ntsob = {
    title: titl.value,
    body: noteBody.value,
  };
  totalnotes.push(ntsob);
  localStorage.setItem("notes", JSON.stringify(totalnotes));
  titl.value = "";
  noteBody.value = "";
  console.log(totalnotes);
  showNotes();
});

//Displaying all the Notes
function showNotes() {
  let nts = localStorage.getItem("notes");
  if (nts === null) {
    //Try changing the name of the arrays
    totaln = [];
  } else {
    totaln = JSON.parse(nts);
  }
  let html = "";
  //Try using For loop
  for (let i = 0; i < totaln.length; i++) {
    html += `
        <div class="card allNotes col-md-3">
        <div class="card-body">
        <h5 class="card-title" id="title${i}">${totaln[i].title}</h5>              
        <p class="card-text" id="body${i}">${totaln[i].body}</p>
        <a class="btn btn-primary btn-sm" id="ed${i}" onclick="editNote(this.id)" style="text-align: center;color:white;">Edit</a>
        <a class="btn btn-primary btn-sm" id="${i}" onclick="deleteNote(this.id)" style="text-align: center;color:white;">Delete</a>
        </div>
        </div>`;
  }
  let newele = document.querySelector("#notesDisplayed");
  if (totaln.length != 0) {
    newele.innerHTML = html;
  } else newele.innerHTML = `<h4>No new notes to be displayed!</h4>`;
  
}
//Deleting a Note
function deleteNote(index) {
  console.log("Deleting Note no ", index);
  let nts = localStorage.getItem("notes");
  if (nts === null) {
    //Try changing the name of the arrays
    totaln = [];
  } else {
    totaln = JSON.parse(nts);
  }
  totaln.splice(Number(index), 1);
  localStorage.setItem("notes", JSON.stringify(totaln));
  showNotes();
}
//Editing a pre-existing Note
function editNote(i) {
  let index = Number(i.slice(2));
  let nts = localStorage.getItem("notes");
  if (nts === null) {
    //Try changing the name of the arrays
    totaln = [];
  } else {
    totaln = JSON.parse(nts);
  }
  let indextitle = document.querySelector(`#title${index}`);
  let indexbody = document.querySelector(`#body${index}`);
  
  let edit = document.querySelector(`#ed${index}`);
  
  let tvalue = indextitle.innerText;
  let bvalue = indexbody.innerText;
  
  let htm1 = document.createElement("input");
  htm1.className = "form-control";
  htm1.id = `titleNote${index}`;
  htm1.setAttribute("type", "text");
  htm1.setAttribute("value", `${tvalue}`);
  // `<input type="text" class="form-control" id="titleNote${index}" value="${tvalue}" required></input>`
  let htm2 = document.createElement("textarea");
  htm2.className = "form-control";
  htm2.id = `bodyNote${index}`;
  htm2.setAttribute("rows", "3");
  htm2.setAttribute("style", "margin:5px auto 8px;");
  htm2.innerText = `${bvalue}`;
  
  //`<textarea class="form-control" id="bodyNote${index}" rows="2" value="${bvalue}"required ></textarea>`
  let save = document.createElement("a");
  save.className = "btn btn-primary btn-sm";
  save.id = `sv${index}`;
  save.innerHTML = "Save";
  save.setAttribute("style", "color:white;");
  
  //`<a class="btn btn-primary btn-sm" id="sv${index}" style="text-align: center;color:white;">Save</a>`
  indextitle.replaceWith(htm1);
  indexbody.replaceWith(htm2);
  edit.replaceWith(save);
  let saveClick = document.querySelector(`#sv${index}`);

  
  saveClick.addEventListener("click", function (e) {
    let chtitle = document.querySelector(`#titleNote${index}`);
    let chbody = document.querySelector(`#bodyNote${index}`);
    totaln[index].title = chtitle.value;
    
    totaln[index].body = chbody.value;
    localStorage.setItem("notes", JSON.stringify(totaln));
    indextitle.value = chtitle.value;
    
    indexbody.innerHTML = chbody.value;
    htm1.replaceWith(indextitle);
    htm2.replaceWith(indexbody);
    save.replaceWith(edit);
    
    showNotes();
  });
}


    
    let itemele = document.querySelector("#searchData");
  itemele.addEventListener("input", function () {
    item = itemele.value.toLowerCase();
    let allnotes = Array.from(document.querySelectorAll(".allNotes"));
    let count=0;

    for (let i = 0; i < allnotes.length; i++) {
      let note = allnotes[i].firstElementChild.children;
      let title = note[0].innerText.toLowerCase();
      let body = note[1].innerText.toLowerCase();

      if (title.includes(item) || body.includes(item)) {
        allnotes[i].style.display = "block";
        flag = 1;
        count=0;
      } else {
        allnotes[i].style.display = "none";
        flag=0        
      }     
      
    }
    

  });
  