# GPT Submission Form

## Overview

A fully functional submission form integrated with Netlify Forms for collecting GPT/tool submissions from the community.

## Features

✅ **Netlify Forms Integration** - Automatically captures submissions
✅ **Email Notifications** - Sends submissions to your configured email
✅ **Spam Protection** - Honeypot field to prevent bot submissions
✅ **Dark Theme Design** - Matches the Climate GPT Hub aesthetic
✅ **Responsive Layout** - Works on all devices
✅ **Thank You Page** - Confirms successful submission

## Form Fields

### Required Fields
1. **GPT/Tool Name** - Name of the tool
2. **URL** - Link to the GPT or tool
3. **Platform** - Dropdown (OpenAI, Anthropic, Google, Web App, Other)
4. **Category** - Dropdown with all 9 collections
5. **Description** - Brief description of functionality
6. **Your Name** - Submitter's name
7. **Your Email** - Submitter's email for follow-up

### Optional Fields
1. **Use Cases** - Key problems it solves
2. **Additional Notes** - Any extra context

## How It Works

### 1. Form Submission
- User fills out form at `/submit`
- Form uses POST method with Netlify Forms attributes
- Data is captured by Netlify's form handling

### 2. Spam Protection
- Honeypot field (`bot-field`) hidden from users
- Netlify automatically filters submissions with this field filled

### 3. Thank You Page
- Users redirected to `/thank-you` after submission
- Confirmation message with success icon
- Options to return home or submit another

## Setup Instructions

### Netlify Dashboard Configuration

1. **Deploy the site to Netlify**
   ```bash
   npm run build
   # Deploy the 'out' folder
   ```

2. **Configure Form Notifications**
   - Go to: Site Settings → Forms → Form notifications
   - Click "Add notification"
   - Select "Email notification"
   - Enter recipient email: `contact@nexusclimate.ai`
   - Save

3. **Enable Form Detection**
   - Netlify automatically detects forms with `data-netlify="true"`
   - The hidden HTML form in `/public/submit-form.html` ensures detection
   - Forms will appear in: Site Settings → Forms

### Email Notification Template

Netlify will send emails with all form field values in this format:

```
New form submission from Climate GPT Hub

Form: gpt-submission

GPT/Tool Name: [Name]
URL: [URL]
Platform: [Platform]
Category: [Category]
Description: [Description]
Use Cases: [Use Cases]
Submitter Name: [Name]
Submitter Email: [Email]
Additional Notes: [Notes]
```

## Testing

### Local Testing
Forms won't work locally in development mode. To test:
1. Build the site: `npm run build`
2. Deploy to Netlify
3. Test on the live site

### Netlify Test
After deployment:
1. Visit `/submit` on your live site
2. Fill out and submit the form
3. Check: Site Settings → Forms → Submissions
4. Verify email was received at configured address

## Accessing Submissions

### Via Netlify Dashboard
- Site Settings → Forms → Click form name
- View all submissions with timestamps
- Export as CSV
- Set up webhooks for automation

### Via Email
- All submissions automatically forwarded to configured email
- No need to log in to check submissions

## Customization

### Change Email Recipient
Update in Netlify Dashboard: Site Settings → Forms → Form notifications

### Add/Remove Fields
1. Update `app/submit/page.tsx` form
2. Update `public/submit-form.html` (for detection)
3. Rebuild and redeploy

### Modify Thank You Page
Edit `app/thank-you/page.tsx` for custom message

## Navigation

The "Submit a GPT" button in the header now links to `/submit` instead of mailto link.

## Build Output

- `/submit` - Submission form page
- `/thank-you` - Success confirmation page
- `/public/submit-form.html` - Form detection file for Netlify

Total pages: 27 (was 25)
