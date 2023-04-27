const { default: mongoose, disconnect } = require("mongoose");
const { Address } = require("./addressModel");
const dbURI = process.env.dbURI

const cartSchema = mongoose.Schema({
   name: String,
   price: Number,
   userId: String,
   productId: String,
   amount: Number,
   timestamp: Date,
   size: String,
   redirectTo: String,
   description: String,
   image: String,
   category: String
});

const Cart = mongoose.model('cart', cartSchema);



const addNewItem = (data) => {
   return new Promise((resolve, reject) => {
      /*
         check if exist
            add qty in it 
         else 
            add new item
      */
      mongoose
         .connect(dbURI)
         .then(() => {
            const { productId, size } = data;
            return Cart.findOne({ productId, size })
         })
         .then(product => {
            const { productId, size } = data;
            if (product) {
               const amount = +product.amount + +data.amount;
               const dataModified = {
                  ...data,
                  amount
               };
               return Cart.findOneAndUpdate({ productId, size }, dataModified)
            } else {
               const item = Cart(data);
               return item.save();
            }
         })
         .then(() => {
            mongoose.disconnect();
            resolve();
         })
         .catch(err => {
            mongoose.disconnect();
            reject(err);
         })
   })
}



const getUserCart = (userId) => {
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            return Cart.find({ userId });
         })
         .then(async (products) => {
            return {
               products,
               addresses: await Address.find({ userId }),
            }
         })
         .then((data) => {
            mongoose.disconnect();
            resolve(data)
         })
         .catch(err => {
            mongoose.disconnect();
            reject(err);
         })
   })
}


const deleteProductFromCart = (id) => {
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            return Cart.findOneAndDelete({ productId: id });
         })
         .then(_ => {
            mongoose.disconnect()
            resolve('this item deleted successfully');
         })
         .catch(err => {
            mongoose.disconnect()
            reject(err);
         })
   })
}


const modifyAmount = (productId, amount) => {
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            return Cart.findOneAndUpdate({ productId }, { amount });
         })
         .then(() => {
            mongoose.disconnect();
            resolve('QTY updated successfully');
         })
         .catch((err) => {
            mongoose.disconnect();
            reject(err);
         })
   })
}


module.exports = {
   Cart,
   addNewItem,
   getUserCart,
   deleteProductFromCart,
   modifyAmount,
}