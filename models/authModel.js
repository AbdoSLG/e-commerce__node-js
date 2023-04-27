
const { default: mongoose, disconnect } = require("mongoose");

const bcrypt = require('bcrypt');

const dbURI = process.env.dbURI
const userSchema = mongoose.Schema({
   name: String,
   email: {
      type: String,
      unique: true
   },
   password: String,
   image: {
      default: 'user.png',
      type: String
   },
   isAdmin:{
      default:false,
      type:Boolean,
   }
});

exports.User = mongoose.model('users', userSchema);


// create new user
exports.addUserToDatabase = (data) => {
   /*
      1-  if(check if email exist)
      2-       reject
      3-  else
      4-       encrypt password and add user
   */
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            return this.User.findOne({ email: data.email });
         })
         .then((user) => {
            if (user) {
               mongoose.disconnect();
               reject('email already exist');
            } else {
               return bcrypt.hash(data.password, 10);
            }
         })
         .then((encryptPass) => {
            const newUser = new this.User({
               name: data.username,
               password: encryptPass,
               email: data.email,
            });
            return newUser.save();
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


// login
exports.login = (data) => {
   return new Promise((resolve, reject) => {
      mongoose
         .connect(dbURI)
         .then(() => {
            return this.User.findOne({ email: data.email });
         })
         .then(async (user)=>{
            if(!user){
               mongoose.disconnect()
               reject('There is no user matches this email')
            }else{
               return {
                  status: await bcrypt.compare(data.password, user.password) ,
                  user
               }
            }
         })
         .then(({status, user})=>{
            if(status){
               mongoose.disconnect()
               resolve([user._id, user.isAdmin])
            }else{
               mongoose.disconnect();
               reject('this password is wrong');
            }
         })
         .catch(err=>{
            mongoose.disconnect();
            reject(err);
         })
   })
}
