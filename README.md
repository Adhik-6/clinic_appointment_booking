# Clinic Appointment Booking

A web application for booking and managing clinic appointments.

## Features

- Patient can book appointments
- Patient will receive an email confirmation
- Only doctor can login
- Admin dashboard for managing users and appointments
- Book, view, and cancel appointments

## Tech Stack

- **Backend:** Node, Express
- **Frontend:** CSS, React
- **Database:** MongoDB

## Software Requirements

1. git
2. node
3. create a .env file under `clinic_appointment_booking/`. Make sure it includes MONGO_URI, EMAIL_APP_PASSWORD, EMAIL_ADMIN 

## Setup

1. Clone the repository:
  ```bash
  git clone https://github.com/Adhik-6/clinic_appointment_booking.git
  cd clinic_appointment_booking
  ```
2. Install all dependencies:
  ```bash
  npm run build
  ```
3. Start the backend server:
  ```bash
  npm run dev
  ```
4. Start the frontend React app:
  - Open a new terminal instance withour closing the previous one.
  - Navigate to `clinic_appointment_booking/` folder and run:
  ```bash
  cd client && npm run dev
  ```

## Usage

- Book appointments as a patient.
- Log in as doctor (admin).
- View appointments on a clean table

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.