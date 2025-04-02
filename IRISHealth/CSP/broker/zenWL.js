var ZWL={};

ZWL.markAsReady=function(div) {
  var tag=document.createComment("ZenReady");
  div.insertBefore(tag,div.firstChild);
}

ZWL.isReady=function(div) {
  var n=div.firstChild;
  if (n==null) return(false);
  if (n.nodeName!="#comment") return(false);
  if (n.nodeValue!="ZenReady") return(false);
  return(true);
}

//==================//
// TAB FRAME WIDGET //
//==================//

ZWL.handleTabFrame=function(tab) {
  if (!tab.controller) alert("Steve screwed up again!")
  tab.controller.giveFocus(tab);
  tab.controller.refreshMenu();
}

ZWL.TabFrame=function(div) {
  this.ADORNMENT_SIZE_Y=6;
  this.ADORNMENT_SIZE_X=10;
  this.TOP_PAD = 2;

  div.controller=this;
  
  if (ZLM.isZen()) {  // In Zen, div will have a wrapper
//ZLM.cerr("Is Zen");
    div.style.width="100%";
    div.style.height="100%";
//ZLM.cerr("CH: "+div.clientHeight);
    if (div.clientHeight>=0) {
//ZLM.cerr("Fixing parent nodes");
      div.parentNode.style.width="100%";
      div.parentNode.style.height="100%";
    }
  }
  this.div = div;
//this.div.parentNode.style.border="3px solid red";
//this.div.parentNode.parentNode.style.border="3px solid green";

  this.div.body = ZLM.simulateTag("div style='position:relative; top:0; left:0; width:100%; height:100%;'");
  div.appendChild(this.div.body);
  this.div.menu = ZLM.simulateTag("div class='tabMenu' style='position:absolute; top:0; left:0; width:100%; border:none;'");
  this.div.body.appendChild(this.div.menu);

  this.div.pageEdge = ZLM.simulateTag("div style='position:absolute; left:0; width:100%; height:2;'");
  this.div.menu.appendChild(this.div.pageEdge);

// Start setting up basic geometry based on CSS preferences
  this.fontHeight=parseInt(ZLM.getStringExtents("Hello world!",this.div.menu).split("X")[1]);
  this.menuHeight=this.fontHeight+2*this.ADORNMENT_SIZE_Y+this.TOP_PAD;
  if (this.div.menu.clientHeight>=this.menuHeight) {
    this.menuOffset=this.div.menu.clientHeight-this.menuHeight;
  }
  else {
    this.div.menu.style.height=this.menuHeight;
    this.menuOffset=0;
  }  

  this.div.page=ZLM.simulateTag("div style='position:absolute; left:0;'");
  var tmpH = this.div.body.clientHeight-this.div.menu.offsetHeight;
  if (tmpH<0) {
//ZLM.cerr("ARGGG "+tmpH);
     tmpH=this.div.menu.offsetHeight;
  }
//ZLM.cerr("ARGGG2 "+tmpH);
  ZLM.setSize(this.div.page,"100%",tmpH,"none");
  this.div.page.style.top=this.div.menu.offsetHeight;
  this.div.body.appendChild(this.div.page);

  // get color palette
  this.LINE_COLOR=ZLM.toHTMLColorSpec(ZLM.getCSSBackgroundDefault("tabEdge",div));
  this.RGB_FRAME_COLOR=ZLM.getRGBBackgroundColor(div);
  this.FRAME_COLOR=ZLM.toHTMLColorSpec(this.RGB_FRAME_COLOR);
  this.DARK_FRAME_COLOR=ZLM.toHTMLColorSpec(ZLM.averageColor("64,64,64",this.RGB_FRAME_COLOR));
  this.BG_COLOR=ZLM.toHTMLColorSpec(ZLM.getRGBBackgroundColor(this.div.menu));
//ZLM.cerr("Line: "+this.LINE_COLOR+" Frame: "+this.FRAME_COLOR+" BG: "+this.BG_COLOR);

  this.div.pageEdge.style.borderTop="2px solid "+this.LINE_COLOR;
  this.div.pageEdge.style.background=this.FRAME_COLOR;
  this.div.pageEdge.style.top=this.menuOffset+this.menuHeight-4;
  if (ZLM.isInternetExplorer()) {
    this.div.pageEdge.style.fontSize="0px";
    this.div.pageEdge.style.top=this.menuOffset+this.menuHeight-4;
  }

  this.firstTop = new ZWL.TabTopper(this,this.div.menu,0,this.menuOffset-2);
  this.firstTop.renderLeftEnd();
  this.firstTop.div.style.display="none";

  this.firstBase = new ZWL.TabBase(this,this.div.menu,0,this.menuOffset+this.menuHeight-8);
  this.firstBase.renderRightOverlap();
  this.firstBase.renderLeft("none");
  this.firstBase.div.style.display="none";

  this.tabs = new Array();
  this.panes = new Array();
  this.tabTops = new Array();
  this.tabBase = new Array();
  this.focusedTab = -1; // Nobody currently has the focus
  this.firstTab = -1; 
  this.lastTab= -1;
 
  this.makePrevTab("images/SmLeftArrow.png");
  this.makeNextTab("images/SmRightArrow.png");
  this.makeIndexTab("images/SmDownArrow.png");
  
//  this.initTabs();
  this.setTabVisibility();
  ZLM.setLocalAttribute(div,"onresize","this.controller.resizeHandler();");
//ZLM.cerr("onresize set to: "+div.getAttribute("onresize"));
//ZLM.cerr("Page is now : "+this.div.page.clientWidth+"x"+this.div.page.clientHeight);
//ZLM.cerr("Body is now : "+this.div.page.parentNode.clientWidth+"x"+this.div.page.parentNode.clientHeight);
}

ZWL.TabFrame.prototype.resizeHandler=function() {
//ZLM.cerr("DIV "+this.div.clientHeight+" x "+this.div.clientWidth)
//ZLM.cerr("DIV P "+this.div.parentNode.clientHeight+" x "+this.div.parentNode.clientWidth)
//ZLM.cerr("DIV PP "+this.div.parentNode.parentNode.clientHeight+" x "+this.div.parentNode.parentNode.clientWidth)
//ZLM.cerr("BODY: "+this.div.body.clientHeight+" - "+this.div.menu.offsetHeight)
//ZLM.cerr("BODY P: "+this.div.body.parentNode.clientHeight+" x "+this.div.body.parentNode.clientWidth)

//ZLM.cerr("RESIZE HANDLER CALLED");
//  ZLM.setSize(this.div.page,"100%",this.div.body.clientHeight-this.div.menu.offsetHeight,"none");
//ZLM.cerr(this.hey+"!!!");
this.div.page.style.width="100%";
//if (this.div.body.clientHeight<this.div.menu.offsetHeight) ZLM.setSize(this.div.body,"100%",this.div.menu.offsetHeight);
var fred = this.div.body.clientHeight-this.div.menu.offsetHeight;
//ZLM.cerr("IE hates this: "+fred+" body height is: "+this.div.body.clientHeight);
ZLM.setSize(this.div.page,"100%",this.div.body.clientHeight-this.div.menu.offsetHeight,"none");

//ZLM.cerr("BODY: "+this.div.body.clientHeight+" - "+this.div.menu.offsetHeight)
//ZLM.cerr("BODY P: "+this.div.body.parentNode.clientHeight+" x "+this.div.body.parentNode.clientWidth)
//ZLM.cerr("DIV "+this.div.clientHeight+" x "+this.div.clientWidth)
//ZLM.cerr("DIV P "+this.div.parentNode.clientHeight+" x "+this.div.parentNode.clientWidth)

//this.div.page.style.width="100%";
//ZLM.cerr("Page is now : "+this.div.page.clientWidth+"x"+this.div.page.clientHeight);
//ZLM.cerr("Body is now : "+this.div.page.parentNode.clientWidth+"x"+this.div.page.parentNode.clientHeight);
  this.div.page.style.top=this.div.menu.offsetHeight;
  this.refreshMenu();
}

ZWL.TabFrame.prototype.tallyTabWidth=function(start,end) {
  if (end==-1) end = this.tabs.length-1;
  var w=3;  // MAGIC NUMBER: "margin" from refreshMenu - should symbolize
  for (var i=start;i<=end;i++) {
      w+=(this.tabs[i].width+2);
  }
  return(w);
}

ZWL.TabFrame.prototype.getFocusToEndWidth=function() {
  if (this.focusedTab<0) { //focus (if any) is on index card, special case
  }
  else {
    return(this.tallyTabWidth(this.focusedTab,-1));
  }
  return(0);
}

ZWL.TabFrame.prototype.setTabVisibility=function() {
// set the variables firstTab and lastTab accordingly
  var workArea=this.div.menu.clientWidth;
  var totalTabWidth=this.tallyTabWidth(0,-1);
//ZLM.cerr("Work area is: "+workArea+" Total tab width is: "+totalTabWidth);
  if (totalTabWidth<workArea) {
    this.firstTab=0;
    this.lastTab=this.tabs.length-1;
    this.showIndex=false;
    return;
  }    

  var toEnd = this.getFocusToEndWidth();
  if (toEnd>workArea) { // list from focused frame to width of div is too big - Must compress somehow
//ZLM.cerr("Work area is: "+workArea+" Focus to end alone is: "+toEnd);
  }
  else {  // list might fit, depending on where in list Focus is
//ZLM.cerr("POSSIBLE FIT! Work area is: "+workArea+" Focus to end alone is: "+toEnd);
  }
}

ZWL.TabFrame.prototype.refreshMenu=function() {
// KEY VARIABLES CONTROLLING VISIBILITY
//  this.firstTab : index of First tab of the tab array to display 
//                  (if this is not 0, this.prevTab should be visible)
//  this.lastTab : index of last tab of tab array to display
//                 (if this is not this.tabs.length-1 this.nextTab should be visible)
//  this.showIndex: true if the index tab should be displayed (normally if there are more
//                  tabs to display than will fit on screen at once)
//  this.focusedTab: index of tab with the current focus (-1 for none, -2 for index card)

  var margin=3;
//ZLM.cerr("Page is now : "+this.div.page.clientWidth+"x"+this.div.page.clientHeight);
//ZLM.cerr("Body is now : "+this.div.page.parentNode.clientWidth+"x"+this.div.page.parentNode.clientHeight);

  this.setTabVisibility();
  if (this.firstTab!=0) margin+=(this.displayPrevTab("block")+2);
  else this.displayPrevTab("none");

  if (this.lastTab!=this.tabs.length-1) var last=this.nextTab;
  else if (this.showIndex==true) var last=this.indexTab;
  else var last=this.tabs[this.tabs.length-1];
//ZLM.cerr("First: "+this.firstTab+"Last: "+this.lastTab+" Index: "+this.showIndex);
//if (last==this.nextTab) alert("Next");
//if (last==this.indexTab) alert("Idx");
//if (last==this.tabs[this.tabs.length-1]) alert("Content");
  var foundFocus=false;

  for (var i=0;i<this.tabs.length;i++) {
    if ((i<this.firstTab) || (i>this.lastTab)) {
      this.tabs[i].style.display="none";
      this.tabTops[i].div.style.display="none";
      this.tabBase[i].div.style.display="none";
    }
    else {
      this.tabs[i].style.display="block";
      this.tabTops[i].div.style.display="block";
      this.tabBase[i].div.style.display="block";
      this.tabs[i].style.left=margin;
      margin+=(this.tabs[i].width+2);
      this.tabTops[i].div.style.left=(margin-4);
      this.tabBase[i].div.style.left=(margin-4);

      if (i==this.focusedTab) foundFocus=true;
      else {
        if (foundFocus) this.tabBase[i].renderLeftOverlap();
        else if (i!=this.focusedTab-1) this.tabBase[i].renderRightOverlap();
      }

      if (this.tabs[i]==last) {
         this.tabTops[i].renderRightEnd();
         this.tabBase[i].renderRight("none");
      }
      else {
         if (i==this.lastTab) {
           this.tabTops[i].renderLeftOverlap();
           if (!foundFocus) { // focus tab must not be visible at the moment
             this.tabBase[i].renderLeftOverlap();
           }
         }
         else this.tabTops[i].renderNormal();
      }
    }
  }
  if (this.showIndex) {
    margin+=(this.displayIndexTab(margin,"block")+2);
  }
  else this.displayIndexTab(0,"none");

  if (this.lastTab!=this.tabs.length-1) {
    this.displayNextTab(margin,"block");
  }
  else this.displayNextTab(0,"none");
}

