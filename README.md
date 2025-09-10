# Jira Branch Name Bookmarklet

![GitHub release](https://img.shields.io/github/v/release/joelmrtnz/jira-branchname-bookmarklet)
![GitHub license](https://img.shields.io/github/license/joelmrtnz/jira-branchname-bookmarklet)
![GitHub stars](https://img.shields.io/github/stars/joelmrtnz/jira-branchname-bookmarklet?style=social)

A tiny **bookmarklet** to instantly generate and copy clean Git branch names from Jira issues.  
Example: `AA-111/frontend-fix-something`.

---

## Quick Download

You don’t need to clone or build the project — simply download the ready-to-use bookmarklet:  
➡️ [**Download from the latest release**](https://github.com/joelmrtnz/jira-branchname-bookmarklet/releases/latest/download/branchname.bookmarklet.txt)

Then create a new browser bookmark and paste the code from that file in the URL field.

---

## Features

- Detects the Jira key (e.g., `AA-111`) from URL or page title.
- Builds a safe, URL-friendly slug from the issue summary.
- Copies to clipboard (with fallbacks if Clipboard API is blocked).
- Works with Jira Cloud and Jira Server.
- No dependencies, 100% client-side.

---

## Installation

1. Open [`dist/branchname.bookmarklet.txt`](./dist/branchname.bookmarklet.txt).
2. Copy **all** its content.
3. Create a **new bookmark** in your browser:
   - **Name**: `BranchName`
   - **URL**: paste the code (starts with `javascript:(()=>{...})();`).
4. Save.

---

## Usage

1. Open any Jira issue.
2. Click the `BranchName` bookmark.
3. The branch name is copied to your clipboard. 🎉

---

## Development

```bash
git clone git@github.com:joelmrtnz/jira-branchname-bookmarklet.git
cd jira-branchname-bookmarklet
npm install
npm run build
```

The compiled bookmarklet will be in `dist/branchname.bookmarklet.txt`.

---

## How it works

- Extracts the issue **key** via regex (`[A-Z][A-Z0-9_]+-\d+`) from URL/title.
- Reads the **summary** using several Jira selectors, with fallbacks to `<meta>` and `<title>`.
- Generates a lowercase **slug** (removes diacritics, non-alphanumerics → `-`, trims, dedupes, max 120 chars).
- Copies `KEY/slug` to the clipboard with graceful fallbacks.

---

## Notes / Limitations

- The key pattern assumes uppercase project keys (standard Jira). If your instance differs, open an issue.
- Some browsers require a user gesture to allow clipboard access; the script includes fallbacks.

---

## License

MIT — see [LICENSE](./LICENSE).
