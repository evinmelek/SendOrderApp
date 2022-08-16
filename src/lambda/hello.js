export function handler(event, callback) {
  console.log(event)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({msg: "Hello, World!"})
  })
}
