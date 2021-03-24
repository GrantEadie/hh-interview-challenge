import React from "react"

export default function Sidebar(props) {

  const { handleChangeSort, handleRandomColor } = props

  return (
    <>
    <div className="side-bar-container">
      <button className="btn btn-outline-dark ml-4" onClick={() => handleRandomColor()}>Random Color</button>
      <p onClick={() => handleChangeSort("")}>All</p>
      <hr/>
      <p onClick={() => handleChangeSort("red")}>Red</p>
      <p onClick={() => handleChangeSort("orange")}>Orange</p>
      <p onClick={() => handleChangeSort("yellow")}>Yellow</p>
      <p onClick={() => handleChangeSort("green")}>Green</p>
      <p onClick={() => handleChangeSort("blue")}>Blue</p>
      <p onClick={() => handleChangeSort("purple")}>Purple</p>
      <p onClick={() => handleChangeSort("brown")}>Brown</p>
      <p onClick={() => handleChangeSort("grey")}>Gray</p>
      
    </div>
    </>
  )
}