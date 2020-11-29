// The background script runs once (on installation or startup), while the content script runs with each new page

// In order to use Jquery, put it first in the array for scripts in manifest.json

$( document ).ready(function() {
    console.log( "ready! in content" );
    /*
    I can..
    A. Put something on the global window obj, make the popup script send a message (via runtime) and this script (or background) can send something back)
    B. Put something in localstorage and make popup.js check if (periodically)
    C. Do nothing, except for a simple check which checks if page is ready when this script gets the order to gather page data below
    */
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    // debugger;
    // alert('hey CONTENT 1 got something');
    console.log('hey CONTENT 1 got something')

        var x = document.getElementsByTagName("body");
        x = x[0].innerHTML;
        var myElement = document.getElementsByClassName("pipeline-node-581"); // for some reason, my vars lose it's HTML data when it transfers over to another script
        // debugger;

        sendResponse(
            {
                'test_return_object_1': x,
                'test_return_object_2': myElement
            }
            );

});