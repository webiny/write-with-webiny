import React from "react";
import Link from "next/link";
import {
  deleteBoardDataModel,
  deleteBoardModel,
  getBoardDataModelByBoardEntryId,
  getBoardLists,
  updateBoardModel,
} from "../lib/helpers";

const BoardFile = (props) => {
  const boardId = props.board.boardId;

  const onBoardMenuClick = (event) => {
    event.preventDefault();
    let targetBoardId = props.board.boardId;
    document
      .getElementById("board-menu-" + targetBoardId)
      .classList.toggle("hidden");
  };

  const onRenameBoardClick = (event) => {
    event.preventDefault();
    let targetBoardId = props.board.boardId;
    document
      .getElementById("board-editor-" + targetBoardId)
      .classList.toggle("hidden");

    document
      .getElementById("board-menu-" + targetBoardId)
      .classList.toggle("hidden");
  };

  async function onDeleteBoardClick(event) {
    event.preventDefault();
    let targetBoardId = props.board.boardId;
    let newBoardList = [...props.boardListState];
    let boardLists = await getBoardLists(props.board.entryId);
    if (boardLists.length === 0) {
      let boardDataModel = await getBoardDataModelByBoardEntryId(
        props.board.entryId
      );
      let deleteBoard = await deleteBoardModel(props.board.id);
      let deleteBoardData = await deleteBoardDataModel(boardDataModel.id);
      if (deleteBoard && deleteBoardData) {
        newBoardList.splice(props.index, 1);
        props.setBoardListState(newBoardList);
        document
          .getElementById("board-menu-" + targetBoardId)
          .classList.toggle("hidden");
      } else {
        document
          .getElementById("board-menu-" + targetBoardId)
          .classList.toggle("hidden");
        alert("Unable to delete the selected board");
      }
    } else {
      document
        .getElementById("board-menu-" + targetBoardId)
        .classList.toggle("hidden");
      alert("Cannot delete a non-empty board.");
    }
  }

  async function onSaveRenameButtonClick(event) {
    event.preventDefault();
    let targetBoardId = props.board.boardId;
    let newBoardsList = [...props.boardListState];
    let newBoardTitle = document.getElementById(
      "board-rename-input-" + targetBoardId
    ).value;
    let renamedBoard = await updateBoardModel({
      id: props.board.id,
      title: newBoardTitle,
    });
    newBoardsList.splice(props.index, 1, renamedBoard);
    props.setBoardListState(newBoardsList);

    document
      .getElementById("board-editor-" + targetBoardId)
      .classList.toggle("hidden");
  }

  const onCancelRenameButtonClick = (event) => {
    let targetBoardId = props.board.boardId;
    document
      .getElementById("board-editor-" + targetBoardId)
      .classList.toggle("hidden");
  };

  return (
    <div className="flex flex-row relative mr-5 mt-5">
      <Link
        href={{
          pathname: "/boards/" + boardId,
        }}
      >
        <div className="w-44 h-32 border-2 rounded flex items-center justify-center cursor-pointer border-gray-500 hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-colors relative">
          <div className="absolute right-0 top-0 z-9">
            <div className=" absolute top-0 right-0 cursor-pointer rounded transition-colors hover:bg-white p-[2px]">
              <svg
                onClick={onBoardMenuClick}
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
              id={`board-menu-${boardId}`}
              className="relative top-7 right-1 rounded bg-white border-[1px] border-gray-400 w-40  cursor-pointer transition-colors  hidden"
              // onClick={onDeleteList}
            >
              <ul className="text-black transition-colors">
                <li
                  className="hover:bg-gray-500 hover:text-white  transition-colors rounded px-1 py-1"
                  onClick={onRenameBoardClick}
                >
                  Rename Board
                </li>
                <li
                  className="hover:bg-red-700 hover:text-white transition-colors rounded px-1 py-1"
                  onClick={onDeleteBoardClick}
                >
                  Delete Board
                </li>
              </ul>
            </div>
          </div>
          <div>
            <p className="font-bold">{props.board.boardTitle}</p>
          </div>
        </div>
      </Link>
      <div
        id={`board-editor-${boardId}`}
        className="z-20 hidden absolute -right-64 bg-white w-64 h-max p-4  border-2 rounded shadow-md"
      >
        <form className="flex flex-col">
          <div className="flex flex-col mb-2">
            <label className="italic">Board's Title</label>
            <input
              id={`board-rename-input-${boardId}`}
              type="textarea"
              className="rounded w-full border-[1px] p-1 mt-2"
            />
          </div>
          <div className="flex flex-row ">
            <input
              type="button"
              value="Save"
              className={`mr-2 bg-sky-600 rounded px-2 py-1 text-white hover:bg-sky-700 transition-colors`}
              onClick={onSaveRenameButtonClick}
            />
            <input
              type="button"
              value="Cancel"
              className={`mr-2 bg-gray-600 rounded px-2 py-1 text-white hover:bg-gray-700 transition-colors`}
              onClick={onCancelRenameButtonClick}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardFile;
