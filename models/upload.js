const {db}=require(process.cwd()+'/models/index')

// const multer = require('multer')
const fs = require('fs')
const path = require('path')

const path_name = 'http://localhost:3000/'

const uploadModel=(req,res)=>{	
	console.log(req.files)
	console.log(req.body.module)
	const files = req.files;
	const fileList = [];
	for(var i in files){
	  var file = files[i];
	  // fs.renameSync(file.path,`public/uploads/${req.body.module}/${file.originalname}`);
	  file.path = `uploads/${req.body.module}/${file.originalname}`;
	  fileList.push(file)
	}
	console.log(fileList);
	
	var sql = `insert into enclosure(enclosureName,enclosureUrl) values(?,?)`;
	
	var sqlParams = [fileList[0].originalname,path_name+fileList[0].path]
	console.log('sql:'+sql)
	console.log('sqlParams:'+sqlParams)
	
	db.query(sql,sqlParams,function (error, results) {
		if(error){
			console.log('上传失败'+error)
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
					msg:"上传成功"
				},
				enclosureId:results.insertId
			})
		}
		//db.end();
	});
}

/**
 * 判读路径是否存在,如不存在创建文件夹
 * @param pathStr 参数要用path.join()拼接,项目下的相对路径
 * @return projectPath 返回绝对路径,可要可不要
 */
function mkdirPath(pathStr) {
    var projectPath=path.join(process.cwd());
    var tempDirArray=pathStr.split('\\');
    for (var i = 0; i < tempDirArray.length; i++) {
        projectPath = projectPath+'/'+tempDirArray[i];
        if (fs.existsSync(projectPath)) {
            var tempstats = fs.statSync(projectPath);
            if (!(tempstats.isDirectory())) {
                fs.unlinkSync(projectPath);
                fs.mkdirSync(projectPath);
            }
        }
        else{
            fs.mkdirSync(projectPath);
        }
    }
	console.log('projectPath:'+projectPath)
    return projectPath;
}

module.exports={
	uploadModel,
	mkdirPath
}