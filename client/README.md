# Portfolio Client

This is the React frontend for Ishika's portfolio website, built with modern web technologies and best practices.

## Features

- 🎨 **Modern Design**: Beautiful, responsive design with Tailwind CSS
- ✨ **Smooth Animations**: Framer Motion animations for enhanced user experience
- 📱 **Mobile First**: Fully responsive design that works on all devices
- 🚀 **Performance**: Optimized for fast loading and smooth interactions
- 🎯 **SEO Ready**: Proper meta tags and semantic HTML structure

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Framer Motion** - Production-ready motion library for React
- **React Icons** - Popular icon library for React applications
- **Axios** - HTTP client for API requests

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production  
- `npm test` - Run tests
- `npm run analyze` - Analyze bundle size
- `npm run eject` - Eject from Create React App (not recommended)

## Project Structure

```
client/
├── public/                 # Static assets
│   ├── index.html         # Main HTML file
│   └── favicon.ico        # Site favicon
├── src/
|  ├── components/           # Reusable UI components
|  │   ├── Navigation/      # Navigation component
|  │   ├── Hero/           # Hero section
|  │   ├── About/          # About section
|  │   ├── Skills/         # Skills carousel
|  │   ├── Projects/       # Projects showcase
|  │   ├── CaseStudies/    # UX case studies
|  │   ├── Blog/           # Blog section
|  │   ├── Contact/        # Contact form
|  │   ├── Footer/         # Footer component
|  │   └── SEO/            # SEO components
|  ├── pages/               # Page components
|  │   ├── ProjectDetail/  # Individual project page
|  │   └── BlogPost/       # Individual blog post page
|  ├── hooks/               # Custom React hooks
|  │   ├── useScrollSpy.js # Navigation scroll spy
|  │   ├── useApi.js       # API data fetching
|  │   └── useAbout.js     # About data hook
|  ├── utils/               # Utility functions
|  │   ├── api.js          # API configuration
|  │   ├── constants.js    # App constants
|  │   └── helpers.js      # Helper functions
|  ├── contexts/            # React contexts
|  │   └── ThemeContext.js # Theme provider
|  └── App.js              # Main app componentimports
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
└── postcss.config.js      # PostCSS configuration
```

## Customization

### Styling

- **Framework**: Tailwind CSS
- **Fonts**: Playfair Display (headings), Inter (body)
- **Icons**: Material Icons
- **Animations**: Framer Motion

### Custom Tailwind Classes

```css
.btn-primary          # Primary button style
.btn-secondary        # Secondary button style
.card                # Card component style
.section-padding     # Standard section padding
.container-custom    # Custom container with max-width
```

- Global styles are in `src/index.css`
- Component-specific styles use Tailwind CSS classes
- Custom CSS components are defined in the CSS file using `@layer components`

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SITE_NAME=Ishika Portfolio
REACT_APP_SITE_URL=http://localhost:3000
```

### Tailwind Configuration

Colors, fonts, and animations are configured in `tailwind.config.js`.

## 📦 Dependencies

### Core
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Routing
- `framer-motion` - Animations

### UI & Forms
- `react-hook-form` - Form handling
- `react-hot-toast` - Notifications
- `react-intersection-observer` - Scroll animations

### Utilities
- `axios` - HTTP client
- `markdown-to-jsx` - Markdown rendering
- `date-fns` - Date formatting

### Styling
- `tailwindcss` - CSS framework
- `@tailwindcss/typography` - Typography styles

## Deployment

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy to Netlify/Vercel

1. Connect your repository to Netlify or Vercel
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy!

## 🎯 Performance Optimizations

- Code splitting with React.lazy()
- Image lazy loading
- Component memoization
- Bundle analysis with webpack-bundle-analyzer

## 📱 Responsive Design

- Mobile-first approach
- Responsive breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

## ♿ Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Screen reader support

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📊 Analytics

Configure Google Analytics by setting `REACT_APP_GA_TRACKING_ID` in environment variables.

## Backend Integration

This frontend is designed to work with a MERN stack backend. The `package.json` includes a proxy configuration pointing to `http://localhost:5000` for development.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please reach out to hello@ishika.dev
