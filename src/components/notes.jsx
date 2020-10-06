import React, { useState, useEffect } from "react";
import Note from "./note";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [empty, setEmpty] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const secureApiCall = async () => {
      try {
        const token = await getAccessTokenSilently();

        axios
          .get("http://localhost:5000/todos/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal,
          })
          .then((res) => {
            setNotes(res.data);
            if(res.data.length === 0){
              setEmpty(true);
            }
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error.message);
      }
    };

    secureApiCall();

    return function cleanup() {
      abortController.abort();
    };
  }, [getAccessTokenSilently]);

  if (empty) {
    return <div className="flex justify-center text-xl text-gray-800">Click on the + to add notes</div>;
  }

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {notes.map((x) => (
          <Note key={x._id} data={x} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
