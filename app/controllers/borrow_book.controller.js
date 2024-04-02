const ApiError = require("../api-error");
const BorrowBookService = require("../services/borrow_book.service");

exports.findAll = async (req,res, next) =>{
    let document = [];

    try{
        const borrowBookService = new BorrowBookService();
        const {name} = req.query;
        if(name){
            document = await borrowBookService.findByName(name);
        }else{
            document = await borrowBookService.findAll();
        }
    }catch(error){
        return next(
            new ApiError(500,"An error occurred while retrieving contacts")
        );
    }
    return res.send(document);
};

exports.findOne = async (req,res, next) =>{
    try{
        const borrowBookService = new BorrowBookService();
        const documents = await borrowBookService.findById(req.params.id);
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
        const borrowBookService = new BorrowBookService();
        const document = await borrowBookService.update(req.params.id, req.body);
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
        const borrowBookService = new BorrowBookService();
        const document = await borrowBookService.delete(req.params.id);
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
        const borrowBookService = new BorrowBookService();
        const deleteCount = await borrowBookService.deleteAll();
        return res.send({message:  `${deleteCount} Contact was delete successfully`});
   }catch(error){
    return next(
        new ApiError(500,"An error occurred while removing all contact")
        );
    }
};

// exports.findAllFavorite = async (req,res, next) =>{
//     try{
//         const borrowBookService = new BorrowBookService();
//         const document = await borrowBookService.findFavorite();
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
        const borrowBookService = new BorrowBookService();
        const document = await borrowBookService.create(req.body);
        return res.send(document);
    }catch(e){
        return next(
            new ApiError(500,"An error occurred while creating the contact")
        );
    }
};