document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("jack").onclick = function() {
        
        // alert('hi 2');
        chrome.runtime.sendMessage({
            url: 'test',
            count: 'jack'
        })
    };
});