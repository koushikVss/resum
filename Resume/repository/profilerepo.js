const Usermodel = require('../models/profilemodal');
const { v4: uuidv4 } = require('uuid');
const GetProfiles = (mail) => {
    return new Promise((resolve, reject) => {
        Usermodel.find({email:mail}, (err, user) => {
            console.log(mail)
            if (!err) {
                console.log("data fetched")
                resolve({ user });
            }
            else {
                console.log("data error")
                reject(err);
            }
        });

    });
}


const GetProfile = (id) => {
    console.log(id)
    return new Promise((resolve, reject) => {

        Usermodel.find({ _id: id }, (err, user) => {
            if (!err) {
                if (user === null) {
                    resolve({ status: 400, message: "User profile not found", err });
                }
                resolve({ status: 200, message: "User Profile Found", user: user });
            }
            else {
                reject({ status: 400, message: "User profile not found", err });
            }
        });

    });
}

const DeleteProfile = (id) => {
    // console.log(id)
    return new Promise((resolve, reject) => {

        Usermodel.findOneAndDelete({ _id: id }, (err, user) => {
            if (!err) {
                if (user === null) {
                    resolve({ status: 400, message: "User profile not found", err });
                }

                resolve({ status: 200, message: "User Profile Found"});
            }

            else {
                reject({ status: 400, message: "User profile not found", err });
            }
        });

    });
}




const AddProfile = (data, id,mail) => {
    console.log(data)
    return new Promise((resolve, reject) => {
        Usermodel.findOne({ _id: id }, (err, user) => {
            if (!err) {
                if (user === null) {
                    console.log("no user")
                    let newprofile = new Usermodel({...data,_id:uuidv4(),email:mail});
                    newprofile.save((err) => {
                        if (!err) {
                            resolve({ status: 200, message: "User Profile saved" });
                        }
                        else {
                            reject(err)
                        }
                    });
                }
                else {
                    console.log(" user")
                    data = {...data,email:mail}
                    Usermodel.findOneAndUpdate({ _id: id }, data, (err, data) => {
                        if (!err) {
                            resolve({ status: 200, message: "User Profile Updated", user: user });
                        }
                        else {
                            reject({ status: 400, message: "error updating profile", err: err });
                        }
                    });
                }

            }

            else {
                reject({ status: 400, err: err })
            }
        }
        );
    }
    )
}

const UpdateProfile = (id, data) => {
    return new Promise((resolve, reject) => {
        console.log(data.profile)
        let newprofile = new Usermodel({
            title:data.title,
            email: data.email,
            basic: data.basic,
            contact: data.contact,
            education: data.education,
            works: data.works,
            skills: data.skills,
            field: data.fields,
            currentrole: data.currentrole

        });
        Usermodel.findOneAndUpdate({ _id: id }, newprofile, (err, data) => {
            if (!err) {
                resolve(data);
            }
            else {
                reject(err);
            }
        });

    }

    );
}


module.exports = { GetProfiles, AddProfile, GetProfile, UpdateProfile,DeleteProfile }