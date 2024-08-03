document.addEventListener("DOMContentLoaded", function () {
    const sBoxes = document.querySelectorAll(".Sbox");

    sBoxes.forEach((sBox) => {
        sBox.addEventListener("click", function () {
            sBoxes.forEach((box) => {
                box.classList.remove("selected");
            });
            this.classList.add("selected");

            // Storing the selected element in a variable for later use
            let selectedElement = this;
            // You can now use the variable "selectedElement" to access the selected div.
        });
    });
});




async function Withdraw(event) {

    event.preventDefault();

    // Get the input values
    const mobileNumber = document.getElementById("withdraw_mobile_number").value;
    const withdrawAmount = parseFloat(document.getElementById("withdraw_amount").value);
    const selectedSbox = document.querySelector(".Sbox.selected");

    // Validation: Check if all fields are filled
    if (!mobileNumber || isNaN(withdrawAmount) || !selectedSbox) {
        alert("Please fill in all required fields.");
        return;
    }

    // Validation: Check if withdraw amount is less than total withdrawable amount
    const totalWithdrawableAmount = await getTotalWithdrawableAmount();
    if (withdrawAmount > totalWithdrawableAmount) {
        showExceedLimitMessage();
        return;
    }

    // Make the API call to request the withdrawal
    const requestBody = {
        token:localStorage.getItem("token"), // Replace with the user's email
        number: mobileNumber,
        Account: selectedSbox.querySelector("img").alt, // Assuming the alt attribute contains the account type
        Amount: withdrawAmount
    };

    console.log(requestBody)

    try {
        const response = await fetch("http://localhost:5000/api/Withdraw/requestWithdraw", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        if (data.success) {
            alert("Withdrawal request successful will be updated soon!");

            // Handle any further actions upon successful withdrawal request here
            window.location.href = "worker.html";
        } else {
            alert("Withdrawal request failed. Please try again later.");
        }
    } catch (error) {
        console.error(error);
        alert("Error occurred during withdrawal request. Please try again later.");
    }
}

async function getTotalWithdrawableAmount() {
    try {
        const response = await fetch(`http://localhost:5000/api/user/getEarning/${localStorage.getItem(
            "token"
        )}`);
        const data = await response.json();
        console.log(data)
        return parseFloat(data);
    } catch (error) {
        console.error(error);
        return 0;
    }
}



function showExceedLimitMessage() {
    const exceedLimitMessage = document.getElementById("exceed_limit_message");
    exceedLimitMessage.style.display = "block";

    setTimeout(() => {
        exceedLimitMessage.style.display = "none";
    }, 3000);
}