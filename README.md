# ![alt text](/images/icon48.png "Dejunk Icon") Dejunk
Dejunkify the internet by removing junk content (promoted or otherwise unrelated content to a page's specific purpose) from websites.

## Table of Contents
- [Getting Started](#getting-started)
- [Reference Material](#reference-material)
  - [Requirements](#requirements)
  - [Installation Instructions](#installation-instructions)
- [Contribution Guidelines](#contribution-guidelines)
- [Screenshots](#screenshots)

## Getting Started
### Reference Material
- [Chrome Extensions Develop Docs](https://developer.chrome.com/docs/extensions/develop)
- [Message passing in Chrome Extensions](https://developer.chrome.com/docs/extensions/develop/concepts/messaging)
- [chrome.tabs API Docs](https://developer.chrome.com/docs/extensions/reference/api/tabs)
  - [chrome.tabs.sendMessage Example](https://developer.chrome.com/docs/extensions/reference/api/tabs#messaging)
- [chrome.runtime API Docs](https://developer.chrome.com/docs/extensions/reference/api/runtime)
  - [chrome.runtime.onMessage Example](https://developer.chrome.com/docs/extensions/reference/api/runtime#event-onMessage)
- [chrome.storage API Docs](https://developer.chrome.com/docs/extensions/reference/api/storage)
  - [chrome.storage.local Examples](https://developer.chrome.com/docs/extensions/reference/api/storage#examples)

### Requirements
Before you begin, be sure you are using Chrome as your browser.

### Installation Instructions
1. Clone the repo:
```
git clone https://github.com/paulstgermain/dejunk.git
```
2. In Chrome, open the extension manager
3. Click the toggle in the upper right corner to toggle on Developer Mode
4. Click 'Load Unpacked', and select the folder containing the cloned extension files
5. Go to a page designated in the extension's `manifest.json` file to see promoted content hidden from those pages
<!-- TODO: Expand features, websites, and hidden content, add to instructions -->

## Contribution Guidelines
Pull requests are welcome. For major changes, please open an issue first. Before writing any code, please be sure to open a feature branch.

For example, `feature/short_title_describing_feature` for a new feature, or `bugfix/short_title_describing_bugfix` for bug fixes.

**All PRs will be reviewed by the repository owner before they will be accepted and merged.**

## Screenshots