const siteMetadata = {
    title: "小康",
    author: "小康",
    headerTitle: "小康",
    description: {
        "zh-TW":
            "小康的個人網站 - 小康 Blog 分享編寫網頁技巧、不同類型的教學、實用軟體，你在這裡可以學到更多開發技巧。",
        en: "小康's Personal website - 小康 Blog share web development skills, different types of teaching, useful software, you can learn more development skills here.",
    },
    language: "zh-TW",
    theme: "system", // system, dark or light
    siteUrl: "https://honghong.me",
    siteRepo: "https://github.com/tszhong0411/honghong.me",
    siteLogo: "/static/images/HONG.png",
    image: "/static/images/avatar.png",
    socialBanner: "/static/images/twitter-card.png",
    email: "info@honghong.me",
    github: "https://github.com/tszhong0411",
    twitter: "https://twitter.com/TszhongLai0411",
    facebook: "https://www.facebook.com/tszhonglai.0411",
    youtube: "https://www.youtube.com/channel/UC2hMWOaOlk9vrkvFVaGmn0Q",
    instagram: "https://www.instagram.com/tszhong0411",
    locale: "zh-TW",
    analytics: {
        // supports plausible, simpleAnalytics, umami or googleAnalytics
        plausibleDataDomain: "", // e.g. tailwind-nextjs-starter-blog.vercel.app
        simpleAnalytics: false, // true or false
        umamiWebsiteId: "f9234f5f-8348-47d2-8808-9dce193bb82c", // e.g. 123e4567-e89b-12d3-a456-426614174000
        googleAnalyticsId: "", // e.g. UA-000000-2 or G-XXXXXXX
    },
    newsletter: {
        // supports mailchimp, buttondown, convertkit, klaviyo, revue
        // Please add your .env file and modify it according to your selection
        provider: "",
    },
    comment: {
        enableLoadComments: false,
        // Select a provider and use the environment variables associated to it
        // https://vercel.com/docs/environment-variables
        provider: "giscus", // supported providers: giscus, utterances, disqus
        giscusConfig: {
            // Visit the link below, and follow the steps in the 'configuration' section
            // https://giscus.app/
            repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
            repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
            category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
            categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
            mapping: "pathname", // supported options: pathname, url, title
            reactions: "1", // Emoji reactions: 1 = enable / 0 = disable
            // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
            metadata: "0",
            // theme example: light, dark, dark_dimmed, dark_high_contrast
            // transparent_dark, preferred_color_scheme, custom
            theme: "light",
            // theme when dark mode
            darkTheme: "dark",
            // If the theme option above is set to 'custom`
            // please provide a link below to your custom theme css file.
            // example: https://giscus.app/themes/custom_example.css
            themeURL: "",
            // Place the comment box above the comments. options: bottom, top
            inputPosition: "bottom",
            // Choose the language giscus will be displayed in. options: en, es, zh-CN, zh-TW, ko, ja etc (locale for i18n)
            lang: "locale",
        },
        utterancesConfig: {
            // Visit the link below, and follow the steps in the 'configuration' section
            // https://utteranc.es/
            repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO,
            issueTerm: "", // supported options: pathname, url, title
            label: "", // label (optional): Comment 💬
            // theme example: github-light, github-dark, preferred-color-scheme
            // github-dark-orange, icy-dark, dark-blue, photon-dark, boxy-light
            theme: "",
            // theme when dark mode
            darkTheme: "",
        },
        disqusConfig: {
            // https://help.disqus.com/en/articles/1717111-what-s-a-shortname
            shortname: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME,
        },
    },
};

module.exports = siteMetadata;