ZWL.TabFrame.prototype.giveFocus=function(tab) {
  this.takeFocus();
  var i=0;
  while (i<this.tabs.length && this.tabs[i]!=tab) i++
  if (i==this.tabs.length) return;
  this.panes[i].style.display="block";
this.panes[i].style.width="100%";
this.panes[i].style.height="100%";

  tab.style.background=this.FRAME_COLOR;
  tab.style.borderBottomColor=this.FRAME_COLOR;
  tab.close.closeColor="red";
  tab.close.style.background="red";
  this.tabTops[i].tintLeft(this.FRAME_COLOR);
  this.tabBase[i].renderLeftFocused();
  this.backtintCloseButton(i,this.FRAME_COLOR);
  tab.hasFocus=true;
  this.focusedTab=i;  
  // Few extra bookkeeping points
  if (i==0) {
// NEED TO CHECK STUFF HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    this.firstTop.tintRight(this.FRAME_COLOR);
    this.firstBase.renderRightFocused();
    this.firstBase.renderLeft("none");
  }
  else {
    this.tabTops[i-1].tintRight(this.FRAME_COLOR);
    this.tabBase[i-1].renderRightFocused();
  }
}

ZWL.TabFrame.prototype.takeFocus=function() {
  var i=this.focusedTab;
  if (i<0) return;
  var t=this.tabs[i];
  this.panes[i].style.display="none";
  t.style.background=this.DARK_FRAME_COLOR;
  t.style.borderBottomColor=this.LINE_COLOR;
  t.close.closeColor=this.FRAME_COLOR;
  t.close.style.background=this.FRAME_COLOR;
  this.tabTops[i].tintLeft(this.DARK_FRAME_COLOR);
  this.tabBase[i].renderLeftOverlap();
  this.backtintCloseButton(i,this.DARK_FRAME_COLOR);
  t.hasFocus=false;
  if (i==0) { // used to be first tab
// NEED TO CHECK SCROLLING CONDITIONS HERE
    this.firstTop.tintRight(this.DARK_FRAME_COLOR);
    this.firstBase.renderRightOverlap();
    this.firstBase.renderLeft("none");
  }
  else {
    this.tabTops[i-1].tintRight(this.DARK_FRAME_COLOR);
    this.tabBase[i-1].renderRightOverlap();
  }
}

///
///
///
///
ZWL.TabFrame.prototype.makeArrowTab=function(url) {  
  var tabDiv = ZLM.simulateTag("div style='position:absolute;'");
  tabDiv.width=15+12; // arrow div size+padding;
  tabDiv.height=this.fontHeight+8;
  tabDiv.style.background=this.DARK_FRAME_COLOR;
  tabDiv.style.display="none";
  tabDiv.style.top=this.menuOffset;
  tabDiv.style.left=3;                      // MAGIC NUMBER AGAIN "margin" from refresh menu 
  ZLM.setSize(tabDiv,tabDiv.width,tabDiv.height,"2px solid "+this.LINE_COLOR);

  var arrowDiv = ZLM.simulateTag("div style='position:absolute; left:4; cursor:pointer; background-image:url("+url+"); background-position:center center;' onclick='ZWL.handleTabFrame(this.parentNode);'");
  arrowDiv.style.top=(tabDiv.height-15)/2; // center vertically
  ZLM.setSize(arrowDiv,15,15,"none");
  tabDiv.appendChild(arrowDiv); 

  tabDiv.controller=this;
  this.div.menu.appendChild(tabDiv);
  return(tabDiv);
}

ZWL.TabFrame.prototype.makeIndexTab=function(url) {  // URL:images/SmRightArrow.png
  this.indexTab=this.makeArrowTab(url);
  this.indexTabTop = new ZWL.TabTopper(this,this.div.menu,0,this.menuOffset-2);
  this.indexTabTop.div.style.display="none";

  this.indexTabBase = new ZWL.TabBase(this,this.div.menu,0,this.menuOffset+this.menuHeight-8);
  this.indexTabBase.div.style.display="none";
}

ZWL.TabFrame.prototype.makeNextTab=function(url) {  // URL:images/SmRightArrow.png
  this.nextTab=this.makeArrowTab(url);
  this.nextTabTop = new ZWL.TabTopper(this,this.div.menu,0,this.menuOffset-2);
  this.nextTabTop.renderRightEnd();
  this.nextTabTop.div.style.display="none";

  this.nextTabBase = new ZWL.TabBase(this,this.div.menu,0,this.menuOffset+this.menuHeight-8);
  this.nextTabBase.renderLeftOverlap();
  this.nextTabBase.renderRight("none");
  this.nextTabBase.div.style.display="none";
}

ZWL.TabFrame.prototype.makePrevTab=function(url) {  // URL:images/SmRightArrow.png
  this.prevTab=this.makeArrowTab(url);
  this.prevTabTop = new ZWL.TabTopper(this,this.div.menu,28,this.menuOffset-2);
  this.prevTabTop.renderRightOverlap();
  this.prevTabTop.div.style.display="none";

  this.prevTabBase = new ZWL.TabBase(this,this.div.menu,28,this.menuOffset+this.menuHeight-8);
  this.prevTabBase.renderRightOverlap();
  this.prevTabBase.div.style.display="none";
}

ZWL.TabFrame.prototype.displayPrevTab=function(mode) {
  this.prevTab.style.display=mode;
  this.prevTabTop.div.style.display=mode;
  this.prevTabBase.div.style.display=mode;
  if (mode=="none") return(0);
  if (this.firstTab==this.focusedTab) {
    this.prevTabTop.tintRight(this.FRAME_COLOR);
    this.prevTabBase.renderRightFocused();
  }
  else {
    this.prevTabTop.tintRight(this.DARK_FRAME_COLOR);
    this.prevTabBase.renderRightOverlap();    
  }
  return(this.prevTab.width);
}

ZWL.TabFrame.prototype.displayNextTab=function(margin, mode) {
  var m2=margin+this.nextTab.width-2;
  this.nextTab.style.left=margin;
  this.nextTab.style.display=mode;
  this.nextTabTop.div.style.left=m2;
  this.nextTabTop.div.style.display=mode;
  this.nextTabBase.div.style.left=m2;
  this.nextTabBase.div.style.display=mode;
  if (mode=="none") return(0);
  return(this.nextTab.width);
}

ZWL.TabFrame.prototype.displayIndexTab=function(margin, mode) {
  this.indexTab.style.display=mode;
  this.indexTabTop.div.style.display=mode;
  this.indexTabBase.div.style.display=mode;
  if (mode=="none") return(0);

  var m2=margin+this.indexTab.width-2;
  this.indexTab.style.left=margin;
  this.indexTabTop.div.style.left=m2;
  this.indexTabBase.div.style.left=m2;
  if (this.lastTab!=this.tabs.length) { // next tab will be showing
    this.indexTabTop.renderLeftOverlap();
    this.indexTabBase.renderLeftOverlap();
  }
  else {
    this.indexTabTop.renderRightEnd();
    this.indexTabBase.renderRightOverlap();
    this.indexTabBase.div.style.display="none";
  }
  return(this.indexTab.width);
}
////
////
ZWL.TabFrame.prototype.initTabs=function() {
  var iKids=[];
  for (var k=this.div.firstChild;k!=null;k=k.nextSibling) {
    if (k.nodeType==1) iKids[iKids.length]=k;
  }
  for (var i=0;i<iKids.length;i++) {
    this.addStaticTabs(iKids[i]);
    iKids[i].style.display="none";
  }
}

ZWL.TabFrame.prototype.addStaticTabs=function(root) {
  if (root.nodeType==1) {
    if (root.className=="tabRef") {
       var lbl=root.getAttribute("caption");
       if (lbl==null) lbl="(untitled)";
       var src=root.getAttribute("src");
       if (src!=null) this.addTab(lbl,src);
       root.style.display="none";
    }
    else {
      for (var k=root.firstChild;k!=null;k=k.nextSibling) this.addStaticTabs(k);
    }
  } 
}

ZWL.TabFrame.prototype.addFrame=function(src) {
  var idx = this.panes.length;
  var fDiv = ZLM.simulateTag("iframe src='"+src+"' width='0' height='0' style='position:absolute; left:0; top:0; border:0px solid red; display:block;'");
  this.div.page.appendChild(fDiv);
  this.panes[idx]=fDiv;
}

ZWL.TabFrame.prototype.addTab=function(label,url) {
  var idx = this.tabs.length;
  if (idx==0) { // first tab, need to turn on starter adornments
    this.firstTop.div.style.display="block";
    this.firstBase.div.style.display="block";
  }
  var tabDiv = ZLM.simulateTag("div style='position:absolute;'");
  tabDiv.style.background=this.DARK_FRAME_COLOR;

  var txtDiv = ZLM.simulateTag("div style='display:inline; cursor:pointer;' onclick='ZWL.handleTabFrame(this.parentNode);'");
  var txt = document.createTextNode(label);
  txtDiv.appendChild(txt);
  this.div.menu.appendChild(txtDiv);
  tabDiv.txtW=txtDiv.offsetWidth;
  tabDiv.txtH=txtDiv.offsetHeight;
  this.div.menu.removeChild(txtDiv);

  tabDiv.width=tabDiv.txtW+12+16;
  tabDiv.height=tabDiv.txtH+8;

  ZLM.setSize(tabDiv,tabDiv.width,tabDiv.height,"2px solid "+this.LINE_COLOR);
  txtDiv.style.display="block";
  txtDiv.style.position="absolute";
  txtDiv.style.left=4;
  txtDiv.style.top=4;

  tabDiv.appendChild(txtDiv); 
  tabDiv.close=this.makeCloseButton();
  tabDiv.close.style.top=(tabDiv.height-16)/2;
  tabDiv.close.style.left=tabDiv.width-20;
  tabDiv.appendChild(tabDiv.close);

  tabDiv.style.top=this.menuOffset;
  tabDiv.style.left=0;
  tabDiv.hasFocus=false;
  tabDiv.controller=this;
  this.div.menu.appendChild(tabDiv);
  
  this.tabTops[idx]=new ZWL.TabTopper(this,this.div.menu,0,this.menuOffset-2);
  this.tabBase[idx]=new ZWL.TabBase(this,this.div.menu,0,this.menuOffset+this.menuHeight-8);
  this.tabs[idx]=tabDiv;
  this.addFrame(url);
  this.giveFocus(this.tabs[idx]); 
  this.refreshMenu();
}


ZWL.TabFrame.prototype.makeCloseButton=function() {
  var divStr="div style='position:absolute; width:";  
  var div=ZLM.simulateTag(divStr+"16; height:16;' onmouseover='this.style.background="+'"red";'+"' onmouseout='this.style.background=this.closeColor;'");
  if (ZLM.isInternetExplorer()) div.style.fontSize="0px";
  div.closeColor=this.FRAME_COLOR;
  div.corner=new Array();
  div.corner[0]=ZLM.simulateTag(divStr+"2; height:2; top:0; left:0;'");
  div.corner[1]=ZLM.simulateTag(divStr+"2; height:2; top:0; left:14;'");
  div.corner[2]=ZLM.simulateTag(divStr+"2; height:2; top:14; left:14;'");
  div.corner[3]=ZLM.simulateTag(divStr+"2; height:2; top:14; left:0;'");
  div.cap=ZLM.simulateTag(divStr+"16; height:16; background-image:url(tabClose.png);'");
  for (var i=0;i<4;i++) {
    div.appendChild(div.corner[i]);
    div.corner[i].style.background=this.DARK_FRAME_COLOR;
  }
  div.appendChild(div.cap);
  div.style.background=this.FRAME_COLOR;
  return(div);
}

ZWL.TabFrame.prototype.backtintCloseButton=function(idx, color) {
  for (var i=0; i<4; i++) {
    this.tabs[idx].close.corner[i].style.background=color;
  }
}


