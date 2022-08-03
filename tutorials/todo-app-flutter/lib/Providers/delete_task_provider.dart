import 'package:flutter/foundation.dart';
import 'package:todos_webiny_app/Schemas/delete_task_schema.dart';
import 'package:todos_webiny_app/Schemas/urlEndpoint.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class DeleteTaskProvider extends ChangeNotifier {
  bool _status = false;

  String _response = '';

  bool get getStatus => _status;

  String get getResponse => _response;

  final MutationEndPoint _point = MutationEndPoint();

  ///Add task method
  void deleteTask({
    String? todoId,
  }) async {
    _status = true;
    _response = "Please wait...";
    notifyListeners();

    ValueNotifier<GraphQLClient> _client = _point.getClient();

    QueryResult result = await _client.value.mutate(
        MutationOptions(document: gql(DeleteTaskSchema.deleteJson), variables: {
      'id': todoId,
    }));

    if (result.hasException) {
      print(result.exception);
      _status = false;
      if (result.exception!.graphqlErrors.isEmpty) {
        _response = "Internet is not found";
      } else {
        _response = result.exception!.graphqlErrors[0].message.toString();
      }
      notifyListeners();
    } else {
      print(result.data);
      _status = false;
      _response = "Task was successfully Deleted";
      notifyListeners();
    }
  }

  void clear() {
    _response = '';
    notifyListeners();
  }
}
