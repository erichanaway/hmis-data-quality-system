export function mapRow(row) {
    return {
        client_id: row["Client ID"],
        intake_id: row["Intake ID"],

        name_dq: row["Name Data Quality"],
        dob_dq: row["DOB Data Quality"],
        ssn_dq: row["SS Data Quality"],
        gender_dq: row["Gender DQ"],
        race_dq: row["Race Data Quality"],
        address_dq: row["Address DQ"],

        project_information: row["Project Information"],
        client_enters_project: row["Client Enters Project"],
        income_insurance: row["Income/Insurance"],
        special_needs: row["Special Needs"],

        project_type: row["Project Type"],
        agency: row["Agency"],

        project_start_date: row["Project Information Start Date"],
        project_end_date: row["Project Information Stop Date"],

        cep_start_date: row["Client Enters Project Start Date"],
        exit_date: row["Client Exits Project Stop Date"],

        head_of_household: row["Head of Household"],

        user: row["User"]
    };
}