const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");
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

  // TODO: リクエストボディの中身をJavaScriptオブジェクトに変換し、1つ、あるいは複数の変数に代入する
  const body = event.body ? JSON.parse(event.body) : null

  if (body && body?.userId && body?.password) {
    // TODO: query()に渡すパラムを宣言
    const param = {
      TableName,
      //キー、インデックスによる検索の定義
      KeyConditionExpression: "userId = :uid",
      //プライマリーキー以外の属性でのフィルタ
      FilterExpression: "password = :pass",
      //検索値のプレースホルダの定義
      ExpressionAttributeValues: marshall({
        ":uid": body?.userId,
        ":pass": body?.password
      }),
    };
  
    // userIdとpasswordが一致するデータを検索するコマンドを用意
    const command = new QueryCommand(param);
    try {
      // client.send()の実行でuserIdとpasswordが一致するデータの検索
      const res = await client.send(command);
  
      //TODO: 該当するデータが見つからない場合の処理を記述(ヒント：resの中には個数のプロパティが入っています。)
      if (res.Count) {
        response.body = JSON.stringify({
          token: "mtiToken"
        })
      } else {
        throw new Error("Unauthorized")
      }
  
  
      //TODO: 認証が成功した場合のレスポンスボディを設定する。
    } catch (e) {
      if (e.message == "Unauthorized") {
        response.statusCode = 401;
        response.body = JSON.stringify({
          message: "userIdまたはpasswordが間違っています"
        });
      } else {
        response.statusCode = 500;
        response.body = JSON.stringify({
          message: "予期せぬエラーが発生しました。",
          errorDetail: e.toString(),
        });
      }
    }
  } else {
    response.statusCode = 400
    response.body = JSON.stringify({
      message: '必要なパラメータが足りません'
    })
  }

  return response;
};
