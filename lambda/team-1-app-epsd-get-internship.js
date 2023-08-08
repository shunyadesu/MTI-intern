const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team1-epsd";

const isValid = (query) => {
  return (
    !!query &&
    !!query.userId &&
    !!query.date
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
    const query = event?.queryStringParameters || {}
    if (!isValid(query)) {
      throw new Error('必要なパラメータが足りません')
    }
    
    const d = new Date(query.date)
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0)
    
    const params = {
      TableName,
      KeyConditionExpression: "userId = :uid AND date = :cdat",
      ExpressionAttributeValues: marshall({
        ":uid": query.userId,
        ":cdat": Date.parse(d.toISOString())
      })
    }
    
    const command = new QueryCommand(params)
    const epsd = (await client.send(command)).Items[0] || {}
    
    delete epsd?.questions
    
    response.statusCode = epsd ? 200 : 404
    response.body = JSON.stringify(unmarshall(epsd))
    
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
