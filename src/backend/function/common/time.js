const {DateTime, FixedOffsetZone, IANAZone} = require('luxon')

const format = 'EEE MMM dd yyyy TT';

// example: Thu Mar 10 2022 12:10:23 GMT-0500 (Eastern Standard Time) is passed into the server by new Date().toString() on frontend
const fromJSDatetimeString = (text,timezone) => {
	let options;
	//IANA timezone passed in on login
	if(timezone){
		options={zone:new IANAZone(timezone)}
	//otherwise parse out the offset in minutes	
	}else{
		// example: Thu Mar 10 2022 12:10:23 GMT-0500 (Eastern Standard Time)
		// splits into ['Thu', 'Mar', '10', '2022', '12:10:23', 'GMT-0500'] (limited to 6 splits)
		let timezonetext = text.split(' ',6)[5]//get the timezone info at end of array 'GMT-0500'
		let offset = parseInt(timezonetext.substring(5,6)) * 60//convert offset '05' hour to mins
		if(timezonetext.substring(3,4) === '-'){//handle negative offsets
			offset = offset * -1;
		}
		options={zone:new FixedOffsetZone(offset)}
	}
	let timeStr = text.split(' ',5).join(' ');//get just the first 5 splits to be parsed with format
	return DateTime.fromFormat(timeStr,format,options).toUTC()
};

//text contains a datetime string, timezone is an IANA timezone or null/undefined
let parseDateTime = (text,timezone) => {
        //console.log("'"+text+"'")
		
		if(timezone){
			currentTime = DateTime.fromISO(text, { zone: timezone });
			if(currentTime.invalid){
				currentTime = fromJSDatetimeString(text,timezone);
			}
		}else{
			currentTime = fromJSDatetimeString(text,null);
		}
		return currentTime;
}
exports.parseDateTime = parseDateTime;