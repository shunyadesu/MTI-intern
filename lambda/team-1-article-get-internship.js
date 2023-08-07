const { DynamoDBClient, ScanCommand, QueryCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "Article";

exports.handler = async (event, context) => {
  //レスポンスの雛形
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };
  
  let params = {
    TableName,
    Limit: 100,
    ScanIndexForward: false
  }
  const query = event.queryStringParameters
  
  // バリデーション
  if (((query?.start && !Number.isInteger(Number(query?.start))) || (query?.end && !Number.isInteger(Number(query?.end))))) {
    response.statusCode = 400
    response.body = JSON.stringify({
      message: 'start/endはtimestampにしてください'
    })
    return response
  }
  
  if (query?.userId !== undefined) {
    // 条件検索
    params.KeyConditionExpression = "userId = :uid"
    let attributeValues = {
      ":uid": query.userId
    }
    
    // timestamp登録
    if (query?.start) {
      // プレースホルダー登録
      params.ExpressionAttributeNames = {
        "#timestamp": "timestamp"
      }
        
      if (query?.end && query.start < query.end) {
        params.KeyConditionExpression += " AND (#timestamp BETWEEN :start AND :end)"
        attributeValues[":end"] = Number(query.end)
      } else {
        params.KeyConditionExpression += " AND (#timestamp >= :start)"
      }
      attributeValues[":start"] = Number(query.start)
    }
    
    // category登録
    if (query?.category) {
      attributeValues[":cagegory"] = query.category
      params.FilterExpression = "category = :cagegory"
    }
    
    // 変数登録
    params.ExpressionAttributeValues = marshall(attributeValues)
  }
  
  console.log(params)
  
  try {
    const command = query?.userId ? new QueryCommand(params) : new ScanCommand(params)
    const articles_tmp = (await client.send(command)).Items
    const articles = query?.userId ? articles_tmp.map((v) => unmarshall(v)) : (articles_tmp.map((v) => unmarshall(v))).sort((a, b) => a.timestamp <= b.timestamp ? 1 : -1)
    
    response.statusCode = articles.length ? 200 : 404;
    response.body = JSON.stringify({ articles })
  } catch(e) {
    console.log(e)
    response.statusCode = 500
    response.body = JSON.stringify({
      message: '予期せぬエラーが発生しました'
    })
  }

  return response;
};
