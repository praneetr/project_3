import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Grid, Row, Col, Button } from "react-bootstrap";

import TableComponent from "./components/table/TableComponent";
import SearchedListComponent from "./components/searched/SearchesListComponent";
import Input from "./components/form/Input/Input";
import {
  saveStockData,
  deleteStockData,
  fetchStockData,
  showClickedSearchItem
} from "./actions/data-actions";

import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
  //form data
  state = {
    quandlForm: {
      ticker: {
        label: "Enter Ticker",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "i.e - FB, AMZN, TSLA, GOOG"
        },
        value: "",
        validation: {
          required: true,
          minLength: 2,
          isAlphanumeric: true
        },
        valid: false,
        touched: false
      },
      date: {
        label: "Enter Date: (mm/dd/yyyy)",
        elementType: "date",
        elementConfig: {
          type: "text",
          placeholder: "i.e - FB"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    isFormValid: false,
    tickerData: null,
    searchHistory: null
  };

  //validation function - checking for the rules we defined on the quandl form data state object

  componentDidMount() {
    this.getStockData();
  }

  checkValidation(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isAlphanumeric) {
      const pattern = /^([a-zA-Z0-9 _-]+)$/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  //function that trigger on input onChange event
  inputChangedHandler = (event, inputId) => {
    //copy of the original quandl form

    const quandlFormCopy = {
      ...this.state.quandlForm
    };
    const newQuandlFormElement = {
      ...quandlFormCopy[inputId]
    };

    if (inputId === "date") {
      newQuandlFormElement.value = event.format("MM-DD-YYYY");
      this.setState({ startDate: newQuandlFormElement.value });
    } else {
      newQuandlFormElement.value = event.target.value;
    }

    newQuandlFormElement.valid = this.checkValidation(
      newQuandlFormElement.value,
      newQuandlFormElement.validation
    );
    newQuandlFormElement.touched = true;
    quandlFormCopy[inputId] = newQuandlFormElement;

    let isFormValid = true;
    for (var key in quandlFormCopy) {
      isFormValid = quandlFormCopy[key].valid && isFormValid;
    }

    this.setState({ quandlForm: quandlFormCopy, isFormValid: isFormValid });
  };

  //function that trigger on form submit
  formSubmitHandler = event => {
    event.preventDefault();
    const userInputs = {};
    for (let inputId in this.state.quandlForm) {
      userInputs[inputId] = this.state.quandlForm[inputId].value;
    }

    const formData = {
      userInputs
    };

    //posting the form data to the server
    axios.post("/api/get-ticker-data", { formData }).then(response => {
      this.setState({ tickerData: response.data.data });
    });
  };

  getStockData = () => {
    this.props.fetchStockData().then(res => {
      this.setState({ searchHistory: this.props.searchHistory });
    });
  };

  saveStockDataHandler = () => {
    var data = this.state.tickerData;
    this.props.saveStockData(data).then(res => {
      this.setState({ searchHistory: this.props.searchHistory });
    });
  };

  deleteStockDataHandler = stockId => {
    this.props.deleteStockData(stockId).then(res => {
      this.setState({ searchHistory: this.props.searchHistory });
    });
  };

  showSearchedDataHandler = id => {
    this.props.showClickedSearchItem(id).then(res => {
      this.setState({ tickerData: this.props.data[0][0] });
    });
  };

  render() {
    //looping on the quandl form state obj and pushing the id and every input type(first name, last name....)
    const contactForm = [];
    for (let key in this.state.quandlForm) {
      contactForm.push({
        id: key, //key = first name, last name, email.....
        config: this.state.quandlForm[key]
      });
    }

    let form = (
      <form onSubmit={this.formSubmitHandler}>
        {contactForm.map(input => (
          <Input
            key={input.id}
            Label={input.config.label}
            selectedDate={this.state.startDate}
            elementType={input.config.elementType} //the element type of the quandlForm state obj (input)
            elementConfig={input.config.elementConfig}
            value={input.config.value} //the element value of the quandlForm state obj (input)
            invalid={!input.config.valid} // we set it on checkValidation function
            shouldValidate={input.config.validation}
            touched={input.config.touched} //we set it on inputChangedHandler
            changed={event => this.inputChangedHandler(event, input.id)}
          />
        ))}

        <Button
          style={{ marginTop: 20 }}
          bsStyle="success"
          bsSize="large"
          type="submit"
          disabled={!this.state.isFormValid}
        >
          Get 1 Month Historical Ticker Data
        </Button>
      </form>
    );

    return (
      <Grid>
        <Row>
          <Col xs={12} sm={12} md={12}>
            <Header />
          </Col>
        </Row>
        <Row style={{ minHeight: 'calc(100vh - 100px)' }}>
          <Col xs={12} sm={12} md={8}>
            {form}
            <Row>
              <Col xs={12} sm={12} md={12}>
                {this.state.tickerData && (
                  <TableComponent
                    tickerData={this.state.tickerData}
                    selectedDate={this.state.startDate}
                  />
                )}
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={4} />
          <Col xs={12} sm={12} md={4}>
            {this.props.searchHistory.length > 0 && (
              <SearchedListComponent
                showSearchedData={this.showSearchedDataHandler}
                deleteStock={this.deleteStockDataHandler}
                searchHistory={this.props.searchHistory}
              />
            )}
          </Col>
        </Row>
        <Row>
          {this.state.tickerData && (
            <Col xs={12} sm={12} md={12}>
              <Button
                style={{ marginTop: 20 }}
                bsStyle="success"
                bsSize="large"
                disabled={!this.state.isFormValid}
                onClick={this.saveStockDataHandler}
              >
                Save
              </Button>
            </Col>
          )}
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12}>
            <Footer />
          </Col>
        </Row>
      </Grid>
    );
  }
}

// Make data  array available in  props
function mapStateToProps(state) {
  return {
    data: state.dataReducer.data,
    searchHistory: state.dataReducer.searchHistory,
    readyState: state.dataReducer.readyState
  };
}

export default connect(mapStateToProps, {
  saveStockData,
  deleteStockData,
  fetchStockData,
  showClickedSearchItem
})(App);
