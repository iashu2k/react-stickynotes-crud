import React, { useState, useEffect } from "react";
import Note from "./note";
import axios from "axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    axios
      .get("http://localhost:5000/todos/", { signal })
      .then((res) => setNotes(res.data))
      .catch((err) => console.log(err));

    return function cleanup() {
      abortController.abort();
    };
  }, []);
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
