import './book.css'

function Book({title, image, authors = [], publisher, publishDate }) {

  return (
    <div className='book'>
      <img src={image} alt='book'/>
      <div className='book_desc'>
        <h4>{title}</h4>
        <div className='book_authors'>
          By: {authors?.map((authors, i) => (
            <span key={i}>{authors.author}</span>
          ))}
        </div>
        <span>{publisher}, {publishDate}</span>
      </div>
    </div>
  )
}

export default Book