# AI Job Application Copilot - Chrome Extension Project

Apply smarter. Tailor resumes, cover letters, and recruiter messages directly from any job post with AI-powered insights.

## Project Structure

This project is built using React + Vite and is designed to be adapted into a Manifest V3 Chrome Extension.

### UI Screens
- **Extension Popup**: Quick-action interface for detecting and analyzing jobs.
- **Full Dashboard**: Comprehensive application tracker and resume management.
- **Job Analysis**: Deep-dive comparison between your resume and a job post.
- **Cover Letter Gen**: AI-powered tailored cover letter generation.
- **Bullet Improver**: Transforming resume bullets into high-impact achievements.
- **Outreach Assistant**: Generating perfect LinkedIn/Email recruiter messages.

## Technical Details

- **Vite/React**: Modern frontend framework for performance and developer experience.
- **Tailwind CSS**: Utility-first styling for a polished, consistent UI.
- **Lucide Icons**: Crisp, professional iconography.
- **Framer Motion**: Smooth transitions and micro-animations.

### Adapting to Chrome Extension (Manifest V3)
To turn this into a fully functional extension:
1. **content.js**: Use the provided `public/content.js` to extract text from LinkedIn/Indeed.
2. **background.js**: Handles API calls to Gemini and `chrome.storage` for persistence.
3. **manifest.json**: Already provided in `public/`.
4. **Persistent Storage**: Use `chrome.storage.local` to save user resumes and job history.
5. **Cross-View Navigation**: Use URLs with query parameters (e.g., `?view=dashboard`) to open specific pages from the popup.

## Features
- ✅ Job description extraction
- ✅ Match score calculation (AI-powered)
- ✅ Missing keyword detection
- ✅ ATS-optimized resume bullet generation
- ✅ Tailored cover letter & outreach messages
- ✅ Full application tracker with status management
- ✅ Privacy-first: Data stored locally or with your own API key

## License
Apache-2.0
