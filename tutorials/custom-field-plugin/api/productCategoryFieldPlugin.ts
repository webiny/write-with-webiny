import { CmsModelFieldToGraphQLPlugin } from "@webiny/api-headless-cms/types";

const plugin: CmsModelFieldToGraphQLPlugin = {
    name: "cms-model-field-to-graphql-product-category",
    type: "cms-model-field-to-graphql",
    fieldType: "product-category",
    isSortable: true,
    isSearchable: true,
    read: {
        createTypeField({ field }) {
            if (field.multipleValues) {
                return `${field.fieldId}: [String]`;
            }
            return `${field.fieldId}: String`
        },
        createGetFilters({ field }) {
            return `${field.fieldId}: String`
        },
        createListFilters({ field }) {
            return `
                ${field.fieldId}: String
                ${field.fieldId}_not: String
                ${field.fieldId}_in: [String]
                ${field.fieldId}_not_in: [String]
                ${field.fieldId}_contains: String
                ${field.fieldId}_not_contains: String
            `
        }
    },
    manage: {
        createListFilters({ field }) {
            return `
                ${field.fieldId}: String
                ${field.fieldId}_not: String
                ${field.fieldId}_in: [String]
                ${field.fieldId}_not_in: [String]
                ${field.fieldId}_contains: String
                ${field.fieldId}_not_contains: String
            `
        },
        createTypeField({ field }) {
            if (field.multipleValues) {
                return `${field.fieldId}: [String]`;
            }
            return `${field.fieldId}: String`
        },
        createInputField({ field }) {
            if (field.multipleValues) {
                return `${field.fieldId}: [String]`;
            }
            return `${field.fieldId}: String`
        }
    }
}

export default plugin;

