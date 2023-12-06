import React from "react";
import Window from "./Window";

const Browser = ({ info, wins, setWins }) => {
  return <Window info={info} wins={wins} setWins={setWins}></Window>;
};

export default Browser;
