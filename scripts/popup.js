// Get the active tab in the last focused window
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  // Get all checkboxes in the popup
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const popupText = document.querySelectorAll("p");

  // If no active tab with manifest-allowed url...
  if (!tabs[0].url) {
    // Disable all checkboxes
    checkboxes.forEach((checkbox) => checkbox.disabled = true);
    // Adjust text color to indicate disabled state
    popupText.forEach((label) => label.style = "color: #ccc;");
    // Display a message indicating that the site is not supported
    document.body.insertAdjacentHTML("beforeend", "<hr /><h3>This site not currently supported by Dejunk.</h3>");
  }

  // Check local storage for user preferences
  chrome.storage.local.get(['hidePromotedRedditContent', 'hideSponsoredQuoraContent'], (result) => {
    // If the user has enabled hiding promoted Reddit content, check the corresponding checkbox
    if (result.hidePromotedRedditContent === true) {
      document.getElementById('hidePromotedRedditContent').checked = true;
    }
    // If the user has enabled hiding sponsored Quora content, check the corresponding checkbox
    if (result.hideSponsoredQuoraContent === true) {
      document.getElementById('hideSponsoredQuoraContent').checked = true;
    }
  });

  // Otherwise, add event listeners to each checkbox
  // and send messages to the content script when they change
  // to toggle content hiding preferences
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: checkbox.id, enabled: event.target.checked });
    })
  })
})

/* Originally I had listed allowed sites, intending to check against the active tab's url to verify that the user is running the extension on an allowed site. Should've been obvious, but the manifest.json's matches and host_permissions arrays already do this work, causing the active tab to return only basic info not including url, page description, etc. (Also content.js doesn't run on discluded urls, so really no need to check here. Instead, simply render a message in popup.html if no url found.) */
