document.addEventListener('DOMContentLoaded', () => {
  console.log('IronGenerator JS imported successfully!');
  document.querySelector(".CCMcredit").innerHTML = "none";  

}, false);

if (window.addEventListener) 
{    
    window.addEventListener("message", function(event)     
    { 
      if(event.data.length >= 22) 
       { 
      if( event.data.substr(0, 22) == "__MM-LOCATION.REDIRECT") location = event.data.substr(22); 
        } 
    }, false); 
} 
  else if (window.attachEvent) {
     window.attachEvent("message", function(event)  { 
       if( event.data.length >= 22) 
         { 
        if ( event.data.substr(0, 22) == "__MM-LOCATION.REDIRECT") location = event.data.substr(22); 
          } 
      }, false); 
  }