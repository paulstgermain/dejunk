function hidePromotedRedditContent(enabled) {
  // When triggered, update user preferences in local storage
  if (enabled === true) {
    chrome.storage.local.set({ hidePromotedRedditContent: true }, () => {
      console.log('Reddit promoted content hiding enabled');
    });
  } else if (enabled === false) {
    chrome.storage.local.set({ hidePromotedRedditContent: false }, () => {
      console.log('Reddit promoted content hiding disabled');
    });
  }
}

function hideSponsoredQuoraContent(enabled) {
  // When triggered, update user preferences in local storage
  if (enabled === true) {
    chrome.storage.local.set({ hideSponsoredQuoraContent: true }, () => {
      console.log('Quora sponsored content hiding enabled');
    });
  } else if (enabled === false) {
    chrome.storage.local.set({ hideSponsoredQuoraContent: false }, () => {
      console.log('Quora sponsored content hiding disabled');
    });
  }
}

function hideYoutubeShorts(enabled) {
  // When triggered, update user preferences in local storage
  if (enabled === true) {
    chrome.storage.local.set({ hideYoutubeShorts: true }, () => {
      console.log('Youtube shorts hiding enabled');
    });
  } else if (enabled === false) {
    chrome.storage.local.set({ hideYoutubeShorts: false }, () => {
      console.log('Youtube shorts hiding disabled');
    });
  }
}

// Listen for messages from popup.js to toggle content hiding preferences
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'hidePromotedRedditContent') {
    hidePromotedRedditContent(message.enabled);
  } else if (message.type === 'hideSponsoredQuoraContent') {
    hideSponsoredQuoraContent(message.enabled);
  } else if (message.type === 'hideYoutubeShorts') {
    hideYoutubeShorts(message.enabled);
  }
  // sendResponse({ status: 'success' });
})

function hideTargetElements() {
  // Check user preferences in local storage for hiding content, 
  // and hide elements accordingly.

  // Check if local storage is available
  if (!chrome || !chrome.storage || !chrome.storage.local) {
    console.error('Chrome storage API is not available.');
    return;
  }

  // Get user preferences for hiding content
  chrome.storage.local.get(['hidePromotedRedditContent', 'hideSponsoredQuoraContent', 'hideYoutubeShorts'], (result) => {
    console.log('User preferences:', result.hideYoutubeShorts);

    if (location.href.includes('reddit.com') && result.hidePromotedRedditContent === true) {
      // Hide all 'promoted' content on Reddit
      const elements = document.querySelectorAll('.promotedlink');
      elements.forEach((el) => {
        el.style.display = 'none';
      });
    } else if (result.hidePromotedRedditContent === false) {
      // If the user has disabled hiding promoted content, do nothing
      return;
    }

    if (location.href.includes('quora.com') && result.hideSponsoredQuoraContent === true) {
       // Hide all 'sponsored' content on Quora
      const elements = document.querySelectorAll('.dom_annotate_ad_promoted_answer');
      elements.forEach((el) => {
        el.style.display = 'none';
      });
    } else if (result.hideSponsoredQuoraContent === false) {
      // If the user has disabled hiding sponsored content, do nothing
      return;
    }

    if (location.href.includes('youtube.com') && result.hideYoutubeShorts === true) {
      // Hide all shorts sections on Youtube
      const elements = document.querySelectorAll('ytd-reel-shelf-renderer');
      elements.forEach((el) => {
        el.style.display = 'none';
      })
    } else if (result.hideYoutubeShorts === false) {
      // If the user has disabled hiding Youtube Shorts, do nothing
      return;
    }

  });
}

// Initial run on page load
// Hide elements based on user preferences when the content script is loaded
hideTargetElements();

// Use MutationObserver to watch for changes in the DOM and hide elements accordingly
const observer = new MutationObserver(() => {
  hideTargetElements();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});