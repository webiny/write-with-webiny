import { useState } from 'react';
import './App.css';
import Book from './Book';
import { Allbooks } from './data'

function App() { 
  const [page, setPage] = useState(0)

  return (
    <div className="app">
      {Allbooks
        ? <div className='books'>
            {Allbooks.map((book) => (
                <Book
                  key={book.id}
                  title={book.title}
                  image={book.image}
                  authors={book.authors}
                  publisher={book.publisher}
                  publishDate={book.publishedDate}
                  id={book.id}
                />
              ))}
          </div>   
        : <>
          </>
        }     
        
        <div className='buttons'>
          <button 
            disabled={page === 0 && true}
            style={{backgroundColor: `${page === 0 ? 'gray' : '#6796ec'}`}}
            onClick={() => {setPage(page - 1)}}>Prev</button>

          <button
            disabled={true}
            style={{backgroundColor: `${true ? '#6796ec' : 'gray'}`}}
            onClick={() => {setPage(page + 1)}}>Next</button>
        </div>
    </div>
  );
}

export default App;