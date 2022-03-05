import { styled } from 'lib/stitches.config'

const Flex = styled('div', {
  display: 'flex',

  variants: {
    alignItems: {
      baseline: {
        alignItems: 'baseline',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'end',
      },
      ['flex-end']: {
        alignItems: 'flex-end',
      },
      ['flex-start']: {
        alignItems: 'flex-start',
      },
      start: {
        alignItems: 'start',
      },
      stretch: {
        alignItems: 'stretch',
      },
    },
    alignContent: {
      baseline: {
        alignContent: 'baseline',
      },
      center: {
        alignContent: 'center',
      },
      end: {
        alignContent: 'end',
      },
      start: {
        alignContent: 'start',
      },
      stretch: {
        alignContent: 'stretch',
      },
    },
    direction: {
      column: {
        flexDirection: 'column',
      },
      columnReverse: {
        flexDirection: 'column-reverse',
      },
      row: {
        flexDirection: 'row',
      },
      rowReverse: {
        flexDirection: 'row-reverse',
      },
    },
    gap: {
      1: {
        gap: '$1',
      },
      2: {
        gap: '$2',
      },
      3: {
        gap: '$3',
      },
      4: {
        gap: '$4',
      },
      5: {
        gap: '$5',
      },
      6: {
        gap: '$6',
      },
      7: {
        gap: '$7',
      },
      8: {
        gap: '$8',
      },
      9: {
        gap: '$9',
      },
      10: {
        gap: '$10',
      },
      11: {
        gap: '$11',
      },
      12: {
        gap: '$12',
      },
      13: {
        gap: '$13',
      },
      14: {
        gap: '$14',
      },
      15: {
        gap: '$15',
      },
    },
    justifyContent: {
      center: {
        justifyContent: 'center',
      },
      end: {
        justifyContent: 'end',
      },
      around: {
        justifyContent: 'space-around',
      },
      between: {
        justifyContent: 'space-between',
      },
      evenly: {
        justifyContent: 'space-evenly',
      },
      start: {
        justifyContent: 'start',
      },
    },
    wrap: {
      wrap: {
        flexWrap: 'wrap',
      },
      nowrap: {
        flexWrap: 'nowrap',
      },
    },
    inlineFlex: {
      true: {
        display: 'inline-flex',
      },
    },
  },
  defaultVariants: {
    gap: 1,
    wrap: 'nowrap',
    direction: 'row',
  },
})

export { Flex }
