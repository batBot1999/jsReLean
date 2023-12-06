// 按值传递
var value = 1;
function foo(v) {
    v = 2;
    console.log(v);
}
foo(value);
console.log(value);
// 打印结果为2 1
// 打印2很好理解
// 打印1是因为,虽然value传给了foo,foo对v进行了修改,但只是传递了值,相当于把value复制了一份,并不会影响原来的value

// 按引用传递
var obj = {
    value: 1
}
function foo(o) {
    o.value = 2;
    console.log(o.value);
}
foo(obj);
console.log(obj.value);
// 打印结果 2 2
// 对象传给方法,方法内部修改对象属性,外部对象属性也发生变化,说明指向地址

// 所以,按引用类型区分,基本数据类型传值,引用数据类型传真实的物理地址

// 基本数据类型存在栈里
// 引用数据类型存在栈里的是地址指针,数据存在堆里
// 所以栈内先存了obj指针地址 堆内存了obj: {value: 2},然后函数foo使栈内又存入了o指针地址,但obj指针地址和o指针地址指向的都是同一个栈数据,所以修改o.value会影响到obj.value 

// 手写题
// call 在使用指定的this值和若干个参数前提下,调用方法.
let foo = {
    value: 1,
};
function bar () {
    console.log(this.value);
}
bar.call(foo);
// 用bar去调用,bar内的this指向了foo
// 相当于:foo.bar()效果如下
let foo = {
    value: 1,
    bar: function () {
        console.log(this.value);
    },
};
foo.bar();

// 相当:
// foo.fn = bar
// foo.fn()
// delete foo.fn

// 手写call
// 基础版本
Function.prototype.call2 = function (context) {
    // context => foo
    // this. => bar
    context.fn = this;
    context.fn();
    delete context.fn;
}
bar.call2(foo);
// 输出1 符合预期
// 但多个参数还没有支持
var foo = {
    value: 1
}
function bar(name, age) {
    console.log(name ,age, this.value);
}
bar.call3(foo, 'batBot', 18)
Function.prototype.call3 = function (context) { // 也可以(context, ...args)需要获取的是第一个参数以外的剩余参数
    // context => foo
    // this. => bar
    context.fn = this; // contxt.fn = bar
    let args = [...arguments].slice(1); // 去掉第一个参数
    context.fn(...args); // foo.fn('badBot', 18) 相当于 bar('badBot', 18)
    delete context.fn; // 避免给foo增加多余属性,恢复之前的情况 
} 

// apply
