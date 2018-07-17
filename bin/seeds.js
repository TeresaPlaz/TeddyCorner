const mongoose = require('mongoose');
const STATES  = require('../models/states');
const HOUSING = require('../models/housing');
const dbtitle = 'project2';
mongoose.connect(`mongodb://localhost/${dbtitle}`);
STATES.collection.drop();
HOUSING.collection.drop();

const statesData = [
{ acronym:"AL", name: "Alabama"}, 
{ acronym:"AK", name: "Alaska"} ,
{ acronym:"AZ", name: "Arizona"} ,
{ acronym:"AR", name: "Arkansas"} ,
{ acronym:"CA", name: "California"}, 
{ acronym:"CO", name: "Colorado"} ,
{ acronym:"CT", name: "Connecticut"},
{ acronym:"DE", name: "District of Columbia"}, 
{ acronym:"DC", name: "Delaware"} ,
{ acronym:"FL", name: "Florida"},
{ acronym:"GA", name: "Georgia"},
{ acronym:"HI", name: "Hawaii"} ,
{ acronym:"ID", name: "Idaho"},
{ acronym:"IL", name: "Illinois"},
{ acronym:"IN", name: "Indiana"},
{ acronym:"IA", name: "Iowa"},
{ acronym:"KS", name: "Kansas"} ,
{ acronym:"KY", name: "Kentucky"} ,
{ acronym:"LA", name: "Louisiana"} ,
{ acronym:"ME", name: "Maine"},
{ acronym:"MD", name: "Maryland"}, 
{ acronym:"MA", name: "Massachusetts"}, 
{ acronym:"MI", name: "Michigan"} ,
{ acronym:"MN", name: "Minnesota"} ,
{ acronym:"MS", name: "Mississippi"}, 
{ acronym:"MO", name: "Missouri"},
{ acronym:"MT", name: "Montana"},
{ acronym:"NE", name: "Nebraska"}, 
{ acronym:"NV", name: "Nevada"},
{ acronym:"NH", name: "New Hampshire"}, 
{ acronym:"NJ", name: "New Jersey"},
{ acronym:"NM", name: "New Mexico"},
{ acronym:"NY", name: "New York"},
{ acronym:"NC", name: "North Carolina"}, 
{ acronym:"ND", name: "North Dakota"},
{ acronym:"OH", name: "Ohio"},
{ acronym:"OK", name: "Oklahoma"}, 
{ acronym:"OR", name: "Oregon"},
{ acronym:"PA", name: "Pennsylvania"},
{ acronym:"RI", name: "Rhode Island"}, 
{ acronym:"SC", name: "South Carolina"}, 
{ acronym:"SD", name: "South Dakota"}, 
{ acronym:"TN", name: "Tennessee"}, 
{ acronym:"TX", name: "Texas"}, 
{ acronym:"UT", name: "Utah"}, 
{ acronym:"VT", name: "Vermont"}, 
{ acronym:"VA", name: "Virginia"}, 
{ acronym:"WA", name: "Washington"}, 
{ acronym:"WV", name: "West Virginia"}, 
{ acronym:"WI", name: "Wisconsin"}, 
{ acronym:"WY", name: "Wyoming"} 
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