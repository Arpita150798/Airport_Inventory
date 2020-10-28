import React, { Component } from "react";
import AirportForm from "./AirportForm";
import AircraftForm from "./AircraftForm";
import {
  AircraftModel,
  AirportModel,
  TransactionModel,
} from "../Utils/Models";
import { Link } from "react-router-dom";
import Transaction from "./Transaction";
import SortingHOC from "../Utils/SortingHOC";
import ConnectToApi from "../Utils/ConnectToApi";
import { API_ENDPOINTS } from '../Utils/ApiEndPoints';

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Airports: [],
      Aircrafts: [],
      newAirport: new AirportModel(),
      newAircraft: new AircraftModel(),
      newTransaction: new TransactionModel(),
      Transactions: [],
      aircraftRequired: true,
    };
  }
  componentDidMount() {
    new ConnectToApi()
      .getData(API_ENDPOINTS.getAirportData)
      .then((response) => {
       var initialAirports = [];
        initialAirports = response.data;
        this.setState({
          Airports: initialAirports,
          transactionMode: false,
        });
        
      })
      .catch((error) => {
        console.log(error);
      });
      new ConnectToApi()
      .getData(API_ENDPOINTS.getAircraftData)
      .then((response) => {
       var initialAircrafts = [];
       initialAircrafts = response.data;
        this.setState({
          Aircrafts: initialAircrafts,
          transactionMode: false,
        });
        
      })
      .catch((error) => {
        console.log(error);
      });
        new ConnectToApi()
        .getData(API_ENDPOINTS.getTransactionData)
        .then((response) => {
         var transactionList = [];
         transactionList  = response.data;
          this.setState({
            Transactions: transactionList
          });
          
        })
        .catch((error) => {
          console.log(error);
        });
     
  }
  handleAirportForm = (e) => {
    e.preventDefault();
    new ConnectToApi().postData(API_ENDPOINTS.addAirport, this.state.newAirport).then((response) => {
      var airportList = [];
      airportList = response.data;
       this.setState({
         Airports: airportList,
         newAirport: new AirportModel(),
       });
       
     })
     .catch((error) => {
       console.log(error);
     });
    
  };
  changeToTransaction = (e) => {
    this.setState({
      transactionMode: true,
    });
  };
  backToHome = () => {
    this.setState({
      transactionMode: false,
    });
  };
  handleAirportFormChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let currentAirport = { ...this.state.newAirport };
    currentAirport[name] = value;
    this.setState({
      newAirport: currentAirport,
    });
  };
  handleAircraftForm = (e) => {
    e.preventDefault();
    new ConnectToApi().postData(API_ENDPOINTS.addAircraft, this.state.newAircraft).then((response) => {
      var aircraftList = [];
      aircraftList = response.data;
       this.setState({
         Aircrafts: aircraftList,
         newAircraft: new AircraftModel(),
       });
       
     })
     .catch((error) => {
       console.log(error);
     });
  };
  handleAircraftFormChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let currentAircraft = { ...this.state.newAircraft };
    currentAircraft[name] = value;
    this.setState({
      newAircraft: currentAircraft,
    });
  };
  validateTransationForm = () => {
    let valid = true;
    this.state.Airports.forEach((airport) => {
      if (
        airport.airport_id === Number(this.state.newTransaction.airport_id) &&
        this.state.newTransaction.transaction_type === "OUT"
      ) {
        if (
          airport.fuel_capacity_available < this.state.newTransaction.quantity
        ) {
          alert("Required fuel quantity exceeds availability");
          valid = false;
        }
      }
    });
    return valid;
  };
  handleTransaction = (e) => {
    e.preventDefault();

    if (!this.validateTransationForm()) {
      return;
    }
    this.state.newTransaction.transaction_date_time = new Date();//.toLocaleString();
    this.state.newTransaction.airport_id = Number(this.state.newTransaction.airport_id);
    this.state.Transactions.push(this.state.newTransaction);
    new ConnectToApi().postData(API_ENDPOINTS.addTransaction, this.state.newTransaction).then((response) => {
      var transactionList = [];
      transactionList = response.data;
       console.log("transaction", transactionList);
       this.setState({
        newTransaction: new TransactionModel(),
        Transactions: transactionList
      });
     })
     .catch((error) => {
       console.log(error);
     });
    
  };
  onChangeTransaction = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let currentTransaction = { ...this.state.newTransaction };
    currentTransaction[name] = value;
    if (currentTransaction.transaction_type === "OUT") {
      this.setState({
        aircraftRequired: false,
      });
    } else {
      this.setState({
        aircraftRequired: true,
      });
    }
    this.setState({
      newTransaction: currentTransaction,
    });
  };
  onReverseTransaction = (e, reverseTransactionData) => {
    let currentTransaction = new TransactionModel();
    currentTransaction.transaction_parent_id = reverseTransactionData;
    this.state.Transactions.forEach((transaction) => {
      if (
        transaction.transaction_id === currentTransaction.transaction_parent_id
      ) {
        if (transaction.transaction_type === "IN") {
          currentTransaction.transaction_type = "OUT";
          currentTransaction.quantity = transaction.quantity;
          currentTransaction.transaction_date_time = new Date().toLocaleString();
          currentTransaction.aircraft_id = transaction.aircraft_id;
          currentTransaction.airport_id = transaction.airport_id;
        } else {
          currentTransaction.transaction_type = "IN";
          currentTransaction.quantity = transaction.quantity;
          currentTransaction.aircraft_id = transaction.aircraft_id;
          currentTransaction.transaction_date_time = new Date().toLocaleString();
          currentTransaction.airport_id = transaction.airport_id;
        }
      }
    });
    this.state.Airports.forEach((airport) => {
      if (airport.airport_id === currentTransaction.airport_id) {
        if (currentTransaction.transaction_type === "IN") {
          airport.fuel_capacity_available =
            parseInt(airport.fuel_capacity_available) +
            parseInt(currentTransaction.quantity);
        } else {
          airport.fuel_capacity_available =
            parseInt(airport.fuel_capacity_available) -
            parseInt(currentTransaction.quantity);
        }
      }
    });
    this.setState({
      Transactions: [...this.state.Transactions, currentTransaction],
      Airports: this.state.Airports,
    });
  };
  render() {
    return (
      <React.Fragment>
        {!this.state.transactionMode ? (
          <div>
            <div className="row">
              <div className="col-sm-6">
                <h3> Welcome {this.props.match.params.name}</h3>
              </div>
              <div className="col-sm-6">
                <div className="right-content">
                  <button
                    className="btn btn-primary"
                    onClick={this.changeToTransaction}
                  >
                    Transaction
                  </button>
                  <Link to="/" className="btn btn-primary">
                    Logout
                  </Link>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-4">
                <div className="airport-form-content">
                  <AirportForm
                    handleAirportForm={this.handleAirportForm}
                    newAirport={this.state.newAirport}
                    onAirportDataChanged={this.handleAirportFormChange}
                  ></AirportForm>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="airport-form-content">
                  <AircraftForm
                    handleAircraftForm={this.handleAircraftForm}
                    newAircraft={this.state.newAircraft}
                    onAircraftDataChanged={this.handleAircraftFormChange}
                  ></AircraftForm>
                </div>
              </div>
            </div>
            <div className="row">
              <h2>Airport Summary Report</h2>
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th
                        onClick={() =>
                          this.props.sortData(
                            this.state.Airports,
                            "airport_name"
                          )
                        }
                      >
                        Airport
                      </th>
                      <th
                        onClick={() =>
                          this.props.sortData(
                            this.state.Airports,
                            "fuel_capacity_available"
                          )
                        }
                      >
                        Fuel Available
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.Airports.map((item, index) => (
                      <tr key={index}>
                        <td>{item.airport_name}</td>
                        <td>{item.fuel_capacity_available}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row">
              <h2>Aircrafts Summary Report</h2>
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th
                        onClick={() =>
                          this.props.sortData(
                            this.state.Aircrafts,
                            "aircraft_no"
                          )
                        }
                      >
                        Aircraft No
                      </th>
                      <th
                        onClick={() =>
                          this.props.sortData(this.state.Aircrafts, "airline")
                        }
                      >
                        Airline
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.Aircrafts.map((item, index) => (
                      <tr key={index}>
                        <td>{item.aircraft_no}</td>
                        <td>{item.airline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <Transaction
            backToHome={this.backToHome}
            airportData={this.state.Airports}
            aircraftData={this.state.Aircrafts}
            handleTransaction={this.handleTransaction}
            newTransaction={this.state.newTransaction}
            onChangeTransaction={this.onChangeTransaction}
            allTransaction={this.state.Transactions}
            onReverseTransaction={this.onReverseTransaction}
            aircraftRequired={this.state.aircraftRequired}
          ></Transaction>
        )}
      </React.Fragment>
    );
  }
}

export default SortingHOC(Dashboard);
