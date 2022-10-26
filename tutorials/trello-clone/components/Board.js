import React from "react";
import List from "./List";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Head from "next/head";
import { useAppContext } from "../lib/appState";
import { buildUpdatedBoardDataModel } from "../pages/Boards/[slug]";
import { createListModel } from "../lib/helpers";

const Board = (props) => {
  let boardId = props.boardId;
  const context = useAppContext();

  /*onDragEnd*/
  async function onDragEnd(result) {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId /*is in same column*/ &&
      destination.index === source.index /*is at same place(index) as before*/
    ) {
      return;
    }

    if (type === "list") {
      const newListOrder = Array.from(
        context.state[boardId]["board-list-order"]
      );
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...context.state,
        [boardId]: {
          ...context.state[boardId],
          "board-list-order": newListOrder,
        },
      };
      context.setState(newState);
      buildUpdatedBoardDataModel(newState[boardId], context);
      return;
    }

    const start =
      context.state[boardId]["board-lists"][
        source.droppableId
      ]; /*Initial column */
    const finish =
      context.state[boardId]["board-lists"][
        destination.droppableId
      ]; /*Final column */

    if (start === finish) {
      // console.log("Same Column");
      const newCardIds = Array.from(start["list-cards-ids"]);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newList = {
        ...start /*Copies all the arguments as initial column*/,
        "list-cards-ids": newCardIds /*Overwrites the taskIds with new values*/,
      };

      const newState = {
        ...context.state,
        [boardId]: {
          ...context.state[boardId],
          "board-lists": {
            ...context.state[boardId]["board-lists"],
            [newList["list-id"]]: newList /*Overwrites column*/,
          },
        },
      };

      buildUpdatedBoardDataModel(newState[boardId], context);
      context.setState(newState);
    }

    // Moving from one list to another list
    else if (start != finish) {
      // console.log("Different Column");
      const startCardIds = Array.from(start["list-cards-ids"]);
      startCardIds.splice(source.index, 1);
      const newStart = {
        ...start,
        "list-cards-ids": startCardIds,
      };
      const finishCardIds = Array.from(finish["list-cards-ids"]);
      finishCardIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        "list-cards-ids": finishCardIds,
      };

      const newState = {
        ...context.state,
        [boardId]: {
          ...context.state[boardId],
          "board-lists": {
            ...context.state[boardId]["board-lists"],
            [newStart["list-id"]]: newStart,
            [newFinish["list-id"]]: newFinish,
          },
        },
      };

      buildUpdatedBoardDataModel(newState[boardId], context);
      context.setState(newState);
    }
  }
  /*onDragEnd*/

  const onPlusList = () => {
    document.getElementById("list-adder-" + boardId).classList.toggle("hidden");
  };

  const onCancelListClick = () => {
    document.getElementById("list-adder-" + boardId).classList.toggle("hidden");

    document.getElementById("list-adder-title-input-" + boardId).value = null;
  };

  async function onAddListClick() {
    let title = document.getElementById(
      "list-adder-title-input-" + boardId
    ).value;
    if (title != "") {
      let currentListCountId = context.state[boardId]["board-list-count-id"];
      let currentListCount = context.state[boardId]["board-list-count"];
      let boardIdNum = context.state[boardId]["board-id"].replace("board-", "");
      let newListId = "list-" + (currentListCountId + 1) + "-b-" + boardIdNum;
      let newList = await createListModel({
        boardId: context.state[boardId]["board-db-id"],
        listId: newListId,
        listTitle: title,
      });

      if (newList.listId) {
        let newState = {
          ...context.state,
          [boardId]: {
            ...context.state[boardId],
            "board-lists": {
              ...context.state[boardId]["board-lists"],
              [newListId]: {
                "list-db-id": newList.id,
                "list-db-entry-id": newList.entryId,
                "list-id": newListId,
                "list-title": title,
                "list-cards-ids": [],
              },
            },
            "board-list-order": [
              ...context.state[boardId]["board-list-order"],
              newListId,
            ],
            "board-list-count-id": currentListCountId + 1,
            "board-list-count": currentListCount + 1,
          },
        };
        context.setState(newState);
        buildUpdatedBoardDataModel(newState[boardId], context);
      } else {
        alert("Failed to create new list");
      }

      onCancelListClick();
    } else {
      alert("Please enter a title for the List");
    }
  }

  return (
    <div className="bg-sky-600 w-full min-h-fit max-h-fit font-sans">
      <Head>
        <title>Trello Board - {context.state[boardId]["board-title"]}</title>
      </Head>

      <div className="flex text-white mt-0 p-4 mb-4 justify-center h-[4vh]">
        <h2>{context.state[boardId]["board-title"]}</h2>
      </div>
      <div className="flex px-4 items-start overflow-x-scroll min-h-[87vh] max-h-[100vh] overflow-y-hidden pb-5">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={boardId} type="list" direction="horizontal">
            {(provided, snapshot) => (
              <div
                className={`flex flex-row`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {context.state[boardId]["board-list-order"].map(
                  (listId, index) => {
                    return (
                      <List
                        key={listId}
                        index={index}
                        boardid={boardId}
                        listid={listId}
                      />
                    );
                  }
                )}
                <div className="rounded bg-gray-300  flex-no-shrink w-64 p-2 mr-3 h-min">
                  <div
                    id={`list-adder-${boardId}`}
                    className="bg-white pb-2 rounded mt-2 max-w-62 border-b border-grey cursor-pointer  transition-colors hover:bg-gray-100 relative hidden"
                  >
                    <form className="mx-2 py-2">
                      <div className="form-group my-1 flex flex-col">
                        <label
                          htmlFor={`list-adder-title-input-${boardId}`}
                          className={` text-gray-400 italic `}
                        >
                          List Title
                        </label>
                        <h5 className="list-title">
                          <textarea
                            id={`list-adder-title-input-${boardId}`}
                            className={`bg-transparent w-full resize-y border rounded border-gray-400 p-1`}
                            rows="1"
                          />
                        </h5>
                      </div>

                      <div className={` flex flex-row mt-3`}>
                        <input
                          type="button"
                          className={`mr-2 bg-sky-600 rounded px-2 py-1 text-white transition-colors hover:bg-sky-700`}
                          value="Add"
                          id={`list-adder-save-button-input-${boardId}`}
                          onClick={onAddListClick}
                        />
                        <input
                          type="button"
                          className={`mr-2 bg-gray-600 rounded px-2 py-1 text-white transition-colors hover:bg-gray-700`}
                          value="Cancel"
                          id={`list-adder-cancel-button-input-${boardId}`}
                          onClick={onCancelListClick}
                        />
                      </div>
                    </form>
                  </div>
                  <div
                    className="flex justify-between py-1 w-full cursor-pointer"
                    onClick={onPlusList}
                  >
                    Add List
                  </div>
                </div>

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
