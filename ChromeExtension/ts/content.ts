// The background script runs once (on installation or startup), while the content script runs with each new page

// In order to use Jquery, put it first in the array for scripts in manifest.json

$( document ).ready(function() {
    console.log( "ready! in content" );
    /*
    I can..
    A. Put something on the global window obj, make the popup script send a message (via runtime) and this script (or background) can send something back)
    B. Put something in localstorage and make popup.js check if (periodically)
    C. > Do nothing, except for a simple check which checks if page is ready when this script gets the order to gather page data below
    */
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
    console.log('hey CONTENT 1 got something');

    // Get all pipline node containers
    const pipelineNodeContainers: Array<HTMLElement> = $("span[class^='pipeline-node-']").filter(function( index: Number, element: HTMLElement ): boolean {
      console.dir(this); // does 'this' refer to the jquery array so i can loop ove it and check if i've already got the class?
      // Doesnt seem to be possible with the jquery filter function. No biggie, just use an array outside of anon method.
      console.dir(element);
      debugger;
      return true;
    }).toArray()

    //todo: NIEUWE AANPAK: alle textnodes opzoeken met de woorden 'Results', die in een lijst zetten, van ieder de siblings afgaan tot ik de testcontainer tegenkom,
    //alle nodes van die testcontainer in een lokale lijst zetten en data uithalen.
    //todo: Get the CSS class 'pipeline-node-???' for each 'running for..' container
    const someArray: Array<any> = [];
    $("body").find("*").contents().filter((index: Number, element: Node): boolean => {
        if (element.nodeType === 3 && element.textContent && element.textContent.trim() === "(Results)") {
          someArray.push({
            resultsTextNode: element,
            resultsFilteredObject: {}
          });
        }
        return false;
      });
    // debugger;

    $(someArray).each(function( index, element ) {
        someArray[index].resultsFilteredObject = collectTestResult(element.resultsTextNode);
    });

    function collectTestResult(element: any){
        let testResult = {
            totalTests: NaN,
            passedTests: NaN,
            failedTests: NaN,
            pendingTests: NaN,
            skippedTests: NaN,
            durationTest: "",
            specPathTest: ""
        };

        while (element.textContent.trim() !== '└────────────────────────────────────────────────────────────────────────────────────────────────┘') {

            //todo: if result is test failed, abort this if and go backwards (previous element siblings untill you reach the last testnumber) and get the reason the test failed.
            //todo: think i might need to do this anyway, even if the test succeeds because i need to get the name of the test too

            // todo: can also refactor all these below in a nice method
            if(element.textContent.includes("Tests:")){
                testResult.totalTests = element.textContent.replace(/\D/g,'');
            }
            if(element.textContent.includes("Passing:")){
                 testResult.passedTests = element.textContent.replace(/\D/g,'');
            }
            if(element.textContent.includes("Failing:")){
                 testResult.failedTests = element.textContent.replace(/\D/g,'');
            }
            if(element.textContent.includes("Pending:")){
                 testResult.pendingTests = element.textContent.replace(/\D/g,'');
            }
            if(element.textContent.includes("Skipped:")){
                 testResult.skippedTests = element.textContent.replace(/\D/g,'');
            }
            if(element.textContent.includes("Duration:")){
                 testResult.durationTest = element.textContent.replace(/\│/g, '').trim().substr("Duration:".length).trim()
                //  testResult.durationTest = element.textContent.trim().substr("│ Duration:".length).trim();
                 //todo: if lastchar is |, then remove it, THEN trim() the remaining text
                 // todo: Maybe i can do this for all of these?
            }
            if(element.textContent.includes("Spec Ran:")){
                  testResult.specPathTest = element.textContent.replace(/\│/g, '').trim().substr("Spec Ran:".length).trim();
                  // todo: Some specs may consist if multiple lines, so i need to check if there are siblings which continue the test and merge them if so.
            }
            element = element.nextSibling;
        }
        return testResult;
    };
    debugger;



    sendResponse(
        someArray
        // new Promise(function(myResolve, myReject) {
        //     myResolve(someArray)
        // })
        // someArray
        // Promise.resolve("Dummy response to keep the console quiet")
        );
    // Result: dit geeft eenmalig een empty object terug?

    // return Promise.resolve("Jack");
    // [enabling only this line] Result: dit geeft een undefined terug
    // [enabling this line AND still using sendResponse to send back someArray] Result: ???

    // todo: try this if above code doesnt work
    // [enabling this line AND still using sendResponse to send back someArray] Result: works perfectly, return the array result

    // Returning a new Promise with the array result in the myResolve AND enabling return: returns undefined
    return true;

    // only sending back the actual result gave me an error at first?
    // then i tried several solutions (see above) https://github.com/mozilla/webextension-polyfill/issues/130
    // none worked, then i tried to send back the actual result again (someArray)..
    // and this time it did work.. (at least when i tried without debugger statements)
    // NOW IT MAGICALLY WORKS??

    // Update:
    /*
    sendResponse(someArray) AND return true seems to work despite getting an error when I first tested it on my laptop (and despite the solution i red online).
    I'm leaving it for now and will investigate this further when i encounter the error again or will continue to experiment with this later.
    I still would want to be able to display a 'loading..' modal by using the time between the calculation and retrieving the results. Would be a nice addon.
    */

});
