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

  postSlug:string | null;
  title: string | null;
  image:string | null;
  description:string |null;

  constructor(private contentService: PostService,
    private route: ActivatedRoute) {
      this.postSlug = this.route.snapshot.paramMap.get("postSlug");
      this.title = null;
      this.image = null;
      this.description = null;
    }

  ngOnInit(): void {
    const slug: string = this.postSlug ?? '';

    this.contentService.getContentBySlug(slug).subscribe(
      result => {
        const post:ArticlePost = result;
        this.title = post.title;
        this.image = post.image;
        this.description = post.description;

      }
    );
  }


}
