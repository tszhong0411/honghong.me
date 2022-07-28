import { Affix, Button, Stack, Transition } from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks'
import React from 'react'
import { ArrowUp, BrandHipchat } from 'tabler-icons-react'

export default function ScrollTopAndComment() {
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
              <BrandHipchat size={25} />
            </Button>
            <Button
              onClick={() => scrollTo({ y: 0 })}
              sx={{ width: 40, height: 40 }}
              p={0}
              radius='md'
            >
              <ArrowUp size={25} />
            </Button>
          </Stack>
        )}
      </Transition>
    </Affix>
  )
}
