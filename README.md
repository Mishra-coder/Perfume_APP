# Aroma Luxe - Premium Perfume Boutique

<p align="left">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

### Live Demo

**Web Application**: [https://aroma-luxe-static.vercel.app](https://aroma-luxe-static.vercel.app)

Aroma Luxe is a premium, minimalist perfume shopping application. It provides a high-end product catalog, a personalized scent quiz to discover your signature fragrance, and a seamless shopping experience.

---

## Project Showcase

<p align="center">
  <table align="center">
    <tr>
      <td align="center"><b>Splash Screen</b></td>
      <td align="center"><b>Home Screen</b></td>
      <td align="center"><b>Scent Quiz</b></td>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/f75a6b94-0063-45e1-9d89-9398826411ad" width="250" /></td>
      <td><img src="https://github.com/user-attachments/assets/34448a22-f3c2-4528-b95e-a9347761b6a2" width="250" /></td>
      <td><img src="https://github.com/user-attachments/assets/ed9b7cc5-7284-48d3-9c44-ed11de5c2ab3" width="200" /></td>
    </tr>
  </table>
</p>

---

## Features

- **Personalized Scent Quiz**: Helping you find the perfect fragrance.
- **Detailed Product Info**: Fragrance notes (Top, Heart, Base).
- **Commerce**: Real-time cart and secure checkout.
- **User Accounts**: JWT-based login and orders history.
- **Dark Mode Support**: Beautiful UI in both light and dark themes.
- **Wishlist**: Save your favorite perfumes for later.
- **Order Tracking**: View complete order history and details.

---

## Project Structure

```
Perfume_APP/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Header.js
│   │   │   ├── FilterModal.js
│   │   │   └── RecommendationCard.js
│   │   ├── context/          # React Context providers
│   │   │   ├── UserContext.js
│   │   │   ├── CartContext.js
│   │   │   └── ThemeContext.js
│   │   ├── data/             # Product catalog and data
│   │   │   └── products.js
│   │   ├── navigation/       # Navigation configuration
│   │   │   └── MainNavigator.js
│   │   ├── screens/          # Application screens
│   │   │   ├── SplashScreen.js
│   │   │   ├── HomeScreen.js
│   │   │   ├── ProductDetailScreen.js
│   │   │   ├── AuthScreen.js
│   │   │   ├── CartScreen.js
│   │   │   ├── CheckoutScreen.js
│   │   │   ├── WishlistScreen.js
│   │   │   ├── ProfileScreen.js
│   │   │   ├── OrdersScreen.js
│   │   │   └── RecommendationScreen.js
│   │   ├── theme/            # Theme configuration
│   │   │   └── theme.js
│   │   └── utils/            # Utility functions
│   │       ├── api.js
│   │       └── recommendationEngine.js
│   ├── assets/               # Images, fonts, and icons
│   ├── App.js                # Root component with phone simulator
│   └── package.json
│
└── backend/
    ├── controllers/          # Request handlers
    │   └── authController.js
    ├── models/              # Mongoose database models
    │   └── User.js
    ├── routes/              # API route definitions
    │   ├── auth.js
    │   └── user.js
    ├── public/              # Static files for web deployment
    ├── server.js            # Express server configuration
    └── package.json
```

---

## Technical Status

- [x] Login and Register logic complete
- [x] Product and perfume notes mapping complete
- [x] Scent Quiz logic and recommendations working
- [x] Shopping cart and total calculation working
- [x] Mobile layout tested on iOS and Android
- [x] Local storage for user data working
- [x] Dark mode implementation complete
- [x] Order history and tracking functional
- [x] Wishlist functionality working
- [x] Production deployment on Vercel

---

## Technology Stack

### Frontend
- **React Native** 0.76.0 - Mobile framework
- **Expo SDK** 52.0.0 - Development platform
- **React Navigation** 7.0.0 - Navigation library
- **React Native Paper** 5.12.5 - Material Design components
- **AsyncStorage** 1.23.1 - Local data persistence

### Backend
- **Node.js** - JavaScript runtime
- **Express** 4.21.1 - Web framework
- **MongoDB** with Mongoose 9.1.5 - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

---

## Setup and Installation

1. **Clone the Repo**
   ```bash
   git clone https://github.com/Mishra-coder/Perfume_APP.git
   cd Perfume_APP
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=3000
   JWT_SECRET=your_secret_key_here
   MONGO_URI=your_mongodb_connection_string
   ```

5. **Start the Project**
   - **Backend**: 
     ```bash
     cd backend
     npm start
     ```
   - **Frontend**: 
     ```bash
     cd frontend
     npm start
     ```

---

## Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

Set environment variable in Vercel Dashboard:
- `EXPO_PUBLIC_API_URL`: Your backend API URL

### Backend (Vercel)
```bash
cd backend
vercel --prod
```

Set environment variables in Vercel Dashboard:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens

---

## Key Features Explained

### Phone Simulator (Web)
The web version displays the app in a realistic phone frame (390x780px) to showcase the mobile-first design, providing an authentic mobile experience in the browser.

### Scent Recommendation Engine
Smart algorithm that analyzes user preferences through a quiz to recommend personalized fragrances based on scent profiles and notes.

### Authentication System
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Persistent login with AsyncStorage
- Protected routes and API endpoints

---

## Author

**Devendra Mishra**  
Software Developer focused on creating clean and premium mobile experiences.

- GitHub: [@Mishra-coder](https://github.com/Mishra-coder)
- Email: devemishra4@gmail.com

---

## License

This project is licensed under the MIT License.

## Acknowledgments

- Product images and data are for demonstration purposes only
- Built with React Native and Expo framework
- Inspired by modern e-commerce design patterns
