import countries from 'country-list';

export function getCountryName(countryCode) {
        const countryName = countries.getName(countryCode);
        return countryName.replace(/\s*\(.*?\)\s*/g, '').trim();
    }

export function cleanGender(gender){
        return gender[0];
    }

export function calculateAge(dob){
        const today = new Date();
        const birthDate = new Date(dob);

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
    
        return age;
    }

export function calculateLastLogin(lastLoginString){
        const today = new Date();
        const utcNow = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(),
        today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds());

        let normalizedDateString = lastLoginString; //Normalize to force UTC time
        if (!normalizedDateString.endsWith('Z')) {
            normalizedDateString += 'Z';
        }

        const lastLog = new Date(normalizedDateString).getTime();

        const secondsAgo = Math.floor((utcNow - lastLog) / 1000);

        if (secondsAgo < 60) return `Online`;
        
        const minutesAgo = Math.floor(secondsAgo/60);
        if (minutesAgo < 60) return `Last seen ${minutesAgo}m ago`;

        const hoursAgo = Math.floor(minutesAgo/60);
        if (hoursAgo < 24) return `Last seen ${hoursAgo}h ago`;
        
        const daysAgo = Math.floor(hoursAgo/24);
        if (daysAgo === 1) return "Last seen yesterday";
        if (daysAgo < 7) return `Last seen ${daysAgo} days ago`;

        const weeksAgo = Math.floor(daysAgo/7);
        if (weeksAgo < 4) return `Last seen ${weeksAgo} weeks ago`;

        const monthsAgo = Math.floor(weeksAgo/4);
        if (monthsAgo < 12) return `Last seen ${monthsAgo} months ago`;

        const yearsAgo = Math.floor(monthsAgo/12);
        return `Last seen ${yearsAgo} years ago`;
    }