import { executeGraphql } from "../../util";

export async function test() {
    return executeGraphql(
        `query {
            acs1Variable(tableName: "census_acs1_detailed", variableName:"B19037E_030E", year: 2018)
        }`
    )
}

