

class Actor{
	constructor(id, type, pos = [0,0], size = 20, rotation = 0) {
	
 
	this.state = {
		type: type,
		id: id,
		pos: pos,
		size: size,
        rotation:rotation
	}

	}

	exportState() {
	

		return this.state;
	}
	
	importState(state) {
		this.state=state;
	}

	update(sea) {
		
		
		if(this.obeysBoundarys) this.bounceAway(new Victor(0,0), sea.size);
		
	}
	post_update(sea) {
		
	}



	bounceAway(topLeft, botRight) {
		
			this.state.pos.x = Math.max(botRight.x, Math.min(this.state.pos[0], topLeft.x));
			this.state.pos.y = Math.max(botRight.y, Math.min(this.state.pos[1], topLeft.y));
		
		
	}

	

		draw(ctx, vis){
			let vist = vis.byname(this.state.type);
			if (vist.img == "#") {
			ctx.fillStyle = vist.image;
			let centerPos = new Victor(this.state.pos[0], this.state.pos[1]);
			ctx.save();
			ctx.translate(centerPos.x, centerPos.y);
			ctx.rotate(this.ang);
			ctx.lineWidth = 4;
			ctx.strokeStyle = "#cecefe";
			ctx.beginPath();
			ctx.moveTo(0, this.size.y / 2);
			ctx.lineTo(this.size.x / 2, -this.size.y / 2);
			ctx.lineTo(0, -this.size.y / 3);
			ctx.lineTo(-this.size.x / 2, -this.size.y / 2);
			ctx.lineTo(0, this.size.y / 2);
			ctx.closePath();
			ctx.stroke();
			//ctx.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
			ctx.restore();
		} else {
			let centerPos = new Victor(this.state.pos[0], this.state.pos[1]);
			ctx.save();
			ctx.translate(centerPos.x, centerPos.y);
			ctx.rotate(this.ang+toRad(90));
			ctx.drawImage(vist.img, -this.state.size.x / 2, -this.state.size.y / 2, this.state.size.x, this.state.size.y)
			ctx.restore();
		}
	}	
}
