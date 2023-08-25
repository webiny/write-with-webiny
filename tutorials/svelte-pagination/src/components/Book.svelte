<div class='book'>
  <img src={image} alt='book'/>
  <div class='book_desc'>
    <h4>{title}</h4>
  {#each authors as author }
    <div class='book_authors'>
      <span>{author}</span>
    </div>
  {/each}
    <span>{publisher}, {publishDate}</span>
  </div>
</div>

<script>
  export let title;
  export let image;
  export let authors;
  export let publisher;
  export let publishDate;
</script>

<style>
.book {
  display: flex;
  background-color: rgb(243, 241, 246);
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  max-width: 450px;
  max-height: 200px;
}

.book img {
  margin-right: 10px;
  width: 30%;
}

.book_desc{
  text-align: left;
}

.book_desc h4 {
  margin-bottom: 5px;
  font-size: 18px;
}

.book_desc > span{
  color: gray;
  font-size: 14px;
}

.book_authors{
  color: gray;
  font-size: 14px;
  margin-bottom: 5px;
}

@media (min-width: 600px){

  .book img {
    width: 32%;
  }
}
</style>