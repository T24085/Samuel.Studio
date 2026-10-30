# Samuel Studio

Premium editorial photography website built with React, Vite, Tailwind CSS, Framer Motion, and Lucide React.

## Scripts

- `npm run dev` - start the local Vite dev server
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally

## Static Deployment

This project includes `public/_redirects` so client-side routes work on static hosts that support rewrites, such as Netlify.

## Photo Assets

Photography assets live in `public/photos/` and are referenced directly from the site data layer.

## Content Notes

The site uses placeholder business details, prices, and contact links so it can be launched as a polished starter and then customized with real studio information.

## Inquiry Delivery

The booking form POSTs to `https://allstreetlabs.com/api/studio-inquiry`.
The isolated Netlify function is maintained in `allstreetlabs/asl-site` and
uses its existing server-side Brevo key. Never put that key in a Vite variable.

Sender: `Samuel Studio <notifications@notify.ondefiant.com>` (temporary DEFIANT
sender while Samuel Studio's Workspace domain is recovered).
Recipient: `studiodefiant@gmail.com`. Reply-To: the visitor's validated address.
No marketing-list signup or automatic customer email is triggered.
The form preserves its values on failure and shows success only after the
server confirms Brevo acceptance. Acceptance is not proof of inbox placement.
Run `node --test tests/inquiry.test.mjs` for delivery-client tests.

Deploy the backend endpoint before publishing this frontend. Disable it with
`STUDIO_INQUIRIES_ENABLED=false` in the ASL Netlify site if needed. EmailJS is
no longer used; the old template below is retained only as historical markup.

### Historical EmailJS Template (Unused)

```html
<div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 14px; color: #111; line-height: 1.5;">

  <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700;">
    New Inquiry — Samuel Studio
  </h2>

  <p style="margin: 0 0 18px 0; color: #555;">
    A new inquiry has been submitted through the Samuel Studio website.
  </p>

  <div style="padding: 18px; border: 1px solid #ddd; border-radius: 10px; background: #ffffff;">

    <p style="margin: 0 0 14px 0;">
      <strong>Name:</strong><br>
      {{name}}
    </p>

    <p style="margin: 0 0 14px 0;">
      <strong>Email:</strong><br>
      <a href="mailto:{{email}}" style="color: #111; text-decoration: underline;">
        {{email}}
      </a>
    </p>

    <p style="margin: 0 0 14px 0;">
      <strong>Phone:</strong><br>
      <a href="tel:{{phone}}" style="color: #111; text-decoration: underline;">
        {{phone}}
      </a>
    </p>

    <p style="margin: 0 0 14px 0;">
      <strong>Service:</strong><br>
      {{service}}
    </p>

    <p style="margin: 0 0 14px 0;">
      <strong>Preferred Date:</strong><br>
      {{preferredDate}}
    </p>

    <div style="margin-top: 18px; padding-top: 16px; border-top: 1px solid #eee;">
      <strong>Message:</strong>
      <p style="margin: 8px 0 0 0; white-space: pre-line;">
        {{message}}
      </p>
    </div>

  </div>

  <p style="margin: 14px 0 0 0; font-size: 12px; color: #777;">
    Submitted at: {{time}}
  </p>

</div>
```

## Chat Assistant

This site also includes a floating chat assistant for lead intake and session scoping.

The widget sends inquiries to the shared assistant backend and keeps transcripts separate by site key.

Recommended env vars:

- `VITE_SITE_KEY=samuel-studio`
- `VITE_PUBLIC_CHAT_BASE_URL=https://chat.novatec.casa`
- `VITE_ASSISTANT_CHAT_URL=https://chat.novatec.casa/api/assistant-chat`
- `VITE_CHAT_LOG_ENDPOINT=https://chat.novatec.casa/api/chat-log`
- `VITE_OLLAMA_MODEL_CANDIDATES=gemma4:12b,gemma3:12b,llama3.1:8b,qwen2.5:7b`

The assistant is tuned for:

- Editorial & Campaign Work
- Personal Identity
- Visual Story Projects
- Private Portraits

It asks for the project type, goal, date, location, budget, inspiration, and contact details before moving into the conversation.
