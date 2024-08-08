const input = document.getElementById("inputToDo");
const select = document.querySelector("select");

// localde var mı?
let arrList = callLocal();

// sayfa yuklenince displayList()
window.onload = () => {
    displayList();    
}

// ilk olarak ekrana yazdır
function displayList(){
    if(arrList.length){
        document.querySelector(".bottom").style.display = "block";
        Array.from(document.querySelectorAll("ul")).map((item) => {
            document.getElementById(`${item.id}`).innerHTML = "";
            const items = arrList.filter(({days}) => days == item.id); // weekday ve weekend olarak iki ul var
            if(items.length){
                document.querySelector(`.${item.id}`).style.display = "block";
                arrList.forEach((myTask, index) => {
                    if(myTask.days == item.id){
                        let newLi = document.createElement("li");
                        newLi.classList.add("list-group-item", "d-flex");
                        newLi.id = `${myTask.id}`;
                        if(myTask.click){
                            newLi.classList.add("click");
                        }else{
                            newLi.classList.remove("click");
                        }
                        newLi.innerHTML =  `
                            <i class="bi bi-check-circle okey me-3 fs-3 mt-3"></i>
                            
                            <p style="margin-top: 1.2rem;">${myTask.task}</p>
                            
                            <div class="mt-2" style="margin-left: auto;">
                            <button class="btn delete-btn rounded-circle" onclick="deleteTask(${index})" style="width: 50px; height: 50px;">
                                <i class="bi bi-trash"></i>
                            </button>
                            </div>
                        `
                        document.getElementById(`${item.id}`).appendChild(newLi);
                    }
                })
            }else{
                document.querySelector(`.${item.id}`).style.display = "none";
            }
        })
    } else {
        document.querySelector(".bottom").style.display = "none";
    }

    updateLocalStorage();
    
    clickLi();
    
    // li ye cift tikla, edit
    document.querySelectorAll("li").forEach((li) => {
        li.addEventListener("dblclick", () => edit(li));
    })
}

// add
function addTask(){
    const days = select.value;
    const task = input.value.trim();
    
    if(days && task){
        const newTask = {
            task: task,
            days: days,
            id: new Date().getTime(),
            click: false
        }
        arrList.push(newTask);
        displayList();
        input.value = "";
        select.selectedIndex = 0;
        
    }
}

// deleteyi yap
function deleteTask(index){
    arrList.splice(index,1)
    displayList();
}

// enter ile add
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter"){
        addTask();
    }
})

// click olarak işaretle
function clickLi(){
    document.querySelectorAll(".okey").forEach((item) => {
        const parent = item.parentElement;
        item.onclick = () =>{
            arrList.map((todo, index, arrList) => {
                if(todo.id == parent.id){
                    if(parent.classList.contains("click")){
                        parent.classList.remove("click");
                        arrList[index].click = false;
                    }else{
                        parent.classList.add("click");
                        arrList[index].click = true;
                    }
                    updateLocalStorage();
                }
            })
        };
    })
}

// delete tusu ile click olanlari sil
document.addEventListener("keydown", (e) => {
    if(e.key == "Delete" && confirm("İşaretlediklerinizi silmek istiyor musunuz?")){
        arrList = arrList.filter((item) => item.click == false)
        updateLocalStorage();
        displayList();
    }
})


// edit
function edit(myItem){
    const currentElement = myItem.querySelector("p")

    const input = document.createElement('input');
    input.type = 'text';
    input.style.width = "650px";
    input.className = "form-control h-100 border-1 outline-0 me-2 mt-3 f-4";
    input.value = currentElement.textContent;

    myItem.replaceChild(input, currentElement);
    
    input.focus();

    // input a focus bitince editle
    input.addEventListener("blur", () =>{
        if(!(input.value == "")) {
            currentElement.textContent = input.value;
            myItem.replaceChild(currentElement, input);
        
            arrList.map((item, index, arrList) => {
                if(item.id == myItem.id){
                    arrList[index].task = input.value;
                }
            })
            displayList();
        }
    })

    // enter a basilinca editle
    document.onkeydown = (e) => {
        if (e.key == "Enter"){
            if(!(input.value == "")) {
                currentElement.textContent = input.value;
                myItem.replaceChild(currentElement, input);
                
                arrList.map((item, index, arrList) => {
                    if(item.id == myItem.id){
                        arrList[index].task = input.value;
                    }
                })
                displayList();
            }
        }
    }
}

// locale ekle
function updateLocalStorage(){
    localStorage.setItem("arrList", JSON.stringify(arrList));
}

//locali cagir
function callLocal() {
    return JSON.parse(localStorage.getItem("arrList")) || [];
}