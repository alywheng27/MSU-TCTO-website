export function getYear(date) {
    var year = date.substr(0, 4);
    
    return year;
}

export function getWordMonth(date) { 
    // 0000-00-00
    var year = date.substr(0, 4);
    var month = date.substr(5, 2);
    var day = date.substr(8, 2);

    if (month == '01'){
        month = 'January';
    }else if (month == '02'){
        month = 'February';
    }else if (month == '03'){
        month = 'March';
    }else if (month == '04'){
        month = 'April';
    }else if (month == '05'){
        month = 'May';
    }else if (month == '06'){
        month = 'June';
    }else if (month == '07'){
        month = 'July';
    }else if (month == '08'){
        month = 'August';
    }else if (month == '09'){
        month = 'September';
    }else if (month == '10'){
        month = 'October';
    }else if(month == '11'){
        month = 'November';
    }else if (month == '12'){
        month = 'December';
    }

    return month;
}

export function get3LettersMonth(date) { 
    // 0000-00-00
    var year = date.substr(0, 4);
    var month = date.substr(5, 2);
    var day = date.substr(8, 2);

    if (month == '01'){
        month = 'Jan';
    }else if (month == '02'){
        month = 'Feb';
    }else if (month == '03'){
        month = 'Mar';
    }else if (month == '04'){
        month = 'Apr';
    }else if (month == '05'){
        month = 'May';
    }else if (month == '06'){
        month = 'Jun';
    }else if (month == '07'){
        month = 'Jul';
    }else if (month == '08'){
        month = 'Aug';
    }else if (month == '09'){
        month = 'Sept';
    }else if (month == '10'){
        month = 'Oct';
    }else if(month == '11'){
        month = 'Nov';
    }else if (month == '12'){
        month = 'Dec';
    }

    return month;
}

export function getDay(date) {
    // 0000-00-00
    var year = date.substr(0, 4);
    var month = date.substr(5, 2);
    var day = date.substr(8, 2);

    if (day == '01'){
        day = '1';
    }else if (day == '02'){
        day = '2';
    }else if (day == '03'){
        day = '3';
    }else if (day == '04'){
        day = '4';
    }else if (day == '05'){
        day = '5';
    }else if (day == '06'){
        day = '6';
    }else if (day == '07'){
        day = '7';
    }else if (day == '08'){
        day = '8';
    }else if (day == '09'){
        day = '9'
    }

    return day;
}