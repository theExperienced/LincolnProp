////////SIZING VIDEO TO CUT OUT BLACK BARS

// $(document).ready(function(){
//     sizeTheVideo();
//     $(window).resize(function(){
//       sizeTheVideo();
//     });  
//   });
  
//   function sizeTheVideo(){
//     // - 1.78 is the aspect ratio of the video
//   // - This will work if your video is 1920 x 1080
//   // - To find this value divide the video's native width by the height eg 1920/1080 = 1.78
//     var aspectRatio = 1.78;
    
//       var video = $('#videoWithJs iframe');
//       var videoHeight = video.outerHeight();
//       var newWidth = videoHeight*aspectRatio;
//           var halfNewWidth = newWidth/2;
      
//     //Define the new width and centrally align the iframe
//     video.css({"width":newWidth+"px","left":"50%","margin-left":"-"+halfNewWidth+"px"});
//   }


// document.querySelectorAll('.contact__input').forEach(input => {
//     input.addEventListener('click', () => {
//         console.log(input, input.value)
//     })
// });

document.querySelectorAll('.header__perk').forEach(perk => {
console.log("🚀 ~ file: index.js ~ line 33 ~ document.querySelectorAll ~ perk", perk)
    
    VanillaTilt.init(perk, {
        reverse:                false,  // reverse the tilt direction
        max:                    15,     // max tilt rotation (degrees)
        startX:                 0,      // the starting tilt on the X axis, in degrees.
        startY:                 0,      // the starting tilt on the Y axis, in degrees.
        perspective:            1000,   // Transform perspective, the lower the more extreme the tilt gets.
        scale:                  1.1,      // 2 = 200%, 1.5 = 150%, etc..
        speed:                  100,    // Speed of the enter/exit transition
        transition:             true,   // Set a transition on enter/exit.
        axis:                   null,   // What axis should be disabled. Can be X or Y.
        reset:                  true ,   // If the tilt effect has to be reset on exit.
        easing:                 "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
        glare:                  true  , // if it should have a "glare" effect
        "max-glare":            .8,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
        "glare-prerender":      false,  // false = VanillaTilt creates the glare elements for you, otherwise
                                        // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
        "mouse-event-element":  null,    // css-selector or link to HTML-element what will be listen mouse events
                                        // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
        gyroscope:              true,    // Boolean to enable/disable device orientation detection,
        gyroscopeMinAngleX:     -45 ,    // This is the bottom limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the left border of the element;
        gyroscopeMaxAngleX:     45 ,     // This is the top limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the right border of the element;
        gyroscopeMinAngleY:     -45 ,    // This is the bottom limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the top border of the element;
        gyroscopeMaxAngleY:     45  ,    // This is the top limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the bottom border of the element;
    })
})