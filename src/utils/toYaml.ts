/* eslint-disable */
const toYaml = (obj: any, indent = 0): string => {
  const spaces = "  ".repeat(indent);
  if (obj === null) {
    return "null";
  }
  if (typeof obj !== "object") {
    return `${obj}`;
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    return obj
      .map((item) => {
        const value = toYaml(item, indent + 1);
        if (typeof item === "object" && item !== null) {
          const [firstLine, ...rest] = value.split("\n");
          return `${spaces}- ${firstLine.trim()}\n${rest.join("\n")}`;
        }
        return `${spaces}- ${value}`;
      })
      .join("\n");
  }

  const entries = Object.entries(obj);
  if (entries.length === 0) return "{}";

  return entries
    .map(([key, value]) => {
      if (value === undefined) {
        return "";
      }
      const yamlValue = toYaml(value, indent + 1);
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        return `${spaces}${key}:\n${yamlValue}`;
      }
      if (Array.isArray(value) && typeof value[0] === "object") {
        return `${spaces}${key}:\n${yamlValue}`;
      }
      return `${spaces}${key}: ${yamlValue}`;
    })
    .filter(Boolean)
    .join("\n");
};

export default toYaml;
