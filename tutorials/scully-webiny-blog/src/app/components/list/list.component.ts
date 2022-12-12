import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { ArticlePost } from 'src/app/models/post';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  posts = this.postService.getPosts();
  
  constructor(private postService: PostService) {}

    ngOnInit() {
      
  
  }
}

 