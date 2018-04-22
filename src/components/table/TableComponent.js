import React from "react";
import { Table } from "react-bootstrap";

const TableComponent = props => {
  const closingStockPrice =
    Array.isArray(props.tickerData.dataset.data) &&
    props.tickerData.dataset.data.length > 0 &&
    props.tickerData.dataset.data[0][4];

  const getChangePercentage = price => {
    var quote1 = parseInt(closingStockPrice, 10);
    var quote2 = parseInt(price, 10);
    const calc = ((quote2 - quote1) / quote2 * 100).toFixed(2) + "%";
    return calc;
  };

  return (
    <div>
      <h3>{props.tickerData.dataset.dataset_code}</h3>
      <h3>i.e. {props.selectedDate || props.tickerData.dataset.end_date}</h3>
      <Table responsive striped bordered condensed hover>
        <thead>
          <tr>
            <th>Date:</th>
            <th>Price</th>
            <th>% change compared to entered date</th>
          </tr>
        </thead>
        <tbody>
          {props.tickerData.dataset.data &&
            props.tickerData.dataset.data.map((item, i) => (
              <tr key={i}>
                <td>{item[0]}</td>
                <td>{item[4]}</td>
                <td>{getChangePercentage(item[4])}</td>
              </tr>
            ))}
          {!props.tickerData.dataset.data && "No Data returned by the API!"}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
