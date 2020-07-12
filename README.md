softpaint: features
=================


### image linker

Paste in a link to an image to paint. Some websites don't allow their images to be retrieved, so your painting will reveal a black background.  

### random painting

Retrieves a random image to paint from picsum.photos. The image takes a second to load, so if you start painting too fast you'll see black, which you can paint over.

### scroll wheel brush size

Scrolling up and down decreases or increases the diameter of the brush.

### colour averaging & blending

For a more realistic and artistic painting experience, we averaged the RGBA values between pixels using [this method](https://sighack.com/post/averaging-rgb-colors-the-right-way). 
We also layered several strokes with different widths and low alpha values to create the watercolor effect.

### features in progress
- speed-based ellipse transformations
- upload from device (move save button to bottom, new top row -> Link | Upload | Random)
- responsive resizing of uploaded or linked images
- fetch images from Unsplash using "sig=" instead of Picsum
- display "tap canvas to start" only on mobile



-------------------

made by Sophie Liu & Jason Alvarez