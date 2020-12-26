document.addEventListener('DOMContentLoaded', function(){
    console.log('tab content loaded');
    // alert('tab content loaded! Open that console now here so my debugger pauses the code for you!');
    // debugger;


    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
        
        // alert('hey i got TAB too! ');
        // debugger;
        // document.getElementById("weird").innerHTML = JSON.stringify(request);
        $("weird").text(JSON.stringify(request));
    });
});