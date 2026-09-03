# Sonarsiddha Dynamic Website & Admin Panel Architecture

This document outlines the implementation plan for building the fully dynamic, production-ready business website with Firebase Firestore, Authentication, and Storage, as requested.

## Goal Description
Transform the current static/semi-dynamic frontend into a fully dynamic, scalable, production-ready website with a secure Admin Panel. All data (Members, Branches, Products, Daily Rates, Certifications, Videos, Locations, Settings) will be managed via the Admin Panel and stored in Firebase Firestore and Firebase Storage. No data will be hardcoded in the frontend.

## Proposed Changes

### 1. Firebase Backend & Architecture 
We will use your existing Firebase project (`sonarsiddha-bb867`) and `firebase-admin` setup.
- **Authentication**: Set up Firebase Auth for the Admin login.
- **Firestore Collections**:
  - `admins` (List of allowed admin emails)
  - `members` (Team members)
  - `branches` (Offices/Branches)
  - `products` (Seeds/Products and their Strong Points)
  - `dailyRates` (Daily crop/seed rates)
  - `certifications` (Certificates & Documents)
  - `videos` (YouTube links & thumbnails)
  - `nationalLocations` & `internationalLocations` (Presence)
  - `socialLinks` & `websiteSettings` (Contact, About, Socials)
- **Firebase Storage**: Initialize Firebase Storage for uploading images (member photos, product images, certificates).

### 2. Backend API (Express Server)
Update the existing Express backend (`index.js`) to include RESTful endpoints for all the above collections. 
- Public `GET` endpoints for the website to fetch data.
- Protected `POST/PUT/DELETE` endpoints (using Firebase Auth middleware) for the Admin Panel.
- Image upload endpoints using `multer` and Firebase Storage.

### 3. Frontend: Admin Panel (React)
Create a secure `/admin` route in the React app.
- **Admin Login Page**: Email/Password login using Firebase Auth.
- **Admin Layout**: A sidebar navigation with links to manage every module (Dashboard, Members, Products, Branches, etc.).
- **Dashboard**: Show real-time statistics (Total Members, Active Products, Today's Rates, etc.).
- **CRUD Pages**: Forms and Data Tables for every collection allowing the admin to Create, Read, Update, Delete, and Upload Images.

### 4. Frontend: Public Website (React)
Completely refactor the website to fetch everything dynamically.
- **Home**: Dynamic slider, dynamic homepage content.
- **About Us**: Dynamic text fetched from `websiteSettings`.
- **Products / Seeds**: Fetch from `products` collection, display gallery, video URLs, and dynamic 'Strong Points'.
- **Daily Rates**: Fetch latest rates from `dailyRates` collection.
- **Our Team**: Fetch from `members` collection, display uploaded images.
- **Branches / Contact Us**: Fetch from `branches` and `socialLinks`.
- **National & International**: Fetch presence from location collections.
- **Certifications & Videos**: Fetch and display.

## User Review Required

> [!WARNING]
> This is a massive structural change. We will be building a complete Content Management System (CMS) custom-tailored for your agriculture business. It will take multiple steps to build.

## Verification Plan

### Manual Verification
1. We will test the Admin Login.
2. We will add dummy data (Branch, Member, Product) from the Admin Panel.
3. We will verify that the uploaded images and text appear automatically on the public website without changing any code.
4. We will test mobile responsiveness of both the Admin Panel and the Public Website.
