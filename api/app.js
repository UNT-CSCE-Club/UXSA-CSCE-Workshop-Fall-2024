const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

app.use(cors());

const cheeses = [
    {
        id: 1,
        name: "Beaufort",
        description:
            "Beaufort is a cheese made from raw cow's milk with a firm, cooked texture, produced in Savoie, France. Known for its savory and slightly nutty flavor with floral undertones, it’s a staple in Alpine cuisine, used in fondue, gratins, and as a table cheese.",
        images: [
            "https://img.freepik.com/free-photo/cute-cheese-near-basket_23-2147930106.jpg?t=st=1730516584~exp=1730520184~hmac=710bf00c831975990868abd3b93574e75e9152afed1740dc8ce9461d83fa5feb&w=740",
            "https://img.freepik.com/free-photo/cheese-onions-wooden-board_23-2149606374.jpg?t=st=1730516941~exp=1730520541~hmac=f68ec9f946e895796976cbffa2a5e336d84318e4fb5b40f59c42e189125084ae&w=740",
        ],
        milk: "Cow",
        category: "Firm",
        rating: 4.8,
        price: 30.5, // Price per pound in USD
    },
    {
        id: 2,
        name: "Morbier",
        description:
            "Morbier is a French raw cow's milk cheese from the Jura region, recognizable by the line of ash running through the center. It has a creamy, tangy flavor with mild notes of grass and nuts, traditionally eaten with bread or in melted dishes.",
        images: [
            "https://img.freepik.com/free-photo/fresh-delicious-cheese_144627-11314.jpg?t=st=1730516978~exp=1730520578~hmac=31334b98210efc3692a391a293ce46e9d11214671c5f3b3cc3e89e30cd6f295c&w=740",
        ],
        milk: "Cow",
        category: "Semi-Soft",
        rating: 4.5,
        price: 22.0,
    },
    {
        id: 3,
        name: "Raclette",
        description:
            "Raclette is both a Swiss dish and a cheese known for its mild, creamy taste with nutty and fruity notes. When melted, it becomes smooth and deliciously aromatic, typically served over potatoes with pickles and onions.",
        images: [
            "https://img.freepik.com/free-photo/high-angle-hands-putting-melt-cheese-food_23-2149606360.jpg?t=st=1730516584~exp=1730520184~hmac=0c108bbf56022f04d22f1b3396a5d4a60659698aaf04ea88b26535058c9ce368&w=740",
        ],
        milk: "Cow",
        category: "Semi-Soft",
        rating: 4.7,
        price: 24.5,
    },
    {
        id: 4,
        name: "Gouda",
        description:
            "A popular Dutch cheese, Gouda has a smooth, semi-hard texture with a slightly sweet, caramelized flavor that matures into a deeper, nutty profile over time. It's versatile, used in cooking or as a snack with fruits and nuts.",
        images: [
            "https://img.freepik.com/free-photo/gouda-cheese-pieces-wooden-chopping-board-against-marble-textured-backdrop_23-2148166564.jpg?t=st=1730517029~exp=1730520629~hmac=9c046e65cf7c341bf8e7185a9cb8ede5d73ab03a231af32331a375f4966b3786&w=740",
            "https://img.freepik.com/free-photo/gouda-cheese-slice-wooden-coaster-tray_23-2148166557.jpg?t=st=1730517061~exp=1730520661~hmac=9e44b5ce9703d2d25f846c9229cc8b12b367d0524e2dfa4b1711737c704b9162&w=826",
        ],
        milk: "Cow",
        category: "Semi-Hard",
        rating: 4.6,
        price: 18.0,
    },
    {
        id: 5,
        name: "Brie",
        description:
            "Brie is a classic soft French cheese with a delicate, creamy texture and a mild, buttery flavor with earthy hints. Often served with fruit, nuts, and bread, Brie is perfect for cheese boards or baked in pastries.",
        images: [
            "https://img.freepik.com/free-photo/delicious-cheese_144627-43502.jpg?t=st=1730517079~exp=1730520679~hmac=0f7746b7971e3fe536f927c74a4925ef29ebbaf76723dc4dcb3791394dc24eb8&w=996",
        ],
        milk: "Cow",
        category: "Soft",
        rating: 4.5,
        price: 25.0,
    },
    {
        id: 6,
        name: "Roquefort",
        description:
            "Made from sheep's milk, Roquefort is a famous French blue cheese with a tangy, intense flavor and a creamy, crumbly texture. The blue veins add a distinct appearance and strong, salty taste, enjoyed in salads or with meats.",
        images: [
            "https://img.freepik.com/free-photo/blue-cheese_23-2148145262.jpg?t=st=1730517095~exp=1730520695~hmac=9f70e12331fe54a284668487e057e73d1aa8433c43c73ef27acae3ae92aea809&w=1380",
            "https://img.freepik.com/free-photo/delicious-blue-cheese_144627-43509.jpg?t=st=1730517115~exp=1730520715~hmac=af8b8eefc460921599025da767d7984ea7060bdbfdf9c0d2cbfeb10a7c2f5197&w=996",
        ],
        milk: "Sheep",
        category: "Blue",
        rating: 4.6,
        price: 32.0,
    },
    {
        id: 7,
        name: "Parmigiano-Reggiano",
        description:
            "Often called the 'King of Cheeses,' Parmigiano-Reggiano is a hard Italian cheese aged for a deep, umami-rich flavor and granular texture. It’s grated over pasta, soups, and risottos or served in slivers with wine.",
        images: [
            "https://img.freepik.com/free-photo/parmesan-cheese-wooden-board_1220-7088.jpg?t=st=1730516584~exp=1730520184~hmac=647c362a37c9c4654c83d244df8eb779b6226f66c3e3b60fda3dde3354bbbf42&w=1380",
            "https://img.freepik.com/free-photo/delicious-grated-cheese_144627-43580.jpg?t=st=1730517144~exp=1730520744~hmac=906de88504faaf60f26055787ba2a960a23e735c9d60042eb8b50397b6f1cb35&w=740",
            "https://img.freepik.com/free-photo/assortment-different-delicious-ingredients_23-2148882530.jpg?t=st=1730517167~exp=1730520767~hmac=09f747bece41edd41d6c035f1e51e67c78c2c2870ab0456318bd67a83c434b73&w=740",
        ],
        milk: "Cow",
        category: "Hard",
        rating: 5.0,
        price: 40.0,
    },
    {
        id: 8,
        name: "Camembert",
        description:
            "Similar to Brie, Camembert is a soft, creamy cheese with a more intense, earthy flavor. Its creamy center and slightly stronger taste make it perfect for pairing with baguettes, apples, and nuts.",
        images: [
            "https://img.freepik.com/free-photo/assortment-different-delicious-ingredients_23-2148882530.jpg?t=st=1730517167~exp=1730520767~hmac=09f747bece41edd41d6c035f1e51e67c78c2c2870ab0456318bd67a83c434b73&w=740",
            "https://img.freepik.com/free-photo/camembert-cheese-slate-plate_573717-18.jpg?t=st=1730517204~exp=1730520804~hmac=ff34e62015bd338f974ccb91e0bf786b8bf7bfa7c81d0c93b8d3d6ca2a2003f2&w=1380",
        ],
        milk: "Cow",
        category: "Soft",
        rating: 4.3,
        price: 20.0,
    },
    {
        id: 9,
        name: "Manchego",
        description:
            "A traditional Spanish cheese made from sheep's milk, Manchego has a semi-hard texture with a buttery and slightly nutty flavor. It is often aged, deepening its savory profile, and pairs well with quince paste and olives.",
        images: [
            "https://img.freepik.com/free-photo/close-up-fresh-spanish-manchego-cheese_23-2148101804.jpg?t=st=1730517305~exp=1730520905~hmac=f9a372445723322a6c7a0fcd76ccc7c1cd55dbddd3c15ba549c2da5297d943a6&w=740",
            "https://img.freepik.com/free-photo/top-view-triangle-pieces-cured-manchego-cheese-sharp-knife-wooden-food-board_181624-60364.jpg?t=st=1730517324~exp=1730520924~hmac=152846f34f8dba310d70508fac792f7f4e46e613e38c53f58a7fc51be9d79b13&w=1380",
        ],
        milk: "Sheep",
        category: "Semi-Hard",
        rating: 4.4,
        price: 27.0,
    },
    {
        id: 10,
        name: "Cheddar",
        description:
            "Known for its sharp, tangy flavor and firm, crumbly texture, Cheddar is one of the most widely consumed cheeses in the world. It ranges from mild to extra-sharp, making it versatile for cooking or snacking.",
        images: [
            "https://img.freepik.com/free-photo/cheddar-cheese-dark-wooden-surface_1150-41953.jpg?t=st=1730517337~exp=1730520937~hmac=a89777064a4783806d370400f363f05b1279dfdc10e5ae88e85d9d3c19324e85&w=1380",
            "https://img.freepik.com/free-photo/cheddar-cheese-wooden-surface_1150-41929.jpg?t=st=1730517351~exp=1730520951~hmac=beb49165adddba915fe5f827ee6961af3c041b58abbe65ddb5078d30eb39e50f&w=1380",
        ],
        milk: "Cow",
        category: "Hard",
        rating: 4.2,
        price: 15.0,
    },
];

app.get("/cheeses", (req, res) => {
    res.json(cheeses);
});

// Endpoint to get cheese categories
app.get("/categories", (req, res) => {
    const categories = [...new Set(cheeses.map((cheese) => cheese.category))];
    res.json(categories);
});

// Endpoint to get top-rated cheeses
app.get("/top-rated", (req, res) => {
    const topCheeses = cheeses.sort((a, b) => b.rating - a.rating).slice(0, 3);
    res.json(topCheeses);
});

// Endpoint to get a specific cheese by id
app.get("/cheese/:id", (req, res) => {
    const cheeseId = parseInt(req.params.id);
    const cheese = cheeses.find((c) => c.id === cheeseId);

    if (cheese) {
        res.json(cheese);
    } else {
        res.status(404).json({ error: "Cheese not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
