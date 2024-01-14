// /backend/functions/userManagement/index.js
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function getUser(userId) {
    const params = {
        TableName: 'UsersTable',
        Key: { userId }
    };
    return docClient.get(params).promise();
}

exports.handler = async (event) => {
    try {
        const userId = event.queryStringParameters.userId;
        const userData = await getUser(userId);
        return {
            statusCode: 200,
            body: JSON.stringify(userData.Item)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }
};
