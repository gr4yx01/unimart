# Unimart - Campus Marketplace Application

Unimart is a decentralized marketplace application where students can seamlessly buy products from campus vendors using cryptocurrency, offering a modern, convenient, and secure shopping experience within the university community.

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Architecture](#architecture)
5. [Smart Contract Interaction](#smart-contract-interaction)
6. [Security](#security)
7. [Technology Stack](#technology-stack)
8. [Contributing](#contributing)
9. [Future Enhancements](#future-enhancements)

[smart contract](https://github.com/gr4yx01/blockathon)

[backend](https://github.com/gr4yx01/unimart_server/tree/arbitrum)

[frontend](https://github.com/gr4yx01/unimart/tree/blockchain)

---

### 1. Overview

Unimart serves as a digital marketplace tailored for university students, enabling transactions on the blockchain with minimal fees and fast processing times. Through Unimart, students can browse and purchase products ranging from food to electronics, while vendors can list their products and receive payments in cryptocurrency.

### 2. Features

- **Decentralized Payment System**: Utilizes Lisk blockchain technology (Ethereum-based) for transactions.
- **Vendor and Product Listings**: Vendors can list multiple products with images, descriptions, and pricing. (upcoming)
- **Wallet Integration**: Supports wallet-based authentication and payments. (upcoming, currently hardcoded wallet address)
- **Payment Tracking**: Monitors payment status, with detailed transaction history for both buyers and vendors.
- **Secure Transactions**: Uses smart contracts to secure each transaction, ensuring funds are safely transferred to vendors after successful payment.

### 3. Getting Started

#### Prerequisites

- **Node.js** (version 14+)
- **Expo CLI** for React Native development

#### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/unimart.git
   ```
2. Navigate to the project directory:
   ```bash
   cd unimart
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables for Ethereum providers, such as Infura or Moralis, and add your Ethereum wallet address in a `.env` file.

### 4. Architecture

Unimart follows a multi-tier architecture:
- **Frontend**: Built with React Native and Expo, providing an intuitive interface for users.
- **Smart Contract**: Deployed on the Lisk Sepolia Testnet, handling transactions securely and transparently.
- **Backend (optional)**: Node.js, Express and GraphQL can be used to handle off-chain data (if needed).

### 5. Smart Contract Interaction

#### Contract Address
The deployed smart contract address: `0x43ca3D2C94be00692D207C6A1e60D8B325c6f12f`

#### Key Contract Functions

- **`initializePayment(vendors)`**: Initializes payment by receiving the total amount (in cryptocurrency) from the buyer and distributing payments to multiple vendors as specified.

- **`getBalance(address)`**: Retrieves the balance of the specified address in the contract.

- **`platformFee`**: Returns the platform fee percentage applied to each transaction.

#### Example Usage

```javascript
const ethers = require('ethers');
const contractABI = [/* ABI from your contract */];
const contractAddress = '0x43ca3D2C94be00692D207C6A1e60D8B325c6f12f';

const provider = new ethers.providers.InfuraProvider('sepolia', process.env.INFURA_API_KEY);
const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, contractABI, signer);

// Initialize Payment
await contract.initializePayment([
  { wallet: 'vendor_wallet_address_1', amount: vendor_amount_1 },
  { wallet: 'vendor_wallet_address_2', amount: vendor_amount_2 }
]);
```

### 6. Technology Stack

- **Frontend**: React Native, Expo
- **Blockchain**: Lisk (Sepolia Testnet)
- **Backend (optional)**: Node.js, Express
- **Tools**: Ethers.js

### 7. Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

### 10. Future Enhancements

- **Wallet Integration**: Enabling support for various wallets.
- **Vendor application**: Mobile application for vendors to post and also see their balances.
- **Multi-currency Support**: Enabling support for various cryptocurrencies.
- **Fiat Payment Gateway**: Integration with fiat payment options for users who prefer traditional payment methods.
- **Review & Rating System**: Allowing students to rate and review vendors and their products.
---

### Screenshots
![photo_1](https://i.pinimg.com/474x/10/72/2f/10722fe6b169409e69e17e64b23a679b.jpg)
![photo_1](https://i.pinimg.com/474x/50/08/4a/50084aba965701737ead8117c909f546.jpg)
![photo_1](https://i.pinimg.com/474x/e5/ca/8b/e5ca8b884cf12dd9b2cebc136b02a2b6.jpg)
![photo_1](https://i.pinimg.com/474x/d0/f3/5c/d0f35c381e03561eda52fd832936d68a.jpg)
![photo_1](https://i.pinimg.com/474x/84/0d/38/840d387feac76578a5bde937d2f806e1.jpg)

## Customer Wallet
![customer](https://i.pinimg.com/736x/c4/e1/4e/c4e14e4f2d7c1d924e546bbd33a21d04.jpg)

## Vendor Wallet
![vendor](https://i.pinimg.com/736x/4f/d8/d1/4fd8d1320f94020045e8b793b9d18110.jpg)
