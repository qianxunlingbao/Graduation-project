//导入数据库
var mysql = require("mysql");
var express = require("express");
var app = express();
var multer = require('multer');
var fs = require('fs');
var path = require("path");
var buf = new Buffer.alloc(1024)

app.use('/public', express.static('public'));
app.use(multer({ dest: '/tmp/' }).array('image'));
//创建连接对象
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'test'
})

//连接数据库
connection.connect();

//获取学生1列表
app.get('/sturange', function (req, res) {
    //操作数据库
    var sql = `select * from stu where id>99`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("连接失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("连接成功");
            console.log(result)
            res.send(result)
        }
    });
})

//学生更新密码
app.get('/updatePassword/:password/:num', function (req, res) {
    //添加毕设选题
    console.log(req.params.password)
    console.log(req.params.num)
    var sql = `update stu set password='${req.params.password}' where id=${req.params.num}`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("添加失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("添加成功");
            console.log(result)
            res.send(result)
        }
    });
})

//学生更新完成度
app.get('/updateWorkload/:workload/:num', function (req, res) {
    //添加毕设选题
    console.log(req.params.workload)
    console.log(req.params.num)
    var sql = `update stu set workload='${req.params.workload}' where id=${req.params.num}`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("添加失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("添加成功");
            console.log(result)
            res.send(result)
        }
    });
})

//学生更新院系
app.get('/updateCollege/:college/:num', function (req, res) {
    //添加毕设选题
    console.log(req.params.college)
    console.log(req.params.num)
    var sql = `update stu set college='${req.params.college}' where id=${req.params.num}`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("添加失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("添加成功");
            console.log(result)
            res.send(result)
        }
    });
})

//学生更新班级
app.get('/updateClassroom/:classroom/:num', function (req, res) {
    //添加毕设选题
    console.log(req.params.classroom)
    console.log(req.params.num)
    var sql = `update stu set classroom='${req.params.classroom}' where id=${req.params.num}`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("添加失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("添加成功");
            console.log(result)
            res.send(result)
        }
    });
})

//学生更新姓名
app.get('/updateName/:name/:num', function (req, res) {
    //添加毕设选题
    console.log(req.params.name)
    console.log(req.params.num)
    var sql = `update stu set name='${req.params.name}' where id=${req.params.num}`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("添加失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("添加成功");
            console.log(result)
            res.send(result)
        }
    });
})

//学生添加问题
app.get('/addtro/:id/:troitem', function (req, res) {
    console.log(req.params)
    var sql = `insert into trouble(id,troitem) values (${req.params.id},'${req.params.troitem}')`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("添加失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("添加成功");
            console.log(result)
            res.send(result)
        }
    });
})

//学生选题，选题容量并进行改变
app.get('/addproject/:proname/:margin/:num', function (req, res) {
    //添加毕设选题
    console.log(req.params.proname)
    console.log(req.params.num)
    console.log(req.params.margin)
    var sql = `update stu set topic='${req.params.proname}' where id=${req.params.num}`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("更新毕设失败")
            console.log('[select error - ', err.message)
        } else {
            var sql1 = `update pro set margin='${req.params.margin - 1}' where margin=${req.params.margin}`;
            connection.query(sql1, [], function (err, result) {
                if (err) {
                    console.log("更新失败")
                    console.log('[select error - ', err.message)
                } else {
                    console.log("添加成功");
                    console.log(result)
                    res.send(result)
                }
            });
        }
    });
})

//学生撤销选题，选题容量并进行改变
app.get('/noselectpro/:margin/:num', function (req, res) {
    console.log(req.params.num)
    console.log(req.params.margin)
    var sql = `update stu set topic='' where id=${req.params.num}`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("更新毕设失败")
            console.log('[select error - ', err.message)
        } else {
            var number1 = parseInt(req.params.margin) + 1
            var sql1 = `update pro set margin='${number1}' where margin=${req.params.margin}`;
            connection.query(sql1, [], function (err, result) {
                if (err) {
                    console.log("更新失败")
                    console.log('[select error - ', err.message)
                } else {
                    console.log("撤销成功");
                    console.log(result)
                    res.send(result)
                }
            });
        }
    });
})

//获取学生列表
app.get('/stu', function (req, res) {
    //操作数据库
    var sql = `select * from stu`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("连接失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("连接成功");
            console.log(result)
            res.send(result)
        }
    });
})

//获取特定学生信息
app.get('/stu/:num', function (req, res) {
    //操作数据库
    console.log(req.params.num)
    var sql = `select * from stu where id = ${req.params.num}`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("连接失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("连接成功");
            console.log(result)
            res.send(result)
        }
    });
})

//删除学生
app.get('/deletestu/:id', function (req, res) {
    var sql = `delete from stu where id = ${req.params.id}`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("删除失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("删除成功");
            console.log(result)
            res.send(result)
        }
    });
})

//添加学生
app.get('/addstu/:id/:name/:classroom/:college/:password', function (req, res) {
    console.log(req.params)
    var sql = `insert into stu(id,name,classroom,college,score,topic,workload,password) values (${req.params.id},'${req.params.name}','${req.params.classroom}','${req.params.college}',0,'','0%','${req.params.password}')`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("添加失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("添加成功");
            console.log(result)
            res.send(result)
        }
    });
})

