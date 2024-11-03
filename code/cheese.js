document.addEventListener("DOMContentLoaded", async () => {
    // Get the `id` parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const cheeseId = urlParams.get("id");

    if (cheeseId) {
        try {
            // Fetch cheese data from the API
            const response = await fetch(
                `https://uxsa-csce-workshop-api.onrender.com/cheese/${cheeseId}`
            );
            const cheese = await response.json();

            // Populate the HTML elements with the fetched data
            document.getElementById("cheeseName").textContent = cheese.name;
            document.getElementById(
                "cheeseCategory"
            ).textContent = `Category: ${cheese.category}`;
            document.getElementById(
                "cheeseRating"
            ).textContent = `Rating: ${cheese.rating}`;
            document.getElementById("cheeseDescription").textContent =
                cheese.description;
            document.getElementById("cheesePrice").textContent =
                cheese.price.toFixed(2);
            document.getElementById(
                "cheeseMilk"
            ).textContent = `Milk: ${cheese.milk}`;
            document.getElementById("cheeseImage").src = cheese.images[0]; // Use the first image in the array
        } catch (error) {
            console.error("Error fetching cheese data:", error);
        }
    } else {
        console.error("No cheese ID specified in URL.");
    }
});
