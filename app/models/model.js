const redis = require("redis");
const client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

class Model {
    constructor(data) {
        this.prefix = data.prefix;
        this.attributes = data.attributes;
    }
    validate(data) {
        return new Promise((resolve, reject) => {
            let attributeKeys = Object.keys(this.attributes);
            let errors = [];
    
            for(let i = 0; attributeKeys.length > i; i++) {
                let item = attributeKeys[i];
                let attribute = this.attributes[item];
            
                if(attribute.hasOwnProperty("required") && attribute.required === true) {
                    if(data[item] === undefined || data[item] === "") {
                        errors.push(item + " is required");
                    }
                }
            }

            if(errors.length === 0) {
                resolve(data);
            } else {
                reject(errors);
            }
        });
    }
    addToRedis(data) {
        return new Promise((resolve, reject) => {
            let dataKeys = Object.keys(data);
            let redisKey = `${this.prefix}-${data.email}`;

            for(let i = 0; dataKeys.length > i; i++) {
                client.hset(redisKey, dataKeys[i], data[dataKeys[i]]);
            }
        });
    }
    create(data) {
        return new Promise((resolve, reject) => {
            this.validate(data).then((response) => {     
                this.addToRedis(response);    
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

module.exports = Model;