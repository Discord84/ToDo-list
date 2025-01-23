let plus = document.querySelector(".plus")
let minus = document.querySelector(".button-delete")
let task = document.querySelector(".task")
let container = document.querySelector(".task-container")
let input = document.querySelector(".input")
let list = localStorage.getItem("key")
if (list == null){
    list=[]
} else{
    list = JSON.parse(list)
}
function save (){
    localStorage.setItem("key",JSON.stringify(list))
}
function updateList (list){
    
    container.innerHTML=""
    list.map((task,index)=>{
        let check = task.lock ?"line":""
        container.innerHTML+=`
        <div class="task">
            <h2 class="comp ${check}" data-number=${index}><span class="number">${index+1}</span>${task.value}</h2>
            <img class="button-delete" data-number=${index} src="images/minus (2).png" alt="">
        </div>
        `
    })
}

function addTask (){
    console.log(input.value)
    if(input.value.length>3){
        list.push({
            lock:false,
            value:input.value
        }) 
    } else{
        return null
    }
    updateList(list)
    save()
}
function deleteTask (){
    container.addEventListener("click",(event)=>{
        if(event.target.classList.contains("button-delete")){
            list.splice(event.target.getAttribute("data-number"),1)
            updateList(list)
            save()
        }
    })
}

function complete (){
    container.addEventListener("click",(event)=>{
        if(event.target.classList.contains("comp")){
            list[event.target.getAttribute("data-number")].lock= !list[event.target.getAttribute("data-number")].lock
            updateList(list)
            save()
        }
    })
}



deleteTask()
updateList(list)
complete()
plus.addEventListener("click",addTask)


