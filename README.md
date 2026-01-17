# 🏠 Home Depot Canada Careers Website

A modern, fully modular careers website for The Home Depot Canada, built with Next.js and featuring a comprehensive modular architecture for scalability and maintainability.

![Home Depot Careers](https://img.shields.io/badge/Home%20Depot-Canada-blue?style=for-the-badge&logo=homedepot)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

- **🏗️ Modular Architecture** - Completely modular codebase with separated concerns
- **📱 Responsive Design** - Mobile-first design that works on all devices
- **🎨 Modern UI** - Beautiful, professional design with Tailwind CSS
- **⚡ Fast Performance** - Optimized with Next.js 15 and modern web standards
- **🔍 SEO Optimized** - Built-in SEO features for better search rankings
- **♿ Accessible** - WCAG compliant with proper ARIA labels and semantic HTML
- **🛡️ Type Safe** - Full TypeScript coverage for better development experience
- **🎯 Career Areas** - Dedicated sections for Retail Store, Field Operations, and Corporate Careers
- **📍 Location Services** - Interactive store location finder with job opportunities

## 🏛️ Architecture

This project features a **fully modular architecture** designed for scalability:

```
src/
├── types/              # TypeScript interfaces and types
├── constants/          # Shared constants and configuration
├── utils/              # Utility functions and helpers
├── hooks/              # Custom React hooks
├── lib/                # Library configurations
├── components/
│   ├── common/         # Reusable UI components (Card, Button)
│   ├── career/         # Career-specific components
│   ├── store/          # Store-related components
│   └── layout/         # Layout components
├── app/                # Next.js App Router
└── README.md          # Project documentation
```

### Key Architectural Benefits:
- **🔄 Separation of Concerns** - Each module has a single responsibility
- **♻️ Reusability** - Components and utilities can be shared across features
- **🧪 Testability** - Modular structure enables easy unit and integration testing
- **📈 Scalability** - Easy to add new features without affecting existing code
- **👥 Maintainability** - Clear structure makes the codebase easy to understand and modify

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Font Awesome 6
- **Deployment:** Vercel (recommended)
- **Package Manager:** npm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dealoincorporation/homedepot.git
   cd homedepot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📖 Usage

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

#### Components
- **Card** - Reusable card component for career areas
- **Button** - Customizable button component with variants
- **CareerAreas** - Main career opportunities section
- **StoreLocations** - Store finder with job locations

#### Constants
- `CAREER_AREAS` - Career opportunity data
- `STORE_LOCATIONS` - Store location information
- `THEME_COLORS` - Brand color palette
- `NAVIGATION_ITEMS` - Site navigation structure

#### Types
- `CareerArea` - Career opportunity interface
- `Store` - Store location interface
- `CardProps` - Card component props
- `ButtonProps` - Button component props

## 🎨 Design System

### Colors
- **Primary:** Orange (#ff6600)
- **Secondary:** Black (#000000)
- **Accent:** White (#ffffff)
- **Text:** Gray (#333333)

### Typography
- **Primary Font:** Inter (Google Fonts)
- **Headings:** Bold, 2.5rem max
- **Body:** Regular, 1rem base

### Components
- **Cards:** Black background, white text, centered icons
- **Buttons:** White borders, orange accents, Font Awesome icons
- **Layout:** Responsive grid system with proper spacing

## 🔧 Development

### Adding New Features

1. **Create types** in `src/types/`
2. **Add constants** in `src/constants/`
3. **Build components** in appropriate feature folder
4. **Add utilities** in `src/utils/` if needed
5. **Create hooks** in `src/hooks/` for complex logic

### Code Style

- **TypeScript:** Strict mode enabled
- **ESLint:** Configured for code quality
- **Prettier:** Code formatting (if configured)
- **Imports:** Organized by external → internal → relative

### Best Practices

- Use functional components with hooks
- Implement proper error boundaries
- Add loading states for async operations
- Use semantic HTML and ARIA labels
- Keep components small and focused
- Use the established design system

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Import project on Vercel
   - Connect GitHub repository

2. **Configure Build Settings**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "installCommand": "npm install"
   }
   ```

3. **Deploy**
   - Automatic deployments on push to main
   - Preview deployments for pull requests

### Other Platforms

The app can be deployed to any platform supporting Node.js:
- Netlify
- AWS Amplify
- Digital Ocean App Platform

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the established code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass
- Keep commits focused and descriptive

## 📄 License

This project is proprietary software owned by The Home Depot Canada.

## 📞 Support

For support or questions, please contact the development team.

## 🙏 Acknowledgments

- **The Home Depot Canada** - For the opportunity to build this platform
- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Font Awesome** - For the comprehensive icon library

---

**Built with ❤️ for The Home Depot Canada Team**