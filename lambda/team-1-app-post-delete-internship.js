const {
  DynamoDBClient,
  QueryCommand,
  DeleteItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team1-post";
const UserTableName = "team1-user";

const isValid = (body) => {
  return (
    !!body &&
    !!body.postId &&
    !!body.password
  )
}

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  try {
    const body = event.body ? JSON.parse(event.body) : {}
    const postIds = body.postId.split("|")
    
    if (!isValid(body)) {
      throw new Error('必要なパラメータが足りません')
    }
    const loginParams = {
      TableName: UserTableName,
      KeyConditionExpression: "userId = :uid",
      FilterExpression: "password = :pass",
      ExpressionAttributeValues: marshall({
        ":uid": postIds[0],
        ":pass": body.password
      })
    };
    console.log(loginParams)
    const loginCommand = new QueryCommand(loginParams);
    const isLogin = Boolean((await client.send(loginCommand)).Count);
    if (!isLogin) {
      throw new Error('ユーザー名またはパスワードが間違っています')
    }
    
    const params = {
      TableName,
      Key: marshall({
        userId: postIds[0],
        createdAt: Number(postIds[1])
      })    
    };
    console.log(params)
    const command = new DeleteItemCommand(params);
    await client.send(command);
    response.statusCode = 204
    
  } catch(e) {
    console.error(e)
    if (e.message === "必要なパラメータが足りません") {
      response.statusCode = 400
      response.body = JSON.stringify({
        message: '必要なパラメータが足りません'
      })
    } else if (e.message === "ユーザー名またはパスワードが間違っています") {
      response.statusCode = 401
      response.body = JSON.stringify({
        message: 'ユーザー名またはパスワードが間違っています'
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