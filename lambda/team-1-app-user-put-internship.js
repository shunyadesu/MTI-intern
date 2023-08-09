const {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team1-user";

const isValid = (body) => {
  return (
    !!body &&
    !!body.userId &&
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
    
    if (!isValid(body)) {
      throw new Error('必要なパラメータが足りません')
    }
    const loginParams = {
      TableName,
      KeyConditionExpression: "userId = :uid",
      FilterExpression: "password = :pass",
      ExpressionAttributeValues: marshall({
        ":uid": body.userId,
        ":pass": body.password
      })
    };
    const loginCommand = new QueryCommand(loginParams);
    const loginUser = await client.send(loginCommand)
    const isLogin = Boolean(loginUser.Count);
    if (!isLogin) {
      throw new Error('ユーザー名またはパスワードが間違っています')
    }
    
    let item = {
      ...unmarshall(loginUser.Items[0])
    }
    if (body?.email) {
      item.email = body.email
    }
    if (body?.introduction) {
      item.introduction = body.introduction
    }
    if (body?.birthday) {
      item.birthday = body.birthday
    }
    if (body?.nickname) {
      item.nickname = body.nickname
    }
    if (body?.gender) {
      item.gender = body.gender
    }
    if (body?.prefecture) {
      item.prefecture = body.prefecture
    }
    
    const params = {
      TableName,
      Item: marshall(item)
    };
    console.log(params)
    const command = new PutItemCommand(params);
    await client.send(command);
    response.statusCode = 201
    response.body = JSON.stringify(unmarshall(params.Item))
    
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
