export const toolsList = {
    Category: [
        {
            name: "計算",
            desc: "有關計算的工具",
        },
        {
            name: "生成",
            desc: "有關生成的工具",
        },
        {
            name: "編碼",
            desc: "有關編碼的工具",
        },
    ],
    ToolsList: {
        計算: [
            {
                name: "計算機",
                url: "/tools/calculator",
                img: "/static/images/tools/calculator.png",
                desc: "簡單計算機",
            },
            {
                name: "字數統計",
                url: "/tools/word-counter",
                img: "/static/images/tools/word-counter.png",
                desc: "統計中英文字數",
            },
        ],
        生成: [
            {
                name: "QR Code 生成器",
                url: "/tools/qr-code-generator",
                img: "/static/images/tools/qr-code-generator.png",
                desc: "QR 碼生成器",
            },
            {
                name: "密碼生成器",
                url: "/tools/password-generator",
                img: "/static/images/tools/password-generator.png",
                desc: "生成一個高強度的密碼",
            },
        ],
        編碼: [
            {
                name: "中文繁簡轉換器",
                url: "/tools/utf8-big5",
                img: "/static/images/tools/utf8-big5.png",
                desc: "繁體中文轉簡體中文",
            },
        ],
    },
};
