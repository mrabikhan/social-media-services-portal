// Make an API call to fetch subscriber services
fetch("http://localhost:5000/api/Service/FetchSubscriberServices")
    .then((response) => response.json())
    .then((data) => {
        const tableBody = document.getElementById("SubData");

        // Iterate through the data array and create table rows dynamically
        data.map((subscriber, index) => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
        <td>${index + 1}</td>
        <td>${subscriber.Title}</td>
        <td>${subscriber.Quantity}</td>
        <td>${subscriber.Links}</td>
        <td>
          <center><input type="checkbox" class="subscribercheck" data-id="${subscriber._id}" /></center>
        </td>
      `;
            tableBody.appendChild(newRow);
        });
    })
    .catch((error) => {
        console.error(error);
        // Handle any errors that occurred during the API call
    });

// ... (previous JS code) ...

async function SlectedDeleted() {
    // Array to store the MongoDB IDs of selected checkboxes
    const selectedIds = [];

    // Find all checkboxes in the table
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Iterate through the checkboxes to find selected ones and add their IDs to the array
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            // Get the MongoDB ID from the data attribute "data-id"
            const id = checkbox.getAttribute("data-id");
            selectedIds.push(id);
        }
    });

    console.log(selectedIds);


    selectedIds.forEach(async (id, index) => {
        const response = await fetch(`http://localhost:5000/api/Service/DeleteService/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
    })
    location.reload();
}


async function ClearAll() {
    const response = await fetch(`http://localhost:5000/api/Service/DeleteSubService`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
    location.reload();
}
