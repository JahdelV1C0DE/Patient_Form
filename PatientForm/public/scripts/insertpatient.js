var PatientBox = React.createClass({
  getInitialState: function() {
    //this will hold all the data being read and posted to the file
    return {data: []};
  },
  loadPatientFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        
        //set the state with the newly loaded data so the display will update
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    //Once the component is fully loaded, we grab the donations
    this.loadPatientFromServer();
    //... and set an interval to continuously load new data:
    setInterval(this.loadPatientFromServer, this.props.pollInterval);
  },
  handlePatientSubmit: function(patient) {
    
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: patient,
      success: function(data) {
        //We set the state again after submission, to update with the submitted data
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status,  err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    
    return (
      <div className="patientBox">
        <h1>Patient List</h1>
        
        <PatientForm onPatientSubmit={this.handlePatientSubmit} />
      </div>
    );
  }
});



var Patient = React.createClass({
  render: function() {
    //display an individual donation
    return (
      <div className="patient">
        <h2 className="patientName">
          {this.props.patientname}: {this.props.patientemail}: {this.props.patientaddress}: {this.props.patientzip}: 
          {this.props.patientreason}: {this.props.patientpain}: {this.props.patientdoc}
        </h2>
          
      </div>
    );
  }
});

var PatientForm = React.createClass({
  getInitialState: function() {
    return {
      patientname: "",
      
      patientemail: "",

      patientaddress: "",

      patientzip: "",

      patientreason: "",
      patientpain: "",
      patientdoc: "",
      patientappttime: "",
      patientlanguage: "",
      patientnewold: "",
      patientoccupation: "",
      patientcontmethod: "",
      patientissue: "",
      patientinsurance: "",
      patientbirth: "",


      
    };
  },
  handlePatientSubmit: function(e) {
    //we don't want the form to submit, so we prevent the defaul behavior
    e.preventDefault();
    
    const safeTrim = (value) => (value || '').trim();

    var patientname = safeTrim(this.state.patientname);
    var patientemail = safeTrim(this.state.patientemail);
    var patientaddress = safeTrim(this.state.patientaddress);
    var patientzip = safeTrim(this.state.patientzip);
    var patientreason = safeTrim(this.state.patientreason);
    var patientpain = safeTrim(this.state.patientpain);
    var patientdoc = safeTrim(this.state.patientpain);
    var patientappttime = safeTrim(this.state.patientappttime);
    var patientlanguage = safeTrim(this.state.patientlanguage);
    var patientnewold = safeTrim(this.state.patientnewold);
    var patientoccupation= safeTrim(this.state.patientoccupation);
    var patientcontmethod = safeTrim(this.state.patientcontmethod);
    var patientissue = safeTrim(this.state.patientissue);
    var patientinsurance = safeTrim(this.state.patientinsurance);
    var patientbirth = safeTrim(this.state.patientbirth)
    //we clean up the data as we save it
    




    
    //these two items are required
    
    
    //Here we do the final submit to the parent component
    this.props.onPatientSubmit({patientname: patientname, patientemail: patientemail, patientaddress: patientaddress
                              , patientreason: patientreason, patientpain: patientpain, patientdoc: patientdoc, patientappttime: patientappttime,
                                patientlanguage: patientlanguage, patientnewold: patientnewold, patientoccupation: patientoccupation,
                                patientcontmethod: patientcontmethod, patientissue: patientissue, patientinsurance: patientinsurance,
                                patientbirth: patientbirth});
    
    //Now that the form is submitted, we empty all the fields
    this.setState({
      
      patientname: '',
      patientemail: '',
      patientaddress: '',
      patientzip: '',
      patientreason: '',
      patientpain: '',
      patientdoc: '',
      patientappttime: '',
      patientlanguage: '',
      patientnewold: '',
      patientoccupation: '',
      patientcontmethod: '',
      patientissue: '',
      patientinsurance: '',
      patientbirth: ''

      

      
    });
  },

    validateEmail: function (value) {
        
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
      },
      //Function to validate the currency entered
      validateDollars: function (value) {
        //will accept dollar amounts with two digits after the decimal or no decimal
        //will also accept a number with or without a dollar sign
        var regex  = /^\$?[0-9]+(\.[0-9][0-9])?$/;
        return regex.test(value);
      },
      //Generic Function to validate anything we set.
      commonValidate: function () {
        
        return true;
      },
      setValue: function (field, event) {
        var object = {};
        object[field] = event.target.value;
        this.setState(object);
      },
      render: function() { 
        return (
            
            <form className="patientForm" onSubmit={this.handlePatientSubmit}>
              <h2>Patients</h2>
              <table>
                <tbody>
                    
                <tr>
                            <th>Patient Name</th>
                            <td>
                            <TextInput
                                value={this.state.patientname}
                                uniqueName="patientname"
                                
                                textArea={false}
                                required={true}
                                minCharacters={6}
                                validate={this.commonValidate}
                                onChange={this.setValue.bind(this, 'patientname')} 
                                errorMessage="Name is not valid"
                                emptyMessage="Name is required" />
                        </td>

                    </tr>
                    <tr>
                        <th>Patient Email</th>
                        <td>
                            <TextInput
                                value={this.state.patientemail}
                                uniqueName="patientemail"
                                text="Email Address"
                                textArea={false}
                                required={true}
                                minCharacters={6}
                                validate={this.validateEmail}
                                onChange={this.setValue.bind(this, 'patientemail')} 
                                errorMessage="Email is invalid"
                                emptyMessage="Email is required" />
                                
                        </td>
                    </tr>
                    <tr>
                        <th>Patient Address</th>
                        <td>
                        <TextInput
                                value={this.state.patientaddress}
                                uniqueName="patientaddress"
                                text="address"
                                textArea={false}
                                required={true}
                                minCharacters={6}
                                validate={this.commonValidate}
                                onChange={this.setValue.bind(this, 'patientaddress')} 
                                errorMessage="Address is invalid"
                                emptyMessage="Address is required" />
                        </td>
                        </tr>
                        <tr>
                            <th>Patient Zip</th>
                            <td>
                            <TextInput
                                value={this.state.patientzip}
                                uniqueName="patientzip"
                                
                                textArea={false}
                                required={true}
                                minCharacters={6}
                                validate={this.commonValidate}
                                onChange={this.setValue.bind(this, 'patientzip')} 
                                errorMessage="Zip is invalid"
                                emptyMessage="Must enter a valid zip code" />
                        </td>

                    </tr>

                    <tr>
                            <th>Reason for Contact</th>
                            <td>
                            <TextInput
                                value={this.state.patientreason}
                                uniqueName="patientreason"
                                
                                textArea={false}
                                required={true}
                                minCharacters={6}
                                validate={this.commonValidate}
                                onChange={this.setValue.bind(this, 'patientreason')} 
                                errorMessage=""
                                emptyMessage="**Optional" />
                        </td>

                    </tr>

                    <tr>
                            <th>Patient Pain Level</th>
                            <td>
                            <TextInput
                                value={this.state.patientpain}
                                uniqueName="patientpain"
                                
                                textArea={false}
                                required={true}
                                minCharacters={6}
                                validate={this.commonValidate}
                                onChange={this.setValue.bind(this, 'patientpain')} 
                                errorMessage="Enter a number 1-10"
                                emptyMessage="Enter a number 1-10" />
                        </td>

                    </tr>


                    <tr>
                            <th>Primary Doctor Name</th>
                            <td>
                            <TextInput
                                value={this.state.patientdoc}
                                uniqueName="patientdoc"
                                
                                textArea={false}
                                required={true}
                                minCharacters={6}
                                validate={this.commonValidate}
                                onChange={this.setValue.bind(this, 'patientdoc')} 
                                errorMessage=""
                                emptyMessage="**Optional" />
                        </td>

                    </tr>



                  
                    <tr>
                            <th>Appointment Time</th>
                            <td>
                            <TextInput
                                value={this.state.patientappttime}
                                uniqueName="appttime"
                                
                                textArea={false}
                                required={true}
                                minCharacters={6}
                                validate={this.commonValidate}
                                onChange={this.setValue.bind(this, 'patientappttime')} 
                                errorMessage="Enter a valid time"
                                emptyMessage="**Optional" />
                        </td>

                    </tr>


                    <tr>
                            <th>Patient Language</th>
                            <td>
                            <TextInput
                                value={this.state.patientlanguage}
                                uniqueName="patientlanguage"
                                
                                textArea={false}
                                required={true}
                                minCharacters={6}
                                validate={this.commonValidate}
                                onChange={this.setValue.bind(this, 'patientlanguage')} 
                                errorMessage="Enter Preferred Language"
                                emptyMessage="**Optional" />
                        </td>

                    </tr>

                    <tr>
                            <th>New or Returning Patient</th>
                            <td>
                            <TextInput
                                value={this.state.patientnewold}
                                uniqueName="patientnewold"
                                
                                textArea={false}
                                required={true}
                                minCharacters={6}
                                validate={this.commonValidate}
                                onChange={this.setValue.bind(this, 'patientnewold')} 
                                errorMessage=""
                                emptyMessage="Are you a new or returning patient?" />
                        </td>

                    </tr>


                    <tr>
                            <th>Patient Occupation</th>
                            <td>
                            <TextInput
                                value={this.state.patientoccupation}
                                uniqueName="patientoccupation"
                                
                                textArea={false}
                                required={true}
                                minCharacters={6}
                                validate={this.commonValidate}
                                onChange={this.setValue.bind(this, 'patientoccupation')} 
                                errorMessage=""
                                emptyMessage="**Optional" />
                        </td>

                    </tr>


                    <tr>
                            <th>Preferred Contact Method</th>
                            <td>
                            <TextInput
                                value={this.state.patientcontmethod}
                                uniqueName="patientcontmethod"
                                
                                textArea={false}
                                required={true}
                                minCharacters={6}
                                validate={this.commonValidate}
                                onChange={this.setValue.bind(this, 'patientcontmethod')} 
                                errorMessage=""
                                emptyMessage="How would you like to be contacted" />
                        </td>

                    </tr>

                    
                    
                    <tr>
                            <th>Detail of Issue</th>
                            <td>
                            <TextInput
                                value={this.state.patientissue}
                                uniqueName="patientissue"
                                
                                textArea={false}
                                required={true}
                                minCharacters={6}
                                validate={this.commonValidate}
                                onChange={this.setValue.bind(this, 'patientissue')} 
                                errorMessage=""
                                emptyMessage="**Optional" />
                        </td>

                    </tr>


                    <tr>
                            <th>Notifications and Alerts</th>
                            <td>
                            <TextInput
                                value={this.state.patientalerts}
                                uniqueName="patientalerts"
                                
                                textArea={false}
                                required={true}
                                minCharacters={6}
                                validate={this.commonValidate}
                                onChange={this.setValue.bind(this, 'patientalerts')} 
                                errorMessage=""
                                emptyMessage="Stay informed" />
                        </td>

                    </tr>


                    <tr>
                            <th>Insurance Provider</th>
                            <td>
                            <TextInput
                                value={this.state.patientinsurance}
                                uniqueName="patientinsurance"
                                
                                textArea={false}
                                required={true}
                                minCharacters={6}
                                validate={this.commonValidate}
                                onChange={this.setValue.bind(this, 'patientinsurance')} 
                                errorMessage="Input Invalid"
                                emptyMessage="Name of Insurance Provider" />
                        </td>

                    </tr>

                    <tr>
                            <th>Patient Birth Date</th>
                            <td>
                            <TextInput
                                value={this.state.patientbirth}
                                uniqueName="patientbirth"
                                
                                textArea={false}
                                required={true}
                                minCharacters={6}
                                validate={this.commonValidate}
                                onChange={this.setValue.bind(this, 'patientbirth')} 
                                errorMessage=""
                                emptyMessage="" />
                        </td>

                    </tr>


                    <tr>
        <td colSpan="2"> 
          <button type="submit">Submit</button>
        </td>
      </tr>

                    
                </tbody>
              </table>
              
            </form>
    

        );
      }
    });


    var InputError = React.createClass({
        getInitialState: function() {
          return {
            message: 'Input is invalid'
          };
        },
        //Renders the error message when input is incorrect.
        render: function(){ 
          var errorClass = classNames(this.props.className, {
            'error_container':   true,
            'visible':           this.props.visible,
            'invisible':         !this.props.visible
          });
      //When the error occurs, the html code below is output to the screen
          return (
            <div className={errorClass}>
              <span>{this.props.errorMessage}</span>
            </div>
          )
        }
      
      });
      
      var TextInput = React.createClass({
        getInitialState: function(){
          //most of these variables have to do with handling errors
          return {
            isEmpty: true,
            value: null,
            valid: false,
            errorMessage: "Input is invalid",
            errorVisible: false
          };
        },
      
        handleChange: function(event){
          //validate the field locally
          this.validation(event.target.value);
      
         
          if(this.props.onChange) {
            this.props.onChange(event);
          }
        },
      //Runs validation for the text inputs.
        validation: function (value, valid) {
          //The valid variable is optional, and true if not passed in:
          if (typeof valid === 'undefined') {
            valid = true;
          }
          
          var message = "";
          var errorVisible = false;
          
          //we know how to validate text fields based on information passed through props
          if (!valid) {
           
            message = this.props.errorMessage;
            valid = false;
            errorVisible = true;
          }
          else if (this.props.required && jQuery.isEmptyObject(value)) {
            //this happens when we have a required field with no text entered
            //in this case, we want the "emptyMessage" error message
            message = this.props.emptyMessage;
            valid = false;
            errorVisible = true;
          }
          else if (value.length < this.props.minCharacters) {
            
            message = this.props.errorMessage;
            valid = false;
            errorVisible = true;
          }
          
         
          this.setState({
            value: value,
            isEmpty: jQuery.isEmptyObject(value),
            valid: valid,
            errorMessage: message,
            errorVisible: errorVisible
          });
      
        },
      //This will trigger when someone clicks off the text input
        handleBlur: function (event) {
          //Complete final validation from parent element when complete
          var valid = this.props.validate(event.target.value);
          //pass the result to the local validation element for displaying the error
          this.validation(event.target.value, valid);
        },
        //If the option for textArea is given instead of an input box
        
        render: function() {
          if (this.props.textArea) {
            return (
              <div className={this.props.uniqueName}>
                <textarea
                  placeholder={this.props.text}
                  className={'input input-' + this.props.uniqueName}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={this.props.value} />
            
                <InputError 
                  visible={this.state.errorVisible} 
                  errorMessage={this.state.errorMessage} />
              </div>
            );
       
          } else {
            return (
              <div className={this.props.uniqueName}>
                <input
                  placeholder={this.props.text}
                  className={'input input-' + this.props.uniqueName}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={this.props.value} />
            
                <InputError 
                  visible={this.state.errorVisible} 
                  errorMessage={this.state.errorMessage} />
              </div>
            );
          }
        }
      });
      //Creates an object if we want to create a radio button
      var Radios = React.createClass({
        getInitialState: function() {
          
          return {
            displayClass: 'invisible',
            valid: false,
            errorMessage: "Input is invalid",
            errorVisible: false
          };
        },
        handleClick: function(displayClass, e) {
          
          if (displayClass == 'invisible') {
            this.setState(
              {
                displayClass: displayClass,
                errorVisible: false
              }
            );
            this.props.onChange(e);
          }
          else {
            this.setState({displayClass: displayClass});
          }
        },
        handleAnyChange: function(e) {
          
          if (this.props.anyValidation(e.target.value)) {
            this.setState(
              {
                valid: true,
                errorMessage: "Input is invalid",
                errorVisible: false
              }
            );
          }
          else {
            this.setState(
              {
                valid: false,
                errorMessage: this.props.anyErrorMessage,
                errorVisible: true
              }
            );
          }
          this.props.onChange(e);
        },
        render: function() {
          var rows = [];
          var label = "";
          
          
          for (var i = 0; i < this.props.values.length; i++) {
            
            label = this.props.itemLabel.replace('[VALUE]', this.props.values[i]);
            
            
            rows.push(<input
              key={this.props.name + '-' + i}
              type="radio"
              ref={this.props.name + '-' + this.props.values[i]}
              name={this.props.name}
              value={this.props.values[i]}
              selected={this.props.value==this.props.values[i]?true:false}
              onClick={this.handleClick.bind(this, 'invisible')} />,
              
              <label key={this.props.name + '-label-' + i} htmlFor={this.props.values[i]}>{label}</label>,
            
              <br key={this.props.name + '-br-' + i} />);
          }
          
          //The "any value" field complicates things a bit
          if (this.props.addAny) {
            //we passed in a separate label just for the option that
            //activates the "any value" text field
            var selected = false;
            label = this.props.anyLabel;
            //if it's undefined, that means we don't select anything
            if (this.props.value != undefined && this.props.values.indexOf(this.props.value) == -1) {
              selected = true;
            }
            rows.push(<input
              key={this.props.name + '-' + i}
              type="radio"
              ref={this.props.name + '-any'}
              name={this.props.name} value="any"
              selected={selected}
              onClick={this.handleClick.bind(this, 'visible')} />,
                
              <label key={this.props.name + '-label-' + i} htmlFor={this.props.values[i]}>{label}</label>);
            
            //and now we add the "any value text field, with all its special variables"
            var value = "";
            if (selected) {
              value = this.props.value;
            }
            
            rows.push(<div key={this.props.name + '-div-' + (i+2)} className={this.state.displayClass}>
              <input
                className="anyValue"
                key={this.props.name + '-' + (i+1)}
                type="text"
                value={value}
                placeholder={this.props.anyPlaceholder}
                onChange={this.handleAnyChange}
                ref={this.props.name} />
            </div>);
          }
          
          //Now we just return all those rows, along with the error component
          return (
            <div className="radios">
              {rows}
              
              <InputError 
                visible={this.state.errorVisible} 
                errorMessage={this.state.errorMessage} />
            </div>
          );
        }
      });

ReactDOM.render(
    <PatientBox url="api/patients" pollInterval={2000}/>,
    document.getElementById('content')
);
