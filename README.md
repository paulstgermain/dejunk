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
![Screenshot 2025-06-01 at 7 11 48 PM](https://github.com/user-attachments/assets/d11f84ec-d812-49fc-aa22-eddd9cf22e02)
_The Dejunk extension running on YouTube, 'Hide Shorts Sections' feature disabled, with a 'Shorts section' showing._

![Screenshot 2025-06-01 at 7 13 58 PM](https://github.com/user-attachments/assets/543a811c-d8ba-410f-8e43-8df16c787941)
_The Dejunk extension running on YouTube, 'Hide Shorts Sections' feature enabled, with a 'Shorts section' hidden._

![Screenshot 2025-06-01 at 8 11 11 PM](https://github.com/user-attachments/assets/b47bf1c2-f2ff-4a30-807c-5542ce05d247)
_The Dejunk extension running on Reddit, 'Hide Sponsored Posts' feature disabled, with a promoted post showing._

![Screenshot 2025-06-01 at 8 11 55 PM](https://github.com/user-attachments/assets/631f855d-995b-46f3-8c0f-eaf28558c005)
_The Dejunk extension running on Reddit, 'Hide Sponsored Posts' feature enabled, with a promoted post hidden._

![Screenshot 2025-06-01 at 7 09 57 PM](https://github.com/user-attachments/assets/fa55bdd2-a68e-4ee4-875e-ef0b2945baab)
_The Dejunk extension running on Wikipedia, showing how it disables itself on unsupported websites._
