import React from "react";
import { useAppContext } from "../lib/appState";
import { useState } from "react";
import Image from "next/image";
import { Draggable } from "react-beautiful-dnd";

import { updateCardModel, deleteCardModel } from "../lib/helpers";
import { buildUpdatedBoardDataModel } from "../pages/Boards/[slug]";

const Card = (props) => {
  const context = useAppContext();

  const [isCardEditing, setCardEditing] = useState({
    [props.cardid]: {
      state: false,
    },
  });

  const [values, setValues] = useState({
    title:
      context.state[props.boardid]["board-cards"][props.cardid]["card-title"],
    description:
      context.state[props.boardid]["board-cards"][props.cardid][
        "card-description"
      ],
    image:
      context.state[props.boardid]["board-cards"][props.cardid][
        "card-cover-image"
      ],
  });

  const cardImage = () => {
    if (
      isCardEditing &&
      context.state[props.boardid]["board-cards"][props.cardid][
        "card-cover-image"
      ] &&
      context.state[props.boardid]["board-cards"][props.cardid][
        "card-cover-image"
      ] != ""
    ) {
      return (
        <Image
          src={values.image}
          className="w-full  rounded-t"
          alt="..."
          width="1920"
          height="1080"
        />
      );
    } else {
      return;
    }
  };

  const onEditButtonClick = () => {
    const newState = (isCardEditing = {
      ...isCardEditing,
      [props.cardid]: {
        state: true,
      },
    });
    setCardEditing(newState);
    enableEditingValues();
  };

  const onCancelEdit = () => {
    let oldTitle =
      context.state[props.boardid]["board-cards"][props.cardid]["card-title"];
    let oldDescription =
      context.state[props.boardid]["board-cards"][props.cardid][
        "card-description"
      ];
    let oldImage =
      context.state[props.boardid]["board-cards"][props.cardid][
        "card-cover-image"
      ];

    const newValuesState = {
      title: oldTitle,
      description: oldDescription,
      image: oldImage,
    };
    setValues(newValuesState);

    const newCardEditingState = (isCardEditing = {
      ...isCardEditing,
      [props.cardid]: {
        state: false,
      },
    });
    setCardEditing(newCardEditingState);
    disableEditingValues();
  };

  const enableEditingValues = () => {
    let titleArea = document.getElementById(
      "card-editor-title-input-" + props.cardid
    );
    let descriptionArea = document.getElementById(
      "card-editor-description-input-" + props.cardid
    );
    titleArea.removeAttribute("disabled");
    descriptionArea.removeAttribute("disabled");
  };

  const disableEditingValues = () => {
    let titleArea = document.getElementById(
      "card-editor-title-input-" + props.cardid
    );
    let descriptionArea = document.getElementById(
      "card-editor-description-input-" + props.cardid
    );
    titleArea.setAttribute("disabled", "");
    descriptionArea.setAttribute("disabled", "");
  };

  const onTitleChange = (event) => {
    const newTitleState = {
      ...values,
      title: event.target.value,
    };
    setValues(newTitleState);
  };

  const onDescriptionChange = (event) => {
    const newDescriptionState = {
      ...values,
      description: event.target.value,
    };

    setValues(newDescriptionState);
  };

  const onSaveEdit = async () => {
    let updatedCard = updateCardModel({
      id: context.state[props.boardid]["board-cards"][props.cardid][
        "card-db-id"
      ],
      title: values.title,
      description: values.description,
    });
    const newState = {
      ...context.state,
      [props.boardid]: {
        ...context.state[props.boardid],
        "board-cards": {
          ...context.state[props.boardid]["board-cards"],
          [props.cardid]: {
            ...context.state[props.boardid]["board-cards"][props.cardid],
            "card-db-id": updatedCard.id,
            "card-title": values.title,
            "card-description": values.description,
          },
        },
      },
    };
    context.setState(newState);

    const newCardEditingState = (isCardEditing = {
      ...isCardEditing,
      [props.cardid]: {
        state: false,
      },
    });
    setCardEditing(newCardEditingState);
    disableEditingValues();
  };

  async function onDelete() {
    let deleteCard = await deleteCardModel(
      context.state[props.boardid]["board-cards"][props.cardid]["card-db-id"]
    );
    if (deleteCard) {
      const newState = { ...context.state };
      let index = newState[props.boardid]["board-lists"][props.listid][
        "list-cards-ids"
      ].indexOf(props.cardid);
      newState[props.boardid]["board-lists"][props.listid][
        "list-cards-ids"
      ].splice(index, 1);
      delete newState[props.boardid]["board-cards"][props.cardid];
      newState[props.boardid]["board-card-count"]--;
      context.setState(newState);
      buildUpdatedBoardDataModel(newState[props.boardid], context);
    }
  }

  return (
    <Draggable
      key={context.state[props.boardid]["board-cards"][props.cardid]["card-id"]}
      draggableId={`${
        context.state[props.boardid]["board-cards"][props.cardid]["card-id"]
      }`}
      index={props["index"]}
    >
      {(provided, snapshot) => (
        <div
          className="bg-white pb-2 rounded mt-2 border-b border-grey cursor-pointer transition-colors hover:bg-gray-100 relative"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={`w-full rounded`}>{cardImage()}</div>
          <div
            className={`absolute right-2 top-2 border-2 border-white rounded bg-white transition-colors hover:bg-gray-300 hover:border-gray-200 cursor-pointer ${
              isCardEditing[props.cardid]["state"] ? `hidden` : `visible`
            }`}
            onClick={onEditButtonClick}
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
              <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
              <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
            </svg>
          </div>
          <form className="mx-2 py-2">
            <div className="form-group my-1 flex flex-col">
              <label
                htmlFor={`card-editor-title-input-${props.cardid}`}
                className={` text-gray-400 italic ${
                  isCardEditing[props.cardid]["state"]
                    ? `visible`
                    : `hidden h-0`
                }`}
              >
                Title
              </label>
              <h5 className="card-title font-bold">
                <textarea
                  id={`card-editor-title-input-${props.cardid}`}
                  className={`bg-transparent w-full ${
                    isCardEditing[props.cardid]["state"]
                      ? `resize-y border rounded border-gray-400 p-1`
                      : `resize-none`
                  }`}
                  value={values.title}
                  rows="1"
                  onChange={onTitleChange}
                  disabled
                />
              </h5>
            </div>

            <div className="form-group  my-1 flex flex-col">
              <label
                htmlFor={`card-editor-description-input-${props.cardid}`}
                className={` text-gray-400 italic ${
                  isCardEditing[props.cardid]["state"] ? `visible` : `hidden`
                }`}
              >
                Description
              </label>
              <textarea
                id={`card-editor-description-input-${props.cardid}`}
                className={`bg-transparent w-full ${
                  isCardEditing[props.cardid]["state"]
                    ? `resize-y border rounded border-gray-400 p-1`
                    : `resize-none`
                }`}
                value={values.description}
                rows="2"
                onChange={onDescriptionChange}
                disabled
              />
            </div>
            <div
              className={` flex flex-row mt-3 ${
                isCardEditing[props.cardid]["state"] ? `visible` : `hidden`
              }`}
            >
              <input
                type="button"
                data-listid={props.listid}
                className={`mr-2 bg-sky-600 rounded px-2 py-1 text-white transition-colors hover:bg-sky-700`}
                onClick={onSaveEdit}
                value="Save"
                id={`card-editor-save-button-input-${props.cardid}`}
              />
              <input
                type="button"
                data-list={props.listid}
                className={`mr-2 bg-gray-600 rounded px-2 py-1 text-white transition-colors hover:bg-gray-700`}
                onClick={onCancelEdit}
                value="Cancel"
                id={`card-editor-cancel-button-input-${props.cardid}`}
              />

              <input
                type="button"
                data-list={props.listid}
                className={`mr-2 bg-red-600 rounded px-2 py-1 text-white transition-colors hover:bg-red-700`}
                onClick={onDelete}
                value="Delete"
                id={`card-editor-cancel-button-input-${props.cardid}`}
              />
            </div>
          </form>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
