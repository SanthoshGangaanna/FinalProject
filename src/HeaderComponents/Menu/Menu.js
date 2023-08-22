import { ButtonGroup, Typography, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css"

function Menu() {
  return (
    <ul className="Menustyle">
      <Link to="/mensclothing"><li className="indivistyles">Men</li></Link>
      <Link to="/womensclothing"><li className="indivistyles">Women</li></Link>
      <Link to="/electronics"><li className="indivistyles">Electronics</li></Link>
      <Link to="/jewelery"><li className="indivistyles">Jewelery</li></Link>
    </ul>
  )
}

export default Menu