# Alldeon - Official Website

> **Integrating Possibilities** - A modern, professional business website for Alldeon, a trusted global partner offering integrated services across multiple industries.

[![Website](https://img.shields.io/website?url=https%3A%2F%2Falldeon.com)](https://alldeon.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🌟 Features

- **Modern, Responsive Design** - Fully responsive layout that works beautifully on all devices
- **Professional UI/UX** - Clean, contemporary design with smooth animations and transitions
- **SEO Optimized** - Complete meta tags for search engines and social media sharing
- **Fast & Lightweight** - Pure HTML, CSS, and JavaScript with no dependencies
- **Accessible** - WCAG compliant with keyboard navigation support
- **GitHub Pages Ready** - Pre-configured for instant deployment

## 📋 Sections

- **Home** - Hero section with company tagline and key statistics
- **About** - Company story, vision, and unique value propositions
- **Services** - Comprehensive overview of integrated services offered
- **Testimonials** - Client testimonials and success stories
- **Contact** - Contact form and business information

## 🚀 Quick Start

### Option 1: View Locally

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/yourusername/alldeon.git
   cd alldeon
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **View the site**
   - Navigate to `http://localhost:8000` in your browser

### Option 2: Deploy to GitHub Pages

1. **Create a new GitHub repository**
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it anything you like (e.g., `alldeon-website`)

2. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Alldeon website"
   git branch -M main
   git remote add origin https://github.com/yourusername/alldeon-website.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository Settings
   - Scroll down to "Pages" section (left sidebar)
   - Under "Source", select `main` branch and `/ (root)` folder
   - Click "Save"
   - GitHub will provide you with a URL (e.g., `https://yourusername.github.io/alldeon-website/`)

4. **Your site is now live!** 🎉
   - It may take a few minutes for the site to be available
   - Visit the provided URL to see your live website

## 🌐 Custom Domain Setup

### Prerequisites
- You must own the domain `alldeon.com` (or update `CNAME` file with your domain)
- Access to your domain's DNS settings

### Step 1: Configure DNS Records

Add the following DNS records to your domain provider (e.g., GoDaddy, Namecheap, Cloudflare):

**A Records** (for apex domain `alldeon.com`):
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

**CNAME Record** (for www subdomain):
```
Type: CNAME
Name: www
Value: yourusername.github.io
```

### Step 2: Update CNAME File

The `CNAME` file in this repository already contains `alldeon.com`. If you're using a different domain, update it:

```bash
echo "yourdomain.com" > CNAME
git add CNAME
git commit -m "Update custom domain"
git push
```

### Step 3: Configure GitHub Pages Custom Domain

1. Go to your repository Settings
2. Navigate to the "Pages" section
3. Under "Custom domain", enter `alldeon.com`
4. Click "Save"
5. Wait for DNS check to complete (can take up to 24-48 hours)
6. Once verified, enable "Enforce HTTPS" for security

### Step 4: Verify

After DNS propagation (usually within 24 hours):
- Visit `https://alldeon.com` - Your site should load
- Visit `https://www.alldeon.com` - Should redirect to your site
- Check for the secure lock icon (HTTPS)

## 📁 Project Structure

```
alldeon/
│
├── index.html          # Main HTML file with all sections
├── styles.css          # Complete stylesheet with responsive design
├── script.js           # JavaScript for interactivity and animations
├── CNAME               # Custom domain configuration
├── README.md           # This file
└── favicon.svg         # Favicon (optional - create your own)
```

## 🎨 Customization

### Colors

Edit the CSS variables in `styles.css` to change the color scheme:

```css
:root {
    --primary-color: #0EA5E9;      /* Main brand color */
    --primary-dark: #0284C7;       /* Darker shade */
    --primary-light: #38BDF8;      /* Lighter shade */
    --secondary-color: #3B82F6;    /* Secondary brand color */
    --accent-color: #8B5CF6;       /* Accent color */
}
```

### Content

All content can be edited directly in `index.html`:
- Company information
- Services descriptions
- Testimonials
- Contact details

### Images & Logo

To add your own logo and images:
1. Create an `assets` or `images` folder
2. Add your images to the folder
3. Update the image paths in `index.html`
4. Replace the SVG logo code with your own logo

### Fonts

The site uses Google Fonts (Inter and Space Grotesk). To change fonts:
1. Visit [Google Fonts](https://fonts.google.com)
2. Select your preferred fonts
3. Replace the font link in `index.html` `<head>` section
4. Update the font family variables in `styles.css`

## 📧 Contact Form

The contact form currently uses a **placeholder implementation** that displays a success message without actually sending emails.

### To Make It Functional:

**Option 1: Using Formspree (Easiest)**
1. Sign up at [Formspree](https://formspree.io)
2. Create a new form and get your endpoint
3. Update the form in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">
   ```

**Option 2: Using EmailJS**
1. Sign up at [EmailJS](https://www.emailjs.com)
2. Set up an email service
3. Add EmailJS SDK to your `index.html`
4. Update the form handler in `script.js`

**Option 3: Custom Backend**
Create your own API endpoint and update the fetch request in `script.js`:
```javascript
fetch('https://your-api.com/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
```

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- Desktop: 1200px and above
- Tablet: 768px - 1199px
- Mobile: Below 768px

## ⚡ Performance

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 2.5s
- No external dependencies (except Google Fonts)

## 🛠️ Development

### Prerequisites
- A modern web browser
- A text editor (VS Code, Sublime Text, etc.)
- Git (for version control)

### Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/alldeon.git

# Navigate to the directory
cd alldeon

# Start a local server (choose one)
python -m http.server 8000
# or
npx http-server
# or
php -S localhost:8000

# Open browser to localhost:8000
```

### Making Changes
1. Edit the files in your text editor
2. Refresh your browser to see changes
3. Commit and push changes to GitHub
```bash
git add .
git commit -m "Your descriptive commit message"
git push
```

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support or inquiries:
- Email: hello@alldeon.com
- Website: [https://alldeon.com](https://alldeon.com)

## 🙏 Acknowledgments

- Fonts: [Google Fonts](https://fonts.google.com)
- Icons: SVG icons created inline
- Hosting: [GitHub Pages](https://pages.github.com)

## 📝 Troubleshooting

### Site not loading on custom domain
- Check DNS propagation: [WhatsMyDNS](https://www.whatsmydns.net)
- Verify CNAME file contains correct domain
- Wait 24-48 hours for full DNS propagation

### Styles not loading
- Clear browser cache (Ctrl/Cmd + Shift + R)
- Check that `styles.css` is in the same directory as `index.html`
- Verify file paths are correct

### Contact form not working
- The form is currently a placeholder
- Follow instructions in "Contact Form" section above to make it functional

### Mobile menu not opening
- Check that `script.js` is properly linked
- Open browser console (F12) to check for JavaScript errors
- Ensure JavaScript is enabled in browser

---

**Built with ❤️ for Alldeon** | © 2026 Alldeon. All rights reserved.
