const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team-1-user";

const isValid = (body) => {
  // const reString = new RegExp('.{5}')
  // const reAge = new RegExp('[0-9]{1,3}')
  return (
    !!body &&
    !!body?.userId &&
    !!body?.email &&
    !!body?.password &&
    !!body?.birthday &&
    !!body?.nickname &&
    !!body?.gender &&
    !!body?.prefecture
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
        birthday: body.birthday,
        nickname: body.nickname,
        gender: body.gender,
        prefecture: body.prefecture,
        createdAt: Date.now()
      })
    };
    
    // DBにデータを登録するコマンドを用意
    const command = new PutItemCommand(param);
    // client.send()でDBにデータを登録するコマンドを実行
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
