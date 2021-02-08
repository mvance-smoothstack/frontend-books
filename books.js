class Book {
    constructor(bookId, title, authorName) {
        this.bookId = bookId;
        this.title = title;
        this.authorName = authorName;
    }
}
function makeBookList() {
    var bookList = [];
    var titles = ["A Book", "Another Book", "Also A Book", "Yet Another Book"];
    var authors = ["Foo", "Bar", "Baz"];
    while (bookList.length < 20) {
        var thisId = bookList.length;
        var thisTitle = titles[thisId % 4];
        var thisAuthor = authors[thisId % 3];
        var newBook = new Book(thisId, thisTitle, thisAuthor);
        bookList.push(newBook);
    }
    return bookList;
}
function appendBook(book) {
    let table = $("#tableBody");
    var row = "<tr><td>";
    row += book.bookId + "</td><td>";
    row += book.title + "</td><td>";
    row += book.authorName + "</td></tr>";
    table.append(row);
}
function makeRows(list, page) {
    var subList;
	//hardcoding page lengths isn't pretty but it works for now
	//TODO: refactor this if I come back to it
    switch (page) {
        case "1":
            subList = list.slice(0, 5);
            break;
        case "2":
            subList = list.slice(5, 10);
            break;
        case "3":
            subList = list.slice(10, 15);
            break;
        case "4":
            subList = list.slice(15, 20);
            break;
        default:
            //should not get here
            subList = list;
    }
    subList.forEach(appendBook);
}

books = makeBookList();
$(document).ready(function() {
    //on load, fill in the first books
    makeRows(books, "1");
    //listener for when the page links are clicked
    $(".page-link").click(function() {
        $("#tableBody").empty();
        var pageNumber = $(this).text();
        makeRows(books, pageNumber);
    });
});