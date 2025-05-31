if (!document.getElementById('dejunk-style')) {
  const style = document.createElement('style');
  style.id = 'dejunk-style';
  style.textContent = `
    .dejunk-hide {
      display: none !important;
    }`;
  document.head.appendChild(style);
}

function promotedRedditContent(enabled) {
  // When triggered, update user preferences in local storage
  if (enabled === true) {
    chrome.storage.local.set({ promotedRedditContent: true }, () => {
      console.log('Reddit promoted content hiding enabled');
    });
  } else if (enabled === false) {
    chrome.storage.local.set({ promotedRedditContent: false }, () => {
      console.log('Reddit promoted content hiding disabled');
    });
  }
}

function sponsoredQuoraContent(enabled) {
  // When triggered, update user preferences in local storage
  if (enabled === true) {
    chrome.storage.local.set({ sponsoredQuoraContent: true }, () => {
      console.log('Quora sponsored content hiding enabled');
    });
  } else if (enabled === false) {
    chrome.storage.local.set({ sponsoredQuoraContent: false }, () => {
      console.log('Quora sponsored content hiding disabled');
    });
  }
}

function youtubeShorts(enabled) {
  // When triggered, update user preferences in local storage
  if (enabled === true) {
    chrome.storage.local.set({ youtubeShorts: true }, () => {
      console.log('Youtube shorts hiding enabled');
    });
  } else if (enabled === false) {
    chrome.storage.local.set({ youtubeShorts: false }, () => {
      console.log('Youtube shorts hiding disabled');
    });
  }
}

function youtubeLives(enabled) {
  // When triggered, update user preferences in local storage
  if (enabled === true) {
    chrome.storage.local.set({ youtubeLives: true }, () => {
      console.log('Youtube lives hiding enabled');
    });
  } else if (enabled === false) {
    chrome.storage.local.set({ youtubeLives: false }, () => {
      console.log('Youtube lives hiding disabled');
    });
  }
}

// Listen for messages from popup.js to toggle content hiding preferences
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'promotedRedditContent') {
    promotedRedditContent(message.enabled);
  }
  if (message.type === 'sponsoredQuoraContent') {
    sponsoredQuoraContent(message.enabled);
  }
  if (message.type === 'youtubeShorts') {
    youtubeShorts(message.enabled);
  }
  if (message.type === 'youtubeLives') {
    youtubeLives(message.enabled);
  }
  // sendResponse({ status: 'success' });
})

function hidePromotedRedditContent(result) {
  if (result === true) {
    // Hide all 'promoted' content on Reddit
    const elements = document.querySelectorAll('.promotedlink');
    elements.forEach((el) => {
      el.style.display = 'none';
    });
  } else if (result === false) {
    // If the user has disabled hiding promoted content, do nothing
    return;
  }
}

function hideSponsoredQuoraContent(result) {
  if (result === true) {
    // Hide all 'sponsored' content on Quora
    const elements = document.querySelectorAll('.dom_annotate_ad_promoted_answer');
    elements.forEach((el) => {
      el.style.display = 'none';
    });
  } else if (result === false) {
    // If the user has disabled hiding sponsored content, do nothing
    return;
  }
}

function hideYoutubeShorts(result) {
  if (result === true) {
    // Hide all shorts sections on Youtube
    const elements = document.querySelectorAll('ytd-reel-shelf-renderer, .ytd-rich-section-renderer');
    elements.forEach((el) => {
      el.style.display = 'none';
    });
  } else if (result === false) {
    // If the user has disabled hiding Youtube Shorts, do nothing
    return;
  }
}

// WeakSet to keep track of hidden YouTube live elements
// This allows us to avoid hiding the same element multiple times
// Improves performance and prevents unnecessary DOM manipulation
const hiddenYoutubeLives = new WeakSet();

function hideYoutubeLives(result) {
  if (result === true) {
    // Hide all livestreams on YouTube
    const elements = document.querySelectorAll('.badge-style-type-live-now-alternate');
    for (const el of elements) {
      const element = el.closest('ytd-rich-item-renderer');
      // Check if the element is already hidden
      if (element && !hiddenYoutubeLives.has(element)) {
        // Hide the element by adding a class
        // This class is defined in the injected style above
        element.classList.add('dejunk-hide');
        // Add the element to the WeakSet to track it
        hiddenYoutubeLives.add(element);
      }
    }
  } else if (result === false) {
    // If the user has disabled hiding YouTube Lives, do nothing
    return;
  }
}

function hideTargetElements() {
  // Check user preferences in local storage for hiding content, 
  // and hide elements accordingly.

  // Check if local storage is available
  if (!chrome || !chrome.storage || !chrome.storage.local) {
    console.error('Chrome storage API is not available.');
    return;
  }

  // Get user preferences for hiding content
  chrome.storage.local.get(['promotedRedditContent', 'sponsoredQuoraContent', 'youtubeShorts', 'youtubeLives'], (result) => {
    if (location.href.includes('reddit.com')) {
      // Hide all 'promoted' content on Reddit
      hidePromotedRedditContent(result.promotedRedditContent);
    }

    if (location.href.includes('quora.com')) {
       // Hide all 'sponsored' content on Quora
      hideSponsoredQuoraContent(result.sponsoredQuoraContent);
    }

    if (location.href.includes('youtube.com')) {
      // Hide all shorts sections on Youtube
      hideYoutubeShorts(result.youtubeShorts);
      // Hide all livestreams on YouTube
      hideYoutubeLives(result.youtubeLives);
    }
    return;
  });
}

// Initial run on page load
// Hide elements based on user preferences when the content script is loaded
hideTargetElements();

let liveScanTimeout = null;

function scheduleHideTargetElements() {
  if (liveScanTimeout) {
    clearTimeout(liveScanTimeout);
  }

  liveScanTimeout = setTimeout(() => {
    hideTargetElements();
  }, 1000);
}

// Use MutationObserver to watch for changes in the DOM and hide elements accordingly
const observer = new MutationObserver(() => {
  scheduleHideTargetElements();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});