const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team1-epsd";

const isValid = (body) => {
  const reAge = new RegExp('[0-3]')
  
  return (
    !!body &&
    !!body.userId &&
    !!body.questions &&
    !!reAge.test(body.questions.q1) &&
    !!reAge.test(body.questions.q2) &&
    !!reAge.test(body.questions.q3) &&
    !!reAge.test(body.questions.q4) &&
    !!reAge.test(body.questions.q5) &&
    !!reAge.test(body.questions.q6) &&
    !!reAge.test(body.questions.q7) &&
    !!reAge.test(body.questions.q8) &&
    !!reAge.test(body.questions.q9) &&
    !!reAge.test(body.questions.q10)
  )
}

const toScore = (body) => {
  const scoreList = [
    [0,1,2,3],
    [0,1,2,3],
    [3,2,1,0],
    [0,1,2,3],
    [3,2,1,0],
    [3,2,1,0],
    [3,2,1,0],
    [3,2,1,0],
    [3,2,1,0],
    [3,2,1,0],
  ]
  
  let score = 0
  for (const [key, value] of Object.entries(body.questions)) {
    score += scoreList[Number(key.substr(1,2)) - 1][value]
  }
  
  return score
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
    
    const score = toScore(body)
    const d = new Date()
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0)
    
    // データ格納
    const param = {
      TableName,
      Item: marshall({
        userId: body.userId,
        score: score,
        isEpsd: (score >= 9),
        questions: body.questions,
        date: Date.parse(d.toISOString())
      })
    }
    const command = new PutItemCommand(param);
    await client.send(command);
    
    response.statusCode = 201
    response.body = JSON.stringify({
      userId: body.userId,
      score: score,
      createdAt: d.toISOString(),
      isEpsd: (score >= 9)
    })
    
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

