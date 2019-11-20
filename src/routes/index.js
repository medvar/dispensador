module.exports = (app, uuid, DB, Request, access) => {
    let title;
    let resul;
    app.post('/access', (req, res) => {
        let { user, pass } = req.body
            //console.log(req.body)
        let id0 = DB.access(user, pass)
        if (id0) {
            req.session.user = id0
                //res.status(200).send({ resul: 'Exito' })
            res.redirect('/home')
            res.end()
        } else {
            //res.status(400).send({ error: 'Usuario o contraseña incorrectos' })
            resul = 'Error Usuario o contraseña incorrectos'
            res.redirect('/login')
        }
        return;
    })
    const acceso = (req, res, next) => {
        console.log(req.session.user)
        if (!req.session.user)
            res.redirect('/login')

        next()
    }
    app.get('/home', acceso, (req, res, next) => {
        res.render('home', { user: req.session.user });
    });

    app.get('/Login', (req, res, next) => {
        res.render('Login', {
            resul
        });
    });





    app.get('/user', acceso, (req, res, next) => {
        let user = {
            name: '',
            email: '',
            pass: '',
            user: ''
        }
        res.render('User', { user, action: '' });
    });
    app.get('/user/:id', acceso, (req, res, next) => {
        /* Request.get('http://localhost:5000/api/user/' + req.params.id, (error, response, body) => {
             if (error) {
                 return console.dir(error);
             }
             console.log(body)
             res.render('User', { body });
         })
         */
        let user = DB.findObject('users', req.params.id)
            //  console.log(user)
        res.render('User', { user, action: '/' + req.params.id });
    });

    app.get('/users', acceso, (req, res, next) => {
        let users_ = DB.getList('users')
        res.render('Users', {
            users_
        });
    });

    app.post('/user', acceso, (req, res, next) => {
        let { user, pass, name, email } = req.body
        let newuser = {
            id: uuid(),
            user,
            pass,
            name,
            email
        }
        if (!user || !pass || !name || !email) {
            res.status(400).send('Error Campos Vacios');
            return;
        }
        DB.insert("users", newuser)
        let users_ = DB.getList('users')
        res.render('Users', {
            users_
        });
    })

    app.post('/user/:id', acceso, (req, res, next) => {
        let { user, pass, name, email } = req.body
        let newuser = {
            id: req.params.id,
            user,
            pass,
            name,
            email
        }
        if (!user || !pass || !name || !email) {
            res.status(400).send('Error Campos Vacios');
            return;
        }
        DB.update("users", newuser)
        let users_ = DB.getList('users')
        res.render('Users', {
            users_
        });
    })


    app.get('/drink/:id', acceso, (req, res, next) => {
        let drink = DB.findObject('drinks', req.params.id)
        res.render('drink', {
            drink,
            action: '/' + req.params.id
        });
    });

    app.get('/drinks', acceso, (req, res, next) => {
        let drinks_ = DB.getList('drinks')
        res.render('drinks', {
            drinks_
        });
    });
    app.get('/drink', acceso, (req, res, next) => {
        let drink = {
            id: '',
            name: '',
            ingre1: '',
            ingre2: '',
            ingre3: ''
        }
        res.render('drink', { drink, action: '' });
    });


    app.post('/drink', acceso, (req, res, next) => {
        let { name, ingre1, ingre2, ingre3 } = req.body
        let newdrink = {
            id: uuid(),
            name,
            ingre1,
            ingre2,
            ingre3
        }
        if (!name || !ingre1 || !ingre2 || !ingre3) {
            res.status(400).send('Error Campos Vacios');
            return;
        }
        DB.insert("drinks", newdrink)
        let drinks_ = DB.getList('drinks')
        res.render('drinks', {
            drinks_
        });
    })

    app.post('/drink/:id', acceso, (req, res, next) => {
        let { name, ingre1, ingre2, ingre3 } = req.body
        let Updatedrink = {
            id: req.params.id,
            name,
            ingre1,
            ingre2,
            ingre3
        }
        if (!name || !ingre1 || !ingre2 || !ingre3) {
            res.status(400).send('Error Campos Vacios');
            return;
        }
        DB.update("drinks", Updatedrink)
        let drinks_ = DB.getList('drinks')
        res.render('drinks', {
            drinks_
        });
    })

    app.get('/takeorder', acceso, (req, res, next) => {
        res.render('takeorder', {
            drinks_
        });
    });

    app.get('/orders', acceso, (req, res, next) => {
        res.render('orders', {
            orders_
        });
    });

    app.get('/order:id', acceso, (req, res, next) => {
        let order = DB.findObject(orders_, req.params.id)
        res.render('order', {
            order
        });
    });

}