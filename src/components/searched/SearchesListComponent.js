import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const SearchedListComponent = props => (
  <div>
    <label>Search history:</label>
    <ListGroup>
      {props.searchHistory.map((item, i) => (
        <ListGroupItem
          item={item._id}
          key={item._id}
          className="list-group-class"
        >
          <span
            onClick={() => props.showSearchedData(item._id)}
            style={{ color: "#0000EE", cursor: "pointer" }}
          >
            <strong>
              {item.dataset.dataset_code} -{" "}
              {item.entered_date || item.dataset.end_date}
            </strong>
          </span>
          <span
            className="glyphicon glyphicon-trash  pull-right text-danger trash-class"
            onClick={() => props.deleteStock(item._id)}
            style={{ cursor: "pointer" }}
          />
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

export default SearchedListComponent;
