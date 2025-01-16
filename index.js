import fs from "fs";

const originalJsonFiles = readDirectory("data/originalJson");
const updatedJsonFiles = readDirectory("data/updatedJson");

const originalJson = JSON.parse(fs.readFileSync(`data/originalJson/${originalJsonFiles[0]}`, "utf8"));
const updatedJson = JSON.parse(fs.readFileSync(`data/updatedJson/${updatedJsonFiles[0]}`, "utf8"));

updatedJson.Methods = updatedJson.Methods.map(updateMethods);

fs.writeFileSync("./data/fixedJson/output.json", JSON.stringify(updatedJson, null, 4));

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
    if (originalMethod == null) {
        console.log(`Unable to find ${method.Name} in the original JSON file, skipping...`);
        return method;
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
