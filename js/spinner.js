 $(window).on('load', function () { // makes sure the whole site is loaded
   $('#status').fadeOut(); // will first fade out the loading animation 
   $('#loader').delay(350).fadeOut('slow'); // will fade out the DIV that covers the website. 
   //  $('body').delay(350).css({'overflow': 'visible'}); // If body has overflow: hidden
 });

 //=============================================================
 function addSpinner() {
   $('#loader').fadeIn();
   $('#status').fadeIn();
 };

 //=============================================================
 function removeSpinner() {
   $('#status').fadeOut();
   $('#loader').delay(350).fadeOut('slow');
 };