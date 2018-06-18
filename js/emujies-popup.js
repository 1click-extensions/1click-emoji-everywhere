bindAllInputs();
chrome.runtime.sendMessage({
    action: 'addEmujies',
});
var tog = document.getElementsByClassName('emoji-toggler')[0];
tog.style.display = "none";
document.getElementsByClassName('emoji-main-wrapper')[0].style.display = "inline-block";
//tog.parentElement.removeChild(tog);
var message  =  document.getElementById('message');

message.innerText = chrome.i18n.getMessage("message");
//document.getElementById('add-to-all-page').innerText = chrome.i18n.getMessage("add_to_all_pages");
// document.getElementById('add-to-all-page').addEventListener('click', function(){
    
// });
//document.body.insertBefore(document.getElementsByClassName('emoji-main-wrapper')[0],message);
var buttons = document.getElementsByClassName('emuji-button');
//console.log(buttons, emujiTabs);
Array.prototype.forEach.call(buttons, function(button, i){
    button.addEventListener('click', function(){
        //console.log(this.innerText.replace(/\n/,''),'button',button);
        document.getElementById('message').style.display = "block";
        var emuji = this.innerText.replace(/\n/,'');
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            //console.log(activeTab)
            chrome.tabs.sendMessage(activeTab.id, {action: 'emujiSelect',emuji : emuji});
            setTimeout(function(){
                chrome.runtime.sendMessage( {action: 'injectJs'});
            },5000);
        });
        // chrome.runtime.sendMessage({
        //     action: 'emujiSelect',
            
        // });
    });
});