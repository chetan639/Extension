console.log("This is the background");

let browserVar;
if(navigator.userAgent.includes("Firefox"))
{
    browserVar = browser;
}
else{
    browserVar = chrome;
}

browserVar.runtime.onMessage.addListener(clickDetails);

function clickDetails(message,sender,sendResponse)
{
    console.log(sender.tab);
    if(message.text == "clicked!")
    {
        sendResponse({tabName: sender.tab.title,windowId: sender.tab.windowId,tagName: message.tagName, tabUrl: sender.tab.url,browserType: message.browserType,tagId: message.tagId})
    }
}