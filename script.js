/*global image, loadImage*/

let img;
function preload() {
  img = loadImage('https://talkingbiznews.com/wp-content/uploads/2019/10/Google.jpg');
}
function setup() {
  // Top-left corner of the img is at (0, 0)
  // Width and height are the img's original width and height
  createCanvas(500,500)
  image(img, 0, 0);
}

function draw(){
  background(0)
  image(img, 0, 0);
}