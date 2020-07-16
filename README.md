softpaint: features
=================


### image linker

Paste in a link to an image to paint. Some websites don't allow their images to be retrieved, so your painting will reveal a black background.  

### random painting

Retrieves a random image to paint from picsum.photos. 

### scroll wheel brush size

Scrolling up and down or using the slider changes the diameter of the brush.

### colour averaging & blending

For a more realistic and artistic painting experience, I averaged the RGBA values between pixels using [this method](https://sighack.com/post/averaging-rgb-colors-the-right-way). 
I also layered several strokes with different widths and low alpha values to create the watercolor effect.

### speed-based ellipse transformations
p5's transform(), rotate(), and Math.atan2() are used to calculate the mouse angle and rotate the brush to match.
Also, faster strokes create thinner ellipses!

### image upload and sizing
Images are dynamically sized based on the user's screen

### features in progress
☒ upload image from device  
☒ responsive resizing of uploaded or linked images  
☒ fetch images from Unsplash instead of Picsum  
☒ display "touch to start" for mobile  
☒ fix source link wrong redirect on double click
☐ update README with gifs :)

-------------------

made by Sophie Liu
