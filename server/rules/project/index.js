import { run as project001 } from "./PROJECT001.js";

const projectRules = [
    project001
];

export function runProjectRules(row) {

    const flags = [];

    for (const rule of projectRules) {

        const flag = rule(row);

        if (flag) {
            flags.push(flag);
        }

    }

    return flags;

}