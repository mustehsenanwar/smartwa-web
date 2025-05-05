# SmartWA Landing Page

A modern, responsive pre-launch landing page for SmartWA - the AI-powered WhatsApp automation tool. This landing page is designed to capture email addresses from prospective customers interested in the upcoming SaaS product.

## Features

- Fully responsive design optimized for all device sizes
- Modern UI with subtle animations and AI-inspired aesthetics
- Enhanced hero section with animated elements and floating badges
- Email capture form with validation using Web3Forms
- Clear product value proposition and benefits communication
- Simple 3-step process explanation
- Background shapes and subtle animations to enhance visual appeal

## Project Structure

```
smartwa-web/
├── index.html        # Main HTML file
├── css/              # CSS styles
│   └── style.css     # Main stylesheet
├── js/               # JavaScript
│   └── script.js     # Form handling and animations
└── images/           # Image assets
    └── placeholder-images.txt  # List of required images
```

## Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/smartwa-web.git
   cd smartwa-web
   ```

2. Add the required images:

   - Review `images/placeholder-images.txt` for the list of required images
   - Add your custom images to the `images/` directory
   - Alternatively, use placeholder images as suggested in the placeholder file

3. Open `index.html` in your browser to view the landing page

## Web3Forms Integration

This landing page uses [Web3Forms](https://web3forms.com/) for email collection. The integration is already set up in the HTML and JavaScript files.

The current API key included in the forms is:

```
b42c0d9a-1f7a-4fc5-ad30-7514486804cb
```

To change to your own Web3Forms account:

1. Create an account at [Web3Forms](https://web3forms.com/)
2. Get your access key from the dashboard
3. Replace the existing key in the HTML forms:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
   ```

### Form Submission Logic

The form submission is handled in `js/script.js` and includes:

- Email validation
- Loading state during submission
- Success and error message handling
- Form reset after successful submission

## Customization

### Color Scheme

You can easily customize the color scheme by editing the CSS variables in `css/style.css`:

```css
:root {
  --primary-color: #3366ff; /* Main brand color */
  --primary-dark: #2347ca; /* Darker shade of primary color */
  --accent-color: #00c2cb; /* Secondary accent color */
  --accent-dark: #018f96; /* Darker shade of accent color */
  --dark-color: #1a1e2a; /* Dark elements */
  --light-color: #ffffff; /* Light elements */
  /* ... other variables ... */
}
```

### Hero Section

The hero section now includes:

- Animated heading with highlight effect
- Feature checkmarks for key benefits
- Floating badges around the hero image
- Background shapes with subtle animations
- Privacy notice under the email form

You can modify these elements in the HTML and CSS files to match your brand style.

### Content

To modify the content, simply edit the text in `index.html`. The page is structured in clear sections:

1. Hero Section (Above the Fold)
2. Problem & Solution Section
3. Features and Benefits Section
4. How It Works Section
5. Final Call to Action Section

## Browser Compatibility

This landing page is compatible with modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

[MIT License](LICENSE)

## Contact

For any questions or help, please contact [your-email@example.com]
