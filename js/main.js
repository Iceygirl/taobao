/* js document */
window.onload = function (){
	mx.app.showSelect();
	mx.app.menuTab();
	mx.app.showMenu();
	mx.app.banner();
	mx.app.tab();
};

var mx = {};

mx.tools = {};
mx.tools.getByClass = function (oParent,sClass){
	var arr = [];
	var aEle = oParent.getElementsByTagName('*');
	var re = new RegExp('\\b'+sClass+'\\b');
	for(var i=0;i<aEle.length;i++){
		if(aEle[i].className.search(re) != -1){
			arr.push(aEle[i]);
		}
	}
	
	return arr;
};

mx.ui = {};

mx.ui.select = function (num,oA,oUl){
	
	var aLi = oUl.getElementsByTagName('li');
	
	oA.onmouseover = function (){
		this.className = 'changeA hover';
		oUl.style.display = 'block';
	}
	
	oA.onmouseout = function (){
		this.className = 'changeA';
		oUl.style.display = 'none';
	}
	
	oUl.onmouseover = function (){
		this.style.display = 'block';
		oA.className = 'changeA hover';
	}
	
	oUl.onmouseout = function (){
		oA.className = 'changeA';
		this.style.display = 'none';
	}
	
	if(num == 0){
		for(var i=0;i<aLi.length;i++){
			aLi[i].onclick = function (){
				
				oA.getElementsByTagName('span')[0].innerHTML = this.getElementsByTagName('a')[0].innerHTML;
				oUl.style.display = 'none';
			}
		}
	}
	
	if(num!=6 && num!=2){
		for(var i=0;i<aLi.length;i++){
			aLi[i].onmouseover = function (){
				
				for(var i=0;i<aLi.length;i++){
					aLi[i].className = '';
				}
				this.className = 'active';
			}
		}
	}

	
};

mx.ui.focusBlur = function (obj,str){
	obj.onfocus = function (){
		if(obj.value == str){
			obj.value = '';
		}
	};
	
	
	obj.onblur = function (){
		if(obj.value == ''){
			obj.value = str;
		}
	};
};

mx.ui.move = function (obj,old,now){
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function (){
		var iSpeed = (now-old)/8;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed): Math.floor(iSpeed);
		if(old == now){
			clearInterval(obj.timer);
		} else {
			old += iSpeed;
			obj.style.left = old + 'px';
		}
	},30);
	
	
};

mx.ui.toTab = function (oUl,aCon,eve){
	var aLi = oUl.getElementsByTagName('li');
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;
		aLi[i][eve] = function (){
			
			for(var i=0;i<aLi.length;i++){
				aLi[i].className = '';
				aCon[i].style.display = 'none';
			}
			this.className = 'active';
			aCon[this.index].style.display = 'block';
		}
	}
};

mx.app = {};
mx.app.showSelect = function (){
	
	var aA = mx.tools.getByClass(document,'changeA');
	var aUl = mx.tools.getByClass(document,'select_list');
	var arr = null;
	
	for(var i=0;i<aA.length;i++){
		mx.ui.select(i,aA[i],aUl[i]);	
	}
		
};

mx.app.menuTab = function (){
	
	var oSearch = document.getElementById('search');
	var oDiv = mx.tools.getByClass(oSearch,'search_main')[0];
	var oMobile = mx.tools.getByClass(oSearch,'mobile_tao')[0];
	
	var oUl = oDiv.getElementsByTagName('ul')[0];
	var aLi = oUl.getElementsByTagName('li');
	
	var oTxt = mx.tools.getByClass(oDiv,'txt')[0];
	var oBtn = mx.tools.getByClass(oDiv,'btn')[0];
	
	var oClose = mx.tools.getByClass(oMobile,'close')[0];
	var oPic = mx.tools.getByClass(oMobile,'pic')[0];
	var iNow = 0;
	
	var arr = ['小薇时尚女装店铺','夏季百款女装','天猫旗舰店应有尽有'];
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;
			
		aLi[i].onclick = function (){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className = '';
				
			}
			
			oTxt.value = arr[this.index];
			
			if( this.index == 2){
				this.className = 'cat_active';
				oTxt.style.borderColor = '#cf3434';
				oBtn.style.background = '#cf3434';
			} else {
				this.className = 'bao_active';
				oTxt.style.borderColor = '#ff5400';
				oBtn.style.background = '#ff5400';
			}
			iNow = this.index;
			mx.ui.focusBlur(oTxt,arr[iNow]);
		} 
		
	}
	
	mx.ui.focusBlur(oTxt,arr[iNow]);
	
	oClose.onclick = function (){
		oMobile.style.display = 'none';
	};
};

