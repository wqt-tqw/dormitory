const {db}=require(process.cwd()+'/models/index')

//登录
//查
const registerModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	var _from = ''
	var _username = 'username'
	console.log(':role'+getData.role)

	if(getData.role==1){
		_from = 'admin'
	}else if(getData.role==2){
		_from = 'dormitoryadmin'
	}else if(getData.role==3){
		_from = 'teacher'
	}else if(getData.role==4){
		_from = 'student'
		_username = 'stuNo'
	}else if(getData.role==5){
		_from = 'instructor'
	}
	
	var sql = `select * from ${_from} where ${_username} = ? and password = ?`;
	
	var sqlParams = [getData.username,getData.password]
	console.log('sql:'+sql)
	db.query(sql,sqlParams,function (error, results) {
		if(error){
			console.log('登录失败'+error)
			res.send({
				meta:{
					flag:false,
					msg:error
				}
			})
		}else{
			console.log(results)
			if(results.length==0){
				res.send({
					meta:{
						state:200,
						flag:false,
						msg:"登录失败"
					}
				})
			}else{
				req.session.role = getData.role
				
				var primarykeyId = ''
				if(getData.role==1){
					req.session.id = results[0].id||''
					primarykeyId = results[0].id||''
				}else if(getData.role==2){
					req.session.dormitoryAdminId = results[0].dormitoryAdminId||''
					primarykeyId = results[0].dormitoryAdminId||''
				}else if(getData.role==3){
					req.session.teacherId = results[0].teacherId||''
					primarykeyId = results[0].teacherId||''
				}else if(getData.role==4){
					req.session.stuNo = results[0].stuNo||''
					primarykeyId = results[0].stuNo||''
				}else if(getData.role==5){
					req.session.instructorId = results[0].instructorId||''
					primarykeyId = results[0].instructorId||''
				}
				res.send({
					meta:{
						state:200,
						flag:true,
						msg:"登录成功"
					},
					data:{username:results[0].username||results[0].stuNo,primarykeyId:primarykeyId}
				})
			}
		}
		//db.end();
	});
	
}

//修改密码
const changePasswordModel=(req,res)=>{
	//1.接受数据
	// let getData=req.query;
	let getData=req.body;
	console.log(getData)
	
	if(!(getData.primarykeyId&&getData.password)){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	var _from = ''
	var _primarykeyId = ''
	console.log(':role'+getData.role)
	
	if(getData.role==1){
		_from = 'admin'
		_primarykeyId = 'id'
	}else if(getData.role==2){
		_from = 'dormitoryadmin'
		_primarykeyId = ''
	}else if(getData.role==3){
		_from = 'teacher'
		_primarykeyId = 'teacherId'
	}else if(getData.role==4){
		_from = 'student'
		_primarykeyId = 'stuNo'
	}else if(getData.role==5){
		_from = 'instructor'
		_primarykeyId = 'instructorId'
	}

	var sql = `update ${_from} set password=? where ${_primarykeyId}=?`;

	var sqlParams = [getData.password,getData.primarykeyId]
	console.log('sql:'+sql)
	console.log('sqlParams:'+sqlParams)
	db.query(sql,sqlParams,function (error, results) {
		if(error){
			console.log('更新失败'+error)
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
					msg:"更新成功"
				},
				//data:results
			})
		}
		//db.end();
	});
	
}

module.exports={
	registerModel,
	changePasswordModel
}