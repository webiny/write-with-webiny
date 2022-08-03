import 'package:flutter/foundation.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class EndPoint {
  ValueNotifier<GraphQLClient> getClient() {
    ValueNotifier<GraphQLClient> _client = ValueNotifier(GraphQLClient(
      link: HttpLink(dotenv.get('ENDPOINTURL'), defaultHeaders: {
        'Authorization': 'Bearer ${dotenv.get('WEBINYACCESTOKEN')}',
      }),
      cache: GraphQLCache(store: HiveStore()),
    ));

    return _client;
  }
}

class MutationEndPoint {
  ValueNotifier<GraphQLClient> getClient() {
    ValueNotifier<GraphQLClient> _client = ValueNotifier(GraphQLClient(
      link: HttpLink(dotenv.get('MUTATIONENDPOINTURL'), defaultHeaders: {
        'Authorization': 'Bearer ${dotenv.get('WEBINYACCESTOKEN')}',
      }),
      cache: GraphQLCache(store: HiveStore()),
    ));

    return _client;
  }
}
