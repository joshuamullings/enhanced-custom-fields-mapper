# Summary

This repositry contains script to ensure the **CustomFieldsLookupMethodName** property is retained across connector versions.

# Setup

1. In a terminal window, navigate to the directory where the project should be created.
2. Enter the following command to clone the repositry and open VS code:

    ```
    git clone https://github.com/joshuamullings/enhanced-custom-fields-mapper.git && cd enhanced-custom-fields-mapper && code .
    ```

# Usage

The original connector JSON file should be placed in the `data/originalJson` folder.
The updated connector JSON file should be placed in the `data/updatedJson` folder.

Running `index.js` will then parse each method, ensuring the **CustomFieldsLookupMethodName** property is the same across both connectors versions.

Once each method has been parsed and updated, the fixed connector JSON will be placed in the `data/fixedJson` folder in an output.json file.
