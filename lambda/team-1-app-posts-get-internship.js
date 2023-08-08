const { DynamoDBClient, ScanCommand, QueryCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team1-post";

exports.handler = async (event, context) => {
  //レスポンスの雛形
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };
  
  
  try {
    const query = event.queryStringParameters || {}
    
    let postTmp = {}
    if (query?.userId) {
      const params = {
        TableName,
        KeyConditionExpression: "userId = :uid",
        ExpressionAttributeValues: marshall({
          ":uid": query.userId
        }),
      }
      const command = new QueryCommand(params);
      postTmp = (await client.send(command)).Items
    } else if (query?.genre) {
      const params = {
        TableName,
        IndexName: "genre-createdAt-index",
        KeyConditionExpression: "genre = :genre",
        ExpressionAttributeValues: marshall({
          ":genre": query.genre
        }),
      }
      const command = new QueryCommand(params);
      postTmp = (await client.send(command)).Items
    } else {
      const params = {
        TableName
      }
      const command = new ScanCommand(params);
      postTmp = (await client.send(command)).Items.filter((v) => !v.parentPostId)
    }
    
    const posts = postTmp.map((v) => unmarshall(v))
    response.body = JSON.stringify({posts})
    
  } catch(e) {
    console.error(e)
    if (e.message === "必要なパラメータが足りません") {
      response.statusCode = 400
      response.body = JSON.stringify({
        message: '必要なパラメータが足りません'
      })
    } else {
      response.statusCode = 500;
      response.body = JSON.stringify({
        message: "予期せぬエラーが発生しました。",
        errorDetail: e.toString(),
      });
    }
  }

  return response;
};
