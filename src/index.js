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
    console.log(data.toString())
    
     //obtenemos el id 
     {
            for (let i = 0; i < data.toString().length; i++) {
                if (data.toString()[i]== '?')//enviamos la bebida mas antigua
    {
        let order = DB.getOrder()
        if(order){    
        mySerial.write(order.id);
        mySerial.write('!');
        
        let drink = DB.findObject('drinks',order.drink)
        let tem = parseInt(drink.ingre1)!=0 ?(parseInt(drink.ingre1)/41)*1000:0
        mySerial.write(tem.toString());
        mySerial.write('/');
        tem = parseInt(drink.ingre2)!=0 ?(parseInt(drink.ingre2)/41)*1000:0
        mySerial.write(tem.toString());
        mySerial.write('/');
        tem = parseInt(drink.ingre3)!=0 ?(parseInt(drink.ingre3)/41)*1000:0
        mySerial.write(tem.toString());
        mySerial.write('/');
        console.log("Eviado")
        }  
        else
        {
        mySerial.write('!');
        console.log("Vacio")
        }  
        da="";
    }else if (data.toString()[i] == '!')//actualizamos los datos
                {
                console.log(da);
                let finishorder= DB.findObject('orders',da) 
                finishorder['state']= 'Finalizado'
                DB.update("orders", finishorder)
                da = "";
                }
                else if(data.toString()[i] == '*')
                {
                console.log("Finalizado")
                da="";
                }
                else
                    da += data.toString()[i];
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

