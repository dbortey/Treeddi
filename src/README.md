# treeddi - Modern Bartering Platform

A modern web platform where people can trade items like in the old days. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🔄 **Trade System**: Request trades with other users
- 📦 **Item Management**: Upload and manage your trading items
- ❤️ **Likes System**: Like items and see popular trades
- 📱 **Responsive Design**: Mobile-friendly interface
- 🎨 **Modern UI**: Inspired by Airbnb and Uber
- 📊 **Platform Statistics**: See global trading activity
- 🔍 **Find Page**: Post requests for items you want

## Deployment to GitHub Pages

### Prerequisites

1. Make sure your repository is public or you have GitHub Pages enabled for private repos
2. Ensure you have Node.js 18+ installed

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Configure GitHub Pages:**
   - Go to your repository settings on GitHub
   - Navigate to "Pages" section
   - Under "Build and deployment":
     - Source: Select "GitHub Actions"
   
4. **Push your changes:**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

5. **Wait for deployment:**
   - GitHub Actions will automatically build and deploy your site
   - Check the "Actions" tab in your repository to monitor progress
   - Once complete, your site will be available at `https://yourusername.github.io/your-repo-name/`

### Custom Domain Setup (Optional)

If you're using a custom domain like `treeddi.switgh.com`:

1. Add a `CNAME` file to the `/public` directory with your domain:
   ```
   treeddi.switgh.com
   ```

2. Configure your DNS provider:
   - Add a CNAME record pointing to `yourusername.github.io`
   - Or add A records pointing to GitHub's IP addresses:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

3. In GitHub repository settings under Pages:
   - Enter your custom domain
   - Enable "Enforce HTTPS"

### Troubleshooting

**If you see MIME type errors:**
- The `.nojekyll` file in the root should prevent this
- Make sure the GitHub Actions workflow completed successfully
- Clear your browser cache and try again

**If pages don't load:**
- Check that the `base` path in `vite.config.ts` matches your deployment URL
- For repository deployments: `base: '/your-repo-name/'`
- For custom domains or username.github.io: `base: '/'`

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Vite** - Build tool
- **Motion (Framer Motion)** - Animations
- **Lucide React** - Icons

## License

MIT
