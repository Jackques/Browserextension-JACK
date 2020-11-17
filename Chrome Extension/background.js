// How to debug hte background.js script: https://stackoverflow.com/questions/18145282/where-to-find-code-and-console-to-debug-background-js-in-chrome-extension

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    // debugger;
    alert('hey i got something');
    console.log('hey i got something: '+request);
    console.log('hey i got something: '+sender);
    console.log('hey i got something: '+sendResponse);
    // window.page[request.url] = request.count
    const bg = chrome.extension.getBackgroundPage();
    debugger;
    
    chrome.tabs.create({url: 'tab.html'}, (tab) => {
        // chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
        // debugger;
        
        chrome.tabs.executeScript(tab.id, {file:"tab.js"}, function() {
        //     debugger;
        //     // This executes only after your content script executes
            chrome.tabs.sendMessage(tab.id, {persona: "pippo"});
        });

    })
})

chrome.browserAction.onClicked.addListener(function(tab){
    chrome.tabs.create({url: 'popup.html'})
})


// todo: check if this is an (ANVA) Jenkins page