const {db}=require(process.cwd()+'/models/index')
	
//查
//留言板回复
//查
const informationreplySelectModel=(req,res)=>{
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
	
	var sql = `select i.replyId,i.themeId,i.replyContent,i.replyTime,i.stuNo,s.stuName 
		from informationreply i 
		join student s 
		on i.stuNo = s.stuNo
		where i.themeId=${getData.themeId};
		select count(*)as count from informationreply where themeId=${getData.themeId}`;
	if(getData.pageNo&&getData.pageSize){
		sql = `select i.replyId,i.themeId,i.replyContent,i.replyTime,i.stuNo,s.stuName 
		from informationreply i 
		join student s 
		on i.stuNo = s.stuNo
		where i.themeId=${getData.themeId}
		limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
		select count(*)as count from informationreply where themeId=${getData.themeId}`;
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
//新增
const informationreplyAddModel=(req,res)=>{
	//1.接受数据
	let getData=req.body;
	// let getData='';
	// req.on('data',function(chunk){
	// 	getData+=chunk
	// })
	// req.on('end',function(){
	// 	getData=JSON.parse(getData)
	// })
	var sql = `insert into informationreply(themeId,replyContent,stuNo,replyTime) values(?,?,?,now())`;

	var sqlParams = [getData.themeId,getData.replyContent,getData.stuNo]
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
const informationreplyDelModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	if(!getData||!getData.replyId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	
	var sqlParams =getData.replyId
	// sqlParams =[getData.replyId.substring(0,getData.replyId.lastIndexOf(','))]
	 sqlParams =sqlParams.replace(/,/g, "','")
	 var sql = `delete from informationreply where replyId in ('${sqlParams}')`;
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
	informationreplySelectModel,
	informationreplyAddModel,
	informationreplyDelModel
}