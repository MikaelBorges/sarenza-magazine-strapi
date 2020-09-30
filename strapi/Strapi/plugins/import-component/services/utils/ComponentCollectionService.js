// To parse this data:
//
//   const Convert = require("./file");
//
//   const componentCollection = Convert.toComponentCollection(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export function toComponentCollection(json) {
    return cast(JSON.parse(json), r("ComponentCollection"));
}

export function componentCollectionToJson(value) {
    return JSON.stringify(uncast(value, r("ComponentCollection")), null, 2);
}

function invalidValue(typ, val, key = '') {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ) {
    if (typ.jsonToJS === undefined) {
        const map = {};
        typ.props.forEach((p) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ) {
    if (typ.jsToJSON === undefined) {
        const map = {};
        typ.props.forEach((p) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val, typ, getProps, key = '') {
    function transformPrimitive(typ, val) {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs, val) {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases, val) {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ, val) {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val) {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props, additional, val) {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast(val, typ) {
    return transform(val, typ, jsonToJSProps);
}

function uncast(val, typ) {
    return transform(val, typ, jsToJSONProps);
}

function a(typ) {
    return { arrayItems: typ };
}

function u(...typs) {
    return { unionMembers: typs };
}

function o(props, additional) {
    return { props, additional };
}

function m(additional) {
    return { props: [], additional };
}

function r(name) {
    return { ref: name };
}

const typeMap = {
    "ComponentCollection": o([
        { json: "data", js: "data", typ: a(r("Datum")) },
    ], false),
    "Datum": o([
        { json: "uid", js: "uid", typ: "" },
        { json: "category", js: "category", typ: "" },
        { json: "apiId", js: "apiId", typ: "" },
        { json: "schema", js: "schema", typ: r("Schema") },
    ], false),
    "Schema": o([
        { json: "icon", js: "icon", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "connection", js: "connection", typ: r("Connection") },
        { json: "collectionName", js: "collectionName", typ: "" },
        { json: "attributes", js: "attributes", typ: r("Attributes") },
    ], false),
    "Attributes": o([
        { json: "Text", js: "Text", typ: u(undefined, r("DataContent")) },
        { json: "Link", js: "Link", typ: u(undefined, r("Button")) },
        { json: "domain", js: "domain", typ: u(undefined, r("Icon")) },
        { json: "isCurrent", js: "isCurrent", typ: u(undefined, r("DataContent")) },
        { json: "label", js: "label", typ: u(undefined, r("DataContent")) },
        { json: "link", js: "link", typ: u(undefined, r("Button")) },
        { json: "Label", js: "Label", typ: u(undefined, r("DataContent")) },
        { json: "Placeholder", js: "Placeholder", typ: u(undefined, r("DataContent")) },
        { json: "Button", js: "Button", typ: u(undefined, r("Button")) },
        { json: "url", js: "url", typ: u(undefined, r("URL")) },
        { json: "alt", js: "alt", typ: u(undefined, r("DataContent")) },
        { json: "image", js: "image", typ: u(undefined, r("Image")) },
        { json: "iframe_url", js: "iframe_url", typ: u(undefined, r("DataContent")) },
        { json: "title", js: "title", typ: u(undefined, r("DataContent")) },
        { json: "description", js: "description", typ: u(undefined, r("DataContent")) },
        { json: "button", js: "button", typ: u(undefined, r("Button")) },
        { json: "Title", js: "Title", typ: u(undefined, r("DataContent")) },
        { json: "links", js: "links", typ: u(undefined, r("Button")) },
        { json: "Url", js: "Url", typ: u(undefined, r("DataContent")) },
        { json: "DataContent", js: "DataContent", typ: u(undefined, r("DataContent")) },
        { json: "SubTitle", js: "SubTitle", typ: u(undefined, r("DataContent")) },
        { json: "Input", js: "Input", typ: u(undefined, r("Button")) },
        { json: "Terms", js: "Terms", typ: u(undefined, r("DataContent")) },
        { json: "PaymentPartner", js: "PaymentPartner", typ: u(undefined, r("Icon")) },
        { json: "ShippingPartner", js: "ShippingPartner", typ: u(undefined, r("Icon")) },
        { json: "QualityPartner", js: "QualityPartner", typ: u(undefined, r("Icon")) },
        { json: "text", js: "text", typ: u(undefined, r("DataContent")) },
        { json: "Partner", js: "Partner", typ: u(undefined, r("Button")) },
        { json: "portrait", js: "portrait", typ: u(undefined, r("Button")) },
        { json: "caption", js: "caption", typ: u(undefined, r("DataContent")) },
        { json: "Icon", js: "Icon", typ: u(undefined, r("Icon")) },
        { json: "Rate", js: "Rate", typ: u(undefined, r("Icon")) },
        { json: "MaxRate", js: "MaxRate", typ: u(undefined, r("DataContent")) },
        { json: "Votes", js: "Votes", typ: u(undefined, r("Button")) },
        { json: "background_url", js: "background_url", typ: u(undefined, r("DataContent")) },
        { json: "btn", js: "btn", typ: u(undefined, r("Button")) },
        { json: "article", js: "article", typ: u(undefined, r("Button")) },
        { json: "subTitle", js: "subTitle", typ: u(undefined, r("DataContent")) },
        { json: "content", js: "content", typ: u(undefined, r("DataContent")) },
        { json: "Item", js: "Item", typ: u(undefined, r("Icon")) },
        { json: "Name", js: "Name", typ: u(undefined, r("DataContent")) },
        { json: "SocialMediaItem", js: "SocialMediaItem", typ: u(undefined, r("Button")) },
        { json: "edito", js: "edito", typ: u(undefined, r("DataContent")) },
        { json: "num", js: "num", typ: u(undefined, r("DataContent")) },
        { json: "published_at", js: "published_at", typ: u(undefined, r("DataContent")) },
        { json: "seo_content", js: "seo_content", typ: u(undefined, r("DataContent")) },
        { json: "is_active", js: "is_active", typ: u(undefined, r("DataContent")) },
    ], false),
    "Button": o([
        { json: "type", js: "type", typ: r("ButtonType") },
        { json: "repeatable", js: "repeatable", typ: u(undefined, true) },
        { json: "component", js: "component", typ: u(undefined, "") },
        { json: "max", js: "max", typ: u(undefined, 0) },
    ], false),
    "DataContent": o([
        { json: "type", js: "type", typ: r("DataContentType") },
    ], false),
    "Icon": o([
        { json: "type", js: "type", typ: "" },
        { json: "enum", js: "enum", typ: a("") },
    ], false),
    "Image": o([
        { json: "type", js: "type", typ: "" },
        { json: "repeatable", js: "repeatable", typ: u(undefined, true) },
        { json: "component", js: "component", typ: u(undefined, "") },
        { json: "multiple", js: "multiple", typ: u(undefined, true) },
        { json: "required", js: "required", typ: u(undefined, true) },
        { json: "allowedTypes", js: "allowedTypes", typ: u(undefined, a("")) },
    ], false),
    "URL": o([
        { json: "type", js: "type", typ: r("ButtonType") },
        { json: "required", js: "required", typ: true },
    ], false),
    "ButtonType": [
        "component",
        "string",
    ],
    "DataContentType": [
        "boolean",
        "date",
        "integer",
        "json",
        "richtext",
        "string",
        "text",
    ],
    "Connection": [
        "default",
    ],
};
