import React from 'react'

function AirportForm(props) {
    const {  newAirport, handleAirportForm, onAirportDataChanged } = props
    return (
        <React.Fragment>
             <form onSubmit={handleAirportForm}>
                        <div className="form-group">
                            <label htmlFor="name">Airport Name<span className="requiredAstrick">*</span>:</label>
                            <input type="text" className="form-control"  name="airport_name" placeholder="E.g Biju Pattanaik International Airport, BBSR" 
                            required  value={newAirport.airport_name} onChange={onAirportDataChanged}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Fuel Available<span className="requiredAstrick">*</span>:</label>
                            <input type="number" className="form-control" name="fuel_capacity_available" placeholder="E.g 15000"
                            required  value={newAirport.fuel_capacity_available} onChange={onAirportDataChanged}/>
                        </div>
                        <div className="right-content">
                            <button type="submit" className="btn btn-primary">Add New Airport</button>
                        </div>
                    </form>
        </React.Fragment>
    )
}

export default AirportForm
