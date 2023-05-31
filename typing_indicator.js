function updateIsTypingElement(target) {
  const headerText = document.querySelector('[data-lp-point="headerText"]').innerHTML;
  const typingText = document.querySelector('[data-lp-point="agent_is_typing"]');
  console.log('Update hit');
  if (typingText) {
    typingText.innerText = agentIsTyping(headerText);
    typingText.innerHTML = agentIsTyping(headerText);
    console.log('Typing Text hit');
    console.log(typingText.innerHTML);
  }
}

function agentIsTyping(target) {
  
  if (
    target === 'DEV_WEB_PMI_BOT' ||
    target === 'Message us'
  ) {
    console.log('Typing message');
    return 'Virtual assistant is typing';
  }

  return 'Agent is typing';
}

function addMessagingWith(data, eventInfo) {
  console.log('Martha Test');
  if (data && data.state == "interactive") {
    const MutationObserver = window.MutationObserver ||
      window.WebKitMutationObserver || window.MozMutationObserver;

    const hdrMax = document.querySelector('[data-lp-point="maximized"] [data-lp-point="headerText"]');
    const hdrMin = document.querySelector('[data-lp-point="minimized"] [data-lp-point="headerText"]');

    const observer = new MutationObserver(((mutations) => {
      mutations.forEach((mutation) => {
        updateIsTypingElement(mutation.target);
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
}

window.addEventListener("load", () => {
  lpTag.events.bind({
    eventName: "state",
    appName: "lpUnifiedWindow",
    func: addMessagingWith
  })
});
