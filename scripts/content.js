// Hide all 'promoted' content on Quora & Reddit.
function hideTargetElements() {
  const elements = document.querySelectorAll('.dom_annotate_ad_promoted_answer, .promotedlink');

  elements.forEach((el) => {
    el.style.display = 'none';
  });
}

// Initial run
hideTargetElements();

// Watch for dynamic content
const observer = new MutationObserver(() => {
  hideTargetElements();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});