mx.app.showMenu = function (){
	var oMenu = document.getElementById('title_menu');
	var aLi = mx.tools.getByClass(oMenu,'title_menu_li');
	var aContainer = mx.tools.getByClass(oMenu,'container');
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i; 
		aContainer[i].style.top = -(30*i) +'px';
		
		aLi[i].onmouseover = function (){
			this.classList.add("active");
			aContainer[this.index].style.display = 'block';
		}
		
		aLi[i].onmouseout = function (){
			this.classList.remove("active");
			aContainer[this.index].style.display = 'none';
		}
		
		aContainer[i].onmouseover = function (){
			this.style.display = 'block';
		}
		
		aContainer[i].onmouseout = function (){
			this.style.display = 'none';
		}
	}
};


mx.app.banner = function (){
	
	var aBanner = mx.tools.getByClass(document,'banner');
	var oCatBanner = mx.tools.getByClass(document,'cat_banner')[0];
	var oEm = oCatBanner.getElementsByTagName('em')[0];
	
	for(var i=0;i<aBanner.length;i++){
		show(i,aBanner[i]);
	}
	
	function show(num,obj){
		
		var oPrev = mx.tools.getByClass(obj,'prev')[0];
		var oNext = mx.tools.getByClass(obj,'next')[0];
		var oLittleUl = mx.tools.getByClass(obj,'little_ul')[0];
		var aLittleLi = oLittleUl.getElementsByTagName('li');
		
		var oUl = mx.tools.getByClass(obj,'banner_list')[0];
		var aLi = oUl.getElementsByTagName('li');
		var str = '';
		var iLen = 0;
		var iNow = 0;
		var timer = null;
		
		if(num ==1){
			oEm.innerHTML = '1/'+aLi.length;
		}
		
		for(var i=0;i<aLi.length;i++){
			str += '<li></li>';
		}
		oLittleUl.innerHTML = str;
		iLen =  aLittleLi.length;
		oLittleUl.style.width = aLittleLi.length*aLittleLi[0].offsetWidth;
		oLittleUl.style.marginLeft = - oLittleUl.offsetWidth/2 + 'px'; 
		aLittleLi[iLen-1].style.marginRight = 0;
		
		aLittleLi[iNow].className = 'active';
		
		oNext.onclick = auto;
		
		oPrev.onclick = function (){
			if(iNow == 0){
				iNow = aLi.length-1;
			} 
		
			mx.ui.move(oUl,-aLi[0].offsetWidth*iNow,-aLi[0].offsetWidth*(iNow-1));
			iNow--;
			change();
		}
		
		if(num ==1){
			timer = setInterval(auto,3000);
		} else {
			timer = setInterval(auto,2000);
		} 
		
		function auto(){
			if(iNow == aLi.length-1){
				iNow = 0;
			} 
			
			mx.ui.move(oUl,-aLi[0].offsetWidth*iNow,-aLi[0].offsetWidth*(iNow+1));
			iNow++;
			change();
		}
		
		function change(){
			
			for(var i=0;i<aLittleLi.length;i++){
				aLittleLi[i].className = '';
			}
			aLittleLi[iNow].className = 'active';
			
			if(num ==1){
				oEm.innerHTML = '<b>'+(iNow+1)+'</b>'+'/'+aLi.length;
			}
		}
		
		obj.onmouseover = function (){
			oPrev.style.display = 'block';
			oNext.style.display = 'block';
			clearInterval(timer);
		}
		
		obj.onmouseout = function (){
			oPrev.style.display = 'none';
			oNext.style.display = 'none';
			if(num ==1){
				timer = setInterval(auto,3000);
			} else {
				timer = setInterval(auto,2000);
			} 
			
		}
	};
};

mx.app.tab = function (){
	var oUl1 = mx.tools.getByClass(document,'title_1')[0];
	var aCon1 = mx.tools.getByClass(document,'con_1');
	mx.ui.toTab(oUl1,aCon1,'onmouseover');
};