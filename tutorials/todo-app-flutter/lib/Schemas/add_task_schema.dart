class AddTaskSchema {
  static String addTaskJson = """
  mutation createTodo(\$title:String!) {
    createTodos(data:{title:\$title}){
      data{
        title
        completed
        id
      }
    }
  }
  """;

  static String publishTaskJson = """
  mutation publishTodo(\$id:ID!) {
    publishTodos(revision:\$id){
      data{
        title
        completed
        id
      }
    }
  }
 """;
}
