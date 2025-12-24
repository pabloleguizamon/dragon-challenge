# Git Initialization Guide

## Initialize Git Repository

```bash
cd d:\dragon-challenge

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Dragon Challenge full-stack project structure"

# Add remote (replace with your repository)
git remote add origin https://github.com/your-username/dragon-challenge.git

# Push to remote
git push -u origin main
```

## Configure Git for the Project

### User Configuration (if not set globally)

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## Branch Strategy

### Main Branches
- `main` - Production-ready code
- `develop` - Development integration branch

### Feature Branches
- `feature/auth` - Authentication implementation
- `feature/products` - Products management
- `feature/orders` - Orders management
- `feature/ui` - Frontend components

### Creating Feature Branch

```bash
# Switch to develop branch
git checkout develop

# Create and switch to feature branch
git checkout -b feature/auth

# Work on your feature...

# Stage changes
git add .

# Commit
git commit -m "Implement authentication with JWT"

# Push feature branch
git push origin feature/auth

# Create Pull Request on GitHub
```

## Pre-commit Hooks (Husky)

To set up automatic code quality checks before commits:

```bash
# Install Husky in backend
cd backend
npm install husky --save-dev
npx husky install

# Create pre-commit hook
npx husky add .husky/pre-commit "npm run lint && npm run format"

# Install Husky in frontend
cd ../frontend
npm install husky --save-dev
npx husky install
npx husky add .husky/pre-commit "npm run lint && npm run format"
```

## Commit Message Convention

Follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build, dependencies, etc.

### Examples

```bash
git commit -m "feat(auth): implement JWT authentication"
git commit -m "fix(products): correct product filtering logic"
git commit -m "docs(backend): update API documentation"
git commit -m "style(frontend): format React components"
```

## Useful Git Commands

```bash
# View branches
git branch -a

# View commit history
git log --oneline -10

# View changes
git status
git diff

# Undo changes
git checkout -- <file>

# Stash changes
git stash
git stash pop

# Merge with main
git checkout main
git pull origin main
git merge develop

# Tag releases
git tag v1.0.0
git push origin v1.0.0
```

## CI/CD Setup (GitHub Actions)

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on: [push, pull_request]

jobs:
  backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_pass
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: cd backend && npm install
      - run: cd backend && npm run lint
      - run: cd backend && npm run test

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: cd frontend && npm install
      - run: cd frontend && npm run lint
      - run: cd frontend && npm run build
```

## Repository Structure Recommendations

```
dragon-challenge/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   └── cd.yml
│   └── ISSUE_TEMPLATE/
│       └── bug_report.md
├── backend/
├── frontend/
├── docs/
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── ARCHITECTURE.md
├── .gitignore
├── .gitattributes
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── package.json (root - optional workspace)
```

## Root package.json (Monorepo Setup)

Optional: Create root `package.json` for monorepo management:

```json
{
  "name": "dragon-challenge",
  "version": "1.0.0",
  "workspaces": [
    "backend",
    "frontend"
  ],
  "scripts": {
    "install": "npm install",
    "dev": "npm run dev --workspaces",
    "build": "npm run build --workspaces",
    "test": "npm run test --workspaces"
  }
}
```

Then use:
```bash
npm install          # Install all dependencies
npm run dev          # Run all projects in dev mode
npm run build        # Build all projects
```

## Contributing Guidelines

Create `CONTRIBUTING.md`:

```markdown
# Contributing

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Commit: `git commit -m "feat: your feature"`
6. Push: `git push origin feature/your-feature`
7. Open a Pull Request

## Code Standards

- Follow ESLint rules
- Use Prettier for formatting
- Write tests for new features
- Update documentation

## Pull Request Process

1. Update README.md if needed
2. Ensure all tests pass
3. Request review from maintainers
4. Merge when approved
```
