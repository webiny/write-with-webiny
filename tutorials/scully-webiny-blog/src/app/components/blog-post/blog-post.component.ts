import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlePost } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  postId:string | null;
  title: string | null;
  body: string | null;

  constructor(private postService: PostService,
    private route: ActivatedRoute) {
      
      this.postId = this.route.snapshot.paramMap.get("postId");
      this.title = null;
      this.body = null;
    }

  ngOnInit(): void {
    const postId: string = this.postId ?? '';

    this.postService.getContentById(postId).subscribe(
      result => {
        const post:ArticlePost = result;
        this.title = post.title;
        this.body = post.data.text;

      }
    );
  }


}
