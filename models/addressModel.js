const { default: mongoose } = require("mongoose");

const dbURI = process.env.dbURI;

const addressSchema = mongoose.Schema({
   address: String,
   userId: String
});

const Address = mongoose.model('address', addressSchema);


const getAllAddress = (userId) => {
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            return Address.find({ userId })
         })
         .then(addresses => {
            mongoose.disconnect();
            resolve(addresses);
         })
         .catch(err => {
            mongoose.disconnect();
            reject(err);
         })
   })
}


const addNewAddress = (data) => {
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            const address = new Address(data);
            return address.save();
         })
         .then(() => {
            mongoose.disconnect()
            resolve();
         })
         .catch(err => {
            mongoose.disconnect()
            reject(err);
         })
   })
}

const deleteAddressById = (data) => {
   return new Promise((resolve, reject) => {
      mongoose.connect(dbURI)
         .then(() => {
            return Address.findOneAndDelete({ _id: data.addressId, userId: data.userId })
         })
         .then(_ => {
            mongoose.disconnect();
            resolve('address deleted successfully');
         })
         .catch(err => {
            mongoose.disconnect();
            reject(err);
         })
   })
}



module.exports = {
   Address,
   getAllAddress,
   addNewAddress,
   deleteAddressById,
}