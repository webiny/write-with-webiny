import React from "react";
import Card from "./Card";
import { useAppContext } from "../lib/appState";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import {
  createCardModel,
  createImageFile,
  deleteListModel,
  getPreSignedPostImageData,
  uploadToS3Bucket,
  updateListModel,
} from "../lib/helpers";
import { buildUpdatedBoardDataModel } from "../pages/Boards/[slug]";

const List = (props) => {
  const context = useAppContext();

  let newImage = null;

  const [listTitle, setListTitle] = useState(
    context.state[props.boardid]["board-lists"][props.listid]["list-title"]
  );

  const onImageChangeHandler = (event) => {
    newImage = event.target.files[0];
  };

  const onListMenuClick = () => {
    document
      .getElementById("list-menu-" + props.listid)
      .classList.toggle("hidden");
  };

  const onCancelClick = () => {
    document
      .getElementById(`card-adder-` + props.listid)
      .classList.toggle("hidden");

    document.getElementById("card-adder-image-input-" + props.listid).value =
      null;
    document.getElementById("card-adder-title-input-" + props.listid).value =
      null;
    document.getElementById(
      "card-adder-description-input-" + props.listid
    ).value = null;
  };

  const onAddCardClick = () => {
    var cardAdder = document.getElementById("card-adder-" + props.listid);
    cardAdder.classList.toggle("hidden");
    var topPos = cardAdder.offsetTop;

    document.getElementById("cardsHolder-" + props.listid).scrollTop = topPos;
  };

  const onTitleChange = (event) => {
    setListTitle(event.target.value);
  };

  const onTitleFocusOut = async () => {
    let updatedList = await updateListModel({
      id: context.state[props.boardid]["board-lists"][props.listid][
        "list-db-id"
      ],
      title: listTitle,
    });
    const newTitleState = {
      ...context.state,
      [props.boardid]: {
        ...context.state[props.boardid],
        "board-lists": {
          ...context.state[props.boardid]["board-lists"],
          [props.listid]: {
            ...context.state[props.boardid]["board-lists"][props.listid],
            "list-db-id": updatedList.id,
            "list-title": listTitle,
          },
        },
      },
    };
    context.setState(newTitleState);
  };

  async function onAddCardButtonClick() {
    let image = newImage;
    let title = document.getElementById(
      "card-adder-title-input-" + props.listid
    ).value;
    let description = document.getElementById(
      "card-adder-description-input-" + props.listid
    ).value;
    let imgSrc = "";

    console.log("image", image);

    if (title) {
      if (image) {
        let preSignedPostPayloadData = await getPreSignedPostImageData(image);
        console.log("preSignedPostPayloadData", preSignedPostPayloadData);
        console.log(
          "preSignedPostPayloadData.data",
          preSignedPostPayloadData.data
        );

        let uploadToS3BucketData = await uploadToS3Bucket(
          preSignedPostPayloadData.data,
          image
        );
        console.log("uploadToS3BucketData", uploadToS3BucketData);

        let createFileData = await createImageFile(
          preSignedPostPayloadData.file
        );
        console.log("createFileData", createFileData);
        imgSrc = createFileData.src;
      }
      let currentCardCountId =
        context.state[props.boardid]["board-card-count-id"];
      let currentCardCount = context.state[props.boardid]["board-card-count"];
      let boardIdNum = context.state[props.boardid]["board-id"].replace(
        "board-",
        ""
      );
      let newCardId = "card-" + (currentCardCountId + 1) + "-b-" + boardIdNum;
      let addCard = await createCardModel({
        listId:
          context.state[props.boardid]["board-lists"][props.listid][
            "list-db-id"
          ],
        cardId: newCardId,
        cardTitle: title,
        cardDescription: description,
        cardImage: imgSrc,
      });
      if (addCard.id) {
        const newState = {
          ...context.state,
          [props.boardid]: {
            ...context.state[props.boardid],
            "board-cards": {
              ...context.state[props.boardid]["board-cards"],
              [newCardId]: {
                "card-db-id": addCard.id,
                "card-db-entry-id": addCard.entryId,
                "card-id": newCardId,
                "card-title": title,
                "card-description": description,
                "card-cover-image": imgSrc,
              },
            },
            "board-lists": {
              ...context.state[props.boardid]["board-lists"],
              [props.listid]: {
                ...context.state[props.boardid]["board-lists"][props.listid],
                "list-cards-ids": [
                  ...context.state[props.boardid]["board-lists"][props.listid][
                    "list-cards-ids"
                  ],
                  newCardId,
                ],
              },
            },
            "board-card-count-id": currentCardCountId + 1,
            "board-card-count": currentCardCount + 1,
          },
        };
        context.setState(newState);
        onCancelClick();
        buildUpdatedBoardDataModel(newState[props.boardid], context);
      } else {
        onCancelClick();
        alert("Failed to Add Card");
      }
    } else {
      alert("Please enter a title for the Card");
    }
  }

  async function onDeleteList() {
    let listCards =
      context.state[props.boardid]["board-lists"][props.listid][
        "list-cards-ids"
      ];
    if (listCards.length === 0) {
      let deleteList = await deleteListModel(
        context.state[props.boardid]["board-lists"][props.listid]["list-db-id"]
      );
      if (deleteList) {
        const newState = { ...context.state };

        let listIndex = newState[props.boardid]["board-list-order"].indexOf(
          props.listid
        );

        newState[props.boardid]["board-list-order"].splice(listIndex, 1);
        delete newState[props.boardid]["board-lists"][props.listid];
        newState[props.boardid]["board-list-count"]--;

        buildUpdatedBoardDataModel(newState[props.boardid], context);
        context.setState(newState);
      }
    } else {
      onListMenuClick();
      alert("Cannot delete a non-empty list.");
    }
  }

  return (
    <Draggable
      key={props.listid}
      draggableId={`${props.listid}`}
      index={props["index"]}
    >
      {(provided) => (
        <div
          className={`rounded bg-gray-300 flex-no-shrink w-64 p-2 mr-3 h-min`}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <style jsx>
            {`
              /* width */
              .listbody::-webkit-scrollbar {
                width: 5px;
              }

              /* Track */
              .listbody::-webkit-scrollbar-track {
                background: #f1f1f16b;
                opacity: 0.5;
                border-radius: 10px;
              }

              /* Handle */
              .listbody::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 10px;
              }

              /* Handle on hover */
              .listbody::-webkit-scrollbar-thumb:hover {
                background: #555;
              }
            `}
          </style>
          <div
            className="relative flex justify-between py-2 w-full"
            {...provided.dragHandleProps}
          >
            <h3 className={`text-sm font-bold`}>
              <textarea
                className={`p-[2px] bg-transparent resize-none w-48 focus:bg-white  listTitleTextArea listTitleTextAreaDisabled`}
                value={listTitle}
                onChange={onTitleChange}
                onBlur={onTitleFocusOut}
                rows="1"
              />
            </h3>
            <div className="absolute right-0 z-10">
              <div
                onClick={onListMenuClick}
                className=" absolute top-0 right-0 cursor-pointer rounded transition-colors hover:bg-gray-400 p-[2px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </div>

              <div
                id={`list-menu-${props.listid}`}
                className="relative top-7 rounded bg-white border-[1px] border-gray-400 w-40 px-2 py-1 cursor-pointer transition-colors hover:bg-red-700 hover:text-white hidden"
                onClick={onDeleteList}
              >
                <ul>
                  <li>Delete List</li>
                </ul>
              </div>
            </div>
          </div>
          <div
            id={`cardsHolder-${props.listid}`}
            className={`text-sm mt-2 overflow-x-hidden max-h-[70vh]  listbody`}
          >
            <Droppable droppableId={props.listid} type="card">
              {(provided) => (
                <div
                  className="min-h-[5px] "
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {context.state[props.boardid]["board-lists"][props.listid][
                    "list-cards-ids"
                  ].map((cardid, index) => {
                    return (
                      <Card
                        key={cardid}
                        index={index}
                        cardid={cardid}
                        listid={props.listid}
                        boardid={props.boardid}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div
              id={`card-adder-${props.listid}`}
              className="bg-white pb-2 rounded mt-2 max-w-62 border-b border-grey cursor-pointer hidden transition-colors hover:bg-gray-100 relative"
            >
              <form className="mx-2 py-2">
                <div className={`form-group my-1`}>
                  <label
                    htmlFor={`card-adder-image-input-${props.listid}`}
                    className={` text-gray-400 italic`}
                  >
                    Cover Image
                  </label>
                  <input
                    id={`card-adder-image-input-${props.listid}`}
                    type="file"
                    accept="image/*"
                    className={`max-w-full`}
                    onChange={onImageChangeHandler}
                  />
                </div>

                <div className="form-group my-1 flex flex-col">
                  <label
                    htmlFor={`card-adder-title-input-${props.listid}`}
                    className={` text-gray-400 italic `}
                  >
                    Title
                  </label>
                  <h5 className="card-title font-bold">
                    <textarea
                      id={`card-adder-title-input-${props.listid}`}
                      className={`bg-transparent w-full resize-y border rounded border-gray-400 p-1`}
                      rows="1"
                    />
                  </h5>
                </div>

                <div className="form-group  my-1 flex flex-col">
                  <label
                    htmlFor={`card-adder-description-input-${props.listid}`}
                    className={` text-gray-400 italic`}
                  >
                    Description
                  </label>
                  <textarea
                    id={`card-adder-description-input-${props.listid}`}
                    className={`bg-transparent w-full resize-y border rounded border-gray-400 p-1`}
                    rows="2"
                  />
                </div>
                <div className={` flex flex-row mt-3`}>
                  <input
                    type="button"
                    className={`mr-2 bg-sky-600 rounded px-2 py-1 text-white transition-colors hover:bg-sky-700`}
                    onClick={onAddCardButtonClick}
                    value="Add"
                    id={`card-adder-save-button-input-${props.list}`}
                  />
                  <input
                    type="button"
                    className={`mr-2 bg-gray-600 rounded px-2 py-1 text-white transition-colors hover:bg-gray-700`}
                    onClick={onCancelClick}
                    value="Cancel"
                    id={`card-adder-cancel-button-input-${props.listid}`}
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="w-full cursor-pointer" onClick={onAddCardClick}>
            <p className="mt-3 text-gray-500">Add a card...</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default List;
