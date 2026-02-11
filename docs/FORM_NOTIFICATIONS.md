# Netlify Form Notifications

This doc describes how form submissions are set up for **GPT submission** and how to configure notifications in the Netlify dashboard.

## Form setup (in code)

- **Form name:** `gpt-submission`
- **Reply-to (submitter email):** The form has an `<input name="email">` (Your Email). Netlify sets the notification email’s **Reply-to** to this value, so when you hit “Reply” your message goes **directly back to the submitter**—no need to copy their address.
- **Subject line:** A hidden `subject` input is set to include GPT/tool name and submitter name when possible:
  - `GPT submission: %{gpt-name} — from %{submitter-name} (#%{submissionId})`
  - `%{gpt-name}` and `%{submitter-name}` are the form fields “GPT/Tool Name” and “Your Name”; `%{submissionId}` is Netlify’s unique ID. If your Netlify plan doesn’t replace the field variables in the subject, set a custom subject in the UI; the notification **body** always lists all fields (see below).
- **Email body:** The notification email lists every form field. You’ll see:
  - **GPT/Tool Name** (field `gpt-name`)
  - **Submitter name** (field `submitter-name`)
  - **Submitter email** (field `email`) — this is also the Reply-to address

Netlify automatically sanitizes submissions (e.g. strips `<script>` and other harmful content).

## Predefined variables for notifications

Use these in the **email subject line** (in the form’s hidden `subject` field or in Netlify UI):

| Variable          | Description                    |
|-------------------|--------------------------------|
| `%{formName}`     | Name of the form               |
| `%{siteName}`     | Name of the Netlify site       |
| `%{submissionId}` | Unique ID for this submission  |

Some Netlify setups also support **form field values** in the subject (e.g. `%{gpt-name}`, `%{submitter-name}`). If those appear literally in the email, set the subject in **Netlify UI** and use the same variables there if available.

## Where to set up notifications

1. In **Netlify Dashboard:** Site → **Forms** → select form **gpt-submission** → **Form notifications** (or **Site configuration** → **Forms** → **Form notifications**).
2. Add an **Email notification**.
3. Set **Recipient** (e.g. `contact@nexusclimate.ai`).
4. The **Subject** is already set by the form’s hidden `subject` input. To override or edit it in the UI, use the variables above (e.g. `New GPT submission · %{formName} (#%{submissionId})`).

## Security

Netlify form handling sanitizes submissions to protect your site. Code and dangerous content submitted via the form is neutralized.
