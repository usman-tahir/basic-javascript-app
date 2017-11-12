publicLibrary.view.listBooks = {
    setupUserInterface: function() {
        var tableBodyElement = document.querySelector('table#books > tbody'),
            keys = [],
            key = '',
            row = {},
            i;
        
        Book.loadAll();
        keys = Object.keys(Book.instances);

        for (i = 0; i < keys.length; i += 1) {
            key = keys[i];
            row = tableBodyElement.insertRow();
            row.insertCell(-1).textContent = Book.instances[key].isbn;
            row.insertCell(-1).textContent = Book.instances[key].title;
            row.insertCell(-1).textContent = Book.instances[key].year;
        }
    }
};