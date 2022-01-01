const {db}=require(process.cwd()+'/models/index')
	
//查
//交住宿费信息
//查
const dormitorypaymentSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	
	var sql = `select * from dormitorypayment 
	where dormitoryadminId = ${req.session.dormitoryAdminId||null}  order by dormitoryPaymentId;
	select count(*)as count from dormitorypayment where dormitoryadminId = ${req.session.dormitoryAdminId||null};
	select stuNo,stuName,sex from student where stuNo not in (select stuNo from dormitorypayment)`;
	if(getData.pageNo&&getData.pageSize){
		sql = `select * from dormitorypayment
	where dormitoryadminId = ${req.session.dormitoryAdminId||null}  order by dormitoryPaymentId limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
	select count(*)as count from dormitorypayment where dormitoryadminId = ${req.session.dormitoryAdminId||null};
	select stuNo,stuName,sex from student where stuNo not in (select stuNo from dormitorypayment)`
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
			var dataArr = []
			for(var item of results[2]){
				var obj ={}
				obj.stuNo = item.stuNo
				obj.stustr = item.stuNo+'--'+item.stuName+'--'+item.sex
				dataArr.push(obj)
			}
			res.send({
				meta:{
					state:200,
					flag:true,
					msg:"查询成功"
				},
				data:results[0],
				total:results[1][0].count,
				studentdata:dataArr
			})
		}
		//db.end();
	});
	
}
//新增
const dormitorypaymentAddModel=(req,res)=>{
	//1.接受数据
	let getData=req.body;
	// let getData='';
	// req.on('data',function(chunk){
	// 	getData+=chunk
	// })
	// req.on('end',function(){
	// 	getData=JSON.parse(getData)
	// })
	var sql = `insert into dormitorypayment(paymentSemester,paymentMoney,paymentTime,stuNo,dormitoryadminId) values(?,?,now(),?,?)`;
	
	var sqlParams = [getData.paymentSemester,getData.paymentMoney,getData.stuNo,req.session.dormitoryAdminId||null]
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
//编辑
const dormitorypaymentUpdateModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	// let getData=req.body;
	console.log(getData)
	
	if(!getData.dormitoryPaymentId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	var sql = `update dormitorypayment set paymentSemester=?,paymentMoney=?,paymentTime=(now()),stuNo=? where dormitoryPaymentId=?`;

	var sqlParams = [getData.paymentSemester,getData.paymentMoney,getData.stuNo,getData.dormitoryPaymentId]
	console.log('sql:'+sql)
	console.log('sqlParams:'+sqlParams)
	db.query(sql,sqlParams,function (error, results) {
		if(error){
			console.log('编辑失败'+error)
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
					msg:"编辑成功"
				},
				//data:results
			})
		}
		//db.end();
	});
	
}
//删除
const dormitorypaymentDelModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	if(!getData||!getData.dormitoryPaymentId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	
	var sqlParams =getData.dormitoryPaymentId
	// sqlParams =[getData.dormitoryPaymentId.substring(0,getData.dormitoryPaymentId.lastIndexOf(','))]
	 sqlParams =sqlParams.replace(/,/g, "','")
	 var sql = `delete from dormitorypayment where dormitoryPaymentId in ('${sqlParams}')`;
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
	dormitorypaymentSelectModel,
	dormitorypaymentAddModel,
	dormitorypaymentUpdateModel,
	dormitorypaymentDelModel
}