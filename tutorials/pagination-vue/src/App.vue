<template>
  <div class='books' v-if="!loading && result?.listBooks.data">
    <Book
      :key="book.id" 
      v-for="book in result?.listBooks.data"
      :title="book.title"
      :image="book.image"
      :authors="book.authors"
      :publisher="book.publisher"
      :publishDate="book.publishedDate"
      :id="book.id"
    />
  </div>
  <div v-else class='center'>
    <div v-if="loading">Loading...</div>
    <p v-else-if="error">
      UNABLE TO FETCH DATA
    </p>
  </div>

  <div class='buttons' v-if="!loading">
    <button 
      :disabled="page === 0 && true"
      :style="{backgroundColor: `${page === 0 ? 'gray' : '#6796ec'}`}"
      @click="page--">Prev</button>
    <button 
      :disabled="!result?.listBooks.meta?.hasMoreItems && true"
      :style="{backgroundColor: `${result?.listBooks.meta?.hasMoreItems ? '#6796ec' : 'gray'}`}"
      @click="page++">Next</button>
  </div>
</template>

<script>
import Book from './components/Book';
import { Allbooks } from './data.js'; 
import {ref, watch} from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const LIST_BOOKS = gql`
  query GetBooks ($limit: Int, $after: String){
    listBooks (limit: $limit, after: $after){
      data {
        id
        authors
        image
        publishDate
        publisher
        title
      }
      meta {
        cursor
        hasMoreItems
      }
    }
  }
`

export default {
  name: 'App',
  setup() {
    const cursors = ref([null])
    const page = ref(0)
    const variables = ref({
      limit: 10,
      after: null
    })

    const {result, loading, error } = useQuery(LIST_BOOKS, variables)
    
    watch(result, (result) => {
      const pointer = result?.listBooks?.meta?.cursor
      if(!loading.value && pointer !== cursors.value[page.value]){
        cursors.value = [...cursors.value, pointer]
      }
    })

    watch(page, (page) => {
      variables.value.after = cursors.value[page]
    })

    return {
      result,
      loading,
      error,
      page
    }
  },
  components: {
    Book
  }
}
</script>

<style>
body{
 background-color: rgb(234, 238, 241);
}

#app{
  width: 95%;
  max-width: 1100px;
  margin: 50px auto;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.books{
  display: grid;
  place-content: center;
  margin-top: 10px;
  grid-gap: 15px;
}

.buttons {
  display: flex;
  gap: 5%;
  justify-content: center;
  margin-top: 30px;
}

.buttons button {
  padding: 5px 20px;
  background-color: #6796ec;
  border: none;
  color: white;
}

.center {
  text-align: center;
  display: block;
}

@media (min-width: 600px) {
  .books {
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
  }
}

@media (min-width: 930px) {
  .books {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
