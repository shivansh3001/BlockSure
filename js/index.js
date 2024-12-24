
let signer;
let escrowContract;
let senderAddress = null;
let receiverAddress = null;

// Replace this with your deployed contract address and ABI
const contractAddress = "0x13B1AA8fD3B12bf00103D3cF86e42F46F7933881";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "refund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "release",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_receiver",
				"type": "address"
			}
		],
		"name": "setParticipants",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "amount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentState",
		"outputs": [
			{
				"internalType": "enum Escrow.State",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getState",
		"outputs": [
			{
				"internalType": "enum Escrow.State",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "receiver",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sender",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

async function connectWallet() {
    if (window.ethereum) {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            const walletAddress = await signer.getAddress();

            document.getElementById("wallet-address").innerText = `Connected: ${walletAddress}`;
            escrowContract = new ethers.Contract(contractAddress, contractABI, signer);
        } catch (error) {
            console.error("Wallet connection failed", error);
            alert("Failed to connect wallet.");
        }
    } else {
        alert("Please install MetaMask!");
    }
}

async function setParticipants() {
    const senderAddress = document.getElementById("sender-address").value;
    const receiverAddress = document.getElementById("receiver-address").value;

    if (ethers.utils.isAddress(senderAddress) && ethers.utils.isAddress(receiverAddress)) {
        try {
            const tx = await escrowContract.setParticipants(senderAddress, receiverAddress);
            await tx.wait(); // Wait for the transaction to be mined
            document.getElementById("sender-display").innerText = senderAddress;
            document.getElementById("receiver-display").innerText = receiverAddress;
            alert("Participants set successfully!");
        } catch (error) {
            console.error("Error setting participants:", error);
            alert("Failed to set participants on the blockchain.");
        }
    } else {
        alert("Invalid addresses entered.");
    }
}


async function deposit() {
    const amount = document.getElementById("amount").value; // Amount in Ether
    if (amount > 0) {
        try {
            const tx = await escrowContract.deposit(ethers.utils.parseEther(amount), {
                value: ethers.utils.parseEther(amount) // Ensure the value is sent with the transaction
            });
            await tx.wait();
            alert("Deposit successful!");

            // Fetch updated state
            await updateUI();
        } catch (error) {
            console.error(error);
            alert("Transaction failed.");
        }
    } else {
        alert("Please enter a valid deposit amount.");
    }
}

async function updateUI() {
    try {
        const state = await escrowContract.currentState(); // Get contract state
        const depositAmount = await escrowContract.amount(); // Get deposited amount

        // Update status display
        let statusText = "Not Set";
        if (state === 0) statusText = "Not Deposited";
        if (state === 1) statusText = "Deposited";
        if (state === 2) statusText = "Complete";
        document.getElementById("status").innerText = `Current Status: ${statusText}`;

        // Enable buttons based on state
        if (state === 1) {
            document.getElementById("release-btn").disabled = false;
            document.getElementById("refund-btn").disabled = false;
        } else {
            document.getElementById("release-btn").disabled = true;
            document.getElementById("refund-btn").disabled = true;
        }

        // Update amount display
        document.getElementById("deposited-amount").innerText = 
            `Deposited Amount: ${ethers.utils.formatEther(depositAmount)} ETH`;

    } catch (error) {
        console.error("Failed to update UI:", error);
    }
}



async function releaseFunds() {
    try {
        const tx = await escrowContract.release();
        await tx.wait();
        alert("Funds released successfully!");
    } catch (error) {
        console.error(error);
        alert("Release funds failed.");
    }
}

async function refundFunds() {
    try {
        const tx = await escrowContract.refund();
        await tx.wait();
        alert("Funds refunded successfully!");
    } catch (error) {
        console.error(error);
        alert("Refund failed.");
    }
}

async function resetEscrow() {
    try {
        const tx = await escrowContract.reset();  // Calls the reset function on the contract
        await tx.wait();  // Wait for the transaction to be mined
        alert("Escrow contract has been reset.");
    } catch (error) {
        console.error("Error resetting escrow:", error);
        alert("Failed to reset escrow contract.");
    }
}

// Add an event listener for a reset button
document.getElementById("reset-btn").addEventListener("click", resetEscrow);



// Attach event listeners
document.getElementById("connect-wallet-btn").addEventListener("click", connectWallet);
document.getElementById("set-participants-btn").addEventListener("click", setParticipants);
document.getElementById("deposit-btn").addEventListener("click", deposit);
document.getElementById("release-btn").addEventListener("click", releaseFunds);
document.getElementById("refund-btn").addEventListener("click", refundFunds);