ZWL.TabTopper=function(controller,parent,x,y) {
  this.boss=controller;
  this.div=ZLM.simulateTag("div style='position:absolute; z-index:1;'");
  ZLM.setSize(this.div,9,8,"none");
  this.div.overlapBar=ZLM.simulateTag("div style='position:absolute; top:2; left:0;'");
  ZLM.setSize(this.div.overlapBar,9,2,"none");
  this.div.leftTab=ZLM.simulateTag("div style='position:absolute; top:4; left:0;'");
  ZLM.setSize(this.div.leftTab,4,4,"none");
  this.div.rightTab=ZLM.simulateTag("div style='position:absolute; top:4; left:5;'");
  ZLM.setSize(this.div.rightTab,4,4,"none");
  this.div.centerFill=ZLM.simulateTag("div style='position:absolute; top:4; left:4;'");
  ZLM.setSize(this.div.centerFill,1,2,"none");
  this.div.tabArcRight=new Array();
  this.div.tabArcRight[0]=ZLM.simulateTag("div style='position:absolute; top:6; left:4;'");
  ZLM.setSize(this.div.tabArcRight[0],2,2,"none");
  this.div.tabArcRight[1]=ZLM.simulateTag("div style='position:absolute; top:4; left:5;'");
  ZLM.setSize(this.div.tabArcRight[1],2,2,"none");
  this.div.tabArcRight[2]=ZLM.simulateTag("div style='position:absolute; top:3; left:7;'");
  ZLM.setSize(this.div.tabArcRight[2],2,2,"none");
  this.div.tabArcRight[3]=ZLM.simulateTag("div style='position:absolute; top:2; left:8;'");
  ZLM.setSize(this.div.tabArcRight[3],1,1,"none");
  this.div.tabArcLeft=new Array();
  this.div.tabArcLeft[0]=ZLM.simulateTag("div style='position:absolute; top:6; left:3;'");
  ZLM.setSize(this.div.tabArcLeft[0],2,2,"none");
  this.div.tabArcLeft[1]=ZLM.simulateTag("div style='position:absolute; top:4; left:2;'");
  ZLM.setSize(this.div.tabArcLeft[1],2,2,"none");
  this.div.tabArcLeft[2]=ZLM.simulateTag("div style='position:absolute; top:3; left:0;'");
  ZLM.setSize(this.div.tabArcLeft[2],2,2,"none");
  this.div.tabArcLeft[3]=ZLM.simulateTag("div style='position:absolute; top:2; left:0;'");
  ZLM.setSize(this.div.tabArcLeft[3],1,1,"none");
  
  // add and paint parts appropriately
  parent.appendChild(this.div);
  this.div.style.background=this.boss.BG_COLOR;
  this.div.style.top=y;
  this.div.style.left=x;
  this.div.appendChild(this.div.overlapBar);
  this.div.overlapBar.style.background=this.boss.LINE_COLOR;
  this.div.appendChild(this.div.leftTab);
  this.div.leftTab.style.background=this.boss.DARK_FRAME_COLOR;
  this.div.appendChild(this.div.rightTab);
  this.div.rightTab.style.background=this.boss.DARK_FRAME_COLOR;
  this.div.appendChild(this.div.centerFill);
  this.div.centerFill.style.background=this.boss.DARK_FRAME_COLOR;

  for(var i=0;i<4;i++) {
    this.div.appendChild(this.div.tabArcRight[i]);
    this.div.tabArcRight[i].style.background=this.boss.LINE_COLOR;
  }
  for(var i=0;i<4;i++) {
    this.div.appendChild(this.div.tabArcLeft[i]);
    this.div.tabArcLeft[i].style.background=this.boss.LINE_COLOR;
  }
  this.render="";
}

ZWL.TabTopper.prototype.renderNormal=function() {
// "normal" means separate two tabs with no overlap
  this.div.overlapBar.style.display="none";
  this.div.centerFill.style.display="none";
  this.displayLeftArc("block");
  this.displayRightArc("block");
}

ZWL.TabTopper.prototype.renderRightOverlap=function() {
// render a tag with the right tab overlapping the left
  this.div.overlapBar.style.display="block";
  this.div.centerFill.style.display="block";
  this.displayLeftArc("none");
  this.displayRightArc("block");
  this.div.leftTab.style.display="block";
}

ZWL.TabTopper.prototype.renderLeftOverlap=function() {
// render a tag with the left tab overlapping the right
  this.div.overlapBar.style.display="block";
  this.div.centerFill.style.display="block";
  this.displayLeftArc("block");
  this.displayRightArc("none");
  this.div.rightTab.style.display="block";
}

ZWL.TabTopper.prototype.renderRightEnd=function() {
  this.div.overlapBar.style.display="none";
  this.div.centerFill.style.display="none";
  this.displayLeftArc("block");
  this.displayRightArc("none");
}

ZWL.TabTopper.prototype.renderLeftEnd=function() {
  this.div.overlapBar.style.display="none";
  this.div.centerFill.style.display="none";
  this.displayLeftArc("none");
  this.displayRightArc("block");
}

ZWL.TabTopper.prototype.tintRight=function(color) {
  this.div.rightTab.style.background=color;
}

ZWL.TabTopper.prototype.tintLeft=function(color) {
  this.div.leftTab.style.background=color;
}

ZWL.TabTopper.prototype.displayLeftArc=function(mode) {
  for (var i=0;i<4;i++) this.div.tabArcLeft[i].style.display=mode;
  this.div.leftTab.style.display=mode;
}

ZWL.TabTopper.prototype.displayRightArc=function(mode) {
  for (var i=0;i<4;i++) this.div.tabArcRight[i].style.display=mode;
  this.div.rightTab.style.display=mode;
}

//======================
ZWL.TabBase=function(controller,parent,x,y) {
  this.boss=controller;
  this.div=ZLM.simulateTag("div style='position:absolute; z-index:1;'");
  ZLM.setSize(this.div,9,8,"none");
  this.div.overlapBar=ZLM.simulateTag("div style='position:absolute; top:4; left:0;'");
  ZLM.setSize(this.div.overlapBar,9,2,"none");
  this.div.pageBar=ZLM.simulateTag("div style='position:absolute; top:6; left:0;'");
  ZLM.setSize(this.div.pageBar,9,2,"none");
  this.div.leftTab=ZLM.simulateTag("div style='position:absolute; top:0; left:0;'");
  ZLM.setSize(this.div.leftTab,4,4,"none");
  this.div.rightTab=ZLM.simulateTag("div style='position:absolute; top:0; left:5;'");
  ZLM.setSize(this.div.rightTab,4,4,"none");
  this.div.centerFill=ZLM.simulateTag("div style='position:absolute; top:2; left:4;'");
  ZLM.setSize(this.div.centerFill,1,2,"none");
  this.div.tabArcRight=new Array();
  this.div.tabArcRight[0]=ZLM.simulateTag("div style='position:absolute; top:0; left:4;'");
  ZLM.setSize(this.div.tabArcRight[0],2,2,"none");
  this.div.tabArcRight[1]=ZLM.simulateTag("div style='position:absolute; top:2; left:5;'");
  ZLM.setSize(this.div.tabArcRight[1],2,2,"none");
  this.div.tabArcRight[2]=ZLM.simulateTag("div style='position:absolute; top:3; left:7;'");
  ZLM.setSize(this.div.tabArcRight[2],2,2,"none");
  this.div.tabArcRight[3]=ZLM.simulateTag("div style='position:absolute; top:4; left:8;'");
  ZLM.setSize(this.div.tabArcRight[3],1,1,"none");
  this.div.tabArcLeft=new Array();
  this.div.tabArcLeft[0]=ZLM.simulateTag("div style='position:absolute; top:0; left:3;'");
  ZLM.setSize(this.div.tabArcLeft[0],2,2,"none");
  this.div.tabArcLeft[1]=ZLM.simulateTag("div style='position:absolute; top:2; left:2;'");
  ZLM.setSize(this.div.tabArcLeft[1],2,2,"none");
  this.div.tabArcLeft[2]=ZLM.simulateTag("div style='position:absolute; top:3; left:0;'");
  ZLM.setSize(this.div.tabArcLeft[2],2,2,"none");
  this.div.tabArcLeft[3]=ZLM.simulateTag("div style='position:absolute; top:5; left:0;'");
  ZLM.setSize(this.div.tabArcLeft[3],1,1,"none");
  
  // add and paint parts appropriately
  parent.appendChild(this.div);
  this.div.style.background=this.boss.BG_COLOR;
  this.div.style.top=y;
  this.div.style.left=x;
  this.div.appendChild(this.div.overlapBar);
  this.div.overlapBar.style.background=this.boss.LINE_COLOR;
  this.div.appendChild(this.div.pageBar);
  this.div.pageBar.style.background=this.boss.FRAME_COLOR;
  this.div.appendChild(this.div.leftTab);
  this.div.leftTab.style.background=this.boss.DARK_FRAME_COLOR;
  this.div.appendChild(this.div.rightTab);
  this.div.rightTab.style.background=this.boss.DARK_FRAME_COLOR;
  this.div.appendChild(this.div.centerFill);
  this.div.centerFill.style.background=this.boss.DARK_FRAME_COLOR;

  for(var i=0;i<4;i++) {
    this.div.appendChild(this.div.tabArcRight[i]);
    this.div.tabArcRight[i].style.background=this.boss.LINE_COLOR;
  }
  for(var i=0;i<4;i++) {
    this.div.appendChild(this.div.tabArcLeft[i]);
    this.div.tabArcLeft[i].style.background=this.boss.LINE_COLOR;
  }
  this.render="";
}

ZWL.TabBase.prototype.renderRightOverlap=function() {
  this.displayLeftArc("block");
  this.displayRightArc("none");
  this.div.leftTab.style.display="block";
  this.div.rightTab.style.display="block";

  this.div.overlapBar.style.background=this.boss.LINE_COLOR;
  this.div.centerFill.style.background=this.boss.DARK_FRAME_COLOR;
  this.div.rightTab.style.background=this.boss.DARK_FRAME_COLOR;
  this.div.leftTab.style.background=this.boss.DARK_FRAME_COLOR;
}

ZWL.TabBase.prototype.renderRightFocused=function() {
  this.displayLeftArc("block");
  this.displayRightArc("none");
  this.div.leftTab.style.display="block";
  this.div.rightTab.style.display="block";

  this.div.overlapBar.style.background=this.boss.FRAME_COLOR;
  this.div.centerFill.style.background=this.boss.FRAME_COLOR;
  this.div.rightTab.style.background=this.boss.FRAME_COLOR;
  this.div.leftTab.style.background=this.boss.DARK_FRAME_COLOR;
}

ZWL.TabBase.prototype.renderLeftOverlap=function() {
  this.div.overlapBar.style.display="block";
  this.displayLeftArc("none");
  this.displayRightArc("block");
  this.div.leftTab.style.display="block";
  this.div.rightTab.style.display="block";

  this.div.overlapBar.style.background=this.boss.LINE_COLOR;
  this.div.centerFill.style.background=this.boss.DARK_FRAME_COLOR;
  this.div.rightTab.style.background=this.boss.DARK_FRAME_COLOR;
  this.div.leftTab.style.background=this.boss.DARK_FRAME_COLOR;
}

ZWL.TabBase.prototype.renderLeftFocused=function() {
  this.displayLeftArc("none");
  this.displayRightArc("block");
  this.div.leftTab.style.display="block";
  this.div.rightTab.style.display="block";

  this.div.overlapBar.style.background=this.boss.FRAME_COLOR;
  this.div.centerFill.style.background=this.boss.FRAME_COLOR;
  this.div.leftTab.style.background=this.boss.FRAME_COLOR;
  this.div.rightTab.style.background=this.boss.DARK_FRAME_COLOR;
}

ZWL.TabBase.prototype.renderLeft=function(mode) {
  this.div.leftTab.style.display=mode;
} 

ZWL.TabBase.prototype.renderRight=function(mode) {
  this.div.rightTab.style.display=mode;
} 

ZWL.TabBase.prototype.displayLeftArc=function(mode) {
  for (var i=0;i<4;i++) this.div.tabArcLeft[i].style.display=mode;
}

ZWL.TabBase.prototype.displayRightArc=function(mode) {
  for (var i=0;i<4;i++) this.div.tabArcRight[i].style.display=mode;
}

//==============
ZWL.initTabFrame=function() {
  var f = ZLM.getElementsByClassPrefix("tabFrame",document.body);
  for (var i=0;i<f.length;i++) {
    if (f[i].className=="tabFrame" && !ZWL.isReady(f[i])) {
      var tmp=new ZWL.TabFrame(f[i]);
      ZWL.markAsReady(f[i]);
    }
  }
 }

