import { React, useState } from "react";
// import for the apollo dependency
import { useQuery, gql, useMutation } from "@apollo/client";

const Form = () => {
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");
  const id = "";

  const GET_ID = gql`
    query {
      formBuilder {
        listForms {
          data {
            id
            formId
            name
          }
        }
      }
    }
  `;

  // const { error, data } = useQuery(GET_ID);
  // console.log(useQuery(GET_ID));
  // console.log(data);
  const SEND_FORM = gql`
    mutation CreateFormSubmission($revision: ID!, $data: JSON!) {
      formBuilder {
        createFormSubmission(revision: $revision, data: $data) {
          data {
            id
            data
          }
        }
      }
    }
  `;
  const [sendform] = useMutation(SEND_FORM);
  return (
    <div
      className=" flex w-full justify-center items-center h-screen "
      id="contact"
    >
      <div className=" w-4/5 flex flex-col justify-center  ">
        <div className=" mb-20 ">
          <h1 className=" font-semibold mb-6 text-[50px] ">
            Interested in getting your business our there?
          </h1>
          <p>Send us a message</p>
        </div>
        <div className=" flex flex-col gap-8  text-white ">
          <input
            className=" bg-slate-900 py-4 w-3/4 px-3 rounded-md  "
            placeholder="Your Email"
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <textarea
            className=" bg-slate-900 py-4 w-3/4 px-3 rounded-md  "
            rows={12}
            cols={12}
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className=" bg-slate-900 py-4 w-[270px] px-3 rounded-md  "
            onClick={() => {
              sendform({
                variables: {
                  revision: id,
                  data: { email: mail, message: message },
                },
              });
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
