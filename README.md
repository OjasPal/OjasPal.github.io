<div align="center">

# Ojas Pal · Generative AI Portfolio

Generative AI, RAG and applied machine learning projects, from data preparation to cloud deployment.

<div align="center">

<a href="https://ojaspal.github.io">
  <img src="https://img.shields.io/badge/✦%20EXPLORE%20MY%20PORTFOLIO-000000?style=for-the-badge&logoColor=white&labelColor=000000" alt="Explore My Portfolio" height="45"/>
</a>

<br/>

<a href="https://www.linkedin.com/in/ojas-pal/">
  <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
</a>
&nbsp;
<a href="mailto:ojaspal.dev@gmail.com">
  <img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/>
</a>

</div>

[![Deploy to GitHub Pages](https://github.com/OjasPal/OjasPal.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/OjasPal/OjasPal.github.io/actions/workflows/deploy.yml) ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)

</div>

## Overview

This repository contains the source of my personal portfolio at [ojaspal.github.io](https://ojaspal.github.io). I am a third-year B.Tech student in AI and Data Science at USAR, GGSIPU, seeking AI/ML internships and open to freelance projects.

The website presents my projects, skills, experience and resume. This README covers the code behind it.

## Featured projects

| Project | Description | Links |
| :-- | :-- | :-- |
| **Personal Gemini Journal** | Multi-tenant AI journaling app with Firebase Auth, Firestore, contextual memory and semantic search over past entries. Hosted on Cloud Run. | [Live](https://journal-frontend-931033287675.us-central1.run.app) · [Code](https://github.com/OjasPal/Personal-Gemini-Journal) · [Video](https://youtu.be/dzPP3nAXzfA) |
| **Medical RAG Chatbot** | Medical assistant using retrieval-augmented generation with LangChain, Pinecone and Groq (GPT-OSS 20B). Hosted on Cloud Run. | [Live](https://medical-chatbot-1032077414344.asia-south2.run.app) · [Code](https://github.com/OjasPal/Medical-RAG-Chatbot) |
| **ML-DL Portfolio** | Eleven machine learning and deep learning apps, rebuilt from notebooks into one multi-page Streamlit app. | [Live](https://ojaspal-ml-dl-portfolio.streamlit.app) · [Code](https://github.com/OjasPal/ML-DL-Portfolio) |
| **EvalAI** | Fine-tuned RoBERTa reward model that predicts which of two LLM responses, generated locally with Ollama (Llama 3.2, Qwen 2.5), a person would prefer. FastAPI backend, Streamlit UI. | [Code](https://github.com/OjasPal/EvalAI) · [Video](https://youtu.be/BvUrBhxuUrc) |

Hosted demos can take a few seconds to wake up on first load.

## Tech stack

React 19, TypeScript, Vite 8, Tailwind CSS 4 and Motion, deployed with GitHub Actions to GitHub Pages. Content lives in typed data files under `src/data/`. The site has no backend or analytics; its only external resource is fonts from Google Fonts.

## Getting started

**Prerequisites:** Node.js 20.19+ or 22.12+ (required by Vite 8) and Git.

```bash
git clone https://github.com/OjasPal/OjasPal.github.io.git
cd OjasPal.github.io
npm install
npm run dev
```

Open http://localhost:3000. Use `npm run build` to create a production build in `dist/`, and `npm run preview` to serve it locally.

## Deployment

Every push to `main` runs the workflow in `.github/workflows/deploy.yml`. It installs dependencies with `npm ci`, builds the site with `npm run build`, and publishes `dist/` to GitHub Pages.

## Contact

- Email: [ojaspal.dev@gmail.com](mailto:ojaspal.dev@gmail.com)
- LinkedIn: [linkedin.com/in/ojas-pal](https://www.linkedin.com/in/ojas-pal/)

## Licensing

- **Source code:** Licensed under the [MIT License](LICENSE), excluding personal assets covered by [ASSET-LICENSE.md](ASSET-LICENSE.md).
- **Personal assets** Original artwork, OP monogram, screenshots, resume and original written content © 2026 Ojas Pal. All rights reserved. See [ASSET-LICENSE.md](ASSET-LICENSE.md).
