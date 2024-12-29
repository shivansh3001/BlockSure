# BlockSure - Blockchain Escrow Service

## About BlockSure

BlockSure is a decentralized escrow service built on the blockchain. It provides a secure and transparent way for two parties (sender and receiver) to complete transactions. With the help of smart contracts, BlockSure ensures that funds are held securely until predefined conditions are met, protecting both parties from fraud and disputes.

## Contract Details

- **Contract Address**: `0x13B1AA8fD3B12bf00103D3cF86e42F46F7933881`
- **Network**: Neo X Mainnet

## Features

- **Set Participants**: Allows the sender and receiver to be set before the deposit is made.
- **Deposit Funds**: The sender deposits the agreed amount of funds to the contract.
- **Release Funds**: The receiver can release the funds once they fulfill the terms.
- **Refund Funds**: If the conditions are not met, the sender can refund the funds.
- **Reset**: Resets the contract for new participants after funds are released or refunded.

## Deployment

- **Contract Address**: [View on Explorer](https://xexplorer.neo.org/address/0x13B1AA8fD3B12bf00103D3cF86e42F46F7933881)
- **Coin Used**: GAS

## How It Works

1. **Set Participants**: The sender and receiver's Ethereum addresses are set using the `setParticipants` function.
2. **Deposit**: The sender deposits an agreed amount of GAS to the contract using the `deposit` function.
3. **Release/Refund**: Based on the agreement, the receiver can release the funds, or the sender can request a refund if the conditions are not met.
4. **Reset**: After the transaction has been completed (released or refunded), the contract can be reset for new participants.

## Screenshots
<img width="1439" alt="Screenshot 2024-12-24 at 5 51 05 PM" src="https://github.com/user-attachments/assets/17567465-ac76-4335-8ce9-f5b1a38e670f" />
<img width="1440" alt="Screenshot 2024-12-24 at 5 51 22 PM" src="https://github.com/user-attachments/assets/e70652a8-ab78-4076-827b-947a5088ba19" />
<img width="1440" alt="Screenshot 2024-12-24 at 5 51 39 PM" src="https://github.com/user-attachments/assets/fa2eb4ec-8de9-4dbe-99dd-cca9e92655f1" />
<img width="1440" alt="Screenshot 2024-12-14 at 4 05 51 PM" src="https://github.com/user-attachments/assets/3a6d6ffe-cff8-4ab7-b1e2-f6dc8794e375" />
<img width="1439" alt="Screenshot 2024-12-14 at 4 06 03 PM" src="https://github.com/user-attachments/assets/9524805c-8409-4aab-a61c-d30d0d2d314e" />
