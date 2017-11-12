publicLibrary.view.deleteBook = {
    setupUserInterface: function() {
        var deleteButton = document.forms['delete'].commit,
            selectElement = document.forms['delete'].selectBook,
            key = '',
            keys = '',
            book = null,
            optionElement = null,
            i;
        
        Book.loadAll();

        keys = Object.keys(Book.instances);
        
        for (i = 0; i < keys.length; i += 1) {
            key = keys[i];

            book = Book.instances[key];
            optionElement = document.createElement('option');
            optionElement.text = book.title;
            optionElement.value = book.isbn;
            selectElement.add(optionElement, null);
        }

        deleteButton.addEventListener('click', publicLibrary.view.deleteBook.handleDeleteButtonClickEvent);

        window.addEventListener('beforeunload', function() {
            Book.saveAll();
        });   
    },
    handleDeleteButtonClickEvent: function() {
        selectElement = document.forms['delete'].selectBook;

        if (selectElement.value) {
            Book.destroy(selectElement.value);
            selectElement.remove(selectElement.selectedIndex);
        }
    }
};