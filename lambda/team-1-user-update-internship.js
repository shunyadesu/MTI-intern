const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "User";

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  const reString = new RegExp('.{5}')
  const reAge = new RegExp('[0-9]{1,3}')

  // TODO: リクエストボディの中身をJavaScriptオブジェクトに変換し、1つ、あるいは複数の変数に代入する
  const body = event.body ? JSON.parse(event.body) : null

  if (event.headers?.authorization == 'mtiToken') {
    if (body && reString.test(body.userId || '') && reString.test(body.password || '') && reString.test(body.nickname || '') && reAge.test(body.age || 9999)) {
      // TODO: paramに更新対象のテーブル名と更新内容を記述
      const param = {
        TableName,
        Item: marshall({
          userId: body.userId,
          password: body.password,
          nickname: body.nickname,
          age: body.age
        })
      };
      
    
      const command = new PutItemCommand(param);
      try {
        await client.send(command);
        // TODO: 更新に成功した場合の処理を記述(response bodyを設定する)
        response.body = JSON.stringify({
          userId: body.userId,
          nickname: body.nickname,
          age: body.age
        })
        
      } catch (e) {
        response.statusCode = 500;
        response.body = JSON.stringify({
          message: "予期せぬエラーが発生しました。",
          errorDetail: e.toString(),
        });
      }
    } else {
      response.statusCode = 400
      response.body = JSON.stringify({
        message: '必要なパラメータが足りません'
      })
    }
  } else {
    response.statusCode = 401;
    response.body = JSON.stringify({
      message: "認証トークンを入力してください"
    });
  }

  return response;
};
