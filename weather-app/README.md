# 🌤️ Weather App

A modern, responsive weather application built with React and Vite that provides real-time weather information for any city worldwide.

## ✨ Features

- 🔍 **City Search**: Search for weather information by city name
- 🌡️ **Temperature Display**: Current temperature in Celsius
- 💧 **Humidity Information**: Real-time humidity percentage
- 💨 **Wind Speed**: Current wind speed in km/h
- 🌤️ **Weather Icons**: Dynamic weather icons based on current conditions
- 📱 **Responsive Design**: Beautiful gradient background with modern UI
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and builds

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   - Create a `.env` file in the root directory
   - Add your OpenWeatherMap API key:

   ```env
   VITE_APP_ID=your_openweathermap_api_key_here
   ```

4. **Get your API key**

   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key
   - Add it to your `.env` file

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start searching for weather information!

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🏗️ Project Structure

```
weather-app/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/           # Weather icons and images
│   │   ├── clear.png
│   │   ├── cloud.png
│   │   ├── drizzle.png
│   │   ├── humidity.png
│   │   ├── rain.png
│   │   ├── search.png
│   │   ├── snow.png
│   │   └── wind.png
│   ├── components/
│   │   ├── Weather.jsx   # Main weather component
│   │   └── Weather.css   # Weather component styles
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Features in Detail

### Weather Data Display

- **Temperature**: Shows current temperature in Celsius
- **Location**: Displays the searched city name
- **Humidity**: Shows humidity percentage with icon
- **Wind Speed**: Displays wind speed in km/h with icon
- **Weather Icon**: Dynamic icons based on weather conditions

### Weather Icons Support

The app supports various weather conditions:

- ☀️ Clear sky (day/night)
- ☁️ Cloudy conditions
- 🌧️ Rain (light/heavy)
- 🌨️ Snow
- 🌦️ Drizzle

### Error Handling

- Input validation for empty city names
- API error handling for invalid cities
- Network error handling with user-friendly messages

## 🔧 Technologies Used

- **React 19.1.0** - Frontend framework
- **Vite 7.0.4** - Build tool and development server
- **OpenWeatherMap API** - Weather data source
- **CSS3** - Styling with modern features
- **ESLint** - Code quality and consistency

## 🌐 API Integration

This app integrates with the OpenWeatherMap API to fetch real-time weather data. The API provides:

- Current weather conditions
- Temperature data
- Humidity information
- Wind speed data
- Weather icons and descriptions

## 📱 Responsive Design

The application features a beautiful gradient background and responsive design that works well on:

- Desktop computers
- Tablets
- Mobile devices

## 🚀 Deployment

To deploy this application:

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [React](https://reactjs.org/) for the amazing frontend framework
- [Vite](https://vitejs.dev/) for the fast build tool

---

**Happy Weather Tracking! 🌤️**
