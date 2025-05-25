// add event listeners to each checkbox
// when a checkbox is clicked, we send a message to the content script
// to update the user's preference for that site in local storage
// and run the content script to hide elements

/* Originally I had listed allowed sites, intending to check against the active tab's url to verify that the user is running the extension on an allowed site. Should've been obvious, but the manifest.json's matches and host_permissions arrays already do this work, causing the active tab to return only basic info not including url, page description, etc. (Also content.js doesn't run on discluded urls, so really no need to check here. Instead, simply render a message in popup.html if no url found.) */

chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  if (!tabs[0].url) {
    checkboxes.forEach((checkbox) => checkbox.disabled = true);
    document.body.insertAdjacentHTML("beforeend", "<h3>This site not currently supported by Dejunk.</h3>");
  }

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: checkbox.id, enabled: event.target.checked });
    })
  })
})