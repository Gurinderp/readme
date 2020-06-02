const fs = require("fs");
const axios = require("axios");
const genMd = require("./genMd");

const api = {
    getUser(username){
        const queryURL = `https://api.github.com/users/${username}`;

        return axios
        .get(queryURL)
        .then(function (response){
            console.log(response.data);
            const jsonRes = JSON.parse(response);
            const githubUserInfo = {
                username: response.data.login,
                avatar: response.data.avatar_url,
                email: response.data.email
            }
            fs.writeFile("README.md", genMd(githubUserInfo), function (err){
                if (err) { throw err; }
            });
            if (response.data.email === null){
                githubUserInfo.email = "placeholderemail@email.com"
            }
            console.log(githubUserInfo);
            return githubUserInfo;
        })
    }
};

module.exports = api;