var PatientBox = React.createClass({
  getInitialState: function() {
    // This will hold all the data being read and posted to the file
    return { data: [] };
  },
  // This loads the donation from the json file notated in the server.js file
  loadPatientFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        // Set the state with the newly loaded data so the display will update
        this.setState({ data: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  
  componentDidMount: function() {
    // Once the component is fully loaded, we grab the Patients
    this.loadPatientFromServer();
    // ... and set an interval to continuously load new data:
    setInterval(this.loadPatientFromServer, this.props.pollInterval);
  },
  render: function() {
    var patientNodes = this.state.data.map(function(data, index) {
      return (
        <div key={index} className="patient">
          <p>Name: {data.patientname}</p>
          <p>Email: {data.patientemail}</p>
          <p>Address: {data.patientaddress}</p>
          <p>Zip: {data.patientzip}</p>
          <p>Reason: {data.patientreason}</p>
          <p>Pain Level: {data.patientpain}</p>
          <p>Primary Doctor: {data.patientdoc}</p>
          <p>Patient Appointment Time: {data.patientappttime}</p>
          <p>Patient Preferred Language: {data.patientlanguage}</p>
          <p>New or Old Patient: {data.patientnewold}</p>
          <p>Patient Occupation: {data.patientoccupation}</p>
          <p>Patient Preferred Contact Method: {data.patientcontmethod}</p>
          <p>Patient Problem/Issue: {data.patientissue}</p>
          <p>Patient Insurance: {data.patientinsurance}</p>
          <p>Patient Date of Birth: {data.patientbirth}</p>


          </div>
      );
    });
    
    // Print all the nodes in the list
    return (
      <div className="patientList">
        {patientNodes}
      </div>
    );
  }
});

ReactDOM.render(
  <PatientBox url="/api/patients" pollInterval={2000} />,
  document.getElementById('content')
);
