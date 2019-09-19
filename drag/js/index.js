function Drag() {
    this.mouseDown = false;
    this.mouseDownPosition = {
        clientX: 0,
        clientY: 0
    };
    this.lastOffset = {
        offsetX: 0,
        offsetY: 0
    };
    this.initialPosition = {
        offsetX: 222,
        offsetY: 93
    };
    this.state = {
        offsetX: 0,
        offsetY: 0
    }
    this.target = document.querySelector('.target');
    this.container = document.querySelector('.container');
    this.move();
    this.initEvent();
}

Drag.prototype.initEvent = function () {
    this.target.addEventListener('mousedown', (e) => {
        this.mouseDown = true;
        this.mouseDownPosition.clientX = e.clientX;
        this.mouseDownPosition.clientY = e.clientY;
    });
    this.target.addEventListener('mouseup', (e) => {
        this.mouseDown = false;
        this.lastOffset = {
            offsetX: this.state.offsetX,
            offsetY: this.state.offsetY
        };
    })
    document.addEventListener("mousemove", (e) => {
        if (this.mouseDown) {
            this.state = {
                offsetX: e.clientX - this.mouseDownPosition.clientX + this.lastOffset.offsetX,
                offsetY: e.clientY - this.mouseDownPosition.clientY + this.lastOffset.offsetY
            }
            this.move();
        }
    });
    document.addEventListener("mouseup", (e) => {
        this.mouseDown = false;
    });
}
Drag.prototype.move = function () {
    this.container.style['left'] = this.state.offsetX + this.initialPosition.offsetX + 'px';
    this.container.style['top'] = this.state.offsetY + this.initialPosition.offsetY + 'px';
}
new Drag();