//==============//
// GRID WIDGET  //
//==============//

ZWL.createGrid=function(g) {
  // GRID DATA
  // nRows : number of actual rows
  // nCols : number of actual columns
  // rHeader : binary flag to turn off header row
  // cHeader : binary flag to turn off header column
  // rResize : binary flag to allow user to resize row heights interactively
  // cResize : binary flag to allow user to resize column widths interactively
  // rHeight : default height of rows (in pixels)
  // cWidth  : default width of cols (in pixels)
  // cA      : multidimensional cell array
  // rH      : array of row adjust handles
  // cH      : array of column adjust handles
  // gridArea: div containing the actual array of cells and adjustment handles
  
  // parse and store base attributes
  g.nRows = g.getAttribute("nRows");
  g.nCols = g.getAttribute("nCols");
  if (g.getAttribute("rowHeader")=="false") g.rHeader=0;
  else g.rHeader=1;
  if (g.getAttribute("colHeader")=="false") g.cHeader=0;
  else g.cHeader=1;
  if (g.getAttribute("rowResize")=="false") g.rResize=0;
  else g.rResize=1;
  if (g.getAttribute("colResize")=="false") g.cResize=0;
  else g.cResize=1;
  
  g.cWidth=ZWL.initAttribute(g,"colWidth",100);
  g.rHeight=ZWL.initAttribute(g,"rowHeight",25);

  if (g.cHeader) g.nCols++;  // tack on room for a header
  if (g.rHeader) g.nRows++;  // tack on room for a header

  g.gridArea = ZLM.simulateTag("div style='position:relative; top:0; left:0;'");
  g.gridArea.style.width=g.nCols*g.cWidth;
  g.gridArea.style.height=g.nRows*g.rHeight;
  g.style.width=g.nCols*g.cWidth;
  g.style.height=g.nRows*g.rHeight;
  g.style.border="2px outset red";

  g.appendChild(g.gridArea);
  var style="style='border:1px solid black; position:absolute; fontSize:0px; overflow:hidden;'";
  g.cA=new Array(g.nRows);
  for (var r=0;r<g.nRows;r++) {
    g.cA[r]=new Array(g.nCols);
    for (var c=0;c<g.nCols;c++) {
      g.cA[r][c]=ZLM.simulateTag("div "+style);
      if (r==0 && c>0) {
        var lbl=ZLM.simulateTag("div className='zenGridHeader'");
        lbl.appendChild(document.createTextNode(c));
        lbl.style.width=g.cWidth-4;
        lbl.style.position="relative";
        lbl.style.left=2;
        lbl.style.fontSize="14px";
        lbl.style.fontFamily="Arial Black";
        lbl.style.align="center";
lbl.style.zIndex= "-5";
        lbl.style.textAlign="center";
lbl.style.background="yellow";
        g.cA[r][c].appendChild(lbl);
      }
      g.cA[r][c].style.top=r*g.rHeight;
      g.cA[r][c].style.left=c*g.cWidth;
      g.gridArea.appendChild(g.cA[r][c]);
      ZLM.setWidth(g.cA[r][c],g.cWidth);
      ZLM.setHeight(g.cA[r][c],g.rHeight);
    }
  }

  if (!ZWL.resizeMgr) ZWL.resizeMgr=new ZWL.ResizeManager();

  g.cH=new Array(g.nCols);
  style="style='width:5; height:"+g.rHeight+"; position:absolute; cursor:col-resize; z-index:10;'";
  for (var c=0;c<g.nCols; c++) {
    g.cH[c]=ZLM.simulateTag("div "+style+" onmousedown='ZLM.drag(this,event);'"); 
    g.cH[c].style.top="0";
    g.cH[c].style.left=(c+1)*g.cWidth-3;
    g.cH[c].baseGrid=g;
    ZLM.registerDragItem(g.cH[c],ZWL.resizeMgr);
    g.gridArea.appendChild(g.cH[c]);
  } 
  
  g.rH=new Array(g.nRows);
  style="style='width:"+g.cWidth+"; height:5; position:absolute; cursor:row-resize; z-index:1;'";
  for (var r=0;r<g.nRows; r++) {
    g.rH[r]=ZLM.simulateTag("div "+style+" onmousedown='ZLM.drag(this,event);'"); 
    g.rH[r].style.top=(r+1)*g.rHeight-3;
    g.rH[r].style.left=0;
    g.rH[r].baseGrid=g;
    ZLM.registerDragItem(g.rH[r],ZWL.resizeMgr);
    g.gridArea.appendChild(g.rH[r]);
  } 
  
}

ZWL.setGridColumnWidth=function(grid, colIdx, width) {
  // adjusting the width of a column consists of
  //  1) making the actual column wider
  //  2) moving all the other columns over
  //  3) moving all the adjustment handlers over
  //  4) resizing the overall grid container
  if (width<4) width=4;
  var delta = width - grid.cA[0][colIdx].clientWidth;
//ZLM.cerr("new width: "+width+" Delta of "+delta);
//ZLM.getClientWidth(grid.cA[0][colIdx]);
  for (var r=0;r<grid.nRows;r++) {
//    grid.cA[r][colIdx].style.width=width;
    ZLM.setWidth(grid.cA[r][colIdx],width);
    for (var c=colIdx+1; c<grid.nCols; c++) grid.cA[r][c].style.left=grid.cA[r][c].offsetLeft+delta;
  }
  for (var c=colIdx;c<grid.nCols;c++) grid.cH[c].style.left=grid.cH[c].offsetLeft+delta;
  grid.gridArea.style.width=grid.gridArea.clientWidth+delta;
  grid.style.width=grid.gridArea.offsetWidth;
}

ZWL.setGridRowHeight=function(grid, rowIdx, height) {
  if (height<4) height=4;
  var delta = height - grid.cA[rowIdx][0].clientHeight;
  for (var c=0;c<grid.nCols;c++) {
//    grid.cA[rowIdx][c].style.height=height;
    ZLM.setHeight(grid.cA[rowIdx][c],height);
    for (var r=rowIdx+1; r<grid.nRows; r++) grid.cA[r][c].style.top=grid.cA[r][c].offsetTop+delta;
  }
  for (var r=rowIdx;r<grid.nRows;r++) grid.rH[r].style.top=grid.rH[r].offsetTop+delta;
  grid.gridArea.style.height=grid.gridArea.clientHeight+delta;
  grid.style.height=grid.gridArea.offsetHeight;
}

ZWL.initGrids=function() {
  var grids = ZLM.getElementsByClassPrefix("csGrid",document.body);
  for (var i=0;i<grids.length;i++) {
    if (grids[i].className=="csGrid") {
      ZWL.createGrid(grids[i]);
    }
  }
}

//# HELPER CLASS #
ZWL.ResizeManager=function() {}

ZWL.ResizeManager.prototype.startDrag=function(mgr, wrapper) {
  this.who = wrapper.node;
  this.baseGrid = this.who.baseGrid;
  if (this.who.offsetTop==0) { // column adjustor
    for (var i=0;i<this.baseGrid.nCols;i++) {
      if (this.baseGrid.cH[i]==this.who) {
        this.idx=i;
      }
    }
  }
  else {
    for (var i=0;i<this.baseGrid.nRows;i++) {
      if (this.baseGrid.rH[i]==this.who) {
        this.idx=i;
      }
    }
  }
}

/// Move the dragAvatar over by 2 pixels to prevent overlap with the crosshair cursor.
ZWL.ResizeManager.prototype.constrainDragX=function(mgr, wrapper, intendedX) {
  var n = wrapper.node;
  if (n.offsetLeft==0) return(0);  // lateral move of row adjuster
//n.style.background="red";
  var newWidth = this.baseGrid.cA[0][this.idx].clientWidth+intendedX-n.offsetLeft;
  ZWL.setGridColumnWidth(this.baseGrid,this.idx,newWidth);
  return(n.offsetLeft);  
}

/// Like constrainDragX, we're moving the dragAvatar down by 2 pixels to 
/// prevent overlap with the  crosshair cursor.
ZWL.ResizeManager.prototype.constrainDragY=function(mgr, wrapper, intendedY) {
  var n=wrapper.node;
  if (n.offsetTop==0) return(0); // vertical move of column adjuster
  var newHeight = this.baseGrid.cA[this.idx][0].clientHeight+intendedY-n.offsetTop;
  ZWL.setGridRowHeight(this.baseGrid,this.idx,newHeight);
  return(n.offsetTop);  
}

ZWL.ResizeManager.prototype.endDrag=function(mgr, wrapper){
}

//# HELPER CLASS #
ZWL.SliderManager=function() {
  this.SLIDER=1;
  this.RANGE_SLIDER=2;
  this.SCROLLBAR=3;
}

ZWL.SliderManager.prototype.startDrag=function(mgr, wrapper) {
  this.who = wrapper.node;
  this.baseObj= wrapper.node.baseObj;
  this.vert = wrapper.node.baseObj.vert;
  this.ilk = this.SLIDER;
  if (wrapper.node.baseObj.className=="ZEN_RANGE_SLIDER") this.ilk=this.RANGE_SLIDER;

  this.pxMin=wrapper.node.baseObj.getMinPxPosition(this.who);
  this.pxMax=wrapper.node.baseObj.getMaxPxPosition(this.who);
  this.pxInset=wrapper.node.baseObj.getStaticPxInset(this.who);
}

ZWL.SliderManager.prototype.constrainDragX=function(mgr, wrapper, intendedX) {
  if (this.vert) return(this.pxInset); // No lateral movements of V sliders
  if (this.ilk==this.RANGE_SLIDER) wrapper.node.baseObj.updateRange(wrapper.node)
  else wrapper.node.baseObj.updateValue();
  if (intendedX<this.pxMin) return(this.pxMin);
  if (intendedX>this.pxMax) return(this.pxMax);
  return(intendedX);
}

ZWL.SliderManager.prototype.constrainDragY=function(mgr, wrapper, intendedY) {
  if (!this.vert) return(this.pxInset); // No vertical movements of H sliders
  if (this.ilk==this.RANGE_SLIDER) wrapper.node.baseObj.updateRange(wrapper.node)
  else wrapper.node.baseObj.updateValue();
  if (intendedY<this.pxMin) return(this.pxMin);
  if (intendedY>this.pxMax) return(this.pxMax);
  return(intendedY);
}

ZWL.SliderManager.prototype.endDrag=function(mgr, wrapper){
  wrapper.node.baseObj.snapToValue();  
}

//######################################################## 

ZWL.initSliders=function() {
//  if (!ZWL.sliderMgr) ZWL.sliderMgr=new ZWL.SliderManager();

  var sliders = ZLM.getElementsByClassPrefix("slider",document.body);
  for (var i=0;i<sliders.length;i++) {
    if (sliders[i].className=="slider" && !ZWL.isReady(sliders[i])) {
      var s=new ZWL.Slider(sliders[i]);
      ZWL.markAsReady(sliders[i]);
    }
  }
  var sliders = ZLM.getElementsByClassPrefix("rangeSlider",document.body);
  for (var i=0;i<sliders.length;i++) {
    if (sliders[i].className=="rangeSlider" && !ZWL.isReady(sliders[i])) {
      var s=new ZWL.RangeSlider(sliders[i]);
      ZWL.markAsReady(sliders[i]);
    }
  }
  var sliders = ZLM.getElementsByClassPrefix("scrollbar",document.body);
  for (var i=0;i<sliders.length;i++) {
    if (sliders[i].className=="scrollbar" && !ZWL.isReady(sliders[i])) {
      var s=new ZWL.Scrollbar(sliders[i]);
      ZWL.markAsReady(sliders[i]);
    }
  }
}

ZWL.initAttribute=function(div,attrName,defaultValue) {
   var val = div.getAttribute(attrName);
   if (val==null || val=="") val=defaultValue;
   return(val);
}

// 
// AUTOFIRE SYSTEM FOR PRESS & HOLD BUTTONS 
//

ZWL.autofireFlag=0;
ZWL.autofireWidget=null;
ZWL.autofireEventX=0;
ZWL.autofireEventY=0;

ZWL.autofire=function(fn,delay) {
  if (ZWL.autofireFlag!=1) return;
  var widget=ZWL.autofireWidget;
  eval(fn);    
  setTimeout("ZWL.autofire('"+fn+"',"+delay+");",delay);
}

