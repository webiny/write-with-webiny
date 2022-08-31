<template>
  <div class='book'>
      <img :src="image" alt='book'/>
      <div class='book_desc'>
        <h4>{{title}}</h4>
        <div class='book_authors' :key="i" v-for="(author, i) in authors">
          <span>{{author}}</span>
        </div>
        <span>{{publisher}}, {{publishDate}}</span>
      </div>
    </div>
</template>

<script>
export default {
  name: "Book",
  props: {
    title: String,
    image: String,
    authors: Array,
    publisher: String, 
    publishDate: String, 
    id: String
  }

}
</script>

<style scoped>
.book {
  display: flex;
  background-color: white;
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