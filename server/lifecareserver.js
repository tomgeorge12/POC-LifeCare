var express = require('express');
var path = require('path');
var app  = express();
let fs = require('fs');
var hospital=require('./data/hospitalcomponent.json');
var hospitalDetails=require('./data/hospitaldetails.json');
let bodyParser = require('body-parser');
let appointment=require('./data/appointment.json');
const PORT = process.env.PORT || 8282; 

app.get('/',function(req,res){
  res.header('Access-Control-Allow-Origin','*');
  res.json(hospital);
});

app.get('/gethospitaldetail',function(req,res){
  res.header('Access-Control-Allow-Origin','*');
  res.json(hospitalDetails);
});

app.use(bodyParser.urlencoded({
  extended:true
}));

function getRandomInt(){
  var min=100000;
  var max=1000000000;
  return Math.floor(Math.random() * (max - min + 1) + min);
}
app.post('/create',function(req,res){
  var user_ID = getRandomInt();
  let appointment_object = JSON.parse(fs.readFileSync('./appointment.json', 'utf8'));
  let appointment_data = '{"doctor":{"patient": [' +
      '{ "userId":" ' + user_ID  + ' ","patientname":" '+ req.body.name +' " ,"patientage":" '+ req.body.age +' " ,"patientsex":" '+ req.body.sex +' " , "contactno":" '+ req.body.number +'  ","patientdate":" '+ req.body.date +' " ,"patientslot":" '+ req.body.slot +' " }]}}';
  let Tem = JSON.parse(appointment_data);
  appointment_object.doctor.patient.push(Tem.doctor.patient[0]);
  fs.writeFile ('./appointment.json',JSON.stringify(appointment_object , null, 2) , function(err) {
    console.log("callback::running");
    if (err){
      console.log("Error is::"+err+"...................");
    }
    res.header('Access-Control-Allow-Origin','*');
    res.json({success : "Updated Successfully", status : 200, user_id : user_ID});
  }
  );

});

app.post('/createHospitals',function(req,res){
  var lookupid = getRandomInt();
  let create_object = JSON.parse(fs.readFileSync('./HospitalComponent.json', 'utf8'));
  let create_data = '{"cardContent":{"relationItems": [' +
      '{ "lookupid":" ' + lookupid  + ' " ,"name":" '+ req.body.name +' ","address":" '+ req.body.address +' " ,"aboutUs":" '+ req.body.aboutUs +' " , "contactUs":" '+ req.body.contactUs +'  " }]}}';
  let Tem = JSON.parse(create_data);
  create_object.cardContent.relationItems.push(Tem.cardContent.relationItems[0]);
  fs.writeFile ('./HospitalComponent.json',JSON.stringify(create_object , null, 2) , function(err) {
    console.log("callback:: create running");
    if (err){
      console.log("Error is::"+err+"...................");
    }
    res.header('Access-Control-Allow-Origin','*');
    res.json({success : "created Successfully", status : 200, lookupid:lookupid});
  }
  );

});
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, "../client/lifecare/build")));
  app.get("", (req, res)=>{
    res.sendFile(path.resolve(path.join(__dirname, "../client/lifecare/build/index.html")));
  });
}

app.listen(PORT,function(){
  console.log('App running successfully: ', PORT);
});
