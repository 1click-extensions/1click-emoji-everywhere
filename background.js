chrome.runtime.setUninstallURL("https://1ce.org");

if (!localStorage.created) {
  chrome.tabs.create({ url: "https://1ce.org" });
  var manifest = chrome.runtime.getManifest();
  localStorage.ver = manifest.version;
  localStorage.created = 1;
}


chrome.runtime.onMessage.addListener(function (data, sender, callback) {
  console.log(data)
  if("addEmujies" == data.action ){
    chrome.tabs.query( { active: true, currentWindow: true }, function(tabs){
      console.log(tabs[0]);
      //injectJsCurrentTab(tabs[0]);
      chrome.tabs.executeScript(tabs[0].id,{file:'js/emujies.js'});
    });
  }
});


chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.executeScript(tab.id,{file:'js/emujies.js'}, function(){
    chrome.tabs.executeScript(tab.id,{file:'js/addTextareas.js'});
  });
});
