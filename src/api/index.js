const { Router } = require('express');
const db = require('../api/db');
const router = Router();

router.get('api/user', (req, res) => {
    res.send(db.getList("users"))
});

router.get('/api/user/:id', (req, res) => {
    res.send(db.findObject("users", req.params.id))
});

router.get('/api/drink', (req, res) => {
    res.send(db.getList("drinks"))
});

router.get('/api/drink/:id', (req, res) => {
    res.send(db.findObject("drinks", req.params.id))
});

router.get('/api/order', (req, res) => {
    res.send(db.getList("orders"))
});

router.get('/api/order/:id', (req, res) => {
    res.send(db.findObject("orders", req.params.id))
});

router.get('/api/orderUser/:idUser', (req, res) => {
    res.send(db.findObject("orders", req.params.idUser, 'user'))
});

module.exports = router