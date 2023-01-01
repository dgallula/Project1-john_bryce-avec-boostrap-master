
var memos = [];

window.onload = function(){
    var mdate = document.getElementById('dateform')
    mdate.valueAsDate = new Date();
    mdate.min = new Date().toISOString().split("T")[0];
    if(JSON.parse(localStorage.getItem("notes")) === null){return}
    var strg_notes = localStorage.getItem("notes");
    memos = JSON.parse(strg_notes);
    for(var i=memos.length-1;i>=0;i--){
        UpdatePaper(i);
    }
}

function AddMemo() {
    if(!VerifInfo()){return}
    
    var mtitle = document.getElementById("titleform").value;
    var mnote = document.getElementById("noteform").value;
    var mdate = document.getElementById("dateform").value;
    var mtime = document.getElementById("timeform").value;
    mnote = mnote.replace(/\n\r?/g, '<br/>');
    var memo = `{"title":"${mtitle}", "note":"${mnote}", "date":"${mdate}", "time":"${mtime}"}`;
    memos.unshift(JSON.parse(memo));
    EnterLocalStr();
    ClearForm();
    UpdatePaper(0);
}

function EnterLocalStr(){
    var arr_notes = JSON.stringify(memos);
    localStorage.setItem("notes",arr_notes);
}

function UpdatePaper(indexmemos){
    var paperboard = document.getElementById("paperboard")
    var newpaper = document.createElement("div");
    newpaper.className = "paperc";
    newpaper.innerHTML = `<i class="far fa-times-circle fa-lg" onclick="DeletePaper(event)" title="Delete the task"></i>
                          <h5 class="titlepaper">${memos[indexmemos].title}</h5>
                          <div class="notepaper">${memos[indexmemos].note}</div>
                          <div class="datepaper">${memos[indexmemos].date.substring(8,10)}/${memos[indexmemos].date.substring(5,7)}/${memos[indexmemos].date.substring(0,4)}</div>
                          <div class="timepaper">${memos[indexmemos].time}</div>`
    paperboard.insertBefore(newpaper,paperboard.firstChild);
}

function ClearForm() {
    var mtitle = document.getElementById("titleform");
    mtitle.value="";
    mtitle.focus();
    document.getElementById("noteform").value = "";
    var mdate = document.getElementById('dateform');
    mdate.valueAsDate = new Date();
    mdate.min = new Date().toISOString().split("T")[0];
    document.getElementById("timeform").value = "";
}

function DeletePaper(e){
    var index = Array.from(e.target.parentElement.parentElement.children).indexOf(e.target.parentElement);
    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    memos.splice(index,1);
    EnterLocalStr();
}

function VerifInfo() {
    var mtitle = document.getElementById("titleform").value;
    var mnote = document.getElementById("noteform").value;
    var mdate = document.getElementById("dateform").value;
    var mtime = document.getElementById("timeform").value;
    var bufferverif = "";
    if (mtitle === "" && mnote === "") {
        bufferverif += "The task is empty";
    }
    if (mdate === "") {
        AddAnd();
        bufferverif += "the date is incorrect";
    }
    var datetime = "";
    if (mtime !== "") {
        datetime = "T" + mtime + ":59";
    }
    else {
        datetime = "T23:59:59";
    }
    if (new Date(mdate + datetime) < new Date()) {
        AddAnd();
        bufferverif += "the date has passed";
    }
    if (bufferverif !== "") {
        alert("ERROR: "+bufferverif);
        return 0
    }
    return 1
    function AddAnd() {
        if (bufferverif !== "") {
            bufferverif += " and ";
        }
    }
}