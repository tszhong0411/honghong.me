import ToolLayout from "@/layouts/ToolLayout";
import QRious from "qrious";
import { Snackbar } from "@/components/Snackbar";
import { useEffect, useRef, useState } from "react";
import useTranslation from "next-translate/useTranslation";

export default function QrCodeGenerator() {
    const [checked, setChecked] = useState(false);
    const textRef = useRef();
    const { t } = useTranslation();

    useEffect(() => {
        new QRious({
            size: 250,
            value: "https://honghong.me",
            element: document.querySelector("#qr-code-img"),
        });
    }, []);

    const realTimeUpdate = () => {
        new QRious({
            size: 250,
            value: textRef.current.value,
            element: document.querySelector("#qr-code-img"),
        });
    };

    const generateHandler = () => {
        if (textRef.current.value === "") {
            Snackbar(t("tools:qrCodeGenerator.inputError"), "error");
        } else {
            new QRious({
                size: 250,
                value: textRef.current.value,
                element: document.querySelector("#qr-code-img"),
            });
        }
    };

    const downloadHandler = () => {
        var a = document.createElement("a");
        a.href = document.querySelector("#qr-code-img").getAttribute("src");
        a.download = "QR Code.png";
        a.click();
    };

    return (
        <ToolLayout
            title={t("tools:toolsList.qrCodeGenerator")}
            description={t("tools:toolsList.qrCodeGeneratorDesc")}
        >
            <div>
                <div className="mx-auto w-full max-w-[250px]">
                    <img alt="qr-code" id="qr-code-img" />
                </div>
                <div>
                    <div className="my-4 grid gap-y-3">
                        <label htmlFor="text" className="text-lg font-bold">
                            {t("tools:qrCodeGenerator.URLorText")}
                        </label>
                        <input
                            type="text"
                            id="text"
                            className="w-full rounded-md border-red-400 px-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-black"
                            ref={textRef}
                            onChange={() => (checked ? realTimeUpdate() : null)}
                        />
                    </div>
                    <div className="my-4 grid">
                        <span className="text-lg font-bold">
                            {t("tools:qrCodeGenerator.options")}
                        </span>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                onChange={() => setChecked(!checked)}
                            />
                            <span className="ml-2 font-bold">
                                {t("tools:qrCodeGenerator.liveUpdate")}
                            </span>
                        </label>
                    </div>
                    <div className="my-4 grid gap-y-4">
                        <button
                            type="button"
                            className="w-full rounded-md bg-red-500 py-2 px-4 text-lg font-bold text-white"
                            onClick={generateHandler}
                        >
                            {t("tools:qrCodeGenerator.generate")}
                        </button>
                        <button
                            type="button"
                            className="w-full rounded-md bg-red-500 py-2 px-4 text-lg font-bold text-white"
                            onClick={downloadHandler}
                        >
                            {t("tools:qrCodeGenerator.download")}
                        </button>
                    </div>
                </div>
                <p className="my-4 text-sm">{t("tools:qrCodeGenerator.tip")}</p>
            </div>
        </ToolLayout>
    );
}
