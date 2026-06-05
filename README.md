# Meteon 🌤️

A weather application built with React, TypeScript, and Vite. Get real-time weather forecasts, air quality data, interactive maps, and **AI-powered** weather insights all in one place.

## 🚀 Live Deployment

**[Visit Meteon Live →](https://meteon.vercel.app)**


---

## ✨ Features

- **Real-Time Weather Data**: Current weather conditions, temperature, humidity, wind speed, and more
- **Weather Forecasts**: Hourly and daily forecasts for up to 7 days
- **Air Quality Monitoring**: Track air pollution levels and air quality index (AQI)
- **Interactive Maps**: Explore weather patterns with MapTiler integration and Leaflet
- **AI Weather Assistant**: Get personalized weather insights powered by Groq API
- **Location Search**: Search weather by location with geocoding support
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile
- **Multiple Map Types**: Switch between different map styles (streets, satellite, etc.)
- **Skeleton Loading**: Beautiful loading states for optimal UX
- **TypeScript**: Fully typed codebase for better developer experience

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript 6** - Type-safe JavaScript
- **Vite 8** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Query** - Data fetching and caching

### Maps & Visualization
- **Leaflet** - Interactive map library
- **MapTiler SDK** - Map tiles and styling
- **React Leaflet** - React bindings for Leaflet

### APIs & Services
- **Axios** - HTTP client
- **Groq SDK** - AI weather insights
- **Geolocation API** - Location-based services

### Styling & Components
- **Shadcn UI** - High-quality component library
- **Lucide React** - Icon library
- **Geist Font** - Modern typography

### Development
- **ESLint** - Code quality
- **Vite Plugin SVGR** - SVG asset handling
- **Vercel** - Deployment platform

---

## 📋 Prerequisites

- Node.js >= 16
- npm or yarn
- API keys for:
  - Weather API (OpenWeatherMap or similar)
  - MapTiler API
  - Groq API (for AI features)

---

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mk-manishkumar/meteon.git
   cd meteon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys to `.env.local`:
   ```env
   VITE_MAPTILER_API_KEY=your_maptiler_key
   VITE_GROQ_API_KEY=your_groq_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint to check code quality |
| `npm run preview` | Preview production build locally |

---

## 📁 Project Structure

```
meteon/
├── src/
│   ├── components/
│   │   ├── cards/              # Weather card components
│   │   │   ├── CurrentWeather.tsx
│   │   │   ├── HourlyForecast.tsx
│   │   │   ├── DailyForecast.tsx
│   │   │   ├── AdditionalInfo.tsx
│   │   │   └── AirPollution.tsx
│   │   ├── dropdowns/          # Filter components
│   │   ├── skeletons/          # Loading skeletons
│   │   ├── ai/                 # AI assistant components
│   │   ├── Map.tsx             # Interactive map
│   │   └── WeatherIcon.tsx     # Weather icon component
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── schemas/
│   │   └── weatherSchema.ts    # Zod validation schemas
│   ├── api.ts                  # API calls & data fetching
│   ├── types.ts                # TypeScript type definitions
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles
├── api/                        # API integrations
│   └── weather-ai.ts           # AI weather assistant API
├── public/                     # Static assets
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── package.json               # Project dependencies
└── README.md                  # Project documentation
```

---

## 🔧 Configuration

### Vite Configuration
The project uses Vite with React plugin and SVG support via vite-plugin-svgr.

### Tailwind CSS
Utility-first CSS framework is configured for responsive design and rapid development.

### TypeScript
Strict mode enabled for maximum type safety.

---

## 💡 Usage Examples

### Search Weather by Location
1. Use the location dropdown to search for a city
2. View current weather, forecasts, and air quality
3. Click on the map to get weather for any location

### AI Weather Assistant
- Interact with the AI weather assistant for personalized insights
- Get weather recommendations and analysis

### Explore Map
- Switch between different map types using the map type dropdown
- Click on the map to select different locations

---

## 🌐 API Integration

### Weather Data
- Fetches real-time and forecast data from weather APIs
- Caches results using React Query for optimal performance

### Geolocation
- Geocodes location names to coordinates
- Provides location suggestions and autocomplete

### Air Quality
- Real-time air quality index and pollution levels
- Health recommendations based on AQI

---

## 🚀 Deployment

### Vercel (Recommended)

The project is optimized for deployment on Vercel:

1. **Connect your GitHub repository to Vercel**
2. **Add environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

```bash
npm run build
# Vercel automatically serves the build
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow TypeScript strict mode
- Use ESLint for code quality
- Write meaningful commit messages
- Add tests for new features



---

## 👤 Author

**Manish Kumar**
- GitHub: [@mk-manishkumar](https://github.com/mk-manishkumar)
- Project: [Meteon](https://github.com/mk-manishkumar/meteon)

---

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing documentation
- Review the code comments

---



