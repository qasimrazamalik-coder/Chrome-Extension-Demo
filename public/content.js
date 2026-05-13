/**
 * Content script placeholder
 * This script runs in the context of the web page.
 * It's responsible for extracting job descriptions.
 */
console.log('AI Job Copilot Content Script Loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extract_job') {
    // Basic extraction logic
    const jobTitle = document.querySelector('h1')?.innerText || 'Unknown Role';
    const company = document.querySelector('.company-name')?.innerText || 'Unknown Company';
    const description = document.body.innerText; // Very basic, needs refinement

    sendResponse({ jobTitle, company, description });
  }
});
