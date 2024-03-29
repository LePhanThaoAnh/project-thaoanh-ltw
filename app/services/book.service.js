const { IssuerRepository, BookRepository } = require("../repository/index");
class BookService {
    constructor() {
        this.issuerRepo = new IssuerRepository();
        this.bookRepo = new BookRepository();
    }
    async extract(payload){
        if(payload.nhaxuatban){
            payload.nhaxuatban = await this.issuerRepo.selectById(payload.nhaxuatban);
        }
        return payload;
    } 
    async create(payload) {
        payload = await this.extract(payload);
        const result = await this.bookRepo.create(payload);
        return result;
    }

    async find(filter) {
        const cursor = await this.bookRepo.selectOne(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.bookRepo.selectById(id);
    }
    async update(id, payload) {
        payload = await this.extract(payload);
        let issuer = this.findById(id);
        const result = await this.bookRepo.updateOne(issuer._id, payload);
        return result;
    }

    async delete(id) {
        let issuer = this.findById(id);
        const result = await this.bookRepo.delete(issuer._id);
        return result;
    }

    async deleteAll() {
        const result = await this.bookRepo.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = BookService;
