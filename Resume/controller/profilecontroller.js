const repo = require('../repository/profilerepo');

const GetProfiles = (req, res) => {
    repo.GetProfiles(req.params.mail).then(data => {
        res.status(200).send(data);
    });

}
const GetProfile = (req, res) => {
    repo.GetProfile(req.params.id).then(data => {
        res.send(data);
    });

}

const DeleteProfile = (req, res) => {
    repo.DeleteProfile(req.params.id).then(data => {
        res.send(data);
    });

}

const AddProfile = (req, res) => {
    repo.AddProfile(req.body,req.params.id,req.params.email).then(data => {
        res.send(data);
    });

}
const UpdateProfile = (req, res) => {
    repo.UpdateProfile(req.params.id, req.body).then(data => {
        res.status(200).send({ data, msg: "updated" });
    });
}
module.exports = { GetProfiles, AddProfile, UpdateProfile, GetProfile, DeleteProfile }