import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { isScullyGenerated,  TransferStateService  } from '@scullyio/ng-lib';
import { gql, Apollo } from 'apollo-angular';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticlePost } from '../models/post';


const Get_Posts = gql`
  query Data {
    listArticlePosts{
      data {
        id
        createdOn
        title
        body

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

  
  getContentById(postId: string): Observable<any> {

    
    return this.apollo.watchQuery<any>({
      query: Get_Posts
    }).valueChanges.pipe(
      map((data: any) =>
        data.posts.find((post: ArticlePost) => post.id === postId)
      )
    );
  }



  title = 'blog-app';

}


