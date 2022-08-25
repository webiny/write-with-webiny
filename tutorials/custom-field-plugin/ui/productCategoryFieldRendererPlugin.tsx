import React from "react";
import { CmsEditorFieldRendererPlugin } from "@webiny/app-headless-cms/types";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";

export default (): CmsEditorFieldRendererPlugin => ({
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-product-category",
    renderer: {
        rendererName: "product-category",
        name: "Product Category",
        description: "Product Category",
        canUse({ field }) {
            return field.type === "product-category";
        },
        render({ getBind }) {
            const Bind = getBind();
            const options = [
                "Mechanical Watch",
                "Quartz Watch",
                "Digital Watch",
                "Smart Watch",
                "Hybrid"
            ];
            const defaultOption = options[0];
            return (
                <Bind>
                    {
                        bind => (
                            <ReactDropdown
                                options={options}
                                onChange={({ value }) => bind.onChange(value)}
                                value={bind.value || defaultOption}
                                placeholder="Select an option"
                            />
                        )
                    }
                </Bind>
            )
        }
    }
})

