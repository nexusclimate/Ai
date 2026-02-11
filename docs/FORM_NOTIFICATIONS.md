# Netlify Form Notifications

This doc describes how form submissions are set up for **GPT submission** and how to configure notifications in the Netlify dashboard.

## Form setup (in code)

- **Form name:** `gpt-submission`
- **Email field:** The form has an `<input name="email">` (Your Email). Netlify uses this as the **Reply-to** address on notification emails, so you can reply directly to the submitter.
- **Subject line:** A hidden `subject` input is set so notification emails use:
  - `%{formName}` — form name (e.g. `gpt-submission`)
  - `%{siteName}` — your Netlify site name
  - `%{submissionId}` — unique submission ID

  Example subject:  
  `New GPT submission · %{formName} · %{siteName} (#%{submissionId})`

Netlify automatically sanitizes submissions (e.g. strips `<script>` and other harmful content).

## Predefined variables for notifications

You can use these in the **email subject line** (in the form’s hidden `subject` field or in Netlify UI):

| Variable          | Description                    |
|-------------------|--------------------------------|
| `%{formName}`     | Name of the form               |
| `%{siteName}`      | Name of the Netlify site       |
| `%{submissionId}`  | Unique ID for this submission  |

Custom form fields (e.g. `%{gpt-name}`, `%{category}`) can also be used if you configure them in the Netlify UI.

## Where to set up notifications

1. In **Netlify Dashboard:** Site → **Forms** → select form **gpt-submission** → **Form notifications** (or **Site configuration** → **Forms** → **Form notifications**).
2. Add an **Email notification**.
3. Set **Recipient** (e.g. `contact@nexusclimate.ai`).
4. The **Subject** is already set by the form’s hidden `subject` input. To override or edit it in the UI, use the variables above (e.g. `New GPT submission · %{formName} (#%{submissionId})`).

## Security

Netlify form handling sanitizes submissions to protect your site. Code and dangerous content submitted via the form is neutralized.
