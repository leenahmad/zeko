const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 60;
canvas.height = 600; 


let ctx = canvas.getContext("2d");
let start_background_color = "white";
ctx.fillStyle = start_background_color;
ctx.fillRect(0, 0 , canvas.width, canvas.height);

// previous mouse positions
// They will be null initially
let prevX = null
let prevY = null

// How thick the lines should be
// ctx.lineWidth = 5
// mouse and touch 
let draw = false


let draw_color= "black";
let draw_width = "2"; 
// let is_drawing = false;

let restore_array = [];
let index = -1;

function change_color(element){
    draw_color = element.style.background;
}

//range 
const sizeElement = document.querySelector("#sizeRange");
let size = sizeElement.value;
sizeElement.oninput = (e) => {
  size = e.target.value;
};


//choose color 
// Selecting all the div that has a class of clr
let clrs = document.querySelectorAll(".color-field")
// Converting NodeList to Array
clrs = Array.from(clrs)

clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr
    })
})

// Set draw to true when mouse is pressed
window.addEventListener("mousedown", (e) => draw = true)
// Set draw to false when mouse is released
window.addEventListener("mouseup", (e) => draw = false)

window.addEventListener("mousemove", (e) => {
    // if draw is false then we won't draw
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX  
        prevY = e.clientY 
        return
    }

    let currentX = e.clientX 
    let currentY = e.clientY 
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = draw_color;
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    prevX = currentX
    prevY = currentY
})

window.addEventListener("touchdown", (e) => draw = true)
// Set draw to false when touch is released
window.addEventListener("touchup", (e) => draw = false)

window.addEventListener("touchmove", (e) => {
    // if draw is false then we won't draw
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX
        prevY = e.clientY
        return
    }

    let currentX = e.clientX
    let currentY = e.clientY
    ctx.linewidth = draw_width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = draw_color;
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    prevX = currentX
    prevY = currentY
})




function upload(){
    var fileinput = document.getElementById("finput");
    var image = new SimpleImage(fileinput);
    var canvas = document.getElementById("canvas");
    image.drawTo(canvas);
  }

  function clear_canvas(){

    ctx.fillStyle = start_background_color;
    ctx.clearRect(0 , 0 , canvas.width, canvas.height);
    ctx.fillRect(0 , 0 , canvas.width, canvas.height);

    restore_array = [];
    index = -1;
}

function undo_last(){
  
    if(index <= 0){
        clear_canvas();
    }else{
        index -= 1;
        restore_array.pop();
        ctx.putImageData(restore_array[index] , 0 ,0);
    }



}


