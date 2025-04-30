# HealthSphere

**HealthSphere** is an innovative medical travel platform built with the MERN stack, integrating AI and blockchain to streamline healthcare journeys for international patients coming to India. The platform enables remote video consultations, blockchain-based custom cab allocation with crypto payments, and secure doctor fee payments, all within a modern, multi-role web application.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Known Issues](#known-issues)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Features

- **Remote Video Consultations**: Connect with Indian doctors before you travel.
- **Blockchain-Based Custom Cab Allocation**: Transparent, secure cab booking and payment via cryptocurrency; fares pre-listed for select routes.
- **Multi-Payment Support**: Crypto payments for cabs and Razorpay integration for doctor fees (payment gateways currently paused for security enhancement).
- **Three-Tiered Access**: Separate logins for Users, Admins, and Doctors.
- **End-to-End Medical Travel Support**: From video consultation to treatment and follow-up, all in one platform.

---

## Demo

**Live Website:** [Insert your HealthSpher website link here]  
*For the best experience, use a desktop browser.*

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- (Optional) MetaMask or crypto wallet for cab payments

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/healthspher.git
    cd healthspher
    ```
2. Install dependencies for both client and server:
    ```bash
    npm install
    cd client && npm install
    cd ../server && npm install
    ```
3. Set up environment variables as needed (see `.env.example`).
4. Start the development servers:
    ```bash
    # In one terminal
    cd server && npm run dev

    # In another terminal
    cd client && npm start
    ```

---

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Blockchain:** Custom smart contracts for cab allocation
- **Video Calls:** Integrated video call API (e.g., WebRTC or third-party)
- **Payments:** Crypto (for cabs), Razorpay (for doctors)

---

## Project Structure

```
healthspher/
├── client/        # React frontend
├── server/        # Express backend
├── blockchain/    # Smart contracts and blockchain scripts
├── README.md
└── ...
```

---

## Known Issues

- Payment gateways are currently disabled due to ongoing security enhancements.
- Some bugs may be present as the platform is a work in progress.
- For the best experience, use a desktop browser.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

---

## License

[MIT](LICENSE)

---

## Acknowledgements

A big thank you to my amazing teammates for their dedication and support throughout this project!

---

*Let’s revolutionize healthcare accessibility together!*

