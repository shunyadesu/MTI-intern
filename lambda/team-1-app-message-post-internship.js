const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team1-message";

const isValid = (body) => {
  return (
    !!body &&
    !!body.userId &&
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
    
    // データ格納
    const param = {
      TableName,
      Item: marshall({
        userId: body.userId,
        context: body.context,
        createdAt: Date.now()
      })
    }
    console.log(param)
    const command = new PutItemCommand(param);
    await client.send(command);
    
    response.statusCode = 201
    response.body = JSON.stringify(unmarshall(param.Item))
    
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

