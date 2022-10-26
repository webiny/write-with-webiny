async function fetchAPI(query, { variables } = {}, read) {
  const url = read
    ? process.env.NEXT_PUBLIC_WEBINY_API_READ_URL
    : process.env.NEXT_PUBLIC_WEBINY_API_MANAGE_URL;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_WEBINY_API_SECRET}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error("Failed to fetch API", json.errors);
  }
  return json.data;
}

async function fetchMainAPI(query, { variables } = {}) {
  const url = process.env.NEXT_PUBLIC_WEBINY_API_MAIN_URL;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_WEBINY_API_SECRET}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error("Failed to fetch API", json.errors);
  }
  return json.data;
}

export async function getBoards() {
  const boards = await fetchAPI(
    `query GetBoards {
      listBoardModels{
        data{
          id,
          boardId,
          boardTitle,
          entryId
        }
      }
    }`,
    {},
    true
  );
  return boards.listBoardModels.data;
}

export async function getBoardByBoardId(boardId) {
  const boardDetails = await fetchAPI(
    `query getBoardByBoardId($boardId:String!){
      getBoardModel(where:{boardId:$boardId}){
        data{
          id,
          entryId,
          boardId,
          boardTitle
        }
      }
    }`,
    {
      variables: {
        boardId: boardId,
      },
    },
    true
  );
  return boardDetails.getBoardModel.data;
}

export async function createBoardModel(params) {
  const board = await fetchAPI(
    `mutation createBoardModel($boardId:String!,$boardTitle:String!){
      createBoardModel(data:{boardId:$boardId,boardTitle:$boardTitle}){
        data{
          id,
        }
      }
    }`,
    {
      variables: {
        boardId: params.boardId,
        boardTitle: params.boardTitle,
      },
    },
    false
  );
  const boardData = await publishBoardModel(board.createBoardModel.data.id);
  return boardData;
}

export async function publishBoardModel(id) {
  const board = await fetchAPI(
    `mutation publishBoardModel($id:ID!){
      publishBoardModel(revision:$id){
        data{
          id,
          boardId,
          boardTitle
        }
      }
    }`,
    {
      variables: {
        id: id,
      },
    },
    false
  );
  return board.publishBoardModel.data;
}

export async function updateBoardModel(params) {
  const board = await fetchAPI(
    `mutation updateBoardModel($id:ID!,$title:String!){
      createBoardModelFrom(revision:$id,data:{boardTitle:$title}){
        data{
          id,
        }
      }
    }`,
    {
      variables: {
        id: params.id,
        title: params.title,
      },
    },
    false
  );
  const newBoard = publishBoardModel(board.createBoardModelFrom.data.id);
  deleteBoardModel(params.id);
  return newBoard;
}

export async function deleteBoardModel(id) {
  const board = await fetchAPI(
    `mutation deleteBoardModel($id:ID!){
      deleteBoardModel(revision:$id){
        data
      }
    }`,
    {
      variables: {
        id: id,
      },
    },
    false
  );
  return board.deleteBoardModel.data;
}

export async function createBoardDataModel(params) {
  const boardDataModel = await fetchAPI(
    `mutation createBoardDataModel($dataModelId:String!,$boardId:ID!, $boardData:String!){
      createBoardDataModel(data:{boardDataId:$dataModelId,boardData:$boardData,dataBoard:{modelId:"boardModel",id:$boardId}}){
        data{
          id,
          boardDataId,
          dataBoard{
            id,
          }
        }
      }
    }`,
    {
      variables: {
        dataModelId: params.dataModelId,
        boardId: params.boardId,
        boardData: params.boardData,
      },
    },
    false
  );
  const modelData = await publishBoardDataModel(
    boardDataModel.createBoardDataModel.data.id
  );
  return modelData;
}

