export async function getBoards() {
  const boards = await fetchAPI(
    `query GetBoards {
      listBoardModels{
        data{
          id,
          boardId,
          boardTitle
        }
      }
    }`,
    {},
    true
  );
  return boards.listBoardModels.data;
}
