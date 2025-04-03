<div align="center">

# 🎵 BeatMatch AI 🎧

[![Spotify API](https://img.shields.io/badge/Spotify-API-1ED760?style=for-the-badge&logo=spotify&logoColor=white)](https://developer.spotify.com/documentation/web-api/)
[![OpenAI](https://img.shields.io/badge/Powered%20by-OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)

An intelligent Spotify playlist generator that creates personalized playlists based on your mood, activities, and music preferences using artificial intelligence.

<img src="/public/beatmatch_logo.png" alt="BeatMatch AI Logo" width="250"/>

</div>

---

## ✨ Features

- 🤖 **AI-Generated Playlists**: Create custom playlists using OpenAI that match your current mood, activity, and musical taste
- 😊 **Mood-Based Discovery**: Browse playlists categorized by moods like Happy, Sad, Chill, Excited, Romantic, and more
- 🏃‍♂️ **Activity-Driven Playlists**: Find the perfect soundtrack for Workout, Study, Party, Focus, Sleep, or Drive
- 🎧 **Spotify Integration**: Save generated playlists directly to your Spotify account
- 👤 **Personalized Experience**: Recommendations adapt to your favorite artists and genres
- 🎭 **Demo Mode**: Try the app without connecting your personal Spotify account

---

## 🛠️ Tech Stack

<details open>
<summary><b>💻 Frontend</b></summary>
<br>

- ⚛️ React 18
- 🔄 Redux Toolkit for state management
- 🧭 React Router for navigation
- 🎨 Tailwind CSS for styling
- ⚡ Vite as build tool
- 🌊 Smooth scrolling with Lenis

</details>

<details open>
<summary><b>🖥️ Backend</b></summary>
<br>

- 📊 Node.js with Express
- 🗄️ MongoDB with Mongoose
- 🎵 Spotify API integration
- 🧠 OpenAI API for playlist generation
- 🔐 Express-session and Passport for authentication

</details>

---

## 📋 Installation

### Prerequisites

- Node.js (v18+)
- MongoDB database
- Spotify Developer account
- OpenAI API key

### Environment Setup

<details>
<summary>View Setup Instructions</summary>

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/BeatMatch-AI.git
   cd BeatMatch-AI
   ```

2. Create a `.env` file in the root directory and add the following environment variables:
   ```plaintext
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback
   OPENAI_API_KEY=your_openai_api_key
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=a_random_secret_string
   BEATMATCH_SPOTIFY_ID=your_app_spotify_id
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the backend server
   ```bash
   npm run dev:backend
   ```

5. In a separate terminal, start the frontend
   ```bash
   npm run dev:frontend
   ```
</details>

---

## 🚀 Usage

<details>
<summary><b>Connecting with Spotify</b></summary>
<br>

1. Visit the homepage and click "Connect with Spotify"
2. Authorize the application to access your Spotify data
3. You will be redirected to the discover page after successful login

</details>

<details>
<summary><b>Creating a Playlist</b></summary>
<br>

1. Navigate to the Dashboard
2. Select your current mood (Happy, Sad, Chill, etc.)
3. Choose your activity (Workout, Study, Party, etc.)
4. Add your favorite genres and artists
5. Choose playlist length
6. Click "Generate Playlist"
7. Save the generated playlist to your Spotify account

</details>

<details>
<summary><b>Discovering Playlists</b></summary>
<br>

1. Browse the Discover page for curated playlists by mood or activity
2. Click on any playlist to view its tracks
3. Save playlists you like to your Spotify account

</details>

---

## 🌐 Deployment

<details>
<summary><b>Deploying to Render.com</b></summary>
<br>

1. Create a PostgreSQL database on Render
2. Create a Web Service and connect your repository
3. Configure environment variables
4. Set build command: `npm install && npm run build`
5. Set start command: `npm start`

</details>

---

## 🧪 Demo Mode

For users who want to try the application without connecting their personal Spotify account, BeatMatch AI offers a demo mode that uses a shared Spotify account. Note that any playlists created in demo mode will be visible to all demo users.

---


---

## 📜 License

MIT License

---

## 👨‍💻 Created By

Aaron Garcia

<div align="center">
<i>BeatMatch AI is not affiliated with Spotify. Spotify is a trademark of Spotify AB.</i>
</div>
