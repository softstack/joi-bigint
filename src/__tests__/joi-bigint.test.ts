import BaseJoi from 'joi';
import { extendJoi } from '../index';

const Joi = extendJoi(BaseJoi);

test('Value should be bigint', () => {
	const schema = Joi.bigint().prefs({ convert: false }).required();
	expect(schema.validate(3n)).not.toHaveProperty('error');
	expect(schema.validate(3)).toHaveProperty('error');
	expect(schema.validate('3')).toHaveProperty('error');
});

test('Value should be converted to bigint', () => {
	const schema = Joi.bigint().required();
	expect(schema.validate(3n)).not.toHaveProperty('error');
	expect(schema.validate(3)).not.toHaveProperty('error');
	expect(schema.validate('3')).not.toHaveProperty('error');

	expect(schema.validate(-1)).not.toHaveProperty('error');
	expect(schema.validate(0)).not.toHaveProperty('error');
	expect(schema.validate(1)).not.toHaveProperty('error');

	expect(schema.validate('-1')).not.toHaveProperty('error');
	expect(schema.validate('0')).not.toHaveProperty('error');
	expect(schema.validate('1')).not.toHaveProperty('error');
});

test('Value should be greater than 3', () => {
	const schema = Joi.bigint().greater(3n).required();
	expect(schema.validate(2n)).toHaveProperty('error');
	expect(schema.validate(3n)).toHaveProperty('error');
	expect(schema.validate(4n)).not.toHaveProperty('error');
});

test('Value should be less or equal 3', () => {
	const schema = Joi.bigint().max(3n).required();
	expect(schema.validate(2n)).not.toHaveProperty('error');
	expect(schema.validate(3n)).not.toHaveProperty('error');
	expect(schema.validate(4n)).toHaveProperty('error');
});

test('Value should be greater or equal 3', () => {
	const schema = Joi.bigint().min(3n).required();
	expect(schema.validate(2n)).toHaveProperty('error');
	expect(schema.validate(3n)).not.toHaveProperty('error');
	expect(schema.validate(4n)).not.toHaveProperty('error');
});

test('Value shoud be multiple of 3', () => {
	const schema = Joi.bigint().multiple(3n).required();
	expect(schema.validate(0n)).toHaveProperty('error');
	expect(schema.validate(2n)).toHaveProperty('error');
	expect(schema.validate(3n)).not.toHaveProperty('error');
	expect(schema.validate(2n)).toHaveProperty('error');
	expect(schema.validate(5n)).toHaveProperty('error');
	expect(schema.validate(6n)).not.toHaveProperty('error');
	expect(schema.validate(7n)).toHaveProperty('error');
});

test('Value should be negative', () => {
	const schema = Joi.bigint().negative().required();
	expect(schema.validate(-1n)).not.toHaveProperty('error');
	expect(schema.validate(0n)).toHaveProperty('error');
	expect(schema.validate(1n)).toHaveProperty('error');
});

test('Value should be a port', () => {
	const schema = Joi.bigint().port().required();
	expect(schema.validate(-1n)).toHaveProperty('error');
	expect(schema.validate(0n)).not.toHaveProperty('error');
	expect(schema.validate(65535n)).not.toHaveProperty('error');
	expect(schema.validate(65536n)).toHaveProperty('error');
});

test('Value should be positive', () => {
	const schema = Joi.bigint().positive().required();
	expect(schema.validate(-1n)).toHaveProperty('error');
	expect(schema.validate(0n)).toHaveProperty('error');
	expect(schema.validate(1n)).not.toHaveProperty('error');
});

test('Value should have a negative sign', () => {
	const schema = Joi.bigint().sign('negative').required();
	expect(schema.validate(-1n)).not.toHaveProperty('error');
	expect(schema.validate(0n)).toHaveProperty('error');
	expect(schema.validate(1n)).toHaveProperty('error');
});

test('Value should have a positive sign', () => {
	const schema = Joi.bigint().sign('positive').required();
	expect(schema.validate(-1n)).toHaveProperty('error');
	expect(schema.validate(0n)).toHaveProperty('error');
	expect(schema.validate(1n)).not.toHaveProperty('error');
});
