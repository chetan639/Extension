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
    console.log(message);
    if(message.text == "clicked!")
    {
        sendResponse({tabName: sender.tab.title,windowId: sender.tab.windowId,tagName: message.tagName, tabUrl: sender.tab.url,browserType: message.browserType,insideIframe:message.insideIframe,absoluteXPath: message.absoluteXPath,relativeXPath:message.relativeXPath,cssSelector:message.cssSelector})
    }
}