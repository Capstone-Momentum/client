import { executeGraphql } from "../../util";

export async function getAllCensusDatasetItems() {
    const resp = await executeGraphql(
        `query {
            allDatasetItems
        }`
    )
    return resp.data.allDatasetItems
}
