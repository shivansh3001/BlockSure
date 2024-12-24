# BlockSure - Blockchain Escrow Service

## About BlockSure

BlockSure is a decentralized escrow service built on the blockchain. It provides a secure and transparent way for two parties (sender and receiver) to complete transactions. With the help of smart contracts, BlockSure ensures that funds are held securely until predefined conditions are met, protecting both parties from fraud and disputes.

## Contract Details

- **Contract Address**: `0x13B1AA8fD3B12bf00103D3cF86e42F46F7933881`
- **Network**: Neo X Testnet T4

## Features

- **Set Participants**: Allows the sender and receiver to be set before the deposit is made.
- **Deposit Funds**: The sender deposits the agreed amount of funds to the contract.
- **Release Funds**: The receiver can release the funds once they fulfill the terms.
- **Refund Funds**: If the conditions are not met, the sender can refund the funds.
- **Reset**: Resets the contract for new participants after funds are released or refunded.

## Deployment

- **Contract Address**: [View on Explorer](https://xt4scan.ngd.network/address/0x13B1AA8fD3B12bf00103D3cF86e42F46F7933881)
- **Coin Used**: GAS

## How It Works

1. **Set Participants**: The sender and receiver's Ethereum addresses are set using the `setParticipants` function.
2. **Deposit**: The sender deposits an agreed amount of GAS to the contract using the `deposit` function.
3. **Release/Refund**: Based on the agreement, the receiver can release the funds, or the sender can request a refund if the conditions are not met.
4. **Reset**: After the transaction has been completed (released or refunded), the contract can be reset for new participants.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
