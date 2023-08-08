const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team1-user";

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
    
    const param = {
      TableName
    };
    const command = new ScanCommand(param);
    const users = (await client.send(command)).Items;
    
    const usersArray = users.map((v) => {
      delete v?.password;
      return unmarshall(v);
    })
    
    response.statusCode = users.length ? 200 : 404
    response.body = JSON.stringify({
      users: usersArray
    })
    
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
