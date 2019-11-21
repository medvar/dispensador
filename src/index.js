const app = require('./app');
const DB= require('./api/db');

const server = app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();


const mySerial = new SerialPort('/dev/ttyACM0', {
    baudRate:9600
});


mySerial.pipe(parser);

mySerial.on('open', function() {
    console.log('Puerto Abierto.');
});

let da = "";
mySerial.on('data', function(data) {
    console.log(data.toString());
    if (value == '?')//enviamos la bebida mas antigua
    {
        let order = getOrder()
        if(order){        
        mySerial.write(order.id);
        mySerial.write('¡');}
    }else //obtenemos el id 
     {
            let l = 0;
            for (let i = 0; i < value.length; i++) {
                if (value[i] == '!')
                    l = 1;
                else
                    da += dataSerial.value[i];
            }
            if (l == 1) {//actualizamos los datos
                let finishorder= DB.findObject('orders',da) 
                finishorder['state']= 'Finalizado'
                DB.update("orders", finishorder)
                da = "";
            }
        }
    
    /*io.emit('arduino:data', {
        value: data.toString()
    });*/
});


mySerial.on('error', function(data) {
    console.log("error serial");
    console.log(data.message);
});

