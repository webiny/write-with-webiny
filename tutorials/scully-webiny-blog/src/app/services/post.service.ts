import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { isScullyGenerated,  TransferStateService  } from '@scullyio/ng-lib';
import { gql, Apollo } from 'apollo-angular';
import { map, Observable, tap } from 'rxjs';
import { ArticlePost } from '../models/post';


const Get_Posts = gql`
query Data {
    listArticlePosts {
      data {
        id
        title
        image
        description
      }
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private apollo: Apollo, private transferStateService: TransferStateService){ }

  getPosts(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: Get_Posts
    }).valueChanges.pipe(map((result) => result.data));


  }
  getContentBySlug(slug: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: Get_Posts
    }).valueChanges.pipe(
      map((data: any) =>
        data.items.find((item: ArticlePost) => item.slug === slug)
      )
    );
  }



  title = 'blog-app';

}


