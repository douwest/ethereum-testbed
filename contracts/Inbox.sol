// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract Inbox {
    string private message;

    constructor(string initialMessage) {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string) {
        return message;
    }
}