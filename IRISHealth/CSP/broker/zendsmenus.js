/*
	zenDSMenus.js
	Zen DeepSee Visual Reports Menu and Toolbar management library
	Copyright (c) 2013 InterSystems Corp. ALL RIGHTS RESERVED.

	NOTE: This library requires the use of HTML5/CSS3 for proper operation
	(older versions of IE are NOT a supported platform)

        Local JS Namespace: ZDSM
*/

///////////////////////////////////////////////////////////
//
// ZEN Icon Server for HTML5 Cavas based Icons
///////////////////////////////////////////////////////////

var ZIS={};  // Zen Icon Server for Canvas based icons

ZIS.roundRect=function(ctx,x,y,width,height,radius) {
	var xw = x+width;
	var xr = x+radius;
	var xwr = xw-radius;
	var yh = y+height;
	var yr = y+radius;
	var yhr = yh-radius;

	ctx.beginPath();
	ctx.moveTo(xr,y);
	ctx.lineTo(xwr,y);
	ctx.arcTo(xw,y,  xw,yr, radius);
	ctx.lineTo(xw,yhr);
	ctx.arcTo(xw,yh, xwr,yh, radius);
	ctx.lineTo(xr,yh);
	ctx.arcTo(x, yh, x,yhr, radius);
	ctx.lineTo(x,yr);
	ctx.arcTo(x,y, xr,y, radius);
	ctx.closePath();
}

ZIS.scale = 1;
ZIS.ofsX = 0;
ZIS.ofsY = 0;

ZIS.setScale = function(scale) {
	ZIS.scale = scale;
}

ZIS.setOffsetX = function(d) {
	ZIS.ofsX = d;
}


ZIS.setOffsetY = function(d) {
	ZIS.ofsY = d;
}

ZIS.sx=function(x) {
	return(ZIS.ofsX+x*ZIS.scale);
}

ZIS.sy=function(y) {
	return(ZIS.ofsY+y*ZIS.scale);
}

ZIS.setContextScale=function(w,h,nativeWidth,nativeHeight) {
	var ratioTall = h/nativeHeight;
	var ratioWide = w/nativeWidth;

	var s = Math.min(ratioTall,ratioWide);

	ZIS.setScale(s);
	ZIS.setOffsetX((w-(s*nativeWidth))/2);
	ZIS.setOffsetY((h-(s*nativeHeight))/2);
	return(s);
}

/// LIBRARY OF DRAWING FUNCTIONS
ZIS.drawPointerToolIcon=function(cvs) { 
	var ctx = cvs.getContext('2d');
	var w = cvs.width;
	var h = cvs.height;
	var s = ZIS.setContextScale(w,h,11,17);

	var x1 = ZIS.sx(1.5);
	var y1 = ZIS.sy(1.5);
	var y7 = ZIS.sy(8.0);
	var x3 = ZIS.sx(4.0);
	var x6 = ZIS.sx(7.5);
	var y6 = ZIS.sy(7.5);
	var x7 = ZIS.sx(8.5);
	var x4 = ZIS.sx(5.0);
	var y9 = ZIS.sy(10.5);
	var y12 = ZIS.sy(14.0);
	var y13 = ZIS.sy(14.5);

	ctx.beginPath();  
	ctx.moveTo(x1,y1);
	ctx.lineTo(x7,y6);
	ctx.lineTo(x4,y6);
	ctx.lineTo(x7,y12);
	ctx.lineTo(x6,y13);
	ctx.lineTo(x3,y7);
	ctx.lineTo(x1,y9);
	ctx.closePath();
	ctx.fillStyle = "#000042";
	ctx.fill();
}

ZIS.drawNewDocumentIcon=function(cvs) {	
	var ctx = cvs.getContext('2d');
	var w = cvs.width;
	var h = cvs.height;
	var s = ZIS.setContextScale(w,h, 32,32);

	var xa = ZIS.sx(8.5);
	var ya = ZIS.sy(4.5);
	var xb = ZIS.sx(18.5);
	var yb = ya;
	var xc = ZIS.sx(25.5);
	var yc = ZIS.sy(11.5);
	var xd = xc;
	var yd = ZIS.sy(27.5);
	var xe = xa;
	var ye = yd;
	var xf = xb;
	var yf = yc;

	ctx.strokeStyle="#000000";
	ctx.beginPath();
	ctx.moveTo(xa,ya);
	ctx.lineTo(xb,yb);
	ctx.lineTo(xc,yc);
	ctx.lineTo(xd,yd);
	ctx.lineTo(xe,ye);
	ctx.closePath();	
	
	var grd = ctx.createLinearGradient(0, 0, w, h);
      	grd.addColorStop(0, '#ffffff');   
      	grd.addColorStop(1, '#aaaaaa');
 	ctx.fillStyle = grd;
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(xb,yb);
	ctx.lineTo(xf,yf);
	ctx.lineTo(xc,yc);
	ctx.closePath();
	ctx.fillStyle = "#ffffff";
	ctx.fill();
	ctx.stroke();
}

ZIS.drawOpenDocumentIcon=function(cvs) {	
	var ctx = cvs.getContext('2d');
	var w = cvs.width;
	var h = cvs.height;
	var s = ZIS.setContextScale(w,h, 18,16);
	
	var xa = ZIS.sx(1.5);
	var ya = ZIS.sy(5.5);
	var xb = ZIS.sx(2.5);
	var yb = ZIS.sy(4.5);
	var xc = ZIS.sx(4.5);
	var yc = yb;
	var xd = ZIS.sx(5.5);
	var yd = ya;
	var xe = ZIS.sx(11.5);
	var ye = ya;
	var xf = xe;
	var yf = ZIS.sy(8.5);
	var xg = ZIS.sx(6.5);
	var yg = yf;
	var xh = xa;
	var yh = ZIS.sy(13.5);
	var xi = xe;
	var yi = yh;
	var xj = ZIS.sx(16.5);
	var yj = yf;
	var xk = ZIS.sx(15.5);
	var yk = ZIS.sy(2.5);
	var xl = xk;
	var yl = ya;
	var xm = ZIS.sx(12.5);
	var ym = ya;
	var xn = ZIS.sx(9.5);
	var yn = yk;
	var xo = ZIS.sx(14.5);
	var yo = ZIS.sy(4.5);
	var xp = (xn+xo)/2;
	var yp = ZIS.sy(1);
	
	ctx.beginPath();
	ctx.moveTo(xa,ya);
	ctx.lineTo(xb,yb);
	ctx.lineTo(xc,yc);
	ctx.lineTo(xd,yd);
	ctx.lineTo(xe,ye);
	ctx.lineTo(xf,yf);
	ctx.lineTo(xg,yg);
	ctx.lineTo(xh,yh);
	ctx.closePath();
	ctx.lineWidth = 1;
	ctx.strokeStyle= "#424200";
	ctx.fillStyle = "#eeee55";
	ctx.fill();
	ctx.stroke();
	
	ctx.beginPath();
	ctx.fillStyle= "#ffff77";
	ctx.moveTo(xh,yh);
	ctx.lineTo(xg,yg);
	ctx.lineTo(xj,yj);
	ctx.lineTo(xi,yi);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	
	ctx.beginPath();
	ctx.fillStyle= "#000042";
	ctx.moveTo(xk,yk);
	ctx.lineTo(xl,yl);
	ctx.lineTo(xm,ym);
	ctx.closePath();
	ctx.fill();
	
	ctx.beginPath();
	ctx.moveTo(xn,yn);
	ctx.quadraticCurveTo(xp,yp,xo,yo);
	ctx.strokeStyle="#000042";
	ctx.lineWidth = ZIS.scale;
	ctx.stroke();
}

