const {db}=require(process.cwd()+'/models/index')

//查看各楼外来人员登记列表
const outsidersSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	var sql = `select o.guestName,o.guestTime,r.roomNo,o.guestContent,da.username
	from outsiders o
	join room r on o.roomId = r.roomId
	join dormitoryadmin da  on o.dormitoryAdminId = da.dormitoryAdminId
	order by o.guestId;
	select count(*)as count from outsiders o
	join room r on o.roomId = r.roomId
	join dormitoryadmin da  on o.dormitoryAdminId = da.dormitoryAdminId
	order by o.guestId
	`;
	if(getData.pageNo&&getData.pageSize){
		sql = `select o.guestName,o.guestTime,r.roomNo,o.guestContent,da.username
	from outsiders o
	join room r on o.roomId = r.roomId
	join dormitoryadmin da  on o.dormitoryAdminId = da.dormitoryAdminId
	order by o.guestId limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
	select count(*)as count from outsiders o
	join room r on o.roomId = r.roomId
	join dormitoryadmin da  on o.dormitoryAdminId = da.dormitoryAdminId
	order by o.guestId
	;`;
	}
	//var sqlParams = 
	console.log('sql:'+sql)
	db.query(sql, function (error, results) {
		if(error){
			console.log('查询失败'+error)
			res.send({
				meta:{
					flag:false,
					msg:error
				}
			})
		}else{
			console.log(results[0])
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



module.exports={
	outsidersSelectModel
}