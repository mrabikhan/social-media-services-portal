// Make an API call to fetch subscriber services
fetch("http://localhost:5000/api/Service/FetchWatchTimeServices")
    .then((response) => response.json())
    .then((data) => {
        const tableBody = document.getElementById("WatchData");

        // Iterate through the data array and create table rows dynamically
        data.map((WatchTime, index) => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
        <td>${index + 1}</td>
        <td>${WatchTime.Title}</td>
        <td>${WatchTime.Quantity}</td>
        <td>${WatchTime.Links}</td>
        <td>
          <center><input type="checkbox" id="subscribercheck" data-id="${WatchTime._id}"/></center>
        </td>
      `;
            tableBody.appendChild(newRow);
        });
    })
    .catch((error) => {
        console.error(error);
        // Handle any errors that occurred during the API call
    });


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
        const response = await fetch(`http://localhost:5000/api/Service/DeleteWatchService`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })
        location.reload();
    }