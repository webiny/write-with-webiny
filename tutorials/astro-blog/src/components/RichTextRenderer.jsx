const renderParagraph = (block) => {
    const props = { style: {} };

    if (block.data.textAlign) {
        props.style["textAlign"] = block.data.textAlign;
    }
    return (
        <p
            {...props}
            className="rte-block-paragraph mb-4"
            dangerouslySetInnerHTML={{ __html: block.data.text}}
        >
        </p>
    );
};

const renderDelimiter = () => {
    return <div className="rte-block-delimiter" />;
};

const renderHeader = (block) => {
    const props = { style: {} };

    if (block.data.textAlign) {
        props.style["textAlign"] = block.data.textAlign;
    }

    switch (block.data.level) {
        case 1:
            return (
                <h1
                    className="rte-heading-1 text-4xl"
                    {...props}
                >
                  {block.data.text}
                </h1>
            );

        case 2:
            return (
              <h2
                className="text-3xl"
                {...props}
              >
                {block.data.text}
              </h2>
            );

        case 3:
            return (
              <h3
                className="text-2xl"
                {...props}
              >
                {block.data.text}
              </h3>
            );

        case 4:
            return (
              <h4
                className="text-xl"
                {...props}
              >
              {block.data.text}
            </h4>
            );

        case 5:
            return (
              <h5
                className="text-lg"
                {...props}
              >
                {block.data.text}
              </h5>
            );

        case 6:
            return (
              <h6
                {...props}
              >
                {block.data.text}
              </h6>
            );
        default:
            return null;
    }
};

function renderImage(block) {
    return <img className="rte-block-image" alt={block.data.caption} src={block.data.file} />;
}

function renderList(block) {
    switch (block.data.style) {
        case "unordered":
            return (
                <ul className="rte-block-list">
                    {block.data.items.map((text, i) => (
                        <li key={i}>{text}</li>
                    ))}
                </ul>
            );

        case "ordered":
            return (
                <ol className="rte-block-list">
                    {block.data.items.map((text, i) => (
                        <li key={i}>{text}</li>
                    ))}
                </ol>
            );
        default:
            return null;
    }
}

function renderQuote(block) {
    return (
        <blockquote className="rte-block-blockquote">
            <p className="text-lg">{block.data.text}</p>
        </blockquote>
    );
}

const defaultRenderers = {
    delimiter: renderDelimiter,
    header: renderHeader,
    image: renderImage,
    list: renderList,
    paragraph: renderParagraph,
    quote: renderQuote
};

export const RichTextRenderer = props => {
    // Combine default renderers with custom renderers
    const renderers = Object.assign({}, defaultRenderers, props.renderers);

    return (
        <div>
            {props.data.map((block, index) => {
                console.log(block)
                const renderer = renderers[block.type];
                if (!renderer) {
                    return null;
                }

                return (
                    <div key={index}>
                        {renderer(block)}
                    </div>
                )
            })}
        </div>
    );
};
