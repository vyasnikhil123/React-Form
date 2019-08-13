console.log("welcome App");
import React from 'react';
import ReactStars from 'react-stars';
import LandingPage from './LandingPage';

 class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fields: {},
      errors: {},
      newRating:'' 
    }
  }
     
  ratingChanged(newRating) {
  console.log(newRating)
   //this.setState({newRating:newRating});
       localStorage.setItem("myDatastar",newRating );
}

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if(!fields["name"]){
      formIsValid = false;
      errors["name"] = "Not empty";
    }

    if(typeof fields["name"] !== "undefined"){
      if(!fields["name"].match(/^[a-zA-Z]+$/)){
        formIsValid = false;
        errors["name"] = "Only letters";
      }      	
    }

    //Email
    if(!fields["email"]){
      formIsValid = false;
      errors["email"] = "Not empty";
    }

    if(typeof fields["email"] !== "undefined"){
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  contactSubmit(e){
    e.preventDefault();
    console.log(this.state.fields);
    if(this.handleValidation()){       
     localStorage.setItem("myData", JSON.stringify(this.state.fields));
      alert("Form submitted");
        alert( "Ratings : "+localStorage.getItem("myDatastar"));
      // window.location.href = 'http://www.google.com'; //Will take you to Google.
    }else{
      alert("Form has errors.")
    }

  }

  handleChange(field, e){    		
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
  }

  render(){
         console.log('myData is', localStorage.getItem("myData"))    
          console.log('myDatastar is', localStorage.getItem("myDatastar"))        
         
    return (
      <div>        
        <form name="contactform" className="contactform" onSubmit= {this.contactSubmit.bind(this)}>
          <div className="col-md-6">
              <h1> Review App </h1>
            <fieldset>
              <input ref="name" type="text" size="30" placeholder="Name" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}/>
              <span className="error">{this.state.errors["name"]}</span>
              <br/>
              <input refs="email" type="text" size="30" placeholder="Email" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
              <span className="error">{this.state.errors["email"]}</span>
              <br/>
              <input refs="phone" type="number" size="10" placeholder="Phone" onChange={this.handleChange.bind(this, "phone")} value={this.state.fields["phone"]}/>
              <br/>
              <input refs="address" type="text" size="30" placeholder="Address" onChange={this.handleChange.bind(this, "address")} value={this.state.fields["address"]}/>
              <br/>
            </fieldset>
          </div>
          <div className="col-md-6">
            <fieldset>
              <textarea refs="message" cols="28" rows="10"
                className="comments" placeholder="Comments" onChange={this.handleChange.bind(this, "message")}>{this.state.fields["message"]}</textarea>
            </fieldset>
          </div>
              <ReactStars
                      count={5}
                      onChange={this.ratingChanged.bind(this)}
                      size={24}
                      color2={'#ffd700'} />
     
          <div className="col-md-12">
            <fieldset>
              <button className="btn btn-lg pro" id="submit" value="Submit">Submit</button>
            </fieldset>
          
          </div>
        </form>
      </div>
    )
  }
}
    export default App;