ZWL.autofireCB=function(who,event,fn,delay) {
  ZWL.autofireFlag=1;
  ZWL.autofireWidget=who;
  ZWL.autofireEventX=event.clientX;
  ZWL.autofireEventY=event.clientY;
  ZWL.autofire(fn,delay);
}

ZWL.cancelAutofireCB=function(widget,fn) {
  eval(fn);
  ZWL.autofireFlag=0;
}

//######################################################## 

ZWL.Scrollbar =function(div) {
//  scrollbars are defined by
//    orientation: horizontal or vertical;
//    pageSize : max extent of virtual page (in generic units)
//    viewSize : how much of the virtual page (in generic units) is visible
//    viewHome : location (in generic units) of the Home position of the view
//    unitScrollDelay : scrolling speed for up and down arrows
//    pageScrollDelay : scrolling speed for page flips
//
//   callbacks:
//     onpageup: response to autofire above scrollbar handle
//     onunitup: response to autofire on up arrow
//     onscroll: response to drag of scrollbar handle
//     onunitdown: response to autofire on down arrow
//     onpagedown: response to autofire below scrollbar

   this.SLIDER_SPAN=19;
   this.SLIDER_ICON_LEFT_EDGE="hSliderTabLeft.png";
   this.SLIDER_ICON_RIGHT_EDGE="hSliderTabRight.png";
   this.SLIDER_ICON_H_FILL="hSliderTabFill.png";
   this.SLIDER_ICON_H_GRIP="hSliderTabGrip.png";
   this.SLIDER_ICON_TOP="vSliderTabTop.png";
   this.SLIDER_ICON_BOTTOM="vSliderTabBottom.png";
   this.SLIDER_ICON_V_FILL="vSliderTabFill.png";
   this.SLIDER_ICON_V_GRIP="vSliderTabGrip.png";

   this.SLIDER_ICON_UP="images/SmUpArrow.png";
   this.SLIDER_ICON_DOWN="images/SmDownArrow.png";
   this.SLIDER_ICON_LEFT="images/SmLeftArrow.png";
   this.SLIDER_ICON_RIGHT="images/SmRightArrow.png";

   this.className="ZEN_SCROLLBAR";
   this.div = div;
   div.controller = this;

   this.minValue = 0;
   this.maxValue = ZWL.initAttribute(div,"pageSize",100);
   this.value= ZWL.initAttribute(div,"viewHome",0);
   this.extent = ZWL.initAttribute(div,"viewSize",this.maxValue);
   this.usDelay = ZWL.initAttribute(div,"unitScrollDelay",100);
   this.psDelay = ZWL.initAttribute(div,"pageScrollDelay",250);
   if (div.getAttribute("orientation")=="vertical") this.vert=1;
   else this.vert=0;
   this.onPageUpCB = ZWL.initAttribute(div,"onpageup",null);
   this.onUnitUpCB = ZWL.initAttribute(div,"onunitup",null);
   this.onScrollCB = ZWL.initAttribute(div,"onscroll",null);
   this.onUnitDownCB = ZWL.initAttribute(div,"onunitdown",null);
   this.onPageDownCB = ZWL.initAttribute(div,"onpagedown",null);
   this.createAvatar();
}

ZWL.Scrollbar.prototype.createAvatar=function() {
   var w = this.div.clientWidth;
   var h = this.div.clientHeight;
   var bSz = this.SLIDER_SPAN-4;
   if (this.vert) {
     if (w>this.SLIDER_SPAN) var offset=(w-this.SLIDER_SPAN)/2;
     else var offset=0;
     var tH = this.div.clientHeight-2*this.SLIDER_SPAN-2;
     
     this.div.body=ZLM.simulateTag("div style='width:"+this.SLIDER_SPAN+"; height:100%; position:relative; top:0; left:"+offset+";'");
     if (ZLM.isIE) this.div.body.style.fontSize="0pt";
     this.div.appendChild(this.div.body);

     this.div.upButton=ZLM.simulateTag("div style='position:absolute; top:0; left:0; border:2px outset #a0a0a0; background-image:url("+this.SLIDER_ICON_UP+");'");
     this.div.upButton.controller=this;
     ZLM.setLocalAttribute(this.div.upButton,"onmousedown","ZWL.autofireCB(this,event,'widget.controller.upCB();',"+this.usDelay+");");
     ZLM.setLocalAttribute(this.div.upButton,"onmouseup","ZWL.cancelAutofireCB(this,'widget.controller.normalCB();');");
     this.div.body.appendChild(this.div.upButton); 
     ZLM.setSize(this.div.upButton,bSz,bSz);


     this.div.trough=ZLM.simulateTag("div style='border:1px solid gray; position:absolute; top:"+this.SLIDER_SPAN+"; left:0;'");
     this.div.trough.controller=this;
     ZLM.setLocalAttribute(this.div.trough,"onmousedown","ZWL.autofireCB(this,event,'widget.controller.pageCB();',"+this.usDelay+");");
     ZLM.setLocalAttribute(this.div.trough,"onmouseup","ZWL.cancelAutofireCB(this,'widget.controller.endPageCB();');");
     this.div.body.appendChild(this.div.trough);
     ZLM.setSize(this.div.trough,this.SLIDER_SPAN-2,tH);

     this.div.tab=ZLM.simulateTag("div class='sliderTab'; style='width:"+this.SLIDER_SPAN+"; height:"+this.SLIDER_SPAN+"; position:absolute; top:0; left:0; cursor:n-resize;' onmousedown='ZLM.drag(this,event);'");
     this.div.tab.baseObj=this;
     this.div.body.appendChild(this.div.tab);
     this.div.tabTop = ZLM.simulateTag("div style='width:19; height:4; position:absolute; top:0; left:0; background-image:url("+this.SLIDER_ICON_TOP+");'");
     this.div.tabFill = ZLM.simulateTag("div style='width:19; height:11; position:absolute; top:4; left:0; background-image:url("+this.SLIDER_ICON_V_FILL+"); background-repeat:repeat-y;'");
     this.div.tabBottom = ZLM.simulateTag("div style='width:19; height:4; position:absolute; top:15; left:0; background-image:url("+this.SLIDER_ICON_BOTTOM+");'");
     this.div.tabGrip = ZLM.simulateTag("div style='width:19; height:19; position:absolute; top:0; left:0; z-index:1; background-image:url("+this.SLIDER_ICON_V_GRIP+");'");
     this.div.tab.appendChild(this.div.tabTop);
     this.div.tab.appendChild(this.div.tabFill);
     this.div.tab.appendChild(this.div.tabBottom);
     this.div.tab.appendChild(this.div.tabGrip);

     this.div.downButton=ZLM.simulateTag("div style='position:absolute; top:"+(this.div.body.clientHeight-this.SLIDER_SPAN)+"; left:0; border:2px outset #a0a0a0; background-image:url("+this.SLIDER_ICON_DOWN+");'");
     this.div.downButton.controller=this;
     ZLM.setLocalAttribute(this.div.downButton,"onmousedown","ZWL.autofireCB(this,event,'widget.controller.downCB();',"+this.usDelay+");");
     ZLM.setLocalAttribute(this.div.downButton,"onmouseup","ZWL.cancelAutofireCB(this,'widget.controller.normalCB();');");
     this.div.body.appendChild(this.div.downButton); 
     ZLM.setSize(this.div.downButton,bSz,bSz);
   }

  else {
     if (h>this.SLIDER_SPAN) var offset=(h-this.SLIDER_SPAN)/2;
     else var offset=0;
     var tW = this.div.clientWidth-2*this.SLIDER_SPAN-2;
     this.div.body=ZLM.simulateTag("div style='width:100%; height:"+this.SLIDER_SPAN+"; position:relative; top:"+offset+"; left:0;'");
     if (ZLM.isIE) this.div.body.style.fontSize="0pt";
     this.div.appendChild(this.div.body);

     this.div.upButton=ZLM.simulateTag("div style='position:absolute; top:0; left:0; border:2px outset #a0a0a0; background-image:url("+this.SLIDER_ICON_LEFT+");'");
     this.div.upButton.controller=this;
     ZLM.setLocalAttribute(this.div.upButton,"onmousedown","ZWL.autofireCB(this,event,'widget.controller.upCB();',"+this.usDelay+");");
     ZLM.setLocalAttribute(this.div.upButton,"onmouseup","ZWL.cancelAutofireCB(this,'widget.controller.normalCB();');");
     this.div.body.appendChild(this.div.upButton); 
     ZLM.setSize(this.div.upButton,bSz,bSz);

     this.div.trough=ZLM.simulateTag("div style='border:1px solid gray; position:absolute; left:"+this.SLIDER_SPAN+"; top:0;'");
     this.div.trough.controller=this;
     ZLM.setLocalAttribute(this.div.trough,"onmousedown","ZWL.autofireCB(this,event,'widget.controller.pageCB();',"+this.usDelay+");");
     ZLM.setLocalAttribute(this.div.trough,"onmouseup","ZWL.cancelAutofireCB(this,'widget.controller.endPageCB();');");
     this.div.body.appendChild(this.div.trough);
     ZLM.setSize(this.div.trough,tW,this.SLIDER_SPAN-2);

     this.div.tab=ZLM.simulateTag("div class='sliderTab'; style='width:"+this.SLIDER_SPAN+"; height:"+this.SLIDER_SPAN+"; position:absolute; top:0; left:0; cursor:e-resize;' onmousedown='ZLM.drag(this,event);'");
     this.div.tab.baseObj=this;
     this.div.body.appendChild(this.div.tab);
     this.div.tabLeft = ZLM.simulateTag("div style='width:4; height:19; position:absolute; top:0; left:0; background-image:url("+this.SLIDER_ICON_LEFT_EDGE+");'");
     this.div.tabFill = ZLM.simulateTag("div style='width:11; height:19; position:absolute; top:0; left:4; background-image:url("+this.SLIDER_ICON_H_FILL+"); background-repeat:repeat-x;'");
     this.div.tabRight = ZLM.simulateTag("div style='width:4; height:19; position:absolute; top:0; left:15; background-image:url("+this.SLIDER_ICON_RIGHT_EDGE+");'");
     this.div.tabGrip = ZLM.simulateTag("div style='width:19; height:19; position:absolute; top:0; left:0; z-index:1; background-image:url("+this.SLIDER_ICON_H_GRIP+");'");
     this.div.tab.appendChild(this.div.tabLeft);
     this.div.tab.appendChild(this.div.tabFill);
     this.div.tab.appendChild(this.div.tabRight);
     this.div.tab.appendChild(this.div.tabGrip);

     this.div.downButton=ZLM.simulateTag("div style='position:absolute; left:"+(this.div.body.clientWidth-this.SLIDER_SPAN)+"; top:0; border:2px outset #a0a0a0; background-image:url("+this.SLIDER_ICON_RIGHT+");'");
     this.div.downButton.controller=this;
     ZLM.setLocalAttribute(this.div.downButton,"onmousedown","ZWL.autofireCB(this,event,'widget.controller.downCB();',"+this.usDelay+");");
     ZLM.setLocalAttribute(this.div.downButton,"onmouseup","ZWL.cancelAutofireCB(this,'widget.controller.normalCB();');");
     this.div.body.appendChild(this.div.downButton); 
     ZLM.setSize(this.div.downButton,bSz,bSz);
   }
   var sliderColor = ZLM.toHTMLColorSpec(ZLM.getRGBBackgroundColor(this.div.tab));
   this.div.downButton.style.backgroundColor=sliderColor;
   this.div.upButton.style.backgroundColor=sliderColor;
ZLM.cerr("registering tab: "+ZWL.sliderMgr);
   ZLM.registerDragItem(this.div.tab,ZWL.sliderMgr);
   this.snapToValue();
}

ZWL.Scrollbar.prototype.normalCB=function() {
  this.div.upButton.style.border="2px outset gray";
  this.div.downButton.style.border="2px outset gray";
}

ZWL.Scrollbar.prototype.upCB=function() {
  this.div.upButton.style.border="2px inset gray";
  eval(this.onUnitUpCB);
}

ZWL.Scrollbar.prototype.downCB=function() {
  this.div.downButton.style.border="2px inset gray";
  eval(this.onUnitDownCB);
}

