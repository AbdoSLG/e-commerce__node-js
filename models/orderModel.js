const { default: mongoose } = require("mongoose");
const { Cart } = require("./cartModel");
const { User } = require("./authModel");

const dbURI = process.env.dbURI;

const orderSchema = mongoose.Schema({
   name: String,
   price: Number,
   userId: String,
   productId: String,
   amount: Number,
   timestamp: Date,
   size: String,
   description: String,
   image: String,
   category: String,
   status: {
      default: 'pending',
      type: String
   },
   address: String,
   email: String,
   username: String
})

const Order = mongoose.model('order', orderSchema);


const addOrder = (data) => {
   /*
      
      [1]-  check if order 
               modify
            else
               add new order

      [2]- remove this product from cart 
   */

   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            return Order.findOne({ userId: data.userId, productId: data.productId, size: data.size, address: data.address })
         })
         .then(async (order) => {
            return {
               user: await User.findById(data.userId),
               order
            }
         })
         .then(({ user, order }) => {
            if (order) {
               const amount = +order.amount + +data.amount;
               return Order.findOneAndUpdate({ userId: data.userId, productId: data.productId, size: data.size, address: data.address }, { amount })
            } else {
               data.email = user.email;
               data.username = user.name;
               const order = new Order(data);
               return order.save()
            }
         })
         .then(() => {
            return Cart.findOneAndDelete({ userId: data.userId, productId: data.productId });
         })
         .then(() => {
            mongoose.disconnect();
            resolve('order add successfully');
         })
         .catch(err => {
            mongoose.disconnect();
            reject(err);
         })
   })
}


const getAllOrders = (userId) => {
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            return Order.find({ userId });
         })
         .then((orders) => {
            mongoose.disconnect();
            resolve(orders);
         })
         .catch(err => {
            mongoose.disconnect();
            reject(err);
         })
   })
}


const removeOrderFromOrders = (data) => {
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            const { userId, productId, size, address } = data
            return Order.findOneAndDelete({ userId, productId, size, address });
         })
         .then(() => {
            mongoose.disconnect();
            resolve('order deleted successfully');
         })
         .catch(err => {
            mongoose.disconnect();
            reject(err);
         })
   })
}



const getAllOrdersToAdmin = () => {
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            return Order.find({})
         })
         .then((allOrders) => {
            mongoose.disconnect()
            resolve(allOrders);
         })
         .catch((err) => {
            mongoose.disconnect()
            reject(err);
         })
   })
}


const changeStatus = (data) => {
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            return Order.findByIdAndUpdate(data._id, { status: data.status })
         })
         .then(() => {
            mongoose.disconnect();
            resolve('status updated successfully');
         })
         .catch(err => {
            mongoose.disconnect();
            reject(err);
         })
   })
}

const getOrderByFilter = (filter) => {
   return new Promise((resolve, reject) => {
      mongoose.connect(dbURI)
         .then(() => {
            return Order.find({ status: filter })
         })
         .then((orders) => {
            mongoose.disconnect();
            resolve(orders);
         })
         .catch(err => {
            mongoose.disconnect();
            reject(err);
         })
   })
}

const searchByName = (name) => {
   return new Promise((resolve, reject) => {
      mongoose.connect(dbURI)
         .then(() => {
            return Order.find({ username: name })
         })
         .then((orders) => {
            mongoose.disconnect();
            resolve(orders)
         })
         .catch(err => {
            mongoose.disconnect();
            reject(err)
         })
   })
}


const searchByEmail =  (email) => {
   return new Promise((resolve, reject) => {
      mongoose.connect(dbURI)
         .then(() => {
            return Order.find({ email})
         })
         .then((orders) => {
            mongoose.disconnect();
            resolve(orders)
         })
         .catch(err => {
            mongoose.disconnect();
            reject(err)
         })
   })
}


module.exports = {
   Order,
   addOrder,
   getAllOrders,
   removeOrderFromOrders,
   getAllOrdersToAdmin,
   changeStatus,
   getOrderByFilter,
   searchByName,
   searchByEmail
}