import { Component } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { ArticlePost } from './models/post';
 
const Get_Posts = gql`
query Data {
  pageBuilder {
    listPublishedPages {
      data {
        title
      }
    }
  }
}
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private apollo: Apollo){}
  ngOnInit(): void {
    
}
  title = 'blog-app';

}
