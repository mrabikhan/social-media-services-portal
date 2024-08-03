// Make an API call to fetch subscriber services
fetch("http://localhost:5000/api/Withdraw/FetchWithdraw")
    .then((response) => response.json())
    .then((data) => {
        const tableBody = document.getElementById("Withdraw");

        // Iterate through the data array and create table rows dynamically
        data.map((Withdraw, index) => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
        <td>${index + 1}</td>
        <td>${Withdraw.email}</td>
        <td><span>$</span>${Withdraw.Amount}</td>
        <td>${Withdraw.WithdrawAccount}</td>
        <td>${Withdraw.number}</td>
        <td>
            <center>
                <a href="#"><button id="btndeny" class="fa fa-close" data-id="${Withdraw._id}" data-User="${Withdraw.UserId}" onclick="DenyRequest()"> Deny</button></a>
                <a href="#"><button id="btndone" class="fa fa-check" data-id="${Withdraw._id}" data-User="${Withdraw.UserId}" onclick="DoneRequest()"> Done</button></a>
            </center>
        </td>
      `;
            tableBody.appendChild(newRow);
        });
    })
    .catch((error) => {
        console.error(error);
        // Handle any errors that occurred during the API call
    });


async function DoneRequest (){

    var Done=document.querySelector('#btndone');
    const Doneid = Done.getAttribute("data-id");

    const response = await fetch(`http://localhost:5000/api/Withdraw/WithdrawDone/${Doneid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
    })
    location.reload();
}

async function DenyRequest (){

    var Deny=document.querySelector('#btndeny');
    const DenyId = Deny.getAttribute("data-id");

    const response = await fetch(`http://localhost:5000/api/Withdraw/WithdrawDeny/${DenyId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
    })
    location.reload();
}
