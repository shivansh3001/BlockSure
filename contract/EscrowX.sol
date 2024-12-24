// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Escrow {
    address public sender;
    address public receiver;
    uint256 public amount;
    enum State { NotDeposited, Deposited, Released, Refunded }
    State public currentState;

    constructor() {
        currentState = State.NotDeposited;
    }

    // Set the sender and receiver addresses
    function setParticipants(address _sender, address _receiver) external {
        require(currentState == State.NotDeposited, "Participants cannot be set after deposit.");
        sender = _sender;
        receiver = _receiver;
    }

    // Deposit function to deposit funds by the sender
    function deposit(uint256 _amount) external payable {
        require(msg.sender == sender, "Only the sender can deposit funds.");
        require(currentState == State.NotDeposited, "Funds have already been deposited.");
        require(msg.value == _amount, "Amount must match the deposit value.");

        amount = _amount; // Store the deposit amount
        currentState = State.Deposited;
    }

    // Release function to release funds to the receiver
    function release() external {
        require(msg.sender == receiver, "Only the receiver can release funds.");
        require(currentState == State.Deposited, "Funds are not deposited yet.");
        require(amount > 0, "No funds to release.");

        payable(receiver).transfer(amount);
        currentState = State.Released;
        amount = 0;
    }

    // Refund function to refund funds to the sender
    function refund() external {
        require(msg.sender == sender, "Only the sender can refund.");
        require(currentState == State.Deposited, "Funds are not deposited yet.");
        require(amount > 0, "No funds to refund.");

        payable(sender).transfer(amount);
        currentState = State.Refunded;
        amount = 0;
    }

    // Get the current state of the escrow
    function getState() external view returns (State) {
        return currentState;
    }
    function reset() external {
        require(currentState == State.Released || currentState == State.Refunded, "Can only reset after release or refund.");
        
        sender = address(0);
        receiver = address(0);
        amount = 0;
        currentState = State.NotDeposited;
    }
}
