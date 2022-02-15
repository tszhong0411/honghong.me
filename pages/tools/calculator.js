import ToolLayout from "@/layouts/ToolLayout";
import React from "react";

class AutoScalingText extends React.Component {
    state = {
        scale: 1,
    };
    componentDidUpdate() {
        const { scale } = this.state;
        const node = this.node;
        const parentNode = node.parentNode;
        const availableWidth = parentNode.offsetWidth;
        const actualWidth = node.offsetWidth;
        const actualScale = availableWidth / actualWidth;
        if (scale === actualScale) return;
        if (actualScale < 1) {
            this.setState({ scale: actualScale });
        } else if (scale < 1) {
            this.setState({ scale: 1 });
        }
    }
    render() {
        const { scale } = this.state;
        return (
            <div
                className=""
                style={{
                    transform: `scale(${scale},${scale})`,
                    transformOrigin: "right center",
                }}
                ref={(node) => (this.node = node)}
            >
                {this.props.children}
            </div>
        );
    }
}
class CalculatorDisplay extends React.Component {
    render() {
        const { value, ...props } = this.props;
        const language = "en-US";
        let formattedValue = parseFloat(value).toLocaleString(language, {
            useGrouping: true,
            maximumFractionDigits: 6,
        });
        // Add back missing .0 in e.g. 12.0
        const match = value.match(/\.\d*?(0*)$/);
        if (match)
            formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];
        return (
            <div
                {...props}
                className="mb-[10px] flex h-[100px] w-full items-center justify-end rounded-xl bg-[#000] text-[70px] font-bold text-white"
            >
                <AutoScalingText>{formattedValue}</AutoScalingText>
            </div>
        );
    }
}
class CalculatorKey extends React.Component {
    render() {
        const { onPress, className, ...props } = this.props;
        return (
            <button
                className={`${className} cursor-pointer rounded-full border-none text-[24px] font-bold outline-none transition-all duration-300 ease-[ease]`}
                onClick={onPress}
                {...props}
            />
        );
    }
}
const CalculatorOperations = {
    "/": (prevValue, nextValue) => prevValue / nextValue,
    "*": (prevValue, nextValue) => prevValue * nextValue,
    "+": (prevValue, nextValue) => prevValue + nextValue,
    "-": (prevValue, nextValue) => prevValue - nextValue,
    "=": (prevValue, nextValue) => nextValue,
};
class ToolsCalculator extends React.Component {
    state = {
        value: null,
        displayValue: "0",
        operator: null,
        waitingForOperand: false,
    };
    clearAll() {
        this.setState({
            value: null,
            displayValue: "0",
            operator: null,
            waitingForOperand: false,
        });
    }
    clearDisplay() {
        this.setState({
            displayValue: "0",
        });
    }
    clearLastChar() {
        const { displayValue } = this.state;
        this.setState({
            displayValue:
                displayValue.substring(0, displayValue.length - 1) || "0",
        });
    }
    toggleSign() {
        const { displayValue } = this.state;
        const newValue = parseFloat(displayValue) * -1;
        this.setState({
            displayValue: String(newValue),
        });
    }
    inputPercent() {
        const { displayValue } = this.state;
        const currentValue = parseFloat(displayValue);
        if (currentValue === 0) return;
        const fixedDigits = displayValue.replace(/^-?\d*\.?/, "");
        const newValue = parseFloat(displayValue) / 100;
        this.setState({
            displayValue: String(newValue.toFixed(fixedDigits.length + 2)),
        });
    }
    inputDot() {
        const { displayValue } = this.state;
        if (!/\./.test(displayValue)) {
            this.setState({
                displayValue: displayValue + ".",
                waitingForOperand: false,
            });
        }
    }
    inputDigit(digit) {
        const { displayValue, waitingForOperand } = this.state;
        if (waitingForOperand) {
            this.setState({
                displayValue: String(digit),
                waitingForOperand: false,
            });
        } else {
            this.setState({
                displayValue:
                    displayValue === "0" ? String(digit) : displayValue + digit,
            });
        }
    }
    performOperation(nextOperator) {
        const { value, displayValue, operator } = this.state;
        const inputValue = parseFloat(displayValue);
        if (value == null) {
            this.setState({
                value: inputValue,
            });
        } else if (operator) {
            const currentValue = value || 0;
            const newValue = CalculatorOperations[operator](
                currentValue,
                inputValue,
            );

            this.setState({
                value: newValue,
                displayValue: String(newValue),
            });
        }
        this.setState({
            waitingForOperand: true,
            operator: nextOperator,
        });
    }
    handleKeyDown = (event) => {
        let { key } = event;
        if (key === "Enter") key = "=";
        if (/\d/.test(key)) {
            event.preventDefault();
            this.inputDigit(parseInt(key, 10));
        } else if (key in CalculatorOperations) {
            event.preventDefault();
            this.performOperation(key);
        } else if (key === ".") {
            event.preventDefault();
            this.inputDot();
        } else if (key === "%") {
            event.preventDefault();
            this.inputPercent();
        } else if (key === "Backspace") {
            event.preventDefault();
            this.clearLastChar();
        } else if (key === "Clear") {
            event.preventDefault();

            if (this.state.displayValue !== "0") {
                this.clearDisplay();
            } else {
                this.clearAll();
            }
        }
    };
    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }
    render() {
        const { displayValue } = this.state;
        const clearDisplay = displayValue !== "0";
        const clearText = clearDisplay ? "C" : "AC";
        return (
            <>
                <CalculatorDisplay value={displayValue} />
                <div className="grid h-[calc(100%-110px)] w-full grid-cols-4 grid-rows-5 gap-[8px]">
                    <CalculatorKey
                        className="h-[76.5px] bg-[#a5a5a5] text-black hover:bg-[#ffffffdb]"
                        onPress={() =>
                            clearDisplay ? this.clearDisplay() : this.clearAll()
                        }
                    >
                        {clearText}
                    </CalculatorKey>
                    <CalculatorKey
                        className="h-[76.5px] bg-[#a5a5a5] text-black hover:bg-[#ffffffdb]"
                        onPress={() => this.toggleSign()}
                    >
                        ±
                    </CalculatorKey>
                    <CalculatorKey
                        className="h-[76.5px] bg-[#a5a5a5] text-black hover:bg-[#ffffffdb]"
                        onPress={() => this.inputPercent()}
                    >
                        %
                    </CalculatorKey>
                    <CalculatorKey
                        className="h-[76.5px] bg-[#fe9e0b] text-white hover:bg-[#ffb444]"
                        onPress={() => this.performOperation("/")}
                    >
                        ÷
                    </CalculatorKey>
                    <CalculatorKey
                        className="h-[76.5px] bg-[#333333] text-white hover:bg-[#ffffff77]"
                        onPress={() => this.inputDigit(7)}
                    >
                        7
                    </CalculatorKey>
                    <CalculatorKey
                        className="h-[76.5px] bg-[#333333] text-white hover:bg-[#ffffff77]"
                        onPress={() => this.inputDigit(8)}
                    >
                        8
                    </CalculatorKey>
                    <CalculatorKey
                        className="h-[76.5px] bg-[#333333] text-white hover:bg-[#ffffff77]"
                        onPress={() => this.inputDigit(9)}
                    >
                        9
                    </CalculatorKey>
                    <CalculatorKey
                        className="h-[76.5px] bg-[#fe9e0b] text-white hover:bg-[#ffb444]"
                        onPress={() => this.performOperation("*")}
                    >
                        ×
                    </CalculatorKey>
                    <CalculatorKey
                        className="h-[76.5px] bg-[#333333] text-white hover:bg-[#ffffff77]"
                        onPress={() => this.inputDigit(4)}
                    >
                        4
                    </CalculatorKey>
                    <CalculatorKey
                        className="h-[76.5px] bg-[#333333] text-white hover:bg-[#ffffff77]"
                        onPress={() => this.inputDigit(5)}
                    >
                        5
                    </CalculatorKey>
                    <CalculatorKey
                        className="h-[76.5px] bg-[#333333] text-white hover:bg-[#ffffff77]"
                        onPress={() => this.inputDigit(6)}
                    >
                        6
                    </CalculatorKey>
                    <CalculatorKey
                        className="h-[76.5px] bg-[#fe9e0b] text-white hover:bg-[#ffb444]"
                        onPress={() => this.performOperation("-")}
                    >
                        −
                    </CalculatorKey>

                    <CalculatorKey
                        className="h-[76.5px] bg-[#333333] text-white hover:bg-[#ffffff77]"
                        onPress={() => this.inputDigit(1)}
                    >
                        1
                    </CalculatorKey>
                    <CalculatorKey
                        className="h-[76.5px] bg-[#333333] text-white hover:bg-[#ffffff77]"
                        onPress={() => this.inputDigit(2)}
                    >
                        2
                    </CalculatorKey>
                    <CalculatorKey
                        className="h-[76.5px] bg-[#333333] text-white hover:bg-[#ffffff77]"
                        onPress={() => this.inputDigit(3)}
                    >
                        3
                    </CalculatorKey>
                    <CalculatorKey
                        className="h-[76.5px] bg-[#fe9e0b] text-white hover:bg-[#ffb444]"
                        onPress={() => this.performOperation("+")}
                    >
                        +
                    </CalculatorKey>
                    <CalculatorKey
                        className="col-[1/3] h-[76.5px] bg-[#333333] px-8 text-left text-white hover:bg-[#ffffff77]"
                        onPress={() => this.inputDigit(0)}
                    >
                        0
                    </CalculatorKey>
                    <CalculatorKey
                        className="h-[76.5px] bg-[#333333] text-white hover:bg-[#ffffff77]"
                        onPress={() => this.inputDot()}
                    >
                        .
                    </CalculatorKey>
                    <CalculatorKey
                        className="h-[76.5px] bg-[#fe9e0b] text-white hover:bg-[#ffb444]"
                        onPress={() => this.performOperation("=")}
                    >
                        =
                    </CalculatorKey>
                </div>
            </>
        );
    }
}
export default function Calculator() {
    return (
        <>
            <ToolLayout title="計算機" description="簡單－iOS 風格的計算機">
                <div className="mx-auto h-[610px] w-full max-w-[350px] rounded-3xl bg-[#000] p-[10px] pt-[50px] shadow-md">
                    <ToolsCalculator />
                </div>
            </ToolLayout>
        </>
    );
}
