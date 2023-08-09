const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team1-user";

const isValid = (body) => {
  return (
    !!body &&
    !!body?.userId &&
    !!body?.password &&
    !!body?.email &&
    !!body?.nickname
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

  // TODO: リクエストボディの中身をJavaScriptオブジェクトに変換し、1つ、あるいは複数の変数に代入する
  const body = event.body ? JSON.parse(event.body) : {}
  try {
    if (!isValid(body)) {
      throw new Error('必要なパラメータが足りません')
    }
    
    // TODO: DBに登録するための情報をparamオブジェクトとして宣言する（中身を記述）
    const param = {
      TableName,
      Item: marshall({
        userId: body.userId,
        email: body.email,
        password: body.password,
        birthday: body?.birthday ?? '',
        nickname: body?.nickname ?? '',
        gender: body?.gender ?? '',
        prefecture: body?.prefecture ?? '',
        introduction: body?.introduction ?? '',
        createdAt: Date.now()
      })
    };
    console.log(param)
    const command = new PutItemCommand(param);
    await client.send(command);
    
    response.statusCode = 201
    response.body = JSON.stringify(unmarshall(param.Item))
    
  } catch(e) {
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
