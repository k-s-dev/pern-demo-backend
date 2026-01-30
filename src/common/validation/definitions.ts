import * as v from "valibot";

export type ValibotObjectSchema = v.ObjectSchema<
  v.ObjectEntries,
  v.ErrorMessage<v.ObjectIssue>
>;
