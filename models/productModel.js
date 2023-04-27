const { default: mongoose, disconnect } = require("mongoose");

const dbURI = process.env.dbURI

const productSchema = mongoose.Schema({
   name: String,
   price: Number,
   category: String,
   description: String,
   image: String
});

exports.Product = mongoose.model('product', productSchema);

exports.getProducts = () => {
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            return this.Product.find({});
         })
         .then(products => {
            mongoose.disconnect();
            resolve(products);
         })
         .catch(err => {
            mongoose.disconnect();
            reject(err);
         })
   })
}


exports.getProductsByCategory = (category) => {
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            return this.Product.find({ category });
         })
         .then(products => {
            mongoose.disconnect();
            resolve(products);
         })
         .catch(err => {
            mongoose.disconnect();
            reject(err);
         })
   })
}

exports.getProductById = (id) => {
   return new Promise((resolve, reject) => {
      mongoose.connect(dbURI)
         .then(() => {
            return this.Product.findOne({ _id: id })
         })
         .then(product => {
            mongoose.disconnect()
            resolve(product)
         })
         .catch(err => {
            mongoose.disconnect()
            reject(err)
         })
   })
}


exports.getFirstProductFromDatabase = () => {
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            return this.Product.findOne();
         })
         .then((product)=>{
            mongoose.disconnect();
            resolve(product);
         })
         .catch(err=>{
            mongoose.disconnect();
            reject(err);
         })
   })
}



exports.addProduct = (data) => {
   return new Promise((resolve, reject) => {
      mongoose.connect(dbURI)
      .then(()=>{
         const product = new this.Product(data);
         return product.save()
      })
      .then(()=>{
         mongoose.disconnect();
         resolve('product added successfully');
      })
      .catch((err)=>{
         mongoose.disconnect();
         reject(err);
      })
   })
}