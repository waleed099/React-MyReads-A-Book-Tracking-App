import React from "react";
import * as BooksAPI from "../BooksAPI";

const Book = (props) => {
  const {
    title,
    authors,
    imageUrl,
    book,
    setBooks,
    isSearching,
    bookshelf,
  } = props;

  const handleShelfChange = (event) => {
    if (event.target.value !== "move") {
      BooksAPI.update(book, event.target.value).then((response) =>
        BooksAPI.getAll().then((newBooks) => {
          setBooks(newBooks);
        })
      );
    }
  };

  const handleShelfChangeInSearch = (event) => {
    if (event.target.value !== "move") {
      BooksAPI.update(book, event.target.value);
    }
  };

  const renderShelvesOptions = (shelves) => {
    return shelves.map((shelf) => (
      <option key={shelf.id} value={shelf.shelfName}>
        {shelf.shelfDisplayName} 
      </option>
    ));
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${imageUrl}")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            onChange={(event) => {
              if (!isSearching) {
                handleShelfChange(event);
              } else {
                handleShelfChangeInSearch(event);
              }
            }}
            defaultValue={bookshelf}
          >
            <option value="move" disabled>
              Move to...
            </option>
            {renderShelvesOptions([
              { id: "1", shelfName: "currentlyReading", shelfDisplayName: "Currently Reading" },
              { id: "2", shelfName: "wantToRead", shelfDisplayName: "Want to Read" },
              { id: "3", shelfName: "read", shelfDisplayName: "Read" },
 ])}
            <option value="none">None</option>

          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors && authors.map((author) => `${author},`)}</div>
    </div>
  );
};

export default Book;