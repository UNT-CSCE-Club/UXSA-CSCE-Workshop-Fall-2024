document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(
            "https://uxsa-csce-workshop-api.onrender.com/top-rated"
        );
        const cheeses = await response.json();

        const cheeseGrid = document.getElementById("cheeseGrid");

        cheeses.forEach((cheese) => {
            // Create the card structure for each cheese
            const cheeseItem = document.createElement("a");
            cheeseItem.href = `cheese.html?id=${cheese.id}`;
            cheeseItem.classList.add("cheese-item");

            const cheeseImage = document.createElement("img");
            cheeseImage.src = cheese.images[0];
            cheeseImage.alt = cheese.name;

            const cheeseInfo = document.createElement("div");
            cheeseInfo.classList.add("cheese-info");

            const cheeseName = document.createElement("h3");
            cheeseName.classList.add("cheese-name");
            cheeseName.textContent = cheese.name;

            const cheeseDescription = document.createElement("p");
            cheeseDescription.classList.add("cheese-description");
            cheeseDescription.textContent = cheese.description;

            // Append elements to build the card
            cheeseInfo.appendChild(cheeseName);
            cheeseInfo.appendChild(cheeseDescription);
            cheeseItem.appendChild(cheeseImage);
            cheeseItem.appendChild(cheeseInfo);
            cheeseGrid.appendChild(cheeseItem);
        });
    } catch (error) {
        console.error("Error fetching top-rated cheeses:", error);
    }
});
