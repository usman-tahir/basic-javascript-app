(function() {
    'use strict';

    function Book(slots) {
        this.isbn = slots.isbn;
        this.title = slots.title;
        this.year = slots.year;
    };

    // Catalog for books
    Book.instances = {};

    // Adding a book
    Book.add = function(slots) {
        var book = new Book(slots);
        // Add the book to the Book.instances collection
        Book.instances[slots.isbn] = book;
        console.log('Book ' + slots.isbn + ' created');
    };

    // Load all of the stored books from localStorage
    Book.loadAll = function() {
        var key = '',
            keys = [],
            booksString = '',
            books = {};
        
        try {
            if (localStorage['books']) {
                booksString = localStorage['books'];
            }
        } catch (e) {
            alert('Error when reading from localStorage: ' + e);
            console.error(e);
        }

        if (booksString) {
            var i;
            books = JSON.parse(booksString);
            keys = Object.keys(books);

            console.log(keys.length + ' books loaded');

            for (i = 0; i < keys.length; i += 1) {
                key = keys[i];
                Book.instances[key] = Book.convertRowToObject(books[key]);
            }
        }
    };

    // Updating a book instance
    Book.update = function(slots) {
        var book = Book.instances[slots.isbn],
            year = parseInt(slots.year, 10);
        
        if (book.title !== slots.title) {
            book.title = slots.title;
        }

        if (book.year !== year) {
            book.year = year;
        }

        console.log('Book ' + slots.isbn + ' updated');
    }

    // Destroying a book instance
    Book.destroy = function(isbn) {
        if (Book.instances[isbn]) {
            delete Book.instances[isbn];
            console.log('Book ' + isbn + ' deleted');
        } else {
            alert('There is no book with the ISBN ' + isbn);
            console.log('There is no book with the ISBN ' + isbn);
        }
    }
}());