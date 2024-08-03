// Make an API call to fetch subscriber services
fetch("http://localhost:5000/api/Service/FetchServices")
    .then((response) => response.json())
    .then((data) => {
        const tableBody = document.getElementById("Service");

        // Iterate through the data array and create table rows dynamically
        console.log(data)

        data.map((Service, index) => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
        <td>${index + 1}</td>
        <td>${Service.Email}</td>
        <td>${Service.Title}</td>
        <td>${Service.Quantity}</td>
        <td>${Service.Links}</td>
        <td>$ ${Service.Amount}</td>
        <td>
            <center>
                <div class="servicebtns">
                    <button id="btndenyservice" data-id="${Service._id}" onclick="DenyService()"> Deny</button>
                </div>
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


async function DenyService(){
    var Deny=document.querySelector('#btndenyservice');
    const DenyId = Deny.getAttribute("data-id");

    const response = await fetch(`http://localhost:5000/api/Service/ServiceDeny/${DenyId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
    })
    location.reload();
}