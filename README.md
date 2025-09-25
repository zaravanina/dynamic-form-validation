🚀 Getting Started

Install dependencies

````
```bash
npm install
````

# one-time build

npm run build

# or run watchers

npm run watch:ts
npm run watch:css

➕ Adding New Fields

All fields are defined in config/fields.json
.
Each field has:

alias → the name/id of the field

type → input type (text, email, password, etc.)

regex → validation rule (as a string)

message → error message shown if validation fails

placeholder → placeholder text inside the input

title → label text shown above the input

Example field definition:

```json
{
  "title": "Phone Number",
  "alias": "phone",
  "type": "number",
  "regex": "^[0-9]{8}$",
  "message": "Phone number must be 8 digits.",
  "placeholder": "Your phone number"
}
```
