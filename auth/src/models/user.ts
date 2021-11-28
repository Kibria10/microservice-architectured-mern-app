import mongoose, { mongo }  from 'mongoose';
//An interface that describes the properties
//that are required to create a new user

interface UserAttrs{
    email: String;
    password: String;
}
//An interface that  describes the properties
//that a User Model has
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttrs): UserDoc;
}
//An interface that describes the properties
//that a user document has or a single user has
interface UserDoc extends mongoose.Document{
    email: String;
    password: String;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

const user = User.build({
    email: 'test@test.com',
    password: 'test123'
});


export {User};