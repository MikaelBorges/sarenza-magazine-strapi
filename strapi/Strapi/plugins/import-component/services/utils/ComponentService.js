import * as Collection from "./ComponentCollectionService";
import * as Item from "./ComponentItemService";

export default function Convert(json) {

    var obj = JSON.parse(json)

    if (!obj["data"]) throw new Error("Bad Request")
    
    const data = obj["data"]

    if (Array.isArray(data)) {
        var result =  Collection.toComponentCollection(json)
        return {data:result.data}
    }
    else if (typeof data == "object") {
        return {data:[Item.toComponent(json).data]}
    }
}
