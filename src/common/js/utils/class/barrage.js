export default class Barrage {
    constructor(canvas, range) {
        this.canvas = document.getElementById(canvas);
        //let rect = this.canvas.getBoundingClientRect();
        this.w = window.innerWidth;
        this.h = window.innerWidth * 0.5626;//0.5626 视频高宽比
        this.ctx = this.canvas.getContext('2d');
        this.barrageList = [];
        this.canvas.setAttribute('width', this.w)
        this.canvas.setAttribute('height', this.h)
        this.range = range || 0.5 //默认显示半屏
        //console.log(rect,this.w,this.h)
    }

    //添加弹幕列表
    //value 弹幕文字
    //src 用户头像路径
    shoot(value, src) {
        let top = this.getTop();
        let color = this.getColor();
        let offset = this.getOffset();
        let width = Math.ceil(this.ctx.measureText(value).width);

        let barrage = {
            value: value,
            top: top,
            left: this.w,
            color: color,
            offset: offset,
            width: width,
            src: src
        }
        this.barrageList.push(barrage);
    }

    //开始绘制
    draw() {
        if (this.barrageList.length) {
            this.ctx.clearRect(0, 0, this.w, this.h);
            for (let i = 0; i < this.barrageList.length; i++) {
                let b = this.barrageList[i];
                if (b.left + b.width <= -b.width * 2) {
                    this.barrageList.splice(i, 1);
                    i--;
                    continue;
                }
                b.left -= b.offset;
                this.drawText(b);
            }
        }
        requestAnimationFrame(this.draw.bind(this));
    }

    //绘制文字
    drawText(barrage) {
        this.ctx.fillStyle = barrage.color;
        this.ctx.fillText(barrage.value, barrage.left, barrage.top);
        this.ctx.font = "50px Microsoft YaHei";
        if (barrage.src) {
            let img = new Image();
            img.src = barrage.src;
            this.ctx.drawImage(img, barrage.left - 38, barrage.top - 28, 35, 35);
        }
    }

    //获取随机颜色
    getColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let color = `rgb(${r},${g},${b})`;
        return color
    }

    //获取随机top
    getTop() {
        const barrageHeight = 50
        return Math.floor(Math.random() * (this.h * this.range / barrageHeight) + 1) * barrageHeight
    }

    //获取偏移量
    getOffset() {
        return +(Math.random() * 2).toFixed(1) + 1;
    }

}