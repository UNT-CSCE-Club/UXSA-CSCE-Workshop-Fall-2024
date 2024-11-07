document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cheeseId = urlParams.get("id");

    const starSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23" fill="none">
    <path d="M10.5979 1.8541C11.1966 0.0114827 13.8034 0.0114803 14.4021 1.8541L15.7555 6.01925C16.0232 6.8433 16.7911 7.40122 17.6576 7.40122H22.0371C23.9745 7.40122 24.7801 9.88045 23.2126 11.0193L19.6695 13.5935C18.9686 14.1027 18.6753 15.0055 18.943 15.8295L20.2963 19.9947C20.895 21.8373 18.7861 23.3695 17.2187 22.2307L13.6756 19.6565C12.9746 19.1473 12.0254 19.1473 11.3244 19.6565L7.78134 22.2307C6.21391 23.3695 4.10495 21.8373 4.70366 19.9947L6.057 15.8295C6.32474 15.0055 6.03143 14.1027 5.33045 13.5935L1.78736 11.0193C0.219938 9.88045 1.02549 7.40122 2.96293 7.40122H7.34243C8.20889 7.40122 8.9768 6.8433 9.24455 6.01925L10.5979 1.8541Z" fill="#FD921F"/>
  </svg>`;

    if (cheeseId) {
        try {
            const response = await fetch(
                `https://uxsa-csce-workshop-api.onrender.com/cheese/${cheeseId}`
            );
            const cheese = await response.json();

            document.getElementById("cheeseName").textContent = cheese.name;

            document.getElementById("cheeseRating").innerHTML = starSVG.repeat(
                cheese.rating
            );
            document.getElementById("cheeseDescription").textContent =
                cheese.description;
            document.getElementById(
                "cheesePrice"
            ).textContent = `$${cheese.price.toFixed(2)}`;
            document.getElementById("cheeseImage").src = cheese.images[0];
            document.getElementById("cheeseMilk").textContent = cheese.milk;

            // Quantity buttons
            let quantity = 1;
            const quantityElement = document.querySelector(".quantity");

            document
                .querySelectorAll(".quantity-btn")[0]
                .addEventListener("click", () => {
                    if (quantity > 1) {
                        quantity--;
                        quantityElement.textContent = quantity;
                    }
                });

            document
                .querySelectorAll(".quantity-btn")[1]
                .addEventListener("click", () => {
                    quantity++;
                    quantityElement.textContent = quantity;
                });
        } catch (error) {
            console.error("Error fetching cheese data:", error);
        }
    } else {
        console.error("No cheese ID specified in URL.");
    }
});
