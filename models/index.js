var db    = {};
var mysql = require('mysql');
// var connection  = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password:"123456",
// 	database: "dormitory"
// 	})
// 	connection.connect(err=>{
// 		if(err){
// 			console.log("-------------------------")
// 			console.log('数据库连接失败：',err)
// 			console.log("-------------------------")
// 			return;
// 		}
// 		console.log('数据库连接成功');
// 	});
var pool  = mysql.createPool({
	multipleStatements: true,
	connectionLimit : 10,
	host: "localhost",
	user: "root",
	password:"123456",
	dateStrings: true,
	database: "dormitory"
});
pool.getConnection(function(err, connection){
	if(err){
		console.log("-------------------------")
		console.log('数据库连接失败：',err)
		console.log("-------------------------")
		return;
	}else{
		console.log('数据库连接成功');
		
		db.query = function(){
		  var sql,para,callback;
		  if (arguments.length == 2) {
		    sql = arguments[0];
		    callback = arguments[1];
		  } else {
		    sql = arguments[0];
		    para = arguments[1];
		    callback = arguments[2];
		  }
		  if (!sql) {  
		    callback();  
		    return;  
		  }
		  if (!para) {
		    para = [];
		  }
		  pool.query(sql, para, function(error, results, fields) {  
		    if (error) {  
		      console.log(error);  
		      callback(error, null);  
		      return;  
		    };
		    callback(null, results, fields);  
		  });
		}
	}
	connection.release();
})

//嵌套查询
function getResult(sql){ 
    return new Promise(function(resolve,reject){ 
		db.query(sql, function(err, result){ 
			 if(err){ 
				reject(err) 
			 }else{ 
				resolve(result) 
			 } 
		}) 
    }) 
} 
 
module.exports = {
	db,
	getResult
};

