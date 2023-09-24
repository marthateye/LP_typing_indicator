function updateIsTypingElement(header) {
  const typingText = document.querySelector('[data-lp-point="agent_is_typing"]');
  console.log(typingText)
  if (typingText) {
    //typingText.style.display = "block";
    typingText.innerText = agentIsTyping(header);
  }
}

function agentIsTyping(target) {
  console.log(target.innerText);
  if (
    target.innerText === 'DEV_WEB_PMI_BOT' ||
    target.innerText === 'Message us' ||
    target.innerText === 'PMI Survey Bot'
  ) {
    console.log("va");
    return 'Virtual assistant is typing';
  }else{
    console.log("AA");
    return 'Agent is typing';}

 // return 'Agent is typing';
}

function addMessagingWith(data, eventInfo) {
  console.log(data)
  //if (data && data.state == "interactive") {
    const MutationObserver = window.MutationObserver ||
      window.WebKitMutationObserver || window.MozMutationObserver;

    const hdrMax = document.querySelector('[data-lp-point="maximized"] [data-lp-point="headerText"]');
    const hdrMin = document.querySelector('[data-lp-point="minimized"] [data-lp-point="headerText"]');

    const observer = new MutationObserver(((mutations) => {
      mutations.forEach((mutation) => {
        const { target} = mutation;
        const { innerText } = target;
        const headerMessage = headerCheckHandler(mutation.target);
        if ((headerMessage && headerMessage !== innerText) && !headerMessage.includes('undefined')) { 
          target.innerText = headerMessage; } 
          // headerCheckHandler(mutation.target); 
          // headerCheck(hdrMin); 
          const typingText = document.querySelector('[data-lp-point="agent_is_typing"]'); 
          if (typingText) { 
            typingText.innerText = agentIsTyping(mutation.target);
          }
        //updateIsTypingElement(mutation.target);
      });
    }));

    observer.observe(hdrMax, {
      characterData: true,
      attributes: true,
      childList: true,
      subtree: true
    });
    observer.observe(hdrMin, {
      characterData: true,
      attributes: true,
      childList: true,
      subtree: true,
    });
    updateIsTypingElement(hdrMax);
  
}

window.addEventListener("load", () => {
  lpTag.events.bind({
    eventName: "state",
    appName: "lpUnifiedWindow",
    func: addMessagingWith
  })
});
