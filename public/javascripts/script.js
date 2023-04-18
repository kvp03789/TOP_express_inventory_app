
const formContainer = document.querySelector(".form-container")
const addButton = document.querySelector(".create-new-item-button")
const deleteItemButton = document.querySelector(".delete-container")
const npcImage = document.querySelectorAll(".nameplate")
const newNpcButton = document.querySelector(".add-new-npc")
const npcForm = document.querySelector(".npc-form-container")
const npcPlus = document.querySelector(".npc-plus-img")

npcImage.forEach(ele =>{
    ele.addEventListener("click", (e) => {
        let clickContainer;
        if(e.target === document.querySelector(".npc-image") || e.target === document.querySelector(".nameplate-border")){
        clickContainer = e.target.parentElement}
        else {
            clickContainer = e.target
        }
        console.log(clickContainer)
        if(clickContainer.nextElementSibling.classList.contains("hidden"))
            clickContainer.nextElementSibling.classList.remove("hidden")
        else{
            clickContainer.nextElementSibling.classList.add("hidden")
        }
    })
})

newNpcButton.addEventListener("click", () => {
    if(npcForm.classList.contains("hidden")){
            npcForm.classList.remove("hidden")
            npcPlus.classList.add("rotate90")
    }
    else{
        npcForm.classList.add("hidden")
        npcPlus.classList.remove("rotate90")
    }
})

addButton.addEventListener("click", () => {
    if(formContainer.classList.contains("hidden")){
        formContainer.classList.remove("hidden")
    } else {
        formContainer.classList.add("hidden")
    }
})

deleteItemButton.addEventListener("click", (e) => {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    deleteHandler(e)
    
})

function deleteHandler(event) {
    event.stopPropagation();
    console.log("stoppppppped")
}



//FOR SCROLLING
const container = document.querySelector(".container-tabs")
let firstTab = 0;
const tabs = document.querySelectorAll(".dynamic-tabs")
const arrows = document.querySelectorAll(".arrows")
const left = document.querySelector("#left");
const right= document.querySelector("#right")

if(left !== null && right !== null){
    container.addEventListener("mouseenter", () => {
        console.log("mouse enteredefa")
        left.classList.remove("hidden")
        right.classList.remove("hidden")
    })

    container.addEventListener("mouseleave", () => {
        console.log("mouse  leaveeee")
        left.classList.add("hidden")
        right.classList.add("hidden")
    })

    left.addEventListener("click", (e) => {
        const parentContainer = document.querySelector(".container-tabs");
        
        tabs.forEach(tab => {
            tab.remove();
        })

        if(firstTab > 0){
            firstTab--;
        }

        for(let i = firstTab; i < firstTab + 3; i++){
            parentContainer.append(tabs[i])
        }
    })

    right.addEventListener("click", (e) => {
        const parentContainer = document.querySelector(".container-tabs");
        const lastFirstTabIndex = tabs.length-3;
        console.log(tabs.length)
        
        tabs.forEach(tab => {
            tab.remove();
        })

        if(firstTab !== lastFirstTabIndex){
            firstTab++;
        }

        for(let i = firstTab; i < firstTab + 3; i++){
            parentContainer.append(tabs[i])
        }
    })
}
