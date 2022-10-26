import React from "react";
import BoardFile from "../components/BoardFile";
import {
  createBoardModel,
  createBoardDataModel,
  getBoards,
  updateBoardModel,
} from "../lib/helpers";
import { useState } from "react";

const Boards = (props) => {
  const [boardListState, setBoardListState] = useState(props.boards);
  const onAddBoardClick = () => {
    document.getElementById("board-adder").classList.toggle("hidden");
  };

  const onCancelButtonClick = () => {
    document.getElementById("board-title-value").value = null;
    onAddBoardClick();
  };

  async function onAddButtonClick() {
    let boardTitle = document.getElementById("board-title-value").value;
    let boardIdNum = Math.trunc(
      Math.floor(Math.random() * 10000000) + Date.now()
    );

    if (boardTitle.length === 0) {
      alert("Please enter a title for the board.");
      return;
    }

    let createBoard = await createBoardModel({
      boardId: "board-" + boardIdNum,
      boardTitle: boardTitle,
    });

    const boardDataModel = {
      "board-list-order": [],
      "board-card-order": {},
      "board-card-count-id": 0,
      "board-card-count": 0,
      "board-list-count-id": 0,
      "board-list-count": 0,
    };

    let createBoardData = await createBoardDataModel({
      dataModelId: "bdm-" + boardIdNum,
      boardId: createBoard.id,
      boardData: JSON.stringify(boardDataModel),
    });

    const newBoardList = [createBoard, ...boardListState];
    setBoardListState(newBoardList);

    onCancelButtonClick();
  }

  return (
    <>
      <div className=" h-93vh flex flex-row flex-wrap p-5">
        {/* Start: Add new board button */}
        <div className="relative mr-5 mt-5">
          <div
            className="flex flex-col items-center justify-center rounded w-44 h-32 px-6 bg-gray-200 cursor-pointer text-gray-600 font-bold hover:bg-gray-300 transition-colors"
            onClick={onAddBoardClick}
          >
            <p>+</p>
            <p>Add</p>
            <p> Board</p>
          </div>

          <div
            id="board-adder"
            className="hidden bg-white top-0 -right-64 absolute w-64 h-max z-10 p-4  border-2 rounded shadow-md"
          >
            <form>
              <div className=" w-full ">
                <label className="  italic ">Board's Title</label>
                <input
                  id="board-title-value"
                  type="textarea"
                  className="rounded w-full border-[1px] p-1 mt-2"
                />
              </div>
              <div className="mt-2">
                <input
                  type="button"
                  className={`mr-2 bg-sky-600 rounded px-2 py-1 text-white hover:bg-sky-700 transition-colors`}
                  value="Add"
                  onClick={onAddButtonClick}
                />
                <input
                  type="button"
                  className={`mr-2 bg-gray-600 rounded px-2 py-1 text-white hover:bg-gray-700 transition-colors`}
                  value="Cancel"
                  onClick={onCancelButtonClick}
                />
              </div>
            </form>
          </div>
        </div>
        {/* End: Add new board button */}
        {/* Start: Display the list of boards in tiles format */}
        {boardListState.map((board, index) => {
          return (
            <BoardFile
              index={index}
              key={board.boardId}
              board={board}
              boardListState={boardListState}
              setBoardListState={setBoardListState}
            />
          );
        })}
        {/* End: Display the list of boards in tiles format */}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      boards: await getBoards(),
    },
  };
}

export default Boards;
