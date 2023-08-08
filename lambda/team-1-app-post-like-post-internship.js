const { DynamoDBClient, QueryCommand, PutItemCommand, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team1-post-like";
const PostTableName = "team1-post";

const isValid = (body) => {
  return (
    !!body &&
    !!body.userId &&
    !!body.postId
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
    const body = event.body ? JSON.parse(event.body) : {}
    if (!isValid(body)) {
      throw new Error('必要なパラメータが足りません')
    }
    
    const postIds = body.postId.split("|")
    const likeCheckParams = {
      TableName,
      KeyConditionExpression: "userId = :uid AND postId = :pid",
      ExpressionAttributeValues: marshall({
        ":uid": body.userId,
        ":pid": body.postId
      }),
    }
    const likeCheckCommand = new QueryCommand(likeCheckParams)
    const isLiked = Boolean((await client.send(likeCheckCommand)).Count)

    const postParams = {
      TableName: PostTableName,
      KeyConditionExpression: "userId = :uid AND createdAt = :cdat",
      ExpressionAttributeValues: marshall({
        ":uid": postIds[0],
        ":cdat": Number(postIds[1])
      }),
    }
    const postCommand = new QueryCommand(postParams)
    const post = unmarshall((await client.send(postCommand)).Items[0] || {})
    
    if (!Object.keys(post).length) {
      response.statusCode = 404
      response.body = JSON.stringify({})
      return response
    }
    
    if (!isLiked) {
      const params = {
        TableName,
        Item: marshall({
          userId: body.userId,
          postId: body.postId,
          post: post
        })
      }
      console.log(params)
      const command = new PutItemCommand(params);
      await client.send(command);
      
      response.statusCode = 201
      response.body = JSON.stringify({
        ...unmarshall(params.Item),
        isLike: true
      })
    } else {
      const params = {
        TableName,
        Key: marshall({
          userId: body.userId,
          postId: body.postId
        })
      }
      const command = new DeleteItemCommand(params);
      await client.send(command);
      
      response.statusCode = 201
      response.body = JSON.stringify({
        userId: body.userId,
        postId: body.postId,
        isLike: false
      })
    }
  } catch(e) {
    console.error(e)
    if (e.message === "必要なパラメータが足りません") {
      response.statusCode = 400
      response.body = JSON.stringify({
        message: '必要なパラメータが足りません'
      })
    } else if (e.message === "ユーザー名またはパスワードが間違っています") {
      response.statusCode = 401
      response.body = JSON.stringify({
        message: 'ユーザー名またはパスワードが間違っています'
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

