// const { default: axios } = require('axios');
import axios from "axios";
import fs from 'fs'

// make API request
axios({
  url: process.env.WEBINY_API
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.TOKEN}`
  },
  data: {
    query: `{
        listPosts{
          data{
            id
            title
            slug
            description
            body
            featuredImage
            author{
              name
              coverImage
              body
            }
          }
        }
      }
      `
  }
}).then((myresult) => {
  //get Response
  var response = myresult.data

  let json = [];
  let result = [];
  let bodyjson = []
  //Strip the Json, Extract Data and format in MD
  json = response.data.listPosts.data;
  console.group("JSON Data");
  json.forEach((post) => {
    result.push("---")
    result.push("title: " + JSON.stringify(post.title)),
      result.push("date:" + " 2022-10-06T11:39:16+03:00")
    result.push("draft:" + " true")
    result.push("---")
    result.push("# " + post.slug),
      result.push('![featuredImage](' + post.featuredImage + ')'),
      result.push('\n'),
      result.push("### " + post.description),
      bodyjson = response.data.listPosts.data.body
    bodyjson = post.body
    bodyjson.forEach((body) => {
      result.push("## " + body.data.text)
      result.push('![](' + body.data.file + ')')

    }),
      result.push("## Author:" + post.author.name),
      result.push('![mime](' + post.author.coverImage + ')')
    console.log(post.body);
  });
  // update the flile blog.md
  fs.writeFile("../content/posts/blog.md", result.join('\n'), function (err) {
    if (err) {
      console.log(err);
    }
  }),
    console.log(+result.join('\n'));
}
).catch((error) => {
  console.log(error)
})