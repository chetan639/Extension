
let browserVar,browserType,isInsideIframe=false;
if(navigator.userAgent.includes("Firefox"))
{
    browserType = "Firefox";
    browserVar = browser;
}
else{
    browserType = "Chrome"
    browserVar = chrome;
}

const getCSSSelector = (element)=>{
    if(element.id)
    {
        return '#' + element.id;
    }

    if(element.className)
    {
        return element.className.split(" ").join(".");
    }
    return element.tagName;
}

const getAbsoluteXPath = (element)=>{
    if(element.tagName === "HTML")
    {
        return element.tagName;
    }
    let count = 0;

    const siblings = element.parentNode.childNodes;

    for(let i=0;i<siblings.length;i++)
    {
        const sibling = siblings[i];
        if(sibling === element)
        {
            return getAbsoluteXPath(element.parentNode) + "/" + element.tagName + "[" + (count + 1) + "]";
        }

        if(sibling.nodeType === 1 && sibling.tagName === element.tagName)
        {
            count++;
        }
    }
}

const getRelativeXPath = (element)=>{
    if(element.id)
    {
        return `//*[@id = '${element.id}']`;
    }
    if(element.tagName === "HTML")
    {
        return element.tagName;
    }
    let count = 0;

    const siblings = element.parentNode.childNodes;

    for(let i=0;i<siblings.length;i++)
    {
        const sibling = siblings[i];
        if(sibling === element)
        {
            return getRelativeXPath(element.parentNode) + "/" + element.tagName + "[" + (count + 1) + "]";
        }

        if(sibling.nodeType === 1 && sibling.tagName === element.tagName)
        {
            count++;
        }
    }
}

const detectClick = (e)=>{
    e = e || window.event;
    var target = e.target || e.srcElement;
    const cssSelector = getCSSSelector(target);
    const absoluteXPath = getAbsoluteXPath(target);
    const relativeXPath = getRelativeXPath(target);
    const insideIframe = document.activeElement.tagName === "IFRAME";
    console.log(target.ownerDocument.defaultView === self.top);
    let msg = {
        text: "clicked!",
        tagName: target.tagName,
        tagId: target.id || null,
        browserType: browserType,
        tagClassName: target.className,
        name : target.name || null,
        cssSelector: cssSelector,
        absoluteXPath: absoluteXPath,
        relativeXPath: relativeXPath,
        insideIframe: insideIframe
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
