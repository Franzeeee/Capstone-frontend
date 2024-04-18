export function validateName(name) {
    if (name.trim() === '') {
        return [false, ['Name is required']];
    } else {
        return [true, []];
    }
}

export function validateEmail(email) {
    if (email.trim() === '') {
        return [false, ['Email is required']];
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        return [false, ['Email is invalid']];
    } else {
        return [true, []];
    }
}

export function validatePhone(phone) {
    if (phone.trim() === '') {
        return [false, ['Phone number is required']];
    } else if (!/^\d{11}$/g.test(phone)) {
        return [false, ['Phone number must be 11 digits']];
    } else {
        return [true, []];
    }
}


export function validatePassword(password) {
    const errors = [];

    // Minimum length requirement
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    // Complexity requirements (at least one lowercase letter, one uppercase letter, and one digit)
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);

    if (!(hasLowerCase && hasUpperCase && hasDigit)) {
        errors.push('Password must include at least one lowercase letter, one uppercase letter, and one digit');
    }

    // Avoid common patterns or sequences
    const commonPatterns = [
        'password',
        '123456',
        'qwerty',
        'abc123',
        // Add more common patterns here if desired
    ];

    if (commonPatterns.some(pattern => password.includes(pattern))) {
        errors.push('Password should not contain common patterns');
    }

    // Check if there are any errors
    if (errors.length > 0) {
        return [false, errors];
    }

    // Password meets all criteria for a strong password
    return [true, []];
}

export function validateConfirm(password, confirmPassword){
    if(password === confirmPassword){
        return [true, []]
    }else{
        return [false, ["Password doesn't match"]]
    }
}

export function validateRole(role){
    if(role.trim() === ''){
        return [false, ["Role is required"]];
    } else {
        return [true, []];
    }
}