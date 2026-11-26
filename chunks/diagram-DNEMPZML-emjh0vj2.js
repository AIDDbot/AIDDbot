import{L}from"./main-18ys0d8m.js";import{e,t,x,u,S,d,p,m,g,y,w,v,A,_}from"./main-r27nhh20.js";import{O}from"./main-cqqyjtr2.js";var j=x.packet,N=class{constructor(){this.packet=[],this.setAccTitle=p,this.getAccTitle=m,this.setDiagramTitle=w,this.getDiagramTitle=v,this.getAccDescription=y,this.setAccDescription=g}static{e(this,"PacketDB")}getConfig(){let r=A({...j,...u().packet});if(r.showBits)r.paddingY+=10;return r}getPacket(){return this.packet}pushWord(r){if(r.length>0)this.packet.push(r)}clear(){d(),this.packet=[]}},G=1e4,H=e((r,a)=>{L(r,a);let i=-1,s=[],l=1,{bitsPerRow:h}=a.getConfig();for(let{start:o,end:n,bits:k,label:B}of r.blocks){if(o!==void 0&&n!==void 0&&n<o)throw Error(`Packet block ${o} - ${n} is invalid. End must be greater than start.`);if(o??=i+1,o!==i+1)throw Error(`Packet block ${o} - ${n??o} is not contiguous. It should start from ${i+1}.`);if(k===0)throw Error(`Packet block ${o} is invalid. Cannot have a zero bit field.`);n??=o+(k??1)-1,k??=n-o+1,i=n,t.debug(`Packet block ${o} - ${i} with label ${B}`);while(s.length<=h+1&&a.getPacket().length<G){let[f,b]=K({start:o,end:n,bits:k,label:B},l,h);if(s.push(f),f.end+1===l*h)a.pushWord(s),s=[],l++;if(!b)break;({start:o,end:n,bits:k,label:B}=b)}}a.pushWord(s)},"populate"),K=e((r,a,i)=>{if(r.start===void 0)throw Error("start should have been set during first phase");if(r.end===void 0)throw Error("end should have been set during first phase");if(r.start>r.end)throw Error(`Block start ${r.start} is greater than block end ${r.end}.`);if(r.end+1<=a*i)return[r,void 0];let s=a*i-1,l=a*i;return[{start:r.start,end:s,label:r.label,bits:s-r.start},{start:l,end:r.end,label:r.label,bits:r.end-l}]},"getNextFittingBlock"),M={parser:{yy:void 0},parse:e(async(r)=>{let a=await O("packet",r),i=M.parser?.yy;if(!(i instanceof N))throw Error("parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues.");t.debug(a),H(a,i)},"parse")},U=e((r,a,i,s)=>{let l=s.db,h=l.getConfig(),{rowHeight:o,paddingY:n,bitWidth:k,bitsPerRow:B}=h,f=l.getPacket(),b=l.getDiagramTitle(),z=o+n,c=z*(f.length+1)-(b?0:o),C=k*B+2,D=_(a);D.attr("viewBox",`0 0 ${C} ${c}`),S(D,c,C,h.useMaxWidth);for(let[P,T]of f.entries())X(D,T,P,h);D.append("text").text(b).attr("x",C/2).attr("y",c-z/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),X=e((r,a,i,{rowHeight:s,paddingX:l,paddingY:h,bitWidth:o,bitsPerRow:n,showBits:k,bitOrder:B})=>{let f=r.append("g"),b=i*(s+h)+h,z=B==="descending";for(let c of a){let C=c.end-c.start+1,D=c.start%n,T=(z?n-D-C:D)*o+1,E=C*o-l;if(f.append("rect").attr("x",T).attr("y",b).attr("width",E).attr("height",s).attr("class","packetBlock"),f.append("text").attr("x",T+E/2).attr("y",b+s/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(c.label),!k)continue;let[Y,I]=z?[c.end,c.start]:[c.start,c.end],F=C===1,W=b-2;if(f.append("text").attr("x",T+(F?E/2:0)).attr("y",W).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",F?"middle":"start").text(Y),!F)f.append("text").attr("x",T+E).attr("y",W).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(I)}},"drawWord"),q={draw:U},J={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},Q=e(({packet:r}={})=>{let a=A(J,r);return`
	.packetByte {
		font-size: ${a.byteFontSize};
	}
	.packetByte.start {
		fill: ${a.startByteColor};
	}
	.packetByte.end {
		fill: ${a.endByteColor};
	}
	.packetLabel {
		fill: ${a.labelColor};
		font-size: ${a.labelFontSize};
	}
	.packetTitle {
		fill: ${a.titleColor};
		font-size: ${a.titleFontSize};
	}
	.packetBlock {
		stroke: ${a.blockStrokeColor};
		stroke-width: ${a.blockStrokeWidth};
		fill: ${a.blockFillColor};
	}
	`},"styles"),ot={parser:M,get db(){return new N},renderer:q,styles:Q};export{ot as diagram};