ZWL.Scrollbar.prototype.pageCB=function() {
  if (this.vert) {
    var b=this.div.tab.offsetTop-this.SLIDR_SPAN;
    var e=b+this.div.tab.offsetHeight;
    var y=ZWL.autofireEventY-ZLM.getRelativeOffsetTop(this.div.trough,document.body);
  }
  else {
    var b=this.div.tab.offsetLeft-this.SLIDER_SPAN;
    var e=b+this.div.tab.offsetWidth;
    var y=ZWL.autofireEventX-ZLM.getRelativeOffsetLeft(this.div.trough,document.body);
  }
  if (y<b) eval(this.onPageUpCB);
  else if (y>e) eval(this.onPageDownCB);
  else ZWL.cancelAutofireCB(this,null);
}

ZWL.Scrollbar.prototype.endPageCB=function() {
ZLM.cerr("Whoa!");
}

ZWL.Scrollbar.prototype.getMinPxPosition=function(tab) {
  return(this.SLIDER_SPAN);
}

ZWL.Scrollbar.prototype.getMaxPxPosition=function(tab) {
  if (this.vert) return(this.div.clientHeight-this.SLIDER_SPAN-this.div.tab.offsetHeight);
  return(this.div.clientWidth-this.SLIDER_SPAN-this.div.tab.offsetWidth);
}

ZWL.Scrollbar.prototype.getStaticPxInset=function(tab) {
  return(0);
}

ZWL.Scrollbar.prototype.updateValue=function() {
  if (this.vert) {
    var offset = this.div.tab.offsetTop-this.SLIDER_SPAN;
    var span = this.div.trough.offsetHeight-this.div.tab.offsetHeight;
  }
  else {
    var offset = this.div.tab.offsetLeft-this.SLIDER_SPAN;
    var span = this.div.trough.offsetWidth-this.div.tab.offsetWidth;
  }
  var range = this.maxValue-this.minValue;
  this.value=Math.round(range*(offset/span))+this.minValue;
  eval(this.onScrollCB);
}

ZWL.Scrollbar.prototype.snapToValue=function() {
  var homePercent = this.value/this.maxValue;
  var sizePercent = this.extent/this.maxValue;
  if (this.vert) {
    var tabSize=this.div.trough.offsetHeight*sizePercent;
    if (tabSize<this.SLIDER_SPAN) tabSize=this.SLIDER_SPAN;
    this.div.tab.style.height=tabSize;
    this.div.tabFill.style.height=tabSize-8;
    this.div.tabBottom.style.top=tabSize-4;
    this.div.tabGrip.style.top=(tabSize-this.SLIDER_SPAN)/2;
    var homePx = homePercent*(this.div.trough.offsetHeight-tabSize);
    homePx+=this.SLIDER_SPAN;
    this.div.tab.style.top=homePx;
  }
  else {
    var tabSize=this.div.trough.offsetWidth*sizePercent;
    if (tabSize<this.SLIDER_SPAN) tabSize=this.SLIDER_SPAN;
    this.div.tab.style.width=tabSize;
    this.div.tabFill.style.width=tabSize-8;
    this.div.tabRight.style.left=tabSize-4;
    this.div.tabGrip.style.left=(tabSize-this.SLIDER_SPAN)/2;
    var homePx = homePercent*(this.div.trough.offsetWidth-tabSize);
    homePx+=this.SLIDER_SPAN;
    this.div.tab.style.left=homePx;

  }  
}
// Scrollbar API

ZWL.Scrollbar.prototype.resize=function(newW, newH) {
  ZLM.setSize(this.div,newW,newH);
  // enforce base constriants 
  if (this.vert) {
     if (newW>this.SLIDER_SPAN) var offset=(newW-this.SLIDER_SPAN)/2;
     else var offset=0;
     this.div.body.style.left=offset;
     this.div.downButton.style.top=newH-this.div.downButton.offsetHeight;
     ZLM.setSize(this.div.trough,this.SLIDER_SPAN-2,newH-2*this.SLIDER_SPAN-2);
  }
  else {
     if (newH>this.SLIDER_SPAN) var offset=(newH-this.SLIDER_SPAN)/2;
     else var offset=0;
     this.div.body.style.top=offset;
     this.div.downButton.style.left=newW-this.div.downButton.offsetWidth;
     ZLM.setSize(this.div.trough,newW-2*this.SLIDER_SPAN-2,this.SLIDER_SPAN-2);
  }
  this.snapToValue();
}

ZWL.Scrollbar.prototype.setViewSize=function(newMin) {
  this.extent=newMin;
  this.snapToValue();
}

ZWL.Scrollbar.prototype.setPageSize=function(newMax) {
  this.maxValue=newMax;
  this.snapToValue();
}

ZWL.Scrollbar.prototype.setViewHome=function(newValue) {
  if (newValue<0) newValue=0;
  if (newValue>this.maxValue) newValue=this.maxValue;
  this.value=newValue;
  this.snapToValue();
}

ZWL.Scrollbar.prototype.getValue=function() {
  return(this.value);
}

//####################################################

ZWL.Slider =function(div) {
   this.SLIDER_SPAN=19;
   this.SLIDER_ICON_LEFT="hSliderTabLeft.png";
   this.SLIDER_ICON_RIGHT="hSliderTabRight.png";
   this.SLIDER_ICON_H_FILL="hSliderTabFill.png";
   this.SLIDER_ICON_H_GRIP="hSliderTabGrip.png";
   this.SLIDER_ICON_TOP="vSliderTabTop.png";
   this.SLIDER_ICON_BOTTOM="vSliderTabBottom.png";
   this.SLIDER_ICON_V_FILL="vSliderTabFill.png";
   this.SLIDER_ICON_V_GRIP="vSliderTabGrip.png";

   this.className="ZEN_SLIDER";
   this.div = div;
   div.controller = this;

   this.minValue = div.getAttribute("minValue");
   if (this.minValue==null || this.minValue=="") this.minValue=0;
   this.maxValue = div.getAttribute("maxValue");
   if (this.maxValue==null || this.maxValue=="") this.maxValue=100;
   this.value = div.getAttribute("value");
   if (this.value==null||this.value=="") this.value=this.minValue;
   if (div.getAttribute("orientation")=="vertical") this.vert=1;
   else this.vert=0;
   this.createAvatar();
}

ZWL.Slider.prototype.createAvatar=function() {
   var w = this.div.clientWidth;
   var h = this.div.clientHeight;
   if (this.vert) {
     if (w>this.SLIDER_SPAN) var offset=(w-this.SLIDER_SPAN)/2;
     else var offset=0;
     this.div.body=ZLM.simulateTag("div style='width:"+this.SLIDER_SPAN+"; height:100%; position:relative; top:0; left:"+offset+";'");
     if (ZLM.isIE) this.div.body.style.fontSize="0pt";
     this.div.appendChild(this.div.body);

     this.div.trough=ZLM.simulateTag("div style='width:1; height:"+(h-10)+"; border:3px inset gray; background:#505050; position:absolute; top:2; left:7;'");
     this.div.body.appendChild(this.div.trough);
     this.div.tab=ZLM.simulateTag("div class='sliderTab'; style='width:"+this.SLIDER_SPAN+"; height:"+this.SLIDER_SPAN+"; position:absolute; top:0; left:0; cursor:n-resize;' onmousedown='ZLM.drag(this,event);'");
     this.div.tab.baseObj=this;
     this.div.body.appendChild(this.div.tab);
     var tabTop = ZLM.simulateTag("div style='width:19; height:4; position:absolute; top:0; left:0; background-image:url("+this.SLIDER_ICON_TOP+");'");
     var tabFill = ZLM.simulateTag("div style='width:19; height:11; position:absolute; top:4; left:0; background-image:url("+this.SLIDER_ICON_V_FILL+"); background-repeat:repeat-y;'");
     var tabBottom = ZLM.simulateTag("div style='width:19; height:4; position:absolute; top:15; left:0; background-image:url("+this.SLIDER_ICON_BOTTOM+");'");
     var tabGrip = ZLM.simulateTag("div style='width:19; height:19; position:absolute; top:0; left:0; z-index:1; background-image:url("+this.SLIDER_ICON_V_GRIP+");'");
     this.div.tab.appendChild(tabTop);
     this.div.tab.appendChild(tabFill);
     this.div.tab.appendChild(tabBottom);
     this.div.tab.appendChild(tabGrip);
   }
   else {
     if (h>this.SLIDER_SPAN) var offset=(h-this.SLIDER_SPAN)/2;
     else var offset=0;
     this.div.body=ZLM.simulateTag("div style='width:100%; height:"+this.SLIDER_SPAN+"; position:relative; top:"+offset+"; left:0;'");
     if (ZLM.isIE) this.div.body.style.fontSize="0pt";
     this.div.appendChild(this.div.body);

     this.div.trough=ZLM.simulateTag("div style='width:"+(w-10)+"; height:1; border:3px inset gray; background:#505050; position:absolute; top:7; left:2;'");
     this.div.body.appendChild(this.div.trough);
     this.div.tab=ZLM.simulateTag("div class='sliderTab'; style='width:"+this.SLIDER_SPAN+"; height:"+this.SLIDER_SPAN+"; position:absolute; top:0; left:0; cursor:e-resize;' onmousedown='ZLM.drag(this,event);'");
     this.div.tab.baseObj=this;
     this.div.body.appendChild(this.div.tab);
     var tabLeft = ZLM.simulateTag("div style='width:4; height:19; position:absolute; top:0; left:0; background-image:url("+this.SLIDER_ICON_LEFT+");'");
     var tabFill = ZLM.simulateTag("div style='width:11; height:19; position:absolute; top:0; left:4; background-image:url("+this.SLIDER_ICON_H_FILL+"); background-repeat:repeat-x;'");
     var tabRight = ZLM.simulateTag("div style='width:4; height:19; position:absolute; top:0; left:15; background-image:url("+this.SLIDER_ICON_RIGHT+");'");
     var tabGrip = ZLM.simulateTag("div style='width:19; height:19; position:absolute; top:0; left:0; background-image:url("+this.SLIDER_ICON_H_GRIP+");'");
     this.div.tab.appendChild(tabLeft);
     this.div.tab.appendChild(tabFill);
     this.div.tab.appendChild(tabRight);
     this.div.tab.appendChild(tabGrip);
   }
   ZLM.registerDragItem(this.div.tab,ZWL.sliderMgr);
   this.snapToValue();
}

ZWL.Slider.prototype.getMinPxPosition=function(tab) {
  return(0);
}

ZWL.Slider.prototype.getMaxPxPosition=function(tab) {
  if (this.vert) return(this.div.clientHeight-this.div.tab.offsetHeight);
  return(this.div.clientWidth-this.div.tab.offsetWidth);
}

ZWL.Slider.prototype.getStaticPxInset=function(tab) {
  return(0);
}

ZWL.Slider.prototype.updateValue=function() {
  if (this.vert) {
    var offset = this.div.tab.offsetTop;
    var span = this.div.clientHeight-this.div.tab.clientHeight;
  }
  else {
    var offset = this.div.tab.offsetLeft;
    var span = this.div.clientWidth-this.div.tab.clientWidth;
  }
  var range = this.maxValue-this.minValue;
  this.value=Math.round(range*(offset/span))+this.minValue;
}

ZWL.Slider.prototype.snapToValue=function() {
  var percentage = (this.value-this.minValue)/(this.maxValue-this.minValue);
  if (this.vert) {
    this.div.tab.style.top=percentage*(this.div.clientHeight-this.div.tab.offsetHeight);
  }
  else {
    this.div.tab.style.left=percentage*(this.div.clientWidth-this.div.tab.offsetWidth);
  }  
}

// SLIDER API

ZWL.Slider.prototype.resize=function(newW, newH) {
  this.div.parentNode.style.width=newW;
  this.div.parentNode.style.height=newH;
  // enforce base constriants 
  if (this.vert) {
     if (newW>this.SLIDER_SPAN) var offset=(newW-this.SLIDER_SPAN)/2;
     else var offset=0;
     this.div.body.style.left=offset;
     this.div.trough.style.height=(newH-10);
  }
  else {
     if (newH>this.SLIDER_SPAN) var offset=(newH-this.SLIDER_SPAN)/2;
     else var offset=0;
     this.div.body.style.top=offset;
     this.div.trough.style.width=(newW-10);
  }
  this.snapToValue();
}

