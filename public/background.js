/**
 * Background Service Worker
 * Handles long-running tasks and API calls.
 */
chrome.runtime.onInstalled.addListener(() => {
  console.log('AI Job Application Copilot Installed');
});

// Listener for messages from popup or content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received:', message);
  return true;
});
