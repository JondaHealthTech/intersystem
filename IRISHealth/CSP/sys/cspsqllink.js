

// return total number of tables user selected
function checkTables()
{
	ismany = 0;
	var form = getForm();
	var len = form.Table.length;
	for (var i = 1; i < len; i++) {
		if (form.Table.options[i].selected == true) ++ismany;
	}
	return ismany
}
function getTableName()
{
	var schema = document.getElementById("Schema");
	schema = schema[schema.selectedIndex].value;
	var exttable;
	if (checkTables() > 1) {
		exttable = schema + "..."
	} else {
		var table = document.getElementById("Table");
		exttable = schema + '.';
		for (var i = 1; i < table.length; i++) {
			if (table.options[i].selected == true) {
				exttable = exttable + table[i].value;
				break;
			}
		}
		
	}
	return exttable
}

// initialize all text fields
function initext(form)
{
	var len = form.elements.length;
	for(var i=0; i<len; i++) {	
		if (form.elements[i].type == "text") {
			var name = form.elements[i].name;
			if ((name != "RemoteFileName") && (name != "SchemaFilter") && (name != "TableFilter")) {
			form.elements[i].value = "";
			}
		}
	}
}

// hasClass is the main function to build property list
// If no properties are selected then listinit is called in case class is changed 
function hasClass()
{
	var form = document.Content;
	var table = form.Table.options[form.Table.selectedIndex].value;
	
	if (table.length > 0) {
		var Prop = selProp();
		if (Prop == "") listinit();
	}	
}
// Return a list of properties selected
// check if selected box is empty, use it if not
// form.selList[0] is left empty with "_" on purpose.
function selProp()
{
    var form = document.Content;
	var len = form.selList.length;
	if (len > 1) {
		var props = form.selList[1].value;
		for (var i=2; i<len; i++) {
		  props = props + ", " + form.selList[i].value;
		}
	} else {
		props = ""
	}
	return props
}
// select or unselect all checkboxes matching the nameprefix
// Link Table: Readonly
// Data Migration: Definition and Data check boxes
function selDefAll(checkObj,nameprefix)
{
	var vchecked = checkObj.checked;
	var form = document.Content;
	var len = form.length;
	var prefixlen = nameprefix.length;
	for (var r=0; r<len; r++) {
		if (form[r].type == "checkbox") {
			var varname1 = form[r].name.substring(0,prefixlen)
			if (varname1 == nameprefix) {
				form[r].checked = vchecked;		
			}
		}
	}
}


// remove existing rows from SelAttr tablem before setting new values
function removeRows(propTable,beginRow)
{
  var len = propTable.rows.length;
  for (var r=beginRow; r<len; r++) {
  	propTable.deleteRow(beginRow);
  }
	
}
// check to see if at least one checkbox is checked
function boxChecked()
{
	var form = document.Content;
	var len = form.length;
	var nothingChecked = true;
	for (var r=0; r<len; r++) {
		if (form[r].type == "checkbox") {
			var varname1 = form[r].name.substring(0,4)
			if (varname1 == "copy" && form[r].checked == true) {
				nothingChecked = false;
				break;	
			}
		}
	}
	return nothingChecked
}

