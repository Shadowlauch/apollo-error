/*** APP ***/
import React, {useState} from "react";
import {
    gql,
    useMutation,
} from "@apollo/client";
import "./index.css";


const EDIT_FIRST_PERSON = gql`
  mutation EditFirstPerson($name: String!) {
    editFirstPerson(name: $name) {
      id
      name
    }
  }
`

export function Mutations() {
    const [name, setName] = useState("");
    const [editFirstPerson] = useMutation(EDIT_FIRST_PERSON);

    return (
        <div className="add-person">
            <label>Name</label>
            <input
                type="text"
                value={name}
                onChange={(evt) => setName(evt.target.value)}
            /><button
            onClick={() => {
                editFirstPerson({ variables: { name } });
                setName("");
            }}
        >
            Edit first person
        </button>
        </div>
    );
}
