import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    if (count >= 10) {
      toast.warning("upper limit of counter of 10");
      // alert("already very high");
    } else {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count <= 0) {
      toast.error("lower limit of counter of 0");
    } else {
      setCount(count - 1);
    }
  };

  const size = () => {
    if (count >= 10) {
      toast.warning("high");
      // alert("already very high");
    } else {
      setCount(count + 4);
    }
  };

  const dec = () => {
    if (count <= 0) {
      toast.error("low");
    } else {
      setCount(count - 4);
    }
  };

  const reset = () => {
    setCount(0);
    toast.info("reset is done");
  };

  useEffect(() => {
    localStorage.setItem("count", count);
    console.log(count);
  }, [count]);

  // document.getElementById("theme").onclick = function () {
  //   document.body.classList.toggle("back");
  // };
  const tTheme = () => {
    document.body.classList.toggle("back");
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <ToastContainer />
      <button onClick={decrement}>Decrement</button>
      <ToastContainer />
      <button onClick={reset}>Reset</button>
      <ToastContainer />
      <button onClick={size}>stepSize-ADD</button>
      <ToastContainer />
      <button onClick={dec}>stepSize-SUB</button>
      <ToastContainer />
      <button id="theme" onClick={tTheme}>
        theme
      </button>
    </div>
  );
}

export default App;
