const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "User";

exports.handler = async (event, context) => {
  //レスポンスの雛形
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  const userId = event.queryStringParameters?.userId; //見たいユーザのuserId
  if (userId) {
    //TODO: 取得対象のテーブル名と検索に使うキーをparamに宣言
    const param = {
      TableName,
      Key: marshall({
        userId
      })
    };
  
    // 指定したアイテムを取得するコマンドを用意
    const command = new GetItemCommand(param);
  
    try {
      //client.send()の実行でDBからデータを取得
      const user = (await client.send(command)).Item;
      
      //TODO: 条件に該当するデータがあればパスワードを隠蔽をする処理を記述
      delete user?.password
      
      //TODO: レスポンスボディに取得したUserの情報を設定する
      response.statusCode = user ? 200 : 404
      response.body = user ? JSON.stringify(unmarshall(user)) : JSON.stringify({})
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

  return response;
};
