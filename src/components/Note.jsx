import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios"

function Note(props) {

async  function handleClick() {

await axios.post( window.location.origin + "/delit" , {
  tit: props.title,
  con: props.content
})
.then(function (response) {
  console.log(response);
})
    props.onDelete(props.id);
  } 

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
