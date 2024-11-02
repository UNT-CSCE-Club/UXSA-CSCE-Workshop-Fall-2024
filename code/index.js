document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("http://localhost:3000/top-rated");
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

            // Append elements to build the card
            cheeseInfo.appendChild(cheeseName);
            cheeseItem.appendChild(cheeseImage);
            cheeseItem.appendChild(cheeseInfo);
            cheeseGrid.appendChild(cheeseItem);
        });
    } catch (error) {
        console.error("Error fetching top-rated cheeses:", error);
    }
});