ZIS.drawPlaceItemIcon=function(cvs) {	
	var ctx = cvs.getContext('2d');
	var w = cvs.width;
	var h = cvs.height;
	var s = ZIS.setContextScale(w,h, 18,16);
	
	var xa = ZIS.sx(2.5);
	var ya = ZIS.sy(5.5);
	var xb = ZIS.sx(3.5);
	var yb = ZIS.sy(4.5);
	var xc = ZIS.sx(5.5);
	var yc = yb;
	var xd = ZIS.sx(6.5);
	var yd = ya;
	var xe = ZIS.sx(12.5);
	var ye = ya;
	var xf = xe;
	var yf = ZIS.sy(8.5);
	var xg = ZIS.sx(7.5);
	var yg = yf;
	var xh = xa;
	var yh = ZIS.sy(13.5);
	var xi = xe;
	var yi = yh;
	var xj = ZIS.sx(17.5);
	var yj = yf;

	var xk = ZIS.sx(5.5);
	var yk = ZIS.sy(2.5);
	var xl = ZIS.sx(9.5);
	var yl = yk;
	var xm = ZIS.sx(12.5);
	var ym = ZIS.sy(5.5);
	var xn = xm;
	var yn = ZIS.sy(13.5);
	var xo = xk;
	var yo = yn;
	var xp = xl;
	var yp = ym;
	
	ctx.beginPath();
	ctx.moveTo(xa,ya);
	ctx.lineTo(xb,yb);
	ctx.lineTo(xc,yc);
	ctx.lineTo(xd,yd);
	ctx.lineTo(xe,ye);
	ctx.lineTo(xf,yf);
	ctx.lineTo(xg,yg);
	ctx.lineTo(xh,yh);
	ctx.closePath();
	ctx.strokeStyle= "#424200";
	ctx.fillStyle = "#eeee55";
	ctx.fill();
	ctx.stroke();
	
	ctx.beginPath();
	ctx.fillStyle= "#ffff77";
	ctx.moveTo(xh,yh);
	ctx.lineTo(xg,yg);
	ctx.lineTo(xj,yj);
	ctx.lineTo(xi,yi);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	ctx.strokeStyle="#000000";
	ctx.beginPath();
	ctx.moveTo(xk,yk);
	ctx.lineTo(xl,yl);
	ctx.lineTo(xm,ym);
	ctx.lineTo(xn,yn);
	ctx.lineTo(xo,yo);
	ctx.closePath();	
	
	var grd = ctx.createLinearGradient(0, 0, w, h);
      	grd.addColorStop(0, '#ffffff');   
      	grd.addColorStop(1, '#aaaaaa');
 	ctx.fillStyle = grd;
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(xl,yl);
	ctx.lineTo(xp,yp);
	ctx.lineTo(xm,ym);
	ctx.closePath();
	ctx.fillStyle = "#ffffff";
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle= "#424200";
	ctx.fillStyle= "#ffff77";
	ctx.moveTo(xh,yh);
	ctx.lineTo(xg,yg);
	ctx.lineTo(xj,yj);
	ctx.lineTo(xi,yi);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

ZIS.drawSaveIcon=function(cvs) {	
	var ctx = cvs.getContext('2d');
	var w = cvs.width;
	var h = cvs.height;
	var s = ZIS.setContextScale(w,h, 20,20);
	
	var xa = ZIS.sx(2.5);
	var ya = ZIS.sy(2.5);
	var xb = xa;
	var yb = ZIS.sy(15.5);
	var xc = ZIS.sx(4.5);
	var yc = ZIS.sy(17.5);
	var xd = ZIS.sx(17.5);
	var yd = yc;
	var xe = xd;
	var ye = ya;

	var xf = xc;
	var yf = ya;
	var xg = xc;
	var yg = ZIS.sy(8.5);
	var xh = ZIS.sx(5.5);
	var yh = ZIS.sy(9.5);
	var xi = ZIS.sx(14.5);
	var yi = yh;
	var xj = ZIS.sx(15.5);
	var yj = yg;
	var xk = xj;
	var yk = ya;
	
	var xl = xh;
	var yl = yc;
	var xm = xh;
	var ym = ZIS.sy(11.5);
	var xn = xj;
	var yn = ym;
	var xo = xj;
	var yo = yc;
	var xp = ZIS.sx(12.5);
	var yp = ym;
	var xq = xp;
	var yq = yc;

	var xs = ZIS.sx(7.5);
	var ys = ZIS.sy(16.5);
	var xt = xs;
	var yt = ZIS.sy(12.5);
	var xu = ZIS.sx(9.5);
	var yu = yt;
	var xr = xu;
	var yr = ys;

	var xw = ZIS.sx(16.0);
	var yw = ZIS.sy(3.0);

	ctx.beginPath();
	ctx.moveTo(xa,ya);
	ctx.lineTo(xb,yb);
	ctx.lineTo(xc,yc);
	ctx.lineTo(xd,yd);
	ctx.lineTo(xe,ye)
	ctx.closePath();
	ctx.strokeStyle = "#000042";
	ctx.fillStyle = "#0b28c9";
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(xf,yf);
	ctx.lineTo(xg,yg);
	ctx.arcTo(xg,yh,xh,yh,ZIS.scale);
	ctx.lineTo(xi,yi);
	ctx.arcTo(xj,yi,xj,yj,ZIS.scale);
	ctx.lineTo(xk,yk);
	ctx.closePath();

	ctx.strokeStyle = "#000042";
	ctx.fillStyle = "#d0d0d0";
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(xl,yl);
	ctx.lineTo(xm,ym);
	ctx.lineTo(xp,yp);
	ctx.lineTo(xq,yq);
	ctx.closePath();

	var grd = ctx.createLinearGradient(xm, ym, xq, yq);
      	grd.addColorStop(0, '#ffffff');   
      	grd.addColorStop(1, '#aaaaaa');
 	ctx.fillStyle = grd;
	ctx.fill();

	ctx.beginPath();
	ctx.lineTo(xr,yr);
	ctx.lineTo(xu,yu);
	ctx.lineTo(xt,yt);
	ctx.lineTo(xs,ys);
	ctx.closePath();
	ctx.fillStyle = "#0b28c9";
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(xl,yl);
	ctx.lineTo(xm,ym);
	ctx.lineTo(xn,yn);
	ctx.lineTo(xo,yo);
	ctx.lineTo(xq,yq);
	ctx.lineTo(xp,yp);
	ctx.strokeStyle = "#000001";
	ctx.stroke();

	ctx.beginPath();
	ctx.rect(xw,yw,ZIS.scale,ZIS.scale);
	ctx.fillStyle = "#555577";
	ctx.fill();
	ctx.strokeStyle = "#000001";
	ctx.stroke();
}

ZIS.drawSaveAsIcon=function(cvs) {
	ZIS.drawSaveIcon(cvs);
	
	var ctx = cvs.getContext('2d');
	var w = cvs.width;
	var h = cvs.height;
	var s = ZIS.setContextScale(w,h, 20,20);
	
	var xa = ZIS.sx(7.5);
	var ya = ZIS.sy(5.5);
	var xc = ZIS.sx(10.5);
	var yc = ZIS.sy(6.5);
	var xb = (xa+xc)/2;
	var yb = (ya+yc)/2;
	var xd = ZIS.sx(19.5);
	var yd = ZIS.sy(15.5);
	var xe = ZIS.sx(17.5);
	var ye = ZIS.sy(17.5);
	var xf = ZIS.sx(8.5);
	var yf = ZIS.sy(8.5);
	var xg = (xa+xf)/2;
	var yg = (ya+yf)/2;

	ctx.beginPath();
	ctx.moveTo(xa,ya);
	ctx.lineTo(xc,yc);
	ctx.lineTo(xd,yd);
	ctx.lineTo(xe,ye);
	ctx.lineTo(xf,yf);
	ctx.closePath();

	var grd = ctx.createLinearGradient(xd, ya, xa, ye);
      	grd.addColorStop(0.5, '#ffd700');   
      	grd.addColorStop(0.6, '#553300');
 	ctx.fillStyle = grd;
	ctx.strokeStyle = "#010100";
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(xa,ya);
	ctx.lineTo(xb,yb);
	ctx.lineTo(xg,yg);
	ctx.closePath();
	ctx.fillStyle = "#000000";
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(xb,yb);
	ctx.lineTo(xc,yc);
	ctx.quadraticCurveTo((xg+xb)/2,(yg+yb)/2,xf,yf);
	ctx.lineTo(xg,yg);
	ctx.quadraticCurveTo(xa,ya,xb,yb);
	ctx.fillStyle = "#ffffdd";
	ctx.fill();
}

ZIS.drawPrinterIcon=function(cvs) {	
	var ctx = cvs.getContext('2d');
	var w = cvs.width;
	var h = cvs.height;
	var s = ZIS.setContextScale(w,h, 22,20);
	
	var xa = ZIS.sx(2.5);
	var ya = ZIS.sy(10.5);
	var xb = ZIS.sx(15.5);
	var yb = ya;
	var xc = xb;
	var yc = ZIS.sy(14.5);
	var xd = xa;
	var yd = yc;

	var xe = ZIS.sx(19.5);
	var ye = ZIS.sy(7.5);
	var xf = xe;
	var yf = ZIS.sy(11.5);

	var xg = ZIS.sx(18.5);
	var yg = ZIS.sy(13.5);
	var xh = ZIS.sx(14.5);
	var yh = ZIS.sy(16.5);
	var xi = ZIS.sx(4.0);
	var yi = yh;

	var xj = xi;
	var yj = ZIS.sy(8.5);
	var xk = xh;
	var yk = yj;
	var xl = xg;
	var yl = ZIS.sy(5.5);
	var xm = ZIS.sx(8.5);
	var ym = yl;

	var xn = ZIS.sx(5.5);
	var yn = ZIS.sy(8);
	var xo = ZIS.sx(9.5);
	var yo = ZIS.sy(2.5);
	var xp = ZIS.sx(17.5);
	var yp = yo;
	var xq = ZIS.sx(13.5);
	var yq = yn;

	var xr = ZIS.sx(11.5);
	var yr = ZIS.sy(11.5);

	ctx.beginPath();
	ctx.moveTo(xa,ya);
	ctx.lineTo(xb,yb);
	ctx.lineTo(xc,yc);
	ctx.lineTo(xd,yd);
	ctx.closePath();
	ctx.fillStyle="#e7e7ff";
	ctx.strokeStyle="#000042";
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(xb,yb);
	ctx.lineTo(xe,ye);
	ctx.lineTo(xf,yf);
	ctx.lineTo(xc,yc);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(xa,ya);
	ctx.lineTo(xj,yj);
	ctx.lineTo(xk,yk);
	ctx.lineTo(xb,yb);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(xb,yb);
	ctx.lineTo(xk,yk);
	ctx.lineTo(xl,yl);
	ctx.lineTo(xe,ye);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	ctx.fillStyle = "#b7b7cf";
	ctx.beginPath();
	ctx.moveTo(xj,yj);
	ctx.lineTo(xk,yk);
	ctx.lineTo(xl,yl);
	ctx.lineTo(xm,ym);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

//Base
	ctx.fillStyle = "#777777";
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(xc,yc);
	ctx.lineTo(xf,yf);
	ctx.lineTo(xg,yg);
	ctx.lineTo(xh,yh);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(xc,yc);
	ctx.lineTo(xh,yh);
	ctx.lineTo(xi,yi);
	ctx.lineTo(xd,yd);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.rect(xr,yr,2*ZIS.scale,ZIS.scale);
	ctx.fillStyle = "#77ff77";
	ctx.fill();
	ctx.stroke();

//Paper
	ctx.beginPath();
	ctx.moveTo(xn,yn);
	ctx.quadraticCurveTo(xn,yo,xo,yo);
	ctx.lineTo(xp,yp);
	ctx.quadraticCurveTo(xq,yp,xq,yq);
	ctx.closePath();
	var grd = ctx.createLinearGradient(xp,yp, xp, yn);
      	grd.addColorStop(0, '#ffffff');   
      	grd.addColorStop(1, '#cccccc');
 	ctx.fillStyle = grd;
	ctx.fill();
	ctx.stroke();

}

ZIS.drawSetupIcon=function(cvs) {	
	var ctx = cvs.getContext('2d');
	var w = cvs.width;
	var h = cvs.height;
	var s = ZIS.setContextScale(w,h, 32,32);

	ctx.clearRect(0,0,w,h);

	var xa = ZIS.sx(16.0);
	var ya = ZIS.sy(16.0);

	var a=(45/8)*(Math.PI/180);
	var s=[];
	var c=[];
	for (var i=0;i<9;i++) {
		var angle = a*i;
		s[i]=Math.sin(angle)*ZIS.scale;
		c[i]=Math.cos(angle)*ZIS.scale;
	}
	
	var r1 = 8;
	var r2 = 10;
	var r3 = 11;

	ctx.beginPath();
	ctx.moveTo(xa+r3*c[0],ya+r3*s[0]);
	for (var i=1;i<9;i++) {
		var rad = r3;
		if (i>2 && i<6) rad = r1;
		if (i==2 || i==6) rad = r2;
		ctx.lineTo(xa+rad*c[i],ya+rad*s[i]);
	}
	for (var i=8;i>=0;i--) {
		var rad = r3;
		if (i>2 && i<6) rad = r1;
		if (i==2 || i==6) rad = r2;
		ctx.lineTo(xa+rad*s[i],ya+rad*c[i]);
	}
//
	for (var i=1;i<9;i++) {
		var rad = r3;
		if (i>2 && i<6) rad = r1;
		if (i==2 || i==6) rad = r2;
		ctx.lineTo(xa-rad*s[i],ya+rad*c[i]);
	}

	for (var i=8;i>=0;i--) {
		var rad = r3;
		if (i>2 && i<6) rad = r1;
		if (i==2 || i==6) rad = r2;
		ctx.lineTo(xa-rad*c[i],ya+rad*s[i]);
	}
	//
	for (var i=1;i<9;i++){
		var rad = r3;
		if (i>2 && i<6) rad = r1;
		if (i==2 || i==6) rad = r2;
		ctx.lineTo(xa-rad*c[i],ya-rad*s[i]);
	}

	for (var i=8;i>=0;i--) {
		var rad = r3;
		if (i>2 && i<6) rad = r1;
		if (i==2 || i==6) rad = r2;
		ctx.lineTo(xa-rad*s[i],ya-rad*c[i]);
	}
	//
	for (var i=1;i<9;i++) {
		var rad = r3;
		if (i>2 && i<6) rad = r1;
		if (i==2 || i==6) rad = r2;
		ctx.lineTo(xa+rad*s[i],ya-rad*c[i]);
	}
	
	for (var i=8;i>=0;i--) {
		var rad = r3;
		if (i>2 && i<6) rad = r1;
		if (i==2 || i==6) rad = r2;
		ctx.lineTo(xa+rad*c[i],ya-rad*s[i]);
	}
	ctx.fillStyle = "#444455";
	ctx.fill();
//	ctx.strokeStyle="#000000";
//	ctx.stroke();

	ctx.globalCompositeOperation="xor";
	ctx.beginPath();
	ctx.arc(xa,ya,4*ZIS.scale,0,2*Math.PI,false);
	ctx.fillStyle = "#000000";
	ctx.fill();
}

ZIS.drawPageSetupIcon=function(cvs) {
	ZIS.drawNewDocumentIcon(cvs);
	
	var ctx = cvs.getContext('2d');
	var w = cvs.width;
	var h = cvs.height;
	var s = ZIS.setContextScale(w,h, 32,32);

	var xa = ZIS.sx(17.0);
	var ya = ZIS.sy(19.5);

	var a=(45/8)*(Math.PI/180);
	var s=[];
	var c=[];
	for (var i=0;i<9;i++) {
		var angle = a*i;
		s[i]=Math.sin(angle)*ZIS.scale;
		c[i]=Math.cos(angle)*ZIS.scale;
	}

	ctx.beginPath();
	ctx.moveTo(xa+7*c[0],ya+7*s[0]);
	for (var i=1;i<9;i++) {
		var rad = 7;
		if (i>2 && i<6) rad = 5;
		if (i==2 || i==6) rad = 6;
		ctx.lineTo(xa+rad*c[i],ya+rad*s[i]);
	}
	for (var i=8;i>=0;i--) {
		var rad = 7;
		if (i>2 && i<6) rad = 5;
		if (i==2 || i==6) rad = 6;
		ctx.lineTo(xa+rad*s[i],ya+rad*c[i]);
	}
//
	for (var i=1;i<9;i++) {
		var rad = 7;
		if (i>2 && i<6) rad = 5;
		if (i==2 || i==6) rad = 6;
		ctx.lineTo(xa-rad*s[i],ya+rad*c[i]);
	}

	for (var i=8;i>=0;i--) {
		var rad = 7;
		if (i>2 && i<6) rad = 5;
		if (i==2 || i==6) rad = 6;
		ctx.lineTo(xa-rad*c[i],ya+rad*s[i]);
	}
	//
	for (var i=1;i<9;i++){
		var rad = 7;
		if (i>2 && i<6) rad = 5;
		if (i==2 || i==6) rad = 6;
		ctx.lineTo(xa-rad*c[i],ya-rad*s[i]);
	}

	for (var i=8;i>=0;i--) {
		var rad = 7;
		if (i>2 && i<6) rad = 5;
		if (i==2 || i==6) rad = 6;
		ctx.lineTo(xa-rad*s[i],ya-rad*c[i]);
	}
	//
	for (var i=1;i<9;i++) {
		var rad = 7;
		if (i>2 && i<6) rad = 5;
		if (i==2 || i==6) rad = 6;
		ctx.lineTo(xa+rad*s[i],ya-rad*c[i]);
	}
	
	for (var i=8;i>=0;i--) {
		var rad = 7;
		if (i>2 && i<6) rad = 5;
		if (i==2 || i==6) rad = 6;
		ctx.lineTo(xa+rad*c[i],ya-rad*s[i]);
	}
	ctx.fillStyle = "#777777";
	ctx.fill();
	ctx.strokeStyle="#000000";
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(xa,ya,3*ZIS.scale,0,2*Math.PI,false);
	ctx.fillStyle = "#cccccc";
	ctx.fill();
	ctx.stroke();
}

ZIS.drawUpChevron=function(cvs) { 
	var ctx = cvs.getContext('2d');
	var w = cvs.width;
	var h = cvs.height;
	var s = ZIS.setContextScale(w,h,15,9);

	var x2 = ZIS.sx(2.5);
	var y2 = ZIS.sy(2.5);
	var y7 = ZIS.sy(7.5);
	var x7 = ZIS.sx(7.5);
	var x12 = ZIS.sx(12.5);

	ctx.beginPath();  // base triangle
	ctx.moveTo(x2,y7);
	ctx.lineTo(x7,y2);
	ctx.lineTo(x12,y7);
	ctx.closePath();
	ctx.fillStyle = "#555555";
	ctx.fill();

	ctx.beginPath(); // back edge
	ctx.moveTo(x7,y2);
	ctx.lineTo(x12,y7);
	ctx.lineTo(x2,y7);
	ctx.strokeStyle = "#000000";
	ctx.stroke();

	ctx.beginPath(); // point edge
	ctx.moveTo(x2,y7);
	ctx.lineTo(x7,y2);
	ctx.strokeStyle = "#888888";
	ctx.stroke();
}

ZIS.drawDownChevron=function(cvs) { 
	var ctx = cvs.getContext('2d');
	var w = cvs.width;
	var h = cvs.height;
	var s = ZIS.setContextScale(w,h,15,9);

	var x2 = ZIS.sx(2.5);
	var y2 = ZIS.sy(2.5);
	var y7 = ZIS.sy(7.5);
	var x7 = ZIS.sx(7.5);
	var x12 = ZIS.sx(12.5);

	ctx.beginPath();  // base triangle
	ctx.moveTo(x2,y2);
	ctx.lineTo(x12,y2);
	ctx.lineTo(x7,y7);
	ctx.closePath();
	ctx.fillStyle = "#555555";
	ctx.fill();

	ctx.beginPath(); // back edge
	ctx.moveTo(x2,y2);
	ctx.lineTo(x7,y7);
	ctx.lineTo(x12,y2);
	ctx.strokeStyle = "#000000";
	ctx.stroke();

	ctx.beginPath(); // top edge
	ctx.moveTo(x2,y2);
	ctx.lineTo(x12,y2);
	ctx.strokeStyle = "#888888";
	ctx.stroke();
}

ZIS.drawRightChevron=function(cvs) {
	var ctx = cvs.getContext('2d');
	var w = cvs.width;
	var h = cvs.height;
	var s = ZIS.setContextScale(w,h,9,15);

	var x2 = ZIS.sx(2.5);
	var y2 = ZIS.sy(2.5);
	var x7 = ZIS.sx(7.5);
	var y7 = ZIS.sy(7.5);
	var y12 = ZIS.sy(12.5);

	ctx.beginPath();  // base triangle
	ctx.moveTo(x2,y2);
	ctx.lineTo(x2,y12);
	ctx.lineTo(x7,y7);
	ctx.closePath();
	ctx.fillStyle = "#555555";
	ctx.fill();

	ctx.beginPath(); // pointy end
	ctx.moveTo(x2,y2);
	ctx.lineTo(x7,y7);
	ctx.lineTo(x2,y12);
	ctx.strokeStyle = "#000000";
	ctx.stroke();

	ctx.beginPath(); // back edge
	ctx.moveTo(x2,y2);
	ctx.lineTo(x2,y12);
	ctx.strokeStyle = "#888888";
	ctx.stroke();
}

ZIS.drawRightChevronInv=function(cvs) {
	var ctx = cvs.getContext('2d');
	var w = cvs.width;
	var h = cvs.height;
	var s = ZIS.setContextScale(w,h,9,15);

	var x2 = ZIS.sx(2.5);
	var y2 = ZIS.sy(2.5);
	var x7 = ZIS.sx(7.5);
	var y7 = ZIS.sy(7.5);
	var y12 = ZIS.sy(12.5);

	ctx.beginPath();  // base triangle
	ctx.moveTo(x2,y2);
	ctx.lineTo(x2,y12);
	ctx.lineTo(x7,y7);
	ctx.closePath();
	ctx.fillStyle = "#aaaaaa";
	ctx.fill();

	ctx.beginPath(); // pointy end
	ctx.moveTo(x2,y2);
	ctx.lineTo(x7,y7);
	ctx.lineTo(x2,y12);
	ctx.strokeStyle = "#777777";
	ctx.stroke();

	ctx.beginPath(); // back edge
	ctx.moveTo(x2,y2);
	ctx.lineTo(x2,y12);
	ctx.strokeStyle = "#ffffff";
	ctx.stroke();
}

ZIS.drawCopyStyleIcon=function(cvs) {	
	var ctx = cvs.getContext('2d');
	var w = cvs.width;
	var h = cvs.height;
	var s = ZIS.setContextScale(w,h,20,32);

	ctx.strokeStyle = "#555555";
	ZIS.roundRect(ctx,ZIS.ofsX+0.5*s,ZIS.ofsY+4.5*s,19*s,25*s,3*s);

	var grd = ctx.createLinearGradient(0, 0, 0, h);
      	grd.addColorStop(0, '#aaaaaa');   
      	grd.addColorStop(1, '#222222');
 	ctx.fillStyle = grd;
	ctx.fill();
	ctx.stroke();

	
	ctx.beginPath();
	ctx.rect(ZIS.sx(2.5),ZIS.sy(6.5),15*s,20*s);

	var grd = ctx.createLinearGradient(0, 0, w, h);
      	grd.addColorStop(0, '#ffccff');   
      	grd.addColorStop(1, '#771199');
 	ctx.fillStyle = grd;

	ctx.fill();

	ctx.font = "italic "+Math.floor(19*s)+"px 'Times New Roman'";
	ctx.fillStyle = "#eeeeee";
	ctx.textAlign = "center"
	ctx.fillText("S",ZIS.sx(10),ZIS.sy(23));
	
	ctx.beginPath();
	ctx.moveTo(ZIS.sx(3.5),ZIS.sy(7.5));
	ctx.lineTo(ZIS.sx(3.5+13),ZIS.sy(7.5));
	ctx.arcTo(ZIS.sx(3.5+13),ZIS.sy(5.5), ZIS.sx(3.5+11), ZIS.sy(5.5), 2*s); 
	ctx.lineTo(ZIS.sx(3.5+10),ZIS.sy(5.5));
	ctx.arcTo(ZIS.sx(3.5+8),ZIS.sy(5.5), ZIS.sx(3.5+8), ZIS.sy(3.5), 2*s);

	ctx.arcTo(ZIS.sx(3.5+6.5),ZIS.sy(0.5), ZIS.sx(3.5+5), ZIS.sy(3.5), 1.5*s); 

	ctx.arcTo(ZIS.sx(3.5+5),ZIS.sy(5.5), ZIS.sx(3.5+3),ZIS.sy(5.5), 2*s);
	ctx.lineTo(ZIS.sx(3.5+2),ZIS.sy(5.5));
	ctx.arcTo(ZIS.sx(3.5),ZIS.sy(5.5), ZIS.sx(3.5),ZIS.sy(7.5), 2*s);
	ctx.closePath();

	var grd = ctx.createLinearGradient(0, ZIS.sy(2), 0, ZIS.sy(7.5));
      	grd.addColorStop(0, '#bbbbbb');
      	grd.addColorStop(0.5, '#ffffff');
      	grd.addColorStop(1, '#bbbbbb');
 	ctx.fillStyle = grd;
	ctx.fill();
	ctx.strokeStyle = "#444444";
	ctx.stroke();
}

ZIS.drawTextToolIcon=function(cvs) {	
	var ctx = cvs.getContext('2d');
	var w = cvs.width;
	var h = cvs.height;
	var s = ZIS.setContextScale(w,h, 32,32);

	ctx.strokeStyle = "#555555";
	ctx.rect(ZIS.sx(4.5),ZIS.sy(4.5),23*s,23*s);

	var grd = ctx.createLinearGradient(0, 0, w, h);
      	grd.addColorStop(0, '#ffffff');   
      	grd.addColorStop(1, '#aaaaaa');
 	ctx.fillStyle = grd;
	ctx.fill();
	ctx.stroke();

	ctx.beginPath();
	ctx.rect(ZIS.sx(2.5),ZIS.sy(2.5),4*s,4*s);
	ctx.fillStyle = "#ffffff";
	ctx.fill();
	ctx.strokeStyle="#000000";
	ctx.stroke();

	ctx.beginPath();
	ctx.rect(ZIS.sx(25.5),ZIS.sy(2.5),4*s,4*s);
	ctx.fillStyle = "#ffffff";
	ctx.fill();
	ctx.strokeStyle="#000000";
	ctx.stroke();

	ctx.beginPath();
	ctx.rect(ZIS.sx(25.5),ZIS.sy(25.5),4*s,4*s);
	ctx.fillStyle = "#ffffff";
	ctx.fill();
	ctx.strokeStyle="#000000";
	ctx.stroke();

	ctx.beginPath();
	ctx.rect(ZIS.sx(2.5),ZIS.sy(25.5),4*s,4*s);
	ctx.fillStyle = "#ffffff";
	ctx.fill();
	ctx.strokeStyle="#000000";
	ctx.stroke();

	ctx.font = "bold "+Math.floor(22*s)+"px 'Times New Roman'";
	ctx.fillStyle = "#000000";
	ctx.textAlign = "center"
	ctx.fillText("T",ZIS.sx(16),ZIS.sy(24));	
}

//////////////////////////////////////////////////////////////////////////

var ZDSM = {};  // Object space

// Default to Zen Values

//if (ZLM.isZen()) var path="/csp/broker/";
//else var path="";
var path="";

// Black Icons for light backgrounds
ZDSM.DownArrowIcon=path+"images/DownChevron.png";
ZDSM.SmallDownArrowIcon=path+"images/SmDownArrow.png";
ZDSM.UpArrowIcon=path+"images/UpChevron.png";
ZDSM.CheckmarkIcon=path+"images/Checkmark.png";

// White Icons for dark backgrounds
ZDSM.InvDownArrowIcon=path+"images/DownChevronInv.png";
ZDSM.InvSmallDownArrowIcon=path+"images/SmDownArrowInv.png";
ZDSM.InvUpArrowIcon=path+"images/UpChevronInv.png";
ZDSM.InvCheckmarkIcon=path+"images/CheckmarkInv.png";

//============
ZDSM.initialized = 0; // Has this system, been initialized for use yet?
ZDSM.activeBgColor="blue"; // default active background color
ZDSM.activeFgColor="white"; // default active forground color
ZDSM.menuSeparatorHeight=5; // magic number for menu Separator
ZDSM.menuObj=null; // active top-level pop-up menu
ZDSM.scrollingMenu=null; // active scrolling tall menu

/* 
  MANIPULATION UTILITIES
*/

// Close the current menu object, its submenus and all associated 
// bookkeeping (keyboard context, mouse trap, etc)
ZDSM.closeMenu=function(e){
	if (e && e.clientX==ZDSM.mouseTrap.initX && e.clientY==ZDSM.mouseTrap.initY) {
		ZLM.killEvent(e);
		return;
	}
	if (ZDSM.popupTrap) ZDSM.popupTrap.close(null);
}

//////////////////////////////////////

//ZDSM.BBI_OUT_SIZE = 22;
//ZDSM.BBI_IN_SIZE = 16;
//ZDSM.BBI_EDGE_SIZE = 4;

ZDSM.BBI_OUT_SIZE = 18;
ZDSM.BBI_IN_SIZE = 16;
ZDSM.BBI_EDGE_SIZE = 1;

// Defines a default drag manager for the purposes of handling data drag drop operations
ZDSM.Toolbar = function(div) {
	ZLM.initializeObject(this,div,"ZDSM.Toolbar");
	this.features = null;
	var g = document.createElement("div");
	g.style.position="absolute";
	g.style.border="2px solid #dddddd";
	g.style.display="none";
	this.ghost = g;
	this.setRenderSize("tiny");
}

// Create a floating palette from which tools may be drawn at will to edit the main toolbar
ZDSM.Toolbar.prototype.createToolPalette=function() {
	if (this.toolbox) this.toolbox.parentNode.removeChild(this.toolbox);

	var div = document.createElement("div");
	var h=[];
	h.push('<div id="toolBox'+this.instanceNum+'" style="display:none;position:absolute;top:130px;left:50px;bottom:100px;right:50px;border:1px solid gray;background:#ffffff;font:bold 14px sans-serif;padding:10px;">');
		h.push('Drag your frequently used items into the toolbar...');
		h.push('<div id="toolbarEditControls'+this.instanceNum+'" style="position:absolute;bottom:0px;left:0px;right:0px;height50px;border:1px solid gray;">');
		h.push('<span style="position:absolute;top:4px;left:10px;font:bold 14px sans-serif;">Show</span>');
		h.push('<select id="toolbarViewSelect'+this.instanceNum+'" style="position:relative;top:0px;left:50px;" >');
			h.push('<option value="both">Icon &amp; Text</option>');
			h.push('<option value="icon">Icon Only</option>');
			h.push('<option value="text">Text Only</option>');
		h.push('</select>');
		h.push('<span style="position:absolute;top:4px;left:170px;font:bold 14px sans-serif;">Size</span>');
		h.push('<select id="toolbarSizeSelect'+this.instanceNum+'" style="position:absolute;top:0px;left:200px;" onchange="'+this.objHook+'resizeToolIcons(this.value);">');
			h.push('<option value="tiny">Tiny</option>');
			h.push('<option value="small">Small</option>');
			h.push('<option value="medium">Medium</option>');
			h.push('<option value="large">Large</option>');
		h.push('</select>');
		h.push('<button type="button" style="position:absolute;right:10px;top:0px;font:bold 14px sans-serif;" onclick="'+this.objHook+'endRibbonEdit();">Done</button>');
		h.push('</div>');
	h.push('</div>');

	div.innerHTML=h.join("");
	var tb = div.firstChild;

	var x=10;
	var y=25;
	var space = 50;
	var maxLine = -1;
	var l = this.iLib;
	var lLen = l.length;
	for (var i=0;i<lLen;i++) {
		if (i>maxLine) {
			x=100;
			y+=(space*1.5);
			maxLine+=20;
		}
		else x+=space;

		var b = ZDSM.ToolBarItem.createFromJS(l[i]);
		b.setTop(y+"px");
		b.setLeft(x+"px");
		b.body.style.borderWidth="0px";
		tb.appendChild(b.base);
		ZLM.setLocalAttribute(b.base,"onmousedown",this.objHook+"startDragFromPalette(this,event);");
	}
	this.setToolPalette(tb);
	document.body.appendChild(tb);
	return(tb);
}

ZDSM.Toolbar.prototype.setRibbonDiv=function(div) {
	this.toolbar = div;
}

ZDSM.Toolbar.prototype.setIconLibrary=function(a) {
	this.iLib = a;
	this.createToolPalette();
}

ZDSM.Toolbar.prototype.setToolPalette=function(div) {
	this.toolbox = div;
}

ZDSM.Toolbar.prototype.getToolPalette=function() {
	return(this.toolbox);
}

ZDSM.Toolbar.prototype.getToolPaletteControls=function() {
	return(document.getElementById("toolbarEditControls"+this.instanceNum));
}

ZDSM.Toolbar.prototype.setRenderSize=function(sz) {
	this.renderSize = 1; // tiny
	if (sz=="small") this.renderSize=2;
	else if (sz=="medium") this.renderSize=3;
	else if (sz=="large") this.renderSize=4;
}

ZDSM.Toolbar.prototype.removeFeatureByDiv=function(div) {
	if (this.features.div==div) {
		this.features = this.features.next;
		if (this.features) this.features.prev = null;
		this.toolbar.removeChild(div);
	}
	else {
		var p=this.features.next;
		while (p) {
			if (p.div==div) {
				p.prev.next = p.next;
				if (p.next) p.next.prev=p.prev;
				this.toolbar.removeChild(div);
				p=null;
			}
			else p=p.next;
		}
	}
}

ZDSM.Toolbar.prototype.startRibbonEdit=function() {
	this.editing = true;
	var p = this.features;
	while(p) {
		p.oldMouseDown = p.div.onmousedown;
		ZLM.setLocalAttribute(p.div,"onmousedown",this.objHook+"startDragFromRibbon(this,event);");
		p=p.next;
	}
	if (this.toolbox) this.toolbox.style.display="block";
}

ZDSM.Toolbar.prototype.endRibbonEdit=function() {
	var p = this.features;
	while(p) {
		p.div.onmousedown = p.oldMouseDown;
		p=p.next;
	}
	if (this.toolbox) this.toolbox.style.display="none";
	this.editing = false;
}

ZDSM.Toolbar.prototype.insertFeature=function(obj,x,noRefresh) {
	var o = {};
	o.item = obj;
	o.div = obj.base;
	o.id = obj.iconId;
	o.lx = x;
	o.next = null;
	o.prev = null;
	
	if (this.editing) {
		o.oldMouseDown = o.div.onmousedown;
		ZLM.setLocalAttribute(o.div,"onmousedown",this.objHook+"startDragFromRibbon(this,event);");
	}

	this.toolbar.appendChild(o.div);
	if (!this.features) {
		this.features = o;
	}
	else if (o.lx<this.features.lx) {
		this.features.prev = o;
		o.next = this.features;
		this.features = o;
	}
	else {
		var p = this.features;
		var done = false;
		while (!done) {
			if (p.next==null) {
				p.next = o;
				o.prev = p;
				done=true;
			}
			else {
				var q = p.next;
				if (o.lx<q.lx) { // insert before q
					q.prev = o;
					o.prev = p;
					p.next = o;
					o.next = q;
					done=true;
				}
				else p=p.next;
			}
		}
	}
	if (!noRefresh) {
		this.refreshRibbon();
	}		
				
}

ZDSM.Toolbar.prototype.refreshBarBounds = function() {
	if (this.toolbar) {
		this.barLX = ZLM.getPageOffsetLeft(this.toolbar);
		this.barLY = ZLM.getPageOffsetTop(this.toolbar);
		this.barUX = this.barLX+this.toolbar.offsetWidth;
		this.barUY = this.barLY+this.toolbar.offsetHeight;
	}
	else {
		this.barLX = 0;
		this.barLY = 0;
		this.barUX = 0;
		this.barUY = 0;
		ZLM.cerr("ERROR: No toolbar defined");
	}	
}

ZDSM.Toolbar.prototype.initRibbon = function(div, features) {
	this.setRibbonDiv(div);

	var baseX = 10;
	var baseW = 36;
	var spaceW = 10;

	var len = features.length;
	for (var i=0;i<len;i++) {
		var icon = this.findIcon(features[i]);
		if (features[i]!="spacer" && icon) {
			var b = ZDSM.ToolBarItem.createFromJS(icon);
			b.setScale("tiny");
			this.insertFeature(b,baseX,true);
			baseX+=baseW-1;
	
		}
		else {
			var b = ZDSM.ToolBarItem.createFromJS(icon);
			b.setScale("tiny");
			this.insertFeature(b,baseX,true);
			baseX+=spaceW-1;
		}
	}
	this.refreshRibbon();
}

ZDSM.Toolbar.prototype.refreshRibbon=function(ghostX) {
	var baseX = 10;
	var baseY = 10;

	var barH = 55;
	var baseW = 36;
	var spaceW = 10;
	var scale = "tiny";
// Resolve Scaling Issues
	switch(this.renderSize) {
	case 2:
		barH = 61;
		baseW = 41;
		spaceW = 12;
		scale = "small";
		break;
	case 3:
		barH = 66;
		baseW = 47;
		spaceW = 13;
		scale = "medium";
		break;
	case 4:
		barH = 79;
		baseW = 58;
		spaceW = 16;
		scale = "large";
	}

	this.toolbar.style.height = barH+"px";

	if (ghostX) {
		this.toolbar.appendChild(this.ghost);
		this.ghost.style.width=baseW+"px";
		this.ghost.style.height=(baseW/2)+"px";
		this.ghost.style.top=baseY+"px";
		this.ghost.style.display="block";
	}
	else this.ghost.style.display="none";

	var p = this.features;
	while (p) {
		var b = p.item;
		b.setTop(baseY+"px");
		b.setScale(scale);
		if (ghostX && ghostX<baseX) {
			this.ghost.style.left=baseX+"px";
			baseX+=baseW;
			ghostX=false;
		}		
		b.setLeft(baseX+"px");
		if (p.id != "spacer") {
			var leftRound = "0px";
			if (p==this.features || (p.prev!=null && p.prev.id=="spacer")) leftRound = "8px";
			var rightRound = "0px";
			if (p.next==null || (p.next!=null && p.next.id=="spacer")) rightRound = "8px";
			b.body.style.borderRadius = leftRound+" "+rightRound+" "+rightRound+" "+leftRound;
			p.lx = baseX;
			p.ux = baseX+baseW-2
			baseX+=baseW-1;
		}
		else {
			b.setToolTip(null);
			b.base.style.width = spaceW+"px";
			b.base.style.display = "block";
			b.body.style.background="";
			b.body.style.border="";
			b.body.style.opacity="0";
			b.lblDiv.style.display="none";
			p.lx = baseX;
			p.ux = baseX+spaceW-2;
			baseX+=spaceW-1;
		}
		p=p.next;
	}
	if (ghostX) {
		this.ghost.style.left=baseX+"px";
		baseX+=baseW;
		ghostX=false;
	}		

}

ZDSM.Toolbar.prototype.findIcon=function(id) {
	var len = this.iLib.length;
	for (var i=0; i<len;i++) {
		var o=this.iLib[i];
		if (o.id==id) return(o);
	}
	return(null);
}


ZDSM.Toolbar.prototype.updateGhost=function() {
	var x=this.lastX;
	var y=this.lastY;
	if (x>this.barLX && x<this.barUX && y>this.barLY && y<this.barUY) {
		this.refreshRibbon(x-this.barLX);
		this.ghostActive = true;
	}
	else {
		if (this.ghostActive) {
			this.refreshRibbon(false);
			this.ghostActive=false;
		}
	} 	
}

ZDSM.Toolbar.prototype.startDragFromRibbon = function(who,event) {
	ZDSM.Toolbar.fromPalette = false;

	this.refreshBarBounds();

	var div = who;
	var id = div.getAttribute("iconId");
	var icon = this.findIcon(id);
	var clone = ZDSM.ToolBarItem.createFromJS(icon);
	var avatar = clone.base;
	avatar.style.position="absolute";

	document.body.appendChild(avatar);
	this.removeFeatureByDiv(div);

	var x = event.clientX;
	if (x<0) x=0;
	var y = event.clientY;
	if (y<0) y=0;

	avatar.style.top=x+"px";
	avatar.style.left=y+"px";
	// Now, activate the animation by registering the dragIcon with the drag-animation library in zenCSLM.  As the
	// 'Object in hand' it will move with the mouse until the next mouseUp event occurs
	ZLM.registerNewObjectInHand(avatar,x,y,this);
	// For visibility, change the pointer to a crosshair during the drag to keep it from obscuring the text of the icon
	document.body.style.cursor="crosshair";

	ZDSM.Toolbar.avatar = avatar;

	this.lastX = x;
	this.lastY = y;
	this.updateGhost();

	return(ZLM.killEvent(event));
}


ZDSM.Toolbar.prototype.startDragFromPalette = function(who, event) {
	ZDSM.Toolbar.fromPalette = true;
	
	this.refreshBarBounds();

	var div = who;
	var id = div.getAttribute("iconId");
	var icon = this.findIcon(id);
	var clone = ZDSM.ToolBarItem.createFromJS(icon);
	var avatar = clone.base;

	avatar.style.position="absolute";
	document.body.appendChild(avatar);
	var x = event.clientX;
	if (x<0) x=0;
	var y = event.clientY;
	if (y<0) y=0;

	avatar.style.top=x+"px";
	avatar.style.left=y+"px";
	// Now, activate the animation by registering the dragIcon with the drag-animation library in zenCSLM.  As the
	// 'Object in hand' it will move with the mouse until the next mouseUp event occurs
	ZLM.registerNewObjectInHand(avatar,x,y,this);
	// For visibility, change the pointer to a crosshair during the drag to keep it from obscuring the text of the icon
	document.body.style.cursor="crosshair";

	ZDSM.Toolbar.avatar = avatar;

	return(ZLM.killEvent(event));
}

// Move the dragAvatar over by 2 pixels to prevent overlap with the crosshair cursor and account for any
// scrolling of the page itself.  While we're here, unselect any text that the browser may have mistakenly
// highlighted.
ZDSM.Toolbar.prototype.constrainDragX=function(mgr, wrapper, intendedX) {
	ZLM.killBrowserSelectionProcess();
	this.lastX = intendedX+ZLM.getPageXOffset()+2
	return(this.lastX);
}

// Internal hook for forcing a callback at the end of a drag, successful or not
ZDSM.Toolbar.endNotify=null;

// Like constrainDragX, we're moving the dragAvatar down by 2 pixels to
// prevent overlap with the  crosshair cursor and adjusting for any page scrolling
ZDSM.Toolbar.prototype.constrainDragY=function(mgr, wrapper, intendedY) {
	this.lastY = intendedY+ZLM.getPageYOffset()+2;
	this.updateGhost();
	return(this.lastY);
}

// Set up globals for marking the location of the drag's end.  If the operation ended in
// a valid drop zone, call the appropriate drop handler method.  In any case, clean up
// the workspace when we're done.
ZDSM.Toolbar.prototype.endDrag=function(mgr, wrapper){
	// get the location of the end-of-drag event
	var x=ZLM.getPageOffsetLeft(ZDSM.Toolbar.avatar);
	var y=ZLM.getPageOffsetTop(ZDSM.Toolbar.avatar);

	document.body.removeChild(ZDSM.Toolbar.avatar);
	if (x>this.barLX && x<this.barUX && y>this.barLY && y<this.barUY) {
		var b = ZDSM.Toolbar.avatar.controller;
		b.setScale("tiny");
		this.insertFeature(b,this.ghost.offsetLeft-1,false);
	}
	if (this.ghostActive) {
		this.refreshRibbon(false);
		this.ghostActive=false;
	} 	
}

ZDSM.Toolbar.prototype.dragIcon=function() {
	var div = ZLM.getDragSource();
	var id = div.getAttribute("iconId");
	var icon = findIcon(id,zenPage.iconLib);
	var clone = ZDSM.ToolBarItem.createFromJS(icon);
	ZLM.setDragAvatar(clone.base);
	return(true);
}


ZDSM.Toolbar.prototype.resizeToolIcons=function(sz) {
	this.setRenderSize(sz);
	this.refreshRibbon();

//resizeDisplay();

}

////
// Tool Bar Item
//  Exposed Attributes:
//    iconURI - icon if using bitmap
//    iconCVS - drawing callback if using canvas
//    iconDisabledURI - icon if using bitmap when disabled
//    iconDisabledCVS - drawing callback if using canvas when disabled
//    caption - text label associated with item
//    toolTip - expanded hint for using this tool
//    onselect - callback when active
//  Internal Attributes:
//    size - scale for icon render
//    width - should equal size
//    height - should either equal size or be size + label Size if showing labels
//    showLabel - should label be shown?
//    showBorder - should edge of item be shown?
//    editMode - if the parent tool bar in edit mode?
////
ZDSM.ToolBarItem=function(div) {
	ZLM.initializeObject(this,div,"ZDSM.ToolBarItem");

	this.disabled=false;
	this.showLabel = true;
	this.editMode = false;

	this.iconURI = null;
	this.iconCVS = null;
	this.iconDisabledURI = null;
	this.iconDisabledCVS = null;
	this.captionStr = null;
	this.toolTip = null;
	this.selectCB = null;

	var v = div.getAttribute("onselect");
	if (v) this.setSelectionCallback(v);

	var v = div.getAttribute("iconURI");
	if (v) this.setIconURI(v);

	var v = div.getAttribute("iconDisabledURI");
	if (v) this.setIconDisabledURI(v);

	var v = div.getAttribute("iconCVS");
	if (v) this.setIconCVS(v);

	var v = div.getAttribute("iconDisabledCVS");
	if (v) this.setIconDisabledCVS(v);

	var v = div.getAttribute("caption");
	if (v) this.setCaption(v);

	var v = div.getAttribute("toolTip");
	if (v) this.setToolTip(v);

	this.body = null;
	this.lblDiv = null;
	this.imgDiv = null;
	this.cvsDiv = null;

	this.createBody();

	ZLM.setLocalAttribute(div,"onclick","return((this.controller)? this.controller.serviceClick(event):null);");
	ZLM.setLocalAttribute(div,"onmouseover","return((this.controller) ? this.controller.serviceEnter(event):null);");
	ZLM.setLocalAttribute(div,"onmouseout","return((this.controller) ? this.controller.serviceExit(event):null);");
	ZLM.setLocalAttribute(div,"onmousedown","return((this.controller) ? this.controller.serviceDown(event):null);");
	ZLM.setLocalAttribute(div,"onmouseup","return((this.controller) ? this.controller.serviceUp(event):null);");

	this.setScale("small");
	this.setPosition("100px","100px");
	this.initialized=1;
	return(this);
}

ZDSM.ToolBarItem.create=function(caption,toolTip,onselect,iconURI,iconDisabledURI,iconCVS,iconDisabledCVS) {
	var div=document.createElement('div');
	if (caption) div.setAttribute("caption",caption);
	if (toolTip) div.setAttribute("toolTip",toolTip);
	if (onselect) div.setAttribute("onselect",onselect);
	if (iconURI) div.setAttribute("iconURI",iconURI);
	if (iconDisabledURI) div.setAttribute("iconDisabledURI",iconDisabledURI);
	if (iconCVS) div.setAttribute("iconCVS",iconCVS);
	if (iconDisabledCVS) div.setAttribute("iconDisabledCVS",iconDisabledCVS);


	return(new ZDSM.ToolBarItem(div));
}

ZDSM.ToolBarItem.createFromJS=function(o) {
	var item = ZDSM.ToolBarItem.create(o.caption,o.toolTip,o.onselect,o.iconURI,o.iconDisabledURI,o.iconCVS,o.iconDisabledCVS);
	if (o.disabled) item.disable(); // always created enabled
	if (o.id) item.setIconId(o.id);
// MANAGE OTHER FLAGS HERE
// SHOW LABEL
// SHOW BORDER
// EDIT MODE
	return(item);
}

ZDSM.ToolBarItem.initialize=function() {
	var bi = ZDSM.getElementsByClassName("zdsmToolBarItem");

	for (var i=0;i<bi.length;i++) {
		if (!bi[i].controller) var o=new ZDSM.ToolBarItem(bi[i]);
	}
}

ZDSM.ToolBarItem.prototype.serviceClick=function(event) {
}
ZDSM.ToolBarItem.prototype.serviceEnter=function(event) {
}
ZDSM.ToolBarItem.prototype.serviceExit=function(event) {
}
ZDSM.ToolBarItem.prototype.serviceDown=function(event) {
}
ZDSM.ToolBarItem.prototype.serviceUp=function(event) {
}


ZDSM.ToolBarItem.prototype.createBody=function() {
	var h=[];
	var sz = 32; // default size of icon
	var aHeight = sz;
	var aWidth = sz*1.25;
	var aPadLeft = sz*0.15625
	this.base.style.position="absolute";

	h.push("<a class='zdsmToolBarItem' style='width:"+aWidth+"px;height:"+aHeight+"px;padding-left:"+aPadLeft+"px;border:1px solid #000042;border-radius:8px;display:block;overflow:hidden;' ");
	if (this.toolTip) h.push("title='"+this.toolTip+"'");
	h.push(">");
	
	h.push("<img class='zdsmToolBarItemImg' width='"+sz+"px' height='"+sz+"px'");
	if (this.iconURI) h.push("src='"+this.iconURI+"' ");
	h.push("></img>");

	h.push("<canvas class='zdsmToolBarItemCvs' width='"+sz+"' height='"+sz+"'></canvas>");
	h.push("<div class='zdsmToolBarItemLbl' style=position:absolute;bottom:0px;left:0px;width:100%;text-align:center;font-family:sans-serif;white-space:nowrap;'>"+this.captionStr+"</div>");
	
	h.push("</a>");

	var b = this.base;
	b.innerHTML=h.join("");

	this.body = b.getElementsByClassName("zdsmToolBarItem")[0];
	this.imgDiv = b.getElementsByClassName("zdsmToolBarItemImg")[0];
	this.cvsDiv = b.getElementsByClassName("zdsmToolBarItemCvs")[0];
	this.lblDiv = b.getElementsByClassName("zdsmToolBarItemLbl")[0];
}

ZDSM.ToolBarItem.prototype.disable=function() {
	this.disabled=true;
	this.refresh();
}

ZDSM.ToolBarItem.prototype.enable=function() {
	this.disabled=false;
	this.refresh();
}

ZDSM.ToolBarItem.prototype.refresh=function() {
	if (this.iconURI && this.imgDiv) {
		this.imgDiv.style.display="block";
		this.cvsDiv.style.display="none";
		var currentIcon = this.imgDiv.src;
		if (this.disabled && this.iconDisabledURI) {
			if (currentIcon!=this.iconDisabledURI) this.imgDiv.src=this.iconDisabledURI;
			return;
		}
		if (currentIcon!=this.iconURI) this.imgDiv.src=this.iconURI;
	}
	else if (this.cvsDiv) {
		this.imgDiv.style.display="none";
		this.cvsDiv.style.display="block";
		if (this.disabled && this.iconDisabledCVS) {
			eval(this.iconDisabledCVS);
			return;
		}
		if (this.iconCVS) eval(this.iconCVS);
	}
}

ZDSM.ToolBarItem.prototype.setSelectionCallback=function(cb) {
	this.selectCB=cb;
}

ZDSM.ToolBarItem.prototype.setIconId=function(id) {
	this.iconId = id;
	this.base.setAttribute("iconId",id);
}

ZDSM.ToolBarItem.prototype.setIconURI=function(url) {
	this.iconURI=url;
	if (url && this.iconImg && !this.disabled) {
		this.iconImg.src=url;
		this.imgDiv.style.display="block";
		this.cvsDiv.style.display="none";
	}
}

ZDSM.ToolBarItem.prototype.setIconDisabledURI=function(url) {
	this.iconDisabledURI=url;
	if (url && this.iconImg && this.disabled) {
		this.iconImg.src=url;
		this.imgDiv.style.display="block";
		this.cvsDiv.style.display="none";
	}
}

ZDSM.ToolBarItem.prototype.setIconCVS=function(cb) {
	this.iconCVS=cb;
	if (cb && this.iconImg && !this.disabled) {
		this.imgDiv.style.display="none";
		this.cvsDiv.style.display="block";
	}
}

ZDSM.ToolBarItem.prototype.setIconDisabledCVS=function(cb) {
	this.iconDisabledURI=cb;
	if (cb && this.iconImg && this.disabled) {
		this.imgDiv.style.display="none";
		this.cvsDiv.style.display="block";
	}
}

ZDSM.ToolBarItem.prototype.setCaption=function(caption) {
	this.captionStr=caption;
	if (this.lblDiv) this.lblDiv.innerHTML=caption;
}

ZDSM.ToolBarItem.prototype.setToolTip=function(caption) {
	this.toolTip=caption;
	if (this.body) this.body.title=caption;
}

ZDSM.ToolBarItem.prototype.setWidth = function(w) {
	var wpx = w+"px";
	var wwpx = (1.25*w)+"px";
	this.width = w;
	this.base.style.width = wwpx;
	var raw = parseInt(w);
	if (this.body) {
		this.body.style.height = wpx;
		this.body.style.width = wwpx;
		this.body.style.paddingLeft = (0.15625*w)+"px";
		this.imgDiv.width = w;
		this.imgDiv.height = w;
		this.cvsDiv.style.width = w;
		this.cvsDiv.style.height = w;	
		this.cvsDiv.width = w;
		this.cvsDiv.height = w;	
		if (this.iconCVS) {
			if (this.disabled && this.iconDisabledCVS) eval(this.iconDisabledCVS);
			else eval(this.iconCVS);
		}
		this.refresh();
	}
}

ZDSM.ToolBarItem.prototype.setFontHeight = function(h) {
	if (this.lblDiv) this.lblDiv.style.fontSize=h+"px";
}

ZDSM.ToolBarItem.prototype.setHeight = function(h) {
	h= h+"px";
	this.base.style.height = h;
}

ZDSM.ToolBarItem.prototype.setTop = function(y) {
	this.base.style.top = y;
}

ZDSM.ToolBarItem.prototype.setLeft = function(x) {
	this.base.style.left = x;
}

ZDSM.ToolBarItem.prototype.setPosition = function(x,y) {
	this.base.style.left = x;
	this.base.style.top = y;
}

ZDSM.ToolBarItem.prototype.setScale = function(sz) {
	if (sz=="tiny") {
		this.setWidth(24);
		this.setHeight(39);
		this.setFontHeight(8);
	}
	else if (sz=="small") {
		this.setWidth(28);
		this.setHeight(45);
		this.setFontHeight(9);
	}
	else if (sz=="medium") {
		this.setWidth(32);
		this.setHeight(50);
		this.setFontHeight(10);
	}
	else if (sz=="large") {
		this.setWidth(40);
		this.setHeight(63);
		this.setFontHeight(13);	
	}
}

///////////////////////////////////////
/// Button Bar Item Specification Attributes
///	icon - The icon shown when enabled
///	grayIcon - The icon shown when disabled (default same as icon)
///	caption - The text label associated with this item
///	contextKey - The keyboard shortcut for this item (not currently implemented)
///	captionRender - Where and when to show the caption, one of "left","right",
///		or "rollover"  (default is "rollover")
///	onselect - callback function when activated
///////////////////////////////////////
ZDSM.ButtonBarItem=function(div) {
	ZLM.initializeObject(this,div,"ZDSM.ButtonBarItem");
	this.subMenu=ZDSM.getCascadeMenu(div);

	this.parentMenu=null;
	this.displayStr=null;		// text of caption
	this.contextKey=null;		// menu shortcut
	this.selectCB=null;
	this.captionRender=0;		// -1:left, 0:rollover, 1:right
	this.minHeight=0;
	this.minWidth=0;

	this.body=null;			// body container
	this.activeDiv=null;		// DOM Node for highlighting
	this.iconDiv=null;		// Normal icon
	this.grayIconDiv=null;		// Icon while disabled
	this.toolTipDiv=null;		// DOM Node object with stylized caption
	this.labelDiv=null;

	this.createBody();

	ZLM.setLocalAttribute(div,"onclick","return(this.controller.serviceClick(event));");
	ZLM.setLocalAttribute(div,"onmouseover","return(this.controller.highlight(event));");
	ZLM.setLocalAttribute(div,"onmouseout","return(this.controller.lowlight(event));");
	ZLM.setLocalAttribute(div,"onmousedown","return(this.controller.lower(event));");
	ZLM.setLocalAttribute(div,"onmouseup","return(this.controller.raise(event));");

	if (this.subMenu!=null) {
		this.subMenu.setParent(this.base);
		this.subMenu.setParentOffsetLeft(0);
	}

	this.initialized=1;
	this.disabled=false;
	return(this);
}

ZDSM.ButtonBarItem.prototype.createBody=function() {
	this.body=ZLM.makeElement('div',{style:'position:relative; top:0px; left:0px; width:100%; height:100%; border:none;'});
	this.base.appendChild(this.body);
	this.activeDiv=ZLM.makeElement('div',{style:'position:absolute; top:0; left:0; display:none;'} );
	ZLM.setSize(this.activeDiv,20,20,"2px outset #c0c0c0");
        this.body.appendChild(this.activeDiv);

	this.setIcon(this.base.getAttribute("icon"));
	this.setGrayIcon(this.base.getAttribute("grayIcon"));
	this.setCaption(this.base.getAttribute("caption"),this.base.getAttribute("contextKey"),this.base.getAttribute("captionRender"));
	this.setSelectionCallback(this.base.getAttribute("onselect"));
}

ZDSM.ButtonBarItem.prototype.setSelectionCallback=function(cb) {
	this.selectCB=cb;
}

ZDSM.ButtonBarItem.prototype.setIcon=function(url) {
	this.iconDiv=null;
	if (url) {
		this.iconDiv = ZLM.makeElement('img', {src:url,style:'position:absolute',onload:'ZDSM.ButtonBarItem.installIcon('+this.instanceNum+',this);'} ); 
	}
}

ZDSM.ButtonBarItem.prototype.setGrayIcon=function(url) {
	this.grayIconDiv=null;
	if (url) {
		this.grayIconDiv = ZLM.makeElement('img',{src:url,style:'position:absolute;',onload:'ZDSM.ButtonBarItem.installIcon('+this.instanceNum+',this);'}); 
	}
}

ZDSM.ButtonBarItem.prototype.setCaption=function(caption,contextKey,captionRender) {
	this.captionRender=0;
	if (captionRender=="left") this.captionRender--;
	if (captionRender=="right") this.captionRender++;
	this.displayStr = caption;
	this.contextKey= contextKey;

	if (this.toolTipDiv!=null) {
		this.body.removeChild(this.toolTipDiv);
		this.toolTipDiv=null;
	}
	if (this.labelDiv!=null) {
		this.body.removeChild(this.labelDiv);
		this.labelDiv=null;			
	}

	if (caption!=null) {
		this.caption=new ZDSM.Caption(this.displayStr,this.contextKey);
        	if (this.caption.base) {
			this.caption.base.style.padding="1px";
			if (this.captionRender==0) {

var a={'class':'zenToolTip','style':'position:absolute; z-index:10;'};
this.toolTipDiv=ZLM.makeElement('div',a);

				ZLM.reparent(this.caption.base,this.toolTipDiv);
				document.body.appendChild(this.toolTipDiv);
				this.caption.minW=this.caption.base.offsetWidth;
				this.caption.minH=this.caption.base.offsetHeight;
				this.toolTipDiv.style.display="none";
				ZLM.reparent(this.toolTipDiv,this.body);					
				ZLM.setWidth(this.toolTipDiv,this.caption.minW+2);
			}
			else {
				this.labelDiv=ZLM.makeElement('div',{class:'buttonBarFixedCaption',style:'position:absolute; display:block;'});
				ZLM.reparent(this.caption.base,this.labelDiv);
				document.body.appendChild(this.labelDiv);
				this.caption.minW=this.caption.base.offsetWidth;
				this.caption.minH=this.caption.base.offsetHeight-2;
				ZLM.reparent(this.labelDiv,this.body);					
				ZLM.setWidth(this.labelDiv,this.caption.minW+2);
			}
		}
	}
	else {
		this.captionRender=0;
	}
	if (contextKey) {
		ZLM.registerShortCut("alt-"+conKey.toLowerCase(),"ZDSM.serviceBarPick('"+caption+"');","page");
	}

	this.autoSize();
}

ZDSM.ButtonBarItem.create=function(icon) {
	var div=ZLM.makeElement('div',{class:'buttonBarItem',icon:icon}); 
	return(new ZDSM.ButtonBarItem(div));
}

ZDSM.ButtonBarItem.initialize=function() {
	var bi = ZDSM.getElementsByClassName("buttonBarItem");

	for (var i=0;i<bi.length;i++) {
		if (!bi[i].controller) var o=new ZDSM.ButtonBarItem(bi[i]);
	}
}

ZDSM.ButtonBarItem.installIcon=function(idx,imgDiv) {
	if (idx<0 || idx>=ZDSM.ButtonBarItem.registry.length) return;
	document.body.appendChild(imgDiv);
	var w=imgDiv.offsetWidth;
	var h=imgDiv.offsetHeight;
	var bbI=ZDSM.ButtonBarItem.registry[idx];
	if (imgDiv==bbI.grayIconDiv) {
		if (bbI.iconWidth==0) {
			bbI.iconWidth=w;
			bbI.iconHeight=h;
		}
		ZLM.reparent(bbI.grayIconDiv,bbI.body);
	}
	else {
		bbI.iconWidth=w;
		bbI.iconHeight=h;
		ZLM.reparent(bbI.iconDiv,bbI.body);
	}
	bbI.autoSize();
}

ZDSM.ButtonBarItem.prototype.autoSize=function() {
	var sz=10;
	if (this.iconDiv!=null) {
		sz=this.iconWidth;
		if (this.iconHeight>sz) sz=this.iconHeight;
	}
	if (this.grayIconDiv!=null) {
		if (this.grayIconWidth>sz) sz=this.grayIconWidth;
		if (this.grayIconHeight>sz) sz=this.grayIconHeight;
	}
	if (isNaN(sz))return;
	var h=sz;
	if (this.caption!=null && this.captionRender!=0 && this.caption.minH>h) h=this.caption.minH;
	var w=sz;
	if (this.iconDiv) var iconLeftOffset=Math.floor((w+6-this.iconWidth)/2);
	if (this.graycIconDiv) var grayIconLeftOffset=Math.floor((w+6-this.grayIconWidth)/2);

	if (this.labelDiv!=null) w+=this.caption.minW+4;
	h+=6;
	w+=6;
	if (this.iconDiv) {
		this.iconDiv.style.top=Math.floor((h-this.iconHeight)/2)+"px";
		if (this.captionRender!= -1) this.iconDiv.style.left=iconLeftOffset+"px";
		else if (this.captionRender==-1) { 
			this.iconDiv.style.left=(iconLeftOffset+this.caption.minW+4)+"px";
		}
	}
	if (this.grayIconDiv) {
		this.grayIconDiv.style.top=Math.floor((h-this.grayIconHeight)/2)+"px";
		if (this.captionRender!=-1) this.grayIconDiv.style.left=grayIconLeftOffset+"px";
		else if (this.captionRender==-1) {
			this.grayIconDiv.style.left=(grayIconLeftOffset+this.caption.minW+4)+"px";
		}
	}
	if (this.captionRender!=0) this.labelDiv.style.top=Math.floor((h-this.caption.minH)/2)+"px";
	if (this.captionRender== -1) this.labelDiv.style.left="2px";
	if (this.captionRender== 1) this.labelDiv.style.left=(iconLeftOffset+this.iconWidth+2)+"px";
	ZLM.setSize(this.activeDiv,w-4,h-4,"2px outset #7070a0");
	ZLM.setSize(this.base,w,h,"none");
	if (this.toolTipDiv!=null) {
		this.toolTipDiv.style.left=(w+12)+"px";
		this.toolTipDiv.style.top=(h+12)+"px";
	}
	this.minWidth=w;
	this.minHeight=h;
	if (this.parentMenu!=null) this.parentMenu.reorg();
}

ZDSM.ButtonBarItem.prototype.disable=function() {
	this.disabled=true;
	if (this.iconDiv!=null) this.iconDiv.style.display="none";
	if (this.grayIconDiv!=null) this.grayIconDiv.style.display="block";
}

ZDSM.ButtonBarItem.prototype.enable=function() {
	this.disabled=false;
	if (this.iconDiv!=null) this.iconDiv.style.display="block";
	if (this.grayIconDiv!=null) this.grayIconDiv.style.display="none";
}

ZDSM.ButtonBarItem.prototype.setParentMenu=function(barObj) {
	this.parentMenu=barObj;
}

ZDSM.ButtonBarItem.prototype.setSubMenu=function(menuObj) {
	this.subMenu=menuObj;
	if (this.subMenu!=null) {
		this.subMenu.setParent(this.base);
		this.subMenu.setParentOffsetLeft(0);
	}
}

ZDSM.ButtonBarItem.prototype.launchSubMenu=function() {
	if (this.subMenu==null) return;
	if (this.parentMenu.isVertical) {
		this.subMenu.setParentOffsetLeft(this.base.offsetWidth);
		this.subMenu.setParentOffsetTop(0);
	}
	else {
		this.subMenu.setParentOffsetTop(this.base.offsetHeight);
		this.subMenu.setParentOffsetLeft(0);
	}
	this.subMenu.show();
}

ZDSM.ButtonBarItem.prototype.serviceClick=function(event) {
	if (this.disabled==false) {
		if (this.toolTipDiv!=null) this.toolTipDiv.style.display="none";
		if (this.subMenu!=null) this.launchSubMenu();
		else if (this.selectCB!=null) eval(this.selectCB);
	}
	return(ZLM.killEvent(event));
}

ZDSM.ButtonBarItem.prototype.lowlight=function(event) {
	if (this.toolTipDiv!=null) this.hideToolTip();
	if (this.disabled) return;
	this.activeDiv.style.display="none";
	this.base.style.color=this.oldFg;
	return(ZLM.killEvent(event));
}

ZDSM.ButtonBarItem.prototype.highlight=function(event) {
	if (this.disabled) return;
	if (this.toolTipDiv!=null) this.showToolTip();
	this.activeDiv.style.display="block";
	this.base.style.color=this.activeFg;
	return(ZLM.killEvent(event));
}

ZDSM.ButtonBarItem.prototype.raise=function(event) {
	this.activeDiv.style.border="2px outset #7070a0";
	return(ZLM.killEvent(event));
}

ZDSM.ButtonBarItem.prototype.lower=function(event) {
	this.activeDiv.style.border="2px inset #505050";
	return(ZLM.killEvent(event));
}

ZDSM.ButtonBarItem.prototype.showToolTip=function() {
	var div=this.toolTipDiv;
	if (div.active!=1) {
		div.style.top=(this.body.offsetHeight+10)+"px";
		div.style.left=(this.body.offsetWidth+10)+"px";
		div.style.display="block";
		var t=ZLM.getPageOffsetTop(div);
		var l=ZLM.getPageOffsetLeft(div);
		div.style.top=t+"px";
		div.style.left=l+"px";
		document.body.appendChild(div);
		div.active=1;
	}
}

ZDSM.ButtonBarItem.prototype.hideToolTip=function() {
	var div=this.toolTipDiv;
	this.body.appendChild(div);
	div.style.display="none";
	div.active=0;
}

//==============================
// NEW BUTTON BAR PROTOTYPE
//==============================

ZDSM.ButtonBar=function(div) {
	ZLM.initializeObject(this,div,"ZDSM.ButtonBar");
	this.isVertical=false;
	this.reshapeCB=null;
	this.createBody();
	this.initialized=1;
	return(this)
}

ZDSM.ButtonBar.prototype.createBody=function() {
	this.option=[];
	this.body=ZLM.makeElement('div',{style:'position:relative; top:0px; left:0px; width:100%; height:100%; border:none;'});
	this.base.appendChild(this.body);
	// if this.base has any children of type ButtonBarItem, 
	// they should be converted into children of the menu
	for (var p=this.base.firstChild;p!=null;p=q) {
		var q=p.nextSibling;
		if (p.nodeType==1 && p.className=="buttonBarItem") {
			var opt=new ZDSM.ButtonBarItem(p);
			this.addOptionObject(opt);
		}
	}
	this.setOrientation(this.base.getAttribute("orientation"));
	this.setReshapeCB(this.base.getAttribute("onreshape"));
}

ZDSM.ButtonBar.prototype.setOrientation=function(str) {
	var oldOrientation=this.isVertical;
	if (str=="vertical") this.isVertical=true;
	else this.isVertical= false;
	if (oldOrientation!=this.isVertical) this.reorg();
}

ZDSM.ButtonBar.prototype.setReshapeCB=function(str) {
	this.reshapeCB=str;
}

ZDSM.ButtonBar.prototype.addOptionObject=function(optObj) {
	this.option[this.option.length]=optObj;
	ZLM.reparent(optObj.base,this.body);
	optObj.setParentMenu(this);
	this.reorg();
}

ZDSM.ButtonBar.prototype.reorg=function() {
	var mxH=0;
	var mxW=0;
	for (var i=0;i<this.option.length;i++) {
		var n=this.option[i];
		if (n.minWidth>mxW) mxW=n.minWidth;
		if (n.minHeight>mxH) mxH=n.minHeight;
	}
	if (this.isVertical) {
		ZLM.setWidth(this.body,mxW);
		var offset=0;
		for (var i=0;i<this.option.length;i++) {
			var n=this.option[i];
			n.base.style.top=offset+"px";
			n.base.style.left="0px";
			offset+=n.minHeight;	
		}
		ZLM.setHeight(this.base,offset);
	}
	else {
		ZLM.setHeight(this.body,mxH);
		if (ZDSM.evaluateFlag(this.base.getAttribute("fillWidth"))) {
			ZLM.setOffsetWidth(this.body,this.base.parentNode.clientWidth);
		}
		else {
			var offset=0;
			for (var i=0;i<this.option.length;i++) {
				var n=this.option[i];
				n.base.style.top="0px";
				n.base.style.left=offset+"px";
				offset+=n.minWidth;
			}
			ZLM.setWidth(this.base,offset);
		}	
	}
	if (this.reshapeCB!=null) eval(this.reshapeCB);
}

ZDSM.ButtonBar.prototype.getOptionObj=function(caption) {
	for (var i=0;i<this.option.length;i++) {
		var n=this.option[i];
		if (n.displayStr==caption) return(n);
	}
	return(null);
}

ZDSM.ButtonBar.prototype.disableOption=function(caption) {
	var n=this.getOptionObj(caption);
	if (n!=null) n.disable();
}

ZDSM.ButtonBar.prototype.enableOption=function(caption) {
	var n=this.getOptionObj(caption);
	if (n!=null) n.enable();
}

ZDSM.ButtonBar.create=function() {
	var div = ZLM.makeElement('div',{class:'buttonBar'});
	return(new ZDSM.ButtonBar(div));
}

ZDSM.ButtonBar.initialize=function() {
	var bb = ZDSM.getElementsByClassName("buttonBar");
	for (var i=0;i<bb.length;i++) {
		if (!bb[i].controller) var o=new ZDSM.ButtonBar(bb[i]);
	}
}



/////////////////////
// BASE INIT STUFF //
/////////////////////
ZDSM.mouseTrapSnap=function(event) {
	if (Math.abs(event.clientX-ZDSM.mouseTrap.initX)<5) return;
	if (Math.abs(event.clientY-ZDSM.mouseTrap.initY)<5) return;
}

ZDSM.initialize=function() {
//debugger;
	if (ZDSM.initialized==1) return;

	var styleStr = "'display:none; position:absolute; top:0; left:0; width:"+(ZDSM.getWindowWidth()-20)+"; height:"+(ZDSM.getWindowHeight()-20)+"; z-index:1; overflow:visible;'";
	ZDSM.mouseTrap = ZLM.makeElement('div',{id:'ZDSMMouseTrap',style:styleStr,onclick:'ZDSM.closeMenu(event);',oncontextmenu:'ZLM.killEvent(event);',onmouseup:'ZLM.killEvent(event);',onmouseover:'ZDSM.mouseTrapSnap(event);'});
	document.body.appendChild(ZDSM.mouseTrap);
	document.oncontextmenu=ZLM.killEvent;
	ZLM.initKeyboardHandler();
	ZLM.registerShortCut("escape","ZDSM.closeMenu(null);","page");
	ZLM.pushKeyContext("page");
	ZDSM.ButtonBar.initialize();
	ZDSM.MenuBar.initialize();
	ZDSM.ContextMenu.initialize();
	ZDSM.initialized=1;  
}

  
//==============================
// NEW MENU BAR ITEM PROTOTYPE
//==============================

ZDSM.MenuBarItem=function(div) {
	ZLM.initializeObject(this,div,"ZDSM.MenuBarItem");

	this.subMenu=null;

	this.parentMenu=null;

	this.body=null;			// body container
	this.activeDiv=null;		// DOM Node for higlighting
	this.displayStr=null;		// text of caption
	this.contextKey=null;		// menu shortcut

	this.caption=null;	// DOM Node object with stylized caption

	this.createBody();

	// parse out key coor shades
	var activeFore = ZLM.getCSSForegroundDefault("zdsmActiveMenuItem",document.body);
	var normalFore = ZLM.getCSSForegroundDefault("zdsmMenuItem",document.body);
	this.oldFg=ZLM.toHTMLColorSpec(normalFore);
	this.activeFg=ZLM.toHTMLColorSpec(activeFore);

	ZLM.setLocalAttribute(div,"onclick","return(this.controller.serviceClick(event));");
	ZLM.setLocalAttribute(div,"onmouseover","return(this.controller.highlight(event));");
	ZLM.setLocalAttribute(div,"onmouseout","return(this.controller.lowlight(event));");

	this.setSubMenu(ZDSM.getCascadeMenu(div));
	if (this.subMenu!=null) {
		this.subMenu.setParent(this.base);
		this.subMenu.setParentOffsetLeft(0);
	}

	this.initialized=1;
	this.disabled=false;
	return(this);
}

ZDSM.MenuBarItem.prototype.createBody=function() {
	this.body=ZLM.makeElement('div',{style:'position:relative; top:0px; left:0px; width:100%; height:100%; border:none;'});
	document.body.appendChild(this.body);
	this.activeDiv=ZLM.makeElement('div',{class:'zdsmActiveMenuItem',style:'position:absolute; top:0; left:0; width:100%; height:100%; display:none;'});
        this.body.appendChild(this.activeDiv);
	this.setCaption(this.base.getAttribute("caption"),this.base.getAttribute("contextKey"),this.base.getAttribute("kbdContext"));
	this.base.style.width=(this.caption.minW+this.caption.minH)+"px";
	this.caption.base.style.left=(this.caption.minH/2)+"px";
	ZLM.reparent(this.body,this.base);
}

ZDSM.MenuBarItem.prototype.setSubMenu=function(menuObj) {
	if (this.subMenu!=null) this.subMenu.purge;
	this.subMenu=menuObj;
	if (this.subMenu!=null) {
		this.subMenu.setParent(this.base);
		this.subMenu.setParentOffsetLeft(0);
	}
}

ZDSM.MenuBarItem.prototype.setCaption=function(caption,contextKey,kbdContext) {
	if (!kbdContext) kbdContext = "page";
	if (!caption) caption="(menu pick)";
	this.displayStr = caption;
	this.contextKey= contextKey;
	if (this.caption!=null) this.body.removeChild(this.caption.base);
	this.caption=new ZDSM.Caption(this.displayStr,this.contextKey);
        if (this.caption.base) {
		var s=this.caption.base.style;
		s.position="absolute";
		s.fontFamily=ZLM.getComputedNodeStyle(this.base,"fontFamily");
		s.fontSize=ZLM.getComputedNodeStyle(this.base,"fontSize");
		s.fontSizeAdjust=ZLM.getComputedNodeStyle(this.base,"fontSizeAdjust");
		s.fontStretch=ZLM.getComputedNodeStyle(this.base,"fontStretch");
		s.fontStyle=ZLM.getComputedNodeStyle(this.base,"fontStyle");
		s.fontVariant=ZLM.getComputedNodeStyle(this.base,"fontVariant");
		s.fontWeight=ZLM.getComputedNodeStyle(this.base,"fontWeight");

		this.body.appendChild(this.caption.base);
		this.caption.minW=this.caption.base.offsetWidth;
//ZLM.cerr(this.caption.minW);
		this.caption.minH=this.caption.base.offsetHeight;
		this.caption.base.style.width=this.caption.minW+"px";
	}

	if (contextKey) {
		ZLM.registerShortCut("alt-"+contextKey.toLowerCase(),this.objHook+"serviceClick();",kbdContext);
	}
}


ZDSM.MenuBarItem.create=function(caption,contextkey) {
	var div = document.createElement("div");
	div.className = "zdsmMenuBarItem";
	return(new ZDSM.MenuBarItem(div));
}

ZDSM.MenuBarItem.initialize=function() {
	var mi = ZDSM.getElementsByClassName("zdsmMenuBarItem");
	for (var i=0;i<mi.length;i++) {
		if (!mi[i].controller) var o=new ZDSM.MenuBarItem(mi[i]);
	}
}

ZDSM.MenuBarItem.prototype.setParentMenu=function(menuObj) {
	this.parentMenu=menuObj;
}

ZDSM.MenuBarItem.prototype.launchSubMenu=function() {
	if (this.subMenu==null) return;
	this.subMenu.setParentOffsetTop(this.base.offsetHeight);
	this.subMenu.show();
}

ZDSM.MenuBarItem.prototype.serviceClick=function(event) {
	if (this.disabled==false) {
		if (ZDSM.popupTrap) ZDSM.popupTrap.close(null);
		this.launchSubMenu();
	}
	return(ZLM.killEvent(event));
}

ZDSM.MenuBarItem.prototype.lowlight=function(event) {
	if (this.disabled) return;
	this.activeDiv.style.display="none";
	this.base.style.color=this.oldFg;
	return(ZLM.killEvent(event));
}

ZDSM.MenuBarItem.prototype.highlight=function(event) {
	if (this.disabled) return;

	this.activeDiv.style.display="block";
	this.base.style.color=this.activeFg;
	return(ZLM.killEvent(event));
}

//==============================
// NEW MENU BAR PROTOTYPE
//==============================
ZDSM.MenuBar=function(div) {
	ZLM.initializeObject(this,div,"ZDSM.MenuBar");
	this.createBody();
	this.initialized=1;
	return(this)
}

ZDSM.MenuBar.prototype.createBody=function() {
	this.option=[];
	this.body=ZLM.makeElement('div',{style:'position:relative; top:0px; left:0px; width:100%; height:100%; border:none;'});
	this.base.appendChild(this.body);
	// if this.base has any children of type zdsmMenuBarItem, 
	// they should be converted into children of the menu
	var p = ZDSM.getElementsByClassName("zdsmMenuBarItem",this.base);
	for (var i=0;i<p.length;i++) {
		var opt=new ZDSM.MenuBarItem(p[i]);
		this.addOptionObject(opt);
	}		
}

ZDSM.MenuBar.prototype.addOptionObject=function(optObj) {
	this.dirtyOptions=true;
	var oLeft=0;
//for (var i=0;i<this.option.length;i++) oLeft+=this.option[i].base.offsetWidth;
	for (var i=0;i<this.option.length;i++) oLeft+=(this.option[i].caption.minW+15);
	this.option[this.option.length]=optObj;
	optObj.base.style.left=oLeft+"px";
	ZLM.reparent(optObj.base,this.body);
	optObj.setParentMenu(this);
}

ZDSM.MenuBar.create=function() {
	var div = document.createElement("div");
	div.className = "zdsmMenuBar";
	return(new ZDSM.MenuBar(div));
}

ZDSM.MenuBar.initialize=function() {
	var mb = ZDSM.getElementsByClassName("zdsmMenuBar");
	for (var i=0;i<mb.length;i++) {
		if (!mb[i].controller) var o=new ZDSM.MenuBar(mb[i]);
	}
}


//==============================
// NEW MENU SEPARATOR PROTOTYPE
//==============================
ZDSM.MenuSeparator=function(div) {
	ZLM.initializeObject(this,div,"ZDSM.MenuSeparator");
	this.height=0;
	this.width=0;

	this.parentMenu=null;
	this.base.innerHTML="<div style='position:relative; border:1px inset #b0b0b0; height:1px;'></div>";
	this.body=this.base.firstChild;
	this.initialized=1;
	return(this);
}

ZDSM.MenuSeparator.create=function() {
	var div = document.createElement("div");
	div.className = "zdsmMenuSeparator";
	return(new ZDSM.MenuSeparator(div));
}

ZDSM.MenuSeparator.initialize=function() {
	var ms = ZDSM.getElementsByClassName("zdsmMenuSeparator");
	for (var i=0;i<ms.length;i++) {
		if (!ms[i].controller) var o=new ZDSM.MenuSeparator(ms[i]);
	}
}

ZDSM.MenuSeparator.prototype.setParentMenu=function(menuObj) {
	this.parentMenu=menuObj;
}

ZDSM.MenuSeparator.prototype.resize=function() {
	this.width=this.base.offsetWidth;
	this.height=this.base.offsetHeight;
	ZLM.setSize(this.body,this.width-20,1,"1px inset #909090");
	this.body.style.left="10px";
	this.body.style.top=(this.height-this.body.offsetHeight)/2+"px";	
}

//==============================
// NEW MENU ARROW PROTOTYPE
//==============================
ZDSM.MenuArrow=function(div) {
	ZLM.initializeObject(this,div,"ZDSM.MenuArrow");
	this.iconH=9;
	this.iconW=15;
	this.height=this.iconH;
	this.width=0;

	this.parentMenu=null;
	this.iconURL=this.base.getAttribute("icon");

	this.body=ZLM.makeElement('img',{src:this.iconURL,width:this.iconW,height:this.iconH,style:'position:absolute; top:0;'});
	this.base.appendChild(this.body);

	ZLM.setLocalAttribute(div,"onmouseover","ZDSM.MenuArrow.scrollCB(event,this);");
	ZLM.setLocalAttribute(div,"onmouseout","ZDSM.MenuArrow.noScrollCB(event,this);");
	ZLM.setLocalAttribute(div,"onclick","ZDSM.MenuArrow.jumpScrollCB(event,this);");

	this.initialized=1;
	return(this);
}

ZDSM.MenuArrow.create=function(iconURL) {
	var div=ZLM.makeElement('div',{icon:iconURL,style:'display:none; position:absolute;'}); 
	return(new ZDSM.MenuArrow(div));
}

ZDSM.MenuArrow.prototype.setParentMenu=function(menuObj) {
	this.parentMenu=menuObj;
}

ZDSM.MenuArrow.prototype.resize=function() {
	this.width=this.parentMenu.width;
	ZLM.setSize(this.base,this.width,this.height,"none");
	this.body.style.left=(this.width-this.iconW)/2+"px";
}

ZDSM.MenuArrow.scrollCB=function(event,who) {
	var a=who.controller;
	m=a.parentMenu;
	var dir=null;
	if (a==m.upArrow) dir="U";
	if (a==m.downArrow) dir="D";
	if (dir!=null) ZDSM.ContextMenu.startScroll(m.instanceNum,dir);
	ZLM.killEvent(event);
}

ZDSM.MenuArrow.noScrollCB=function(event,who) {
	var a=who.controller;
	m=a.parentMenu;	
	ZDSM.ContextMenu.stopScroll(m.instanceNum);
	ZLM.killEvent(event);
}

ZDSM.MenuArrow.jumpScrollCB=function(event,who) {
	var a=who.controller;
	m=a.parentMenu;
	if (a==m.upArrow) ZDSM.ContextMenu.jumpStart(m.instanceNum);
	if (a==m.downArrow) ZDSM.ContextMenu.jumpEnd(m.instanceNum);
	ZLM.killEvent(event);
}

//===========================
// NEW MENU ITEM PROTOTYPE
//===========================
/// Types of MenuItems:
///  Normal pick      - simple callback
///  Alternating pick - caption, icon and KBD shortcut toggles 
///  Toggle pick      - checkbox appearence toggles
///  Cascade          - gateway to a submenu
///  
/// Properties:
///  Icon		- normal bitmap icon, applies to NORM & ALT
///  GrayIcon		- gray normal icon to show when pick is disabled, appiles to NORM & ALT
///  AltIcon		- alt icon, applies to ALT
///  GrayAltIcon	- gray alternate icon, to show when pick is disabled in state 1, applies to ALT

///  Vector		- normal vector icon, replaces icon with canvas node
///  GrayVector		- disabled vector icon drawing method, replaces GrayIcon
///  AltVector		- alt vector icon, replaces altIcon
///  GrayAltVector	- vector replacement for GrayAltIcon

///  CheckIcon		- Dark-on-Light checkmark to show when pick is in state 1, applies to TGL
///  CheckIconInv	- Light-on-Dark checkmank to show when pick is in state 1, applies to TGL

///  Caption
///  ContextKey
///  Key
///  AltCaption
///  AltContextKey
///  AltKey

///  ToggleMode
///  OnSelect

ZDSM.MenuItem=function(div,kbdContext) {
	ZLM.initializeObject(this,div,"ZDSM.MenuItem");

	this.subMenu=null;
	this.parentMenu=null;
	this.selectCB=null;
	this.showCB=null;

	this.kbdContext = kbdContext;
	this.body=null;			// body container
	this.activeDiv=null;		// DOM Node for higlighting
	this.displayStr=null;		// text of caption
	this.contextKey=null;		// menu shortcut
	this.key=null;			// KBD shortcut
	this.altKey=null;		// Alternate KBD shortcut
	this.altContextKey=null;	// alternate menu shortcut
	this.altDisplayStr=null;	// alternate text of caption

	this.iconDiv=null;		// normal icon
	this.grayIconDiv=null;		// grayed out icon
	this.altIconDiv=null;		// alternate icon
	this.grayAltIconDiv=null;	// grayed out alternate icon

	this.canvas=null;		// canvas for vector icons
	this.vector=null;		// normal vector icon
	this.grayVector=null;		// grayed out vector icon
	this.altVector=null;		// alternate vector icon
	this.grayAltVector=null;	// grayed out alternate vector icon

	this.checkIconDiv=null;		// checkmark for toggles
	this.checkIconInvDiv=null;	// Inverted checkmark

	this.caption=null;	// DOM Node object with stylized caption
	this.altCaption=null;	// DOM Node object with stylized alternate caption

	this.keyDiv=null;	
	this.altKeyDiv=null;

	this.cascadeDiv=null;
	this.cascadeDivInv=null;

	this.toggleMode=ZDSM.evaluateFlag(div.getAttribute("toggleMode"));
	this.toggleState=0;

	this.createBody();
	this.setSubMenu(ZDSM.getCascadeMenu(div));

	// parse out key coor shades
	if (!ZDSM.MenuItemColorsDefined) {
		var activeFore = ZLM.getCSSForegroundDefault("zdsmActiveMenuItem",document.body);
		var normalFore = ZLM.getCSSForegroundDefault("zdsmMenuItem",document.body);
		var normalBG=ZLM.getCSSBackgroundDefault("zdsmContextMenu",document.body);
		ZDSM.MenuItemNormalColor = ZLM.toHTMLColorSpec(normalFore);
		ZDSM.MenuItemNormalDark = ZLM.isDarkRGB(normalFore);
		ZDSM.MenuItemActiveColor = ZLM.toHTMLColorSpec(activeFore);
		ZDSM.MenuItemActiveDark = ZLM.isDarkRGB(activeFore);
		ZDSM.MenuItemMutedColor = ZLM.toHTMLColorSpec(ZLM.averageColor(normalFore,normalBG));
	}

	this.oldFg = ZDSM.MenuItemNormalColor;
	this.normalDark = ZDSM.MenuItemNormalDark;
	this.activeFg = ZDSM.MenuItemActiveColor;
	this.activeDark =ZDSM.MenuItemActiveDark;
	this.mutedFG = ZDSM.MenuItemMutedColor;

	ZLM.setLocalAttribute(div,"onclick","return(this.controller.serviceClick(event));");
	ZLM.setLocalAttribute(div,"onmouseover","return(this.controller.highlight(event));");
	ZLM.setLocalAttribute(div,"onmouseout","return(this.controller.lowlight(event));");

	this.disabled=false;


	this.initialized=1;
	return(this);
}

ZDSM.MenuItemColorsDefined = false;
ZDSM.MenuItemNormalColor = "";
ZDSM.MenuItemNormalDark = "";
ZDSM.MenuItemActiveColor = "";
ZDSM.MenuItemActiveDark = "";
ZDSM.MenuItemMutedColor = "";

ZDSM.MenuItem.create=function(caption,icon,style,onselect,toggleMode,kbdContext,onshow) {
	var div=ZLM.simulateTag("div class='zdsmMenuItem' "+ZDSM.attribute("icon",icon)+ZDSM.attribute("toggleMode",toggleMode)+ZDSM.attribute("style",style)+ZDSM.attribute("caption",caption)); 
	if (onselect!=null) {
		ZLM.setLocalAttribute(div,"onselect",onselect);
	} 
	if (onshow!=null) {
		div.setAttribute("onshow",onshow);
	} 
	if (!kbdContext) kbdContext = "page";
	return(new ZDSM.MenuItem(div,kbdContext));
}

/// The body of a menu item is divided into four subregions
/// the icon area for icon, grayIcon, altIcon and checkmarks
/// the caption area for caption and altCaption
/// the key area for keyboard shortcuts
/// the cascade area for arrows to indicate submenus
/// a minWidth property for each area defines the overall
/// needed width of the menu item.  Some areas may be 0 width
/// the overall width of a menu will be taken by choosing the max of
/// minimum widths in each region to defin the width of the "column"
/// In addition, the entire body area is mirrored by an active div 
/// region used for highlighting.
ZDSM.MenuItem.prototype.createBody=function() {
	var b=document.createElement('div');
	b.innerHTML="<div style=''position:relative; top:0px; left:0px; width:100%; height:100%; border:none;'><div class='zdsmActiveMenuItem' style='position:absolute; top:0; left:0; width:100%; height:100%; display:none;'></div></div>";
	this.body = b.firstChild;
	this.activeDiv = this.body.firstChild;
	document.body.appendChild(this.body);
	this.setCaption(this.base.getAttribute("caption"),this.base.getAttribute("contextKey"));
	this.setKey(this.base.getAttribute("key"));
	ZLM.reparent(this.body,this.base);

	var d = document.createElement("canvas");
	d.width = 0;
	d.height = 0;
	var ds = d.style;
	ds.position = "absolute";
	ds.top = "0px";
	ds.left = "0px";
	this.canvas = d;
	this.body.appendChild(d);
}

ZDSM.MenuItem.prototype.updateBody=function() {
	this.skipRefresh = true;
	ZLM.reparent(this.body,document.body);
	// NOTE If in toggleMode you can't have icons or grayed Icons as the space is needed for the 
	// "checkmark" indicator.  By default this is a checkmark but could be some other marker as
	// defined by checkIcon
	if (this.pickType=="TGL") {
		this.setCheckIcon(this.base.getAttribute("checkIcon"));
		this.setCheckIconInv(this.base.getAttribute("checkIconInv"));		
		this.setSelectionCallback(this.base.getAttribute("onselect"));

		this.setIcon(null);
		this.setGrayIcon(null);
		this.setAltIcon(null);
		this.setGrayAltIcon(null);

		this.setVector(null);
		this.setGrayVector(null);
		this.setAltVector(null);
		this.setGrayAltVector(null);

		this.setAltCaption(null,null)
		this.setAltKey(null);
		this.removeCascade();
	}	
	else if (this.pickType=="CCD" ) {
		this.setIcon(this.base.getAttribute("icon"));
		this.setGrayIcon(this.base.getAttribute("grayIcon"));
		this.setVector(this.base.getAttribute("vector"));
		this.setGrayVector(this.base.getAttribute("grayVector"));
		this.addCascade();

		this.setCheckIcon(null);
		this.setCheckIconInv(null);		
		this.setAltIcon(null);
		this.setGrayAltIcon(null);
		this.setAltVector(null);
		this.setGrayAltVector(null);
		this.setAltCaption(null,null);
		this.setAltKey(null);
		this.setSelectionCallback(null);
	}
	else { // ALT or NML
		this.setIcon(this.base.getAttribute("icon"));
		this.setAltIcon(this.base.getAttribute("altIcon"));
		this.setGrayAltIcon(this.base.getAttribute("grayAltIcon"));
		this.setAltCaption(this.base.getAttribute("altCaption"),this.base.getAttribute("altContextKey"));

		this.setVector(this.base.getAttribute("vector"));
		this.setGrayVector(this.base.getAttribute("grayVector"));
		this.setAltVector(this.base.getAttribute("altVector"));
		this.setGrayAltVector(this.base.getAttribute("grayAltVector"));

		if (this.altDisplayStr!=null) this.setAltKey(this.base.getAttribute("altKey"));
		this.setSelectionCallback(this.base.getAttribute("onselect"));

		this.setCheckIcon(null);
		this.setCheckIconInv(null);		
		this.removeCascade();
	}

	if (this.subMenu!=null) this.subMenu.setParent(this.base);
	this.resize(this.getIconAreaWidth(),this.getCaptionAreaWidth(),this.getKeyAreaWidth(),this.getCascadeAreaWidth(),10);
	this.skipRefresh = false;
	this.refresh();
	ZLM.reparent(this.body,this.base);
}

ZDSM.MenuItem.prototype.removeSubMenu=function() {
	if (this.subMenu==null) return;
	this.subMenu.purge();
}

ZDSM.MenuItem.prototype.setPickType=function() {
	if (this.subMenu!=null) this.pickType="CCD";
	else if (this.toggleMode) this.pickType="TGL";
	else if (this.altCaption!=null) this.pickType="ALT";
	else this.pickType="NML";
	this.updateBody();
}

ZDSM.MenuItem.prototype.setSubMenu=function(menuObj) {
	this.removeSubMenu(); // get rid of any pre-existing submenus
	this.subMenu=menuObj;
	this.setPickType();
}

ZDSM.MenuItem.prototype.setIcon=function(iconURL) {
	if (this.iconDiv!=null) this.body.removeChild(this.iconDiv);
	if (iconURL  && this.pickType!="TGL")  {
		this.iconDiv=ZLM.makeElement('img',{src:iconURL,width:16,height:16,style:'position:absolute; display:block;'});
		this.iconDiv.minW=16;
		this.body.appendChild(this.iconDiv);
	}
	else this.iconDiv=null;
	this.refresh();
}

ZDSM.MenuItem.prototype.setGrayIcon=function(iconURL) {
	if (this.grayIconDiv!=null) this.body.removeChild(this.grayIconDiv);
	if (iconURL && this.pickType!="TGL") {
		this.grayIconDiv=ZLM.makeElement('img',{src:iconURL,width:'16',height:'16',style:'position:absolute; display:none; left:0px;'});
		this.grayIconDiv.minW=16;
		this.body.appendChild(this.grayIconDiv);
	}
	else this.grayIconDiv=null;
	this.refresh();
}

ZDSM.MenuItem.prototype.setAltIcon=function(iconURL) {
	if (this.altIconDiv!=null) this.body.removeChild(this.altIconDiv);
	if (iconURL && this.pickType=="ALT") {
		this.altIconDiv=ZLM.makeElement('img',{src:iconURL,width:'16',height:'16',style:'position:absolute; display:none; left:0px;'});
		this.altIconDiv.minW=16;
		this.body.appendChild(this.altIconDiv);
	}
	else this.altIconDiv=null;
	this.refresh();
}

ZDSM.MenuItem.prototype.setGrayAltIcon=function(iconURL) {
	if (this.grayAltIconDiv!=null) this.body.removeChild(this.grayAltIconDiv);
	if (iconURL && this.pickType=="ALT") {
		this.grayAltIconDiv=ZLM.makeElement('img',{src:iconURL,width:'16',height:'16',style:'position:absolute; display:none; left:0px;'});
		this.grayAltIconDiv.minW=16;
		this.body.appendChild(this.grayAltIconDiv);
	}
	else this.grayAltIconDiv=null;
	this.refresh();
}

//
ZDSM.MenuItem.prototype.setVector=function(iconCB) {
	if (iconCB  && this.pickType!="TGL")  {
		this.vector = iconCB;
	}
	else this.vector=null;
	this.refresh();
}

ZDSM.MenuItem.prototype.setGrayVector=function(iconCB) {
	if (iconCB && this.pickType!="TGL") {
		this.grayVector = iconCB;
	}
	else this.grayVector=null;
	this.refresh();
}

ZDSM.MenuItem.prototype.setAltVector=function(iconCB) {
	if (iconCB && this.pickType=="ALT") {
		this.altVector = iconCB;
	}
	else this.altVector=null;
	this.refresh();
}

ZDSM.MenuItem.prototype.setGrayAltVector=function(iconCB) {
	if (iconCB && this.pickType=="ALT") {
		this.grayAltVector = iconCB;
	}
	else this.grayAltVector=null;
	this.refresh();
}


//
ZDSM.MenuItem.prototype.setCaption=function(caption,contextKey) {
	if (!caption) caption="(menu pick)";
	this.displayStr = caption;
	this.contextKey= contextKey;
	if (this.caption!=null) this.body.removeChild(this.caption.base);
	this.caption=new ZDSM.Caption(this.displayStr,this.contextKey);
        if (this.caption.base) {
		this.body.appendChild(this.caption.base);
		this.caption.base.style.position="absolute";
		this.caption.minW=this.caption.base.offsetWidth;
		this.caption.base.style.position="relative";
	}
	if (contextKey) {
		ZLM.registerShortCut(contextKey.toLowerCase(),this.objHook+"serviceClick();",this.kbdContext);
		ZLM.registerShortCut("alt-"+contextKey.toLowerCase(),this.objHook+"serviceClick();",this.kbdContext);
	}

}

ZDSM.MenuItem.prototype.setAltCaption=function(caption,contextKey) {
	this.altDisplayStr = caption;
	this.altKey= contextKey;
	if (this.altCaption!=null) this.body.removeChild(this.caption.base);
	if (caption==null) {
		this.altCaption=null;
		return;
	}
	this.altCaption=new ZDSM.Caption(this.altDisplayStr,this.altContextKey);
        if (this.altCaption.base) {
		this.body.appendChild(this.altCaption.base);
		this.altCaption.base.style.position="absolute";
		this.altCaption.minW=this.altCaption.base.offsetWidth;
		this.altCaption.base.style.display="none";
	}
	if (contextKey) {
		ZLM.registerShortCut(contextKey.toLowerCase(),this.objHook+"serviceClick();",this.kbdContext);
		ZLM.registerShortCut("alt-"+contextKey.toLowerCase(),this.objHook+"serviceClick();",this.kbdContext);
	}

}

ZDSM.MenuItem.prototype.setKey=function(key) {
	this.key=key;
	if (this.keyDiv!=null) this.body.removeChild(this.keyDiv);
	if (key) {
		ZLM.registerShortCut(key.toLowerCase(),this.base.getAttribute("onselect"),"page");
		this.keyDiv=ZLM.makeElement('div',{style:'position:absolute; display:block;'});
		this.keyDiv.appendChild(document.createTextNode(key));
		this.body.appendChild(this.keyDiv);
		this.keyDiv.minW=this.keyDiv.offsetWidth;
	}
}

ZDSM.MenuItem.prototype.setAltKey=function(key) {
	this.altKey=key;
	if (this.altKeyDiv!=null) this.body.removeChild(this.altKeyDiv);
	if (key) {
		ZLM.registerShortCut(key.toLowerCase(),this.base.getAttribute("onselect"),"page");
		this.altKeyDiv=ZLM.makeElement('div',{style:'position:absolute; display:block;'});
		this.altKeyDiv.appendChild(document.createTextNode(key));
		this.body.appendChild(this.altKeyDiv);
		this.altKeyDiv.minW=this.altKeyDiv.offsetWidth;
		this.altKeyDiv.style.display="none";
	}
	else this.altKeyDiv=null;
}

ZDSM.MenuItem.prototype.setCheckIcon=function(iconURL) {
	if (this.checkIconDiv!=null) {
		this.body.removeChild(this.checkIconDiv);
		this.checkIconDiv=null;
	}
	if (this.pickType!="TGL") return;
	if (!iconURL) iconURL=ZDSM.CheckmarkIcon;
	this.checkIconDiv=ZLM.makeElement('img',{src:iconURL,width:'16',height:'16',style:'position:absolute; display:none; left:0px;'});
	this.checkIconDiv.minW=16;
	this.body.appendChild(this.checkIconDiv);
}

ZDSM.MenuItem.prototype.setCheckIconInv=function(iconURL) {
	if (this.checkIconInvDiv!=null) {
		this.body.removeChild(this.checkIconInvDiv);
		this.checkIconDiv=null;
	}
	if (this.pickType!="TGL") return;
	if (!iconURL) iconURL=ZDSM.InvCheckmarkIcon;
	this.checkIconInvDiv=ZLM.makeElement('img',{src:iconURL,width:'16',height:'16',style:'position:absolute; display:none; left:0px;'});
	this.checkIconInvDiv.minW=16;
	this.body.appendChild(this.checkIconInvDiv);
}

ZDSM.MenuItem.prototype.addCascade=function() {
	var d = document.createElement("canvas");
	d.width = 9;
	d.height = 15;
	var ds = d.style;
	ds.position = "absolute";
	ds.top = "0px";
	ds.right = "0px";
	this.cascadeDiv = d;
	ZIS.drawRightChevron(d);

	var d = document.createElement("canvas");
	d.width = 9;
	d.height = 15;
	var ds = d.style;
	ds.position = "absolute";
	ds.top = "0px";
	ds.right = "0px";
	this.cascadeDivInv = d;
	ZIS.drawRightChevronInv(d);

	if (this.normalDark==0) {
		this.cascadeDiv.style.display="none";
		this.cascadeDivInv.style.display="block";
	}
	this.body.appendChild(this.cascadeDivInv);
	this.body.appendChild(this.cascadeDiv);
	this.cascadeDiv.minW=9;
}

ZDSM.MenuItem.prototype.removeCascade=function() {
	if (this.cascadeDiv) {
		this.body.removeChild(this.cascadeDiv);
		this.body.removeChild(this.cascadeDivInv);
	}
	this.cascadeDiv=null;
	this.cascadeDivInv=null;
}

ZDSM.MenuItem.prototype.setParentMenu=function(menuObj) {
	this.parentMenu=menuObj;
	this.kbdContext = "menu"+menuObj.instanceNum;
}

ZDSM.MenuItem.prototype.getIconAreaWidth=function() {
	var w=0;
	if (this.vector||this.altVector||this.grayVector||this.grayAltVector) w=16;
	if (this.iconDiv!=null && this.iconDiv.minW>w) w=this.iconDiv.minW;
	if (this.grayIconDiv!=null && this.grayIconDiv.minW>w) w=this.grayIconDiv.minW;
	if (this.altIconDiv!=null && this.altIconDiv.minW>w) w=this.altIconDiv.minW;
	if (this.grayAltIconDiv!=null && this.grayAltIconDiv.minW>w) w=this.grayAltIconDiv.minW;
	if (this.checkIconDiv!=null && this.checkIconDiv.minW>w) w=this.checkIconDiv.minW;
	if (this.checkIconInvDiv!=null && this.checkIconInvDiv.minW>w) w=this.checkIconInvDiv.minW;
	return(w);
}

ZDSM.MenuItem.prototype.getCaptionAreaWidth=function() {
	var w=0;
	if (this.caption!=null && this.caption.minW>w) w=this.caption.minW;
	if (this.altCaption!=null && this.altCaption.minW>w) w=this.altCaption.minW;
	return(w);
}

ZDSM.MenuItem.prototype.getKeyAreaWidth=function() {
	var w=0;
	if (this.keyDiv!=null && this.keyDiv.minW>w) w=this.keyDiv.minW;
	if (this.altKeyDiv!=null && this.altKeyDiv.minW>w) w=this.altKeyDiv.minW;
	return(w);
}

ZDSM.MenuItem.prototype.getCascadeAreaWidth=function() {
	var w=0;
	if (this.cascadeDiv!=null && this.cascadeDiv.minW>w) w=this.cascadeDiv.minW;
	return(w);
}

ZDSM.MenuItem.prototype.resize=function(iSz,cSz,kSz,sSz,sp) {
	var h=this.base.clientHeight;
	var w=this.base.clientWidth;
	var textTop="0px";
	if (this.canvas) {
		this.canvas.width=h;
		this.canvas.height=h;
	}
	if (this.iconDiv!=null) {
		this.iconDiv.style.width=iSz+"px";
		this.iconDiv.style.top=((h-this.iconDiv.height)/2)+"px";
	}
	if (this.grayIconDiv!=null) {
		this.grayIconDiv.style.width=iSz+"px";
		this.grayIconDiv.style.top=((h-this.grayIconDiv.height)/2)+"px";
	}
	if (this.altIconDiv!=null) {
		this.altIconDiv.style.width=iSz+"px";
		this.altIconDiv.style.top=((h-this.altIconDiv.height)/2)+"px";
	}
	if (this.grayAltIconDiv!=null) {
		this.grayAltIconDiv.style.width=iSz+"px";
		this.grayAltIconDiv.style.top=((h-this.grayAltIconDiv.height)/2)+"px";
	}
	if (this.checkIconDiv!=null) {
		this.checkIconDiv.style.width=iSz+"px";
		this.checkIconDiv.style.top=((h-this.checkIconDiv.height)/2)+"px";
	}
	if (this.checkIconInvDiv!=null) {
		this.checkIconInvDiv.style.width=iSz+"px";
		this.checkIconInvDiv.style.top=((h-this.checkIconInvDiv.height)/2)+"px";
	}
	if (this.caption!=null) {
		this.caption.base.style.left=(iSz+sp)+"px";
		var textTop=((h-this.caption.base.offsetHeight)/2)+"px";
		this.caption.base.style.top=textTop;
	}
	if (this.altCaption!=null) {
		this.altCaption.base.style.left=(iSz+sp)+"px";
		this.altCaption.base.style.top=this.caption.base.offsetTop+"px"
		this.altCaption.base.style.top=textTop;
	}
	if (this.keyDiv!=null) {
		this.keyDiv.style.right=(sSz+sp)+"px";
		this.keyDiv.style.top=this.caption.base.offsetTop+"px"
		this.keyDiv.style.top=textTop;
	}
	if (this.altKeyDiv!=null) {
		this.altKeyDiv.style.right=(sSz+sp)+"px";
		this.altKeyDiv.style.top=this.caption.base.offsetTop+"px"
		this.altKeyDiv.style.top=textTop;
	}
	if (this.subMenu) {
		var top=((h-this.cascadeDiv.height)/2)+"px";
		this.cascadeDiv.style.top=top;
		this.cascadeDivInv.style.top=top;
		this.subMenu.setParentOffsetLeft(w+4);
		this.subMenu.setParentOffsetTop(h+4);
	}
	this.height=h;
	this.width=w;
}

ZDSM.MenuItem.prototype.setSelectionCallback=function(callbackStr) {
	this.selectCB=callbackStr;
}

ZDSM.MenuItem.prototype.setToggleState=function(binaryFlag) {
	if (this.toggleState!=binaryFlag) this.togglePick();
}

ZDSM.MenuItem.prototype.getToggleState=function() {
	return(this.toggleState);
}

ZDSM.MenuItem.prototype.serviceClick=function(event) {
	if (this.disabled==false) {
		if (this.subMenu==null) {
			if (this.toggleMode) this.togglePick();
			else if (this.altCaption!=null) this.alternatePick();
			if (this.selectCB!=null) eval(this.selectCB);
			else ZLM.cerr("No callback registered for menu item: "+this.displayStr);
			ZDSM.popupTrap.close();
		}
		else {
			if (!event) { // came here via keyboard
				this.subMenu.setParentOffsetLeft(this.base.offsetWidth+5);
				this.subMenu.setParentOffsetTop(0);
				if (this.parentMenu!=null) this.parentMenu.launchSubMenu(this.subMenu);
			}
		}
	}
	return(ZLM.killEvent(event));
}

ZDSM.MenuItem.prototype.refresh=function() {
	if (this.skipRefresh) return; // must be in batch initialization mode, svae refresh for later

	var renderDark = "none";
	var renderLight = "block";
	if (this.activeState && this.activeDark) {
		var renderDark="block";
		var renderLight="none";
	}
	if ((!this.activeState) && this.normalDark) {
		var renderDark="block";
		var renderLight="none";
	}

	if (this.pickType=="CCD" || this.pickType=="TGL") {
		if (this.cascadeDiv!=null) {
			this.cascadeDiv.style.display=renderDark;
			this.cascadeDivInv.style.display=renderLight;
		}
		if (this.toggleMode && this.toggleState==1) {
			this.checkIconDiv.style.display=renderDark;
			this.checkIconInvDiv.style.display=renderLight;
		}
		else if (this.checkIconDiv) { // don't show at all
			this.checkIconDiv.style.display="none";
			this.checkIconInvDiv.style.display="none";
		}
	}


	if (this.activeState) {
		this.activeDiv.style.display="block";
		this.base.style.color=this.activeFg;
	}
	else {
		this.activeDiv.style.display="none";
		this.base.style.color=this.oldFg;
	}

	if (this.disabled) {
		if (!this.oldFg) this.oldFg=ZLM.toHTMLColorSpec(ZLM.getRGBColor(this.base));
		if (this.cascadeDiv!=null) this.cascadeDiv.style.display="none";
		this.base.style.color=this.mutedFG;
	}
	else {
		if (this.cascadeDiv!=null) this.cascadeDiv.style.display="block";
		if (this.oldFg) this.base.style.color=this.oldFg;
	}

	var dspNormal = "block";
	var dspAlt = "none";
	if (this.toggleState && this.pickType!="TGL") { // switch to alternate values
		var dspNormal="none";
		var dspAlt="block";
	}
	if (this.caption)this.caption.base.style.display=dspNormal;
	if (this.altCaption)this.altCaption.base.style.display=dspAlt;

	if (this.keyDiv)this.keyDiv.style.display=dspNormal;
	if (this.altKeyDiv)this.altKeyDiv.style.display=dspAlt;

	var altState = 0;
	if (this.toggleState && this.pickType!="TGL") altState = 1;

	var renderMode = 0; // normal (most cases)
	if (altState) renderMode = 1; // alternate
	if (this.disabled) {
		if (altState) renderMode = 2; // alt disabled
		else renderMode = 3; // normal disabled
	}
	
	// Explore fallback for rendering
	if (renderMode==3) {
		if (this.grayVector) {
			eval(this.grayVector);
			this.configureIconDivs(0,0,0,0,1);
		}
		else {
			if (this.grayIconDiv) this.configureIconDivs(0,1,0,0,0);
			else renderMode = 0;
		}
	}
	if (renderMode==2) {
		if (this.grayAltVector) {
			eval(this.grayAltVector);
			this.configureIconDivs(0,0,0,0,1);
		}
		else {
			if (this.grayAltIconDiv) this.configureIconDivs(0,0,0,1,0);
			else renderMode=1;
		}
	}
	if (renderMode==1) {
		if (this.altVector) {
			eval(this.altVector);
			this.configureIconDivs(0,0,0,0,1);
		}
		else {
			if (this.altIcon) this.configureIconDivs(0,0,1,0,0);
			else this.renderMode = 0;
		}
	}

	if (renderMode==0) {
		if (this.vector) {
			eval(this.vector);
			this.configureIconDivs(0,0,0,0,1);
		} 
		else if (this.iconDiv) this.configureIconDivs(1,0,0,0,0);
	}
}

ZDSM.MenuItem.prototype.configureIconDivs=function(icon,grayIcon,altIcon,grayAltIcon,canvas) 
{
	if (this.iconDiv) {
		if (icon) this.iconDiv.style.display="block";
		else this.iconDiv.style.display="none";
	}
	if (this.grayIconDiv) {
		if (grayIcon) this.grayIconDiv.style.display="block";
		else this.grayIconDiv.style.display="none";
	}
	if (this.altIconDiv) {
		if (altIcon) this.altIconDiv.style.display="block";
		else this.altIconDiv.style.display="none";
	}
	if (this.grayAltIconDiv) {
		if (grayAltIcon) this.grayAltIconDiv.style.display="block";
		else this.grayAltIconDiv.style.display="none";
	}
	if (this.canvas && !canvas) {
		var ctx = this.canvas.getContext("2d");
		ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
}

ZDSM.MenuItem.prototype.togglePick=function() {
	this.toggleState=1-this.toggleState;
	this.refresh();
}

ZDSM.MenuItem.prototype.alternatePick=function() {
	this.toggleState=1-this.toggleState;
	this.refresh();
}

ZDSM.MenuItem.prototype.disable=function() {
	this.disabled=true;
	this.refresh();
}

ZDSM.MenuItem.prototype.enable=function() {
	this.disabled=false;
	this.refresh();
}

ZDSM.MenuItem.prototype.lowlight=function(event) {
	if (this.disabled) return;
	this.activeState = false;
	this.refresh();
	return(ZLM.killEvent(event));
}

ZDSM.MenuItem.prototype.highlight=function(event) {
	if (this.parentMenu!=null) this.parentMenu.closeSubMenu();
	if (this.disabled) return;
	this.activeState = true;
	this.refresh();
	if (this.subMenu) {
		this.subMenu.setParentOffsetLeft(this.base.offsetWidth+5);
		this.subMenu.setParentOffsetTop(0);
		if (this.parentMenu!=null) this.parentMenu.launchSubMenu(this.subMenu);
	}
	return(ZLM.killEvent(event));
}

ZDSM.MenuItem.prototype.notifyShow=function() {
	if (this.showCB) {
		eval(this.showCB);
	}
	this.refresh();
}

//===========================
// NEW CONTEXT MENU PROTOTYPE
//===========================


/// The context menu structure is a little funny in that most objects have the HTML base object as the
/// parent to the body of the subtree.  Context menus reverse this because they are outside the normal
/// flow of the document.  The base of the object is a pop-up pane and the body is the div derived from 
/// the HTML description. 
ZDSM.ContextMenu=function(div) {
	ZLM.initializeObject(this,div,"ZDSM.ContextMenu");
	this.base=ZDSM.PopupPane.create();
	this.body=div;
	this.minW=div.clientWidth;
	this.parent=null;
	this.option=null;
	this.menuDiv=null;
	this.upArrowDiv=null;
	this.downArrowDiv=null;
	this.openSub=null;
	this.width=0;
	this.height=0;
	this.maxHeight=0;
	this.scrollHome=0;
	this.scrollActive=false;
	this.scrollAtEnd=false;
	this.kbdContext = "menu"+this.instanceNum;

	this.base.setAutoClose(true);
	this.base.setOnCloseCB("ZLM.popKeyContext('"+this.kbdContext+"');");

	this.installLaunchHook(div.parentNode);

	ZLM.reparent(this.body,this.base.body);

	this.createMenuSubtree();

	this.dirtyOptions=true;

	this.initialized=1;
	return(this);
}

ZDSM.ContextMenu.showMenu=function(event, menuID) {
	if (menuID<0 || menuID>=ZDSM.ContextMenu.registry.length) return;
	var obj=ZDSM.ContextMenu.registry[menuID];
	obj.show(event.clientX,event.clientY);
}

ZDSM.ContextMenu.create=function(parentDiv) {
	var div=ZLM.makeElement('div',{class:'zdsmContextMenu'}); 
	div.style.position="absolute";
	if (parentDiv) parentDiv.appendChild(div);
	return(new ZDSM.ContextMenu(div));
}

ZDSM.ContextMenu.initialize=function() {
	var cms = ZDSM.getElementsByClassName("zdsmContextMenu");
	for (var i=0;i<cms.length;i++) {
		if (!cms[i].controller) var o=new ZDSM.ContextMenu(cms[i]);
	}
}

ZDSM.ContextMenu.prototype.installLaunchHook=function(srcDiv) {
	if (!srcDiv) return;
	if (ZLM.isZen()) srcDiv=srcDiv.parentNode;
	ZLM.setLocalAttribute(srcDiv,"oncontextmenu",this.objHook+"show(event.clientX,event.clientY);return(ZLM.killEvent(event));");	
}

ZDSM.ContextMenu.prototype.purge=function() {
	this.base.purge();
}

ZDSM.ContextMenu.prototype.setParent=function(parentDiv) {
	this.parent=parentDiv;
	this.base.setLaunchReference(this.parent);
}

ZDSM.ContextMenu.prototype.setParentOffsetLeft=function(pix) {
	this.base.setLaunchOffsetLeft(pix);
}

ZDSM.ContextMenu.prototype.setParentOffsetTop=function(pix) {
	this.base.setLaunchOffsetTop(pix);
}

ZDSM.ContextMenu.prototype.closeSubMenu=function() {
	if (this.openSub!=null) {
		this.openSub.hide();
		this.openSub=null;
	}
}

ZDSM.ContextMenu.prototype.launchSubMenu=function(menuObj) {
	this.closeSubMenu();
	if (menuObj!=null) {
		this.openSub=menuObj;
		this.openSub.show();
	}
}

ZDSM.ContextMenu.prototype.getOptionObj=function(caption) {
	for (var i=0;i<this.option.length;i++) {
		var n=this.option[i];
		if (n.displayStr==caption) return(n);
		if (n.altDisplayStr==caption) return(n);
	}
	return(null);
}

ZDSM.ContextMenu.prototype.disableOption=function(caption) {
	var n=this.getOptionObj(caption);
	if (n!=null) n.disable();
}

ZDSM.ContextMenu.prototype.enableOption=function(caption) {
	var n=this.getOptionObj(caption);
	if (n!=null) n.enable();
}


ZDSM.ContextMenu.prototype.show=function(x,y) {
	ZLM.killBrowserSelectionProcess();
	this.base.show(x,y);
	var pY=ZLM.getPageOffsetTop(this.base.base);
	var wH=ZLM.getViewportHeight();
	this.maxHeight=wH-pY-16;
	if (this.dirtyOptions) this.alignPicks();
	this.setItemVisibility();
	// MAY WANT TO ADD BOUNCE BACK FOR MENUS 
	// BEING BROUGHT UP TOO CLOSE TO THE EDGE
	// OF THE FRAME HERE
	ZLM.pushKeyContext(this.kbdContext);
	// If any items have asked to be notified when they
	// are being shown, do it here
	var len = this.option.length;
	for (var i=0;i<len;i++){
		var n = this.option[i];
		if (n.notifyShow) n.notifyShow();
	}
}

ZDSM.ContextMenu.prototype.hide=function() {
	this.closeSubMenu();
	this.base.hide();
	ZLM.popKeyContext(this.kbdContext);
}

ZDSM.ContextMenu.scroll=function(menuId,dir) {
	var m = ZDSM.ContextMenu.registry[menuId];
	if (m.scrollActive==true) {
		if (dir=="U") {
			if (m.scrollHome>0) {
				m.scrollHome--;
				m.setItemVisibility(200);
			}
			else m.scrollActive=false;
		}
		else if (dir=="D") {
			if (m.scrollAtEnd==false) {
				m.scrollHome++;
				m.setItemVisibility(200);
				if (m.scrollAtEnd) m.scrollActive=false;
			}
			else m.scrollActive=false;			
		}
	}
	if (m.scrollActive==true) setTimeout("ZDSM.ContextMenu.scroll("+menuId+",'"+dir+"');",100);	
}

ZDSM.ContextMenu.startScroll=function(menuId, dir) {
	var m = ZDSM.ContextMenu.registry[menuId];
	m.scrollActive=true;
	setTimeout("ZDSM.ContextMenu.scroll("+menuId+",'"+dir+"');",100);
}

ZDSM.ContextMenu.stopScroll=function(menuId) {
	var m = ZDSM.ContextMenu.registry[menuId];
	m.scrollActive=false;
}

ZDSM.ContextMenu.jumpStart=function(menuId) {
	ZDSM.ContextMenu.stopScroll(menuId);
	var m = ZDSM.ContextMenu.registry[menuId];
	m.scrollHome=0;
	m.setItemVisibility(200);
}

ZDSM.ContextMenu.jumpEnd=function(menuId) {
	ZDSM.ContextMenu.stopScroll(menuId);
	var m = ZDSM.ContextMenu.registry[menuId];
	while (m.scrollAtEnd==false) {
		m.scrollHome++;
		m.setItemVisibility(200);
	}
}

// Given a context menu with a fixed height and defined 
// scrollHome, determine (and force) the visibility and 
// location of its contents.
ZDSM.ContextMenu.prototype.setItemVisibility=function() {
	var lastKid = -1;
	var top=0;
	var newH=0;
	var oldH=this.base.base.clientHeight;
	if (this.scrollHome!=0) {
		top+=this.upArrow.height;
		this.upArrow.base.style.display="block";
		this.upArrow.base.style.top="0px";
	}
	else this.upArrow.base.style.display="none";
 
	var clear=true;
	for (var i=0;i<this.option.length;i++) {
		var n=this.option[i];
		if (i<this.scrollHome) {
			n.base.style.display="none";
		}
		else {
			if (clear && top+n.height>this.maxHeight) {
				clear=false;
				lastKid=i-1;
			}
			if (clear) { 
				n.base.style.display="block";
				n.base.style.top=top+"px";
				top+=n.height;
			}
			else n.base.style.display="none";
		}
	}
	if ((lastKid!= -1) && ((lastKid+1)!=this.option.length)) { // need a down arrow
		var vSpace=this.maxHeight-top;
		if (vSpace<this.downArrow.height) { // need to trim list
			this.option[lastKid].base.style.display="none";
			lastKid--;
			top-=this.option[lastKid].height;
		}
		this.downArrow.base.style.display="block";
		newH=this.maxHeight;
		this.downArrow.base.style.top=(newH-this.downArrow.height)+"px";
		this.scrollAtEnd=false;
	}
	else {
		this.downArrow.base.style.display="none";
		newH=top
		if (lastKid!=-1) newH+=this.option[lastKid].height;
		this.scrollAtEnd=true;
	}
	if (newH!=oldH) {
//ZLM.cerr("SYncH "+newH+" "+oldH+" top:"+top+" mx:"+this.maxHeight);
		this.base.base.style.height=newH+"px";
		ZDSM.popupTrap.syncShadow();
	}
}

ZDSM.ContextMenu.prototype.createMenuSubtree=function() {
	this.option=[];
	this.menuDiv=ZLM.makeElement('div',{style:'position:relative; top:0px; left:0px; width:100%; height:100%; border:none;'});
	this.body.appendChild(this.menuDiv);

	this.upArrow=ZDSM.MenuArrow.create(ZDSM.UpArrowIcon);
	this.upArrow.setParentMenu(this);
	this.menuDiv.appendChild(this.upArrow.base);
	this.downArrow=ZDSM.MenuArrow.create(ZDSM.DownArrowIcon);
	this.downArrow.setParentMenu(this);
	this.menuDiv.appendChild(this.downArrow.base);

	// if this.base has any children of type zdsmMenuItem, 
	// they should be converted into children of the menu
	for (var p=this.body.firstChild;p!=null;p=q) {
		var q=p.nextSibling;
		if (p.nodeType==1) {
			if (p.className=="zdsmMenuItem") {
				var opt=new ZDSM.MenuItem(p,this.kbdContext);
				this.addOptionObject(opt);
			}
			else if (p.className=="zdsmMenuSeparator") {
				var opt=new ZDSM.MenuSeparator(p);
				this.addOptionObject(opt);
			}
		}
	}
}

ZDSM.ContextMenu.prototype.addOptionObject=function(optObj) {
	this.dirtyOptions=true;
	this.option[this.option.length]=optObj;
	ZLM.reparent(optObj.base,this.menuDiv);
	optObj.setParentMenu(this);
}

ZDSM.ContextMenu.prototype.alignPicks=function() {
	var h=0;
	this.dirtyOptions=false;
	var iSz=0;
	var cSz=0;
	var kSz=0;
	var sSz=0;
	var w=0;
	for (var i=0;i<this.option.length;i++) {
		var n=this.option[i];
		if (n.objClass=="ZDSM.MenuItem") {
			w=n.getIconAreaWidth();
			if (w>iSz) iSz=w;
			w=n.getCaptionAreaWidth();
			if (w>cSz) cSz=w;
			w=n.getKeyAreaWidth();
			if (w>kSz) kSz=w;
			w=n.getCascadeAreaWidth();
			if (w>sSz) sSz=w;
		}
	}
	var tW=iSz+cSz+kSz+sSz+15;
	if (tW>this.minW) {
		this.base.base.style.width=tW+"px";
		this.body.style.width="100%";
	}
	for (var i=0;i<this.option.length;i++) {
		var n=this.option[i];
		if (n.objClass=="ZDSM.MenuItem") n.resize(iSz,cSz,kSz,sSz,5);
		else if (n.objClass=="ZDSM.MenuSeparator") n.resize();
		n.base.style.top=h+"px";
		h+=n.base.offsetHeight;
	}
	this.base.base.style.height=h+"px";
	this.width=this.base.base.clientWidth;
	this.height=this.base.base.clientHeight;
	this.upArrow.resize();
	this.downArrow.resize();
	if (this.option.length==1) this.minHeight=this.height;
	else if (this.option.length==2) this.minHeight=this.option[0].base.offsetHeight+this.upArrow.height;
	else this.minHeight=this.option[0].base.offsetHeight+2*this.upArrow.height;
	if (this.maxHeight<this.minHeight) this.maxHeight=this.minHeight;
}

//===========================================
// Local Mouse Trap Object
//===========================================
ZDSM.popupTrap=null;

ZDSM.MouseTrap=function(div) {
	this.base=div;
	div.controller=this;
	div.style.position="absolute";
	div.style.top="0";
	div.style.left="0";
	div.style.width="100%";
	ZLM.setLocalAttribute(div,"onclick","this.controller.close(event);");
	ZLM.setLocalAttribute(div,"oncontextmenu","return(ZLM.killEvent(event));");
	ZLM.setLocalAttribute(div,"onmouseup","return(ZLM.killEvent(event));");
	this.pup = [];
	this.active=[];
	this.activePups=0;
	return(this);	
}

ZDSM.MouseTrap.create=function() {
	var div = ZLM.makeElement('div',{class:'zmsMouseTrap'});
	document.body.appendChild(div);
	return(new ZDSM.MouseTrap(div));
}

ZDSM.MouseTrap.prototype.launch=function() {
        this.base.style.height=(ZLM.getViewportHeight()-20)+"px";
	this.base.style.display="block";
	this.base.style.zIndex="100";
}

ZDSM.MouseTrap.prototype.close=function(event) {
	while (this.activePups>0) {
		var obj=this.active.pop();
		if (obj.autoClose==false) {
			this.active.push(obj);
			return;
		}
		this.activePups-=2;
		obj.base.style.display="none";	
		obj.shadow.style.display="none";
		if (obj.oncloseCB) eval(obj.oncloseCB);

	}
	this.base.style.display="none";
}

ZDSM.MouseTrap.prototype.addTransient=function(obj) {
	this.pup[this.pup.length]=obj;
	this.base.appendChild(obj.base);
}

ZDSM.MouseTrap.prototype.findTransient=function(obj) {
	for (var i=0;i<this.pup.length;i++) if (obj==this.pup[i]) return(i);
	return(-1);
}

ZDSM.MouseTrap.prototype.deleteTransient=function(obj) {
	for (var i=0;i<this.pup.length;i++) {
		if (obj==this.pup[i]) {
			this.base.removeChild(obj.base);
			this.pup[i]=null;
		}
	}
}

ZDSM.MouseTrap.prototype.showTransient=function(obj) {
	this.active.push(obj);
	if (this.activePups==0) this.launch();
	this.activePups+=2; 
	var d=ZLM.getDepth(this.base);
	obj.base.style.display="block";	
	obj.base.style.zIndex=d+this.activePups;
	setTimeout("ZDSM.popupTrap.syncShadow();",0);
	obj.shadow.style.display="block";
	ZLM.reparent(obj.shadow,this.base);
	obj.shadow.style.top=obj.base.offsetTop+4+"px";
	obj.shadow.style.left=obj.base.offsetLeft+4+"px";
	obj.shadow.style.width=obj.base.offsetWidth+"px";
	obj.shadow.style.height=obj.base.offsetHeight+"px";
	obj.shadow.style.zIndex=d+this.activePups-1;
}

ZDSM.MouseTrap.prototype.syncShadow=function() {
	var obj=this.active.pop();
	obj.shadow.style.top=obj.base.offsetTop+4+"px";
	obj.shadow.style.left=obj.base.offsetLeft+4+"px";
	obj.shadow.style.width=obj.base.offsetWidth+"px";
	obj.shadow.style.height=obj.base.offsetHeight+"px";
	this.active.push(obj);
}
	
ZDSM.MouseTrap.prototype.hideTransient=function(obj) {
	var idx= -1;
	for (var i=this.active.length-1;i>=0;i--) {
		if (this.active[i]==obj) {
			idx=i;
			i= -1;
		}
	}
	if (idx<0) return;
	for (var i=idx;i<this.active.length-1;i++) {
		this.active[i]=this.active[i+1];
	}
	this.active.pop();
	this.activePups-=2;
	obj.base.style.display="none";
	obj.shadow.style.display="none";
	if (obj.oncloseCB) eval(obj.oncloseCB);
	if (this.activePups<=0) this.base.style.display="none";
}

//=======================================================================================================
// A PopupPane is a group container with an edge and a shadow used for pop-up elements like the
// color palette control it has a reference object and an offset to dictate where on the screen it should
// appear.  It is always launched three levels higher than its reference object (or at level 100 if the 
// reference object is the mouse pointer) and may be set to automatically pop-away (or not) if the user 
// clicks outside of its bounds.  If no launchReference exists, it is assumed to be the current mouse
// location.
// 
// HTML spec:
// <div class="zdsmPopupPane" launchReference=_id_ launchOffsetLeft=_#_ launchOffsetRight=_#_ autoClose={true|false} >
//  _..._
// </div>

ZDSM.PopupPane=function(div) {
	if (ZDSM.popupTrap==null) ZDSM.popupTrap=ZDSM.MouseTrap.create();
	this.base=div;
	div.controller=this;
	this.body=ZLM.makeElement('div',{style:'position:relative; top:0; left:0; width:100%; height:100%; border:none; display:block;'});
	this.base.appendChild(this.body);
	div.style.position="absolute";
	div.style.display="none";
	div.style.overflow="visible";

	var refId=div.getAttribute("launchReference");
	if (refId) this.refDiv=document.getElementById(refId);
	else this.refDiv=null;

	var x=div.getAttribute("launchOffsetLeft");
	if (x) this.offsetX=parseInt(x);
	else this.offsetX=0;

	var y=div.getAttribute("launchOffsetTop");
	if (y) this.offsetY=parseInt(y);
	else this.offsetY=0;

	if (div.getAttribute("autoClose")=="false") this.autoClose=false;
	else this.autoClose=true;

	var s=ZLM.makeElement('div',{class:'zdsmShadow',style:'position:absolute'});
	this.base.appendChild(s);
	this.shadow=s;
	ZDSM.popupTrap.addTransient(this);
	return(this);
}

ZDSM.PopupPane.create=function() {
	var div=ZLM.makeElement('div',{class:'zdsmPopupPane'});
	return(new ZDSM.PopupPane(div));
}

ZDSM.PopupPane.prototype.purge=function() {
	ZDSM.popupTrap.deleteTransient(this);
}

ZDSM.PopupPane.prototype.setAutoClose=function(flag) {
	this.autoClose=ZDSM.evaluateFlag(flag);	
}

ZDSM.PopupPane.prototype.setOnCloseCB=function(str) {
	this.oncloseCB = str;
}

ZDSM.PopupPane.prototype.setLaunchOffsetLeft=function(pixels) {
	this.offsetX=pixels;
}

ZDSM.PopupPane.prototype.setLaunchOffsetTop=function(pixels) {
	this.offsetY=pixels;
}

ZDSM.PopupPane.prototype.setLaunchReferenceById=function(refId) {
	if (refId) this.refDiv=document.getElementById(refId);
	else this.refDiv=null;	
}

ZDSM.PopupPane.prototype.setLaunchReference=function(div) {
	this.refDiv=div;
}


ZDSM.PopupPane.prototype.show=function(x,y) {
	ZLM.killBrowserSelectionProcess();
// FOR NOW, just spit out the pane at the appropriate place
// LATER we'll figure out if it actually fits on the screen without scrolling
	if (x==undefined) {
		if (this.refDiv) {
			x=ZLM.getPageOffsetLeft(this.refDiv)+this.offsetX;
			y=ZLM.getPageOffsetTop(this.refDiv)+this.offsetY;
		}
		else {
			x=0;
			y=0;
		}
	}
	this.base.style.top=y+"px";
	this.base.style.left=x+"px";
	ZDSM.popupTrap.showTransient(this);
}

ZDSM.PopupPane.prototype.hide=function() {
	ZDSM.popupTrap.hideTransient(this);
}

//=======================================================================================================
// A ModalPane is a group container with an edge and a shadow used for pop-up dialog elements.  It has a 
// reference object and is centered on screen with respect to that object.  A reference object of null
// implies the screen itself.  It is always launched three levels higher than its reference object (or at 
// level 100 if the reference object is the screen) and blocks user mouse clicks outside of its bounds.  
// 
// HTML spec:
// <div class="modalPane" launchReference=_id_ okayStr=_str_ cancelStr=_str_ title=_str_ >
//  _..._
// </div>

ZDSM.ModalPane=function(div) {
	if (ZDSM.popupTrap==null) ZDSM.popupTrap=ZDSM.MouseTrap.create();
	this.base=div;
	div.controller=this;
	this.instanceNum=ZDSM.ModalPane.registerInstance(this);

	this.width=div.offsetWidth;
	this.height=div.offsetHeight;

	var refId=div.getAttribute("launchReference");
	if (refId) this.refDiv=document.getElementById(refId);
	else this.refDiv=null;

	this.okayStr=div.getAttribute("okayStr");
	if (this.okayStr==null) this.okayStr="Okay";

	this.cancelStr=div.getAttribute("cancelStr");
	if (this.cancelStr==null) this.cancelStr="Cancel";

	this.title=div.getAttribute("titleStr");
	if (this.title==null) this.title="ModalPane Popup";

	this.onAcceptCB=div.getAttribute("onaccept");
	this.onCancelCB=div.getAttribute("oncancel");

	this.offsetX=0;
	this.offsetY=0;
	this.autoClose=false;

	this.buildBody();
	var s=ZLM.makeElement('div',{class:'zdsmShadow',style:'position:absolute'});
	this.base.appendChild(s);
	this.shadow=s;
	ZDSM.popupTrap.addTransient(this);
	ZLM.setLocalAttribute(this.cancel,"onclick","ZDSM.ModalPane.serviceButton("+this.instanceNum+",event);");
	ZLM.setLocalAttribute(this.okay,"onclick","ZDSM.ModalPane.serviceButton("+this.instanceNum+",event);");
	return(this);
}

ZDSM.ModalPane.registry=[];

ZDSM.ModalPane.create=function(title) {
	var div=ZLM.makeElement('div',{class:'modalPane',titleStr:title});
	return(new ZDSM.ModalPane(div));
}

ZDSM.ModalPane.registerInstance=function(obj) {
	var idx=ZDSM.ModalPane.registry.length;
	ZDSM.ModalPane.registry[idx]=obj;
	return(idx);
}

ZDSM.ModalPane.serviceButton=function(idx,event) {
	var p=ZDSM.ModalPane.registry[idx];
	var t=event.target;
	if (t==p.cancel) p.cancelCB();
	else if (t==p.okay) p.acceptCB();
}

ZDSM.ModalPane.prototype.cancelCB=function() {
	if (this.onCancelCB!=null) eval(this.onCancelCB);
	this.hide();
}

ZDSM.ModalPane.prototype.acceptCB=function() {
	if (this.onAcceptCB!=null) eval(this.onAcceptCB);
	this.hide();
}

ZDSM.ModalPane.prototype.setOnAccept=function(fnCB) {
	this.onAcceptCB=fnCB;
}

ZDSM.ModalPane.prototype.setOnCancel=function(fnCB) {
	this.onCancelCB=fnCB;
}

ZDSM.ModalPane.prototype.buildBody=function() {
	this.body=ZLM.makeElement('div',{style:'position:relative; top:0; left:0; width:100%; height:100%; border:none; display:block;'});
	document.body.appendChild(this.body);

	this.titleDiv=ZLM.makeElement('div',{class:'modalTitle'});
	this.titleTxt=document.createTextNode(this.title);
	this.titleDiv.appendChild(this.titleTxt);
	this.body.appendChild(this.titleDiv);

	this.contents=ZLM.makeElement('div',{class:'modalContents'});
	this.body.appendChild(this.contents);
	this.buttonDiv=ZLM.makeElement('div',{class:'modalControl'});

	this.okayWrapper=ZLM.makeElement('div',{style:'position:absolute; top:0px; left:0px; width:50%'});
	this.okay=ZLM.makeElement('input',{type:'button',value:this.okayStr,style:'margin:5px; position:absolute; top:0px; right:0px;'});
	this.okayWrapper.appendChild(this.okay);
	this.buttonDiv.appendChild(this.okayWrapper);

	this.cancelWrapper=ZLM.makeElement('div',{style:'position:absolute; top:0px; right:0px; width:50%'});
	this.cancel=ZLM.makeElement('input',{type:'button',value:this.cancelStr,style:'margin:5px; position:absolute; top:0px; left:0px;'});
	this.cancelWrapper.appendChild(this.cancel);
	this.buttonDiv.appendChild(this.cancelWrapper);
	this.body.appendChild(this.buttonDiv);

	var bw=this.okay.offsetWidth;
	if (this.cancel.offsetWidth>bw) bw=this.cancel.offsetWidth;
	this.okay.style.width=bw+"px";
	this.cancel.style.width=bw+"px";

	document.body.removeChild(this.body);
	this.base.appendChild(this.body);
	this.base.style.position="absolute";
	this.base.style.display="none";
	this.base.style.overflow="visible";
}

ZDSM.ModalPane.prototype.setLaunchReferenceById=function(refId) {
	if (refId) this.refDiv=document.getElementById(refId);
	else this.refDiv=null;	
}

ZDSM.ModalPane.prototype.setLaunchReference=function(div) {
	this.refDiv=div;
}

ZDSM.ModalPane.prototype.show=function(x,y) {
	ZLM.killBrowserSelectionProcess();
	if (this.width==0 || this.height==0) {
		ZDSM.popupTrap.showTransient(this);
		this.width=this.body.offsetWidth;
		this.height=this.body.offsetHeight;
		ZDSM.popupTrap.hideTransient(this);
	}
	if (x==undefined) {
		if (this.refDiv!=null) {
			x=ZLM.getPageOffsetLeft(this.refDiv)+(this.refDiv.offsetWidth-this.width)/2;
			y=ZLM.getPageOffsetTop(this.refDiv)+(this.refDiv.offsetHeight-this.height)/2;
		}
		else {
			x=Math.floor((ZLM.getViewportWidth()-this.width)/2);
			y=Math.floor((ZLM.getViewportHeight()-this.height)/2);
		}
	}
	this.base.style.top=y+"px";
	this.base.style.left=x+"px";
	ZDSM.popupTrap.showTransient(this);
	this.contents.style.width=(this.body.offsetWidth-4)+"px";
	this.contents.style.height=(this.body.offsetHeight-this.titleDiv.offsetHeight-this.buttonDiv.offsetHeight-4)+"px";
	this.contents.style.top=this.titleDiv.offsetHeight+"px";
}

ZDSM.ModalPane.prototype.hide=function() {
	ZDSM.popupTrap.hideTransient(this);
}

///=======================================================================================================
/// A PickPalette is a group arranged in a grid structure where each child has uniform size
/// (dictated by the native maximum width and maximum height of the individual children) and
/// automatically have mouseover and mouseout highlighing behavoir defined.  The group as a whole
/// has a default value
/// 
/// HTML spec:
///  <div class="pickPalette" onchange=_callback()_ maxCols=_#_ maxRows=_#_ defaultValue=_value_ autoFill={horizontal|vertical} >
///    <div class="paletteItem" value=_value_ >
///       _item contents_
///    </div>
///    _..._
///  </div> 

ZDSM.PickPalette=function(div) {
	this.base=div;
	div.controller=this;
	div.style.position="relative";
	div.style.top="0";
	div.style.left="0";
	this.maxCols=div.getAttribute("maxCols");  
	this.maxRows=div.getAttribute("maxRows");  
	if (div.getAttribute("autoFill")=="vertical") this.autoFill=1;
	else this.autoFill=0;  
	this.value=div.getAttribute("defaultValue");  
	this.changeCB=div.getAttribute("onchange");  
	this.forcedW=div.getAttribute("forcedW");
	this.forcedH=div.getAttribute("forcedH");
	if (this.forcedW && this.forcedH) this.fixed=true;
	else this.fixed=false;
	this.pick=[];
	this.nPicks=0;
	for (var k=div.firstChild;k!=null;k=k.nextSibling) {
		if (k.nodeType==1 && k.className=="paletteItem") {
			this.pick[this.nPicks]= new PaletteItem(this,k);
			this.nPicks++;
		}
	}
	this.marker=ZLM.makeElement('div',{style:'position:absolute; display:none; font-size:1px;'});
	this.base.appendChild(this.marker);
	return(this);
}

ZDSM.PickPalette.create=function(maxRows,maxCols,autoFill,defaultV,changeCB,forcedW,forcedH) {
	var htmlStr="div class='pickPalette' ";
	if (maxRows>0) htmlStr+="maxRows='"+maxRows+"' ";
	if (maxCols>0) htmlStr+="maxCols='"+maxCols+"' ";
	if (autoFill!=null) htmlStr+="autoFill='"+autoFill+"' ";
	if (defaultV!=null) htmlStr+="defaultValue='"+defaultV+"' ";
	if (forcedW!=null) htmlStr+="forcedW='"+forcedW+"' ";
	if (forcedH!=null) htmlStr+="forcedH='"+forcedH+"' ";
	if (changeCB!=null) htmlStr+="onchange='"+changeCB+"'";
	var div=ZLM.simulateTag(htmlStr);
	return(new ZDSM.PickPalette(div));  
}

ZDSM.PickPalette.prototype.addItem=function(contents,value) {
	var item=ZDSM.PaletteItem.create(this,contents,value);
	this.pick[this.nPicks]=item;
	this.base.appendChild(item.base);
	this.nPicks++;
	return(this.nPicks-1);
}

ZDSM.PickPalette.prototype.setItem=function(idx,contents,value) {
	if (idx>=this.nPicks) return;
	this.pick[idx].setContents(contents);
	this.pick[idx].setValue(value);
}

ZDSM.PickPalette.prototype.setItemContents=function(idx,contents) {
	if (idx>=this.nPicks) return;
	this.pick[idx].setContents(contents);
}

ZDSM.PickPalette.prototype.setItemValue=function(idx,value) {
	if (idx>=this.nPicks) return;
	this.pick[idx].setValue(value);
}

ZDSM.PickPalette.prototype.getItemContents=function(idx) {
	if (idx>=this.nPicks) return(null);
	return(this.pick[idx].getContents());
}

ZDSM.PickPalette.prototype.getItemValue=function(idx) {
	if (idx>=this.nPicks) return(null);
	return(this.pick[idx].getValue());
}

ZDSM.PickPalette.prototype.getMaxW=function() {
	if (this.forcedW) return(parseInt(this.forcedW));
	var maxW=0;
	for (var i=0;i<this.nPicks;i++) {
		if (this.pick[i].nativeW>maxW) maxW=this.pick[i].nativeW;
	}
	return(maxW);
}

ZDSM.PickPalette.prototype.getMaxH=function() {
	if (this.forcedH) return(parseInt(this.forcedH,10));
	var maxH=0;
	for (var i=0;i<this.nPicks;i++) {
		if (this.pick[i].nativeH>maxH) maxH=this.pick[i].nativeH;
	}
	return(maxH);
}

ZDSM.PickPalette.prototype.layoutHorizontal=function(mW,mH) {
	var cCount=0;
	var col=0;
	var row=0;
	for (var i=0;i<this.nPicks;i++) {
		with (this.pick[i].base.style) {
			top=row+"px";
			left=col+"px";
		}
		ZLM.setSize(this.pick[i].base,mW-2,mH-2,"1pt solid black");
		cCount++;
		if (cCount==this.maxCols) {
			cCount=0;
			col=0;
			row+=mH;
		}
		else {
			col+=mW;
		}
	}
	if (cCount==0) row-=mH; 
	ZLM.setSize(this.base,this.maxCols*mW,row+mH,"1px solid black");   
}

ZDSM.PickPalette.prototype.layoutVertical=function(mW,mH) {
	var rCount=0;
	var col=0;
	var row=0;
	for (var i=0;i<this.nPicks;i++) {
		with (this.pick[i].base.style) {
			top=row+"px";
			left=col+"px";
		}
		ZLM.setSize(this.pick[i].base,mW-2,mH-2,"1pt solid black");
		rCount++;
		if (rCount==this.maxRows) {
			rCount=0;
			col+=mW;
			row=0;
		}
		else {
			row+=mH;
		}
	}
	if (rCount==0) col-=mW; 
	ZLM.setSize(this.base,col+mW,this.maxRows*mH,"1px solid black");   
}

ZDSM.PickPalette.prototype.refresh=function() {
	this.maxW=this.getMaxW()+2;
	this.maxH=this.getMaxH()+2;
	if (this.autoFill==0) this.layoutHorizontal(this.maxW,this.maxH); 
	else this.layoutVertical(this.maxW,this.maxH); 
	this.markValue();
}

ZDSM.PickPalette.prototype.markValue=function() {
	for (var i=0;i<this.nPicks;i++) {
		if (this.pick[i].value==this.value) {
			var p=this.pick[i].base;
			if (this.base.lastChild!=this.marker) {
				this.base.removeChild(this.marker);
				this.base.appendChild(this.marker);
			}
			ZLM.setSize(this.marker,this.maxW-2,this.maxH-2,"2px solid #e0e0a0");
			this.marker.style.top=(parseInt(p.style.top)-1)+"px";
			this.marker.style.left=(parseInt(p.style.left)-1)+"px";
			this.marker.style.display="block";
			return;
		}
	}
	this.marker.style.display="none";
}

ZDSM.PickPalette.prototype.setValue=function(newV) {
	this.value=newV;
	this.markValue();
	if (this.changeCB) eval(this.changeCB);
}

ZDSM.PickPalette.prototype.getValue=function() {
	return(this.value);
}

ZDSM.PickPalette.prototype.setChangeCallback=function(newCB) {
	this.changeCB=newCB;
}

///=======================================================================
/// A paletteItem is a wrapper class for children of a pickPalette
/// RELATED CSS:  
/// .paletteItem { border: ... }
/// .activePaletteItem {border: ... }

ZDSM.PaletteItem=function(palette, div) {
	this.palette=palette;
	this.base=div;
	div.controller=this;

	div.style.position="absolute";
	div.style.top="0";
	div.style.left="0";
	div.style.fontSize="1px";
	div.controller=this;
	if (!palette.fixed) this.calcNativeSize();
	this.value=div.getAttribute("value");

	ZLM.setLocalAttribute(div,"onmouseover","this.controller.reborder(1);");
	ZLM.setLocalAttribute(div,"onmouseout","this.controller.reborder(0);");
	ZLM.setLocalAttribute(div,"onclick","this.controller.palette.setValue(this.controller.value);");
	this.reborder(0);
	return(this);
}

ZDSM.PaletteItem.create=function(palette,contents,value) {
	var div = ZLM.makeElement('div',{class:'paletteItem',value:value});
	if (contents) div.appendChild(contents);
	return(new ZDSM.PaletteItem(palette,div));
}

ZDSM.PaletteItem.prototype.calcNativeSize=function() {
	var oldP=null;
	if (this.base.parentNode!=null) {
		oldP=this.base.parentNode;
		ZLM.reparent(this.base,document.body);
	}
	else document.body.appendChild(this.base);
	if (this.base.firstChild && this.base.firstChild.nodeType==1) {
		this.nativeW=this.base.firstChild.offsetWidth;
		this.nativeH=this.base.firstChild.offsetHeight;
	}
	else {
		this.nativeW=0;
		this.nativeH=0;
	}
	if (oldP!=null) ZLM.reparent(this.base,oldP);
	else document.body.removeChild(this.base);
}

ZDSM.PaletteItem.prototype.reborder=function(hiLite) {
	if (hiLite==1) this.base.style.border="1px solid white";
	else this.base.style.border="1px solid black";
}

ZDSM.PaletteItem.prototype.setContents=function(contents) {
	if (this.base.firstChild) this.base.removeChild(this.base.firstChild);
	this.base.appendChild(contents);	
	this.calcNativeSize();
}

ZDSM.PaletteItem.prototype.setValue=function(value) {
	this.value=value;
}

ZDSM.PaletteItem.prototype.getContents=function() {
	return(this.base.firstChild);
}

ZDSM.PaletteItem.prototype.getValue=function() {
	return(this.value);
}

//###########################################################################################
//###########################################################################################
//###########################################################################################
//###########################################################################################

/////////////////////////////////////////////////////////////
/// SHOULD PROBABALY ADD THESE FUNCTIONS TO zenCSLM.js
///////////////////////////////////////////////////////////////

ZDSM.getWindowWidth = function() {
	return(document.body.clientWidth);
}

ZDSM.getWindowHeight = function() {
	return(document.body.clientHeight);
}
 
ZDSM.getPageXOffset = function() {
	if (ZLM.isIE) return(document.body.scrollLeft);
	return(window.pageXOffset);
}

ZDSM.getPageYOffset = function() {
	if (ZLM.isIE) return(document.body.scrollTop);
	return(window.pageYOffset);
}

ZDSM.getChildElements=function(node) {
	var kids = [];
	if (ZLM.isZen()) { // scan grandchildren (skip wrapper layer)
		for (var dK=node.firstChild;dK!=null;dK=dK.nextSibling) {
			if (dK.nodeType==1) {
				for (var gK=dK.firstChild;gK!=null;gK=gK.nextSibling) {
					if (gK.nodeType==1) kids[kids.length]=gK;
				}
			}
		}
	} 
	else { // in HTML there is no wrapper layer, should work as is
		for (var k=node.firstChild;k!=null;k=k.nextSibling) {
			if (k.nodeType==1) kids[kids.length]=k;
		}
	}
	return(kids);
}

ZDSM.getCascadeMenu=function(div) {
	var menu = ZDSM.getElementsByClassName("zdsmContextMenu",div);
	var len = menu.length;
	var item = null;
	if (len==0) return(null); // Trivial case, no kids
	if (len==1) { 
		item = menu[0]; // easy case only one to pick from
	}
	else {
		// If multiple cascades, need to find the child closest to div as return order
		// in array cannot be relied upon to predict DOM structure
		var best = null;
		var bestDist = 32676;
		for (var i=0;i<len;i++) {
			var d = 0;
			var k = menu[i];
			while (k.parentNode && k.parentNode!=div && d<bestDist) {
				d++;
				k = k.parentNode;
			}
			if (best==null || d<bestDist) {
				best = menu[i];
				bestDist = d;
			}
		}
		item = best;
	}
	if (item.controller) return(item.controller);
	else return(new ZDSM.ContextMenu(item));

	return(best);
}

ZDSM.attribute=function(name,value) {
	if (value) return(name+"='"+value+"' ");
	else return("");
}

ZDSM.evaluateFlag=function(flag) {
	if (flag==null) return(false);
	if (typeof(flag)=="boolean") return(flag);
	if (typeof(flag)=="number") {
		if (flag==0) return(false);
		return(true);
	}
	if (typeof(flag)=="string") {
		if (flag=="false") return(false);
		return(true);
	}
	if (typeof(flag)=="object") {
		if (flag==null) return(false);
		if (flag instanceof String) {
			if (flag=="false") return(false);
			return(true);
		}
		if (flag instanceof Number) {
			if (flag==0) return(false);
			return(true);
		}
	}
	if (flag) return(true);
	return(false);
}

/// Since introduction of getElementsByClassName() is faster than ZLM solution
/// we'd like to use it, but unfortunately it returns dynamic results, not a stable
/// array and we can't have the DOM changing out worklists dynamically.  Solution is
/// to lock in pointers in out own array.
ZDSM.getElementsByClassName=function(name,root) {
	if (!root) root = document.body;
	var da = root.getElementsByClassName(name);
	var len = da.length;
	var a = [];
	for (var i=0;i<len;i++) a[i]=da[i];
	return(a);
}

ZDSM.Caption=function(text,key) {
	if (!text) return(null);
	var d=ZLM.makeElement('div',{style:'position:relative; display:block;'});
        d.controller=this;
	this.base=d;
        this.value=text;
	if (key) {
		var idxLC=text.indexOf(key.toLowerCase());
		var idxUC=text.indexOf(key.toUpperCase());
		var keyIdx= -1;
		if (idxLC>=0) keyIdx=idxLC;
		if (idxUC>=0 && (idxUC<keyIdx || keyIdx== -1)) keyIdx=idxUC;
		if (keyIdx>=0) {
			if (keyIdx>0) {
				var sp = ZLM.makeElement('span',{style:'text-decoration:none;'});
				sp.appendChild(document.createTextNode(text.substring(0,keyIdx)));
				d.appendChild(sp);   
			}
			var sp = ZLM.makeElement('span',{style:'text-decoration:underline;'});
			sp.appendChild(document.createTextNode(text.substring(keyIdx,keyIdx+1)));
			d.appendChild(sp);   
			text = text.substring(keyIdx+1);
			if (text.length>0) {
				var sp = ZLM.makeElement('span',{style:'text-decoration:none;'});
				sp.appendChild(document.createTextNode(text));
				d.appendChild(sp);   
			}
		}
	}
	else d.appendChild(document.createTextNode(text));
	return(this);
}

/// Get the current style of the given element as a custom object of
/// name value pairs.  This is done to get around the odd platform differences 
/// between platforms
ZDSM.convertCSSName=function(cssPropName) {
	//Needed to convert Safari/webkit cssPropertyNames to Javascript properties
	//Basically, remove all hyphens and capitalize all but the first word
	var word=cssPropName.split("-");
	var jsName=word[0];
	for (var i=1;i<word.length;i++) {
		jsName+=word[i].charAt(0).toUpperCase()+word[i].substring(1);
	}
	return(jsName);	
}

ZDSM.getEffectiveStyle = function(element) {
	var s=new Object();
	if (element.currentStyle) { // IE specific
		var obj = element["currentStyle"];
		for (var prop in obj) {
			s[prop]=obj[prop];
		}
	}
	else { // FF and others
		var cs=window.getComputedStyle(element,null);
		if (cs==null) return(s);
		if (cs.toString().indexOf("ComputedCSSStyleDeclaration")== -1) { //Safari/Webkit style
			// this is the complicated one.  Safari only returns a comuted style if the
			// object is actually visible
			if (cs.length==0) {
				var oldP=element.parentNode;
				ZLM.reparent(element,document.body);
			}
			var prop=0;
			for (var i=0;i<cs.length;i++) {
				s[ZDSM.convertCSSName(cs[i])]=cs.getPropertyValue(cs[i]);
			}
			if (oldP) ZLM.reparent(element,oldP);
		} 
		else { // Firefox approach
			for (var prop in cs) {
				if (typeof cs[prop]!="function") s[prop]=cs[prop];
			}
		}
	}
	return(s);	
}