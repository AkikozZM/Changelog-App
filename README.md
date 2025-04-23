# 🚀 AI Changelog Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.95-green.svg)](https://fastapi.tiangolo.com/)

An intelligent changelog generator that automatically transforms Git commits into beautifully formatted release notes using AI. Perfect for developers who want to save time while maintaining professional documentation.

![Demo]()

## ✨ Features

- **AI-Powered Summaries**: GPT-4 transforms raw commits into human-readable changelog entries
- **Breaking Change Detection**: Automatically highlights breaking changes with impact analysis
- **Multi-Platform Support**: 
  - 🌐 Web interface for easy browsing
  - 🤖 API for integration with CI/CD pipelines
- **Smart Caching**: JSON-based caching for fast loading
- **Customizable**: Configure your own:
  - Git repositories
  - OpenAI models
  - Output formats

## 🛠️ Tech Stack

| Component       | Technology |
|-----------------|------------|
| Backend         | FastAPI, Python 3.11 |
| Frontend        | React, TypeScript, TailwindCSS |
| AI Engine       | OpenAI "gpt-4.1-nano" |
| Deployment      | Railway (Backend), Vercel (Frontend) |
| Version Control | GitHub |

## 🚀 Quick Start

### Test Environment
- Python 3.11.3
- OpenAI API key
- Git repository

### Step by step
- Clone my repository
- cd Changelog-App/back-end
- pip install -r requirements.txt
- cp .env.example .env
- Deploy the back-end folder on Railway
- Set up the variables
- Use "http POST https://YOUR_WEB/git_generate"
- The changelog will be auto-generated in your GitHub Repo -> back-end/outputs/changelog.json

