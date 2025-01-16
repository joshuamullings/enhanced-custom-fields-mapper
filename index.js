import fs from "fs";

const originalJsonFiles = readDirectory("data/originalJson");
const updatedJsonFiles = readDirectory("data/updatedJson");

const originalJson = JSON.parse(fs.readFileSync(`data/originalJson/${originalJsonFiles[0]}`, "utf8"));
const updatedJson = JSON.parse(fs.readFileSync(`data/updatedJson/${updatedJsonFiles[0]}`, "utf8"));

if (originalJson.Methods.length !== updatedJson.Methods.length) {
    throw new Error("Original and Updated JSON files have different number of Methods");
}

const fixedJson = updatedJson.Methods.map(updateMethods);

fs.writeFileSync("./data/fixedJson/output.json", JSON.stringify(fixedJson, null, 4));

function readDirectory(directory) {
    const files = fs.readdirSync(directory).filter((file) => file.endsWith(".json"));
    if (files.length === 0) {
        throw new Error(`No JSON files found in /${directory} directory`);
    } else if (files.length > 1) {
        throw new Error(`Multiple JSON files found in /${directory} directory`);
    }

    return files;
}

function updateMethods(method) {
    const originalMethod = originalJson.Methods.find(findMethod, method);
    if (originalJsonFiles == null) {
        throw new Error(`Unable to find ${method.Name}`);
    }

    checkCustomFieldsLookupMethodName("RequestFormat");
    checkCustomFieldsLookupMethodName("ResponseFormat");

    return method;

    function checkCustomFieldsLookupMethodName(key) {
        if (originalMethod?.[key]?.CustomFieldsLookupMethodName && !method[key]?.CustomFieldsLookupMethodName) {
            console.log(`${method.Name} missing ${key} CustomFieldsLookupMethodName`);
            method[key].CustomFieldsLookupMethodName = originalMethod[key].CustomFieldsLookupMethodName;
        }
    }
}

function findMethod(method) {
    return this.MethodUniqueIdentifier === method.MethodUniqueIdentifier;
}
