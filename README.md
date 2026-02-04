# Aroma Luxe - Premium Perfume Boutique

<p align="left">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

I built Aroma Luxe to provide a premium, minimalist perfume shopping experience. The app features a high-end product catalog, a personalized scent quiz to help you find your signature fragrance, and a clean interface designed for both mobile and web.

---

**Scan to Download Aroma Luxe**  
<img src="assets/app_qr_code.png" width="120" alt="Aroma Luxe Download QR"/>

---

## Project Showcase

<p align="center">
  <table align="center">
    <tr>
      <td align="center"><b>Splash Screen</b></td>
      <td align="center"><b>Home Screen</b></td>
<<<<<<< HEAD
      <td align="center"><b>Product Details</b></td>
=======
      <td align="center"><b>Scent Quiz</b></td>
>>>>>>> 25a70a8 (docs: finalized humanized README and fixed expo config)
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

## Features

### Recommendation Quiz
The app includes a quiz that helps you find a fragrance based on the occasion (office, party, etc.) and your personal style. It matches your answers against the product database to suggest the best fit.

### Product Details
Each perfume has a dedicated page showing:
- **Fragrance Notes**: Top, Heart, and Base notes.
- **Concentration**: Whether it is a Parfum, EDP, or EDT.
- **Usage Tips**: Best seasons and times of day to wear the scent.

### Shopping Experience
- **Real-time Cart**: Add and manage items with instant updates.
- **Wishlist**: Save your favorite items for later.
- **Secure Auth**: User accounts are protected with JWT-based login and registration.
- **Order History**: Track your past purchases and delivery status.

---

## Tech Stack

### Frontend
- **React Native** (Expo SDK 54)
- **React Native Paper** for the UI components.
- **React Navigation** for the screen transitions.
- **Context API** for global state management.

### Backend
- **Node.js & Express.js**
- **MongoDB Atlas** for cloud data storage.
- **JWT & BcryptJS** for secure authentication.

---

## Setup and Installation

1. **Clone the Repo**
   ```bash
   git clone <repository-url>
   cd Perfume_APP
   ```

2. **Install Dependencies**
   ```bash
   npm run install:all
   ```

3. **Start the Project**
   - **Backend**: `npm run start:backend`
   - **Frontend**: `npm run start:frontend`

---

## Project Structure
```text
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI elements
│   │   ├── screens/       # Main app screens
│   │   ├── context/       # State management
│   │   └── data/          # Product information
├── backend/
│   ├── routes/            # API endpoints
│   ├── models/            # Database schemas
│   └── server.js          # Entry point
```

---

## API Endpoints

| Category | Method | Endpoint | Description |
| :--- | :---: | :--- | :--- |
| Auth | `POST` | `/api/auth/register` | Create a new account |
| Auth | `POST` | `/api/auth/login` | Sign in to your account |
| Profile | `GET` | `/api/user/profile` | Get your profile info |
| Profile | `PUT` | `/api/user/update` | Update your details |

---

## Technical Status

- [x] Login and Register logic complete
- [x] Product and perfume notes mapping complete
- [x] Scent Quiz logic and recommendations working
- [x] Shopping cart and total calculation working
- [x] Mobile layout tested on iOS and Android
- [x] Local storage for user data working
- [x] Over-the-air updates configured

---

## Author
**Devendra Mishra**  
Software Developer focused on creating clean and premium mobile experiences.
