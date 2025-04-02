/*** Zen Module: HS_Test_UI ***/

self._zenClassIdx['http://www.intersystems.com/ihetest/Menu'] = 'HS_Test_UI_Menu';
self.HS_Test_UI_Menu = function(index,id) {
	if (index>=0) {HS_Test_UI_Menu__init(this,index,id);}
}

self.HS_Test_UI_Menu__init = function(o,index,id) {
	('undefined' == typeof _ZEN_Component_menuItem__init) ?zenMaster._ZEN_Component_menuItem__init(o,index,id):_ZEN_Component_menuItem__init(o,index,id);
	o.Selected = false;
	o.caption = '';
	o.disabled = false;
	o.help = '';
	o.image = '';
	o.imageHeight = '16';
	o.imageWidth = '16';
	o.link = '';
	o.linkResource = '';
	o.onclick = '';
	o.secureCallback = '';
	o.secureLink = '';
	o.target = '';
}
function HS_Test_UI_Menu_serialize(set,s)
{
	var o = this;s[0]='4231700972';s[1]=o.index;s[2]=o.id;s[3]=o.name;s[4]=set.addObject(o.parent,'parent');s[5]=set.addObject(o.composite,'composite');s[6]=(o.Selected?1:0);s[7]=o.align;s[8]=o.aux;s[9]=o.caption;s[10]=o.containerStyle;s[11]=(o.disabled?1:0);s[12]=(o.dragEnabled?1:0);s[13]=(o.dropEnabled?1:0);s[14]=(o.dynamic?1:0);s[15]=o.enclosingClass;s[16]=o.enclosingStyle;s[17]=o.error;s[18]=o.height;s[19]=o.help;s[20]=(o.hidden?1:0);s[21]=o.hint;s[22]=o.hintClass;s[23]=o.hintStyle;s[24]=o.image;s[25]=o.imageHeight;s[26]=o.imageWidth;s[27]=o.label;s[28]=o.labelClass;s[29]=o.labelDisabledClass;s[30]=o.labelStyle;s[31]=o.link;s[32]=o.linkResource;s[33]=o.onafterdrag;s[34]=o.onbeforedrag;s[35]=o.onclick;s[36]=o.ondrag;s[37]=o.ondrop;s[38]=o.onhide;s[39]=o.onrefresh;s[40]=o.onshow;s[41]=o.onupdate;s[42]=o.overlayMode;s[43]=o.renderFlag;s[44]=o.secureCallback;s[45]=o.secureLink;s[46]=(o.showLabel?1:0);s[47]=o.slice;s[48]=o.target;s[49]=o.title;s[50]=o.tuple;s[51]=o.valign;s[52]=(o.visible?1:0);s[53]=o.width;
}
function HS_Test_UI_Menu_getSettings(s)
{
	s['name'] = 'string';
	s['Selected'] = 'boolean';
	s['caption'] = 'caption';
	s['disabled'] = 'boolean';
	s['help'] = 'caption';
	s['image'] = 'uri';
	s['imageHeight'] = 'length';
	s['imageWidth'] = 'length';
	s['link'] = 'uri';
	s['linkResource'] = 'resource';
	s['onclick'] = 'eventHandler';
	s['secureCallback'] = 'string';
	s['secureLink'] = 'string';
	s['target'] = 'string';
	this.invokeSuper('getSettings',arguments);
}

self.HS_Test_UI_Menu_ReallyRefreshContents = function() {
	zenInstanceMethod(this,'ReallyRefreshContents','','',arguments);
}
self.HS_Test_UI_Menu__Loader = function() {
	zenLoadClass('_ZEN_Component_menuItem');
	HS_Test_UI_Menu.prototype = zenCreate('_ZEN_Component_menuItem',-1);
	var p = HS_Test_UI_Menu.prototype;
	if (null==p) {return;}
	p.constructor = HS_Test_UI_Menu;
	p.superClass = ('undefined' == typeof _ZEN_Component_menuItem) ? zenMaster._ZEN_Component_menuItem.prototype:_ZEN_Component_menuItem.prototype;
	p.__ZENcomponent = true;
	p._serverClass = 'HS.Test.UI.Menu';
	p._type = 'Menu';
	p.serialize = HS_Test_UI_Menu_serialize;
	p.getSettings = HS_Test_UI_Menu_getSettings;
	p.ReallyRefreshContents = HS_Test_UI_Menu_ReallyRefreshContents;
}
/* EOF */