
let browserVar,browserType;
if(navigator.userAgent.includes("Firefox"))
{
    browserType = "Firefox";
    browserVar = browser;
}
else{
    browserType = "Chrome"
    browserVar = chrome;
}

const detectClick = (e)=>{
    e = e || window.event;
    var target = e.target || e.srcElement;
    let msg = {
        text: "clicked!",
        tagName: target.tagName,
        tagId: target.id || null,
        browserType: browserType,
        // classNameTag:,
        // absoluteXPath:,
        // relativeXpath:,
        // name:,
        // cssSelector:,
        // elementinIframe: true,
        // indicesFromRoottoIFrame:[2,3,0]
    } 
    browserVar.runtime.sendMessage(msg,(tab) => {
   console.log(tab);
})
}

document.addEventListener('click', detectClick);

let frames = document.querySelectorAll("iframe");

frames.forEach(frame => {
    frame.addEventListener("load",()=>{
        console.log("Loaded");
        frame.contentWindow.document.addEventListener('click',detectClick);
    })
});
 