import ToolLayout from "@/layouts/ToolLayout";
import { Snackbar } from "@/components/Snackbar";
import { useState } from "react";
import generator from "generate-password";

export default function PasswordGenerator() {
    const COPY_SUCCESS = "成功複製到剪貼板";

    const [password, setPassword] = useState("");
    const [length, setLength] = useState(10);
    const [isLowerCase, setIsLowerCase] = useState(true);
    const [isUpperCase, setIsUpperCase] = useState(false);
    const [isNumbers, setIsNumbers] = useState(false);
    const [isSymbols, setIsSymbols] = useState(false);

    const handleGeneratePassword = () => {
        if (!isLowerCase && !isUpperCase && !isNumbers && !isSymbols) {
            Snackbar("請選擇至少一個選項", "error");
        } else {
            const pwd = generator.generate({
                length: length,
                lowercase: isLowerCase,
                uppercase: isUpperCase,
                numbers: isNumbers,
                symbols: isSymbols,
            });
            setPassword(pwd);
        }
    };

    const copyToClipboard = () => {
        const newTextArea = document.createElement("textarea");
        newTextArea.innerText = password;
        document.body.appendChild(newTextArea);
        newTextArea.select();
        document.execCommand("copy");
        newTextArea.remove();
    };

    const handleCopyPassword = (e) => {
        if (password === "") {
            Snackbar("沒有文字可複製", "error");
        } else {
            copyToClipboard();
            Snackbar(COPY_SUCCESS, "success");
        }
    };

    return (
        <ToolLayout title={"密碼生成器"}>
            <div className="mx-auto max-w-xl rounded-md bg-[#2d2d2d] p-5">
                <div className="relative mb-4 h-11 bg-[#1b1b1b] py-3 px-2 text-white">
                    <span>{password}</span>
                    <button
                        onClick={handleCopyPassword}
                        className="absolute top-0 right-0 flex h-11 cursor-pointer items-center border-none bg-red-500 p-3 text-white"
                    >
                        <i className="far fa-clipboard"></i>
                    </button>
                </div>

                <div className="mb-4 flex items-center justify-between text-white">
                    <label htmlFor="password-strength">密碼長度</label>
                    <input
                        defaultValue={length}
                        onChange={(e) => setLength(e.target.value)}
                        type="number"
                        id="password-strength"
                        className="w-[80px] text-black"
                        name="password-strength"
                    />
                </div>

                <div className="mb-4 flex justify-between text-white">
                    <label htmlFor="uppercase-letters">包含大寫字母</label>
                    <input
                        checked={isUpperCase}
                        onChange={(e) => setIsUpperCase(e.target.checked)}
                        type="checkbox"
                        id="uppercase-letters"
                        name="uppercase-letters"
                    />
                </div>

                <div className="mb-4 flex justify-between text-white">
                    <label htmlFor="lowercase-letters">包含小寫字母</label>
                    <input
                        checked={isLowerCase}
                        onChange={(e) => setIsLowerCase(e.target.checked)}
                        type="checkbox"
                        id="lowercase-letters"
                        name="lowercase-letters"
                    />
                </div>

                <div className="mb-4 flex justify-between text-white">
                    <label htmlFor="include-numbers">包含數字</label>
                    <input
                        checked={isNumbers}
                        onChange={(e) => setIsNumbers(e.target.checked)}
                        type="checkbox"
                        id="include-numbers"
                        name="include-numbers"
                    />
                </div>

                <div className="mb-4 flex justify-between text-white">
                    <label htmlFor="include-symbols">包含符號</label>
                    <input
                        checked={isSymbols}
                        onChange={(e) => setIsSymbols(e.target.checked)}
                        type="checkbox"
                        id="include-symbols"
                        name="include-symbols"
                    />
                </div>

                <button
                    onClick={handleGeneratePassword}
                    className="block w-full border-none bg-red-500 p-3 text-base font-bold text-white"
                >
                    生成密碼
                </button>
            </div>
        </ToolLayout>
    );
}