ZWL.Slider.prototype.setMinValue=function(newMin) {
  this.minValue=newMin;
  if (newMin>this.maxValue)this.maxValue=newMin;
  this.snapToValue();
}

ZWL.Slider.prototype.setMaxValue=function(newMax) {
  this.maxValue=newMax;
  if (newMax<this.minValue) this.minValue=newMax;
  this.snapToValue();
}

ZWL.Slider.prototype.setValue=function(newValue) {
  if (newValue<this.minValue) newValue=this.minValue;
  if (newValue>this.maxValue) newValue=this.maxValue;
  this.value=newValue;
  this.snapToValue();
}

ZWL.Slider.prototype.getValue=function() {
  return(this.value);
}
//################################################################

ZWL.RangeSlider =function(div) {
   this.SLIDER_SPAN=19;
   this.SLIDER_TAB_SPAN=8;
   this.SLIDER_ICON_LEFT="hSliderTabLeft.png";
   this.SLIDER_ICON_RIGHT="hSliderTabRight.png";
   this.SLIDER_ICON_H_GRIP="hSliderTabGrip.png";
   this.SLIDER_ICON_TOP="vSliderTabTop.png";
   this.SLIDER_ICON_BOTTOM="vSliderTabBottom.png";
   this.SLIDER_ICON_V_GRIP="vSliderTabGrip.png";

   this.className="ZEN_RANGE_SLIDER";
   this.div = div;
   div.controller = this;

   this.minValue = div.getAttribute("minValue");
   if (this.minValue==null || this.minValue=="") this.minValue=0;
   this.maxValue = div.getAttribute("maxValue");
   if (this.maxValue==null || this.maxValue=="") this.maxValue=100;
   this.value = div.getAttribute("rangeMin");
   if (this.rangeMin==null||this.rangeMax=="") this.rangeMin=this.minValue;
   this.value = div.getAttribute("rangeMax");
   if (this.rangeMax==null||this.rangeMax=="") this.rangeMax=this.minValue;

   if (div.getAttribute("orientation")=="vertical") this.vert=1;
   else this.vert=0;
   this.createAvatar();
}

ZWL.RangeSlider.prototype.createAvatar=function() {
   var w = this.div.clientWidth;
   var h = this.div.clientHeight;
   if (this.vert) {
     if (w>this.SLIDER_SPAN) var offset=(w-this.SLIDER_SPAN)/2;
     else var offset=0;
     this.div.body=ZLM.simulateTag("div style='width:"+this.SLIDER_SPAN+"; height:100%; position:relative; top:0; left:"+offset+";'");
     if (ZLM.isIE) this.div.body.style.fontSize="0pt";
     this.div.appendChild(this.div.body);

     this.div.trough=ZLM.simulateTag("div style='width:1; height:"+(h-10)+"; border:3px inset gray; background:#505050; position:absolute; top:2; left:7;'");
     this.div.body.appendChild(this.div.trough);

     this.div.minTab=ZLM.simulateTag("div class='sliderTab'; style='width:"+this.SLIDER_SPAN+"; height:"+this.SLIDER_TAB_SPAN+"; position:absolute; top:0; left:0; cursor:n-resize;' onmousedown='ZLM.drag(this,event);'");
     this.div.minTab.baseObj=this;
     this.div.body.appendChild(this.div.minTab);
     var tabTop = ZLM.simulateTag("div style='width:19; height:4; position:absolute; top:0; left:0; background-image:url("+this.SLIDER_ICON_TOP+");'");
     var tabBottom = ZLM.simulateTag("div style='width:19; height:4; position:absolute; top:4; left:0; background-image:url("+this.SLIDER_ICON_BOTTOM+");'");
     this.div.minTab.appendChild(tabTop);
     this.div.minTab.appendChild(tabBottom);

     this.div.maxTab=ZLM.simulateTag("div class='sliderTab' style='width:"+this.SLIDER_SPAN+"; height:"+this.SLIDER_TAB_SPAN+"; position:absolute; top:0; left:0; cursor:n-resize;' onmousedown='ZLM.drag(this,event);'");
     this.div.maxTab.baseObj=this;
     this.div.body.appendChild(this.div.maxTab);
     var tabTop = ZLM.simulateTag("div style='width:19; height:4; position:absolute; top:0; left:0; background-image:url("+this.SLIDER_ICON_TOP+");'");
     var tabBottom = ZLM.simulateTag("div style='width:19; height:4; position:absolute; top:4; left:0; background-image:url("+this.SLIDER_ICON_BOTTOM+");'");
     this.div.maxTab.appendChild(tabTop);
     this.div.maxTab.appendChild(tabBottom);
     
     this.div.bodyTab=ZLM.simulateTag("div class='sliderTab' style='width:11; position:absolute; top:0; left:5; border:1px solid gray;' onmousedown='ZLM.drag(this,event);'");
     this.div.bodyTab.baseObj=this;
     this.div.bodyTabGrip= ZLM.simulateTag("div style='width:19; height:19; position:absolute; top:0; left:-4; z-index:1; display:none; background-image:url("+this.SLIDER_ICON_V_GRIP+");'");
     this.div.appendChild(this.div.bodyTab);
     this.div.bodyTab.appendChild(this.div.bodyTabGrip);

   }
   else {
     if (h>this.SLIDER_SPAN) var offset=(h-this.SLIDER_SPAN)/2;
     else var offset=0;
     this.div.body=ZLM.simulateTag("div style='width:100%; height:"+this.SLIDER_SPAN+"; position:relative; top:"+offset+"; left:0;'");
     if (ZLM.isIE) this.div.body.style.fontSize="0pt";
     this.div.appendChild(this.div.body);

     this.div.trough=ZLM.simulateTag("div style='width:"+(w-10)+"; height:1; border:3px inset gray; background:#505050; position:absolute; top:7; left:2;'");
     this.div.body.appendChild(this.div.trough);

     this.div.minTab=ZLM.simulateTag("div class='sliderTab'; style='width:"+this.SLIDER_TAB_SPAN+"; height:"+this.SLIDER_SPAN+"; position:absolute; top:0; left:0; cursor:e-resize;' onmousedown='ZLM.drag(this,event);'");
     this.div.minTab.baseObj=this;
     this.div.body.appendChild(this.div.minTab);
     var tabTop = ZLM.simulateTag("div style='width:4; height:19; position:absolute; top:0; left:0; background-image:url("+this.SLIDER_ICON_LEFT+");'");
     var tabBottom = ZLM.simulateTag("div style='width:4; height:19; position:absolute; top:0; left:4; background-image:url("+this.SLIDER_ICON_RIGHT+");'");
     this.div.minTab.appendChild(tabTop);
     this.div.minTab.appendChild(tabBottom);

     this.div.maxTab=ZLM.simulateTag("div class='sliderTab' style='width:"+this.SLIDER_TAB_SPAN+"; height:"+this.SLIDER_SPAN+"; position:absolute; top:0; left:0; cursor:e-resize;' onmousedown='ZLM.drag(this,event);'");
     this.div.maxTab.baseObj=this;
     this.div.body.appendChild(this.div.maxTab);
     var tabTop = ZLM.simulateTag("div style='width:4; height:19; position:absolute; top:0; left:0; background-image:url("+this.SLIDER_ICON_LEFT+");'");
     var tabBottom = ZLM.simulateTag("div style='width:4; height:19; position:absolute; top:0; left:4; background-image:url("+this.SLIDER_ICON_RIGHT+");'");
     this.div.maxTab.appendChild(tabTop);
     this.div.maxTab.appendChild(tabBottom);
     
     this.div.bodyTab=ZLM.simulateTag("div class='sliderTab' style='height:11; position:absolute; top:5; left:0; border:1px solid gray;' onmousedown='ZLM.drag(this,event);'");
     this.div.bodyTab.baseObj=this;
     this.div.bodyTabGrip= ZLM.simulateTag("div style='width:19; height:19; position:absolute; top:-4; left:0; z-index:1; display:none; background-image:url("+this.SLIDER_ICON_H_GRIP+");'");
     this.div.appendChild(this.div.bodyTab);
     this.div.bodyTab.appendChild(this.div.bodyTabGrip);

   }
   ZLM.registerDragItem(this.div.minTab,ZWL.sliderMgr);
   ZLM.registerDragItem(this.div.maxTab,ZWL.sliderMgr);
   ZLM.registerDragItem(this.div.bodyTab,ZWL.sliderMgr);
   this.snapToValue();
}

ZWL.RangeSlider.prototype.getMinPxPosition=function(tab) {
  if (tab==this.div.minTab) return(0);
  if (this.vert) return(this.div.minTab.offsetHeight);
  return(this.div.minTab.offsetWidth);
}

ZWL.RangeSlider.prototype.getMaxPxPosition=function(tab) {
  if (this.vert) {
    if (tab==this.div.minTab) return(this.div.clientHeight-this.div.minTab.offsetHeight-this.div.maxTab.offsetHeight);
    if (tab==this.div.bodyTab) return(this.div.clientHeight-this.div.maxTab.offsetHeight-this.div.bodyTab.offsetHeight);
    return(this.div.clientHeight-this.div.maxTab.offsetHeight);
  }
  if (tab==this.div.minTab) return(this.div.clientWidth-this.div.minTab.offsetWidth-this.div.maxTab.offsetWidth);
  if (tab==this.div.bodyTab) return(this.div.clientWidth-this.div.maxTab.offsetWidth-this.div.bodyTab.offsetWidth);
  return(this.div.clientWidth-this.div.maxTab.offsetWidth);
}

ZWL.RangeSlider.prototype.getStaticPxInset=function(tab) {
  if (tab==this.div.bodyTab) return(5);
  return(0);
}

ZWL.RangeSlider.prototype.resizeRange=function() {
  if (this.vert) {
    this.div.bodyTab.style.top=this.div.minTab.offsetTop+this.div.minTab.offsetHeight;
    var h =this.div.maxTab.offsetTop-this.div.minTab.offsetHeight-this.div.minTab.offsetTop-1;
    if (h<=0) {
      this.div.bodyTab.style.display="none";
    }
    else {
//ZLM.cerr(h+" v. "+this.SLIDER_SPAN+"-"+this.div.minTab.offsetHeight);
      this.div.bodyTab.style.height=h;
      this.div.bodyTab.style.display="block";
    }
    if (h<this.SLIDER_SPAN-this.div.minTab.offsetHeight) {
//ZLM.cerr("Too short");
      this.div.bodyTabGrip.style.display="none";
    }
    else {
      var gp=h/2-this.SLIDER_SPAN/2+1;
      this.div.bodyTabGrip.style.display="block";
      this.div.bodyTabGrip.style.top=gp;     
    }
  }
  else {
    this.div.bodyTab.style.left=this.div.minTab.offsetLeft+this.div.minTab.offsetWidth;
    var w =this.div.maxTab.offsetLeft-this.div.minTab.offsetWidth-this.div.minTab.offsetLeft-1;
    if (w<=0) {
      this.div.bodyTab.style.display="none";
    }
    else {
      this.div.bodyTab.style.width=w;
      this.div.bodyTab.style.display="block";
    }
    if (w<this.SLIDER_SPAN-this.div.minTab.offsetWidth) {
      this.div.bodyTabGrip.style.display="none";
    }
    else {
      var gp=w/2-this.SLIDER_SPAN/2+1;
      this.div.bodyTabGrip.style.display="block";
      this.div.bodyTabGrip.style.left=gp;     
    }
  } 
}

