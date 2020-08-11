import React from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

const Note = ({ data }) => {
  const [showModal, setShowModal] = React.useState(false);
  const history = useHistory();
  const handleDelete = (id) => {
    Axios.delete("http://localhost:5000/todos/" + id)
      .then((res) => {
        console.log(res);
        history.push("/add");
        history.replace("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg text-justify p-4">
        <h1 className="font-semibold text-sm text-center">{data.heading}</h1>

        <div>
          <p className="font-light text-xs mt-2">{data.task}</p>
          <div className="w-full border-t-2 my-1 border-gray-400" />
        </div>

        <div className="text-right text-gray-600 flex flex-row-reverse mt-auto">
          <div
            className="mx-1 cursor-pointer hover:text-gray-400"
            onClick={() => setShowModal(true)}
          >
            <FaTrash />
          </div>
          <Link to={"./update/" + data._id}>
            <FaPencilAlt className="mx-1 cursor-pointer hover:text-gray-400" />
          </Link>
        </div>
      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-xl font-semibold">Are you sure ?</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => {
                      handleDelete(data._id);
                    }}
                  >
                    Okay
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Note;
