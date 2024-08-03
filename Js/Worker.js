function useEffect(callback, dependencies) {
    // Keep track of the previous dependencies
    let previousDependencies = [];

    // Check if the dependencies have changed
    const dependenciesChanged = () => {
        for (let i = 0; i < dependencies.length; i++) {
            if (dependencies[i] !== previousDependencies[i]) {
                return true;
            }
        }
        return false;
    };

    // Run the effect callback function
    const runEffect = () => {
        callback();
        previousDependencies = dependencies;
    };

    // Register the effect on initial component render
    runEffect();

    // Register the effect on dependency changes
    document.addEventListener("DOMContentLoaded", runEffect);
    document.addEventListener("click", runEffect);
    // Add more event listeners or specific DOM events as needed

    // Cleanup function (optional)
    return () => {
        // Remove event listeners or perform any cleanup tasks
        document.removeEventListener("DOMContentLoaded", runEffect);
        document.removeEventListener("click", runEffect);
        // Remove additional event listeners or perform cleanup tasks
    };
}


var walletLink = document.getElementById('wallet');

  // Check the condition and enable/disable the button
  

let previousVideoId = null;
let videosWatched = parseInt(localStorage.getItem("videosWatched")) || 0;
const maxVideosPerDay = 50;
const resetHour = 0; // Hour at which the count should reset (e.g., midnight)
let Earning = 0;


if (Earning < 5) {
    // If earning is less than 5, set the href to "javascript:void(0)" to make the link inactive
    walletLink.setAttribute('href', 'javascript:void(0)');
  } else {
    // If earning is 5 or more, set the actual URL to which the link should navigate
    walletLink.setAttribute('href', 'withdraw.html');
  }

// Function to load YouTube video into the iframe
function loadVideo(videoId) {
    // Store the ID of the previous video
    previousVideoId = videoId._id;

    const regex = /[?&]v=([^&#]+)/;
    const match = videoId.Links.match(regex);
    const videoCode = match && match[1];
    var iframe = document.getElementById("youtube-iframe");
    iframe.src = "https://www.youtube.com/embed/" + videoCode;
}


// Array of YouTube video links
var videoLinks = [];

// Function to handle the next button click
async function onNextClick() {
    // Check if the user has reached the maximum number of videos per day
    if (videosWatched >= maxVideosPerDay) {
        // Display the message and disable the next button
        var nextButton = document.getElementById("next-button");
        nextButton.disabled = true;
        nextButton.className = "DisableClass";
        var videoPlayer = document.getElementById("video-player");
        videoPlayer.innerHTML =
            "<h1>Your daily video limit has been reached. Please come back tomorrow for new videos.</h1>";
        return;
    }

    // Disable the next button
    var nextButton = document.getElementById("next-button");
    nextButton.disabled = true;
    nextButton.className = "DisableClass";

    const response = await fetch(
        `http://localhost:5000/api/Service/updateToken/${previousVideoId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ watchedIP: localStorage.getItem("token") }),
        }
    );

    const response2 = await fetch(
        `http://localhost:5000/api/user/updateEarning/${localStorage.getItem(
            "token"
        )}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Earning: Earning + 0.02 }),
        }
    );

    const earningData = await response2.json();
    Earning = earningData.Earning; // Assign the earning to the Earning variable

    const EarningID = document.getElementById("wearn");
    EarningID.innerHTML = Earning;

    // Load the next video
    var nextVideoId = videoLinks.shift();
    loadVideo(nextVideoId);

    // Call the API to update the token

    // Increment the count of videos watched
    videosWatched++;
    localStorage.setItem("videosWatched", videosWatched);

    // Check if the count should reset based on the current hour
    const currentHour = new Date().getHours();
    if (currentHour === resetHour) {
        resetCount(); // Reset the count to 0
    }


    // Wait for the video to finish playing (3 minutes = 180 seconds)
    setTimeout(function () {
        // Enable the next button after 3 minutes
        nextButton.className = "AbleButton";
        nextButton.disabled = false;
    }, 180000);
}

// Function to reset the count to 0
function resetCount() {
    videosWatched = 0;
    localStorage.setItem("videosWatched", videosWatched);
}

// Fetch the video links from the API
async function fetchVideoLinks() {
    try {
        const response = await fetch(
            "http://localhost:5000/api/Service/FetchWatchServices",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        const localStorageToken = localStorage.getItem("token"); // Get the token from localStorage

        // Filter the data array to remove items with a matching token in watchedIPs
        const filteredData = data.filter((item) => {
            // If watchedIPs array exists and contains the localStorageToken, exclude the item
            if (
                item.watchedIPs &&
                item.watchedIPs.includes(localStorageToken)
            ) {
                return false;
            }
            return true;
        });

        videoLinks = filteredData; // Update the existing videoLinks array

        // Load the first video
        var firstVideoId = videoLinks.shift();
        loadVideo(firstVideoId);

        // Disable the next button initially
        var nextButton = document.getElementById("next-button");
        nextButton.disabled = true;
        nextButton.className = "DisableClass";

        // Wait for 3 minutes before enabling the next button
        setTimeout(function () {
            nextButton.disabled = false;
            nextButton.className = "AbleButton";
        }, 180000);

        nextButton.addEventListener("click", onNextClick);

        // Call the API to get the earning
    } catch (error) {
        console.error(error);
    }
}

useEffect(() => {
    Earningfun();
}, []);
async function Earningfun() {
    try {
        const earningResponse = await fetch(
            `http://localhost:5000/api/user/getEarning/${localStorage.getItem(
                "token"
            )}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const earningData = await earningResponse.json();
        console.log(earningData);
        Earning = earningData; // Assign the earning to the Earning variable


        const EarningID = document.getElementById("wearn");
        EarningID.innerHTML = Earning;
    } catch (error) {
        console.log(error);
    }
}
// Call the fetchVideoLinks function to start the process
fetchVideoLinks();

