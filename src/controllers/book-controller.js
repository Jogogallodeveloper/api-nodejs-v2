//import modules
import { author } from "../models/author.js";
import book from "../models/book.js";

// ✅ GET /books — returns the list of all books in JSON format
class BookController {

    // ✅ methodo get all books
    static listBooks = async (req, res) => {

        try {
            const listBooks = await book.find({});
            // console log to print the response from mongo
            console.log("📄 Resultado vindo do Mongo:", listBooks);
            // define the response when its ok
            res.status(200).json(listBooks);
        } catch (error) {
            res.status(500).
                json({
                    message: `${error.message}
                 - ❌ Internal server error while finding book.` });
        }

    };

    // ✅ methodo GET specific books
    static listBookById = async (req, res) => {
        try {

            const id = req.params.id

            const bookResult = await book.findById(id);
            // console log to print the response from mongo
            console.log("📄 Resultado vindo do Mongo:", bookResult);
            // define the response when its ok
            res.status(200).json(bookResult);
        } catch (error) {
            res.status(400).
                json({
                    message: `${error.message}
                 - ❌ Internal server error while updating the book.` });
        }

    };
    // methodo POST to create a specific Book
    static postbook = async (req, res) => {

        const newBook = req.body

        // Validação simples
        // if (!publisher || !title || !value || !pages) {
        //     return res.status(400).send("Invalid book data. 'publisher','title' and 'value' are required.");
        // }

        try {
            //define const that will create the book on mondoDB
            //const newBook = await book.create(req.body);
            //define the methodo that create the book, but firts find the id of the author
            const findAuthor = await author.findById(newBook.author);

            // define the  object of the book 
            const completeBook = { ...newBook, author: { ...findAuthor._doc } };

            const bookCreated = await book.create(completeBook);


            // define sucess response
            res.status(201).json({
                message: "Created with Sucess",
                book: bookCreated
            });
        } catch (error) {
            res.status(500).
                json({ message: `${error.message} - ❌ error to create the book` });
        }
    };

    // methodo PUT a specific book 
    static PutBookById = async (req, res) => {
        try {
            const id = req.params.id

            await book.findByIdAndUpdate(id, req.body);

            // console log to print the response from mongo
            console.log("📄 Resultado vindo do Mongo:", book);

            // define the response when its ok
            res.status(200).json({ message: "Book updated successfully." });
        } catch (error) {
            res.status(500).
                json({ message: `${error.message} - ❌ Internal server error while updating the book.` });
        }
    };

    // methodo DELETE a specific book 
    static DeleteBookById = async(req, res) => {
        try {
            const id = req.params.id;

            const deletedBook = await book.findByIdAndDelete(id);


            if (!deletedBook) {
                return res.status(404).json({ message: "Book not found." });

            };

            // console log to print the response from mongo
            console.log("📄 Resultado vindo do Mongo:", deletedBook);
            // bloco de resposta
            res.status(200).json({ message: "✅ Book deleted successfully!" });

        } catch (error) {
            res.status(500).
                json({ message: `${error.message} - ❌ Internal server error while DELETE the book.` });
        }
    };

    // methodo GET by parametre of search
     static listBookByPublisher = async (req, res) => {
        const publisher = req.query.publisher;

        try {
            // define the action to find the book by publisher
            const booksByPublisher = await book.find({publisher});

            // define the response when find the book
            res.status(200).json(booksByPublisher);
        } catch (error) {

            // define the answare when book not find
            res.status(500).json({message: `${error.message} - ❌ error to find the book by publisher`});
        }
     };

};

export default BookController;