import React from "react";
import { CmsEditorFieldTypePlugin } from "@webiny/app-headless-cms/types";


const DropdownIcon: React.FunctionComponent = () => <i>ICON</i>

const plugin: CmsEditorFieldTypePlugin = {
    type: "cms-editor-field-type",
    name: "cms-editor-field-type-product-category",
    field: {
        type: "product-category",
        label: "Product Category",
        description: "Product Category",
        icon: <DropdownIcon />,
        allowMultipleValues: false,
        allowPredefinedValues: false,
        multipleValuesLabel: "Use as a list of multiple categories",
        createField() {
            return {
                type: "product-category",
                validation: [],
                renderer: {
                    name: ""
                }
            }
        },
    }
}

export default plugin;

