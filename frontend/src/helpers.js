const scroll = selector => {
    document.querySelector(selector).scrollIntoView({ behavior: 'smooth' });
};

const strip_tags_except_markdown = string => {
    return string.replace(
        /(<([^>].*)>)(?=([^```\\]*(\\.|```([^```\\]*\\.)*[^```\\]*```))*[^```]*$)/gi,
        ''
    );
};

export { scroll, strip_tags_except_markdown };
