const Model = require('./model');

class User extends Model {
    constructor() {
        super({
            prefix: "user",
            attributes: {
                "email": {
                    required: true
                },
                "firstName": {
                    required: true
                },
                "lastName": {
                    required: true
                },
                "industry": {
                    required: true
                },
                "type": {
                    required: true
                },
                "headline": { },
                "locationName": {},
                "locationCode": {},
                "summary": {},
                "image": {},
                "linkedinUrl": {},
                "twitterUrl": {},
                "facebookUrl": {},
                "googleUrl": {}
            }
        });
    }
}

module.exports = User;