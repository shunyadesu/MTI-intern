const { DynamoDBClient, ScanCommand, QueryCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team1-post-like";

const isValid = (query) => {
  return (
    !!query &&
    !!query.userId &&
    !!query.postId
  )
}

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
    if (!isValid(query)) {
      throw new Error("必要なパラメータが足りません")
    }
    
    const postIds = query.postId.split("|")
    
    const params = {
      TableName,
      KeyConditionExpression: "userId = :uid AND postId = :pid",
      ExpressionAttributeValues: marshall({
        ":uid": query.userId,
        ":pid": query.postId
      }),
    }
    const command = new QueryCommand(params)
    const like = unmarshall((await client.send(command)).Items[0] || {})
    
    
    response.body = Object.keys(like).length ? JSON.stringify({
      ...like,
      isLike: true
    }) : JSON.stringify({
      userId: query.userId,
      postId: query.postId,
      isLike: false
    })
    
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
