# 🎯 mkboard - Advanced Typing Tutor

A modern, feature-rich typing tutor application built with React and Node.js. Learn and improve your typing skills with interactive lessons, multiple languages, and comprehensive progress tracking.

## ✨ Features

- **🌍 Multi-language Support** - Practice typing in various languages and keyboard layouts
- **📊 Progress Tracking** - Monitor your typing speed, accuracy, and improvement over time
- **🎨 Customizable Themes** - Choose from multiple themes and customize your learning experience
- **🏆 Achievements & Highscores** - Track your progress and compete with others
- **⌨️ Custom Keyboard Layouts** - Support for different keyboard layouts and languages
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **🔧 Advanced Settings** - Customize difficulty, lesson types, and practice modes

## 🚀 Quick Start

### Prerequisites

- Node.js 22.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/goldbugM/mykboard.git
   cd mykboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the application**
   ```bash
   npm run build
   ```

4. **Start the development server**
   ```bash
   npm run start-dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Development

### Available Scripts

- `npm run start-dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Project Structure

```
mkboard/
├── packages/           # Modular packages
│   ├── mkboard-*      # Core application modules
│   ├── page-*         # Page components
│   └── server/        # Server-side code
├── root/              # Application root
│   ├── public/        # Static assets
│   └── lib/           # Compiled server code
├── assets/            # Source assets
└── docs/              # Documentation
```

## 🌐 Deployment

**⚠️ Important**: mkboard is a full-stack Node.js application and **cannot be deployed to GitHub Pages**. GitHub Pages only supports static websites.

### Recommended Deployment Platforms

1. **🚀 Vercel** (Recommended)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **🌐 Railway**
   - Connect your GitHub repository
   - Automatic deployment

3. **☁️ Netlify**
   - Supports serverless functions
   - Good for Node.js applications

4. **🐳 Docker**
   ```bash
   docker build -t mkboard .
   docker run -p 3000:3000 mkboard
   ```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=your_database_url
CANONICAL_URL=https://yourdomain.com
```

### Database Setup

The application supports:
- SQLite (development)
- PostgreSQL (production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the GPL-3 License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Based on the original keybr.com project
- Built with React, Node.js, and modern web technologies
- Thanks to all contributors and the open-source community

## 📞 Support

- 📧 Issues: [GitHub Issues](https://github.com/goldbugM/mykboard/issues)
- 📖 Documentation: [docs/](./docs/)
- 🚀 Deployment Guide: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**Ready to improve your typing skills?** 🎯 Deploy mkboard today and start your typing journey!