# 🌌 SmartRecommend AI

### **Instant product discovery powered by Gemini 3.1.**

*Stop filtering. Start finding.*

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Gemini](https://img.shields.io/badge/Gemini_3.1-8E75C2?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Lucide](https://img.shields.io/badge/Lucide_Icons-F3F4F6?style=for-the-badge&logo=lucide&logoColor=black)](https://lucide.dev/)

---

## 🚀 The Vision

Traditional e-commerce filters are broken. They rely on rigid categories and binary logic. **SmartRecommend AI** changes the game by using LLM-driven semantic reasoning to understand *intent*, not just keywords. Whether a user needs "a laptop for a college freshman under $1000" or "the best audio setup for a noisy home office," SmartRecommend delivers precise, justified matches instantly.

---

## ✨ Key Features

### 🧠 Gemini-Powered Reasoning Engine
Unlike basic search, our integration with `gemini-3.1-flash-lite` maps natural language to a structured product catalog. It doesn't just show products; it explains **why** they fit the user's life.

### 💎 Glassmorphic Aesthetic
A modern, high-performance UI built with a focus on visual depth. Featuring:
- **Responsive Two-Column Layout**
- **Animated Pulsing Skeletons** for zero-latency feel during API calls.
- **Dynamic AI Badging** to highlight top matches.

### 🛠️ Developer-First Architecture
- **Zero Configuration**: Built with Vite for lightning-fast HMR.
- **Strict Validation**: Real-time feedback for API keys and input constraints.
- **Secure Key Storage**: Pulls keys directly from local `.env` variables or securely through client-side state.

---

## 🛠️ Tech Stack

| Layer                  | Technology                                         |
| :--------------------- | :------------------------------------------------- |
| **Frontend**     | React 18 (Hooks + Functional Components)           |
| **Build Tool**   | Vite                                               |
| **Intelligence** | Google Gemini API (`gemini-3.1-flash-lite`)        |
| **Icons**        | Lucide React                                       |
| **Styling**      | Vanilla CSS (Modern CSS Variables & Glassmorphism) |

---

## 🏃 Getting Started

### Live Link
[https://ai-product-recommendation-ep1w.onrender.com/](https://ai-product-recommendation-408q.onrender.com)

### 1. Clone the Repository
```bash
git clone https://github.com/Amandeep-winner/ai-product-recommendation.git
cd ai-product-recommendation
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure API Key
Create a `.env` file in the root of the project:
```bash
cp .env.example .env
```
Open `.env` and add your Gemini API Key:
```env
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*(If no `.env` file is present, the app will safely show a secure key-input prompt in the sidebar).*

### 4. Launch Development Server
```bash
npm run dev
```

---

## 🔍 Searching & Product Discovery

Instead of checking checkboxes, simply tell the recommendation engine what you want in your own words.

### How to Search
1. Describe **who** the product is for or **what context** you will use it in.
2. Specify constraints like **budget**, **must-have features**, or **weight**.
3. Submit and wait for Gemini to select matching products and present its reasoning.

### Search Examples

*   **Example 1: Budget College Setup**
    > *"I need a laptop for college classes. I walk a lot, so it must be lightweight, and my budget is under $1000."*
    *   *AI Match*: **Zenith Air 13** (Lightweight, long battery, fits under the price limit).

*   **Example 2: Ultimate Gaming Setup**
    > *"I want the highest-end gaming setup possible with maximum performance. Budget is not an issue."*
    *   *AI Match*: **Apex Vanguard 17** (RTX 4080 GPU, i9 CPU, 240Hz screen).

*   **Example 3: WFH Noise Isolation**
    > *"I work in a noisy environment and need something to block out background noise during calls and listen to clear music."*
    *   *AI Match*: **Sonic Shield ANC** (Active Noise Cancellation, studio-quality sound).

*   **Example 4: Cable Management & Accessories**
    > *"My desk is a mess with cords for my watch, earbuds, and phone. I need to declutter my desk."*
    *   *AI Match*: **OmniDock 4-in-1** (Wireless charging dock for multiple devices).

---

## 📖 How It Works

1. **Requirement Capture**: Users describe their ideal setup in natural language.
2. **Context Injection**: The system bundles the entire product catalog (`src/data/products.js`) with the user's prompt.
3. **Semantic Mapping**: Gemini analyzes the catalog and returns a structured JSON recommendation set.
4. **Justified Display**: The UI renders the results, highlighting "AI Picks" and providing the reasoning behind every selection.

---

## 🤝 Contributing

We welcome contributions! Whether it's adding new product categories to the catalog or refining the prompt engineering for better matches.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ for the future of E-Commerce.
</p>
