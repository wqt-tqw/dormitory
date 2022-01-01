//导入模型
const{
	/* createModel,
	listModel */
	stuModel
}=require(process.cwd()+'/models/stu')


//定义处理方法
const index= (req,res)=>{
	//res.send('this is index')
	//1.接受数据
	let getData=req.query
	console.log('接受数据'+getData.pageNo,getData.pageSize	)   

	//2.获取数据
	let data = stuModel(parseInt(getData.pageNo),parseInt(getData.pageSize))
	
	console.log('获取数据'+data)   
	//3.响应数据
	res.send({
		meta:{
			state:200,
			msg:"查询成功"
		},
		data:data
	})
}

/* const create=async(req,res)=>{
	//res.send('this is stu create')
	//1.接受数据
	let postData=req.query
	//2.过滤（忽略
	//3.操作数据库
	let rs =await createModel(postData)
	//4.判断返回
	if(rs){
		res.send({
			meta:{
				state:200,
				msg:"添加成功"
			},
			data:null
		})
	}else{
		res.send({
			meta:{
				state:500,
				msg:"添加失败"
			},
			data:null
		})
	}
} */

//列表
/**
 * @api {get} /stu 学生模块列表
 * @apiName Add
 * @apiGroup Stu
 *
 * @apiParam {Number} pageno 当前页
 * @apiParam {Number} pagesize 每页显示条数
 * 
 * @apiSuccess {String} meta 状态码&提示信息
 * @apiSuccess {String} data 数据
 */
/* const index=async (req,res)=>{
	//res.send('this is index')
	//1.接受数据
	let getData=req.query
	//console.log(getData)   { pageno: '1', pagesize: '2' }
	//2.过滤
	
	let skip =(parseInt(getData.pageno)-1)*parseInt(getData.pagesize)
	//3.获取数据
	let data =await listModel(skip,parseInt(getData.pagesize))
	//4.响应数据
	res.send({
		meta:{
			state:200,
			msg:"查询成功"
		},
		data:data
	})
} */

//导出成员
module.exports={
	//create,
	index
}