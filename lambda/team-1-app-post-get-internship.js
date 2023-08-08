const { DynamoDBClient, ScanCommand, QueryCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team1-post";

const isValid = (query) => {
  return (
    !!query &&
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
      KeyConditionExpression: "userId = :uid AND createdAt = :cdat",
      ExpressionAttributeValues: marshall({
        ":uid": postIds[0],
        ":cdat": Number(postIds[1])
      }),
    }
    const command = new QueryCommand(params)
    const postTmp = (await client.send(command)).Items
    const post = unmarshall(postTmp[0])
    const childParams = {
      TableName,
      IndexName: "parentPostId-createdAt-index",
      KeyConditionExpression: "parentPostId = :ppid",
      ExpressionAttributeValues: marshall({
        ":ppid": query.postId
      }),
    }
    const childCommand = new QueryCommand(childParams)
    const childPostsTmp = (await client.send(childCommand)).Items
    const childPosts = childPostsTmp.map((v) => unmarshall(v))
    response.body = JSON.stringify({
      ...post,
      cPost: childPosts
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
