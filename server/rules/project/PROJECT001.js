const validProjectTypes = [
    "ES",
    "TH",
    "RR",
    "HP",
    "Street Outreach",
    "Services Only"
];

export function run(row) {

    if (validProjectTypes.includes(row.project_type)) {
        return null;
    }

    return {
        client_id: row.client_id,
        intake_id: row.intake_id,
        project_id: row.project_id,
        agency: row.agency,

        rule_id: "PROJECT001",

        category: "Project",

        severity: "Error",

        status: "Open",

        description: "Invalid Project Type",

        message:
            "Project Type must be a valid HMIS project type.",

        resolution:
            "Open Project Information and select a valid Project Type."
    };

}