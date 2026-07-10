import { runProjectRules } from "./project/index.js";

export function runRules(rows) {

    const flags = [];

    for (const row of rows) {

        const projectFlags = runProjectRules(row);

        flags.push(...projectFlags);

    }

    return flags;

}