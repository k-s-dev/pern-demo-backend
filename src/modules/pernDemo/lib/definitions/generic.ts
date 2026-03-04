import * as v from "valibot";

export const STRING_LENGTH_XS = 30;
export const STRING_LENGTH_SM = 100;
export const STRING_LENGTH_MD = 300;
export const STRING_LENGTH_LG = 1000;
export const STRING_LENGTH_XL = 3000;

export const SDbId = v.pipe(v.string(), v.uuid());

export const SName = v.pipe(
  v.string(),
  v.minLength(3, "Name must be at least 3 characters long."),
  v.maxLength(
    STRING_LENGTH_SM,
    `Name must be less than ${STRING_LENGTH_SM} characters long.`,
  ),
);

export const SEmail = v.pipe(
  v.string(),
  v.nonEmpty("Email cannot be empty."),
  v.email(),
  v.maxLength(STRING_LENGTH_XS),
);

export const SPassword = v.pipe(
  v.string(), // Ensures the input is a string
  v.minLength(8, "Password must be at least 8 characters long."),
  v.maxLength(30, "Password is too long."),
  v.regex(/[a-z]/, "Password must contain at least one lowercase letter."),
  v.regex(/[A-Z]/, "Password must contain at least one uppercase letter."),
  v.regex(/[0-9]/, "Password must contain at least one number."),
  v.regex(/[^a-zA-Z0-9]/, "Password must contain at least one symbol."),
);

export const SDescription = v.pipe(v.string(), v.maxLength(STRING_LENGTH_MD));

export const SImageUrl = v.pipe(
  v.string(),
  v.nonEmpty(),
  v.maxLength(STRING_LENGTH_MD),
);
