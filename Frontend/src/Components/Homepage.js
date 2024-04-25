import React from "react";

import "../Constants/homepage.css";

import { useState, useEffect } from "react";

export default function Homepage() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [data, setData] = useState([]);


  const handleClick = async () => {


    const taskdata = { title, desc};

    await fetch("https://todolist-backend-rffr.onrender.com/createtask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskdata),
    });
    // console.log(taskdata);
  };


  const handleDelete = async (id)=>{
        await fetch(`https://todolist-backend-rffr.onrender.com/deletetask/${id}`, {
          method: "DELETE",
        });
  }

  const handleEdit = async (id)=>{
    const title = prompt( 'Please enter new Title');
    const description = prompt('Please enter new Description');
    const taskdata = { title, description, id};
    await fetch(`https://todolist-backend-rffr.onrender.com/updatetask`, {
      method:"POST",
      headers: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify(taskdata),
    });
  }

  const getData = async () => {
    const res = await fetch("https://todolist-backend-rffr.onrender.com/todolists", {
      method: "GET",
    });
    const comingdata = await res.json();
    // console.log(comingdata);
    setData(comingdata);
  };

  useEffect(() => {
    getData();
  });

  return (
    <div id="main_div">
    
      <div id="centre_div">
      <h2>TO-DO List Project</h2>
        <label>Enter Title</label>
        <br />
        <input
          className="tit_input"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Enter task title"
        ></input>

        <br />
        <br />
        <label>Enter Description</label>
        <br />
        <textarea
          className="desc_input"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          name="descrp"
          placeholder="Enter Description (Optional)"
          rows="5"
          cols="102"
        ></textarea>

        <br />
        <button onClick={handleClick}>Add</button>

        <br />
        <br />
        <br />
        <div id="tasks">
          
            {data.map((doc) => (
                <div id="output">
                <div className="left">
                  <span id="coming_title">Title: {doc.title}</span>
                  <br />
                  
                  <span id="coming_desc">Description: {doc.description}</span>
                  <br />
                  <span id="coming_desc">Task Created Date: {doc.date}</span>
                </div>

                <div className="right">
                  <button className="edit ed" onClick={()=>{handleEdit(doc._id)}}>Edit</button>
                  <button className="delete ed" onClick={()=>{
                    handleDelete(doc._id)
                  }} >Delete</button>
                </div>
                </div>
            ))}
          
        </div>
      </div>
    </div>
  );
}
