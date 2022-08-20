import { version } from "../crossfilter.js";
import semver from "semver";
import { describe, expect, it } from "vitest";

describe("version", () => {
  it("has the form major.minor.patch[-...]", function () {
    var result = semver.satisfies(version, version);
    expect(result).toBe(true);
  });
});
