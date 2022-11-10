import { Affix, Button, Stack, Transition } from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks'
import { IconArrowUp, IconBrandHipchat } from '@tabler/icons'
import React from 'react'

const ScrollTopAndComment = () => {
  const [scroll, scrollTo] = useWindowScroll()

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition='slide-up' mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Stack spacing='xs' style={transitionStyles}>
            <Button
              onClick={() =>
                scrollTo({
                  y: document.getElementById('comment').offsetTop - 60,
                })
              }
              sx={{ width: 40, height: 40 }}
              p={0}
              radius='md'
            >
              <IconBrandHipchat size={25} />
            </Button>
            <Button
              onClick={() => scrollTo({ y: 0 })}
              sx={{ width: 40, height: 40 }}
              p={0}
              radius='md'
            >
              <IconArrowUp size={25} />
            </Button>
          </Stack>
        )}
      </Transition>
    </Affix>
  )
}

export default ScrollTopAndComment
