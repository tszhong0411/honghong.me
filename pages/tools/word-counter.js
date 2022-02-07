import ToolLayout from "@/layouts/ToolLayout";
import { useState, useRef } from "react";

export default function WordCounter() {
    const text = useRef();
    const [total, setTotal] = useState(0);
    const [engWords, setEngWords] = useState(0);
    const [char, setChar] = useState(0);
    const [paragraphs, setParagraphs] = useState(0);
    const [sentences, setSentences] = useState(0);
    const [line, setLine] = useState(1);
    const [chiWords, setChiWords] = useState(0);
    const [num, setNum] = useState(0);

    const changeHandler = () => {
        let chinese = 0;
        let number = 0;
        let str = text.current.value.replace(/(\r\n|\n|\r)/gm, "");

        // Total
        setTotal(text.current.value.replace(/(\r\n|\n|\r)/gm, "").length);

        // Characters
        // eslint-disable-next-line no-control-regex
        setChar(
            text.current.value
                // eslint-disable-next-line no-control-regex
                .replace(/[^\x00-\xff]/g, "xx")
                .replace(/(\r\n|\n|\r)/gm, "").length
        );

        // Line
        setLine(text.current.value.split("\n").length);

        // Chinese and Number
        for (let i = 0; i < str.length; i++) {
            let ch = str.charAt(i);
            if (ch.match(/[\u4e00-\u9fa5]/)) {
                chinese += 1;
            } else if (ch >= "0" && ch <= "9") {
                number += 1;
            }
        }
        setChiWords(chinese);
        setNum(number);

        // English words
        var count = function () {
            var characters = text.current.value;

            var words = characters.split(/[\n\r\s]+/g).filter(function (word) {
                return word.length > 0;
            });

            setEngWords(words.length);
        };
        count();
        //  Paragraphs
        setParagraphs(
            text.current.value.replace(/\n$/gm, "").split(/\n/).length
        );

        // Sentences
        setSentences(
            text.current.value
                ? Math.max(
                      (
                          (text.current.value || "").match(
                              /[^?!.。][?!.。]/g
                          ) || []
                      ).length,
                      1
                  )
                : 0
        );
    };

    return (
        <ToolLayout title={"字數統計"}>
            <div>
                <textarea
                    placeholder="在此處輸入 ..."
                    spellCheck="false"
                    rows="10"
                    ref={text}
                    className="h-[250px] w-full rounded-md border-none bg-[#2d2d2d] p-4  text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-[#0e0f15]"
                    onChange={changeHandler}
                ></textarea>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    <div className="w-full rounded-md bg-gray-300 p-4 dark:bg-[#0e0f15]">
                        <div>{total}</div> 個字數
                    </div>
                    <div className="w-full rounded-md bg-gray-300 p-4 dark:bg-[#0e0f15]">
                        <div>{engWords}</div> 個英文字
                    </div>
                    <div className="w-full rounded-md bg-gray-300 p-4 dark:bg-[#0e0f15]">
                        <div>{char}</div> 個字元
                    </div>
                    <div className="w-full rounded-md bg-gray-300 p-4 dark:bg-[#0e0f15]">
                        <div>{paragraphs}</div> 段落
                    </div>
                    <div className="w-full rounded-md bg-gray-300 p-4 dark:bg-[#0e0f15]">
                        <div>{sentences}</div> 句子
                    </div>
                    <div className="w-full rounded-md bg-gray-300 p-4 dark:bg-[#0e0f15]">
                        <div>{line}</div> 行
                    </div>
                    <div className="w-full rounded-md bg-gray-300 p-4 dark:bg-[#0e0f15]">
                        <div>{chiWords}</div> 個中文字
                    </div>
                    <div className="w-full rounded-md bg-gray-300 p-4 dark:bg-[#0e0f15]">
                        <div>{num}</div> 個數字
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
