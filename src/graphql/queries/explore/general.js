import { executeGraphql } from "../../util";

export async function scanTable(tableName) {
    const resp = await executeGraphql(
        `query {
            scanTable(tableName: "${tableName}")
        }`
    )
    return resp.data.scanTable
}
