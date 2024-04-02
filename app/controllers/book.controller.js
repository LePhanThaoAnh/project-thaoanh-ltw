const ApiError = require("../api-error");
const BookService = require("../services/book.service");

exports.findAll = async (req,res, next) =>{
    let document = [];

    try{
        const bookService = new BookService();
        const {name} = req.query;
        if(name){
            document = await bookService.findByName(name);
        }else{
            document = await bookService.findAll();
        }
    }catch(error){
        return next(
            new ApqError(500,"An error occurred while retrieving contacts")
        );
    }
    return res.send(document);
};

exports.findOne = async (req,res, next) =>{
    try{
        const bookService = new BookService();
        const documents = await bookService.findById(req.params.id);
        if(!documents){
            return next(new ApiError(404,"Contact not found"));
        }
        return res.send(documents);
    } catch(error){
        return next(
            new ApiError(
                500,  `Error requesting contact with id = ${req.params.id}`
            )
        );
    }
};

exports.update = async (req,res, next) =>{
    if(Object.keys(req.body).length ==0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }

    try{
        const bookService = new BookService();
        const document = await bookService.update(req.params.id, req.body);
        if(!document){
            return next(new ApiError(404,"Contact not found")); 
        }
        return res.send({message: "Contact was updated successfully"});

    }catch(err){
        return next(
            new ApiError(500,`Error update contact with id = ${req.params.id}`)
        );
    }
};

exports.delete = async (req,res, next) =>{
   try{
        const bookService = new BookService();
        const document = await bookService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"Contact not found")); 
        }
        return res.send({message: "Contact was delete successfully"});
   }catch(error){
    return next(
        new ApiError(500,`Could not delete contact with id = ${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req,res, next) =>{
    try{
        const bookService = new BookService();
        const deleteCount = await bookService.deleteAll();
        return res.send({message:  `${deleteCount} Contact was delete successfully`});
   }catch(error){
    return next(
        new ApiError(500,"An error occurred while removing all contact")
        );
    }
};

// exports.findAllFavorite = async (req,res, next) =>{
//     try{
//         const bookService = new BookService();
//         const document = await bookService.findFavorite();
//         return res.send(document);
//    }catch(error){
//     return next(
//         new ApiError(500,"An error occurred while retrieving favorite contacts")
//         );
//     }
// };

exports.create = async (req, res,next) => {
    if(!req.body?.name){
        return next(new ApiError(400, "Name can not be empty"));
    }

    try{
        const bookService = new BookService();
        const document = await bookService.create(req.body);
        return res.send(document);
    }catch(e){
        return next(
            new ApiError(500,"An error occurred while creating the contact")
        );
    }
};