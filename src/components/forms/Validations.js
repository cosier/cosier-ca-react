
const isEmpty = (value) =>
      value === undefined || value === null || value === '';

const join = (rules) =>
      (value, data, props) =>
      rules.map((rule) =>
                rule(value, data, props)).filter((error) => !!error)[0];

/**
  * Get Feedback
  * @param {string} value
  * @return {object} Result
  */
export function getBsFeedback(value) {
    let feedback;
    feedback = {};
    if (value.touched) {
        feedback = {
            hasFeedback: true,
            bsStyle: value.valid ? 'success' : 'error',
            help: value.touched && (value.error ? value.error : ''),
        };
    }
    return feedback;
}


/**
  * Email validator
  * @param {string} value
  * @return {string|boolean} Result
  */
export function email(value) {
    // Let's not start a debate on email regex. This is just for an example app!
    if (!isEmpty(value) &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Invalid email address';
    }
}

/**
 * Required validator
 * @param {string} value
 * @return {string|boolean} Result
 */
export function required(value) {
    if (isEmpty(value)) {
        return 'Required';
    }
}

/**
 * Required minLength
 * @param {string} min
 * @return {string|boolean} Result
 */
export function minLength(min) {
    return (value) => {
        if (!isEmpty(value) && value.length < min) {
            return `Must be at least ${min} characters`;
        }
    };
}

/**
 * maxLength
 * @param {string} max
 * @return {string|boolean} Result
 */
export function maxLength(max) {
    return (value) => {
        if (!isEmpty(value) && value.length > max) {
            return `Must be no more than ${max} characters`;
        }
    };
}


/**
 * integer
 * @param {string} value
 * @return {string|boolean} Result
 */
export function integer(value) {
    if (!Number.isInteger(Number(value))) {
        return 'Must be an integer';
    }
}

/**
 * oneOf
 * @param {string} enumeration
 * @return {string|boolean} Result
 */
export function oneOf(enumeration) {
    return (value) => {
        if (!~enumeration.indexOf(value)) {
            return `Must be one of: ${enumeration.join(', ')}`;
        }
    };
}


/**
 * match
 * @param {string} field
 * @return {string|boolean} Result
 */
export function match(field) {
    return (value, data) => {
        if (data) {
            if (value !== data[field]) {
                return 'Do not match';
            }
        }
    };
}


/**
 * arrayValidator
 * @param {string} rules
 * @return {string|boolean} Result
 */
export function arrayValidator(rules) {
    return (data = []) => {
        const errors = [];
        const validator = createValidator(rules);
        data.forEach((value) => {
            const error = validator(value);
            if (error) {
                errors.push(error);
            }
        });
        return errors;
    };
}


/**
 * createValidator
 * @param {string} rules
 * @return {string|boolean} Result
 */
export function createValidator(rules) {
    return (data = {}, props) => {
        const errors = {};
        Object.keys(rules).forEach((key) => {
            // concat enables both functions and arrays of functions
            const rule = join([].concat(rules[key]));
            const error = rule(data[key], data, props);
            if (error) {
                errors[key] = error;
            }
        });
        return errors;
    };
}

export default {
    createValidator,
    arrayValidator,
    getBsFeedback,
    email,
    required,
    minLength,
    maxLength,
    integer,
    oneOf,
    match,
};
