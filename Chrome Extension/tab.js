document.addEventListener('DOMContentLoaded', function(){
    console.log('tab content loaded');
    alert('tab content loaded');


    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
        debugger;
        alert('hey i got something too!');
        document.getElementById("weird").innerHTML = JSON.stringify(request);
        console.dir('hey i got something too!: '+request);
        console.dir('hey i got something too!: '+sender);
        console.dir('hey i got something too!: '+sendResponse);
        // window.page[request.url] = request.count
    });
});