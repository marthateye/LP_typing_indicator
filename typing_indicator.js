window.addEventListener('message', event => {
  if (event.data === 'close_slide_out') {
    document.querySelector('[data-lp-point="minimize-icon"]').click()
  }

  const closeSlideOutBtn = document.querySelector('[data-lp-point="minimize-icon"]');

  if (closeSlideOutBtn) {
    closeSlideOutBtn.addEventListener("click", (e) => {
      if (e.isTrusted) {
        closeSlideOutBtn.parentElement.parentElement.parentElement.parentElement.querySelector('iframe').contentWindow.postMessage('init_cancel_order', '*');
        e.stopPropagation();
      }
    });
  }
});

function updateIsTypingElement(header) {
  const typingText = document.querySelector('[data-lp-point="agent_is_typing"]');
  if (typingText) {
    typingText.innerText = agentIsTyping(header);
  }
}

function agentIsTyping(target) {
  if (
    target.innerText === 'DEV_WEB_PMI_BOT' ||
    target.innerText === 'Message us'
  ) {
    return 'Virtual assistant is typing test';
  }

  return 'Agent is typing';
}

function addMessagingWith(data, eventInfo) {
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