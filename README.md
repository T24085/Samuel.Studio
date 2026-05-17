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

## EmailJS Setup

The booking form uses EmailJS on the client side. You can override the built-in defaults by setting these Vite env vars:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

The template currently expects `name`, `email`, `phone`, `service`, `preferredDate`, `message`, and `time`.

Use this updated template markup in EmailJS:

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