export async function getBoardDataModelByBoardEntryId(boardEntryId) {
  const boardDetails = await fetchAPI(
    `query getBoardDataModelByBoardEntryId($entryId:String!){
      listBoardDataModels(where:{dataBoard:{entryId:$entryId}}){
        data{
          id,
          entryId,
          boardDataId,
          boardData
        }
      }
    }`,
    {
      variables: {
        entryId: boardEntryId,
      },
    },
    true
  );
  return boardDetails.listBoardDataModels.data[0];
}

export async function publishBoardDataModel(id) {
  const dataModel = await fetchAPI(
    `mutation publishBoardDataModel($id:ID!){
      publishBoardDataModel(revision:$id){
        data{
          id,
          boardDataId,
          boardData,
        }
      }
    }`,
    {
      variables: {
        id: id,
      },
    },
    false
  );
  return dataModel.publishBoardDataModel.data;
}

export async function updateBoardDataModel(params) {
  const boardDataModel = await fetchAPI(
    `mutation updateCreateBoardDataModel($dataModelId:ID!,$boardData:String!){
      createBoardDataModelFrom(revision:$dataModelId,data:{boardData:$boardData}){
        data{
          id,
          boardDataId,
          boardData,
        },
        error{
          message,
          stack,
          data,
          code
        }
      }
    }`,
    {
      variables: {
        dataModelId: params.dataModelId,
        boardData: params.boardData,
      },
    },
    false
  );
  console.log("helpers.js ==> boardDataModel", boardDataModel);
  const modelData = await publishBoardDataModel(
    boardDataModel.createBoardDataModelFrom.data.id
  );
  return modelData;
}

export async function deleteBoardDataModel(id) {
  const dataModel = await fetchAPI(
    `mutation deleteBoardDataModel($id:ID!){
      deleteBoardDataModel(revision:$id){
        data
      }
    }`,
    {
      variables: {
        id: id,
      },
    },
    false
  );
  return dataModel.deleteBoardDataModel.data;
}

export async function getBoardLists(boardEntryId) {
  const listModels = await fetchAPI(
    `query getBoardLists($entryId:String!){
      listListModels(where:{listBoard:{entryId:$entryId}}){
        data{
          id,
          entryId,
          listId,
          listTitle,
        }
      }
    }`,
    {
      variables: {
        entryId: boardEntryId,
      },
    },
    true
  );
  return listModels.listListModels.data;
}

export async function createListModel(params) {
  const list = await fetchAPI(
    `mutation createListModel($listId:String!, $listTitle:String!, $boardId:ID!){
      createListModel(data:{listId:$listId, listTitle:$listTitle, listBoard:{modelId:"boardModel",id:$boardId}}){
        data{
          id
        }
      }
    }`,
    {
      variables: {
        boardId: params.boardId,
        listId: params.listId,
        listTitle: params.listTitle,
      },
    },
    false
  );
  const publishedList = await publishListModel(list.createListModel.data.id);
  return publishedList;
}

export async function publishListModel(id) {
  const list = await fetchAPI(
    `mutation publishListModel($id:ID!){
      publishListModel(revision:$id){
        data{
          id,
          entryId,
          listId,
          listTitle
        }
      }
    }`,
    {
      variables: {
        id: id,
      },
    },
    false
  );
  return list.publishListModel.data;
}

export async function updateListModel(params) {
  const list = await fetchAPI(
    `mutation updateListModel($id:ID!,$title:String!){
      createListModelFrom(revision:$id,data:{listTitle:$title}){
        data{
          id,
        }
      }
    }`,
    {
      variables: {
        id: params.id,
        title: params.title,
      },
    },
    false
  );
  const newList = publishListModel(list.createListModelFrom.data.id);
  deleteListModel(params.id);
  return newList;
}

export async function deleteListModel(id) {
  console.log("=== in deleteBoardDataModel");
  const deleteList = await fetchAPI(
    `mutation deleteListModel($id:ID!){
      deleteListModel(revision:$id){
        data
      }
    }`,
    {
      variables: {
        id: id,
      },
    },
    false
  );
  return deleteList.deleteListModel.data;
}