//获取问题列表
app.get('/trouble', function (req, res) {
    //操作数据库
    var sql = `select * from trouble`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("连接失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("连接成功");
            console.log(result)
            res.send(result)
        }
    });
})

//删除问题
app.get('/deleteTrouble/:id', function (req, res) {
    var sql = `delete from trouble where id = ${req.params.id}`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("删除失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("删除成功");
            console.log(result)
            res.send(result)
        }
    });
})

//添加问题
app.get('/addTrouble/:id/:troitem/:troans', function (req, res) {
    console.log(req.params)
    var sql = `insert into trouble(id,troitem,troans) values (${req.params.id},'${req.params.troitem}','${req.params.troans}')`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("添加失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("添加成功");
            console.log(result)
            res.send(result)
        }
    });
})

//回答问题
app.get('/answerTrouble/:id/:troans', function (req, res) {
    var sql = `update trouble set troans='${req.params.troans}' where id = ${req.params.id}`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("回答失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("回答成功");
            console.log(result)
            res.send(result)
        }
    });
})

//获取用户列表
app.get('/users', function (req, res) {
    //操作数据库
    var sql = `select * from users`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("连接失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("连接成功");
            console.log(result)
            res.send(result)
        }
    });
})

//删除用户
app.get('/deleteUsers/:id', function (req, res) {
    var sql = `delete from users where id = ${req.params.id}`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("删除失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("删除成功");
            console.log(result)
            res.send(result)
        }
    });
})

//添加用户
app.get('/addUser/:id/:username/:userpassword', function (req, res) {
    console.log(req.params)
    var sql = `insert into users(id,username,userpassword) values (${req.params.id},'${req.params.username}','${req.params.userpassword}')`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("添加失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("添加成功");
            console.log(result)
            res.send(result)
        }
    });
})

//获取毕业设计列表
app.get('/pro', function (req, res) {
    //操作数据库
    var sql = "select * from pro";
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("连接失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("连接成功");
            console.log(result)
            res.send(result)
        }
    });
})

//模糊查询
app.get('/check/:proname', function (req, res) {
    //操作数据库
    console.log(req.params.proname)
    var sql = `select * from pro where proname like '%${req.params.proname}%'`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("查询失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("查询成功");
            console.log(result)
            res.send(result)
        }
    });
})

//删除毕业设计
app.get('/deletePro/:id', function (req, res) {
    var sql = `delete from pro where id = ${req.params.id}`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("删除失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("删除成功");
            console.log(result)
            res.send(result)
        }
    });
})

//添加毕业设计
app.get('/addPro/:id/:proname/:prohard/:margin/:content', function (req, res) {
    var sql = `insert into pro(id,proname,prohard,protea,prostu,margin,content) values (${req.params.id},'${req.params.proname}','${req.params.prohard}','0','0',${req.params.margin},${req.params.content})`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("添加失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("添加成功");
            console.log(result)
            res.send(result)
        }
    });
})


app.get('/websites1', function (req, res) {
    var addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
    var addSqlParams = ['菜鸟一号', 'https://c.runoob.com', '28', 'CN'];
    //增
    connection.query(addSql, addSqlParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------INSERT----------------------------');
        //console.log('INSERT ID:',result.insertId);        
        console.log('INSERT ID:', result);
        console.log('-----------------------------------------------------------------\n\n');
    });
    var sql1 = "select * from websites";
    console.log(4)
    connection.query(sql1, [], function (err, result) {
        if (err) {
            console.log("连接失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("连接成功");
            console.log(result)
            res.send(result)
        }
    });
})

//查询
app.get('/websites/:id', function (req, res) {
    console.log(req.params)
    const id = req.params.id
    var sql1 = `select * from websites where id=?`;
    console.log(4)
    connection.query(sql1, [id], function (err, result) {
        if (err) {
            console.log("连接失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("连接成功");
            console.log(result)
            res.send(result)
        }
    });
})

//文件上传
app.post('/file_upload', function (req, res) {
    console.log(req.files[0]);  // 上传的文件信息
    var des_file = __dirname + "/public/images/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                };
            }
            res.send(JSON.stringify(response));
            //res.send('文件上传成功！！！')
        });
    });
})

//获取文件目录
app.get('/public/images', function (req, res) {
    var pathName = "E:/Graduation-project/blog/public/images/public/images";
    fs.readdir(pathName, function (err, files) {
        var dirs = [];
        (function iterator(i) {
            if (i == files.length) {
                console.log(dirs);
                return res.send(dirs);
            }
            fs.stat(path.join(pathName, files[i]), function (err, data) {
                if (data.isFile()) {
                    dirs.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
    });
})

//获取通知公告
app.get('/notice', function (req, res) {
    //操作数据库
    var sql = `select * from notice`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("获取通告失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("获取通告成功");
            console.log(result)
            res.send(result)
        }
    });
})
//发布公告
app.get('/addnotice/:content', function (req, res) {
    console.log(req.params)
    var sql = `insert into notice(content) values('${req.params.content}')`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("发布通告失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("发布通告成功");
            console.log(result)
            res.send(result)
        }
    });
})

//删除通告
app.get('/deletenotice/:id', function (req, res) {
    var sql = `delete from notice where id = ${req.params.id}`;
    connection.query(sql, [], function (err, result) {
        if (err) {
            console.log("删除失败")
            console.log('[select error - ', err.message)
        } else {
            console.log("删除成功");
            console.log(result)
            res.send(result)
        }
    });
})
var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
