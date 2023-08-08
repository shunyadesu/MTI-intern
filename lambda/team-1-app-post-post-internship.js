const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team1-post";

const isValid = (body) => {
  return (
    !!body &&
    !!body.userId &&
    !!body.nickname &&
    !!body.genre &&
    !!body.context
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
    
    // オブジェクトの作成
    const d = Date.now()
    let key = {
      userId: body.userId,
      nickname: body.nickname,
      genre: body.genre,
      context: body.context,
      createdAt: d,
      postId: `${body.userId}|${d}`
    }
    if (body?.postId) {
      key.parentPostId = body.postId
    }
    const params = {
      TableName,
      Item: marshall(key)
    }
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

