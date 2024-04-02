const { Issuer } = require("../model/index");

class IssuerRepository {
    // Hàm xây dựng khởi tạo
    constructor() {}

    // deleteAt không có gì, nếu xóa sẽ thêm dữ liệu vào. Sau đó select chỉ cho show những cái không có gì.
    // Thực chất xóa là ẩn.
    async selectAll() {
        try {
            const query = Issuer.find({
                deleteAt: {
                  $exists: false,
                  $in: [null, undefined] 
                }
              });
                // execute: thực thi
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }

    async select(filter) {
        try {
            // lọc ra 1 list theo yêu cầu
            filter.deleteAt = {
                $exists: false,
                $in: [null, undefined] 
              }
            const query = Issuer.find(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectOne(filter) {
        try {
            // lọc 1 thằng theo yêu cầu
            filter.deleteAt = {
                $exists: false,
                $in: [null, undefined] 
              }
            const query = Issuer.findOne(filter);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async selectById(id) {
        try {
            // lọc 1 thằng theo id 
            const query = Issuer.findById(id);
            return await query.exec();
        } catch (err) {
            console.log(err);
        }
    }
    async create(data) {
        try {
            return await Issuer.create(data);
        } catch (err) {
            console.log(err);
        }
    }

    async updateOne(id, data) {
        try {
            return await Issuer.updateOne({ _id: id }, data);
        } catch (err) {
            console.log(err);
        }
    }

    async update(filter, data) {
        try {
            return await Issuer.updateMany(filter, data);
        } catch (err) {
            console.log(err);
        }
    }
    async delete(id) {
        try {
            return await Issuer.updateOne({ _id: id },{
                deleteAt: new Date()
            });
        } catch (err) {
            console.log(err);
        }
    }
    async deleteMany(filter) {
        try {
            return await Issuer.updateOne(filter,{
                deleteAt: new Date()
            });
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = { IssuerRepository };