const formatTimeAgo = (timestamp, language) => {
    const now = new Date();
    const pastTime = new Date(timestamp);
    const elapsed = now - pastTime;

    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (language === 'vi') {
        if (seconds < 60) {
            return `${seconds} giây trước`;
        } else if (minutes < 60) {
            return `${minutes} phút trước`;
        } else if (hours < 24) {
            return `${hours} giờ trước`;
        } else if (days < 7) {
            return `${days} ngày trước`;
        } else if (weeks < 4) {
            return `${weeks} tuần trước`;
        } else if (months < 12) {
            return `${months} tháng trước`;
        } else {
            return `${years} năm trước`;
        }
    } else { // Default to English
        if (seconds < 60) {
            return `${seconds} seconds ago`;
        } else if (minutes < 60) {
            return `${minutes} minutes ago`;
        } else if (hours < 24) {
            return `${hours} hours ago`;
        } else if (days < 7) {
            return `${days} days ago`;
        } else if (weeks < 4) {
            return `${weeks} weeks ago`;
        } else if (months < 12) {
            return `${months} months ago`;
        } else {
            return `${years} years ago`;
        }
    }
};

const formatDateTime = (timestamp, language) => {
    const date = new Date(timestamp);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    };

    let formattedDateTime = '';
    if (language === 'vi') {
        const vietnameseMonth = date.toLocaleDateString('vi', { month: 'long' });
        formattedDateTime = `${date.getDate()} ${vietnameseMonth}, ${date.getFullYear()} vào lúc ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
    } else {
        formattedDateTime = date.toLocaleDateString('en-US', options);
    }

    return formattedDateTime;
};

export { formatTimeAgo, formatDateTime }