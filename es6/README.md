<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [ES6](#es6)
  - [promise](#promise)
  - [async  await](#async--await)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# ES6

[^特别是说明]: 此笔记是在学习node过程中记录，部分案例使用的node代码。

```javascript
/* let  const*/
let a = 123; //声明变量
const b = 456;// 声明常量：声明时必须赋值，不能更改

/*对象中属性与方法的简写*/

var shuxing = 123;

var obj = {
	shuxing,
	fangfa(){},
	name:"123"
}

/*模板字符串*/

var str = `这是使用es6的方式，声明的一个字符串。可以
			换行写
			还可以直接调用变量 ${name}

           `

/*箭头函数*/
var fn = ()=>{}
```

## promise

> 参考文档: [ES6标准入门][http://es6.ruanyifeng.com/]

fs文件操作api都是异步操作，且原生方法没有被promise封装，这里使用使用promise封装fs的文件操作api

> 1.0版本

```javascript
//使用promise封装异步的文件读取函数
var p1 =  new Promise(function(resove, reject) {
        fs.readFile("01.txt", "utf8", function(err, data) {
            if (err) {
                reject(err)
            } else {
                resove(data)
            }
        })
    })
//使用promise封装异步的文件读取函数
var p2 = new Promise(function(resove, reject) {
        fs.readFile("01.txt", "utf8", function(err, data) {
            if (err) {
                reject(err)
            } else {
                resove(data)
            }
        })
    })
//使用.then()获取异步操作的结果  两个回调函数（成功回调，失败回调） 这里没写失败回调

p1
    .then(function(data){
    console.log(data)
    return p2
})
    .then(function(data){
    console.log(data)
})


```

> 稍微封装通用函数 2.0

```javascript
//使用promise封装通用的函数
var myReadFile = function(path) {
    return new Promise(function(resove, reject) {
        fs.readFile(path, "utf8", function(err, data) {
            if (err) {
                reject(err)
            } else {
                resove(data)
            }
        })
    })
}
//调用函数
myReadFile("a.txt")
    .then(function(data){
    	console.log(data)
    	return myReadFile("b.txt")
	})
	.then(function(data){
    	console.log(data)
	})
```

> jquery的  ajax 和 mongoose 提供的方法都是经过promise 封装过的，可是直接使用.then()

> promise有多重使用方式，人老了脑子不好使，我也看不懂就不写了。
>
> 这里补充一个你肯定会用到的使用方式

```javascript
myReadFile("a.txt")
    .then(function(data){
    	console.log(data)
    	return myReadFile("b.txt")
	})
	.then(function(data){
    	console.log(data)
	})
    .catch(function(err){
    	//上边两个异步操作，有一个异常就会执行这里的。
    	//异常处理可以更加精细，具体的使用方式，自行百度
	})
.
```

## async  await

> async 和 await 是两个独立的关键字，一般会放在一起使用，这是因为 await 必须在async修饰的方法中使用。 （这个关键字的作用完全相反，都是用来调教 promise 对象的）

> async 可以把一个正常函数直接变成promise封装之后的

> await 把一个异步的函数，变为同步执行。

- async 可以将任意函数变为promise封装后的函数，函数中使用return data  相当于 resove(data)，使用throw data 相当于 reject(data)

```javascript
async function test(data){
	if(data){
		return "传入了正确的data"
	}else{
		throw "传入了错误的data"
	}
}

test(true).then((data)=>console.log(data),(data)=>console.log(data)) //传入了正确的data
test(false).then((data)=>console.log(data),(data)=>console.log(data))//传入了错误的data
```

- await 可以同步获取promise封装的异步函数中的返回值。(强行将promise的异步执行变为同步执行)

```javascript
server.use(async function(ctx) {
    var data = await new Promise(function(res, rej) {
        fs.readFile("./test.txt", "utf8", function(err, data) {
            if (err) {
                rej(err)
            } else {
                res(data)
            }
        })
    })
    console.log(data)
    console.log(123)
    //数据
    //123
})
```