ZWL.RangeSlider.prototype.updateRange=function(tab) {
//ZLM.cerr("end of drag");
  //update range bounds and visual indicators based on the graphical motion of the given tab
  var span=this.getMaxPxPosition(tab);
  if (tab==this.div.minTab) {
    if (this.vert) {
      var offset = this.div.minTab.offsetTop;
      if (offset+this.div.minTab.offsetHeight>this.div.maxTab.offsetTop) {
        this.div.maxTab.style.top=offset+this.div.minTab.offsetHeight;
        this.updateRange(this.div.maxTab);
      }
    }
    else {
      var offset = this.div.minTab.offsetLeft;
      if (offset+this.div.minTab.offsetWidth>this.div.maxTab.offsetLeft) {
        this.div.maxTab.style.left=offset+this.div.minTab.offsetWidth;
        this.updateRange(this.div.maxTab);
      }
    }
    var range = this.maxValue-this.minValue;
    this.rangeMin=Math.round(range*(offset/span))+this.minValue;
  }
  if (tab==this.div.maxTab) {
    if (this.vert) {
      var offset = this.div.maxTab.offsetTop;
      if (offset<this.div.minTab.offsetTop+this.div.minTab.offsetHeight) {
        this.div.minTab.style.top=offset-this.div.minTab.offsetHeight;
        this.updateRange(this.div.minTab);
      }
    }
    else {
      var offset = this.div.maxTab.offsetLeft;
      if (offset<this.div.minTab.offsetLeft+this.div.minTab.offsetWidth) {
        this.div.minTab.style.left=offset-this.div.minTab.offsetWidth;
        this.updateRange(this.div.minTab);
      }
    }
    var range = this.maxValue-this.minValue;
    this.rangeMax=Math.round(range*(offset/span))+this.minValue;
  }

  if (tab==this.div.bodyTab) {
    if (this.vert) {
      var offset=this.div.bodyTab.offsetTop;
      var oMn = offset-this.div.minTab.offsetHeight;
      var oMx = offset+this.div.bodyTab.offsetHeight-1;
      this.div.minTab.style.top=oMn;
      this.div.maxTab.style.top=oMx;
    }
    else {
      var offset=this.div.bodyTab.offsetLeft;
      var oMn = offset-this.div.minTab.offsetWidth;
      var oMx = offset+this.div.bodyTab.offsetWidth-1;
      this.div.minTab.style.left=oMn;
      this.div.maxTab.style.left=oMx;
    }
    var range = this.maxValue-this.minValue;
    var rangeSpan = this.rangeMax-this.rangeMin;
    this.rangeMin=Math.round(range*(oMn/span))+this.minValue;
    if (this.rangeMin+rangeSpan>this.maxValue) this.rangeMin=this.maxValue-rangeSpan;
    this.rangeMax=rangeSpan+this.rangeMin;
  }
  else this.resizeRange();
}

ZWL.RangeSlider.prototype.snapToValue=function() {
//ZLM.cerr("Snap to :"+this.rangeMin+" and "+this.rangeMax+" within "+this.minValue+" and "+this.maxValue);
  var percentage = (this.rangeMin-this.minValue)/(this.maxValue-this.minValue);
  if (this.vert) {
    this.div.minTab.style.top=percentage*(this.div.clientHeight-this.div.minTab.offsetHeight-this.div.maxTab.offsetHeight);
  }
  else {
    this.div.minTab.style.left=percentage*(this.div.clientWidth-this.div.minTab.offsetWidth-this.div.maxTab.offsetWidth);
  }  

  var percentage = (this.rangeMax-this.minValue)/(this.maxValue-this.minValue);
  if (this.vert) {
    this.div.maxTab.style.top=percentage*(this.div.clientHeight-this.div.minTab.offsetHeight-this.div.maxTab.offsetHeight)+this.div.minTab.offsetHeight;
  }
  else {
    this.div.maxTab.style.left=percentage*(this.div.clientWidth-this.div.minTab.offsetWidth-this.div.maxTab.offsetWidth)+this.div.minTab.offsetWidth;
  } 
  this.resizeRange(); 
}

//#########################
// RANGE SLIDER API

ZWL.RangeSlider.prototype.resize=function(newW, newH) {
  this.div.parentNode.style.width=newW;
  this.div.parentNode.style.height=newH;
  // enforce base constriants 
  if (this.vert) {
     if (newW>this.SLIDER_SPAN) var offset=(newW-this.SLIDER_SPAN)/2;
     else var offset=0;
     this.div.body.style.left=offset;
     this.div.trough.style.height=(newH-10);
  }
  else {
     if (newH>this.SLIDER_SPAN) var offset=(newH-this.SLIDER_SPAN)/2;
     else var offset=0;
     this.div.body.style.top=offset;
     this.div.trough.style.width=(newW-10);
  }
  this.snapToValue();
}

ZWL.RangeSlider.prototype.setMinValue=function(newMin) {
  this.minValue=newMin;
  if (newMin>this.maxValue)this.maxValue=newMin;
  this.snapToValue();
}

ZWL.RangeSlider.prototype.setMaxValue=function(newMax) {
  this.maxValue=newMax;
  if (newMax<this.minValue) this.minValue=newMax;
  this.snapToValue();
}

ZWL.RangeSlider.prototype.setRangeMin=function(newValue) {
  if (newValue<this.minValue) newValue=this.minValue;
  if (newValue>this.maxValue) newValue=this.maxValue;
  this.rangeMin=newValue;
  this.snapToValue();
}

ZWL.RangeSlider.prototype.setRangeMax=function(newValue) {
  if (newValue<this.minValue) newValue=this.minValue;
  if (newValue>this.maxValue) newValue=this.maxValue;
  this.rangeMax=newValue;
  this.snapToValue();
}

ZWL.RangeSlider.prototype.getRangeMin=function() {
  return(this.rangeMin);
}

ZWL.RangeSlider.prototype.getRangeMax=function() {
  return(this.rangeMax);
}
//################################################################

ZWL.initScrollAreas = function() {
  var s=ZLM.getElementsByClassPrefix("scrolledArea",document.body);
  for (var i=0;i<s.length;i++) {
    if (!ZWL.isReady(s[i])) {
      var sa=new ZWL.ScrolledArea(s[i]);
      ZWL.markAsReady(s[i]);
    }
  }
}

ZWL.ScrolledArea=function(div) {
  // A scrolled area is a manually controlled window onto a virtual space
  // defined by:
  //   resize: true/false (outer window can be resized)
  //   vPolicy: always|auto|never (policy for showing vertical scrollbars)
  //   hPolicy: always|auto|never (policy for showing horizontal scrollbars)
  //   pageWidth: width of virtual space (in generic units)
  //   pageHeight: height of virtual spase (in generic units)
  //   windowWidth: width of viewing window (in generic units)
  //   windowHeight: height of viewing window (in generic units)
  //   unitScrollDelay: scrolling speed for buttons
  //   pageScrollDelay: scrolling speed for page flips
  //
  // callbacks:
  //   onUnitUp
  //   onUnitDown
  //   onUnitLeft
  //   onUnitRight
  //   onPageUp
  //   onPageDown
  //   onPageRight
  //   onPageLeft
  //   onHScroll
  //   onVScroll
  //   onResize
  //   onShowScrollbar
  //   onHideScrollbar
  //
  // In the base HTML specification a div of class scrolledArea has one or more children
  // that define the contents of the virtual space.  OnLoadPage takes these children and 
  // reparents them to be children of a workArea div that is a new child of the base div.
  // Other new children include the matteArea, hScroll, vScroll and resizeDiv.
  this.SB_SIZE=21; // base thickness of scrollbar elements
  this.div = div;
  this.setAttributes(div);  
  this.createAvatar();   
}

ZWL.ScrolledArea.prototype.setAttributes=function(div) {
  this.resizable=ZWL.initAttribute(div,"resize",false);
  this.vPolicy=ZWL.initAttribute(div,"vPolicy","auto");
  this.hPolicy=ZWL.initAttribute(div,"hPolicy","auto");
  this.pageWidth=ZWL.initAttribute(div,"pageWidth",div.offsetWidth);
  this.pageHeight=ZWL.initAttribute(div,"pageHeight",div.offsetWidth);
  this.windowWidth=ZWL.initAttribute(div,"windowWidth",div.offsetWidth);
  this.windowHeight=ZWL.initAttribute(div,"windowHeight",div.offsetWidth);
  this.usDelay=ZWL.initAttribute(div,"unitScrollDelay",100);
  this.psDelay=ZWL.initAttribute(div,"pageScrollDelay",250);
  this.onUnitUpCB=ZWL.initAttribute(div,"onUnitUp",null);
  this.onUnitDownCB=ZWL.initAttribute(div,"onUnitDown",null);
  this.onUnitLeftCB=ZWL.initAttribute(div,"onUnitLeft",null);
  this.onUnitRightCB=ZWL.initAttribute(div,"onUnitRight",null);
  this.onPageUpCB=ZWL.initAttribute(div,"onPageUp",null);
  this.onPageDownCB=ZWL.initAttribute(div,"onPageDown",null);
  this.onPageLeftCB=ZWL.initAttribute(div,"onPageLeft",null);
  this.onPageRightCB=ZWL.initAttribute(div,"onPageRight",null);
  this.onHScrollCB=ZWL.initAttribute(div,"onHScroll",null);
  this.onVScrollCB=ZWL.initAttribute(div,"onVScroll",null);
  this.onResizeCB=ZWL.initAttribute(div,"onResize",null);
  this.onShowScrollbarCB=ZWL.initAttribute(div,"onShowScrollbar",null);
  this.onHideScrollbarCB=ZWL.initAttribute(div,"onHideScrollbar",null);
}

ZWL.ScrolledArea.prototype.createAvatar=function() {
  var w = this.div.clientWidth;
  if (w<3*this.SB_SIZE) {
    w=3*this.SB_SIZE;
    this.div.style.width=w;
  }
  var h = this.div.clientHeight;
  if (h<3*this.SB_SIZE) {
    h=3*this.SB_SIZE;
    this.div.style.height=h;
  }
  var wW=w-this.SB_SIZE;
  var wH=h-this.SB_SIZE;
  this.div.body=ZLM.simulateTag("div style='width:100%; height:100%; position:relative; top:0; left:0; overflow:hidden;'");
  this.div.port=ZLM.simulateTag("div style='position:absolute; top:0; left:0; overflow:hidden;'");
  this.div.body.appendChild(this.div.port);
  this.div.matte=ZLM.simulateTag("div class='matteArea' style='position:absolute; top:0; left:0; width:100%; height:100%; z-index:-10;'");
  this.div.port.appendChild(this.div.matte);
  this.div.workArea=ZLM.simulateTag("div style='position:relative; top:0; left:0;'");
  this.div.port.appendChild(this.div.workArea);
  this.div.hScroll=ZLM.simulateTag("div class='scrollbar' style='width:"+wW+"; height:"+this.SB_SIZE+"; position:absolute; top:"+wH+"; left:0;'");
  this.div.body.appendChild(this.div.hScroll);
  this.div.vScroll=ZLM.simulateTag("div class='scrollbar' orientation='vertical' style='width:"+this.SB_SIZE+"; height:"+wH+"; position:absolute; top:0; left:"+wW+";'");
  this.div.body.appendChild(this.div.vScroll);

this.div.workArea.style.width=300;
this.div.workArea.style.height=300;
this.div.workArea.style.background="green";  

  this.div.appendChild(this.div.body); 
  this.hsControl=new ZWL.Scrollbar(this.div.hScroll);
  ZWL.markAsReady(this.div.hScroll);
  this.vsControl=new ZWL.Scrollbar(this.div.vScroll);
  ZWL.markAsReady(this.div.vScroll);

ZLM.cerr("real width: "+this.div.workArea.clientWidth);   
ZLM.cerr("real height: "+this.div.workArea.clientHeight);   
this.updateGeometry();
}

ZWL.ScrolledArea.prototype.updateGeometry=function() {
  var sbSize=this.div.vScroll.offsetWidth; // size taken up by scrollbar
  var w = ZLM.getClientWidth(this.div);
  var h = ZLM.getClientHeight(this.div);
  var wW=w-sbSize;
  var wH=h-sbSize;
  ZLM.setSize(this.div.port,wW,wH);
  ZLM.setPosition(this.div.vScroll,wW,0);
  ZLM.setPosition(this.div.hScroll,0,wH);
  this.hsControl.resize(wW-2,this.SB_SIZE);
  this.hsControl.setViewSize(wW);
  this.hsControl.setPageSize(this.div.workArea.offsetWidth);
  this.vsControl.resize(this.SB_SIZE,wH-2);
  this.vsControl.setViewSize(wH);
  this.vsControl.setPageSize(this.div.workArea.offsetHeight);
  

//  this.div.port.style.width=wW;
//  this.div.port.style.height=wH;
//  this.div.vScroll.style.height=wH-2;
//  this.div.hScroll.style.width=wW-2;      
}

//################################################################

function newWidgetInit() {
  if (!ZWL.sliderMgr) ZWL.sliderMgr=new ZWL.SliderManager();
  ZWL.isIE = ZLM.isInternetExplorer();
  ZWL.initGrids();
  ZWL.initScrollAreas();
  ZWL.initSliders();
}
