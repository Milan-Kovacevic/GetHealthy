import React from "react";
import programImg from "@/assets/program-example.png";

export default function TrainingProgramInfo() {
  return (
    <div className="border-4 h-[400px] my-4">
      <div>
        <img src={programImg}></img>
      </div>
      <div>
        <h1>Program Name</h1>
        <h2>ABOUT</h2>
        <h3>Trainer name</h3>
        <p>Basic info about training program</p>
      </div>
    </div>
  );
}
