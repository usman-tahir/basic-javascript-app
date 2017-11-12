publicLibrary.view.updateBook = {
    setupUserInterface: function() {
        var formElement = document.forms['update'],
            saveButton = formElement.commit,
            selectBookElement = formElement.selectBook,
            key = '',
            keys = [],
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
            selectBookElement.add(optionElement, null);
        }

        selectBookElement.addEventListener('change', function() {
            book = null;
            key = selectBookElement.value;

            if (key) {
                book = Book.instances[key];
                formElement.isbn.value = book.isbn;
                formElement.title.value = book.title;
                formElement.year.value = book.year;
            } else {
                formElement.reset();
            }
        });

        saveButton.addEventListener('click', publicLibrary.view.updateBook.handleSaveButtonClickEvent);

        window.addEventListener('beforeunload', function() {
            Book.saveAll();
        });
    },
    handleSaveButtonClickEvent: function() {
        var formElement = document.forms['update'],
            slots;
        
        slots = {
            isbn: formElement.isbn.value,
            title: formElement.title.value,
            year: formElement.year.value
        };

        Book.update(slots);
        console.log('Book with ISBN ' + slots.isbn + ' updated');
        formElement.reset();
    }
};