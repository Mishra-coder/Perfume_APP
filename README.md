# Aroma Luxe - My Perfume Shop App 

Hi! This is **Aroma Luxe**, a mobile app I built for shopping luxury perfumes. The idea was to create a clean, simple, and premium-looking store where anyone can find their favorite fragrance easily.

---

## Scan this and Install the App
<img width="282" height="281" alt="Screenshot 2026-01-18 at 2 44 38 AM" src="https://github.com/user-attachments/assets/d528015e-5b52-4a4c-b9d9-d3183fda45fc" />

---

##  What is this app about?
Aroma Luxe is a perfume boutique app. You can browse through a collection of high-end perfumes, check their details (like what they smell like - Top/Base notes), and buy them. It's designed with a "less is more" theme, using mostly Black & White colors to make it look expensive.

---

##  Main Features
- **Browse & Search**: Easily scroll through perfumes or search for a specific one by name or category.
- **Find Your Scent**: A cool feature called "TYPE" where you answer a few questions about where you are going (Party, Office, etc.), and the app tells you which perfume suits you best.
- **Product Details**: Every perfume has its own page showing the price, description, and the "notes" that make up the scent.
- **Shopping Cart**: Add things to your cart, change quantity, and see the total bill.
- **Order History**: You can see all your past orders and their status in one place.
- **Profile**: A place to see your saved name and your last recommendation results.

---

## How I built it (Tech Stack)
I used standard and popular tools to make sure the app is fast and works on both Android and iPhone.
- **Language**: JavaScript
- **Framework**: React Native with Expo (made it easy to build for mobile).
- **UI & Design**: I used **React Native Paper**. This helped with:
    - **Buttons**: Clean and modern buttons.
    - **Icons**: Used Material Community Icons for things like the cart, menu, and search.
    - **Cards**: For showing products in a nice box format.
- **Storage**: I used `AsyncStorage` so that even if you close the app, your cart and orders stay saved.
- **Theme**: I forced a "Light Theme" so the app always looks clean and readable, regardless of your phone settings.

---

## Folder Setup
- `src/screens`: All the pages (Home, Cart, Checkout, etc.).
- `src/components`: Small parts like the recommendation cards.
- `src/data`: This is where I kept all the perfume information and images.
- `src/context`: This handles the "Logic" for the cart and user profile.

---

##  How to start the project
1. Clone the repo.
2. Run `npm install` to get the libraries.
3. Run `npx expo start`.
4. Open it using the **Expo Go** app on your phone.

---

