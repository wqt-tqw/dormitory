const {db}=require(process.cwd()+'/models/index');

function WsServer() {
	var WebSocketServer = require('ws').Server,
		server = new WebSocketServer({
			port: 9000
		})

	var count = 0;

	server.on('connection', function (ws) {
		console.log(ws + '上线')
		count ++
		broadcast(JSON.stringify({count}))
		ws.on('message', function (message) {
			addChatLog(JSON.parse(message),(newMessage)=>{
				broadcast(JSON.stringify(newMessage));
			});
		})
		ws.on('close', function () {
			//global.gc()//调用内存回收
			console.log('离开');
			count --
			broadcast(JSON.stringify({count}))
		})
	})

	function broadcast(msg) {
		server.clients.forEach(c=>{
			c.send(msg)
		})
	}
}

//新增
const addChatLog= (data,fn)=>{
	var sql = `insert into chatlog(chat_content,chat_datetime,role,role_user_id) values(?,now(),?,?)`;

	var sqlParams = [data.chat_content,data.role,data.role_user_id]
	console.log('sql:'+sql)
	console.log('sqlParams:'+sqlParams)
	db.query(sql,sqlParams,function (error, results) {
		if(error){
			console.log('插入失败'+error)
		}else{
			console.log(results)
			console.log('插入成功')
			fn({
				...data,
				chat_log_id:results.insertId
			})
		}
		//db.end();
	});
	
}

module.exports = WsServer;