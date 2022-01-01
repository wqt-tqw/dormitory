const {db}=require(process.cwd()+'/models/index')
	
//查
//留言板主题
//查
const messageBoardSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	
	var sql = `select m.themeId,m.title,m.content,m.messageTime,m.stuNo,s.stuName 
		from messageinformation m 
		join student s 
		on m.stuNo = s.stuNo;
		select count(*)as count from messageinformation`;
	if(getData.pageNo&&getData.pageSize){
		sql = `select m.themeId,m.title,m.content,m.messageTime,s.stuName 
		from messageinformation m 
		join student s 
		on m.stuNo = s.stuNo
		limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
		select count(*)as count from messageinformation`;
	}
	//var sqlParams = 
	console.log('sql:'+sql)
	db.query(sql,function (error, results) {
		if(error){
			console.log('查询失败'+error)
			res.send({
				meta:{
					flag:false,
					msg:error
				}
			})
		}else{
			console.log(results)
			res.send({
				meta:{
					state:200,
					flag:true,
					msg:"查询成功"
				},
				data:results[0],
				total:results[1][0].count
			})
		}
		//db.end();
	});
	
}

//根据id查数据
const messageBoardGetModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	
	if(!getData||!getData.themeId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	var sql = `select m.themeId,m.title,m.content,m.messageTime,m.stuNo,s.stuName 
		from messageinformation m 
		join student s 
		on m.stuNo = s.stuNo
		where m.themeId=${getData.themeId};`;

	//var sqlParams = 
	console.log('sql:'+sql)
	db.query(sql,function (error, results) {
		if(error){
			console.log('查询失败'+error)
			res.send({
				meta:{
					flag:false,
					msg:error
				}
			})
		}else{
			console.log(results)
			res.send({
				meta:{
					state:200,
					flag:true,
					msg:"查询成功"
				},
				data:results
			})
		}
		//db.end();
	});
	
}
//新增
const messageBoardAddModel=(req,res)=>{
	//1.接受数据
	let getData=req.body;
	// let getData='';
	// req.on('data',function(chunk){
	// 	getData+=chunk
	// })
	// req.on('end',function(){
	// 	getData=JSON.parse(getData)
	// })
	var sql = `insert into messageinformation(title,content,stuNo,messageTime) values(?,?,?,now())`;

	var sqlParams = [getData.title,getData.content,getData.stuNo]
	console.log('sql:'+sql)
	console.log('sqlParams:'+sqlParams)
	db.query(sql,sqlParams,function (error, results) {
		if(error){
			console.log('插入失败'+error)
			res.send({
				meta:{
					flag:false,
					msg:error
				}
			})
		}else{
			console.log(results)
			res.send({
				meta:{
					state:200,
					flag:true,
					msg:"插入成功"
				},
				data:results.insertId
			})
		}
		//db.end();
	});
	
}

//删除
const messageBoardDelModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	if(!getData||!getData.themeId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	
	var sqlParams =getData.themeId
	// sqlParams =[getData.themeId.substring(0,getData.themeId.lastIndexOf(','))]
	 sqlParams =sqlParams.replace(/,/g, "','")
	 var sql = `delete from informationreply where themeId in ('${sqlParams}');
	 delete from messageinformation where themeId in ('${sqlParams}')`;
	 console.log('sqlParams:'+sqlParams)
	 console.log('sql'+sql)
	db.query(sql,function (error, results) {
		if(error){
			console.log('删除失败'+error)
			res.send({
				meta:{
					flag:false,
					msg:error
				}
			})
		}else{
			console.log(results)
			res.send({
				meta:{
					state:200,
					flag:true,
					msg:"删除成功"
				},
			})
		}
		//db.end();
	});
	
}

module.exports={
	messageBoardSelectModel,
	messageBoardGetModel,
	messageBoardAddModel,
	messageBoardDelModel
}