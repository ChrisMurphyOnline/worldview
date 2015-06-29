/*
 * NASA Worldview
 *
 * This code was originally developed at NASA/Goddard Space Flight Center for
 * the Earth Science Data and Information System (ESDIS) project.
 *
 * Copyright (C) 2013 - 2014 United States Government as represented by the
 * Administrator of the National Aeronautics and Space Administration.
 * All Rights Reserved.
 *
 * Licensed under the NASA Open Source Agreement, Version 1.3
 * http://opensource.gsfc.nasa.gov/nosa.php
 */
 var wv = wv || {};
 wv.date = wv.date || {};

 wv.date.anim = wv.date.anim || function(model, ui, options) {

     options = options || {};
     var self = {};

     self.days = 0; //keep track of how many days to animate
     self.delay = options.delay || 500;
     self.direction = "forward";
     self.interval = options.interval || "day";
     self.delta = options.delta || 1;
     self.active = false;
     var expired = false;
     var timer;

     var init = function() {
     };

     self.play = function(direction) {
         if ( self.active && direction !== self.direction ) {
             self.stop();
         } else if ( self.active ) {
             return;
         }
         notify("play");
         self.direction = direction || self.direction;
         self.active = true;
         prepareFrame();
     };

     self.forward = function() {
         self.play("forward");
     };

     self.reverse = function() {
         self.play("reverse");
     };

     self.stop = function() {
         if ( self.active ) {
             notify("stop");
             self.days = 0; //always reset the number of days animated to 0 to avoid issues
             animDuration = 0;
             doAnimation = false;
             self.delay = 500;
             loop = false;
             if (timer) {
                 clearTimeout(timer);
                 timer = null;
             }
             self.active = false;
         }
     };

     var prepareFrame = function() {
         if ( !self.active ) 
             return;
         
         notify("prepare", self);
         var amount = ( self.direction === "forward" ) ?
                 self.delta : -self.delta;
         var newDate = wv.util.dateAdd(model.selected, self.interval, amount);
         ui.preload(newDate);

         //control animation if enabled. set before next imagery load
         if(doAnimation) self.days++;

         //if custom animation, change delay here
         self.delay = doAnimation ? animSpeed : self.delay;

         timer = setTimeout(function() { //this function is called once either after 500 ms or animation delay
             advance(newDate);
         }, self.delay);
     };

     var stopAnimation = function() {
         if(loop) { //repeat animation by resetting days and calling play. direction is retained
             notify("looping");
             var amount = ( self.direction === "forward" ) ? self.delta : -self.delta; //determine if set date by -1 or +1
             model.selected = new Date(new Date(initDate).setUTCDate(initDate.getUTCDate() - amount) ); //set the correct date. Make new objects to avoid modifying existing ones
             self.days = -2; //need to start at -2 to animate same number of days
             self.play(self.direction);
         } else { //stop animation normally
             self.stop();
         }
     };

     var advance = function(newDate) {
         notify("advance");
         var updated = model.select(newDate);

         //determine if animation should stop
         if(doAnimation && self.days >= animDuration - 1 )
             stopAnimation();

         //determine if we can continue
         if(!updated)
            stopAnimation();
         else
            prepareFrame();
     };

     var notify = ( options.debug ) ? console.log : function() {};

     init();
     return self;
 };
