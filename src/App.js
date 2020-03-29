import React, { useEffect } from "react";
import "./App.css";
import useAxios from "axios-hooks";

function App() {
  const [{ data, loading, error }, refetch] = useAxios(
    "https://telegrafme.herokuapp.com/indicator/ot"
  );

  const getData = () => {
    setInterval(refetch, 30000);
  };

  const removeGetData = () => {
    clearInterval(getData);
  };

  useEffect(getData, [], removeGetData);

  const Header = () => {
    return (
      <thead className="thead-dark">
        <tr>
          <th>symbol</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>OpBuy</th>
          <th>OpSell</th>
        </tr>
      </thead>
    );
  };

  const Content = ({ loading, data }) => {
    return (
      <tbody>
        {loading ||
          data.map(item => {
            return (
              <tr key={item.symbol}>
                <td>{item.symbol}</td>
                {item.status.slice(1, 6).map((e, i) => {
                  return (
                    <td
                      key={i}
                      style={{ backgroundColor: e.status ? "green" : "red" }}
                    >
                      <div>{e.status.candlle}</div>
                      <div>{e.status.toString()}</div>
                    </td>
                  );
                })}
                <td> {item.openPositionBuy.toString()}</td>
                <td> {item.openPositionSell.toString()}</td>
              </tr>
            );
          })}
      </tbody>
    );
  };

  return (
    <div className="App">
      {error && <center> Error!</center>}
      <table className="table">
        <Header />
        <Content loading={loading} data={data} />
      </table>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default App;
