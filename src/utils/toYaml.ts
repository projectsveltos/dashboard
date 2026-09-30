import { dump } from "js-yaml";

// Dumped as real YAML so multi-line values (e.g. a Lua evaluate function or a Helm
// chart's values field) render as readable block scalars. Undefined fields are skipped.
const toYaml = (obj: unknown): string => dump(obj, { skipInvalid: true });

export default toYaml;
