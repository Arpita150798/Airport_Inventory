import React from 'react'

function AircraftForm(props) {
    const {  newAircraft, handleAircraftForm, onAircraftDataChanged } = props
    return (
        <React.Fragment>
             <form onSubmit={handleAircraftForm}>
                <div className="form-group">
                  <label htmlFor="name">Aircraft No<span className="requiredAstrick">*</span>:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="aircraft_no"
                    placeholder="E.g 6E902"
                    required
                    value={newAircraft.aircraft_no} onChange={onAircraftDataChanged}/>
                </div>
                <div className="form-group">
                  <label htmlFor="price">Airline<span className="requiredAstrick">*</span>:</label>
                  <select
                    required
                    className="form-control"
                    name="airline"
                    value={newAircraft.airline} onChange={onAircraftDataChanged}>
                    <option value="">Select-Airline</option>
                    <option value="Indigo">Indigo</option>
                    <option value="Go Air">Go Air</option>
                    <option value="Vistara">Vistara</option>
                    <option value="Air India">Air India</option>
                    <option value="Air Asia">Air Asia</option>
                    <option value="Spice Jet">Spice Jet</option>
                  </select>
                </div>
                <div className="right-content">
                  <button type="submit" className="btn btn-primary">
                    Add New Aircraft
                  </button>
                </div>
              </form>
        </React.Fragment>
    )
}

export default AircraftForm
