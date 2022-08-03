class GetTaskSchema {
  static String getTaskJson = """
  query {
    listTodos{
      data {
        title
        completed
        createdOn
        id
      }
    }
  }
  """;
}
