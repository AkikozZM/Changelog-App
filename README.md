# 🚀 AI Changelog Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.95-green.svg)](https://fastapi.tiangolo.com/)



An intelligent changelog generator that automatically transforms Git commits into beautifully formatted release notes using AI. Perfect for developers who want to save time while maintaining professional documentation.

|Fast Demo|
|:-:|
|<img src="img/demo.gif" width=800>|


## 🎨Design Concept

|Concept|
|:-:|
|<img src="img/AI-Changelog app.png" width=800>|

- Before I start coding, I think twice, "What is ai-changelog?" "Who is going to use ai-changelog?". After a deep brainstorm, I think an AI-powered changelog app should have a fast response API, such that given a GitHub Repo, it can go over the recent Git commits, categorize and summarize the information, and return human-readable data. When the AI summarizes the information, we need FIVE important keywords: Date, Title, News, Breaking Change?, and Impact. With these five keywords, we can design a structure for the return data format.
- When designing the methods of communicating back-end and front-end, I have two ideas: 1. Use a webhook to auto-trigger the back-end API. 2. Manually post an HTTP request to get data from the back-end. I use the latter idea for now because it is more important to build a Minimum Viable Product first, according to the MVP principle.
- After getting the response from the back-end API, I use a static caching strategy, storing the response to a JSON file, and saving the file in the repo. In this case, the front-end will be easier to read and reload the data from the back-end, saving a lot of time on waiting back-end to generate data.
- Once I implemented a back-end API, I designed a very clean front-end layout, including a simple left sidebar, a welcome home page, and the most important changelog pages. The changelog pages can be separated into two parts: overview and details. In the overview page, I sorted the changelog by date. I grouped all the changelogs from the same day together, emphasizing the Breaking Change if it has one. When the data is large, users can type the keywords in the search bar and filter information by selecting the types.
- In the detail page, I demonstrate the detailed information which summarized by AI. I implemented a floating navbar on the side for fast locating when the information is long.
- Finally, I deployed the back-end on Railway and the front-end on Vercel so that everyone can use the API and browse the demo front-end pages.


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

|Back-end setup|
|:-:|
|<img src="img/back-end.png" width=800>|

- Use "http POST https://YOUR_HTTP_DOMAIN/git_generate"
- (If you want to use my domain, feel free to reach out!)
- The changelog will be auto-generated in your GitHub Repo -> back-end/outputs/changelog.json






