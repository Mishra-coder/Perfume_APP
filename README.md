# Aroma Luxe - Premium Perfume Boutique

<p align="left">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

Aroma Luxe is a premium, minimalist perfume shopping application. It provides a high-end product catalog, a personalized scent quiz to discover your signature fragrance, and a seamless shopping experience.

**Key Flows:**
- **Discovery**: Explore curated perfumes with detailed notes (Top, Heart, Base).
- **Personalization**: Take the recommendation quiz to find scents based on occasion and style.
- **Commerce**: Real-time cart management, wishlist, and secure checkout.
- **Account**: Secure JWT-based authentication and order history tracking.

---

**Scan to Download Aroma Luxe**  
<img src="assets/app_qr_code.png" width="120" alt="Aroma Luxe Download QR"/>

---

## Setup

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **Expo CLI** (`npm install -g expo-cli`)
- **Android Studio** (for Android emulation) or **Xcode** (for iOS emulation)
- **MongoDB Atlas** account (or local MongoDB instance)

### Installation
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd Perfume_APP
   ```

2. **Install All Dependencies**
   The project is a monorepo. Use the root script to install dependencies for both frontend and backend:
   ```bash
   npm run install:all
   ```

3. **Environment Setup**
   Create a `.env` file in the `backend/` directory with your MongoDB URI and JWT Secret:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

---

## Run

To start the application, you need to run both the backend server and the frontend Expo development server.

### 1. Start Backend
```bash
npm run start:backend
```
The API serves at `http://localhost:3000` (or your local IP).

### 2. Start Frontend
```bash
npm run start:frontend
```
- Press **`i`** for iOS simulator.
- Press **`a`** for Android emulator.
- Scan the QR code with the **Expo Go** app on your physical device.

---

## Build

Building for production requires [EAS CLI](https://docs.expo.dev/build/setup/).

### Android (APK/AAB)
```bash
cd frontend
eas build --platform android --profile preview
```
*Note: The `preview` profile is configured to generate an APK in `eas.json`.*

### iOS (Simulator/TestFlight)
```bash
cd frontend
eas build --platform ios
```

### Web Build
```bash
cd frontend
npx expo export:web
```

---

## Permissions

| Permission | Reasoning |
| :--- | :--- |
| **Internet Access** | Required to communicate with the backend API for products, auth, and orders. |
| **Local Storage** | Used to persist JWT tokens and user preferences (Theme, Cart) locally via Async Storage. |
| **Network State** | Used by Expo and React Native to handle connectivity changes. |

---

## Screenshots/Demo

<p align="center">
  <table align="center">
    <tr>
      <td align="center"><b>Splash Screen</b></td>
      <td align="center"><b>Home Screen</b></td>
      <td align="center"><b>Product Details</b></td>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/f75a6b94-0063-45e1-9d89-9398826411ad" width="250" /></td>
      <td><img src="https://github.com/user-attachments/assets/34448a22-f3c2-4528-b95e-a9347761b6a2" width="250" /></td>
      <td><img src="https://github.com/user-attachments/assets/ed9b7cc5-7284-48d3-9c44-ed11de5c2ab3" width="200" /></td>
    </tr>
  </table>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/51681285-3ef0-4a66-b918-54c207b23f60" width="180" />
  <img src="https://github.com/user-attachments/assets/33db004d-9d5e-4b5c-89f7-8e6e5e12fc88" width="180" />
  <img src="https://github.com/user-attachments/assets/3075f5f4-507b-4ca3-9225-58dd0d79e29b" width="180" />
  <img src="https://github.com/user-attachments/assets/458f08cf-0127-481f-af74-e093ef8791e9" width="180" />
</p>

---

## Author
**Devendra Mishra**  
Software Developer focused on creating clean and premium mobile experiences.
