# 📧 Temp Mail Service

A modern, privacy-focused temporary email service built with Next.js 15 and powered by JuheAPI. Perfect for protecting your privacy when signing up for services, testing applications, or avoiding spam.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JuheApi-com/temp-mail&env=JUHE_API_KEY&envDescription=JuheAPI%20key%20for%20temporary%20email%20service&envLink=https://juheapi.com/api-catalog/temp-mail)

## ✨ Features

- 🚀 **Instant Email Generation** - Create temporary email addresses in seconds
- ⏰ **Auto-Expiration** - Emails automatically expire after 5 minutes for security
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🔒 **Privacy-First** - No registration required, completely anonymous
- 🎨 **Modern UI** - Beautiful interface with smooth animations
- 🔄 **Real-time Updates** - Manual refresh with cooldown protection
- 📊 **Usage Analytics** - Anonymous tracking for service improvement
- 🌐 **SEO Optimized** - Proper meta tags and sitemap included

## 🎯 Perfect For

- **Students** learning web development and API integration
- **Developers** testing email functionality in applications
- **Privacy-conscious users** avoiding spam and protecting personal emails
- **Educational projects** demonstrating modern web technologies

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A JuheAPI account and API key ([Get Free API here](https://juheapi.com/api-catalog/temp-mail))

### 1. Clone the Repository

```bash
git clone https://github.com/juheapi.com/temp-mail.git
cd temp-mail
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

```env
JUHE_API_KEY=your_juhe_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your temp mail service!

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `JUHE_API_KEY` | Your JuheAPI key for temp mail | Yes | - |
| `NEXT_PUBLIC_SITE_URL` | Your site URL for SEO and analytics | No | http://localhost:3000 |

### API Configuration

The app uses JuheAPI's temporary email service. You can customize:

- **Email lifetime**: Currently set to 5 minutes (300 seconds)
- **Refresh cooldown**: 10 seconds between manual refreshes
- **Rate limiting**: Built into the API endpoints

## 📁 Project Structure

```
temp-mail/
├── app/
│   ├── api/                    # API routes
│   │   └── temp-mail/         # Temp mail API endpoints
│   ├── components/            # React components
│   │   ├── layout/            # Header, footer, navigation
│   │   ├── sections/          # Page sections
│   │   └── ui/                # Reusable UI components
│   ├── contexts/              # React contexts
│   ├── lib/                   # Utility functions
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   ├── privacy-policy/        # Privacy policy page
│   └── terms-of-service/      # Terms of service page
├── public/                    # Static assets
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## 🎨 Styling

The project uses:

- **Tailwind CSS** for utility-first styling
- **Custom components** with consistent design system
- **Responsive design** that works on all devices
- **Dark/light mode** support (via Tailwind)
- **Smooth animations** and transitions

## 🔌 API Integration

### JuheAPI Integration

The app integrates with JuheAPI's temporary email service:

```typescript
// Generate temporary email
const response = await fetch('/api/temp-mail/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
});

// Check for messages
const messages = await fetch('/api/temp-mail/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: tempEmail })
});
```

### Custom API Endpoints

- `POST /api/temp-mail/generate` - Generate new temporary email
- `POST /api/temp-mail/messages` - Retrieve messages for email
- `GET /api/temp-mail/domains` - Get available email domains

## 📱 Features Deep Dive

### Email Management
- **Automatic Expiration**: Emails expire after 5 minutes
- **Real-time Countdown**: Visual timer showing remaining time
- **Progress Bar**: Visual indication of email lifetime
- **Status Indicators**: Clear status of email state

### User Experience
- **One-click Copy**: Copy email addresses to clipboard
- **Message Preview**: See message content before opening
- **Responsive Cards**: Beautiful card-based interface
- **Loading States**: Smooth loading animations

### Security & Privacy
- **No Registration**: Completely anonymous service
- **Auto-cleanup**: All data automatically deleted
- **Rate Limiting**: Prevents abuse and spam
- **CORS Protection**: Secure API endpoints

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **One-Click Deploy**: Click the "Deploy with Vercel" button above
2. **Set Environment Variables**: Add your `JUHE_API_KEY`
3. **Deploy**: Your app will be live in minutes!

### Manual Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**:
   - Vercel
   - Netlify
   - Railway
   - DigitalOcean App Platform

### Environment Variables for Production

Make sure to set these in your deployment platform:

```env
JUHE_API_KEY=your_production_api_key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

### Adding New Features

1. **Create components** in `app/components/`
2. **Add API routes** in `app/api/`
3. **Update types** in TypeScript files
4. **Add tests** for new functionality
5. **Update documentation**

### Code Style

- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for formatting
- **Tailwind CSS** for styling
- **Component-based architecture**

## 🎓 Learning Resources

This project is perfect for learning:

### Frontend Development
- **Next.js 15** with App Router
- **React 18** with Hooks and Context
- **TypeScript** for type safety
- **Tailwind CSS** for rapid styling

### Backend Development
- **API Routes** in Next.js
- **RESTful API design**
- **External API integration**
- **Error handling**

### Modern Web Practices
- **SEO optimization**
- **Responsive design**
- **Privacy-first development**
- **User experience design**

## 🤝 Contributing

We welcome contributions from students and developers! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow the code style guidelines
4. **Add tests**: Ensure your code is tested
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Describe your changes

### Development Guidelines

- Write clear, readable code
- Add comments for complex logic
- Follow TypeScript best practices
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Demo**: [https://www.juheapi.com/freetrial/tempmail](https://www.juheapi.com/freetrial/tempmail)
- **JuheAPI**: [https://juheapi.com](https://juheapi.com)
- **Free APIs**: [https://freeapis.juheapi.com/apis](https://freeapis.juheapi.com/apis)
- **Next.js**: [https://nextjs.org](https://nextjs.org)
- **Tailwind CSS**: [https://tailwindcss.com](https://tailwindcss.com)

## 💡 Educational Value

This project demonstrates:

### For Beginners
- How to build a complete web application
- API integration and data fetching
- Responsive design principles
- State management in React

### For Intermediate Developers
- Advanced Next.js patterns
- TypeScript implementation
- Custom API development
- Production deployment strategies

### For Advanced Developers
- Performance optimization
- Security best practices
- Scalable architecture
- Open source contribution

## 🆘 Support

Need help? Here are some resources:

- **Issues**: Open an issue on GitHub
- **Documentation**: Check the code comments
- **Community**: Join discussions in issues
- **Email**: Contact us at support@juheapi.com

## 🎉 Acknowledgments

- **JuheAPI** for providing the temporary email service
- **Vercel** for hosting and deployment platform
- **Next.js team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Open source community** for inspiration and tools

---

Built with ❤️ for the developer community. Perfect for students, educators, and anyone learning modern web development!