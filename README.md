# joi-bigint

Joi extension for bigint

## Features

- Converts number and string.
- The supported rules are: greater, less, max, min, multiple, negative, port, positive and sign

## Usage

```typescript
import BaseJoi from 'joi';
import { extendJoi } from '@softstack/joi-bigint';

const Joi = extendJoi(BaseJoi);
const schema = Joi.bigint().min(3n).required();

const result1 = schema.validate(3n);
console.log(result1);
// { value: 3n }

const result2 = schema.validate(3);
console.log(result2);
// { value: 3n }

const result3 = schema.validate('3');
console.log(result3);
// { value: 3n }

const result4 = schema.validate(123.456);
console.log(result4);
// {
//   value: 123.456,
//   error: [Error [ValidationError]: "value" must be a bigint] {
//     _original: 123.456,
//     details: [ [Object] ]
//   }
// }

const result5 = schema.validate(2n);
console.log(result5);
// {
//   value: 2n,
//   error: [Error [ValidationError]: "value" must be greater than or equal to 3] {
//     _original: 2n,
//     details: [ [Object] ]
//   }
// }
```
