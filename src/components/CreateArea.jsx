import React, { useState , useEffect} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

import axios from "axios"

function CreateArea(props) {

const [isExpanded, setExpanded] = useState(false);
const [datas , setData] = useState([]) ; 
const [note, setNote] = useState({
    title: "",
    content: ""
  });

  useEffect (()=>{
    async function getall(){
      try{
        const datas = await axios.get( window.location.origin + "/getall") // it will fetch the response from that api ok [ {} {} .. ]
    
        setData(datas.data)
        for ( let i = 0 ; i < datas.data.length ; i++) {
          let   note1 = {
            title: datas.data[i].title,
            content: datas.data[i].content
          }
            props.onAdd(note1);
            setNote({
              title: "",
              content: ""
            });
        }
      } catch ( error ){
        }
    }
    getall()
  }, [] )

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

async function submitNote(event) {
  props.onAdd(note);

  await axios.post( window.location.origin + "/addit" , {
      tit: note.title,
      con: note.content
    })
    .then(function (response) {
      console.log(response);
    })

    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
}

  function expand() {
    setExpanded(true);
  }

  return (

    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>

            <AddIcon />
          </Fab>
        </Zoom>

      </form>
    </div>

  );

}

export default CreateArea;
