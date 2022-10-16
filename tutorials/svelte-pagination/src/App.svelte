<script>
  import {Allbooks} from './data'
  import Book from './components/Book.svelte';
</script>

<main>
  <div class='books'>
    {#each Allbooks as book}
      <Book
        title={book.title}
        image={book.image}
        authors={book.authors}
        publisher={book.publisher}
        publishDate={book.publishedDate}
      />
    {/each}
  </div>
</main>

<style>
  main{
    width: 95%;
    min-height: 100vh;
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