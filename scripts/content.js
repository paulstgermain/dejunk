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

function linkedinPromoted(enabled) {
  // When triggered, update user preferences in local storage
  if (enabled === true) {
    chrome.storage.local.set({ linkedinPromoted: true }, () => {
      console.log('LinkedIn promoted content hiding enabled');
    });
  } else if (enabled === false) {
    chrome.storage.local.set({ linkedinPromoted: false }, () => {
      console.log('LinkedIn promoted content hiding disabled');
    });
  }
}

function linkedinNews(enabled) {
  // When triggered, update user preferences in local storage
  if (enabled === true) {
    chrome.storage.local.set({ linkedinNews: true }, () => {
      console.log('LinkedIn news hiding enabled');
    });
  } else if (enabled === false) {
    chrome.storage.local.set({ linkedinNews: false }, () => {
      console.log('LinkedIn news hiding disabled');
    });
  }
}

function linkedinSideAds(enabled) {
  // When triggered, update user preferences in local storage
  if (enabled === true) {
    chrome.storage.local.set({ linkedinSideAds: true }, () => {
      console.log('LinkedIn side ads hiding enabled');
    });
  } else if (enabled === false) {
    chrome.storage.local.set({ linkedinSideAds: false }, () => {
      console.log('LinkedIn side ads hiding disabled');
    });
  }
}

function linkedinPromoJobs(enabled) {
  // When triggered, update user preferences in local storage
  if (enabled === true) {
    chrome.storage.local.set({ linkedinPromoJobs: true }, () => {
      console.log('LinkedIn promoted jobs hiding enabled');
    });
  } else if (enabled === false) {
    chrome.storage.local.set({ linkedinPromoJobs: false }, () => {
      console.log('LinkedIn promoted jobs hiding disabled');
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
  if (message.type === 'linkedinPromoted') {
    linkedinPromoted(message.enabled);
  }
  if (message.type === 'linkedinNews') {
    linkedinNews(message.enabled);
  }
  if (message.type === 'linkedinSideAds') {
    linkedinSideAds(message.enabled);
  }
  if (message.type === 'linkedinPromoJobs') {
    linkedinPromoJobs(message.enabled);
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

const hiddenLinkedinPromoted = new WeakSet();

function hideLinkedinPromoted(result) {
  if (result === true) {
    // Hide all promoted posts on LinkedIn

    const elements = document.querySelectorAll('span[aria-hidden="true"]');
    for (const el of elements) {
      // Check if the element contains the text "Promoted"
      if (el.textContent.includes('Promoted')) {
        // Get the closest parent element that has a data-id attribute
        const parentElement = el.closest('div[data-id]');

        if (parentElement && !hiddenLinkedinPromoted.has(parentElement)) {
          parentElement.classList.add('dejunk-hide');
          hiddenLinkedinPromoted.add(parentElement);
        }
      }
    }
  } else if (result === false) {
    // If the user has disabled hiding promoted posts, do nothing
    return;
  }
}

function hideLinkedinNews(result) {
  if (result === true) {
    const element = document.getElementById('feed-news-module');
    if (element) {
      const parentElement = element.closest('.mb2');
      parentElement.classList.add('dejunk-hide');
    }
    
  } else if (result === false) {
    // If the user has disabled hiding LinkedIn News, do nothing
    return;
  }
}

function hideLinkedinSideAds(result) {
  if (result === true) {
    // Hide all side ads on LinkedIn
    const element = document.querySelector('.ad-banner-container');
    if (element) {
      element.classList.add('dejunk-hide');
    }
  } else if (result === false) {
    // If the user has disabled hiding LinkedIn side ads, do nothing
    return;
  }
}

const hiddenLinkedinPromoJobs = new WeakSet();

function hideLinkedinPromoJobs(result) {
  if (result === true) {
  // Hide all promoted jobs on LinkedIn
    const elements = document.querySelectorAll('span[dir]');

    elements.forEach((el) => {
      if (el.textContent.includes('Promoted')) {
        // Select promoted job elements on search results page
        const parentElement = el.closest('li[data-occludable-job-id]');
        // Select promoted job elements on main job page
        const parentElement2 = el.closest('li.discovery-templates-entity-item')

        if (parentElement && !hiddenLinkedinPromoJobs.has(parentElement)) {
          parentElement.classList.add('dejunk-hide');
          hiddenLinkedinPromoJobs.add(parentElement);
        }

        if (parentElement2 && !hiddenLinkedinPromoJobs.has(parentElement2)) {
          parentElement2.classList.add('dejunk-hide');
          hiddenLinkedinPromoJobs.add(parentElement2);
        }
      }
    });
  } else if (result === false) {
    // If the user has disabled hiding LinkedIn promoted jobs, do nothing
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
  chrome.storage.local.get([
      'promotedRedditContent',
      'sponsoredQuoraContent',
      'youtubeShorts',
      'youtubeLives',
      'linkedinPromoted',
      'linkedinNews',
      'linkedinSideAds',
      'linkedinPromoJobs'
    ], (result) => {
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

    if (location.href.includes('linkedin.com')) {
      // Hide all promoted posts on LinkedIn
      hideLinkedinPromoted(result.linkedinPromoted);
      // Hide LinkedIn News
      hideLinkedinNews(result.linkedinNews);
      // Hide LinkedIn Side Ads
      hideLinkedinSideAds(result.linkedinSideAds);
      // Hide LinkedIn Promoted Jobs
      hideLinkedinPromoJobs(result.linkedinPromoJobs);
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
  }, 500);
}

// Use MutationObserver to watch for changes in the DOM and hide elements accordingly
const observer = new MutationObserver(() => {
  scheduleHideTargetElements();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});