// /backend/functions/workoutTracking/index.js
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function saveWorkout(workoutData) {
    const params = {
        TableName: 'WorkoutsTable',
        Item: workoutData
    };
    return docClient.put(params).promise();
}

exports.handler = async (event) => {
    try {
        const workoutData = JSON.parse(event.body);
        await saveWorkout(workoutData);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Workout saved successfully" })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }
};
