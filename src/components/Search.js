import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import debounce from "lodash/debounce";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";

const Search = (props) => {
  const [searchText, setSearchText] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);
  const history = useHistory();

  // Debounce the search function
  const debouncedSearch = debounce((text) => handleSearchTextChange(text), 300);

  const handleSearchTextChange = (text) => {
    if (text.length !== 0) {
      BooksAPI.search(text).then((searchedBooks) => {
        if (!searchedBooks.error) {
          BooksAPI.getAll().then((myBooks) => {
            const xxx = setDefaultShelves(searchedBooks, myBooks);
            setSearchedBooks(xxx); 
          });
        } else {
          setSearchedBooks([]);
        }
      });
    } else if (text.length === 0) {
      setSearchedBooks([]);
    }
  };

  const setDefaultShelves = (searchedBooksLocal, myBooks) => {
    return searchedBooksLocal.map((searchBook) => {
      const bookFound = myBooks.find((book) => book.id === searchBook.id);
  
      const updatedBook = bookFound
        ? { ...searchBook, shelf: bookFound.shelf }
        : { ...searchBook, shelf: "none" };
  
  
      return updatedBook;
    });
  };

  useEffect(() => {
    debouncedSearch(searchText);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchText, debouncedSearch]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => history.push("/")}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={(event) => setSearchText(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
      <ol className="books-grid">
  {searchedBooks &&
    searchedBooks.map((book, index) => (
      <Book
        key={index}
        title={book.title}
        authors={book.authors}
        imageUrl={book.imageLinks && book.imageLinks.thumbnail}
        bookshelf={book.shelf}
        book={book}
        isSearching
      />
    ))}
</ol>
      </div>
    </div>
  );
};

export default Search;







