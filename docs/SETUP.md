# Portfolio Setup Guide

## Contact Form (Formspree)

To make the contact form send emails, you need to set up a free Formspree account:

1. **Go to Formspree.io** and sign up for a free account
2. **Create a new form** and get your form ID
3. **Update config.js** with your form ID:
   ```javascript
   formspree: "https://formspree.io/f/YOUR_FORM_ID"
   ```

4. **Test your form** - you should receive an email when someone submits the form

Formspree Free Plan Features:
- Up to 50 submissions per month
- Spam filtering
- Email notifications
- No coding required

## Scheduling (Calendly)

To enable the "Schedule a Call" feature:

1. **Go to Calendly.com** and sign up for a free account
2. **Create an event type** (e.g., 30-minute consultation)
3. **Copy your scheduling link**
4. **Update config.js** with your link:
   ```javascript
   calendly: "https://calendly.com/YOUR_USERNAME/YOUR_EVENT"
   ```

5. **Share your link** - visitors can book time directly on your Calendly page

Calendly Free Plan Features:
- One event type
- One user
- Basic integrations
- Unlimited scheduling

## Social Media Links

Update your social media profiles in `js/config.js`:

```javascript
social: {
  linkedin: {
    url: "https://linkedin.com/in/YOUR_PROFILE",
    username: "YOUR_PROFILE",
    label: "LinkedIn Profile"
  },
  twitter: {
    url: "https://twitter.com/YOUR_HANDLE",
    username: "YOUR_HANDLE",
    label: "Twitter Profile"
  },
  instagram: {
    url: "https://instagram.com/YOUR_HANDLE",
    username: "YOUR_HANDLE",
    label: "Instagram Profile"
  }
}
```

## Email Configuration

Update your email in `js/config.js`:

```javascript
personal: {
  email: "your@email.com",      // Primary contact email
  altEmail: "hello@yourdomain.com",  // Alternative email
}
```

## CV/Resume

1. Place your CV PDF file in the `assets/` folder
2. Name it `cv.pdf` or update config.js:
   ```javascript
   cv: {
     pdfUrl: "assets/YOUR_CV_FILE.pdf",
     fileName: "Your_Name_CV.pdf"
   }
   ```

## Quick Configuration Checklist

- [ ] Update personal info (name, title, tagline)
- [ ] Set up Formspree for contact form
- [ ] Set up Calendly for scheduling
- [ ] Update all social media links
- [ ] Add your CV PDF to assets folder
- [ ] Test email sending
- [ ] Test Calendly booking

## Troubleshooting

**Form not sending emails?**
- Check your Formspree form ID is correct
- Verify your Formspree account is active
- Check spam folder for test emails

**Calendly link not working?**
- Make sure your Calendly link is correct
- Check that your Calendly event is published

**Social icons not showing?**
- Verify the data attributes are correct
- Check browser console for errors
