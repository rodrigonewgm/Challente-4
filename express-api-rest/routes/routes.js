const express = require("express");
const Model = require("../models/users");
const Companies = require("../models/companies");
const router = express.Router();

// Método POST para la creación de datos en la BD.
router.post("/users", async (req, res) => {
    const data = new Model({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        company: req.body.company.name
    });
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Método GET para la obtención de todos los datos de la BD.
router.get("/users", async (req, res) => {
    try {
        const data = await Model.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Método GET para la obtención de todos los datos de la BD.
router.post("/companies/:_id", async (req, res) => {
    try {
        const compania = await new Companies(req.body);
        const user = await User.findById(req.params);
        res.status(200).json(compania);
        compania.compania = user;
        await compania.save();
        //agregamos la compañia al array de compañias del usuario
        user.companies.push(compania);
        await user.save();
        res.send(compania);
        console.log(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
//obtener los usuarios de una compañia
router.get("/0_id/users", async (req, res) => {
    try {
        const compania = await Companies.findById(req.params).populate("users");
        res.status(200).json(compania);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Método GET para la obtención de un dato de la BD.
router.get("/users/:_id", async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Método PUT(PATCH) para la actualización de un dato de la BD.
router.put("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new : true };
        const data = await Model.findByIdAndUpdate(
            id, 
            updatedData, 
            options
        );
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Método DELETE para la eliminación de un dato de la BD.
router.delete("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Esto es un agregado que no tiene nada que ver con las rutas propias de un usuario pero es para mostrarles qué ocurre cuando el body de una solicitud viene codificada.
router.post("/example", (req, res) => {
    console.log(req.body);
    res.end();
});

module.exports = router;
