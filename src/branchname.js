// Jira Branch Name — Bookmarklet source
// Copies a branch name to the clipboard: "KEY/slug-of-title"
// Works on Jira Cloud/Server; falls back to execCommand if Clipboard API is blocked.

(() => {
  const q = (s) => document.querySelector(s);
  const pick = (sels) => sels.map(q).find(Boolean);

  // Try to extract a Jira issue key like ABC-123 from URL or <title>
  const getKey = () => {
    const re = /[A-Z][A-Z0-9_]+-\d+/g; // standard Jira keys in uppercase
    const fromUrl = (location.href.match(re) || []).pop();
    const fromTitle = (document.title.match(re) || []).pop();
    return fromUrl || fromTitle || null;
  };

  // Try to extract the issue summary across common Jira DOM variants
  const getTitle = () => {
    const el = pick([
      '[data-testid="issue.views.issue-base.foundation.summary.heading"]',
      '[data-test-id="issue.views.issue-base.foundation.summary.heading"]',
      'h1[data-testid="issue-view-summary"]',
      'h1[aria-label="Issue summary"]',
      'h1',
    ]);
    const txt =
      (el && el.textContent && el.textContent.trim()) ||
      q('meta[name="twitter:title"]')?.content ||
      q('meta[property="og:title"]')?.content ||
      document.title.replace(/\s*-\s*Jira.*/i, '');
    return (txt || '').trim();
  };

  // Safe slug for the branch tail
  const slug = (s) =>
    s
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove diacritics
      .replace(/[^a-z0-9]+/g, '-')     // separators
      .replace(/^-+|-+$/g, '')
      .replace(/-{2,}/g, '-')
      .slice(0, 120);                  // avoid overly long branches

  const key = getKey();
  const title = getTitle();

  if (!key || !title) {
    alert("Couldn't read issue key or title on this page.");
    return;
  }

  const branch = `${key}/${slug(title)}`;

  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = branch;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      alert('Copied:\n' + branch);
    } catch {
      prompt('Copy the branch name:', branch);
    } finally {
      ta.remove();
    }
  };

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(branch).then(
      () => alert('Copied:\n' + branch),
      () => fallback()
    );
  } else {
    fallback();
  }
})();
