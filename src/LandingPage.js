console.log("Landing Page");
import React from 'react';

 class LandingPage extends React.Component {
  constructor(props){
    super(props);
   
  }
    render(){ 
		  alert(2);
          console.log('myData isLanding', localStorage.getItem("myData"))             
    return (
	                            <h1> Landing Page App </h1>

	);
	  }
 };
    export default LandingPage;