export async function getListCards(listEntryId) {
  const cardModels = await fetchAPI(
    `query getListCards($entryId:String!){
      listCardModels(where:{cardList:{entryId:$entryId}}){
        data{
          id,
          entryId,
          cardId,
          cardTitle,
          cardImage,
          cardDescription
        }
      }
    }`,
    {
      variables: {
        entryId: listEntryId,
      },
    },
    true
  );
  return cardModels.listCardModels.data;
}

export async function createCardModel(params) {
  console.log("=== In createCardModel");
  console.log("=== params", params);
  const card = await fetchAPI(
    `mutation createCardModel($cardId:String!,$cardTitle:String!,$cardDescription:String!,$cardImage:String!,$listId:ID!){
      createCardModel(data:{cardId:$cardId,cardTitle:$cardTitle,cardDescription
      :$cardDescription,cardImage:$cardImage,cardList:{modelId:"listModel",id:$listId}}){
        data{
          id
        }
      }
    }`,
    {
      variables: {
        listId: params.listId,
        cardId: params.cardId,
        cardTitle: params.cardTitle,
        cardDescription: params.cardDescription,
        cardImage: params.cardImage,
      },
    },
    false
  );
  const publishedCard = await publishCardModel(card.createCardModel.data.id);
  return publishedCard;
}

export async function publishCardModel(id) {
  console.log("=== In publishCardModel");
  const card = await fetchAPI(
    `mutation publishCardModel($id:ID!){
      publishCardModel(revision:$id){
        data{
          id,
          entryId,
          cardId,
          cardTitle,
          cardImage,
          cardDescription
        }
      }
    }`,
    {
      variables: {
        id: id,
      },
    },
    false
  );
  return card.publishCardModel.data;
}

export async function updateCardModel(params) {
  const card = await fetchAPI(
    `mutation updateCardModel($id:ID!,$title:String,$description:String){
      createCardModelFrom(revision:$id,data:{cardTitle:$title,cardDescription:$description}){
        data{
          id
        }
      }
    }`,
    {
      variables: {
        id: params.id,
        title: params.title,
        description: params.description,
      },
    },
    false
  );
  const newCard = publishCardModel(card.createCardModelFrom.data.id);
  deleteCardModel(params.id);
  return newCard;
}

export async function deleteCardModel(id) {
  const card = await fetchAPI(
    `mutation deleteCardModel($id:ID!){
      deleteCardModel(revision:$id){
        data
      }
    }`,
    {
      variables: {
        id: id,
      },
    },
    false
  );
  return card.deleteCardModel.data;
}

export async function getPreSignedPostImageData(image) {
  const preSignedPostPayload = await fetchMainAPI(
    `query getPreSignedPostPayloadData($data: PreSignedPostPayloadInput!) {
      fileManager {
        getPreSignedPostPayload(data: $data) {
          data {
            data
            file {
              name
              type
              size
              key
            }
          }
        }
      }
    }`,
    {
      variables: {
        data: {
          name: image.name,
          type: image.type,
          size: image.size,
        },
      },
    }
  );

  return preSignedPostPayload.fileManager.getPreSignedPostPayload.data;
}

export async function uploadToS3Bucket({ url, fields }, file) {
  const formData = new FormData();
  Object.keys(fields).forEach((key) => {
    formData.append(key, fields[key]);
  });
  // Actual file has to be appended last.
  formData.append("file", file);
  const res = await fetch(url, {
    method: "POST",
    "Content-Type": "multipart/form-data",
    body: formData,
  });
  return res;
}

export async function createImageFile(file) {
  const createFile = await fetchMainAPI(
    `mutation CreateFile($data: FileInput!) {
      fileManager {
        createFile(data: $data) {
          error {
            code
            message
            data
          }
          data {
            id
            name
            key
            src
            size
            type
            tags
            createdOn
            createdBy {
              id
            }
          }
        }
      }
    }`,
    {
      variables: {
        data: {
          type: file.type,
          name: file.name,
          size: file.size,
          key: file.key,
          tags: [],
        },
      },
    }
  );

  return createFile.fileManager.createFile.data;
}
