const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "Article";

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  // リクエストを取得
  // const { userId, text, category } = JSON.parse(event.body);
  const body = event.body ? JSON.parse(event.body) : {};
  
  if (event.headers?.authorization == 'mtiToken') {
      // 必須項目のuseIdとtextが含まれているかを確認
      if (!body || !body?.userId || !body?.text) {
        response.statusCode = 400;
        response.body = JSON.stringify({
          message:
            "無効なリクエストです。request bodyに必須パラメータがセットされていません。",
        });
      }
      // レスポンスに渡すパラメータを設定
      const timestamp = Date.now();
      let item = {
          userId: body.userId,
          timestamp: timestamp,
          text: body.text,
      }
      if(body?.category) {
          item.category = body.category
      }
      const param = {
        TableName, 
        Item: marshall(
          item
        ),
      };
      console.log(param)
    
      // データベースへの登録コマンドを設定
      const command = new PutItemCommand(param);
      console.log(command)
    
      try {
        // データベースへ登録
        const res = await client.send(command);
        response.statusCode = 201;
        console.log(res)
        response.body = JSON.stringify(item);
      } catch (e) {
        response.statusCode = 500;
        response.body = JSON.stringify({
          message: "予期せぬエラーが発生しました。",
          errorDetail: e.toString(),
        });
      }
  } else {
    response.statusCode = 401;
    response.body = JSON.stringify({
      message: "認証トークンを入力してください"
    });
  }
  return response;
};

