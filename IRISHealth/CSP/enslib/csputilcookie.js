function cookieVal(cookieName,cookieString)
{
	var startLoc = cookieString.indexOf(cookieName);
	if (startLoc == -1) return("");  // No such cookie
	var sepLoc = cookieString.indexOf("=", startLoc);
	var endLoc = cookieString.indexOf(";", startLoc);
	if (endLoc == -1)  // Last one has no ";"
	  endLoc = cookieString.length;
   	return(cookieString.substring(sepLoc+1,endLoc));
}
