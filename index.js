let notstarted = document.getElementById("notstarted");
let inprogress = document.getElementById("inprogress");
let completet = document.getElementById("completed");
let add = document.getElementById("add");
let textField = document.getElementById("Textfield");
let removeAll = document.getElementById("removeAll");

let notstartedValue = localStorage.getItem("notstarted");
let inprogressValue = localStorage.getItem("inprogress");
let completedValue = localStorage.getItem("completed");

removeAll.onclick = function(){removeall()};

console.log(localStorage.getItem("notstarted"));

let notstartedArray = notstartedValue.split("\n");
let inprogressArray = inprogressValue.split("\n");
let completedArray = completedValue.split("\n");
notstartedArray.shift();
inprogressArray.shift();
completedArray.shift();
notstartedArray.forEach(function(element){
    genearte(element, notstarted);
})
inprogressArray.forEach(function(element){
    genearte(element, inprogress);
})
completedArray.forEach(function(element){
    textField.value = "";
    let newdiv = document.createElement("div");
    newdiv.style.textAlign = "middle";
    let label = document.createElement("label");
    label.style.fontSize = "18px";
    label.appendChild(document.createTextNode(element));
    newdiv.appendChild(label);
    completet.append(newdiv);


})
function removeall(){
    localStorage.setItem("notstarted","");
    localStorage.setItem("inprogress","");
    localStorage.setItem("completed","");
    location.reload();
}

add.onclick = function(){
    let content = textField.value;
    let div = genearte(content,notstarted);
    localStorage.setItem("notstarted",localStorage.getItem("notstarted") + "\n" + div.querySelector("label").textContent);
    console.log(localStorage.getItem("notstarted"));
}
function remov(text, localStorag){
    let content = localStorage.getItem(localStorag);
    let contentArray = content.split("\n");
    console.log(contentArray);
    contentArray = contentArray.filter(function(element2){
        return element2 !== text; 
    });
    console.log(contentArray);
    let newContent;
    contentArray.forEach(function(element){
        newContent += element + "\n";
    });
    console.log(newContent);
    localStorage.setItem(localStorag,newContent);
}

function genearte(content, div){
    if(content != ""){
    textField.value = "";
    let newdiv = document.createElement("div");
    newdiv.style.textAlign = "middle";
    let checkbox = document.createElement("input");
    checkbox.addEventListener("change", change);
    checkbox.type = "checkbox";
    let label = document.createElement("label");
    label.style.fontSize = "18px";
    label.appendChild(document.createTextNode(content));
    newdiv.appendChild(checkbox);
    newdiv.appendChild(label);
    div.append(newdiv);
    return newdiv;
    }
}

function change(event){
    let box = event.target;
    let div = box.parentNode;
    console.log(div);
    setTimeout(function(){
        console.log(div.parentNode);
        let parent = div.parentNode;
        if(!parent.id == "completed")
        {
            div.parentNode.removeChild(div);
        }
        if(parent.id == "notstarted"){
            let x = div.querySelector("label").textContent;
            remov(x,"notstarted");
            inprogress.appendChild(div);
            localStorage.setItem("inprogress",localStorage.getItem("inprogress")+ "\n" + div.querySelector("label").textContent);
            box.checked = false;
        } else if(parent.id == "inprogress"){
            let input = div.querySelector("input");
            let y = div.querySelector("label").textContent;
            remov(y,"inprogress");
            localStorage.setItem("completed",localStorage.getItem("completed")+ "\n" + div.querySelector("label").textContent);
            div.removeChild(input);
            completet.appendChild(div);
            box.checked = false;
        } 
        console.log(localStorage.getItem("inprogress"));
        console.log(localStorage.getItem("completed"));
        
        
    },1000)
    
}