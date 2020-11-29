// How to debug hte background.js script: https://stackoverflow.com/questions/18145282/where-to-find-code-and-console-to-debug-background-js-in-chrome-extension

// The background script runs once (on installation or startup), while the content script runs with each new page 
// (BUT AFTER.. the page has ben loaded! Hence why I need to use the 'check if contentscript has been loaded callback')

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
     debugger;

     if(request === "rdy"){
        return;
     }
//    alert('hey BACKGROUND got something');
//    console.log('hey i got something: '+request);
//    console.log('hey i got something: '+sender);
//    console.log('hey i got something: '+sendResponse);
    // window.page[request.url] = request.count

    const bg = chrome.extension.getBackgroundPage(); // Just here as an example that I could also get the page DOM by getting the window object

    chrome.tabs.query({active: true}, function(tabs){
        // debugger;
        chrome.tabs.sendMessage(tabs[0].id, 'jacktest', function(responseFromContentScript){
            // debugger;

            if(responseFromContentScript){

                chrome.tabs.create({url: 'tab.html'}, (tab) => {
                    // debugger;
            
                    chrome.tabs.executeScript(tab.id, {file:"tab.js"}, function() {
                        // debugger;
                    //     // This executes only after your content script executes
                        chrome.tabs.sendMessage(tab.id, responseFromContentScript);
                    });
            
                })
            }else{
                console.log('HOLD YOUR HORSES! The page isnt fully loaded yet! Apparantly the content scripts loads automatically & immediatly but not the messageBus');
            }

        });
    });

})

chrome.browserAction.onClicked.addListener(function(tab){
    chrome.tabs.create({url: 'popup.html'})
})

// todo: check if this is an (ANVA) Jenkins page