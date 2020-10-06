import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function Form(props) {
  const id = props.match.params.id;
  const history = useHistory();
  const [form, setForm] = useState({});
  const { getAccessTokenSilently } = useAuth0();
  const [existsHeading, setExist] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const secureApiCall = async () => {
      try {
        const token = await getAccessTokenSilently();

        if (id) {
          axios
            .get("http://localhost:5000/todos/" + id, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              signal,
            })
            .then((res) => setForm(res.data))
            .catch((err) => console.log(err));
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    secureApiCall();

    return () => {
      abortController.abort();
    };
  }, [id, getAccessTokenSilently]);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    const url = id
      ? "http://localhost:5000/todos/update/" + id
      : "http://localhost:5000/todos/add";
    const token = await getAccessTokenSilently();
    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        history.push("/notes");
      })
      .catch((err) => {
        console.log(err.message);
        setExist(true);
      });
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
            {existsHeading && (
              <span className="text-xs text-red-500 block">
                Task heading already exists
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
