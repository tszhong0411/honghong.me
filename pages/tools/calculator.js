import ToolLayout from '@/layouts/ToolLayout'
import React, { useState } from 'react'
import { Textfit } from 'react-textfit'

const Screen = ({ value }) => {
  return (
    <Textfit
      className="mb-[10px] flex h-[100px] w-full items-center justify-end rounded-xl bg-[#000] px-[10px] font-bold text-white"
      mode="single"
      max={70}
    >
      {value}
    </Textfit>
  )
}

const ButtonBox = ({ children }) => {
  return (
    <div className="grid h-[calc(100%-110px)] w-full grid-cols-4 grid-rows-5 gap-[8px]">
      {children}
    </div>
  )
}

const Button = ({ className, value, onClick }) => {
  return (
    <button
      className={`${className} cursor-pointer rounded-full border-none text-[24px] font-bold outline-none transition-all duration-300 ease-[ease]`}
      onClick={onClick}
    >
      {value}
    </button>
  )
}

const btnValues = [
  ['AC', '±', '%', '÷'],
  [7, 8, 9, '×'],
  [4, 5, 6, '-'],
  [1, 2, 3, '+'],
  [0, '.', '='],
]

const toLocaleString = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ')

const removeSpaces = (num) => num.toString().replace(/\s/g, '')

export default function Calculator() {
  let [calc, setCalc] = useState({
    sign: '',
    num: 0,
    res: 0,
  })

  const numClickHandler = (e) => {
    e.preventDefault()
    const value = e.target.innerHTML

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === '0'
            ? '0'
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      })
    }
  }
  const commaClickHandler = (e) => {
    e.preventDefault()
    const value = e.target.innerHTML

    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num,
    })
  }

  const signClickHandler = (e) => {
    e.preventDefault()
    const value = e.target.innerHTML

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    })
  }

  const equalsClickHandler = () => {
    var roundDecimal = function (val, precision) {
      return (
        Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) /
        Math.pow(10, precision || 0)
      )
    }
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === '+' ? a + b : sign === '-' ? a - b : sign === '×' ? a * b : a / b

      setCalc({
        ...calc,
        res:
          calc.num === '0' && calc.sign === '÷'
            ? '錯誤'
            : roundDecimal(
                toLocaleString(
                  math(Number(removeSpaces(calc.res)), Number(removeSpaces(calc.num)), calc.sign)
                ),
                6
              ),
        sign: '',
        num: 0,
      })
    }
  }

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res,
      sign: calc.sign,
    })
  }

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: calc.res,
      sign: calc.sign,
    })
  }

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: '',
      num: 0,
      res: 0,
    })
  }

  return (
    <ToolLayout title={'計算機'}>
      <div className="mx-auto h-[610px] w-full max-w-[350px] rounded-3xl bg-[#000] p-[10px] pt-[50px] shadow-md">
        <Screen value={calc.num ? calc.num : calc.res} />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={
                  btn === '=' || btn === '÷' || btn === '×' || btn === '-' || btn === '+'
                    ? 'h-[76.5px] bg-[#fe9e0b] text-white hover:bg-[#ffb444]'
                    : btn === 0
                    ? 'col-[1/3] h-[76.5px] bg-[#333333] px-8 text-left text-white hover:bg-[#ffffff77]'
                    : btn === 1 ||
                      btn === 2 ||
                      btn === 3 ||
                      btn === 4 ||
                      btn === 5 ||
                      btn === 6 ||
                      btn === 7 ||
                      btn === 8 ||
                      btn === 9
                    ? 'h-[76.5px] bg-[#333333] text-white hover:bg-[#ffffff77]'
                    : btn === '.'
                    ? 'h-[76.5px] bg-[#333333] text-white hover:bg-[#ffffff77]'
                    : btn === 'AC' || btn === '±' || btn === '%'
                    ? 'h-[76.5px] bg-[#a5a5a5] text-black hover:bg-[#ffffffdb]'
                    : ''
                }
                value={btn}
                onClick={
                  btn === 'AC'
                    ? resetClickHandler
                    : btn === '±'
                    ? invertClickHandler
                    : btn === '%'
                    ? percentClickHandler
                    : btn === '='
                    ? equalsClickHandler
                    : btn === '÷' || btn === '×' || btn === '-' || btn === '+'
                    ? signClickHandler
                    : btn === '.'
                    ? commaClickHandler
                    : numClickHandler
                }
              />
            )
          })}
        </ButtonBox>
      </div>
    </ToolLayout>
  )
}
