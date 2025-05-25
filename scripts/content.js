function hidePromotedRedditContent(enabled) {
  if (enabled) {
    // Hide all 'promoted' content on Reddit
    const elements = document.querySelectorAll('.promotedlink');
    elements.forEach((el) => {
      el.style.display = 'none';
    });
  }
}

function hideSponsoredQuoraContent(enabled) {
  if (enabled) {
    // Hide all 'promoted' content on Quora
    const elements = document.querySelectorAll('.dom_annotate_ad_promoted_answer');
    elements.forEach((el) => {
      el.style.display = 'none';
    });
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'reddit') {
    hidePromotedRedditContent(message.enabled);
  } else if (message.type === 'quora') {
    hideSponsoredQuoraContent(message.enabled);
  }
  // sendResponse({ status: 'success' });
})

// Hide all 'promoted' content on Quora & Reddit.
// function hideTargetElements() {
//   const elements = document.querySelectorAll('.dom_annotate_ad_promoted_answer, .promotedlink');

//   elements.forEach((el) => {
//     el.style.display = 'none';
//   });
// }

// Initial run
// hideTargetElements();

// Watch for dynamic content
const observer = new MutationObserver(() => {
  // hideTargetElements();
  hidePromotedRedditContent(true);
  hideSponsoredQuoraContent(true);
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});