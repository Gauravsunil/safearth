const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const app=express();

const mongoose=require('mongoose');
const path = require('path');
const port=process.env.PORT ||5000;
app.use(bodyParser.json());

app.use(cors());

const url='mongodb+srv://Gaurav123:Gaurav123@cluster0-fudtm.mongodb.net/safearth?retryWrites=true&w=majority';

mongoose.connect(url)
.then(()=>{
    console.log("CONNECTED TO THE SERVER");

})
.catch((err)=>console.log(err));

var Users=require('./routes/Users');

app.use('/users',Users);

if(process.env.NODE.ENV === 'production') {
  app.use(express.static('frontend/build'));


  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  });
  
}
app.listen(port,()=>{
    console.log('Server is running on :'+port);
});


