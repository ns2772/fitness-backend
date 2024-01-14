// /backend/functions/lambdaFunction1/index.js

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    // Example: Fetch user data based on user ID
    const userId = event.queryStringParameters.userId;
    const params = {
        TableName: 'UsersTable',
        Key: {
            'userId': userId
        }
    };

    try {
        const data = await docClient.get(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }
};
