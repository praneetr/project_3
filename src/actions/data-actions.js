import axios from "axios";

const saveUrl = "/api/save-ticker-data";
const getUrl = "/api/get-history-data";
const getSearchedItemClickedUrl = "/api/get-searched-item-data";

export function setStockData(stockData) {
  return dispatch => {
    return dispatch({
      type: "SET_STOCKDATA",
      stockData
    });
  };
}

export function setData(stockData) {
  return dispatch => {
    return dispatch({
      type: "SET_DATA",
      stockData
    });
  };
}

export function showClickedSearchItem(id) {
  return dispatch => {
    return dispatch({
      type: "SHOW_CLICKED_SEARCHED_ITEM",
      id,
      payload: axios
        .post(getSearchedItemClickedUrl, {
          id: id
        })
        .then(response => {
          dispatch(setData(response.data));
        })
    });
  };
}

export function fetchStockData(stock) {
  return dispatch => {
    return dispatch({
      type: "FETCH_STOCKDATA",
      payload: axios.post(getUrl, stock).then(response => {
        dispatch(setStockData(response));
      })
    });
  };
}

export function saveStockData(stockData) {
  return dispatch => {
    return dispatch({
      type: "SAVE_STOCKDATA",
      stockData,
      payload: axios.post(saveUrl, stockData).then(response => {
        dispatch(setStockData(response));
      })
    });
  };
}

export function deleteStockData(stock) {
  return dispatch => {
    return dispatch({
      type: "DELETE_STOCKDATA",
      payload: axios
        .delete(`/api/delete-ticker-data/${stock}`)
        .then(response => {
          dispatch(setStockData(response));
        })
    });
  };
}
