# Quick Setup: Netlify Form Notifications

After deploying your site to Netlify, follow these steps to receive email notifications for GPT submissions:

## Step 1: Deploy to Netlify

```bash
# Build the site
npm run build

# Deploy the 'out' folder to Netlify
# (via Netlify CLI, GitHub integration, or drag & drop)
```

## Step 2: Configure Email Notifications

1. Go to your Netlify site dashboard
2. Navigate to: **Site Settings** → **Forms**
3. Click on **Form notifications**
4. Click **Add notification**
5. Select **Email notification**
6. Configure:
   - **Event to listen for**: New form submission
   - **Form**: gpt-submission
   - **Email to notify**: `contact@nexusclimate.ai`
7. Click **Save**

## Step 3: Test the Form

1. Visit your live site: `https://your-site.netlify.app/submit`
2. Fill out the form with test data
3. Submit
4. Check:
   - Redirects to `/thank-you` page ✓
   - Email arrives at `contact@nexusclimate.ai` ✓
   - Submission visible in Netlify Dashboard → Forms ✓

## Email Format

You'll receive emails like this:

```
Subject: New form submission from Climate GPT Hub

Form: gpt-submission

GPT/Tool Name: Climate Risk Analyzer
URL: https://chat.openai.com/g/example
Platform: OpenAI
Category: climate-analysis
Description: Analyzes climate risks for businesses
Use Cases: Physical risk assessment, TCFD reporting
Submitter Name: John Smith
Submitter Email: john@example.com
Additional Notes: Used by 50+ companies
```

## Managing Submissions

### View in Dashboard
- **Forms** → Click on **gpt-submission**
- See all submissions with timestamps
- Export as CSV for bulk processing

### Set Up Slack/Webhook (Optional)
- Add Slack notification instead of/in addition to email
- Set up webhook to automate processing

## Troubleshooting

### Form not detected by Netlify?
- Check `public/submit-form.html` exists in build output
- Verify form has `data-netlify="true"` attribute
- Redeploy site

### Not receiving emails?
- Check spam/junk folder
- Verify email address in Netlify notifications settings
- Test with a different email address

### Form submission error?
- Ensure form `name` attribute matches: `name="gpt-submission"`
- Check hidden input: `<input type="hidden" name="form-name" value="gpt-submission" />`
- Review Netlify deploy logs for errors

## Next Steps

Once you start receiving submissions:
1. Review the GPT/tool details
2. Test the tool if URL is provided
3. Add to your content files if approved:
   - Create new file in `content/tools/[slug].md`
   - Update URL from `example.com` to actual URL
   - Rebuild and deploy

## Support

- [Netlify Forms Documentation](https://docs.netlify.com/forms/setup/)
- [Netlify Form Notifications](https://docs.netlify.com/forms/notifications/)
