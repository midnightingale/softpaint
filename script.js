/* global createCanvas, colorMode, HSB, background loadImage image resizeCanvas*/
let imgDimensions = { w: 640, h: 329 };
let userUrl =
  "https://cdn.glitch.com/f979082c-4790-4538-b5e9-dcd548a7bef6%2Fgoogle-background-1467806874.jpg?v=1594410010295";
let displayImg;

function preload() {
  displayImg = loadImage(userUrl);
}

function setup() {
  createCanvas(imgDimensions.w, imgDimensions.h);
  colorMode(HSB, 360, 100, 100);
  image(displayImg, 0, 0);
}

function draw() {
  image(displayImg, 0, 0);
}

function getDimensions(url) {
  let userImage = new Image();
  userImage.src = url;
  return new Promise((resolve, reject) => {
    userImage.onload = function() {
      imgDimensions.w = this.width;
      imgDimensions.h = this.height;
      console.log(imgDimensions, "promiseresolved");
      resolve();
    };
  });
}

async function userUpload() {
  userUrl = window.prompt("Enter an image URL:");
  await getDimensions(userUrl);
  resizeCanvas(imgDimensions.w, imgDimensions.h);
  displayImg = loadImage(userUrl);
}
