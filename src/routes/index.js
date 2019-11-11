const { Router } = require('express');
const router = Router();
const fs = require('fs');
const uuid = require('uuid/v4');

let json_users = fs.readFileSync('src/users.json', 'utf-8');
const users_ = JSON.parse(json_users);
let json_drinks = fs.readFileSync('src/drinks.json', 'utf-8');
const drinks_ = JSON.parse(json_drinks);
let titulo;

const findObject = (tabla, id) => {
    for (let row in tabla) {
        if (row[0] == id) {
            return row
        }
    }
}

router.get('/', (req, res) => {
    res.render('Login');
});

router.get('/user', (req, res) => {
    res.render('user');
});

router.get('/user/:id', (req, res) => {
    let usuario = findObject(users_, req.params.id)
    res.render('user', {
        usuario
    });
});

router.get('/users', (req, res) => {
    res.render('users', {
        users_
    });
});

router.get('/drink', (req, res) => {
    res.render('drink');
});

router.get('/drink:id', (req, res) => {
    let drink = findObject(drinks_, req.params.id)
    res.render('drink', {
        drink
    });
});

router.get('/drinks', (req, res) => {
    res.render('drinks', {
        drinks_
    });
});

router.get('/takeorder', (req, res) => {
    res.render('takeorder', {
        drinks_
    });
});

router.post('/examen', (req, res) => {
    let { IdPaciente, NivelEzfuerzo, Posicion, Fecha, Nota, Latidos, Diagnostico } = req.body;
    let nuevoExamen = {
        id: uuid(),
        IdPaciente,
        NivelEzfuerzo,
        Posicion,
        Fecha: Fecha,
        Nota: Nota.trim(),
        Latidos,
        Diagnostico
    };
    examenes.push(nuevoExamen);

    json_examenes = JSON.stringify(examenes);
    fs.writeFileSync('src/examen.json', json_examenes, 'utf-8');

    res.redirect('/examenes/' + IdPaciente);
});

router.post('/paciente', (req, res) => {
    console.log(req.body);
    const { Nombre, Apellido, Edad, Sexo, Fuma, HorasEjercicio } = req.body;
    let newPaciente = {
        id: uuid(),
        Nombre,
        Apellido,
        Edad,
        Sexo,
        Fuma,
        HorasEjercicio
    };
    if (!Nombre || !Apellido || !Edad || !Sexo || !Fuma || !HorasEjercicio) {
        res.status(400).send('Error Campos Vacios');
        return;
    }

    pacientes.push(newPaciente);

    json_pacientes = JSON.stringify(pacientes);
    fs.writeFileSync('src/pacientes.json', json_pacientes, 'utf-8');

    res.redirect('/');
});



module.exports = router;