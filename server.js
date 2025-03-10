const express = require("express");
const crypto = require("crypto");

const app = express();
const port = process.env.PORT || 3000;

let linksDB = {};

app.get("/generate-link", (req, res) => {
    const uniqueID = crypto.randomBytes(4).toString("hex");
    const link = `https://tu-app.railway.app/redeem/${uniqueID}`;

    linksDB[uniqueID] = { redeemed: false, reward: 150 };

    res.json({ success: true, link });
});

app.get("/redeem/:id", (req, res) => {
    const id = req.params.id;
    if (linksDB[id]) {
        if (!linksDB[id].redeemed) {
            linksDB[id].redeemed = true;
            res.json({ success: true, message: "Has recibido 150 baterías" });
        } else {
            res.json({ success: false, message: "Este link ya ha sido usado" });
        }
    } else {
        res.json({ success: false, message: "Link inválido" });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
