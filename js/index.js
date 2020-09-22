window.addEventListener('load',function() {

    //获取元素
    var focus = document.querySelector('.focus');
    var arrow_left = document.querySelector('.arrow_left');
    var arrow_right = document.querySelector('.arrow_right');
    //focus的宽度
    var focusWidth = focus.offsetWidth;

    //鼠标经过focus就显示左右隐藏的按钮
    focus.addEventListener('mouseenter',function() {
        arrow_left.style.display = 'block';
        arrow_right.style.display = 'block';
        //停止定时器功能
        clearInterval(timer);
        timer = null;
    })

    focus.addEventListener('mouseleave',function() {
        arrow_left.style.display = 'none';
        arrow_right.style.display = 'none';
        //开启定时器功能
        timer = setInterval(() => {
            //手动调用事件
            arrow_right.click();
        }, 2000);
    })

    //动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    for(var i =0;i<ul.children.length;i++) {
        var li = document.createElement('li');
        //记录小圆圈的索引
        li.setAttribute('data-index',i);
        ol.appendChild(li);
        //在生成小圆圈的同时绑定点击事件
        li.addEventListener('click',function() {
            for(var i =0;i<ol.children.length;i++) {
                ol.children[i].className = ''
            }
            //当前的li设置类名current
            this.className = 'current'
            var index = this.getAttribute('data-index');
            //当我们点击某个小圆点，将这个索引给num
            num = index;
            //当我们点击某个小圆点，将这个索引给circle
            circle = index;
            animate(ul,-(index * focusWidth))
        })
    }
    //将第一个li设置类名current
    ol.children[0].className = 'current';

    //克隆ul的一个的li,放到ul最后
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    //点击右侧按钮，滚动一张
    var num = 0;
    var circle = 0;
    //flag 节流阀
    var flag = true;
    arrow_right.addEventListener('click',function() {
        if(flag) {
            flag = false;
            //复制最后一张，无缝滚动，ul快速复原 left = 0
            if(num == ul.children.length-1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul,-(num * focusWidth),function() {
                flag = true;
            });
            //让小圆圈一起动
            circle++;
            //如果走到最后克隆的这张图片，就circle复原为0
            if(circle == ul.children.length-1) {
                circle = 0;
            }
            circleChange();

        }
        
    });


    arrow_left.addEventListener('click',function() {
        if(flag) {
            flag = false;
            //复制最后一张，无缝滚动，ul快速复原 left = 最后一张的位置
            if(num == 0) {
                num =  ul.children.length-1;
                ul.style.left = -(num * focusWidth) + 'px';
            
            }
            num--;
            animate(ul,-(num * focusWidth),function() {
                flag = true;
            });
            //让小圆圈一起动
            circle--;
            //如果走到最后克隆的这张图片，就circle复原为olz最后一个的索引
            if(circle < 0) {
                circle = ol.children.length-1;
            }

            circleChange();
        }
    });


    function circleChange() {
        //清除所有小圆圈的类名
        for(var i =0;i<ol.children.length;i++) {
            ol.children[i].className = ''
        }
        //当前的li设置类名current
        ol.children[circle].className = 'current'
    }

    //自动轮播功能
    var timer = setInterval(() => {
        //手动调用事件
        arrow_right.click();
    }, 2000);




    //侧边栏固定滑动js模块


})