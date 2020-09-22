function animate(obj,target,callback) {
    //清除对象之前的定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        //将步长值写到定时器中
        var step = (target-obj.offsetLeft)/10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // var step = 1;

        if(obj.offsetLeft == target) {
            //停止动画，本质是停止定时器
            clearInterval(obj.timer);
            //回调函数写道定时器里面里面
            // if(callback) {
            //     //调用回调函数
            //     callback();
            // }
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    },15);
}