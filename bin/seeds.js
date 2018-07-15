const mongoose = require('mongoose');
const STATES  = require('../models/states');
const HOUSING = require('../models/housing');
const dbtitle = 'project2';
mongoose.connect(`mongodb://localhost/${dbtitle}`);
STATES.collection.drop();

const statesData = [
{ name: "Alabama"}, 
{ name: "Alaska"} ,
{ name: "Arizona"} ,
{ name: "Arkansas"} ,
{ name: "California"}, 
{ name: "Colorado"} ,
{ name: "Connecticut"},
{name: "District of Columbia"}, 
{ name: "Delaware"} ,
{ name: "Florida"},
{ name: "Georgia"},
{ name: "Hawaii"} ,
{ name: "Idaho"},
{ name: "Illinois"},
{ name: "Indiana"},
{ name: "Iowa"},
{ name: "Kansas"} ,
{ name: "Kentucky"} ,
{ name: "Louisiana"} ,
{ name: "Maine"},
{ name: "Maryland"}, 
{ name: "Massachusetts"}, 
{ name: "Michigan"} ,
{ name: "Minnesota"} ,
{ name: "Mississippi"}, 
{ name: "Missouri"},
{ name: "Montana"},
{ name: "Nebraska"}, 
{ name: "Nevada"},
{ name: "New Hampshire"}, 
{ name: "New Jersey"},
{ name: "New Mexico"},
{ name: "New York"},
{ name: "North Carolina"}, 
{ name: "North Dakota"},
{ name: "Ohio"},
{ name: "Oklahoma"}, 
{ name: "Oregon"},
{ name: "Pennsylvania"},
{ name: "Rhode Island"}, 
{ name: "South Carolina"}, 
{ name: "South Dakota"}, 
{ name: "Tennessee"}, 
{ name: "Texas"}, 
{ name: "Utah"}, 
{ name: "Vermont"}, 
{ name: "Virginia"}, 
{ name: "Washington"}, 
{ name: "West Virginia"}, 
{ name: "Wisconsin"}, 
{ name: "Wyoming"}
  
];

const dummyHouses = [
  {
   title: 'Dummy',
   price: 55,
   state: 'AL'
  }
]; 

STATES.create(statesData,(err) =>{

  if(err) {throw err;}
  console.log("Success");
  mongoose.connection.close();

});

HOUSING.create(dummyHouses,(err) =>{

  if(err) {throw err;}
  console.log("Success");
  mongoose.connection.close();

});

module.exports = STATES;