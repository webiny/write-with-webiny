class DeleteTaskSchema {
  static String deleteJson = """
  mutation deleteTodo(\$id:ID!){
    deleteTodos(revision:\$id){
      data
    }
  }
  """;
}
