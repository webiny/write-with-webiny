import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import {
  getBoardByBoardId,
  getBoardDataModelByBoardEntryId,
  getBoardLists,
  getListCards,
  updateBoardDataModel,
} from "../../lib/helpers";
const Board = dynamic(() => import("../../components/Board"), { ssr: false });
import { useAppContext } from "../../lib/appState";

const slug = (props) => {
  const context = useAppContext();
  const router = useRouter();
  const { slug } = router.query;
  const newState = {
    [slug]: props.boardState,
  };
  useEffect(() => {
    context.setState(newState);
  }, []);
  return (
    <>
      <Board
        slug={slug}
        boardId={props.boardState["board-id"]}
        state={newState}
      />
    </>
  );
};

export async function buildUpdatedBoardDataModel(boardState, context) {
  let updatedBoardDataModel = {
    "board-card-count": boardState["board-card-count"],
    "board-card-count-id": boardState["board-card-count-id"],
    "board-list-count": boardState["board-list-count"],
    "board-list-count-id": boardState["board-list-count-id"],
    "board-list-order": boardState["board-list-order"],
    "board-card-order": {},
  };

  Object.keys(boardState["board-lists"]).forEach((listKey) => {
    updatedBoardDataModel["board-card-order"][listKey] =
      boardState["board-lists"][listKey]["list-cards-ids"];
  });
  let update = await updateBoardDataModel({
    dataModelId: boardState["board-data-model-db-id"],
    boardData: JSON.stringify(updatedBoardDataModel),
  });

  context.state[boardState["board-id"]]["board-data-model-db-id"] = update.id;
}

export async function getServerSideProps(context) {
  let boardState = {
    "board-db-id": null,
    "board-id": null,
    "board-title": null,
    "board-cards": {},
    "board-lists": {},
    "board-list-order": [],
    "board-card-count-id": null,
    "board-card-count": null,
    "board-list-count-id": null,
    "board-list-count": null,
  };

  const slug = context.params.slug;
  let board = await getBoardByBoardId(slug);
  boardState = {
    ...boardState,
    "board-db-id": board.id,
    "board-id": board.boardId,
    "board-title": board.boardTitle,
  };

  let bdm = await getBoardDataModelByBoardEntryId(board.entryId);
  const boardDataModel = JSON.parse(bdm.boardData);

  boardState = {
    ...boardState,
    "board-data-model-db-id": bdm.id,
    "board-list-order": boardDataModel["board-list-order"],
    "board-card-count-id": boardDataModel["board-card-count-id"],
    "board-card-count": boardDataModel["board-card-count"],
    "board-list-count-id": boardDataModel["board-list-count-id"],
    "board-list-count": boardDataModel["board-list-count"],
  };

  const boardLists = await getBoardLists(board.entryId);
  Object.keys(boardLists).forEach((key, index) => {
    boardState = {
      ...boardState,
      "board-lists": {
        ...boardState["board-lists"],
        [boardLists[key]["listId"]]: {
          "list-db-id": boardLists[key]["id"],
          "list-db-entry-id": boardLists[key]["entryId"],
          "list-id": boardLists[key]["listId"],
          "list-title": boardLists[key]["listTitle"],
          "list-cards-ids": boardDataModel["board-card-order"][
            boardLists[key]["listId"]
          ]
            ? boardDataModel["board-card-order"][boardLists[key]["listId"]]
            : [],
        },
      },
    };
  });

  for (const list of boardState["board-list-order"]) {
    const listCards = await getListCards(
      boardState["board-lists"][list]["list-db-entry-id"]
    );
    Object.keys(listCards).forEach((key, index) => {
      boardState = {
        ...boardState,
        "board-cards": {
          ...boardState["board-cards"],
          [listCards[key]["cardId"]]: {
            "card-db-id": listCards[key]["id"],
            "card-db-entry-id": listCards[key]["entryId"],
            "card-id": listCards[key]["cardId"],
            "card-title": listCards[key]["cardTitle"],
            "card-description": listCards[key]["cardDescription"],
            "card-cover-image": listCards[key]["cardImage"],
          },
        },
      };
    });
  }

  return {
    props: {
      boardState: boardState,
    },
  };
}

export default slug;
