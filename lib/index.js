"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendJoi = exports.joiBigint = void 0;
const isBigint = (value) => typeof value === 'bigint';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const joiBigint = (joi) => ({
    type: 'bigint',
    messages: {
        'bigint.base': '{{#label}} must be a bigint',
        'bigint.greater': '{{#label}} must be greater than {{#limit}}',
        'bigint.less': '{{#label}} must be less than {{#limit}}',
        'bigint.max': '{{#label}} must be less than or equal to {{#limit}}',
        'bigint.min': '{{#label}} must be greater than or equal to {{#limit}}',
        'bigint.multiple': '{{#label}} must be a multiple of {{#base}}',
        'bigint.negative': '{{#label}} must be a negative number',
        'bigint.port': '{{#label}} must be a valid port',
        'bigint.positive': '{{#label}} must be a positive number',
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    coerce(value, helpers) {
        if (typeof value === 'string' || (typeof value === 'number' && Number.isInteger(value))) {
            try {
                return { value: BigInt(value) };
                // eslint-disable-next-line no-empty
            }
            catch { }
        }
        return { value };
    },
    validate(value, helpers) {
        if (!isBigint(value)) {
            return { value, errors: helpers.error('bigint.base') };
        }
    },
    rules: {
        greater: {
            method(limit) {
                return this.$_addRule({ name: 'greater', args: { limit } });
            },
            validate(value, helpers, { limit }) {
                return value > limit ? value : helpers.error('bigint.greater', { limit: limit.toString() });
            },
            args: [
                {
                    name: 'limit',
                    assert: isBigint,
                    message: 'must be a bigint',
                },
            ],
        },
        less: {
            method(limit) {
                return this.$_addRule({ name: 'less', args: { limit } });
            },
            validate(value, helpers, { limit }) {
                return value < limit ? value : helpers.error('bigint.less', { limit: limit.toString() });
            },
            args: [
                {
                    name: 'limit',
                    assert: isBigint,
                    message: 'must be a bigint',
                },
            ],
        },
        max: {
            method(limit) {
                return this.$_addRule({ name: 'max', args: { limit } });
            },
            validate(value, helpers, { limit }) {
                return value <= limit ? value : helpers.error('bigint.max', { limit: limit.toString() });
            },
            args: [
                {
                    name: 'limit',
                    assert: isBigint,
                    message: 'must be a bigint',
                },
            ],
        },
        min: {
            method(limit) {
                return this.$_addRule({ name: 'min', args: { limit } });
            },
            validate(value, helpers, { limit }) {
                return value >= limit ? value : helpers.error('bigint.min', { limit: limit.toString() });
            },
            args: [
                {
                    name: 'limit',
                    assert: isBigint,
                    message: 'must be a bigint',
                },
            ],
        },
        multiple: {
            method(base) {
                return this.$_addRule({ name: 'multiple', args: { base } });
            },
            validate(value, helpers, { base }) {
                return value >= base && value % base === 0n
                    ? value
                    : helpers.error('bigint.multiple', { base: base.toString() });
            },
            args: [
                {
                    name: 'base',
                    assert: isBigint,
                    message: 'must be a bigint',
                },
            ],
            multi: true,
        },
        negative: {
            method() {
                return this.$_addRule({ name: 'negative' });
            },
            validate(value, helpers) {
                return value < 0n ? value : helpers.error('bigint.negative');
            },
        },
        port: {
            method() {
                return this.$_addRule({ name: 'port' });
            },
            validate(value, helpers) {
                return value >= 0n && value <= 65535n ? value : helpers.error('bigint.port');
            },
        },
        positive: {
            method() {
                return this.$_addRule({ name: 'positive' });
            },
            validate(value, helpers) {
                return value > 0n ? value : helpers.error('bigint.positive');
            },
        },
        sign: {
            method(sign) {
                return this.$_addRule({ name: 'sign', args: { sign } });
            },
            validate(value, helpers, { sign }) {
                return (sign === 'negative' && value < 0n) || (sign === 'positive' && value > 0n)
                    ? value
                    : helpers.error(`bigint.${sign}`);
            },
            args: [
                {
                    name: 'sign',
                    assert: (value) => ['negative', 'positive'].includes(value),
                    message: 'must be "negative" or "positive"',
                },
            ],
        },
    },
});
exports.joiBigint = joiBigint;
const extendJoi = (baseJoi) => {
    return baseJoi.extend(exports.joiBigint);
};
exports.extendJoi = extendJoi;
