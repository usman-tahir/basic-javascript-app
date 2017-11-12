publicLibrary.view.createBook = {
    setupUserInterface: function() {
        var saveButton = document.forms['book'].commit;

        // Load all the book objects
        Book.loadAll();

        // Set an event handler for the save button
        saveButton.addEventListener('click', publicLibrary.view.createBook.handleSaveButtonClickEvent);

        window.addEventListener('beforeunload', function() {
            Book.saveAll();
        });
    },
    handleSaveButtonClickEvent: function() {
        var formElement = document.forms['book'],
            slots;
        
        slots = {
            isbn: formElement.isbn.value,
            title: formElement.title.value,
            year: formElement.year.value
        };

        Book.add(slots);
        formElement.reset();
    }
};