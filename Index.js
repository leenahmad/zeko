const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 60;
canvas.height = 600; 


let context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0 , canvas.width, canvas.height);



let draw_color= "black";
let draw_width = "2"; 
let is_drawing = false;

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);


canvas.addEventlistener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventlistener("mouseout", stop, false);

function start(event) {
    is_drawing= true;
    context.beginPath();
    context.moveTo(event.clientx - canvas.offsetLeft,
                  event.clientY - canvas.offsetTop);
    event.preventDefault();            
    
}

function draw(event) {
    if ( is_drawing ) {
         context.lineTo(event.clientx - canvas.offsetLeft,
                         event.clientY - canvas.offsetTop);
         context.strokeStyle = draw_color;
         context.linewidth = draw_width;
         context.lineCap = "round";
         context.lineJoin = "round";
         context.stroke();
         } 
         event.preventDefault();
        }


function stop(event) {        
    if ( is_drawing) {
            context.stroke();
            context.closePath();
            is_drawing = false;
    }
    event.preventDefault();
}

function upload(){
    var fileinput = document.getElementById("finput");
    var image = new SimpleImage(fileinput);
    var canvas = document.getElementById("canvas");
    image.drawTo(canvas);
  }
