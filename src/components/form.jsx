import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Form(props) {
  const id = props.match.params.id;
  const history = useHistory();
  const [form, setForm] = useState({});
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (id) {
      axios
        .get("http://localhost:5000/todos/" + id, { signal })
        .then((res) => setForm(res.data))
        .catch((err) => console.log(err));
    }
    return () => {
      abortController.abort();
    };
  }, [id]);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    const url = id
      ? "http://localhost:5000/todos/update/" + id
      : "http://localhost:5000/todos/add";
    axios
      .post(url, data)
      .then((res) => {
        console.log(res);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4 text-sm">
            <input
              name="heading"
              defaultValue={form.heading}
              placeholder="Heading"
              ref={register({ required: true })}
            />
            {errors.heading && (
              <span className="text-xs text-red-500 block">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-6 text-sm">
            <textarea
              name="task"
              defaultValue={form.task}
              placeholder="Task"
              ref={register({ required: true })}
              className="h-32"
            />

            {errors.task && (
              <span className="text-xs text-red-500 block">
                This field is required
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline container"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
